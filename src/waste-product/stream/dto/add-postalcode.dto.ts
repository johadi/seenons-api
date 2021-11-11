import { IsInt } from 'class-validator';

export class AddPostalCodeDto {
  @IsInt()
  postalCode: number;
}
