import { ChainId } from '../defs/web3_defs'
import { LockApi } from '../api/lock_api'

import { 
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import { loopring_exported_account as acc, web3 } from './utils'
import { ReqParams, LockAssetsRequest } from '../defs/loopring_defs'

const gasPrice = 30

const gasLimit = 200000


let lockApi: LockApi

describe('contract test', function () {

    beforeEach(() => {
        lockApi = new LockApi({ chainId: ChainId.GOERLI });
    })

    it('start each ...', async () => {

        let jsonData :LockAssetsRequest  =  {
            //accountId:11265,
            accountId:12524,
            eddsaSignature:"",
            exchange:"0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e",
            lockedUntil:Math.round(Date.now() / 1000) + 30 * 86400,
            tag:"test",
            timestamp:1657532600,
            token:{
                tokenId:1, volume:"100"
            }
          }

        let result = await lockApi.lockAssets(jsonData,
            "OfOPPy3NhsHTFxv4pjmO8tYkkkt7VLeg0YotO8bGxWNjm5EU9dZqhHzDJWL7gFGY",
            "0x52b09f7c6602378d076cdad016cf8f93ad50241ae7909db1437ae230092c375"
        );

        console.log(result);
        

    }, DEFAULT_TIMEOUT)


})
