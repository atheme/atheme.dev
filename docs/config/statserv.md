---
id: statserv
title: Setting up StatServ
sidebar_label: StatServ
---

StatServ provides basic statistics and split tracking.

## StatServ Block

The `statserv{}` block contains settings specific to the StatServ service bot.

A fully configured `statserv{}` block may look like:

```
statserv {
    nick = "StatServ";
    user = "StatServ";
    host = "misconfigured.network";
    real = "Statistics Services";
};
```

### Services Bot Options

StatServ supports all [standard services bot options](/docs/config/services).

## Modules

By loading or choosing not to load specific modules, you can customize what features your StatServ instance offers. You can even disable StatServ entirely if you choose to load none of these modules.

| Module | Features |
| ------ | -------- |
| `modules/statserv/main` | Core components |
| `modules/statserv/channel` | [CHANNEL command](/docs/help/statserv#channel) |
| `modules/statserv/netsplit` | [NETSPLIT command](/docs/help/statserv#netsplit) |
| `modules/statserv/server` | [SERVER command](/docs/help/statserv#server) |


