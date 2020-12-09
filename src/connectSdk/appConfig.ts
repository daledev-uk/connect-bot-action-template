class AppConfig {
    public readonly verificationToken: string;
    public readonly apiToken: string;
    public readonly connectBaseUrl: string;

    public constructor() {
        this.verificationToken = process.env.APP_VERIFICATION_TOKEN;
        this.apiToken = process.env.APP_API_TOKEN;
        this.connectBaseUrl = process.env.APP_HOST_URL;
    }
}

export const appConfig = new AppConfig();