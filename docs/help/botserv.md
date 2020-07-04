---
id: botserv
title: BotServ
sidebar_label: BotServ
---

## Service Usage

## Commands

* [ACT](#act) -- Makes the bot do the equivalent of a "/me" command.
* [ASSIGN](#assign) -- Assigns a bot to a channel.
* [BOTLIST](#botlist) -- Lists available bots.
* [HELP](#help) -- Displays contextual help information.
* [INFO](#info) -- Allows you to see BotServ information about a channel or a bot.
* [SAY](#say) -- Makes the bot say the given text on the given channel.
* [SET](#set) -- Configures bot options.
    * [SET NOBOT](#set-nobot) -- Prevent a bot from being assigned to a channel.
    * [SET FANTASY](#set-fantasy) -- Enable fantasy commands.
    * [SET SAYCALLER](#set-saycaller) -- Enable Caller-ID on BotServ actions or messages.
* [UNASSIGN](#unassign) -- Unassigns a bot from a channel.

**Services Operator Commands**

* [BOT](#bot) -- Maintains network bot list.
* [SET PRIVATE](#set-private) -- Prevent a bot from being assigned by non IRC operators.

***

### ACT

Makes the bot do the equivalent of a "/me" command
on the given channel using the given text.

Syntax: `ACT <chan> <text>`

Example:
    `/msg BotServ ACT #help yawns!`


### ASSIGN

Assigns a bot pointed out by nick to the channel chan. You
can then configure the bot for the channel so it fits
your needs.

Syntax: `ASSIGN <chan> <nick>`

Example:
    `/msg BotServ ASSIGN #help Security`


### BOTLIST

Lists all available bots on this network.

Syntax: `BOTLIST`

Example:
    `/msg BotServ BOTLIST`

### HELP

HELP displays help information on all commands in BotServ.

Syntax: `HELP <command> [parameters]`

### INFO

INFO allows you to see BotServ information about a channel or a bot.

Syntax: `INFO <#channel|botnick>`

### SAY

Makes the bot say the given text on the given channel.

Syntax: `SAY <chan> <text>`

Example:
`    /msg BotServ SAY #help Welcome to #help!`

### SET

#### SET NOBOT

This option marks a channel as unassignable. If a bot
is already assigned to the channel, it is unassigned
automatically when you enable the option.

Syntax: `SET <#channel> NOBOT {ON|OFF}`

Example:
    `/msg BotServ SET #help NOBOT ON`


#### SET FANTASY

Enables or disables fantasy mode on a channel.
When it is enabled, users will be able to use all
chanserv commands like **!op, !deop, !voice, !devoice,
!kick, !kb, !unban, !akick, !info** on a channel.

Syntax: `SET <#channel> FANTASY {ON|OFF}`

Example:
    `/msg BotServ SET #help FANTASY ON`

#### SET SAYCALLER

This option when turned on will prefix any BotServ SAY
or ACTION command messages with the caller's nickname.

Syntax: `SET <channel> SAYCALLER {ON|OFF}`

Examples:
```
    /msg BotServ SET #ChatZone SAYCALLER ON
    /msg BotServ SET #ChatZone SAYCALLER OFF
```

### UNASSIGN

Unassigns a bot from a channel. When you use this command,
the bot won't join the channel anymore. However, bot
configuration for the channel is kept, so you will always
be able to reassign a bot later without having to reconfigure
it entirely.

Syntax: `UNASSIGN <chan>`

Example:
    `/msg BotServ UNASSIGN #help`


## Services Operator Commands

### BOT

>This command is limited to **services operators** with the privilege: PRIV_USER_ADMIN

Allows opers to create, modify, and delete bots
that users will be able to use on their own channels.

`BOT ADD` adds a bot with the given nickname, username,
hostname and realname. Since no integrity checks are done
for these settings, be careful.

`BOT CHANGE` allows you to change nickname, username, hostname
or realname of a bot without actually deleting it (and all
the data associated with it).

`BOT DEL` removes the given bot from the bot list.

Note: you cannot create a bot that has a nick that is
currently registered. If an unregistered user is currently
using the nick, they will be killed.

Syntax: 

```
BOT ADD <nick> <user> <host> <real>`
BOT CHANGE <oldnick> <newnick> [<user> [<host> [<real>]]]`
BOT DEL <nick>
```

Examples:
```
    /msg BotServ BOT ADD Security Security security.example.net Security
    /msg BotServ BOT CHANGE Security NetBot NetBot Services.Example.Net MyNet
    /msg BotServ BOT DEL Security
```

### SET PRIVATE

Lorum ipsum.

>This command is limited to **services operators** with the privilege: PRIV_CHAN_ADMIN

Syntax: `SET <botnick> PRIVATE {ON|OFF}`

Example:
    `/msg BotServ SET Security PRIVATE ON`