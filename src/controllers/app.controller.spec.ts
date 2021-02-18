import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers';
import { AppService } from '../services';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Ok"', () => {
      expect(appController.healthCheck()).toBe('Ok');
    });
  });
});
