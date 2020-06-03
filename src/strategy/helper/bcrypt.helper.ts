import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IbcryptHelper } from './ibcrypt.helper';

@Injectable()
export class BcryptHelper implements IbcryptHelper {
    saltRounds = 13;

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}
