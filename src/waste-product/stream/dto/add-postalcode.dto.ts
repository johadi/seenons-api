import { IsInt } from 'class-validator';

export class AddZipcodeDto {
  @IsInt()
  zipCode: number;
}
