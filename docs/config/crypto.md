---
id: crypto
title: Choosing Your Encryption Options
sidebar_label: Cryptography
---

## Password Hashing

Atheme offers a number of options for encrypting user passwords. Unless you specifically need another option, it is **highly recommended** to use the `crypto/pbkdf2v2` module.

If you choose not to load an encryption-capable crypto module, some features of Atheme Services
(e.g. user registration) will result in logged errors that it was not possible to encrypt the user's
password, and some features may not work correctly. In future versions of Atheme, services will be
unable to run without an encryption-capable crypto module. Currently, running without an encryption-capable
crypto module is **HIGHLY** discouraged.

>_Note for existing Atheme Services administrators:_ Upon starting Atheme 
>with an encryption-capable
>crypto module, **ALL UNENCRYPTED PASSWORDS** will be immediately and 
>**irreversibly** converted. This
>conversion may take some time.

The following modules may be loaded to provide password encryption:
* **`modules/crypto/pbkdf2v2`**: PBKDF2 (Needed for SASL SCRAM-SHA support)
* `modules/crypto/argon2d`: Argon2d (Password Hashing Competition, v1.3)
* `modules/crypto/crypt3-openbsd`: OpenBSD `crypt_newhash(3)`
* `modules/crypto/crypt3-sha2-512`: SHA2-512 `crypt(3)`
* `modules/crypto/crypt3-sha2-256`: SHA2-256 `crypt(3)`

### Verify-only Modules

The following modules can only be used to _verify_ existing passwords, such as when upgrading
from an older version of Atheme Services, or when migrating from another services package:

* `modules/crypto/pbkdf2`: PBKDF2 (Version 1, Atheme <= 7.2 compatability)
* `modules/crypto/sodium-scrypt`: Scrypt (Provided via libsodium)
* `modules/crypto/rawsha2-512`: Raw (unsalted) SHA2-512
* `modules/crypto/rawsha2-256`: Raw (unsalted) SHA2-256
* `modules/crypto/anope-enc-sha256`: Anope's customised SHA2-256 (Anope 2.0 compatibility)
* `modules/crypto/rawsha1`: Raw (unsalted) SHA1 (Anope ~1.8 compatibility)
* `modules/crypto/rawmd5`: Raw (unsalted) MD5 (Anope ~1.8 compatibility)
* `modules/crypto/ircservices`: IRCServices' customised MD5 (IRCServices and Anope compatibility)
* `modules/crypto/crypt3-md5`: MD5 `crypt(3)` (Legacy Atheme on Linux compatibility)
* `modules/crypto/crypt3-des`: DES `crypt(3)` (Legacy Atheme on Mac OS X compatbility)
* `modules/crypto/base64`: Base64 (Anope ~1.8 compatibility)

## Configuration

In addition to loading the correct modules, you may also need to set some options in the `crypto{}` block, depending on the choice of hashing algorithm you use.

Many of the options get rather "into the weeds" in terms of how the cryptographic algorithms function. Generally, the defaults will serve fine, but you may adjust them if you are comfortable.

### argon2

Argon2 is one of the more popular encryption choices available, and is generally recommended if for some reason you are unable to use `pbkdf2v2`.

#### argon2_type

This value is the "flavour" of argon2 to use for new passwords.

- **Argon2d** is suitable for use on a dedicated machine that has limited access. It provides the most resistance to GPU and ASIC cracking attacks, but its operation is data-dependent; that is, during its operation, keying material derived from the password itself is indirectly affecting the execution choices made by the algorithm. This creates a side-channel attack that can leak information about the password to other software running on the same physical machine.

- **Argon2i** avoids this by being data-independent. The order of memory accesses, conditional execution, etc. does not depend on the password, or any material derived from the password, so no side-channel that can reveal any information about the password is created. However, this means that it is easier to bruteforce by a password cracker, which does not have to account for execution differences in its implementation. This is the most suitable choice for running on a virtual machine that is co-located with other, untrusted, virtual machines, or on a dedicated machine that runs other, untrusted, software, or has untrusted user access.

- **Argon2id** is a blend of both, limiting the exploitability of any side-channels while retaining excellent resistance to GPU and ASIC cracking. This is suitable for all but the most sensitive of deployments.

All algorithm types perform about equally as well as each other; changing this will not significantly affect the computation time.

The `argon2id` type requires a more recent [libargon2](https://github.com/P-H-C/phc-winner-argon2) library. This is indicated in your `./configure` output ("checking if libargon2 algorithm type ARgon2id appears to be usable...").

Valid values are "argon2d", "argon2i", and "argon2id".

The default is "argon2id", unless unsupported, then "argon2d".

Example: `argon2_type = "argon2id";`

#### argon2_memcost

Memory cost (as a power of 2, in KiB) to use for new passwords.

You should set this as high as is reasonable for the machine you will be running Atheme Services on. If this results in too slow a computation time, reset the time cost below to its minimum value. If it is still to slow, decrement this value (halving the memory usage) until it is fast enough. Alternatively, if it is still too fast after setting this to its highest reasonable value, raise the time cost below until it is not. A benchmark program is available alongside this software to aid in this process.

> Warning: Do **not** set this to more than 20 (1 GiB RAM) on a 32-bit machine or a 32-bit operating system!

Valid values are 3 (8 KiB RAM) to 30 (1 TiB RAM) (inclusive).

The default is 16 (64 MiB RAM).

Example: `argon2_memcost = 16;`

#### argon2_timecost

Time cost (iterations over the memory pool).

Valid values are 3 to 1,048,576 (inclusive).

The default is 3.

Example: `argon2_timecost = 3;`

#### argon2_threads

Number of processor threads to use for new passwords.