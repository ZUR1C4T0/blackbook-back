import { Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import type { User } from "@prisma/client";
import type { Request } from "express";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./guards/local-auth.guard";

declare module "express" {
	interface Request {
		user: User;
	}
}

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	@Inject(AuthService)
	private readonly authService: AuthService;

	@Post("login")
	@UseGuards(LocalAuthGuard)
	async login(@Req() req: Request) {
		const user = req.user;
		return this.authService.generateToken(user);
	}
}
