export interface IbcryptHelper {
    saltRounds: number;

    getHash(password: string | undefined, saltRounds: number | undefined): Promise<string>;

    compareHash(password: string | undefined, hash: string | undefined): Promise<boolean>;
}
