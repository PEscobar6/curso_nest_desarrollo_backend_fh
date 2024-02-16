import { 
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength 
} from "class-validator";
import { PASSWORD_PATTER } from "src/common/constants";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        PASSWORD_PATTER, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}
