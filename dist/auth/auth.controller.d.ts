import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../user/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
