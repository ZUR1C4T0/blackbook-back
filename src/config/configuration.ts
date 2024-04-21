import { registerAs } from "@nestjs/config";
import Joi from "joi";

// Define the schema for the environment variables
const proccesEnvSchema = {
	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),
	PORT: Joi.number().port().default(3000),
	DATABASE_URL: Joi.string().required(),
	JWT_SECRET: Joi.string().hex().required(),
};

// Define the schema for `process.env` object
export const configSchema = Joi.object<typeof proccesEnvSchema>(proccesEnvSchema);

type ConfigValue =
	| keyof typeof proccesEnvSchema
	| {
			[K: string]: ConfigValue;
	  };

interface Config {
	[K: string]: ConfigValue;
}

export const CONFIG_KEY = "config";

/** Custom config */
export const config = registerAs<Config>(CONFIG_KEY, () => ({
	nodeEvn: "NODE_ENV",
	port: "PORT",
	database: { url: "DATABASE_URL" },
	jwt: { secret: "JWT_SECRET" },
}));
