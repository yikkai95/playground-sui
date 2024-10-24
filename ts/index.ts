import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui/faucet';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';


const rpcUrl = getFullnodeUrl('mainnet');
const keypair = Ed25519Keypair.fromSecretKey(Deno.env.get('WALLET'));

const provider = new SuiClient({ url: rpcUrl });
const owner = '0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26';

const COIN_TYPE = '0xb58c4581a1b42bbf16b8a452af642412b0663f4a9c080a9862625564614ae294::something::SOMETHING';
const COIN_PACKAGE_ID = '0xb58c4581a1b42bbf16b8a452af642412b0663f4a9c080a9862625564614ae294'; // Your published package ID
const TREASURY_CAP_ID = '0x778d9c77a0b09fa85ca289cd469e35850c7b7398c02ca8ca11176523b9429cb8'; // The TreasuryCap object ID
const AMOUNT_TO_MINT = 10000; // Amount to mint (adjust based on your coin's decimals)
const RECIPIENT_ADDRESS = owner; // Address to receive the minted coins


// list all objects owned by an address
async function listObjectsOwnedByAddress(address: string) {
    try {
        const objects = await provider.getOwnedObjects({
            owner: address,
        });

        console.log(`Objects owned by ${address}:`, objects);
    } catch (error) {
        console.error('Error listing objects owned by address:', error);
    }
}


async function listCoinsOwnedByAddress(address: string) {
    try {
        const coins = await provider.getAllBalances({
            owner: address,
        });

        console.log(`Coins owned by ${address}:`, coins);
    } catch (error) {
        console.error('Error listing coins owned by address:', error);
    }
}

async function mintCoins(treasuryCapId: string, amount: number, recipientAddress: string) {
    const tx = new Transaction();

    // Call the mint function
    tx.moveCall({
        target: `${COIN_PACKAGE_ID}::something::mint`,
        arguments: [
            tx.object(treasuryCapId),
            tx.pure.u64(amount),
            tx.pure.address(recipientAddress)
        ],
    });

    //   // Transfer the newly minted coin to the recipient
    //   tx.transferObjects([coin], tx.pure.address(recipientAddress));

    // Sign and execute the transaction
    const result = await provider.signAndExecuteTransaction({ transaction: tx, signer: keypair });
    console.log('Transaction result:', result);
    return result;
}


async function findTreasuryCap(packageId: string, publisherAddress: string) {
    // Query for owned objects
    const objects = await provider.getOwnedObjects({
        owner: publisherAddress,
        options: { showType: true, showContent: true }
    });

    // Find the TreasuryCap object
    const treasuryCap = objects.data.find(obj =>
        obj.data?.type?.startsWith(`0x2::coin::TreasuryCap<${packageId}::`)
    );

    if (treasuryCap) {
        console.log('Treasury Cap ID:', treasuryCap.data?.objectId);
        return treasuryCap.data?.objectId;
    } else {
        console.log('Treasury Cap not found');
        return null;
    }
}


async function transferSui(amount: number, recipientAddress: string) {
    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(amount)]);
    tx.transferObjects([coin], tx.pure.address(recipientAddress));

    const result = await provider.signAndExecuteTransaction({
        transaction: tx,
        signer: keypair
    });

    console.log('Transaction result:', result);
}

async function transferCoin(coinType: string, amount: number, recipientAddress: string) {
    const tx = new Transaction();

    // Get all coins of the specified type owned by the sender
    const coins = await provider.getCoins({
        owner: keypair.toSuiAddress(),
        coinType: coinType
    });

    // Calculate the total balance
    const totalBalance = coins.data.reduce((sum, coin) => sum + BigInt(coin.balance), 0n);

    if (totalBalance < BigInt(amount)) {
        throw new Error('Insufficient balance');
    }

    // Add coins to the transaction until we reach the desired amount
    let remainingAmount = BigInt(amount);
    for (const coin of coins.data) {
        if (remainingAmount <= 0) break;

        const coinBalance = BigInt(coin.balance);
        if (coinBalance <= remainingAmount) {
            tx.transferObjects([tx.object(coin.coinObjectId)], tx.pure.address(recipientAddress));
            remainingAmount -= coinBalance;
        } else {
            const [splitCoin] = tx.splitCoins(tx.object(coin.coinObjectId), [tx.pure.u64(remainingAmount)]);
            tx.transferObjects([splitCoin], tx.pure.address(recipientAddress));
            break;
        }
    }

    const result = await provider.signAndExecuteTransaction({
        transaction: tx,
        signer: keypair
    });

    console.log('Transaction result:', result);
    return result;
}


// provider.getCoinMetadata({
//     coinType: "0x10182800696c621153e94122c0e43ff3ddb853fd9397915e063cdd6d988883af::regcoin::REGCOIN"
// }).then(coin => {
//     console.log(coin);
// })

// transferCoin(
//     "0x10182800696c621153e94122c0e43ff3ddb853fd9397915e063cdd6d988883af::regcoin::REGCOIN",
//     1 * 1e6, // Amount to transfer (adjust as needed)
//     "0x88f98c9f5d10e04c06e382f0ebd8c7c07b19e325920ecfa9bea22aa4cb968b0f"
// ).then(result => {
//     console.log(result);
// }).catch(error => {
//     console.error('Error:', error);
// });
// mintCoins(TREASURY_CAP_ID, 100000 * 1e6, RECIPIENT_ADDRESS).then(result => {
//     console.log(result);
// });
// listCoinsOwnedByAddress(owner).then(result => {
//     console.log(result);
// });


// await provider.getCoins({
//     owner,
//     coinType: "0x10182800696c621153e94122c0e43ff3ddb853fd9397915e063cdd6d988883af::regcoin::REGCOIN"
// }).then(coins => {
//     const totalBalance = coins.data.reduce((sum, coin) => sum + BigInt(coin.balance), 0n);
//     console.log('Total balance:', totalBalance/BigInt(1e6));
// });


// curl 'https://fullnode.devnet.sui.io/' \
//   -H 'Content-Type: application/json' \
//   -H 'Origin: https://app.cetus.zone' \
//   --data-raw '{"jsonrpc":"2.0","id":9,"method":"sui_getNormalizedMoveFunction","params":["0x8faab90228e4c4df91c41626bbaefa19fc25c514405ac64de54578dec9e6f5ee","pool_script_v2","create_pool_with_liquidity"]}'


// await requestSuiFromFaucetV0({
// 	// connect to Devnet
// 	host: getFaucetHost('testnet'),
// 	recipient: '0x88f98c9f5d10e04c06e382f0ebd8c7c07b19e325920ecfa9bea22aa4cb968b0f',
// }).then(result => {
//     console.log(result);
// });


provider.getBalance({
    owner,
}).then(balance => {
    console.log(balance);
});
// findTreasuryCap(COIN_PACKAGE_ID, owner);
// mintCoins("0xb58c4581a1b42bbf16b8a452af642412b0663f4a9c080a9862625564614ae294", AMOUNT_TO_MINT, RECIPIENT_ADDRESS);
