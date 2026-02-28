import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

// 말하다, 묘사하다
describe('MoviesService', () => {
  let service: MoviesService;
  // 테스트 하기 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // 미리 생성하는 것도 방법
    // service.create({
    //   title: 'Test Movie',
    //   generes: ['test'],
    //   year: 2000,
    // });
  });

  // 개별 테스트의 줄임말 (unit test)
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({ title: 'Test Movie', generes: ['test'], year: 2000 });
      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // movie가 있으며
      expect(movie.id).toEqual(1); // movie가 1이다.
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie with ID: 999 not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('should remove a movie', () => {
      service.create({ title: 'Test Movie', generes: ['test'], year: 2000 });
      const beForeMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beForeMovies); // 삭제 후 1개가 적을것이라고 예상
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const befroeCreate = service.getAll().length;
      service.create({ title: 'Test Movie', generes: ['test'], year: 2000 });
      const afterCreate = service.getAll().length;
      console.log(befroeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(befroeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
