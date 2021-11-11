import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateServiceProviderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
