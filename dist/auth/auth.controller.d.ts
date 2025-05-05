import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../user/user.entity").User>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
}
