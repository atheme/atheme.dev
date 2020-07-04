---
id: chanserv
title: Setting up ChanServ
sidebar_label: ChanServ
---

ChanServ provides channel registration services, which allows users to own channels. It is not required, but is strongly recommended. 

Most networks will want Chanserv, however ff you would prefer for Atheme to provide basic channel management functionality, without full channel ownership, you can skip to [Setting up CHANFIX](/docs/config/chanfix), which offers an Efnet-style CHANFIX service.

## ChanServ Block

The `chanserv{}` block contains settings specific to the ChanServ service bot and related channel ownership/management settings.

A fully configured `chanserv{}` block may look like:

```
chanserv {
    nick = "ChanServ";
    user = "ChanServ";
    host = "misconfigured.network";
    real = "Channel Services";
    reggroup = "!Services-Team";
    maxchans = 5;
    fantasy;
    templates {
        vop = "+AV";
        hop = "+AHehitrv";
        aop = "+AOehiortv";
        sop = "+AOaefhiorstv";

        founder = "+AFORaefhioqrstv";
    };
    changets;
    expire = 30;
    maxchanacs = 0;
    maxfounders = 4;
    antiflood_enforce_method = quiet;
    show_custom_metadata;
    shorthelp = "REGISTER DROP OP DEOP AKICK FLAGS";
};
```

### Services Bot Options

ChanServ supports all [standard services bot options](/docs/config/services).

### reggroup

The group that will receive memos about channel registration requests when `chanserv/moderate` is loaded.

This may be left unset if your services setup does not use `chanserv/moderate` or does not use a group for this.

Example: `reggroup = "!Services-Team";`

### maxchans

This value sets the maximum amount of channels someone can register.

Example: `maxchans = 5;`

### fantasy

This value enables fantasy commands, such as:

```
<user> !op
-- Mode #channel [+o user] by ChanServ
```

