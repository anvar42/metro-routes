import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Query,
} from '@nestjs/common';
import { MetroService } from './metro.service';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Language } from 'src/base';
import { AllStationResponse } from './dto/station.response';

@ApiTags('Metro')
@Controller('metro')
export class MetroController {
  constructor(private readonly metroService: MetroService) {}

  @Get('stations')
  @ApiHeader({
    name: 'accept-language',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'All Route stations',
    type: AllStationResponse,
  })
  public getAllStations(@Headers('accept-language') lang: Language) {
    return this.metroService.findAllStations(lang);
  }

  @Get('direction')
  @ApiQuery({ name: 'from', description: '(UUID)', type: String })
  @ApiQuery({ name: 'to', description: ' (UUID)', type: String })
  @ApiHeader({
    name: 'accept-language',
    required: false,
    enum: [Language.UZ, Language.RU],
  })
  public async getDirection(
    @Query('from') fromId: string,
    @Query('to') toId: string,
    @Headers('accept-language') lang: Language,
  ) {
    if (!fromId || !toId) {
      throw new BadRequestException('Initial ids is not found!');
    }

    return this.metroService.findDirections(fromId, toId, lang);
  }
}
