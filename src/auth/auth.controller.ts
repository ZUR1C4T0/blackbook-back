import { Controller, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { User } from "@prisma/client";
import type { Request } from "express";
import { AuthService } from "./auth.service";

declare module "express" {
	interface Request {
		user: User;
	}
}

@Controller("auth")
@UseGuards(AuthGuard("local"))
export class AuthController {
	@Inject(AuthService)
	private readonly authService: AuthService;

	@Post("login")
	async login(@Req() req: Request) {
		const user = req.user;
		return this.authService.generateToken(user);
	}
}
