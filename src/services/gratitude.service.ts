import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { config } from '../config';
import { Blocks } from '../models';

@Injectable()
export class GratitudeService {
  constructor(private http: HttpService) { }
  private readonly slackEndpoint = config.api.endpoint;

  public async sendGratitude(body: Blocks) {
    return await this.http.post(this.slackEndpoint, body).toPromise()
  };
}
