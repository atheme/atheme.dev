---
id: rpgserv
title: Setting up RPGServ
sidebar_label: RPGServ
---

RPGServ provides essential network management tools for IRC operators on the IRC network.

## RPGServ Block

The `rpgserv{}` block contains settings specific to the RPGServ service bot.

A fully configured `rpgserv{}` block may look like: 

```
RPGServ {
    nick = "RPGServ";
    user = "RPGServ";
    host = "misconfigured.network";
    real = "RPG Finding Services";
};
```

### Services Bot Options

RPGServ supports all [standard services bot options](/docs/config/services).

## Modules

In addition to loading the RPGServ service bot itself, these modules configure what SASL mechanisms your network will support. 

| Module | Features |
| ------ | -------- |
| `modules/rpgserv/main` | Core components |
| `modules/rpgserv/enable` | [ENABLE](/docs/help/rpgserv#enable) and [DISABLE](/docs/help/rpgserv#disable) commands |
| `modules/rpgserv/help` | [HELP command](/docs/help/rpgserv#help) |
| `modules/rpgserv/info` | [INFO command](/docs/help/rpgserv#info) |
| `modules/rpgserv/list` | [LIST command](/docs/help/rpgserv#list) |
| `modules/rpgserv/search` | [SEARCH command](/docs/help/rpgserv#search) |
| `modules/rpgserv/set` | [SET command](/docs/help/rpgserv#set) |

