import { BaseAPI } from './base_api'

import { ReqParams, LockAssetsRequest } from '../defs/loopring_defs'

import { SIG_FLAG, ReqMethod, } from '../defs/loopring_enums'

import { LOOPRING_URLs, } from '../defs/url_defs'

import * as sign_tools from './sign/sign_tools'

export class LockApi extends BaseAPI {

/**
 * lockAsset
 */
 public async lockAssets(request:LockAssetsRequest,apiKey:string,eddsaKey:string): Promise<any> {

    const sigAndHashJson = sign_tools.get_EddsaSig_Lock_Hash(request,eddsaKey);
    request.eddsaSignature = sigAndHashJson.sig;
    const hash = sigAndHashJson.hash;

    const dataToSig: Map<string, any> = new Map();
    dataToSig.set("accountId", request.accountId);
    dataToSig.set("eddsaSignature", request.eddsaSignature);
    dataToSig.set("exchange", request.exchange);
    dataToSig.set("lockedUntil", request.lockedUntil);
    dataToSig.set("tag", request.tag);
    dataToSig.set("timestamp", request.timestamp);
    dataToSig.set("token", request.token);

    const reqParams: ReqParams = {
      url:LOOPRING_URLs.POST_LOCK_ASSETS,
      bodyParams: request,
      apiKey,
      method: ReqMethod.POST,
      sigFlag: SIG_FLAG.EDDSA_SIG,
      sigObj: {
        dataToSig,
        PrivateKey: eddsaKey,
      },
    };
    
    const raw_data = (await this.makeReq().request(reqParams)).data

    return {
        hash,
        apiKey,
        raw_data
    }
    

  }

}
