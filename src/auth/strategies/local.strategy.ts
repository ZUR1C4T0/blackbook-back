import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { compare } from "bcrypt";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
	@Inject(AuthService)
	private readonly authService: AuthService;

	constructor() {
		super({
			usernameField: "email",
			passwordField: "password",
		});
	}

	async validate(email: string, password: string) {
		const user = await this.authService.validateUser(email, password);
		if (!user || !(await compare(password, user.password))) {
			throw new UnauthorizedException("Credenciales inválidas");
		}
		return user;
	}
}
