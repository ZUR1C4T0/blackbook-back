import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule.forRoot(), AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
