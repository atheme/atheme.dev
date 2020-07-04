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


