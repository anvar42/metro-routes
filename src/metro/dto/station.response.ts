import { ApiProperty } from '@nestjs/swagger';

export class Station {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isTransfer: boolean;
}

export class AllStationResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [Station] })
  stations: Station[];
}
