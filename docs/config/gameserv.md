---
id: gameserv
title: Setting up GameServ
sidebar_label: GameServ
---

GameServ provides essential network management tools for IRC operators on the IRC network.

## GameServ Block

The `gameserv{}` block contains settings specific to the GameServ service bot.

A fully configured `gameserv{}` block may look like: 

```
gameserv {
    nick = "GameServ";
    user = "GameServ";
    host = "misconfigured.network";
    real = "Game Services";
};
```

### Services Bot Options

GameServ supports all [standard services bot options](/docs/config/services).

## Modules

In addition to loading the GameServ service bot itself, these modules configure what SASL mechanisms your network will support. 

| Module | Features |
| ------ | -------- |
| `modules/gameserv/main` | Core components |
| `modules/gameserv/dice` | [DICE](/docs/help/gameserv#dice) and [WOD](/docs/help/gameserv#wod) commands |
| `modules/gameserv/eightball` | [EIGHTBALL command](/docs/help/gameserv#eightball) | 
| `modules/gameserv/gamecalc` | Game-specific dice calculators |
| `modules/gameserv/help` | [HELP command](/docs/help/gameserv#help) |
| `modules/gameserv/lottery` | [LOTTERY command](/docs/help/gameserv#lottery) |
| `modules/gameserv/namegen` | [NAMEGEN command](/docs/help/gameserv#namegen) |
| `modules/help/rps` | [RPS command](/docs/help/gameserv#rps) |


