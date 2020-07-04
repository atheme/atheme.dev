---
id: general
title: General Settings for Atheme
sidebar_label: General
---

## General

The `general{}` block defines additional general settings for your Atheme Services 
instance.

### permissive_mode

I don't really know what this does.

### helpchan

This defines your network help channel. _If defined_, it is shown to users when they
request help for a command which does not exist.

**Example:** `helpchan = "#help";`

### helpurl

This defines a webpage for services help. _If defined_, it is also shown to users when
they request help for a command which does not exist.

**Example:** `helpurl = "http://www.stack.nl/~jilles/irc/atheme-help/";`

### silent

Enabling this will prevent Atheme from sending WALLOPS/GLOBOPS, which it may do at times
when it notices a network-wide issue. Uncommenting this is not recommended.

**Example (Disabled):** `#silent;`

### verbose_wallops

Enabling this will cause Atheme to send additional information about events that are
occuring, in particular AKILLs. **Warning:** this may result in a large amount of 
WALLOPS/GLOBOPS.

**Example (Disabled):** `#verbose_wallops;`

### join_chans

This value defines if ChanServ should be allowed to join registered channels.

**Enabling this value is generally recommended** as it is needed for the following scenarios:

* You wish to allow the use of fantasy commands (e.g. !op) in a channel.
* You are using an ircu-family IRCd (Asuka, snircd, Nefarious), in which case you will
    need to leave this enabled and put `guard` in your default [`cflags`](#cflags).
* You are using a ratbox-family IRCd (ratbox, charybdis, ircd-seven), in which case you
    may want to leave this option enabled and put `guard` in your default 
    [`cflags`](#cflags) so ChanServ does not need to join/part channels in order to do
    some actions.

Regardless of this setting, ChanServ will temporarily join channels that would be empty if
needed to enforce AKICK/RESTRICTED/CLOSE settings, or to change the channel timestamp if 
`changets` is enabled.

**Example (Enabled):** `join_chans;`

### leave_chans

This value defines if ChanServ should leave channels after everyone else has left.
Turning this off serves little purpose, except to keep empty channels open and to maintain
the channel topic and ban/quiet/exempt/invite exempt lists (+beI, etc.)

**Example (Enabled):** `leave_chans;`

### secure

Enabling `secure` requires the use of `/msg <service>@<services host>`, instead of just
`/msg <service>`. This may help protect against spoofers in a situation where Atheme is
disconnected and your network does not have services' nicknames disabled (Via RESV, a
Q-Line, etc.), however this is disabled by default as most networks do not use this
functionality and it may be confusing to your users or cause difficulties with 
pre-existing IRC bots and client scripts.

**Example (Disabled):** `#secure;`

### uflags

`uflags` are the default settings to apply to new user accounts upon registration.
Each flag corresponds to a specific NickServ module which is required for the setting to go into effect.

| Flag | Function | Module |
| ---- | -------- | ------ |
| hold | Overrides default nickname expiry | `modules/nickserv/hold` |
| neverop | Prevents the user from being added to access lists. | `modules/nickserv/set_neverop` |
| noop | Prevents services from setting modes upon the user automatically. | `modules/nickserv/set_noop` |
| hidemail | Hides the user's e-mail address. | `modules/nickserv/set_hidemail` |
| nomemo | Disables the ability to receive memos. | `modules/nickserv/set_nomemo` |
| emailmemos | Forwards incoming memos to the user's e-mail address. | `modules/nickserv/set_emailmemos` |
| enforce | Enables or disables automatic protection of a nickname. | `modules/nickserv/set_enforce` |
| privmsg | Uses private messages instead of notices if enabled. | `modules/nickserv/set_privmsg` |
| private | Hides information about the user from other users. | `modules/nickserv/set_private` |
| quietchg | Allows the user to opt-out of channel change messages. | `modules/nickserv/set_quietchg` | 
| none | No default flags | N/A |

These flags are only set for **new** accounts, any existing accounts will retain their current uflags and any changes to the `uflags` configuration value will only go into effect on accounts registered after the change.

**Example:** `uflags = { hidemail; };`

### cflags

`cflags` are the default settings to apply for newly registered channels.

Each flag corresponds to a specific ChanServ module which is required for the setting to go into effect.

| Flag | Function | Module |
| ---- | -------- | ------ |
| hold | Overrides default channel expiry | `modules/chanserv/hold` |
| secure | Prevents unauthorized users from gaining operator status. | `modules/chanserv/set_secure` |
| verbose | Notifies channel about access list modifications. | `modules/chanserv/set_verbose` |
| verbose_ops | Notifies channel operators about access list modifications. | `modules/chanserv/set_verbose` |
| keeptopic | Enables topic retention if the channel is at any time empty. | `modules/chanserv/set_keeptopic` |
| topiclock | Restricts who can change the topic. | `modules/chanserv/set_topiclock` |
| guard | Sets whether or not ChanServ will inhabit the channel. | `modules/chanserv/set_guard` |
| private | Hides information about a channel. | `modules/chanserv/set_private` |
| nosync | Disables automatic channel ACL syncing. | `modules/chanserv/set_nosync` |
| limitflags | Limits the power of the +f flag. | `modules/chanserv/set_limitflags` |
| pubacl | Allows the channel ACL to be public. | `modules/chanserv/set_pubacl` |
| none | No default flags. | N/A |

These flags only apply for **new** channels, existing channel settings
will not be changed, and adjustments made to the `cflags` setting will
only apply to channels registered **after** the changes were applied.

**Example:** `cflags = { verbose; guard; };`

### raw

Enabling this value allows authorized services operators to use the
OperServ/RAW and OperServ/INJECT commands. **These commands are for debugging,** enabling this functionality will [**TAINT**](#allow_taint)
your Atheme instance.

**Use of these commands may damage your IRC network and are not supported.**

### flood_msgs, flood_time

Enable these options if you wish for your Atheme instance to detect 
floods. If Atheme receives `flood_msgs` within `flood_time` from a user,
the user will trigger Atheme's flood protection.

You may set `flood_msgs` to 0 to disable flood protection.

**Example:**
```
flood_msgs = 7;
flood_time = 10;
```

### ratelimit_uses, ratelimit_period

These commands can be used to apply ratelimiting to the following commands:
* `helpserv/helpme`
* `helpserv/ticket`
* `hostserv/request`
* `nickserv/register`
* `chanserv/register`

After a command is used `ratelimit_uses` times within `ratelimit_period` length of time,
users will be unable to run that ratelimited command until the period is up.

Commenting out `ratelimit_users`, `ratelimit_period` or both will disable this 
functionality.

**Example:**
```
ratelimit_uses = 5;
ratelimit_period = 60;
```

### vhost_change

This value defines the number of days after a user has changed their vHost via 
HostServ/TAKE or HostServ/REQUEST before they can use either command again. This 
functionality may be useful to deter rabit host-swappers and people swapping vHosts
frequently to evade bans.

You may comment out or remove this line to disable this functionality.

**Example:** `vhost_change = 30`;

### kline_time

This sets the default expiration time for KLINEs set by Atheme, in days.
Setting this value to 0 makes all KLINEs permanent.

**Example:** `kline_time = 7;`

### kline_with_ident

Enabling this value results in Atheme's automatic KLINEs being set for user@host, instead
of *@host. This applies to all automatic KLINEs set by Atheme.

**Example (Disabled):** `#kline_with_ident;`

### kline_verified_ident

Similar to `kline_with_ident`, except this setting will KLINE *@host for any unverified
ident, and will KLINE user@host for verified idents.

**Example (Disabled):** `#kline_verified_ident;`
