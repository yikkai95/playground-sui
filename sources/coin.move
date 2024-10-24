// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module playground::pie {
    use sui::coin::{Self};

    public struct PIE has drop {}

    fun init(witness: PIE, ctx: &mut TxContext) {
        let decimal = 6;
        let (mut treasury_cap, deny_cap, metadata) = coin::create_regulated_currency_v2(
            witness,
            decimal,
            b"PIE",
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
