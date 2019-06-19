import { IsString, MaxLength, MinLength, IsInt } from 'class-validator';

export interface Location {
  id: string;
  locationName: string;
  malePopulation: number;
  femalePopulation: number;
  totalPopulation: number;
  createdAt: string;
  updatedAt: string;
}

export interface LocationInput {
  id: string;
  location_name: string;
  male_population: number;
  female_population: number;
  created_at: string;
  updated_at: string;
}

export class CreateLocationDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly locationName: string;

  @IsInt()
  public readonly malePopulation: string;

  @IsInt()
  public readonly femalePopulation: string;
}

// tslint:disable-next-line:max-classes-per-file
export class LocationDTO implements Location {
  public readonly id: string;
  public readonly locationName: string;
  public readonly malePopulation: number;
  public readonly femalePopulation: number;
  public readonly totalPopulation: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor({
    id,
    location_name,
    male_population,
    female_population,
    created_at,
    updated_at,
  }: LocationInput) {
    this.id = id;
    this.locationName = location_name;
    this.malePopulation = male_population;
    this.femalePopulation = female_population;
    this.totalPopulation = male_population + female_population;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
