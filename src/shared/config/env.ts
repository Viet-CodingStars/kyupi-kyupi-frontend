const Env = {
  Local: "local",
  Develop: "dev",
  Production: "prod",
} as const;

type Env = (typeof Env)[keyof typeof Env];

const parseEnvDef = (envDef: string): Env => {
  if (envDef === Env.Local) return Env.Local;
  if (envDef === Env.Develop) return Env.Develop;
  if (envDef === Env.Production) return Env.Production;
  throw new Error(`Invalid envDef: ${envDef}`);
};

const validateEnv = (processEnvKey: string): string => {
  const envKey = process.env[processEnvKey];
  if (!envKey) throw new Error(`${processEnvKey} is not defined`);

  return envKey;
};

interface IConfig {
  readonly env: Env;
  readonly projectName: string;
  readonly gatewayServerUrl: string;
}

class Config implements IConfig {
  public readonly env: Env;
  public readonly projectName: string;
  public readonly gatewayServerUrl: string;
  private static _instance: IConfig;

  private constructor() {
    const parsedEnvDef = parseEnvDef(validateEnv("MODE"));

    this.env = parsedEnvDef;
    this.projectName = validateEnv("PROJECT_NAME");
    this.gatewayServerUrl = validateEnv("GATEWAY_SERVER_URL");
  }

  public static getInstance(): IConfig {
    if (!Config._instance) Config._instance = new Config();
    return Config._instance;
  }
}

export const config = Config.getInstance();
