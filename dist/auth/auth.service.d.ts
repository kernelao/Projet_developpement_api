import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(email: string, password: string): Promise<import("../user/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
