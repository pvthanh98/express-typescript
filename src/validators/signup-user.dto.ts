import { IsEmail, IsString } from 'class-validator';

export default class SignupUserDto {
    @IsString()
    firstName: string;

    @IsEmail()
    email: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsString()
    address: string;
}

