---
id: chanfix
title: CHANFIX
sidebar_label: CHANFIX
---

## Service Usage

## Commands

* [LIST](#list) --

### CHANFIX

CHANFIX allows you to manually "fix" a
unregistered channel by fixing certain
modes and giving ops to the user(s) with
the highest scores.

Syntax: `CHANFIX <#channel>`

Example: `/msg CHANFIX CHANFIX #foo`

### INFO

INFO displays chanfix information such as
the highest score, usercount, score stepping
and the fix status of the channel.

Syntax: `INFO <#channel>`

Example: `/msg CHANFIX INFO #foo`

### LIST

LIST displays a list of matching CHANFIX
channels (or all channels if no criteria
is given)

Syntax: `INFO [*]`

Examples:
```
    /msg CHANFIX LIST
    /msg CHANFIX LIST #Chat*
```

### MARK

MARK allows operators to attach a note to a channel.
For example, an operator could mark the channel of a
spammer so that others know it has previously been
warned.

MARK information will be displayed in INFO output.

Syntax: `MARK <#channel> ON|OFF <reason>`

Example: `/msg CHANFIX MARK #lobby ON Takeover: returned to bill`

### NOFIX

NOFIX allows operators to make a channel be essentially
ignored by ChanFix as far as automatic and manual
fixes.

NOFIX information will be displayed in INFO output.

Syntax: `NOFIX <#channel> ON|OFF <reason>`

Example: `/msg CHANFIX NOFIX #warez ON Channel not supported by services on this network.`

### SCORES

SCORES lists all users' chanfix scores
for the specified channel.

Syntax: `SCORES <#channel>`

Example: `/msg CHANFIX SCORES #foo`
