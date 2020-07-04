---
id: memoserv
title: Setting up MemoServ
sidebar_label: MemoServ
---

MemoServ provides essential network management tools for IRC operators on the IRC network.

## MemoServ Block

The `memoserv{}` block contains settings specific to the MemoServ service bot.

A fully configured `memoserv{}` block may look like: 

```
memoserv {
    nick = "MemoServ";
    user = "MemoServ";
    host = "misconfigured.network";
    real = "Memo Services";
    maxmemos = 30;
};
```

### Services Bot Options

MemoServ supports all [standard services bot options](/docs/config/services).

### maxmemos

This value sets the maximum amount of memos a user can have in their inbox.

Example: `maxmemos = 30;`

## Modules

In addition to loading the MemoServ service bot itself, these modules configure what SASL mechanisms your network will support. 

| Module | Features |
| ------ | -------- |
| `modules/memoserv/main` | Core components |
| `modules/memoserv/help` | [HELP command](/docs/help/memoserv#help) |
| `modules/memoserv/send` | [SEND command](/docs/help/memoserv#send) |
| `modules/memoserv/sendops` | Send a memo to channel operators ([SENDOPS command](/docs/help/memoserv#sendops)) |
| `modules/memoserv/sendgroup` | Send a memo to a group ([SENDGROUP command](/docs/help/memoserv#sendgroup)) |
| `modules/memoserv/list` | [LIST command](/docs/help/memoserv#list) |
| `modules/memoserv/read` | [READ command](/docs/help/memoserv#read) |
| `modules/memoserv/forward` | [FORWARD command](/docs/help/memoserv#forward) |
| `modules/memoserv/delete` | [DELETE command](/docs/help/memoserv#delete) |
| `modules/memoserv/ignore` | [IGNORE command](/docs/help/memoserv#ignore) |

