---
id: modules
title: Selecting Your Modules
sidebar_label: Modules
---



## Dynamic Security Modules

TODO: Actually figured out this mess.

## Protocol Modules

Different IRC servers use different server-to-server protocols. Below is a listing of the IRCds directly supported by Atheme; if your IRCd is not in this list and does not use an existing protocol, please [file a bug report on the Atheme GitHub](https://github.com/atheme/atheme/issues).

An example of a completed protocol section for _InspIRCd_ would be as follows:
```
loadmodule "modules/protocol/inspircd";
```

If additionally, you wished to load InspIRCd and disable half-op support, you could use the following:
```
loadmodule "modules/protocol/inspircd";
loadmodule "modules/protocol/mixin_nohalfops";
```

For your configuration file, **you will need to select one protocol module**, the following is a list of our primarily supported platforms:

* `modules/protocol/bahamut`: [Bahamut](https://www.dal.net/?page=Bahamut) is a UNIX-based IRCd built by DALnet. This module is targeted to the 2.1.x line, the current release, but is backwards compatible through 1.8.x.
* `modules/protocol/charybdis`: [Charybdis](https://github.com/charybdis-ircd/charybdis) is an ircd-ratbox variant built for better services support. This module supports both the 3.x and 4 lines.
* `modules/protocol/chatircd1.1`: [ChatIRCd](https://www.chatlounge.net/w/index.php/Software) is a fork of Charybdis built by ChatLounge. This module supports the 1.1.x lines.
* `modules/protocol/inspircd`: [InspIRCd](https://www.inspircd.org/) is a modular IRCd available for Linux, BSD, Windows and macOS systems. This module supports both the 2.x and 3.x lines.
* `modules/protocol/ratbox`: [ircd-ratbox](https://www.ratbox.org/) is a traditional IRCd, and the primary IRCd used on EFNet. This module supports the 3.x line.
* `modules/protocol/ircnet`: [ircd 2.11](http://www.irc.org/ftp/irc/server/) is the original IRCd and the primary IRCd used on IRCNet. This module supports the 2.11.x line.
* `modules/protocol/ircd-seven`: [ircd-seven](https://github.com/freenode/ircd-seven) is a fork of Charybdis, built for the freenode IRC network. This module supports the 1.x line.
* `modules/protocol/nefarious`: [Nefarious](https://github.com/evilnet/nefarious2) is a fork of IRCu by the AfterNet IRC network. _Supported versions of this IRCd is currently in review._
* `modules/protocol/ngircd`: [ngIRCd](https://ngircd.barton.de/) is a lightweight IRCd. _This module is experimental and has had limited in-production testing_. This module supports the 20.x line.
* `modules/protocol/unreal4`: [UnrealIRCd](https://www.unrealircd.org/) is a configurable and popular IRCd. This module support the 4.x line.

### Legacy Protocol Modules

Atheme additionally provides legacy support for a number of older IRC daemons which still see production use. Although these IRC daemons are not recommended, these modules are included in the base Atheme distribution and are fully supported by Atheme Services.

* `modules/protocol/asuka`: Asuka is an ircu-based IRCd formerly used by QuakeNet, although it has been replaced by snircd. This module supports versions 1.2.1 and later.
* `modules/protocol/dreamforge`: DreamForge is an IRCd formerly used by DALnet, although it has been replaced by Bahamut. This module supports versions 4.6.7 and later.
* `modules/protocol/unreal`: UnrealIRCd's 3.2.x line is incompatible withe the `unreal4` protocol module. This module supports the 3.2.x line, although production networks are recommended to migrate to the currently supported 4.x line.

### Protocol Mixins

These mixins allow you to disable specific feature support if you do not have/want features which your IRCd normally has available. These modules only adjust feature support within Atheme; you will need to review your IRCd's configuration to disable them on the server side as well.

_Note: If you do not know what these mean, you most likely **do not** want to enable these modules._

* `modules/protocol/mixin_nohalfops`: Disable **half-op** status mode
* `modules/protocol/mixin_noprotect`: Disable **protected** (Also known as **admin**) status mode
* `modules/protocol/mixin_noowner`: Disable **owner** status mode
* `modules/protocol/mixin_noholdnick`: Specify that `NickServ/GHOST` and `NickServ/RELEASE` should use enforcer clients instead of the IRCd-specific nickname reservation functions.



## Password Hashing

Atheme offers a number of options for encrypting user passwords. Unless you specifically need another option, it is **highly recommended** to use the `crypto/pbkdf2v2` module.

If you choose not to load an encryption-capable crypto module, some features of Atheme Services
(e.g. user registration) will result in logged errors that it was not possible to encrypt the user's
password, and some features may not work correctly. In future versions of Atheme, services will be
unable to run without an encryption-capable crypto module. Currently, running without an encryption-capable
crypto module is **HIGHLY** discouraged.

_Note for existing Atheme Services administrators:_ Upon starting Atheme with an encryption-capable
crypto module, ALL UNENCRYPTED PASSWORDS will be immediately and **irreversibly** converted. This
conversion may take some time.

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


