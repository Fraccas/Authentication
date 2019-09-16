import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import tokens from '../../db/accesstokens';
import config from '../../config';

export const CreateToken = async (payload: IPayload) => {
    let tokenId: any = await tokens.addToken(payload.userid);
    payload.accesstokenid = tokenId.insertId; 
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload.accesstokenid, config.auth.secret);
    await token.update(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await tokens.(payload.accesstokenid, token);
}

export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
}