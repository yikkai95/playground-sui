const escrow =
  "0xb521516c619cfe87ea57c61f57f5361d651bb9a2c082a4cb72f28825461b05d1";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui/faucet";
import { Transaction } from "@mysten/sui/transactions";

const admin = Ed25519Keypair.fromSecretKey(
  Deno.env.get("wallet")!,
);
const alice = Ed25519Keypair.fromSecretKey(
  "suiprivkey1qzaehjfk7nyd04uhhpc06e3gy767nnyjx9gcntnu25n38phjputpx0em6eq",
);
const ben = Ed25519Keypair.fromSecretKey(
  "suiprivkey1qz45sn83kjvhvsd7arkdzuyjpcq5as6px25727pk7xlkuwpkkxqfyfvnjg9",
);
// // use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl("localnet");

// // create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });

const CANDY =
  "0x12e5f5155b252452df3f8fe8da500b4a0a43e2066fcc8ac5c1fc06a82fecda57::candy::CANDY";
const PIE =
  "0x12e5f5155b252452df3f8fe8da500b4a0a43e2066fcc8ac5c1fc06a82fecda57::pie::PIE";

async function takeOffer(escrowId: string) {
  const tx = new Transaction();

  // Call the mint function
  tx.moveCall({
    target:
      `0x12e5f5155b252452df3f8fe8da500b4a0a43e2066fcc8ac5c1fc06a82fecda57::escrow::take_offer`,
    typeArguments: [CANDY, PIE],
    arguments: [
      //tx.sharedObjectRef({
      //  mutable: true,
      //  objectId: escrowId,
      //  initialSharedVersion: "4",
      //}),
      tx.object(escrowId),
      tx.object(
        "0x84e2a955bbb246c42fcb8110184ba90433fb9973a74e868a167aaab648c46e03",
      ),
    ],
  });

  // Sign and execute the transaction
  const result = await client.signAndExecuteTransaction({
    transaction: tx,
    signer: ben,
  });
  console.log("Transaction result:", result);
  return result;
}

//
//async function createOffer() {
//    const tx = new Transaction();
//
//    // Call the mint function
//    tx.moveCall({
//        target: `0x12e5f5155b252452df3f8fe8da500b4a0a43e2066fcc8ac5c1fc06a82fecda57::escrow::create_offer`,
//        typeArguments: [CANDY, PIE],
//        arguments: [
//            tx.object("0x0b8dfa66bd60a999105105dc338ad1b80b54766847356942462bf70fe3d9516c"),
//            tx.pure.u64(100),
//            tx.pure.u64(1000),
//        ],
//    });
//
//    //   // Transfer the newly minted coin to the recipient
//    //   tx.transferObjects([coin], tx.pure.address(recipientAddress));
//
//    // Sign and execute the transaction
//    const result = await client.signAndExecuteTransaction({ transaction: tx, signer: admin });
//    console.log('Transaction result:', result);
//    return result;
//}

//createOffer().then(console.log)

//await Promise.all([
//  requestSuiFromFaucetV0({
//    host: getFaucetHost("localnet"),
//    recipient: alice.toSuiAddress(),
//  }),
//  requestSuiFromFaucetV0({
//    host: getFaucetHost("localnet"),
//    recipient: ben.toSuiAddress(),
//  }),
//]);

async function sendCoin() {
  //await client.getCoins({
  //  coinType: PIE,
  //  owner: admin.toSuiAddress(),
  //}).then(console.log)
  const tx = new Transaction();
  const [splitCoin] = tx.splitCoins(
    tx.object(
      "0x96462af54d1a1d0fc89d3df50f5ea44bf27591c260c67cf5ac7feb01b6f30e5c",
    ),
    [tx.pure.u64("1000")],
  );

  tx.transferObjects([
    splitCoin,
  ], tx.pure.address(ben.toSuiAddress()));
  const result = await client.signAndExecuteTransaction({
    transaction: tx,
    signer: admin,
  });
  console.log(result);
}
//sendCoin();

//takeOffer();
//client.getAllCoins({ owner: ben.toSuiAddress() }).then(console.log);
//0x84e2a955bbb246c42fcb8110184ba90433fb9973a74e868a167aaab648c46e03

//client.queryEvents({
//  query: {
//    Sender: admin.toSuiAddress(),
//  },
//}).then(console.log)

export type SharedObjectOwner = {
  ObjectOwner: string;
} /** Object is shared, can be used by any address, and is mutable. */ | {
  Shared: {
    /** The version at which the object became shared */
    initial_shared_version: string;
  };
};

//client.queryTransactionBlocks({
//  filter: {
//    MoveFunction: {
//      function: "create_offer",
//      package:
//        "0x12e5f5155b252452df3f8fe8da500b4a0a43e2066fcc8ac5c1fc06a82fecda57",
//      module: "escrow",
//    },
//  },
//  options: {
//    showEffects: true,
//  },
//}).then((o) => {
//  o.data.map((e) => {
//    const shared = e.effects?.created?.filter((o) => {
//      //return "Shared" in o.owner;
//      if (typeof o.owner === "object" && "Shared" in o.owner) {
//        return true; // It's a shared object
//      }
//      return false; // It's not shared
//    });
//    console.log(shared);
//  });
//});

const escrowId =
  "0x5c341b5f2761d363a09a37a48b7c1b905861c96e6d208786854dcd59ac6bd047";
//client.getObject({ id: escrowId, options: { showContent: true } }).then(
//  console.log,
//);

//takeOffer(escrowId);
//client.getTransactionBlock({
//  digest: "6NHRo8niZfwYN7eB6aht2x42cjfzZ31KcKFM6yT66oUd",
//  options: { showObjectChanges: true },
//}).then(console.log);
client.getAllCoins({ owner: ben.toSuiAddress() }).then(console.log);
