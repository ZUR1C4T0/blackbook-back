import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule.forRoot()],
	controllers: [],
	providers: [],
})
export class AppModule {}
