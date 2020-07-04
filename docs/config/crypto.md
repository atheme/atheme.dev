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

It is recommended to either leave the values at their defaults, or experiment with them so that it takes approximately 0.2-0.4 seconds for users to identify. Services blocks while the password is being encrypted or verified, so don't set these too large, or people can hang services by trying many password attempts at once.

Example (argon2):

```
crypto {
    argon2_type = "argon2id";
    argon2_memcost = 16;
    argon2_timecost = 3;
    argon2_threads = 1;
    argon2_saltlen = 16;
    argon2_hashlen = 64;
};
```

Example (scrypt):

```
crypto {
    scrypt_memlimit = 14;
    scrypt_opslimit = 524288;
};
```

Example (pbkdf2v2):

```
crypto {
    pbkdf2v2_digest = "SHA2-512";
    pbkdf2v2_rounds = 64000;
    pbkdf2v2_saltlen = 32;
};
```

Example (bcrypt):

```
crypto {
    bcrypt_cost = 7;
};
```

### Benchmarking

A benchmarking program for Argon2, scrypt and PBKDF2 is available to assist with tuning these parameters:

```bash
$ ./configure --prefix=foo ...
$ make
$ make install
$ ${foo}/bin/atheme-crypto-benchmark -o
```

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

If you want to increase the amount of computation effort required, while not increasing the real ("wall clock") time required, raise this setting to tis maximum reasonable value for the machine you will be running this software on.

This software is not multi-threaded, so only one password will be verified at a time. Therefore, you do **not** need to divide this by the expected maximum number of simultaneous logins.

It is pointless to set this higher than the number of hardware processing threads you have; increase the time cost above instead if you want to make it arbitrarily slower. Diminishing returns are to be expected once you exceed the number of hardware processing _cores_ you have; hyperthreading does **not** provide much (if any) of a boost for this workload.

Increasing this value will **decrease** the real time required, so you may have to subsequently increase the time cost above again to make it "just slow enough" once more. A benchmark program is available alongside this software to aid in this process.

**Warning:** The (size of the) memory pool configured above is split between the threads, which can result in too small a memory area per-thread if many threads are used. If you set this value, it is **highly recommended** that you run the included benchmarking program with the same configuration options, to confirm that it works!

**Warning:** This feature is experimental. Some of the code in this software is not thread-safe, and although every effort has been made to ensure that this feature will not interfere with the operation of this software, this cannot be guaranteed.

Valid values are 1 to 255 (inclusive).

The default is 1 (do not use any computational parallelism).

Example: `argon2_threads = 1;`

#### argon2_saltlen

Salt length (in bytes) to use for new passwords. You should only change this if absolutely necessary; for example, to interoperate with other software. Its value doesn't significantly affect the computation time.

Valid values are 4 to 48 (inclusive).

The default is 16.

Example: `argon2_saltlen = 16;`

#### argon2_hashlen

Digest length (in bytes) to use for new passwords. You should only change this if absolutely necessary; for example, to interoperate with other software. Its value doesn't significantly affect the computation time.

Valid values are 16 to 128 (inclusive).

The default is 64.

Example: `argon2_hashlen = 64;`

### Scrypt

#### scrypt_memlimit

Memory cost (as a power of 2, in KiB) to use for new passwords.

You should set this as high as is reasonable for the machine you will be running Atheme Services on. If this results in too slow a computation time, reset the time cost below to its minimum value. If it is still to slow, decrement this value (halving the memory usage) until it is fast enough. Alternatively, if it is still too fast after setting this to its highest reasonable value, raise the time cost below until it is not. A benchmark program is available alongside this software to aid in this process.

> Warning: Do **not** set this to more than 20 (1 GiB RAM) on a 32-bit machine or a 32-bit operating system!

Valid values are 14 (16 MiB RAM) to 26 (64 GiB RAM) (inclusive).

The default is 14 (16 MiB RAM).

Example: `scrypt_memlimit = 14;`

#### scrypt_opslimit

Amount of computation to perform for new passwords.

The default value for this option is based on the default value of the above option. The recommended value is `(memlimit_bytes / 32)`.

Valid values are 32,768 to 4,294,967,295 (inclusive).

The default value is 524,288.

Example: `scrypt_opslimit = 524288;`

### PBKDF2v2

If you are using the PBKDF2 module, its performance will be significantly affected by your choice of cryptographic digest library. This software can currently interface with three libraries; in decreasing order of performance:

- [OpenSSL (libcrypto)](https://www.openssl.org/)
- [GnuPG (libgcrypt)](https://gnupg.org/software/libgcrypt/index.html)
- [ARM mbedTLS (libmbedcrypto)](https://tls.mbed.org/)

If you have one of these libraries available at configure-time, the PBKDF2 module will perform significantly better, allowing you to raise its iteration count without affecting the computation time. This is indicated by the output of the configure script; "Digest Frontend". The benchmark program will also inform you what cryptographic digest library it is using, if any.

#### pbkdf2v2_digest

Cryptographic digest algorithm to use (in HMAC mode).

Valid values are "SHA1", "SHA2-256", and "SHA2-512".

Additionally, the following aliases exist, for compatibility:

| Alias | Digest |
| ----- | ------ |
| SHA-1 | SHA1 |
| SHA256 | SHA2-256 |
| SHA512 | SHA2-512 |
| SHA-256 | SHA2-256 |
| SHA-512 | SHA2-512 |

Finally, you can prefix this value with "SCRAM-" to enable the computation and storage of an RFC5802/SCRAM ServerKey and StoredKey, instead of a raw PBKDF2 digest (SaltedPassword). Verification of plaintext passwords against these digests can still be performed (e.g. for NickServ IDENTIFY or SASL PLAIN), by computing a new SCRAM ServerKey from the provided password and comparing it to the stored ServerKey, so setting this to a SCRAM mode does **not** prevent non-SCRAM logins. For these variants, please read [SCRAM-SHA Support](/docs/sasl/sasl-scram-sha).

The default is "SHA2-512".

Example: `pbkdf2v2_digest = "SHA2-512";`

#### pbkdf2v2_rounds

This is the PBKDF2 "iteration count". You should raise this as high as is reasonable for the machine you will be running services on. However, note that if you are going to deploy SASL SCRAM support, the **client**, not services, performs the PBKDF2 calculation during login, so keep in mind that many mobile clients will not perform as well as a server, and reduce the iteration count accordingly. Also, some clients will refuse to perform a login at all if this is set too high. A benchmark program is included alongside this software to aid in tuning this parameter.

Valid values are 10,000 to 5,000,000 (inclusive).

The default is 64,000.

Example: `pbkdf2v2_rounds = 64000;`

### bcrypt

#### bcrypt_cost

Amount of rounds to perform for new passwords (as a power of 2). You should raise this as high as is reasonable. A benchmark program is available alongside this software to aid in this process.

Valid values are 4 to 31 (inclusive).

The default is 7.

Example: `bcrypt_cost = 7;`

### Crypt3 SHA2

#### crypt3_sha_*_rounds

> Note: Use of this option is restricted to certain C libraries! Currently, only **GNU glibc** v2.7+ is known to work.

Valid values are 5,000 to 1,000,000 (inclusive).

The default is 5,000.

Examples:

```
crypt3_sha2_256_rounds = 5000;
crypt3_sha2_512_rounds = 5000;
```

