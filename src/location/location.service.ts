import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { CreateLocationDTO, Location, LocationDTO } from './location.dto';
import { transformToSnaKeCase } from '../utils';

@Injectable()
export class LocationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({ locationName, malePopulation, femalePopulation }: CreateLocationDTO): Promise<Location> {
    try {
      const query = `
        INSERT INTO location(location_name, male_population, female_population)
        VALUES($1, $2, $3)
        RETURNING id, location_name, male_population, female_population, created_at, updated_at;
      `;
      const values = [locationName, malePopulation, femalePopulation];
      const { rows: [row] } = await this.databaseService.pool.query(query, values);
      return new LocationDTO(row);
    } catch (error) {
      throw error;
    }
  }

  async get(condition: Location): Promise<Location[]> {
    try {
      let query = `
        SELECT id, location_name, male_population, female_population, created_at, updated_at
        FROM location
        WHERE 1=1
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` AND ${transformToSnaKeCase(key)} = $${values.length + 1}`;
        values.push(condition[key]);
      }
      query += ';';
      const { rows } = await this.databaseService.pool.query(query, values);
      return rows.map(row => new LocationDTO(row));
    } catch (error) {
      throw error;
    }
  }

  async getOne(condition: Location): Promise<Location> {
    try {
      const [row] = await this.get(condition);
      return row;
    } catch (error) {
      throw error;
    }
  }

  async update(condition: Location, locationId: string): Promise<any> {
    try {
      let query = `
        UPDATE location
        SET
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` ${transformToSnaKeCase(key)} = $${values.length + 1},`;
        values.push(condition[key]);
      }
      query = `${query.substring(0, query.length - 1)} WHERE 1=1 AND id = $${values.length + 1}`;
      values.push(locationId);

      return this.databaseService.pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

  async delete(condition: Location): Promise<any> {
    try {
      let query = `
        DELETE FROM location
        WHERE 1=1
      `;
      const values = [];
      for (const key of Object.keys(condition)) {
        query += ` AND ${transformToSnaKeCase(key)} = $${values.length + 1}`;
        values.push(condition[key]);
      }
      query += ';';
      await this.databaseService.pool.query(query, values);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
