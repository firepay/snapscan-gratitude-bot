import { Controller, Post, Body } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { GratitudeService } from '../services';
import { formatBlock } from '../utils';

@Controller('gratitude')
export class GratitudeController {

  public constructor(private readonly service: GratitudeService) { }

  @Post()
  public async sendGratitude(@Body() request): Promise<string> {
    const { text, user_id } = request;

    const receiver = text.split(' ').splice(0, 1).join(' ');
    const message = text.split(' ').splice(1).join(' ');
    const sender = user_id;

    const body = { blocks: formatBlock(sender, receiver, message) };
    let response: AxiosResponse<any>;

    try {
      response = await this.service.sendGratitude(body);
    } catch (error) {
      console.error(`Status: ${error.status}; Error: ${error.message}`);
      return error.message;
    }


    if (response.status !== 200) {
      console.error(response.status);
      return ':cry: We failed to send your message to Slack — please try again'
    }

    return ':cherry_blossom: Your message was sent successfully!';
  }
}
