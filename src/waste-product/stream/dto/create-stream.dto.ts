import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsMongoId,
  IsObject,
} from 'class-validator';
import { Container } from '../../container/container.schema';
import { ServiceProvider } from '../../../service-provider/service-provider.schema';

export class CreateStreamDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsMongoId({ each: true })
  containers: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  serviceProviders: string[];

  @IsInt()
  unitWeight: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsInt({ each: true })
  postalCodes: number[];

  @IsOptional()
  @IsObject({ each: true })
  availableDays: object[];
}
