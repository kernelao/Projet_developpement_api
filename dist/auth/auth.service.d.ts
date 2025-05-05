import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './register.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(data: RegisterDto): Promise<import("../user/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
