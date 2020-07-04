---
id: gameserv
title: GameServ
sidebar_label: GameServ
---

## Service Usage

## Commands

* [CALC](#calc) -- Calculate stuff.
* [EIGHTBALL](#eightball) -- Ask the 8-Ball a question.
* [LOTTERY](#lottery) -- Choose a random user on a channel.
* [NAMEGEN](#namegen) -- Generate some names to ponder.
* [ROLL](#roll) -- Rolls one or more dice.
* [RPS](#rps) -- Rock Paper Scissors.

### CALC

*Provided in `modules/gameserv/dice`*

CALC lets you do some simple mathematics with
services. You can also specify a number of
calculations that can be done at once.

Syntax: `CALC [times] <expression>`

Examples:
```
/msg GameServ CALC 6*8
/msg GameServ CALC 5 1+2
```

### EIGHTBALL

*Provided in `modules/gameserv/eightball`*

Asks the magic 8-ball a question.

Syntax: `EIGHTBALL`

Example: `/msg GameServ EIGHTBALL`

### LOTTERY

*Provided in `modules/gameserv/lottery`*

LOTTERY randomly chooses a user on
the channel where it is run.

Syntax: `LOTTERY`

Example: `/msg GameServ LOTTERY`

### NAMEGEN

*Provided in `modules/gameserv/namegen`*

NAMEGEN provides you with a list of possible
names you could use.

It can display the result to either yourself or
a channel.

Syntax: `NAMEGEN [number of names]`

Example: `/msg GameServ NAMEGEN 5`

### ROLL

*Provided in `modules/gameserv/dice`*

ROLL lets you roll a series of virtual dice
and display the result to either yourself or
a channel. You can also specify a number of
dice rolls that can be done at once.

Syntax: `ROLL [times] <#dice>d<#sides>`

Examples:
```
/msg GameServ ROLL 2d16
/msg GameServ ROLL 5 4d16
```

### RPS

*Provided in `modules/gameserv/rps`*

RPS will randomly reply "Rock", "Paper", or "Scissors".

Syntax: `RPS`

Example: `/msg GameServ RPS`