Fantasy commands can use a lot of CPU on higher volume networks and will only work if you have [`general:join_chans`](/docs/config/general#join_chans) enabled as well.

To globally disable fantasy commands, you can unset this value, or leave it set to enable them.

Example: `fantasy;`

### hide_xop

Hides the XOP templates from sight. This is useful if you want to use XOP templates or have them available, but do not want the XOP templates to be displayed.

### templates

Defines what flags the global templates comprise. This setting manages both normal templates and the special XOP templates.

Historically, before Atheme popularized the more granular flags system, IRC services packages managed access levels through a series of broader templates &mdash; VOP, HOP, AOP, and SOP; collectively referred to as XOP &mdash; to assist users familiar with these legacy services packages, Atheme offers a handful of commands using XOP-style templates which apply a defined selection of flags.

For the special XOP templates:

- These should all be different and not equal to the empty set (`""`), except that **hop** may be equal to **vop** to disable hop.
- Each subsequent level should have more flags (+VHO are optional as these only apply automatic voice/half-op/op, no actual permissions).
- For optimal functioning of `/msg ChanServ FORCEXOP`, **aop** should not have any of `+sRf` flags,  **hop** should not have any of `+sRfoOr`, and **vop** should not have any of `+sRfoOrhHt`. 
- If this is not specified, the values of Atheme 0.3 are used, which are generally less intuitive than these.

> Note: Changing these templates leaves the flags of the existing channel access entries unchanged, thus removing those entries from the view of `/msg ChanServ XOP LIST`. Usually, the channel founder can use `/msg ChanServ FORCEXOP` to update the entries to the new levels.

If you want to add a co-founder role, a recommendation is to remove the flags (`+f`) permission from the **sop** role, and define a co-founder role with flags permissions.

Example (with recommended XOP flags):

```
templates {
    vop = "+AV";
    hop = "+AHehitrv";
    aop = "+AOehiortv";
    sop = "+AOaefhiorstv";

    founder = "+AFORaefhioqrstv";
};
```

Example of non-XOP templates:

```
templates {
    member = "+Ai";
    op = "+AOiortv";
};
```

You can find more details about what permissions each flags supplies in the [flag matrix](/docs/help/chanserv#flags-matrix). 

### deftemplates

The default templates to set on new channels, as a space-separated list of `name=+flags` pairs.

> Note: Currently, no syntax checking is done on this; it is your responsibility to make sure it is correct.

If you do not wish to apply default templates, you can leave this value comment out/unset.

Example: `deftemplates = "MEMBER=+Ai OP=+AOiortv";`

### changets

Change the channel timestamp to the registration time when someone recreates a registered channel, ensuring they are deopped and all their modes are undone. 

> Note: this involves ChanServ temporarily joining the channel.

When the channel was not recreated no deops will be done, apart from any applied by the `SECURE` option.

This also solves the "join-mode" problem where someone recreates a registered channel and then sets modes before they are deopped.

This is currently supported for charybdis, ratbox, bahamut, and inspircd 1.1+.

Example: `changets;`

### trigger

This setting allows you to change the trigger prefix for ChanServ's in-channel "fantasy" command feature.

If no setting is provided, the default is used, which is "!". 

> Other popular choices you could consider trying: ".", "~", "?", "`", "'".

Example: `trigger = "!";`

### expire

The number of days before inactive registrations are expired.

If unset or set to 0, channel registrations will not expire.

Example: `expire = 30;`

### maxchanacs

The maximum number of channel entries allowed in a channel's access list &mdash; this includes both permission-granting entries and AKICKs &mdash; set to 0 for unlimited entries.

Example: `maxchanacs = 0;`

### maxfounders

The maximum number of founders (flag `+F`) allowed in a channel.

> Note: All founders have the exact same privileges and the list of founders is shown in various places.

Example: `maxfounders = 4;`

### founder_flags

The flags a user will get when they register a new channel. This **must** include at least `F` or it will be ignored.

If it is not set, Atheme will give the user all channel flags.

Example: `founder_flags = "AFORefiorstv";`

### akick_time

The default expiration time (in minutes) for AKICKs.

Comment this option out or set to zero for permanent AKICKs by default (this was the default option in older releases of Atheme).

Example: `akick_time = 10;`

### antiflood_enforce_method

The enforcement method to use for flood protection by default. This option may be overridden by channel staff.

Available options are: `quiet`, `kickban`, and `akill`.

Example: `antiflood_enforce_method = quiet;`

### show_custom_metadata

Unsetting this option will prevent user-set metadata (via [SET PROPERTY](/docs/help/chanserv#set-property)) from showing in the [INFO](/docs/help/chanserv#info) output. The [TAXONOMY](/docs/help/chanserv#taxonomy) command will still function as usual, and INFO will point this out if channels have metadata set.

Example: `show_custom_metadata;`

### shorthelp

A list of commands that are displayed with their full description in the output of `/msg ChanServ HELP`. Commands not in this list will be listed, but not with their descriptions. All commands with descriptions are still listed in `/msg ChanServ HELP COMMANDS` regardless of the value set here.

If not set, this value defaults to "[AKICK](/docs/help/chanserv#akick) [BAN](/docs/help/chanserv#ban) [CLEAR](/docs/help/chanserv#clear) [DEOP](/docs/help/chanserv#channel-status-commands) [DEVOICE](/docs/help/chanserv#channel-status-commands) [DROP](/docs/help/chanserv#drop) [FLAGS](/docs/help/chanserv#flags) [GETKEY](/docs/help/chanserv#getkey) [INFO](/docs/help/chanserv#info) [INVITE](/docs/help/chanserv#invite) [KICK](/docs/help/chanserv#kick) [KICKBAN](/docs/help/chanserv#kickban) [OP](/docs/help/chanserv#channel-status-commands) [QUIET](/docs/help/chanserv#quiet) [REGISTER](/docs/help/chanserv#register) [SET](/docs/help/chanserv#set) [TOPIC](/docs/help/chanserv#topic) [UNBAN](/docs/help/chanserv#unban) [UNQUIET](/docs/help/chanserv#unquiet) [VOICE](/docs/help/chanserv#channel-status-commands) [WHY](/docs/help/chanserv#why)".

If set to an empty string (`shorthelp = "";`), listing command descriptions in `/msg ChanServ HELP` will be disabled.

A command in this list will only be printed if the corresponding module is loaded and the user has permission to use it. 

Examples: 

- Custom list: `shorthelp = "REGISTER OP DEOP";`
- No list: `shorthelp = "";`
- Default: `#shorthelp = "";`

## Modules

By loading or choosing not to load specific modules, you can customize what features your ChanServ instance offers. You can even disable ChanServ entirely if you choose to load none of these modules.

> Note: ChanServ requires an authentication service, either a NickServ or UserServ configuration will do.

| Module | Features | Notes |
| ------ | -------- | ----- |
| `modules/chanserv/main` | Core components | |
| `modules/chanserv/access` | Simplified ACL editing [ACCESS command](/docs/help/chanserv#access) | |
| `modules/chanserv/akick` | [AKICK command](/docs/help/chanserv#akick) | |
| `modules/chanserv/ban` | [BAN](/docs/help/chanserv#ban) and [UNBAN](/docs/help/chanserv#unban) commands | Load this module or `unban_self`, do not load both. |
| `modules/chanserv/unban_self` | [UNBAN command](/docs/help/chanserv#unban) for the user only | Load `ban` or this module, do not load both. |
| `modules/chanserv/bansearch` | [BANSEARCH command](/docs/help/chanserv#bansearch) | |
| `modules/chanserv/close` | [CLOSE command](/docs/help/chanserv#close) | |
| `modules/chanserv/clone` | [CLONE command](/docs/help/chanserv#clone) | |
| `modules/chanserv/clear` | [CLEAR command](/docs/help/chanserv#clear) | |
| `modules/chanserv/clear_akicks` | [CLEAR AKICKS command](/docs/help/chanserv#clear-akicks) | |
| `modules/chanserv/clear_bans` | [CLEAR BANS command](/docs/help/chanserv#clear-bans) | |
| `modules/chanserv/clear_flags` | [CLEAR FLAGS command](/docs/help/chanserv#clear-flags) | |
| `modules/chanserv/clear_users` | [CLEAR USERS command](/docs/help/chanserv#clear-users) | |
| `modules/chanserv/count` | [COUNT command](/docs/help/chanserv#count) | |
| `modules/chanserv/drop` | [DROP command](/docs/help/chanserv#drop) | |
| `modules/chanserv/fflags` | Forced flags changes ([FFLAGS command](/docs/help/chanserv#fflags)) | |
| `modules/chanserv/flags` | [FLAGS command](/docs/help/chanserv#flags) | |
| `modules/chanserv/ftransfer` | Forced foundership transfers ([FTRANSFER command](/docs/help/chanserv#ftransfer)) | |
| `modules/chanserv/getkey` | [GETKEY command](/docs/help/chanserv#getkey) | |
| `modules/chanserv/halfop` | [HALFOP and DEHALFOP commands](/docs/help/chanserv#channel-status-commands) | |
| `modules/chanserv/help` | [HELP command](/docs/help/chanserv#help) | |
| `modules/chanserv/hold` | Channel expiry override ([HOLD command](/docs/help/chanserv#hold)) | |
| `modules/chanserv/info` | [INFO command](/docs/help/chanserv#info) | |
| `modules/chanserv/invite` | [INVITE command](/docs/help/chanserv#invite) | |
| `modules/chanserv/kick` | [KICK](/docs/help/chanserv#kick) and [KICKBAN](/docs/help/chanserv#kickban) commands | |
| `modules/chanserv/list` | [LIST command](/docs/help/chanserv#list) | |
| `modules/chanserv/mark` | [MARK command](/docs/help/chanserv#mark) | |
| `modules/chanserv/moderate` | Moderate channel registrations ([ACTIVATE](/docs/help/chanserv#activate), [REJECT](/docs/help/chanserv#reject), and [WAITING](/docs/help/chanserv#waiting) commands) | This module also enables the [reggroup](#reggroup) configuration option. |
| `modules/chanserv/op` | [OP and DEOP commands](/docs/help/chanserv#channel-status-commands) | |
| `modules/chanserv/owner` | [OWNER and DEOWNER commands](/docs/help/chanserv#channel-status-commands) | |
| `modules/chanserv/protect` | [PROTECT and DEPROTECT commands](/docs/help/chanserv#channel-status-commands) | This is also sometimes considered the "admin" channel status. |
| `modules/chanserv/quiet` | [QUIET command](/docs/help/chanserv#quiet) | This module will only work on IRCds which support a `quiet` ban-like mode. |
| `modules/chanserv/recover` | Channel takeover recovery ([RECOVER command](/docs/help/chanserv#recover)) | |
| `modules/chanserv/register` | [REGISTER command](/docs/help/chanserv#register) | This module is required if you wish for anyone to register channels. |
| `modules/chanserv/set_email` | [SET EMAIL command](/docs/help/chanserv#set-email) | |
| `modules/chanserv/set_entrymsg` | [SET ENTRYMSG command](/docs/help/chanserv#set-entrymsg) | |
| `modules/chanserv/set_fantasy` | [SET FANTASY command](/docs/help/chanserv#set-fantasy) | |
| `modules/chanserv/set_gameserv` | [SET GAMESERV command](/docs/help/chanserv#set-gameserv) | Requires [GameServ](/docs/config/gameserv) to be enabled. |
| `modules/chanserv/set_guard` | [SET GUARD command](/docs/help/chanserv#set-guard) | |
| `modules/chanserv/set_keeptopic` | [SET KEEPTOPIC command](/docs/help/chanserv#set-keeptopic) | |
| `modules/chanserv/set_limitflags` | [SET LIMITFLAGS command](/docs/help/chanserv#set-limitflags) | |
| `modules/chanserv/set_mlock` | [SET MLOCK command](/docs/help/chanserv#set-mlock) | |
| `modules/chanserv/set_prefix` | [SET PREFIX command](/docs/help/chanserv#set-prefix) | |
| `modules/chanserv/set_private` | Channel info hiding ([SET PRIVATE command](/docs/help/chanserv#set-private)) | |
| `modules/chanserv/set_property` | [SET PROPERTY command](/docs/help/chanserv#set-property) | |
| `modules/chanserv/set_pubacl` | [SET PUBACL command](/docs/help/chanserv#set-pubacl) | |
| `modules/chanserv/set_restricted` | [SET RESTRICTED command](/docs/help/chanserv#set-restricted) | |
| `modules/chanserv/set_secure` | [SET SECURE command](/docs/help/chanserv#set-secure) | |
| `modules/chanserv/set_topiclock` | [SET TOPICLOCK command](/docs/help/chanserv#set-topiclock) | |
| `modules/chanserv/set_url` | [SET URL command](/docs/help/chanserv#set-url) | |
| `modules/chanserv/set_verbose` | [SET VERBOSE command](/docs/help/chanserv#set-verbose) | |
| `modules/chanserv/status` | [STATUS command](/docs/help/chanserv#status) | |
| `modules/chanserv/sync` | [SYNC command](/docs/help/chanserv#sync) and [SET NOSYNC command](/docs/help/chanserv#set-nosync) | |
| `modules/chanserv/successor_acl` | Named Successor ACL flag (`+S`) | |
| `modules/chanserv/taxonomy` | Channel metadata viewer ([TAXONOMY command](/docs/help/chanserv#taxonomy)) | |
| `modules/chanserv/template` | [TEMPLATE command](/docs/help/chanserv#template) | |
| `modules/chanserv/topic` | [TOPIC](/docs/help/chanserv#topic) and [TOPICAPPEND](/docs/help/chanserv#topicappend) commands | |
| `modules/chanserv/voice` | [VOICE and DEVOICE commands](/docs/help/chanserv#channel-status-commands) | |
| `modules/chanserv/why` | [WHY command](/docs/help/chanserv#why) | |
| `modules/chanserv/xop` | [VOP/HOP/AOP/SOP commands](/docs/help/chanserv#xop) | This module provides emulation of the ircservices XOP scheme **only**. |
| `modules/chanserv/antiflood` | Flood protection | This module should be loaded last to ensure all automatic response options are functional. |

