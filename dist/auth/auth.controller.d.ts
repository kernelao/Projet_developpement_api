import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../user/user.entity").User>;
    login(body: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            nom: string;
            prenom: string;
            email: string;
            username: string;
        };
    }>;
}
