// swap using cetus sdk
import { SdkOptions, CetusClmmSDK, adjustForSlippage, Percentage, d } from '@cetusprotocol/cetus-sui-clmm-sdk'
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import BN from 'bn.js';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';


const rpcUrl = getFullnodeUrl('mainnet');
const owner = Ed25519Keypair.fromSecretKey(Deno.env.get('WALLET'));
const provider = new SuiClient({ url: rpcUrl });
const ownerAddress = '0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26'
const poolAddress = '0xb2deb3ca29c6d8486503075053de806691def643cde69ad21662b25f1bc667e6'


const SDKConfig = {
    clmmConfig: {
        pools_id: '0xf699e7f2276f5c9a75944b37a0c5b5d9ddfd2471bf6242483b03ab2887d198d0',
        global_config_id: '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f',
        global_vault_id: '0xce7bceef26d3ad1f6d9b6f13a953f053e6ed3ca77907516481ce99ae8e588f2b',
        admin_cap_id: '0x89c1a321291d15ddae5a086c9abc533dff697fde3d89e0ca836c41af73e36a75',
    },
    cetusConfig: {
        coin_list_id: '0x8cbc11d9e10140db3d230f50b4d30e9b721201c0083615441707ffec1ef77b23',
        launchpad_pools_id: '0x1098fac992eab3a0ab7acf15bb654fc1cf29b5a6142c4ef1058e6c408dd15115',
        clmm_pools_id: '0x15b6a27dd9ae03eb455aba03b39e29aad74abd3757b8e18c0755651b2ae5b71e',
        admin_cap_id: '0x39d78781750e193ce35c45ff32c6c0c3f2941fa3ddaf8595c90c555589ddb113',
        global_config_id: '0x0408fa4e4a4c03cc0de8f23d0c2bbfe8913d178713c9a271ed4080973fe42d8f',
        coin_list_handle: '0x49136005e90e28c4695419ed4194cc240603f1ea8eb84e62275eaff088a71063',
        launchpad_pools_handle: '0x5e194a8efcf653830daf85a85b52e3ae8f65dc39481d54b2382acda25068375c',
        clmm_pools_handle: '0x37f60eb2d9d227949b95da8fea810db3c32d1e1fa8ed87434fc51664f87d83cb',
    },
}

export const mainnet: SdkOptions = {
    fullRpcUrl: 'https://fullnode.mainnet.sui.io:443',
    swapCountUrl: 'https://api-sui.cetus.zone/v2/sui/pools_info',
    simulationAccount: {
        address: ownerAddress
    },
    cetus_config: {
        package_id: '0x95b8d278b876cae22206131fb9724f701c9444515813042f54f0a426c9a3bc2f',
        published_at: '0x95b8d278b876cae22206131fb9724f701c9444515813042f54f0a426c9a3bc2f',
        config: SDKConfig.cetusConfig
    },
    clmm_pool: {
        package_id: '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb',
        published_at: '0x70968826ad1b4ba895753f634b0aea68d0672908ca1075a2abdf0fc9e0b2fc6a',
        config: SDKConfig.clmmConfig
    },
    integrate: {
        package_id: '0x996c4d9480708fb8b92aa7acf819fb0497b5ec8e65ba06601cae2fb6db3312c3',
        published_at: '0x6f5e582ede61fe5395b50c4a449ec11479a54d7ff8e0158247adfda60d98970b'
    },
    deepbook: {
        package_id: '0x000000000000000000000000000000000000000000000000000000000000dee9',
        published_at: '0x000000000000000000000000000000000000000000000000000000000000dee9'
    },
    deepbook_endpoint_v2: {
        package_id: '0x0dd416959739e1db3a4c6f9cac7f9e7202678f3b067d6d419e569a124fc35e0e',
        published_at: '0x0dd416959739e1db3a4c6f9cac7f9e7202678f3b067d6d419e569a124fc35e0e'
    },
    aggregatorUrl: 'https://api-sui.cetus.zone/router'
}

const MainnetSDK = new CetusClmmSDK(mainnet)

async function getPoolInfo(poolAddress: string) {
    try {
        // Get the pool object
        const pool = await MainnetSDK.Pool.getPool(poolAddress);
        console.log(pool)
    } catch (error) {
        console.error('Error fetching pool info:', error);
    }
}

async function retrievalPositions(ownerAddress: string, poolAddress: string) {
    const res = await MainnetSDK.Position.getPositionList(ownerAddress, [poolAddress])
    console.log('get positions of one pool by owner address', res)
}

async function swap(poolAddress: string, amount: BN, inputCoinType: string, slippageNum: number) {

    const pool = await MainnetSDK.Pool.getPool(poolAddress)
    const a2b = inputCoinType === pool.coinTypeA
    const byAmountIn = true

    const swapTicks = await MainnetSDK.Pool.fetchTicks({
        pool_id: pool.poolAddress,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB
    })

    // const swapTicks =  await  sdk.Pool.fetchTicksByRpc(pool.ticks_handle)

    console.log("swapTicks length: ", swapTicks.length);

    const res = MainnetSDK.Swap.calculateRates({
        decimalsA: 6,
        decimalsB: 9,
        a2b,
        byAmountIn,
        amount,
        swapTicks,
        currentPool: pool
    })

    console.log('calculateRates###res###', {
        estimatedAmountIn: res.estimatedAmountIn.toString(),
        estimatedAmountOut: res.estimatedAmountOut.toString(),
        estimatedEndSqrtPrice: res.estimatedEndSqrtPrice.toString(),
        estimatedFeeAmount: res.estimatedFeeAmount.toString(),
        isExceed: res.isExceed,
        extraComputeLimit: res.extraComputeLimit,
        amount: res.amount.toString(),
        aToB: res.aToB,
        byAmountIn: res.byAmountIn,
    })

    const slippage = Percentage.fromDecimal(d(slippageNum))

    const toAmount = res.byAmountIn ? res.estimatedAmountOut : res.estimatedAmountIn
    const amountLimit = adjustForSlippage(toAmount, slippage, !res.byAmountIn)

    // build swap Payload
    MainnetSDK.senderAddress = owner.toSuiAddress()
    const swapPayload = await MainnetSDK.Swap.createSwapTransactionPayload(
        {
            pool_id: pool.poolAddress,
            coinTypeA: pool.coinTypeA,
            coinTypeB: pool.coinTypeB,
            a2b: res.aToB,
            by_amount_in: res.byAmountIn,
            amount: res.amount.toString(),
            amount_limit: amountLimit.toString()
        },
    )

    // await MainnetSDK.fullClient.sendSimulationTransaction(swapPayload, owner.toSuiAddress()).then((res) => {
    //     console.log('simulation: ', res)
    // })
    const transferTxn = await provider.signAndExecuteTransaction({ transaction: swapPayload, signer: owner })
    console.log('swap: ', transferTxn)
}


// getPoolInfo();
// retrievalPositions(ownerAddress, poolAddress);

swap(poolAddress, new BN(1e9), '0000000000000000000000000000000000000000000000000000000000000002::sui::SUI', 0.5)