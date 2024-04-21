import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { AuthModule } from "./auth/auth.module";
import { config, configSchema } from "./config/configuration";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			load: [config],
			validationSchema: configSchema,
		}),
		PrismaModule.forRoot(),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
