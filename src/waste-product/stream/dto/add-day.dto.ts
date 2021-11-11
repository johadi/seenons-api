import { IsString, IsInt } from 'class-validator';

export class AddDayDto {
  @IsInt()
  day: number;

  @IsString({ each: true })
  timeslots: string[];
}
