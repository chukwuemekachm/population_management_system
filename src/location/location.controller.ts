import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';

import { LocationService } from './location.service';
import { Location, CreateLocationDTO, UpdateLocationDTO } from './location.dto';

@Controller('/api/v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  getAllLocations() {
    return this.locationService.get({} as Location);
  }

  @Post()
  async createLocation(@Body() createLocationDTO: CreateLocationDTO) {
    const { locationName, malePopulation, femalePopulation } = createLocationDTO;
    const location = await this.locationService.getOne({ locationName } as Location);

    if (location) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: `A location with ${locationName} already exists`,
      }, 409);
    }

    return this.locationService.create({ locationName, malePopulation, femalePopulation });
  }

  @Get(':id')
  async getSingleLocation(@Param() params) {
    const { id } = params;
    const location = await this.locationService.getOne({ id } as Location);

    if (!location) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Cannot GET /api/v1/location/${id}`,
      }, 404);
    }

    return location;
  }

  @Put(':id')
  async updateLocation(@Param() params, @Body() updateLocationDTO: UpdateLocationDTO) {
    const { id } = params;
    const { locationName, malePopulation, femalePopulation } = updateLocationDTO;
    const location = await this.locationService.getOne({ id } as Location);

    if (!location) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Cannot UPDATE /api/v1/location/${id}`,
      }, 404);
    }

    await this.locationService
      .update({ locationName, malePopulation, femalePopulation, updatedAt: 'NOW()' } as any, id);
    return this.locationService.getOne({ id } as Location);
  }

  @Delete(':id')
  async deleteLocation(@Param() params) {
    const { id } = params;
    const location = await this.locationService.getOne({ id } as Location);

    if (!location) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Cannot DELETE /api/v1/location/${id}`,
      }, 404);
    }

    return this.locationService.delete({ id } as Location);
  }
}
