---
id: saslserv
title: Setting up SaslServ
sidebar_label: SaslServ
---

SaslServ provides essential network management tools for IRC operators on the IRC network.

## SaslServ Block

The `saslserv{}` block contains settings specific to the SaslServ service bot.

A fully configured `saslserv{}` block may look like: 

```
saslserv {
    nick = "SaslServ";
    user = "SaslServ";
    host = "misconfigured.network";
    real = "SASL Authentication Agent";
    #hide_server_names;
};
```

### Services Bot Options

SaslServ supports most [standard services bot options](/docs/config/services). SaslServ does not offer any direct commands, so the `aliases{}` and `access{}` configuration options are not applicable.

### hide_server_names

If enabled, the SASL `bad_password` message will hide server names.

Example: `hide_server_names;`

## Modules

In addition to loading the SaslServ service bot itself, these modules configure what SASL mechanisms your network will support. 

> Note: Your IRCd must also support SASL for this service bot to work.

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/saslserv/main` | Core components | |
| `modules/saslserv/authcookie` | AUTHCOOKIE mechanism | Used by the legacy IRIS webirc client. |
| `modules/saslserv/ecdh-x25519-challenge` | ECDH-X25519-CHALLENGE mechanism | Support for this mechanism requires that Atheme be compiled against a cryptographic library that provides X25519 ECDH support: [BoringSSL](https://boringssl.googlesource.com/boringssl), [LibreSSL](https://www.libressl.org/), [ARM mbedTLS](https://tls.mbed.org/), [Nettle](http://www.lysator.liu.se/~nisse/nettle/), [Sodium](https://doc.libsodium.org/), etc. This will be checked while running `./configure`. |
| `modules/saslserv/ecdsa-nist256p-challenge` | ECDSA-NIST256P-CHALLENGE mechanism | Support for this mechanism requires that Atheme be compiled against an [OpenSSL](https://www.openssl.org/) with ECDSA support (e.g. **not** the version available in RHEL, etc., unless you compile your own). This will be checked while running `./configure`. |
| `modules/saslserv/external` | EXTERNAL mechanism ([IRCv3.1+](https://ircv3.net/specs/extensions/sasl-3.2)) | |
| `modules/saslserv/plain` | PLAIN mechanism | |
| `modules/saslserv/scram` | SCRAM-SHA-* mechanisms | You **must** read [SCRAM-SHA Support](/docs/sasl/sasl-scram-sha) before loading this module. |

