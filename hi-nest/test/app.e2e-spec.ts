import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // url(문자)->(숫자)
      }), // 파이프 = 데이터 유효성 검증
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // 웹 서버에 request -> url 받고 -> 200 상태
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });
  describe('/movies', () => {
    it('GET', () => {
      request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 201', () => {
      request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });
    it('POST 404', () => {
      request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'], hell: 'a' })
        .expect(404);
    });
    it('DELETE', () => {
      request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
  describe('/movies/:id', () => {
    it('GET 200', () => {
      request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(201);
    });

    it('DELETE 200', () => {
      request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
