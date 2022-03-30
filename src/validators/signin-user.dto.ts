import { IsEmail, IsString } from 'class-validator';

export default class SignInUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

