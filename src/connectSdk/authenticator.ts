import * as crypto from 'crypto';
import { appConfig } from './appConfig';

class Authenticator {

    isSignatureValid(signature: string, body: object): boolean {
        console.log(`Authenticating signature ${signature}`);

        const payload = JSON.stringify(body);
        const hash = crypto.createHmac("sha1", appConfig.verificationToken).update(payload).digest("hex");
        return hash === signature;
    }
}

export const authenticator = new Authenticator();