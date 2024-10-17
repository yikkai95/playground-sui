// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

//docs::#regulate
module nothing::something {
    use sui::coin::{Self};

    public struct SOMETHING has drop {}

    fun init(witness: SOMETHING, ctx: &mut TxContext) {
        let decimal = 6;
        let (mut treasury_cap, deny_cap, metadata) = coin::create_regulated_currency_v2(
            witness,
            decimal,
            b"SOMETHING",
            b"",
            b"",
            option::none(),
            false,
            ctx,
        );
        // Remove the minting operation
        //mint and transfer
        coin::mint_and_transfer(&mut treasury_cap, 1_000_000_000 * 10u64.pow(decimal), tx_context::sender(ctx), ctx);
        transfer::public_freeze_object(treasury_cap);
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(deny_cap, tx_context::sender(ctx));
    }
}
