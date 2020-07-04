---
id: chanserv
title: ChanServ
sidebar_label: ChanServ
---

## Service Usage

## Commands

* [ACCESS](#access) -- Makes the bot do the equivalent of a "/me" command.
* [ACTIVATE](#activate) -- Stuff.

***

### Channel Status Commands

These commands perform status mode changes on a channel.

If you perform an operation on another user, they will be
notified that you did it.

If the last parameter is omitted the action is performed
on the person requesting the command.

Syntax:
```
VOICE|DEVOICE <#channel> [nickname]
HALFOP|DEHALFOP <#channel> [nickname]
OP|DEOP <#channel> [nickname]
PROTECT|DEPROTECT <#channel> [nickname]
OWNER|DEOWNER <#channel> [nickname]
```

Example:
```
/msg ChanServ OP #foo bar
/msg ChanServ DEVOICE #foo
```

### ACCESS

Something roles.

#### ACCESS ADD

ACCESS ADD will assign the given user to the given
channel role.

Syntax: `ACCESS <#channel> ADD <user> <role>`

Example: `/msg ChanServ ACCESS #atheme ADD stitch helpers`


#### ACCESS DEL

ACCESS DEL will remove all channel access from a given user.

Syntax: `ACCESS <#channel> DEL <user>`

Example: `/msg ChanServ ACCESS #atheme DEL stitch`

#### ACCESS INFO

ACCESS INFO displays what level of access a given user has
in a given channel. It will display role, long-form flags
and short-form flags along with the last date the user's
access was modified.

Syntax: `ACCESS <#channel> INFO <user>`

Example: `/msg ChanServ ACCESS #atheme INFO nenolod`

#### ACCESS LIST

ACCESS LIST lists all users with channel access and their
roles in the channel. It uses fuzzy matching so if a user
does not exactly match any role, they will be listed as
the closest role they match.

Syntax: `ACCESS <#channel> LIST`

Example: `/msg ChanServ ACCESS #atheme LIST`

#### ACCESS SET

ACCESS SET will change the given user's role to the given
channel role.

Syntax: `ACCESS <#channel> SET <user> <role>`

Example: `/msg ChanServ ACCESS #atheme SET stitch lowlevel-staff`

### ACTIVATE

ACTIVATE allows you to accept a channel's
registration request.  (For networks that
moderate Channel Registration requests)

Syntax: `ACTIVATE <#channel>`

Example: `/msg ChanServ ACTIVATE #FunChat`

See Also: [`WAITING`](#waiting), [`REJECT`](#reject)

### AKICK

>This command can only be used by users with the +r flag.

The AKICK command allows you to maintain channel
ban lists.  Users on the AKICK list will be
automatically kickbanned when they join the channel,
removing any matching ban exceptions first. Users
with the +r flag are exempt.

Syntax: `AKICK <#channel> ADD <nickname|hostmask> [!P|!T <minutes>] [reason]`

You may also specify a hostmask (nick!user@host)
for the AKICK list.

The reason is used when kicking and is visible in
`AKICK LIST`. If the reason contains a '|' character,
everything after it does not appear in kick reasons
but does appear in `AKICK LIST`.

If the !P token is specified, the AKICK will never
expire (permanent). If the !T token is specified, expire
time must follow, in minutes, hours ("h"), days ("d")
or weeks ("w").

Syntax: `AKICK <#channel> DEL <nickname|hostmask>`

This will remove an entry from the AKICK list. Removing
an entry will remove any matching channel bans unless the
channel is set [`NOSYNC`](#set-nosync).

Syntax: `AKICK <#channel> LIST`

This will list all entries in the AKICK list, including
the reason and time left until expiration.

Examples:

```
/msg ChanServ AKICK #foo ADD bar you are annoying | private op info
/msg ChanServ AKICK #foo ADD *!*foo@bar.com !T 5d
/msg ChanServ AKICK #foo DEL bar
/msg ChanServ AKICK #foo LIST
```

### BAN

The BAN command allows you to ban a user or hostmask from
a channel.

Syntax: `BAN <#channel> <nickname|hostmask>`

Examples:
```
/msg ChanServ BAN #chat carnell
/msg ChanServ BAN #chat *!*@*.ipt.aol.com
```

### BANSEARCH

The BANSEARCH command searches for bans, quiets, and channel
modes affecting you in a channel.

Syntax: ``BANSEARCH <#channel>``

>**Services Operators** with `user:auspex` privilege can also search bans,
>quiets, and channel modes affecting a given user in a given
>channel.
>Syntax: `BANSEARCH <#channel> <target>`

Examples: `/msg ChanServ BANSEARCH #atheme`

### CLEAR

#### CLEAR AKICKS

>This command can only be used by users with the +R and
>+f flags.

CLEAR AKICKS will remove all AKICK entries, including all
access list entries whose only flags are +b, from a
channel's access list.

Syntax: `CLEAR <#channel> AKICKS`

Example: `/msg ChanServ CLEAR #atheme AKICKS`

#### CLEAR BANS

Clear bans will remove all bans found in a specific
channel. If your ircd supports other lists associated
with a channel (e.g. ban exceptions), you can clear
these by specifying the mode letters. Specify an
asterisk to clear all lists.

Syntax: `CLEAR <#channel> BANS [types]`

Examples:

* Clear the #support ban list: `/msg ChanServ CLEAR #support BANS`
* Removes all ban and invite exceptions on #support (if your ircd supports them): `/msg ChanServ CLEAR #support BANS eI`
* Clear all lists in #support: `/msg ChanServ CLEAR #support BANS *`
* Shows the possible letters: `/msg ChanServ CLEAR #support BANS +`

#### CLEAR FLAGS

>This command can only be used by channel founders (flag +F).

CLEAR FLAGS will remove all flags from all users (or
groups) with channel access on the channel specified
except for users who are channel founders.

Syntax: `CLEAR <#channel> FLAGS`

Example: `/msg ChanServ CLEAR #atheme FLAGS`

#### CLEAR USERS

Clear users will kick all users out of the channel,
except you. The channel will be cycled (recreated)
if you are not on it.

If a reason is specified, it will be included in the
kick message.

Syntax: `CLEAR <#channel> USERS [reason]`

Example: `/msg ChanServ CLEAR #ChatZone USERS`

### CLONE

>This command can only be used by channel founders (flag +F).

CLONE copies a channel's chanacs and metadata
to a new channel. Both channels must be registered
with ChanServ and you must be founder in the target
channel for this command to work.

It will not copy the topic as most people will
want that different between the 2 channels.

It will also remove all chanacs (except founders)
and metadata of the same type from the target
channel.

Syntax: `CLONE <#source-channel> <#target-channel>`

Examples: `/msg ChanServ CLONE #funstuff #morefun`

### CLOSE 

CLOSE prevents a channel from being used. Anyone
who enters is immediately kickbanned. The channel
cannot be dropped and foundership cannot be
transferred.

Enabling CLOSE will immediately kick all
users from the channel.

Use CLOSE OFF to reopen a channel. While closed,
channels will still expire.

Syntax: `CLOSE <#channel> ON|OFF [reason]`

Examples:
```
/msg ChanServ CLOSE #lamers ON spamming
/msg ChanServ CLOSE #spiderslair OFF
```

### COUNT

This will give a count of how many entries are in each of
the channel's xOP lists and how many entries on the access
list do not match a xOP value.

The second line shows how many access entries have each flag.

Syntax: `COUNT <#channel>`

Example: `/msg ChanServ COUNT #oscn`

### DROP

>This command can only be used by channel founders (flag +F).

DROP allows you to "unregister" a registered channel.

Once you DROP a channel all of the data associated
with it (access lists, etc) are removed and cannot
be restored.

See help on SET FOUNDER and FLAGS for transferring
a channel to another user.

Syntax: `DROP <#channel>`

Example: `/msg ChanServ DROP #foo`

### FLAGS

TBD

### FORCEXOP

>This command can only be used by channel founders (flag +F).

FORCEXOP resets all channel access levels to
xOP compatible values. That is, after the
operation, the founder(s) will have all permissions
and autoop and everyone else on with flags
will be on one of the xOP lists. This command
is useful if the definitions for which flags
each xOP level gives change and the founder
wishes to use xOP commands only.

Syntax: `FORCEXOP <#channel>`

See also: [`SOP`](#sop), [`AOP`](#aop), [`HOP`](#hop), [`VOP`](#vop)

### GETKEY

GETKEY returns the key (+k, password to be allowed in)
of the specified channel: `/join #channel key`

Syntax: `GETKEY <#channel>`

Example: `/msg ChanServ GETKEY #foo`

### INFO

INFO displays channel information such as
registration time, flags, and other details.

Syntax: `INFO <#channel>`

Example: `/msg ChanServ INFO #foo`

### INVITE

INVITE requests services to invite you to the
specified channel. This is useful if you use
the +i channel mode.

Syntax: `INVITE <#channel>`

Example: `/msg ChanServ INVITE #foo`

### KICK

The KICK command allows for the removal of a user from
a channel. The user can immediately rejoin.

Your nick will be added to the kick reason.

Syntax: `KICK <#channel> <nick> `[reason]

Examples:
```
/msg ChanServ KICK #foo abuser
/msg ChanServ KICK #foo abuser please stop
```

### KICKBAN

The KICKBAN command allows for the removal of a user from
a channel while placing a ban on the user.

Any matching ban exceptions will be removed.

Syntax: `KICKBAN <#channel> <nick> [reason]`

Examples:
```
/msg ChanServ KICKBAN #foo abuser
/msg ChanServ KICKBAN #foo abuser go away
```

### QUIET

The QUIET command allows you to mute a user or hostmask in
a channel. Affected users will be notified that you did it.

Syntax: `QUIET <#channel> <nickname|hostmask>`

Examples:
```
/msg ChanServ QUIET #chat AfterDeath
/msg ChanServ QUIET #chat *!*@*.ipt.aol.com
```

### RECOVER

RECOVER allows you to regain control of your
channel in the event of a takeover.

Note: RECOVER may make the channel unusable by
general public! If there is no takeover
emergency, instead, read [`OP`](#op)

More precisely, in the case of RECOVER,
everyone will be deopped, limit and key will
be cleared, all bans matching you are removed,
a ban exception matching you is added (in case
of bans Atheme can't see), the channel is set
invite-only and moderated and you are invited.

If you are on channel, you will be opped and
no ban exception will be added.

Syntax: `RECOVER <#channel>`

Example: `/msg ChanServ RECOVER #foo`

### REGISTER

REGISTER allows you to register a channel
so that you have better control. Registration
allows you to maintain a channel access list
and other functions that are normally
provided by IRC bots.

Syntax: `REGISTER <#channel>`

Example:`/msg ChanServ REGISTER #atheme`

### ROLE

Roles do things

#### ROLE ADD

ROLE ADD will create a channel role with the given
flags. Multiple flags should be separated by a space.

Syntax: `ROLE <#channel> ADD <role> [flags]`

Flags:
* `+voice` - Enables use of the voice/devoice commands.
* `+autovoice` - Enables automatic voice.
* `+halfop` - Enables use of the halfop/dehalfop commands.
* `+autohalfop` - Enables automatic halfop.
* `+op` - Enables use of the op/deop commands.
* `+autoop` - Enables automatic op.
* `+protect` - Enables use of the protect/deprotect commands.
* `+owner` - Enables use of the owner/deowner commands.
* `+set` - Enables use of the set command.
* `+invite` - Enables use of the invite and getkey commands.
* `+remove` - Enables use of the kick, kickban, ban and unban commands.
* `+recover` - Enables use of the recover and clear commands.
* `+acl-change` - Enables modification of channel access lists.
* `+topic` - Enables use of the topic and topicappend commands.
* `+acl-view` - Enables viewing of channel access lists.
* `+successor` - Marks the user as a successor.
* `+founder` - Grants full founder access.
* `+banned` - Enables automatic kickban.

Example:
```
/msg ChanServ ROLE #atheme ADD helpers topic autovoice
```

#### ROLE DEL

ROLE DEL will delete a channel-specific role.

Syntax: `ROLE <#channel> DEL <role>`

Example: `/msg ChanServ ROLE #atheme DEL helpers`

#### ROLE LIST

ROLE LIST lists all channel-specific and network-wide roles
and the flags that each role has.

Syntax: `ROLE <#channel> LIST`

Example:`/msg ChanServ ROLE #baz LIST`

#### ROLE SET

ROLE SET allows you to modify the flags of a role that
already exists. All users in the given role will receive
the effects of the changes. Multiple flags should be
separated by a space and have the modifier (+ or -) before
each flag.

Syntax: `ROLE <#channel> SET <role> <flags>`

Examples:
```
/msg ChanServ ROLE #atheme SET channel-ops +acl-change +set +recover
/msg ChanServ ROLE #atheme SET helpers +invite
/msg ChanServ ROLE #foo SET helpers -topic -invite
```

### SET

#### SET ANTIFLOOD

SET ANTIFLOOD configures ChanServ flood control settings.
The action parameter can be QUIET, KICKBAN or AKILL.

Flood control can be turned off using the OFF setting, and
turned on using default settings with the ON setting.

Syntax: `SET <#channel> ANTIFLOOD <action>`

Syntax: `SET <#channel> ANTIFLOOD OFF`

Examples:
```
/msg ChanServ SET #channel ANTIFLOOD QUIET
/msg ChanServ SET #silence ANTIFLOOD KICKBAN
/msg ChanServ SET #trolls ANTIFLOOD AKILL
/msg ChanServ SET #coders ANTIFLOOD OFF
/msg ChanServ SET #defocus ANTIFLOOD ON
```

#### SET EMAIL

SET EMAIL allows you to change or set the email
address associated with a channel. This is shown
to all users in INFO.

Syntax: `SET <#channel> EMAIL [email]`

Using the command in this way results in an email
address being associated with the channel.

Example: `/msg ChanServ SET #chat EMAIL some@email.address`

#### SET ENTRYMSG

SET ENTRYMSG allows you to change or set
a message sent to all users joining the
channel.

Syntax: `SET <#channel> ENTRYMSG [message]`

Example: `/msg ChanServ SET #support ENTRYMSG Welcome to #support. Please do not paste more than 5 lines.`

#### SET FANTASY

SET FANTASY allows you to enable or disable ChanServ
fantasy commands (!op, !deop, etc.) on your channel.

GUARD must be enabled as well for fantasy commands
to work.

Syntax: `SET <#channel> FANTASY ON|OFF`

Example: `/msg ChanServ SET #chatspike FANTASY ON`

#### SET FOUNDER

SET FOUNDER allows you to set a new founder
of the channel. The new founder has to
execute the same command to confirm the
transfer.

Syntax: `SET <#channel> FOUNDER <newnick>`

If the new founder has not yet confirmed the
transfer, you can cancel it by specifying
your own nick as the new founder.

Syntax: `SET <#channel> FOUNDER <yournick>`

Example: `/msg ChanServ SET #foo FOUNDER bar`

#### SET GAMESERV

SET GAMESERV allows gaming services to be
used, sending to the channel, via
`/msg GameServ <command> <channel> <parameters>`.

You can decide who may use GameServ:
* ALL   - allow all channel members
* VOICE - allow ops/voiced
* OP    - allow ops
* OFF   - allow no-one

For OP and VOICE, both channel status and ChanServ
flags apply.

Syntax: `SET <#channel> GAMESERV ALL|VOICE|OP|OFF`

Example: `/msg ChanServ SET #foo GAMESERV VOICE`

#### SET GUARD

SET GUARD allows you to have ChanServ join your channel.

Syntax: `SET <#channel> GUARD ON|OFF`

Example: `msg ChanServ SET #atheme GUARD ON`

#### SET KEEPTOPIC

SET KEEPTOPIC enables restoration of the old
topic after the channel has become empty. In
some cases, it may revert topic changes
after netsplits or services outages, so it
is not recommended to turn this on if your
channel tends to never empty.

Syntax: `SET <#channel> KEEPTOPIC ON|OFF`

Example: `/msg ChanServ SET #foo KEEPTOPIC ON`

#### SET LIMITFLAGS

SET LIMITFLAGS limits the power of the +f flag.

Users with +f that have neither +s nor +R
may only set +b (akick), and users that do not
have all of +s and +R may not set +s, +R and
+f.

Syntax: `SET <#channel> LIMITFLAGS ON|OFF`

Example: `/msg ChanServ SET #foo LIMITFLAGS ON`

#### SET MLOCK

MLOCK (or "mode lock") allows you to enforce a set
of modes on a channel.  This can prevent abuse in cases
such as +kl. It can also make it harder to fight evil
bots, be careful. Locked modes can be seen by anyone
recreating the channel (this includes keys).

Syntax: `SET <#channel> MLOCK [modes]`

Examples: (some may use modes your ircd does not support)
```
/msg ChanServ SET #foo MLOCK +nt-lk
/msg ChanServ SET #foo MLOCK +inst-kl
/msg ChanServ SET #c MLOCK +ntk c
/msg ChanServ SET #foo MLOCK +ntcjf-kl 2:30 #overflow
/msg ChanServ SET #overflow MLOCK +mntF-kljf
/msg ChanServ SET #foo1 MLOCK +ntlL 40 #foo2
```

#### SET NOSYNC

SET NOSYNC allows channel staff to disable
automatic syncing of channel status when it
is changed.

Syntax: `SET <#channel> NOSYNC ON|OFF`

Example: `/msg ChanServ SET #foo NOSYNC ON`

#### SET PREFIX

PREFIX allows you to customize the channel fantasy trigger
for your channel. This is particularly useful if you have
channel bots that conflict with ChanServ's default fantasy
prefix. Providing no prefix argument (or DEFAULT) resets
the channel fantasy prefix to the network default prefix.

Syntax: `SET <#channel> PREFIX [prefix]`

Examples:
```
/msg ChanServ SET #foo PREFIX
/msg ChanServ SET #foo PREFIX '
/msg ChanServ SET #c PREFIX %
/msg ChanServ SET #c PREFIX default
```

#### SET PRIVATE

SET PRIVATE hides various information about
the channel from other users.

Syntax: `SET <#channel> PRIVATE ON|OFF`

Example: `/msg ChanServ SET #foo PRIVATE ON`

#### SET PROPERTY

SET PROPERTY manipulates metadata
associated with a channel.

To delete a metadata entry, specify
the name and leave the value blank.

Syntax: `SET <#channel> PROPERTY <name> [value]`

Examples:
```
/msg ChanServ SET #atheme PROPERTY URL https://atheme.dev/
/msg ChanServ SET #meat PROPERTY VEGETABLES
```

#### SET PUBACL

SET PUBACL allows the channel access list to be publicly visible.

Syntax: `SET <#channel> PUBACL ON|OFF`

Example: `/msg ChanServ SET #foo PUBACL ON`

#### SET RESTRICTED

SET RESTRICTED designates a channel as restricted access.
Users who are not on the access list of the channel,
or who do not have the chan:joinstaffonly privilege
will be kicked and banned from the channel upon join,
removing any ban exceptions matching them first.
If the channel is set +i, no ban will be set
and invite exceptions will be removed.

Syntax: `SET <#channel> RESTRICTED ON|OFF`

Example: `/msg ChanServ SET #snoop RESTRICTED ON`

#### SET SECURE

SET SECURE prevents anyone that's not on the
channel's access lists from gaining operator
or halfop status on the channel.  This is
useful if you're paranoid.

Syntax: `SET <#channel> SECURE ON|OFF`

Example: `/msg ChanServ SET #foo SECURE ON`

#### SET TOPICLOCK

SET TOPICLOCK causes ChanServ to revert
topic changes by users without the +t flag.
Topic changes during netsplits or services
outages will always be reverted.

TOPICLOCK requires KEEPTOPIC and will
automatically enable it; disabling KEEPTOPIC
will disable TOPICLOCK also.

Syntax: `SET <#channel> TOPICLOCK ON|OFF`

Example: `/msg ChanServ SET #foo TOPICLOCK ON`

#### SET URL

SET URL allows you to change or set the URL
associated with a channel. This is shown
to all users joining the channel.

Syntax: `SET <#channel> URL [url]`

Example: `/msg ChanServ SET #chat URL http://slashdot.org`

#### SET VERBOSE

SET VERBOSE ON sends a notice to the channel when someone
makes changes to the access lists.

SET VERBOSE OPS sends a notice to the channel operators when
someone makes changes to the access lists.

Fantasy commands are always executed as if SET VERBOSE ON is
in effect.

Syntax: `SET <#channel> VERBOSE ON|OPS|OFF`

Example: `/msg ChanServ SET #foo VERBOSE ON`

### STATUS

STATUS returns information about your current
state. It will show information about your
nickname, IRC operator, and SRA status.

If the channel parameter is specified, your
access to the given channel is returned.

Syntax: `STATUS [#channel]`

Examples:
```
/msg ChanServ STATUS
/msg ChanServ STATUS #foo
```

### SYNC

The SYNC command will force all channel statuses to flags, giving and taking
away ops, voice and so on where necessary. You must have the channel flag +R to
run this command.

Syntax: `SYNC <#channel>`

Example: `/msg ChanServ SYNC #bar`

### TAXONOMY

The taxonomy command lists metadata information associated
with registered channels.

Example: `/msg ChanServ TAXONOMY #atheme`

### TEMPLATE

The TEMPLATE command allows definition of sets of flags,
simplifying the use of the FLAGS command.

Without arguments, network wide templates are shown.
These include at least SOP/AOP/HOP/VOP.

Syntax: TEMPLATE

When given only the channel argument, a listing of
templates for the channel will be displayed.

Syntax: TEMPLATE <#channel>

Otherwise, a template is modified. A modification may be
specified by a template name (copies the template) or a
flags change (starts with + or -, optionally preceded by
an !). Templates cannot be the empty set (making a
template empty deletes it).

If the ! form is used, all access entries which exactly
match the template are changed accordingly. This is
not supported if the template includes or included
founder access (+F).

There is a limit on the length of all templates on a
channel.

If you are not a founder, similar restrictions apply
as in FLAGS.

Syntax: `TEMPLATE <#channel> [template oldtemplate]`

Syntax: `TEMPLATE <#channel> [template flag_changes]`

Syntax: `TEMPLATE <#channel> [template !flag_changes]`

Examples:
```
/msg ChanServ TEMPLATE #foo
/msg ChanServ TEMPLATE #foo user VOP
/msg ChanServ TEMPLATE #foo user !+A
/msg ChanServ TEMPLATE #foo co-founder +*-OH
/msg ChanServ TEMPLATE #foo op -*+vVhoti
/msg ChanServ TEMPLATE #foo obsoletetemplate -*
```

### TOPIC

The TOPIC command allows for the changing of a topic on a channel.

Syntax: `TOPIC <#channel> <topic>`

Example: `/msg ChanServ TOPIC #foo bar`

### TOPICAPPEND

The TOPICAPPEND command allows for the addition to a topic on a channel.

Syntax: `TOPICAPPEND <#channel> <topic>`

Example: `/msg ChanServ TOPICAPPEND #foo bar`

### TOPICPREPEND

The TOPICPREPEND command allows for the addition to a topic on a channel.

Syntax: `TOPICPREPEND <#channel> <topic>`

Example: `/msg ChanServ TOPICPREPEND #foo bar`

### TOPICSWAP

Allows easily swapping out parts of a topic on a channel.

Syntax: `TOPICSWAP <#channel> <search>:[<replace>]`

Example: `/msg ChanServ TOPICSWAP #foo orange:apple`

### UNBAN

The UNBAN command is provided by two modules, `unban` or `unban_self`.

#### UNBAN

The UNBAN command allows you to unban a user or hostmask
from a channel. If no nickname or hostmask is specified,
you are unbanned.

Syntax: `UNBAN <#channel> [nickname|hostmask]`

Examples:
```
/msg ChanServ UNBAN #chat pfish
/msg ChanServ UNBAN #chat *!*@*.ucdavis.edu
```

#### UNBAN_SELF

The UNBAN command allows you to remove all bans matching
you from a channel.

Syntax: `UNBAN <#channel>`

Example: `/msg ChanServ UNBAN #chat`

### UNQUIET

The UNQUIET command allows you to unmute a user or hostmask
in a channel. If no nickname or hostmask is specified,
you are unquieted.

Affected users will be notified that you did it.

Syntax: `UNQUIET <#channel> [nickname|hostmask]`

Examples:
```
/msg ChanServ UNQUIET #chat Diablo-D3
/msg ChanServ UNQUIET #chat *!*@*.trilug.org
```

### WHY

The WHY command shows the access entries an online
user matches.

Syntax: `WHY <#channel> [nickname]`

Example: `/msg ChanServ WHY #atheme jilles^`

### XOP

The xOP commands allow you to maintain channel
access lists. Channel access lists can contain
registered accounts or hostmasks (nick!user@host).

The exact meanings of the access levels may differ
per network, use /msg ChanServ TEMPLATE to check. As
a hint, VOP stands for VOice People, HOP stands for
HalfOP, AOP stands for AutoOP, SOP stands for
SuperOP.

Not all channel access entries can be edited
with these commands, see the FLAGS and FORCEXOP
help entries for details. Note that use of
FORCEXOP can destroy a lot of information.
The TEMPLATE system can provide most of the
ease of use of these commands without the
restrictions.

The privileges required to execute these commands are
the same as those required for the corresponding
FLAGS commands.

Syntax: `VOP|HOP|AOP|SOP <#channel> ADD|DEL|LIST <nickname|hostmask>`

Examples:
```
/msg ChanServ VOP #foo ADD bar
/msg ChanServ VOP #foo ADD foo!*@bar.com
/msg ChanServ AOP #foo DEL bar
/msg ChanServ SOP #foo LIST
```

## Services Operator Commands

### FDROP

FDROP allows dropping any registered channel,
provided it is not set held (see help on HOLD).

Once you FDROP a channel all of the data associated
with it (access lists, etc) are removed and cannot
be restored.

Syntax: `FDROP <#channel>`

Example: `/msg ChanServ FDROP #foo`

### FFLAGS

The FFLAGS command allows an oper to force a flags
change on a channel. The syntax is the same as FLAGS,
except that the target and flags changes must be given.
Viewing any channel's access list is done with FLAGS.

Syntax: `FFLAGS <#channel> <nickname|hostmask> <template>`
Syntax: `FFLAGS <#channel> <nickname|hostmask> <flag_changes>`

Example: `/msg ChanServ FFLAGS #foo foo AOP`

### FTRANSFER

FTRANSFER forcefully transfers foundership
of a channel.

Syntax: `FTRANSFER <#channel> <founder>`

Example: `/msg ChanServ FTRANSFER #casual vodkaswirl`

### HOLD

HOLD prevents a channel from expiring for inactivity.
Held channels will still expire when there are no
eligible successors.

Syntax: `HOLD <#channel> ON|OFF`

Example: `/msg ChanServ HOLD #atheme ON`

### LIST

LIST shows channels that match a given criteria.
Multiple criteria may be used in the same command.

Current Criteria are:
* `PATTERN`      - All channels that match a given pattern.
* `MARK-REASON`  - All channels whose mark reason matches a given pattern.
* `CLOSE-REASON` - All channels which are closed whose close reason matches a given pattern.
* `HOLD`         - All channels with the HOLD flag set.
* `NOOP`         - All channels with the NOOP flag set.
* `LIMITFLAGS`   - All channels with the LIMITFLAGS flag set.
* `SECURE`       - All channels with the SECURE flag set.
* `VERBOSE`      - All channels with the VERBOSE flag set.
* `RESTRICTED`   - All channels with the RESTRICTED flag set.
* `KEEPTOPIC`    - All channels with the KEEPTOPIC flag set.
* `VERBOSE-OPS`  - All channels set to only be verbose to ops.
* `TOPICLOCK`    - All channels with the TOPICLOCK flag set.
* `GUARD`        - All channels with the GUARD flag set.
* `PRIVATE`      - All channels with the PRIVATE flag set.
* `PUBACL`       - All channels with the PUBACL flag set.
* `CLOSED`       - All channels closed by network staff.
* `MARKED`       - All channels marked by network staff.
* `ACLSIZE`      - Channels with an access list larger than a given size.
* `REGISTERED`   - Channels registered longer ago than a given age.
* `LASTUSED`     - Channels last used longer ago than a given age.

Syntax: `LIST <criteria>`

Examples:
```
/msg ChanServ LIST pattern #*foo*
/msg ChanServ LIST hold
/msg ChanServ LIST closed pattern #x*
/msg ChanServ LIST aclsize 10
/msg ChanServ LIST registered 30d
/msg ChanServ LIST aclsize 20 registered 7d pattern #bar*
/msg ChanServ LIST mark-reason lamers?here
```


### MARK

MARK allows operators to attach a note to a channel.
For example, an operator could mark the channel of a
spammer so that others know it has previously been
warned.

MARK information will be displayed in INFO output.

Syntax: `MARK <#channel> ON|OFF <reason>`

Example: `/msg ChanServ MARK #lobby ON Takeover: returned to bill`

### REJECT

REJECT allows you to deny a channel's
registration request.  (For networks that
moderate Channel Registration requests)

Syntax: `REJECT <#channel>`

Example: `/msg ChanServ REJECT #BotHouse`

See Also: [`WAITING`](#waiting), [`ACTIVATE`](#activate)

### WAITING

WAITING will show Services Operators the
channel registration request list.  (For
networks that moderate Channel Registration
requests)

Syntax: `WAITING`

Example: `/msg ChanServ WAITING`

See Also: [`REJECT`](#reject), [`ACTIVATE`](#activate)




## FLAGS Matrix

| Flag | Commands | Notes |
| ---- | -------- | ----- |
| v - Voice | [voice](#voice), [devoice](#voice) | |
| V - Autovoice | | |
| o - Op | [op](#op), [deop](#op) | |
| O - Autoop | | |
| h - HalfOp | [halfop](#halfop), [dehalfop](#halfop) | Only available on networks which support halfops. |
| H - Autohalfop | | |
| q - Owner | [owner](#owner) | Only available on networks which support the owner channel mode. |
| a - Protected | [TBD](#TBD) | Only available on networks which support the protected user channel mode. |
| s - Set | TBD | |
| i - Invite | [invite](#invite) | |
| r - Remove | [akick](#akick) | |
| R - Recover | | |
| f - Flags | | |
| t - Topic | | |
| A - ACL View | | |
| S - Successor | | |
| F - Founder | | |
| b - AKICK | | |
| e - Exempt | | |

