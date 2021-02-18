import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { GratitudeController } from '../controllers';
import { GratitudeService } from '../services';

class GratitudeServiceMockSuccess {
  sendGratitude(body) {
    return {
      status: 200
    }
  }
}

describe('GratitudeController Suceess', () => {
  let app: TestingModule;
  let gratitudeController: GratitudeController;

  beforeAll(async () => {
    const GratitudeServiceProvider = {
      provide: GratitudeService,
      useClass: GratitudeServiceMockSuccess,
    };

    app = await Test.createTestingModule({
      controllers: [GratitudeController],
      providers: [GratitudeServiceProvider],
    }).compile();

    gratitudeController = app.get<GratitudeController>(GratitudeController)
  });


  describe('/gratitude', () => {
    it('Sends message to Slack succesfully', async () => {
      const expectedResult = ':cherry_blossom: Your message was sent successfully!';

      const request = {
        text: "<@U014CR4AK0W|thabang> thaaaanks!",
        user_id: "U014CR4AK0W"
      };

      const response = await gratitudeController.sendGratitude(request);

      expect(response).toBe(expectedResult);
    });
  });
});

class GratitudeServiceMockFailed {
  sendGratitude(body) {
    return { status: 500 }
  }
}

describe('GratitudeController Failed', () => {
  let app: TestingModule;
  let gratitudeController: GratitudeController;

  beforeAll(async () => {
    const GratitudeServiceProvider = {
      provide: GratitudeService,
      useClass: GratitudeServiceMockFailed,
    };

    app = await Test.createTestingModule({
      controllers: [GratitudeController],
      providers: [GratitudeServiceProvider],
    }).compile();

    gratitudeController = app.get<GratitudeController>(GratitudeController)
  });


  describe('/gratitude', () => {
    it('Fails to send message to Slack', async () => {
      const expectedResult = ':cry: We failed to send your message to Slack — please try again';

      const request = {
        text: "<@U014CR4AK0W|thabang> thaaaanks!",
        user_id: "U014CR4AK0W"
      };

      const response = await gratitudeController.sendGratitude(request);

      expect(response).toBe(expectedResult);
    });
  });
});

class GratitudeServiceMockException {
  sendGratitude(body) {
    throw new HttpException(':cry: Something blew up', 500)
  }
}

describe('GratitudeController Failed due to exception', () => {
  let app: TestingModule;
  let gratitudeController: GratitudeController;

  beforeAll(async () => {
    const GratitudeServiceProvider = {
      provide: GratitudeService,
      useClass: GratitudeServiceMockException,
    };

    app = await Test.createTestingModule({
      controllers: [GratitudeController],
      providers: [GratitudeServiceProvider],
    }).compile();

    gratitudeController = app.get<GratitudeController>(GratitudeController)
  });


  describe('/gratitude', () => {
    it('Fails to send message to Slack', async () => {
      const expectedResult = ':cry: Something blew up';

      const request = {
        text: "<@U014CR4AK0W|thabang> thaaaanks!",
        user_id: "U014CR4AK0W"
      };

      const error = await gratitudeController.sendGratitude(request);
      expect(error).toBe(expectedResult)
    });
  });
});
