# playground-sui

playing with sui and cetus


## cli

```sh
sui move new nothing
sui move build
sui envs
sui client new-env --alias mainnet --rpc https://fullnode.mainnet.sui.io:443
sui client switch --env mainnet
sui client balance
sui client publish
sui client faucet
sui keytool export --key-identity crazy-plasma
```

### mainnet

transactions

```txt
cetux create coin tx
https://suiscan.xyz/mainnet/tx/6AGQtySmPeKGiGmhX1NRcxmaDsqub6EMUpMtY1itoqDd

cetus add lp tx 
https://suivision.xyz/txblock/qKBYmJyhhhyDcz5GVp8NRa6g8xdLucbUCf58F8sCGR6?tab=Overview

cetus swap tx
https://suiscan.xyz/mainnet/tx/4fYS1Wp8D97NJAGPQpesgGpDAtuFChHtWkbEoknXt4Kt
```

output from publishing coin

```txt
Transaction Digest: 6AGQtySmPeKGiGmhX1NRcxmaDsqub6EMUpMtY1itoqDd
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Data                                                                                             │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Sender: 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26                                   │
│ Gas Owner: 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26                                │
│ Gas Budget: 20712800 MIST                                                                                    │
│ Gas Payment:                                                                                                 │
│  ┌──                                                                                                         │
│  │ ID: 0xf6405e1ba756ff5c22ecbf5f7fc646d1fcc73023004a593c997525ad0f98195f                                    │
│  │ Version: 396099509                                                                                        │
│  │ Digest: EjonkYeqjxdwocXcy3csyK6vmUF73cz4KVwNtF8XVWd9                                                      │
│  └──                                                                                                         │
│                                                                                                              │
│ Transaction Kind: Programmable                                                                               │
│ ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────╮ │
│ │ Input Objects                                                                                            │ │
│ ├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ 0   Pure Arg: Type: address, Value: "0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26" │ │
│ ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯ │
│ ╭─────────────────────────────────────────────────────────────────────────╮                                  │
│ │ Commands                                                                │                                  │
│ ├─────────────────────────────────────────────────────────────────────────┤                                  │
│ │ 0  Publish:                                                             │                                  │
│ │  ┌                                                                      │                                  │
│ │  │ Dependencies:                                                        │                                  │
│ │  │   0x0000000000000000000000000000000000000000000000000000000000000001 │                                  │
│ │  │   0x0000000000000000000000000000000000000000000000000000000000000002 │                                  │
│ │  └                                                                      │                                  │
│ │                                                                         │                                  │
│ │ 1  TransferObjects:                                                     │                                  │
│ │  ┌                                                                      │                                  │
│ │  │ Arguments:                                                           │                                  │
│ │  │   Result 0                                                           │                                  │
│ │  │ Address: Input  0                                                    │                                  │
│ │  └                                                                      │                                  │
│ ╰─────────────────────────────────────────────────────────────────────────╯                                  │
│                                                                                                              │
│ Signatures:                                                                                                  │
│    TgsiGq3+J33Nedw81OVzgavGNvCynM8eZLdK2D4Q1T5S6Ba+TsslDwxrwDVh4TCKYB4+Dh0GzdeiSfffMTG3Bw==                  │
│                                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭───────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Transaction Effects                                                                               │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Digest: 6AGQtySmPeKGiGmhX1NRcxmaDsqub6EMUpMtY1itoqDd                                              │
│ Status: Success                                                                                   │
│ Executed Epoch: 552                                                                               │
│                                                                                                   │
│ Created Objects:                                                                                  │
│  ┌──                                                                                              │
│  │ ID: 0x706943bcc39046ba3334f95cc814d43b8e5f67c3b4b99794143dd1fadaebf6ef                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 1                                                                                     │
│  │ Digest: H6AFP8ktGJ3kEdaePXHkSi7oTNcPamzpmczQkbHtMKfS                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xcbdbab0c01dbe173cad4f2bb689b4b21eace62d893e9d0c1c808b8f414484a6a                         │
│  │ Owner: Account Address ( 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26 )  │
│  │ Version: 396099510                                                                             │
│  │ Digest: ANjMHszskLZzDQKJW6fvqaTdExBGXjpDXNr2AChqpHGt                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xe53303d1959762640a0038b96359f5e0559a068521094d1deab697d375a9d581                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 396099510                                                                             │
│  │ Digest: DSFb1kySVa9Dtis9L5otrFKMsWviAXa9rGYsBQCQC7fz                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xf61adac1ca29a3cdb0103ab4b39b96eb27978d64d15c39515becb2e9bf78e391                         │
│  │ Owner: Account Address ( 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26 )  │
│  │ Version: 396099510                                                                             │
│  │ Digest: ABqwaPk593GRwYhWdoaHVWnjkEgZG3m4Lfww3pajnB9T                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xf85b63d21192e0d20b20f1f4c67127f77b1681b3e201f0fd9dea91683d02bd28                         │
│  │ Owner: Account Address ( 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26 )  │
│  │ Version: 396099510                                                                             │
│  │ Digest: AoaW8rtA4HKj1RcFe4WvVLSakTfw37bL9Tr1iPbUxpcv                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xfe7d232efe0aa946274e300e00721c97bd78da57ed89c6d6cc9f196351b4ef41                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 396099510                                                                             │
│  │ Digest: 8HPiYaUBfureRakCvqoKPzBAS4jpD786RaSy5rBFk7qq                                           │
│  └──                                                                                              │
│  ┌──                                                                                              │
│  │ ID: 0xfee4ec161223e59714b10c02e80e105890e3b3cb279ea186d4629b3c9f674986                         │
│  │ Owner: Immutable                                                                               │
│  │ Version: 396099510                                                                             │
│  │ Digest: 7VZ3gXwMj8FXkvPBgbErhyGhKb2XTui4gaDDxH2SSeNo                                           │
│  └──                                                                                              │
│ Mutated Objects:                                                                                  │
│  ┌──                                                                                              │
│  │ ID: 0xf6405e1ba756ff5c22ecbf5f7fc646d1fcc73023004a593c997525ad0f98195f                         │
│  │ Owner: Account Address ( 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26 )  │
│  │ Version: 396099510                                                                             │
│  │ Digest: EEF4LE8TdCRAeyqf3aMKoBxPwvm6gmiQZMniN6ELDo9s                                           │
│  └──                                                                                              │
│ Gas Object:                                                                                       │
│  ┌──                                                                                              │
│  │ ID: 0xf6405e1ba756ff5c22ecbf5f7fc646d1fcc73023004a593c997525ad0f98195f                         │
│  │ Owner: Account Address ( 0x87ca3fb2861389985e0f29eaa5a349c94326066bd9bd8258e9d658d8d508ed26 )  │
│  │ Version: 396099510                                                                             │
│  │ Digest: EEF4LE8TdCRAeyqf3aMKoBxPwvm6gmiQZMniN6ELDo9s                                           │
│  └──                                                                                              │
│ Gas Cost Summary:                                                                                 │
│    Storage Cost: 19212800 MIST                                                                    │
│    Computation Cost: 750000 MIST                                                                  │
│    Storage Rebate: 978120 MIST                                                                    │
│    Non-refundable Storage Fee: 9880 MIST                                                          │
│                                                                                                   │
│ Transaction Dependencies:                                                                         │
│    2wz9tysN5FFvFZ2rCbCgAhnEa94jc41YZXh7qha3rkD7                                                   │
│    49puDQZwHRnu7zYoARCjco1dFKMiK7LVSS8B5Si1yVdh                                                   │
╰───────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─────────────────────────────╮
│ No transaction block events │
╰─────────────────────────────╯
```