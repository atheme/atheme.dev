---
id: proxyscan
title: Setting up ProxyScan & DNSBLs
sidebar_label: ProxyScan
---

Proxyscan provides DNS blacklist scanning for proxies.

## Proxyscan Block

The `proxyscan{}` block contains settings specific to the Proxyscan service bot and DNSBLs.

A fully configured `proxyscan{}` block may look like:

```
proxyscan {
    nick = "proxyscan";
    user = "Proxyscan";
    host = "misconfigured.network";
    real = "Proxyscan Service";
    
    blacklists {
        "dnsbl.dronebl.org";
        "rbl.efnetrbl.org";
        "tor.efnet.org";
    };

    dnsbl_action = kline;
};
```

### Services Bot Options

Proxyscan supports all [standard services bot options](/docs/config/services).

### blacklists

This configuration section is a list of DNS blacklists to use when scanning connecting hosts. It takes a list of domains where each domain is one blacklist to use.

Example: 

```
blacklists {
    "dnsbl.dronebl.org";
    "rbl.efnetrbl.org";
    "tor.efnetrbl.org";
};
```

### dnsbl_action

This field sets what action for Atheme to perform when a connecting host matches one of the blacklists. The options are:

- `NONE`: Do nothing
- `NOTIFY`: Notify the user that they are listed in a blacklist, and which blacklist they are listed in
- `SNOOP`: Report the user to the logchannel or services channel
- `KLINE`: AKILL the user from the network (default AKILL is 24 hours)

Example: `dnsbl_action = kline;`

## Modules

Proxyscan has two available modules, you will want to load both modules if you wish to use the Proxyscan service.

| Module | Features |
| ------ | -------- |
| `modules/proxyscan/main` | Core components |
| `modules/proxyscan/dnsbl` | DNSBL scanning |

