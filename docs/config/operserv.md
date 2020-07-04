---
id: operserv
title: Setting up OperServ
sidebar_label: OperServ
---

OperServ provides essential network management tools for IRC operators on the IRC network.

## OperServ Block

The `operserv{}` block contains settings specific to the OperServ service bot.

A fully configured `operserv{}` block may look like: 

```
operserv {
    nick = "OperServ";
    user = "OperServ";
    host = "misconfigured.network";
    real = "Operator Services";
};
```

### Services Bot Options

OperServ supports all [standard services bot options](/docs/config/services).

## Modules

You can customize which features of your network's OperServ instance are available by loading or choosing not to load any of these modules.

> Note: **All** of the SET commands presented through OperServ modules are temporary and will only persist until the next rehash. Restarting services or rehashing the configuration will always reapply config-based settings.

> Note: The majority of these commands are priviledged commands, and are not available unless a user is SOPERed. 

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/operserv/main` | Core components | |
| `modules/operserv/akill` | [AKILL system](/docs/help/operserv#akill) | |
| `modules/operserv/clearchan` | [CLEARCHAN command](/docs/help/operserv#clearchan) | |
| `modules/operserv/clones` | [CLONES command](/docs/help/operserv#clones) | |
| `modules/operserv/compare` | [COMPARE command](/docs/help/operserv#compare) | |
| `modules/operserv/genhash` | [GENHASH command](/docs/help/operserv#genhash) | |
| `modules/operserv/greplog` | [GREPLOG command](/docs/help/operserv#greplog) | |
| `modules/operserv/help` | [HELP command](/docs/help/operserv#help) | |
| `modules/operserv/ignore` | [IGNORE system](/docs/help/operserv#ignore) | |
| `modules/operserv/identify` | [IDENTIFY command](/docs/help/operserv#identify) | |
| `modules/operserv/info` | [INFO command](/docs/help/operserv#info) | |
| `modules/operserv/inject` | [INJECT command](/docs/help/operserv#inject) | This module should only be used for development/debugging purposes. | 
| `modules/operserv/jupe` | [JUPE command](/docs/help/operserv#jupe) | |
| `moudles/operserv/mode` | [MODE command](/docs/help/operserv#mode) | |
| `modules/operserv/modinspect` | [MODINSPECT command](/docs/help/operserv#modinspect) | |
| `modules/operserv/modlist` | [MODLIST command](/docs/help/operserv#modlist) | |
| `modules/operserv/modload` | [MODLOAD command](/docs/help/operserv#modload) | |
| `modules/operserv/modreload` | [MODRELOAD command](/docs/help/operserv#modreload) | |
| `modules/operserv/modunload` | [MODUNLOAD command](/docs/help/operserv#modunload) | |
| `modules/operserv/noop` | [NOOP system](/docs/help/operserv#noop) | |
| `modules/operserv/rakill` | Regex mass AKILL ([RAKILL command](/docs/help/operserv#rakill)) | |
| `modules/operserv/raw` | [RAW command](/docs/help/operserv#raw) | This module is provided only for debugging/development purposes. Use of this command will **probably break something.** |
| `modules/operserv/readonly` | [READONLY command](/docs/help/operserv#readonly) | |
| `modules/operserv/rehash` | [REHASH command](/docs/help/operserv#rehash) | |
| `modules/operserv/restart` | [RESTART command](/docs/help/operserv#restart) | |
| `modules/operserv/rmatch` | Display regex matching ([RMATCH command](/docs/help/operserv#rmatch)) | |
| `modules/operserv/rnc` | Most common realnames ([RNC command](/docs/help/operserv#rnc)) | |
| `modules/operserv/rwatch` | [RWATCH system](/docs/help/operserv#rwatch) | |
| `modules/operserv/set` | **ALL** of the below SET commands | This module is deprecated and should not be used, please add the specific SET commands you wish to enable instead. |
| `modules/operserv/set_akicktime` | [SET AKICKTIME command](/docs/help/operserv#set-akicktime) | |
| `modules/operserv/set_chanexpire` | [SET CHANEXPIRE command](/docs/help/operserv#set-chanexpire) | |
| `modules/operserv/set_commitinterval` | [SET COMMITINTERVAL command](/docs/help/operserv#set-commitinterval) | |
| `modules/operserv/set_enforceprefix` | [SET ENFORCEPREFIX command](/docs/help/operserv#set-enforceprefix) | |
| `modules/operserv/set_klinetime` | [SET KLINETIME command](/docs/help/operserv#set-klinetime) | |
| `modules/operserv/set_maxchanacs` | [SET MAXCHANACS command](/docs/help/operserv#set-maxchanacs) | |
| `modules/operserv/set_maxchans` | [SET MAXCHANS command](/docs/help/operserv#set-maxchans) | |
| `modules/operserv/set_maxfounders` | [SET MAXFOUNDERS command](/docs/help/operserv#set-maxfounders) | |
| `modules/operserv/set_maxlogins` | [SET MAXLOGINS command](/docs/help/operserv#set-maxlogins) | |
| `modules/operserv/set_maxnicks` | [SET MAXNICKS command](/docs/help/operserv#set-maxnicks) | |
| `modules/operserv/set_maxusers` | [SET MAXUSERS command](/docs/help/operserv#set-maxusers) | |
| `modules/operserv/set_mdlimit` | [SET MDLIMIT command](/docs/help/operserv#set-mdlimit) | |
| `modules/operserv/set_nickexpire` | [SET NICKEXPIRE command](/docs/help/operserv#set-nickexpire) | |
| `modules/operserv/set_recontime` | [SET RECONTIME command](/docs/help/operserv#set-recontime) | |
| `modules/operserv/set_spam` | [SET SPAM command](/docs/help/operserv#set-spam) | |
| `modules/operserv/sgline` | [SGLINE system](/docs/help/operserv#sgline) | |
| `modules/operserv/shutdown` | [SHUTDOWN command](/docs/help/operserv#shutdown) | |
| `modules/operserv/soper` | Non-configuration services operator privileges ([SOPER command](/docs/help/operserv#soper)) | |
| `modules/operserv/specs` | Services operator privilege display ([SPECS command](/docs/help/operserv#specs)) | |
| `modules/operserv/sqline` | [SQLINE command](/docs/help/operserv#sqline) | |
| `modules/operserv/update` | [UPDATE command](/docs/help/operserv#update) | |
| `modules/operserv/uptime` | [UPTIME command](/docs/help/operserv#uptime) | |

