import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @Length(3, 254)
  email!: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_]{3,24}$/, { message: 'username deve conter de 3 a 24 letras, números ou _.' })
  username!: string;

  @IsString()
  @Length(2, 80)
  displayName!: string;

  @IsString()
  @Length(12, 128)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
