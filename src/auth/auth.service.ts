import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { User } from "@prisma/client";
import { compare } from "bcrypt";
import { PrismaService } from "nestjs-prisma";
import type { JwtPayload } from "./auth.models";

@Injectable()
export class AuthService {
	@Inject(JwtService)
	private readonly jwtService: JwtService;

	@Inject(PrismaService)
	private readonly prisma: PrismaService;

	async validateUser(email: string, password: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!user || !compare(password, user.password)) {
			return null;
		}
		return user;
	}

	generateToken(user: User) {
		const payload: JwtPayload = { sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
