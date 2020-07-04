---
id: misc
title: Other Configuration Options
sidebar_label: Other
---

## HTTP Server and XMLPRPC

Atheme includes an optional HTTP server and XMLRPC interface which can be used with portal software or other useful things. To enable it, you can load the following modules and configure the `httpd{}` configuration block.

### Modules

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/misc/httpd` | HTTP server | |
| `modules/transport/xmlrpc` | XMLRPC API Interface | Requires the `misc/httpd` module above. |

### HTTPd Block

The `httpd{}` block contains settings specific to the HTTP server module.

An example `httpd{}` block could be:

```
httpd {
    host = "0.0.0.0";
    host = "::";
    www_root = "/var/www";
    port = 8080;
};
```

#### host

The host that the HTTP server will listen on. You can have multiple hosts if you wish to have Atheme listen on multiple interfaces (e.g., for both IPv4 and IPv6). 

Example:

```
host = "0.0.0.0";
host = "::";
```

#### www_root

The `www_root` lists a directory which contains files that should be served by the httpd.

Example: `www_root = "/var/www";`

#### port

The port that the HTTP server will listen on.

Example: `port = 8080;`

## Extended Targets

Atheme can set up special target mapping entities which match multiple users in channel access entries. These targets are defined through the `exttarget` modules listed below.

| Module | Features |
| `modules/exttarget/main` | Exttarget handling core |
| `modules/exttarget/oper` | `$oper` match type |
| `modules/exttarget/registered` | `$registered` match type |
| `modules/exttarget/channel` | `$channel` match type |
| `modules/exttarget/chanacs` | `$chanacs` match type |
| `modules/exttarget/server` | `$server` match type |

## LDAP

Services is able to validate users through LDAP. To do this, load the `modules/auth/ldap` module. This module requires [OpenLDAP](https://www.openldap.org/) client libraries. It uses them in a synchronous manner, which means that an unresponsive LDAP server can freeze services.

### LDAP Block

The `ldap{}` block contains settings specific to LDAP authentication.

Example:

```
ldap {
    url = "ldap://127.0.0.1";
    dnformat = "cn=%s,dc=test,dc=com";
};
```

#### url

The LDAP URL of the server to use.

Example: `url = "ldap://127.0.0.1";`

#### dnformat

The format string to convert an account name to an LDAP DN.

This must contain exactly one `%s` which will be replaced by the account name.

Services will attempt a simple bind with this DN and the given password; the password is considered correct if this is successful.

Example: `dnformat = "cn=%s,dc=test,dc=com";`

## Other Modules

If you have any custom modules built for Atheme, you can include them; for example, if you compiled using `--enable-contrib` and wanted to load a module from the [atheme-contrib-modules](https://github.com/atheme/atheme-contrib-modules) repo. 