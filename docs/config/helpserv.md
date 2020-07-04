---
id: helpserv
title: Setting up HelpServ
sidebar_label: HelpServ
---

HelpServ provides a number of different ways for users to request help from and reach out to network staff.

## HelpServ Block

The `helpserv{}` block contains settings specific to the HelpServ service bot.

A fully configured `helpserv{}` block may look like:

```
botserv {
    nick = "HelpServ";
    user = "HelpServ";
    host = "misconfigured.network";
    real = "Help Services";
};
```

### Services Bot Options

HelpServ supports all [standard services bot options](/docs/config/services).

## Modules

By loading or choosing not to load specific modules, you can customize what features your HelpServ instance offers. You can even disable HelpServ entirely if you choose to load none of these modules.

| Module | Features |
| ------ | -------- |
| `modules/helpserv/main` | Core components |
| `modules/helpserv/helpme` | [HELPME command](/docs/help/helpserv#helpme) |
| `modules/helpserv/ticket` | Help Ticket system |
| `modules/helpserv/services` | Service List ([SERVICES command](/docs/help/helpserv#services)) |
