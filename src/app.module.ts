import { Module, HttpModule } from '@nestjs/common';
import { AppController, GratitudeController } from './controllers';
import { AppService, GratitudeService } from './services';

@Module({
  imports: [HttpModule],
  controllers: [AppController, GratitudeController],
  providers: [AppService, GratitudeService],
})
export class AppModule { }
