import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);

	// enable cors
	app.enableCors();

	// use pipes
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	app.setGlobalPrefix("api");

	// Swagger setup
	const options = new DocumentBuilder().setTitle("Black Book API").build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("/", app, document);

	// start the server
	const port = +process.env.PORT || 3000;
	const address = "0.0.0.0";
	await app.listen(port, address);
}
bootstrap();
