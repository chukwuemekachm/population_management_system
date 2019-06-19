import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    let errors: any = await validate(object);
    if (errors.length > 0) {
      errors = errors.map(({ property, constraints }) => ({
        [property]: Object.keys(constraints)
          .reduce((accumulator, current) => accumulator = [...accumulator, constraints[current]], []),
      }));
      throw new BadRequestException(errors, 'Bad request');
    }
    return value;
  }

  // tslint:disable-next-line:ban-types
  private toValidate(metatype: Function): boolean {
    // tslint:disable-next-line:ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
