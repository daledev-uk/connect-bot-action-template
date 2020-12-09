import * as crypto from 'crypto';

class Authenticator {
    private apps: InstalledApp[] = [];

    public constructor() {
        this.buildAppsList();
    }

    isSignatureValid(signature: string, body: object): Response {
        console.log(`Authenticating signature ${signature}`);

        const payload = JSON.stringify(body);
        console.log(`Body payload: ${payload}`);

        const validApp = this.getValidApp(signature, body);
        return {
            valid: !!validApp,
            app: validApp
        }
    }

    private getValidApp(signature: string, body: object): InstalledApp {
        const payload = JSON.stringify(body);
        console.log(`Body payload: ${payload}`);

        for (const app of this.apps) {
            const hash = crypto
                .createHmac("sha1", app.verificationToken)
                .update(payload)
                .digest("hex");
            if (signature === hash) {
                return app;
            }
        }
    }

    private buildAppsList() {    
        if (process.env.APP_VERIFICATION_TOKEN) {
            this.apps.push({
                verificationToken: process.env[`APP_VERIFICATION_TOKEN`],
                apiToken: process.env[`APP_API_TOKEN`],
                connectBaseUrl: process.env[`APP_HOST_URL`]
            });
        }
    
        let counter = 1;
        while (process.env[`APP_VERIFICATION_TOKEN${counter}`]) {
            this.apps.push({
                verificationToken: process.env[`APP_VERIFICATION_TOKEN${counter}`],
                apiToken: process.env[`APP_API_TOKEN${counter}`],
                connectBaseUrl: process.env[`APP_HOST_URL${counter}`]
            });
        }
    }
}

export const authenticator = new Authenticator();

export interface Response {
    valid: boolean;
    app?: InstalledApp;
}

export interface InstalledApp {
    verificationToken: string;
    apiToken: string;
    connectBaseUrl: string;
}