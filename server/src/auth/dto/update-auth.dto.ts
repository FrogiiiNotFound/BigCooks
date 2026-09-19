import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './Register.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
