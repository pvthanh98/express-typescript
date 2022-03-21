import { IsString } from 'class-validator';

export default class SignupUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    address: string;
}

