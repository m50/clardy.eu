---
layout: post
title: "Geistwald: A farming/life action RPG of magic, discovery, and ecological conservationism"
categories: [godot]
image: 
---

# Table of Contents

* TOC
{:toc}

# Introduction

I have been working on a game using the [Godot engine](https://godotengine.org),
that I have yet to name. Currently, I am calling it "Geistwald", however that title
isn't solidly defined, and likely won't be the final name. You can read the
following brief overview I wrote to get a sense of the game.

# The Game

It takes place on the Geistwald Plateau, the last place on earth where Spirits 
and Fairies are seen, a place of intense magic, in and amongst a resilient, magical
forest that fights back against deforestation.

You are a recent graduate from the Royal College of Magic, studying Herbalism 
and Botany. Your great-grandmother left a cottage in the Geistwald for the next 
person in the family to graduate from the college. You have decided to move to 
the Plateau to find out why Spririts are still in the area, and why this place 
has such potent magical energies, which no longer exist in the rest of the world. 
You set off to learn about the sprits in this forest, as it will hopefully 
shed light as to what happened to the rest of the spirits.

With advancing technology, much of humanity (who have built massive forge-cities 
to build ever more advanced creations) no longer really care about magic, 
unless it can be used for profit and power. Humans work their way through
the lands destroying it, building vast profits, and vast empires.

The town of Geistwald Forge, right on the edge of the forest and a Human Fortress,
is a small forge city, looking to advance in wealth. This is where the cottage is
located.

# Technical Thoughts

The game is developed, as mentioned, with the Godot Game Engine, using C#.
I chose to use Godot for 2 main reasons:

1. A general sense online that between Godot and Unity, Godot is better at 2D.
2. Godot is Free and Open Source, which means that if I need to make changes,
    I can. It also means that I won't be hit with fees if I am successful. (This
    is not to say I don't support Godot. I have been a Patreon member since I 
    started using it heavily)

I chose to use C# for a number of reasons:

1. GDScript is godot specific, which means access to a wider eco-system of libraries is missing.
    While there are libraries out there, the selection of libraries is far more
    limited compared to C#.
2. GDScript's static/strong-typing is seriously lacking (Though, I have found C# to be lacking as well).
    This seems to be resolved in Godot 4, however that doesn't help me with working on it right now.
    Static and strong typing is a major concern of mine, having hit many issues in the past with
    duck-typed languages in the past.
3. GDScript lacks a number of features; however because of this, their use in C#
    is not well integrated into Godot, and can cause headaches at times.
4. I prefer C#'s syntax.
5. The dreaded Cyclic Dependency Errors that you get with gdscript.

However due to limitations with C#'s implementation in Godot, I had to create
a couple tools to make working with C# in godot easier.

1. An [autowire] library that I built, allowing a node to automatically set things
    on ready, similar to the `onready` and `preload` features of gdscript.
2. A [class_name implementation] in C#, allowing for bringing another big feature
    of using gdscript into C#.

Due to just how unfinished Godot's C# implementation is, I had to implement
these, along with adding a number of extension methods as well to make everything 
better to use.

Additionally, I use [WATSharp] for unit testing.

I will write more about C# and Godot in a future article.

[autowire]: https://github.com/m50/Godot-CSharp-Autowire
[class_name implementation]: https://github.com/m50/Godot-CSharp-Node-Exports
[WATSharp]: https://github.com/CodeDarigan/WAT-Mono