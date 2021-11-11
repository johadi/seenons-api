import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateContainerDto {
  @IsString()
  name: string;

  @IsInt()
  size: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
