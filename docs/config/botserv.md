---
id: botserv
title: Setting up BotServ
sidebar_label: BotServ
---

BotServ provides virtual channel bots &mdash; these bots are essentially vanity names for ChanServ.

## BotServ Block

The `botserv{}` block contains settings specific to the BotServ service bot.

A fully configured `botserv{}` block may look like:

```
botserv {
    nick = "BotServ";
    user = "BotServ";
    host = "misconfigured.network";
    real = "Bot Services";
    min_users = 0;
};
```

### Services Bot Options

BotServ supports all [standard services bot options](/docs/config/services).

### min_users

The minimum number of users a channel must have before a Bot is allowed to be assigned to that channel.

Example: `min_users = 0;`

## Modules

By loading or choosing not to load specific modules, you can customize what features your BotServ instance offers. You can even disable BotServ entirely if you choose to load none of these modules.

| Module | Features |
| ------ | -------- |
| `modules/botserv/main` | Core components |
| `modules/botserv/help` | [HELP command](/docs/help/botserv#help) |
| `modules/botserv/info` | [INFO command](/docs/help/botserv#info) |
| `modules/botserv/bottalk` | NPC commands ([SAY](/docs/help/botserv#say), [ACT](/docs/help/botserv#act)) |
| `modules/botserv/set_fantasy` | [SET FANTASY command](/docs/help/botserv#set-fantasy) |
| `modules/botserv/set_nobot` | [SET NOBOT command](/docs/help/botserv#set-nobot) |
| `modules/botserv/set_private` | [SET PRIVATE command](/docs/help/botserv#set-private) |
| `modules/botserv/set_saycaller` | [SET SAYCALLER command](/docs/help/botserv#set-saycaller) |

