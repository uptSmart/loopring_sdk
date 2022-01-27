import { 
    ChainId, 
    ConnectorNames 
} from '../defs/web3_defs'

import { 
    UserAPI, 
    ExchangeAPI, 
    WhitelistedUserAPI, 
    getDepositTx
} from '../api'

import { 
    dumpError400 
} from '../utils/network_tools'

import {
    GetAccountRequest,
    GetNextStorageIdRequest,
    GetUserApiKeyRequest,
    NFTMintRequestV3, TokenVolumeV3,
} from '../defs/loopring_defs'

import { 
    TokenInfo 
} from '../defs';

import { 
    VALID_UNTIL,
    DEFAULT_TIMEOUT,
} from '../defs/loopring_constants'

import * as contract from '../api/contract_api'
import * as sign_tools from '../api/sign/sign_tools'
// import { getTokenInfoBySymbol, toBuffer, zeroPad } from '../utils'

const PrivateKeyProvider = require("truffle-privatekey-provider")

import Web3 from 'web3'

let userApi: UserAPI

let whitelistedUserApi: WhitelistedUserAPI

let exchange: ExchangeAPI

// let address = '0xff7d59d9316eba168837e3ef924bcdfd64b237d8'
// const privKey = "adc22517f2de0093429e5365b042da0ec9299353943db0f0cc104743c69104cf"

///-----------------

// let addressWhitlisted = '0x35405E1349658BcA12810d0f879Bf6c5d89B512C'
//
// let privKey2 = 'ada29a473e2b777403e7d2dc3876c5be03ca6b60d97e37e9bd335b1ce05a2680'
//
// let eddkeyWhitelisted = '0x27a5b716c7309a30703ede3f1a218cdec857e424a31543f8a658e7d2208db33'

let nftTokenAddress = '0x662168Dc15F4D516bE7741f3BBC3592Ea9A6eDB5'
//test should change the id number
let nftId = '0x000000000000000000000000000000000000000000000000000000000000007b'



let address = '0x41eA6aD88bbf4E22686386783e7817bB7E82c1ed'
const privKey = "c03b0a988e2e18794f2f0e881d7ffcd340d583f63c1be078426ae09ddbdec9f5"
describe('offLine test', function () {

    beforeEach(async() => {
        userApi = new UserAPI({ chainId: ChainId.GOERLI })
        exchange = new ExchangeAPI({ chainId: ChainId.GOERLI })
        whitelistedUserApi = new WhitelistedUserAPI({ chainId: ChainId.GOERLI })
    })


    it('Test case1', async () => {
        try {

            const provider = new PrivateKeyProvider(
                privKey,
                "https://goerli.infura.io/v3/a06ed9c6b5424b61beafff27ecc3abf3"
            );
            const web3 = new Web3(provider)

            console.log("xxl ...");
            let nonce  = await contract.getNonce(web3,address);
            //const { exchangeInfo } = await exchange.getExchangeInfo()
            let token:TokenInfo;
            let tokens = exchange.getTokens();
            token = (await tokens).tokenSymbolMap['ETH']
      
            //1 调用exchange的deposit接口给自己的账户充值
            console.log(1);
            //console.log(this.state.web3);
            let balance = await web3.eth.getBalance(address)
            console.log(balance);
            const {exchangeInfo} = await exchange.getExchangeInfo()

            //1. server: get DepositTx
            let res = await getDepositTx(
              address,
              //this.state.lrcConf.adminAddress,
              exchangeInfo.exchangeAddress,
              token,
              0.01,
              1,
              10,
              0x7a1200,
              ChainId.GOERLI,
              nonce
            )
            console.log(res);

            //2. clinet: sign DepositTx
            


            //3. 







        } catch (reason) {
            dumpError400(reason)
        }
    }, DEFAULT_TIMEOUT)


})


function sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}