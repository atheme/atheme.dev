---
id: groupserv
title: GroupServ
sidebar_label: GroupServ
---

## Service Usage

## Commands

* [DROP](#drop) -- Drops a group registration.
* [FLAGS](#flags) -- Sets flags on a user in a group.
* [INFO](#info) -- Displays information about registered groups.
* [JOIN](#join) -- Joins an open group.
* [LISTCHANS](#listchans) -- Lists channels that a group has access to.
* [REGISTER](#register) -- Registers a group.
* [SET](#set) -- Sets various control flags.
    * [CHANNEL](#set-channel) -- Sets the official group channel.
    * [DESCRIPTION](#set-description) -- Sets the group description.
    * [EMAIL](#set-email) -- Sets the group e-mail address.
    * [JOINFLAGS](#set-joinflags) -- Sets the flags users will be given when they [JOIN](#join) the group.
    * [OPEN](#set-open) -- Sets the group as open for anyone to join.
    * [PUBLIC](#set-public) -- Sets the group as public.
    * [URL](#set-url) -- Sets the group URL.

### DROP

DROP allows you to "unregister" a registered group.

Once you DROP a group all of the data associated
with it (access lists, metadata, etc) are removed and cannot
be restored.

See help on FLAGS for transferring a group to another user.

Syntax: `DROP <!group>`

Example: `/msg GroupServ DROP !baz`

### FLAGS

The FLAGS command allows for the granting/removal of group
privileges on a more specific, non-generalized level. It
supports registered nicknames as targets.

When only the group argument is given, a listing of
permissions granted to users will be displayed.

Syntax: `FLAGS <!group>`

You can modify a users' flags if you yourself have the +f flag.
This has much the same syntax as chanserv/flags, using + to add
flags to a user and - to remove flags from a user.

Syntax: `FLAGS <!group> [nickname flag_changes]`

Permissions:
* +f - Enables modification of group access list.
* +F - Grants full founder access.
* +A - Enables viewing of group access list.
* +m - Read memos sent to the group.
* +c - Have channel access in channels where the group has sufficient privileges.
* +v - Take vhosts offered to the group through HostServ.
* +s - Ability to use GroupServ SET commands on the group.
* +b - Ban a user from the group. The user will not be able to join the group with the JOIN command and it will not show up in their NickServ INFO or anywhere else. NOTE that setting this flag will NOT automatically remove the users' privileges (if applicable).
* +i - Grants the ability to invite users to the group.

The special permission +* adds all permissions except +F.
The special permission -* removes all permissions including +F.

Examples:
```
/msg GroupServ FLAGS !baz
/msg GroupServ FLAGS !baz foo +F
/msg GroupServ FLAGS !baz foo -*
/msg GroupServ FLAGS !baz foo +fmc
```

### INFO

INFO displays group information such as
registration time, group URL, email address
and founder.

Syntax: `INFO <!group>`

Example: `/msg GroupServ INFO !baz`

### INVITE

INVITE allows you to invite a user to join a
"private"/non-open group or a group that is
currently full.

Syntax: `INVITE <!group> <user>`

Example: `/msg GroupServ INVITE !foo jdhore`

### JOIN

JOIN allows you to join a group set as open for anyone to
join. No privileges will be set on you when you join a group
this way, you will only be listed as a group member.

Syntax: `JOIN <!group>`

Example: `/msg GroupServ JOIN !baz`

### LISTCHANS

LISTCHANS shows the channels that a group has
access to.

AKICKs are not shown.

Syntax: `LISTCHANS <group>`

Example: `/msg GroupServ LISTCHANS !foo`

### REGISTER

REGISTER allows you to register a group so that you can easily
manage a number of users and channels.

Syntax: `REGISTER <!group>`

Example: `/msg GroupServ REGISTER !developers`

### SET

#### SET CHANNEL

SET CHANNEL allows you to change or set the official IRC channel
of a group. This is shown when a user requests info about the group.

Syntax: `SET <!group> CHANNEL [#channel]`

Example: `/msg GroupServ SET !atheme CHANNEL #atheme`

#### SET DESCRIPTION

SET DESCRIPTION allows you to change or set the description
of a group. This is shown when a user requests info about
the group.

Syntax: `SET <!group> DESCRIPTION [description]`

Example: `/msg GroupServ SET !atheme DESCRIPTION Official Atheme Group`

#### SET EMAIL

SET EMAIL allows you to change or set the email
address associated with a group. This is shown
to all users in INFO.

Syntax: `SET <!group> EMAIL [email]`

Using the command in this way results in an email
address being associated with the group.

Example: `/msg GroupServ SET !bar EMAIL some@email.address`

#### SET GROUPNAME

SET GROUPNAME allows you to change or set the name of your group.
This is shown when a user requests info about the group.

Syntax: `SET <!OldGroupName> GROUPNAME <!NewGroupName>`

Example: `/msg GroupServ SET !OldGroup GROUPNAME !NewGroup`

#### SET JOINFLAGS

SET JOINFLAGS allows a group to specify the flags assigned
to a user when they JOIN the group (if the group is open).

Note that this must be valid, else "+" will be set on joining
users. If no parameter is provided or the parameter is OFF, the
join flags will be returned to network default.

See "/msg GroupServ HELP FLAGS" for details of the different flags that
are valid here.

Syntax: `SET <!group>  JOINFLAGS [OFF|flags]`

Examples:
```
/msg GroupServ SET !awesome-people JOINFLAGS OFF
/msg GroupServ SET !foo JOINFLAGS +
/msg GroupServ SET !foo JOINFLAGS +v
/msg GroupServ SET !foo JOINFLAGS +cfv
```

#### SET OPEN

SET OPEN allows a group to be open to any user joining
whenever they like. Users that JOIN the group will have
no privileges by default.

Syntax: `SET <!group> OPEN <ON|OFF>`

Example: `/msg GroupServ SET !awesome-people OPEN ON`

#### SET PUBLIC

SET PUBLIC shows group membership when users request NickServ
INFO of members of the group.

Syntax: `SET <!group> PUBLIC <ON|OFF>`

Example: `/msg GroupServ SET !awesome-people PUBLIC ON`

#### SET URL

SET URL allows you to change or set the URL
associated with a group. This is shown
to all users in INFO.

Syntax: `SET <!group> URL [url]`

Example: `/msg GroupServ SET !slashdot URL http://slashdot.org`


## Services Operator Commands

### ACSNOLIMIT

ACSNOLIMIT allows a group to have a unlimited number of
group access list entries.

Syntax: `ACSNOLIMIT <!group> ON|OFF`

Example: `/msg GroupServ ACSNOLIMIT !awesome-people ON`

### FDROP

FDROP allows you to "unregister" a registered group.

Once you FDROP a group all of the data associated
with it (access lists, metadata, etc) are removed and cannot
be restored.

Syntax: `FDROP <!group>`

Example: `/msg GroupServ FDROP !baz`

### FFLAGS

The FFLAGS command allows an oper to force a flags
change on a group. The syntax is the same as FLAGS,
except that the target and flags changes must be given.
Viewing any group's access list is done with FLAGS.

Syntax: `FFLAGS <!group> <nickname> <flag_changes>`

Examples:
```
/msg GroupServ FFLAGS !baz foo +F
/msg GroupServ FFLAGS !baz foo -*
/msg GroupServ FFLAGS !baz foo +fmc
```

### LIST

LIST shows all groups matching a specified pattern.

Syntax: `LIST <group pattern>`

Examples:
```
/msg GroupServ LIST *
/msg GroupServ LIST !pants*
```

### REGNOLIMIT

REGNOLIMIT allows a group to collectively maintain an
unlimited amount of channel registrations.

Syntax: `REGNOLIMIT <!group> ON|OFF`

Example: `/msg GroupServ REGNOLIMIT !awesome-people ON`
