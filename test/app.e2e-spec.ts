import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { LocationService } from '../src/location/location.service';
import { ValidationPipe } from '../src/shared/validation.pipe';

const baseUrl = '/api/v1';
const locations = [
  {
    id: '9d069644-b379-43ed-a603-5bb200e731ad',
    locationName: 'Katsina',
    malePopulation: 5348,
    femalePopulation: 1950,
    totalPopulation: 7298,
    createdAt: '2019-06-19T01:42:42.253Z',
    updatedAt: '2019-06-19T01:46:42.553Z',
  },
];

describe('AppController (e2e)', () => {
  let app;
  const locationService = {
    create: () => locations,
    get: () => locations,
    getOne: () => locations[0],
    update: () => true,
    delete: () => true,
  };

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LocationService)
      .useValue(locationService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/ (GET)', () => {
    it('should return a list of locations on the platform - 200', () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}/location`)
        .expect(200)
        .expect(locationService.get());
    });
  });

  describe('/:id (GET)', () => {
    it('should return a single location on the platform - 200', () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}/location/9d069644-b379-43ed-a603-5bb200e731ad`)
        .expect(200)
        .expect(locationService.getOne());
    });
  });

  describe('/ (POST)', () => {
    it('should return a duplicate location response and not create a new location - 409', () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}/location`)
        .send(locations[0])
        .expect(409);
    });

    it('should create a new location on the platform - 201', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => null);
      return request(app.getHttpServer())
        .post(`${baseUrl}/location`)
        .send(locations[0])
        .expect(201)
        .expect(locationService.get());
    });

    it('should return a bad request response and not create a new location - 400', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => null);
      return request(app.getHttpServer())
        .post(`${baseUrl}/location`)
        .expect(400);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete a location on the platform - 200', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => locations[0]);
      return request(app.getHttpServer())
        .delete(`${baseUrl}/location/9d069644-b379-43ed-a603-5bb200e731ad`)
        .expect(200);
    });

    it('should return a not found response and not delete a location on the platform - 404', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => null);
      return request(app.getHttpServer())
        .delete(`${baseUrl}/location/9d069644-b379-43ed-a603-5bb200e731ad`)
        .expect(404);
    });
  });

  describe('/:id (PUT)', () => {
    it('should update a location on the platform - 200', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => locations[0]);
      return request(app.getHttpServer())
        .put(`${baseUrl}/location/9d069644-b379-43ed-a603-5bb200e731ad`)
        .expect(200);
    });

    it('should return a not found response and not delete a location on the platform - 404', () => {
      jest.spyOn(locationService, 'getOne').mockImplementation(() => null);
      return request(app.getHttpServer())
        .put(`${baseUrl}/location/9d069644-b379-43ed-a603-5bb200e731ad`)
        .expect(404);
    });
  });
});
