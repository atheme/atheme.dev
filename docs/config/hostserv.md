---
id: hostserv
title: Setting up HostServ
sidebar_label: HostServ
---

HostServ provides advanced virtual hostname (vhost) management.

## HostServ Block

The `hostserv{}` block contains settings specific to the HostServ service bot.

A fully configured `hostserv{}` block may look like: 

```
hostserv {
    nick = "HostServ";
    user = "HostServ";
    host = "misconfigured.network";
    real = "Host Management Services";
    aliases {
        "APPROVE" = "ACTIVATE";
        "DENY" = "REJECT";
    };
};
```

### Services Bot Options

HostServ supports all [standard services bot options](/docs/config/services).

### reggroup

This group will receive memos when a user requests a new vhost.

### request_per_nick

This value sets whether the request system works per nick or per account. The recommended setting is to leave this disabled, so that vhosts work as consistently as possible.

## Modules

In addition to loading the HostServ service bot itself, these modules configure what SASL mechanisms your network will support. 

| Module | Features |
| ------ | -------- |
| `modules/hostserv/main` | Core components |
| `modules/hostserv/help` | [HELP command](/docs/help/hostserv#help) |
| `modules/hostserv/offer` | [OFFER system](/docs/help/hostserv#offer) |
| `modules/hostserv/onoff` | [ON](/docs/help/hostserv#on) and [OFF](/docs/help/hostserv#off) commands |
| `modules/hostserv/request` | [REQUEST system](/docs/help/hostserv#request) |
| `modules/hostserv/vhost` | [VHOST](/docs/help/hostserv#vhost) and [LISTVHOST](/docs/help/hostserv#listvhost) commands |
| `modules/hostserv/vhostnick` | [VHOSTNICK command](/docs/help/hostserv#vhostnick) |
| `modules/hostserv/group` | [GROUP command](/docs/help/hostserv#group) |
| `modules/hostserv/drop` | [DROP command](/docs/help/hostserv#drop) |

