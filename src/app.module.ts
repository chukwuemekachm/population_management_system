import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    DatabaseModule,
    LocationModule,
  ],
})
export class AppModule {}
