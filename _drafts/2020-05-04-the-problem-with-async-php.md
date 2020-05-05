---
layout: post
title: The problem with Async PHP
subtitle: And how to fix it
categories: [php]
image: https://images.unsplash.com/photo-1567093322503-341d262ad8f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80
---

So Async PHP is something I have played around with a bit as of late. I started
with working on [ElephantMFA] in November 2019, which is an SMTP server built on
Laravel and [ReactPHP]. There were a large number of issues that caused it to fall apart,
and while it's still something I would like to actually complete, it will likely
be awhile before I return to it. And then lately, I have also started working
on a microservice for work, and I chose to implement that with Async PHP because
it seemed to make more sense for it's application, and I built that with [Amphp].
I have not quite yet worked with [Swoole], but considering it's documentation has
improved dramatically since the last time I looked at it, I may give it a
chance in the future.

And I guess I should speak as to why I chose to use Amphp over ReactPHP for this
new project? Well, Amphp has the concept of
[Coroutines](https://amphp.org/amp/coroutines/) (just like Swoole) which allows for getting
away from callback hell, which you tend to get stuck into with ReactPHP. Using
generators and `yield` to act like `async/await` (which are really just syntactic
sugar for Generators and Yield anyways) out of the box means working with it is a
lot nicer. You can just yield the value of a promise, and be good to go.

Another reason is that Amphp has first class support for ReactPHP promises, eventloop,
and other functionality, which means the full ReactPHP ecosystem is available to it.

And that first class support is what gets me into the point of this post. The
biggest problem with Async PHP is the **ecosystem**. Javascript has asynchronicity
built into it as a core concept, however PHP doesn't. This has caused a number
of different implementations to pop up, and created fracturing.

<div class="w-full flex justify-center items-center">
    <a href="https://xkcd.com/927/">
        <img src="https://imgs.xkcd.com/comics/standards.png" alt="xkcd Standards Comic" />
    </a>
</div>

Now, thankfully, one of those competing standards has built into it an interoperability
layer with the defacto one. Swoole can also build in the same interoperability
layer if we made one thing the standard.

But this also leads to other issues with the ecosystem. PHP is full to the brim
with useful packages and frameworks to make development easier and quicker. But
the vast majority of these are blocking, and that means they will *not* work with
any of these async tools. Now Swoole is a little bit different. There appears
to be a compatability layer with [Symfony](https://packagist.org/packages/k911/swoole-bundle)
and [Mezzio](https://github.com/mezzio/mezzio-swoole) also has a compatability
layer. But this doesn't appear to exist for the userland Async tools. Sure, there
is [Labrador](https://labrador-kennel.io/) for Amphp, which improves things a bit
but their documentation (just like the Amphp documentation) is lacking.

And, for the rest of this article, I'm going to ignore Swoole, as since I haven't
worked with it, I can't speak for it. Instead, we will focus more on the userland
Async tools, ReactPHP and Amphp.

Things are on their way, definitely, to making life easier when working with them,
but there are still a lot of limitations. There is no ORM, no [Flysystem], none
of those normal packages, as they are all blocking code. We do have PSR support
for loggers, and Request/Response/Middleware, and what not. But even then, you have
to be careful about using Middleware/Requests/Responses from outside the Async ecosystem,
as they may have blocking code that breaks your system without you even knowing.

And speaking of PSR, this brings me into the thing that is most necessary for async
PHP going forward. A standard for Promises/Loops. This has been
[attempted](https://github.com/async-interop) but none of their work seems to have
been updated since 2017, and there doesn't appear to be much more work going into
this. Thankfully, Amphp supports it out of the box, and ReactPHP has a
[package](https://packagist.org/packages/wyrihaximus/react-async-interop-loop) to
support it, thanks to [WyriHaximus](https://github.com/WyriHaximus), a big contributor
to the ReactPHP ecosystem. But while it is technically supported, this doesn't
provide the best Developer Experience. Especially since interoperability between
things like Guzzle's Promise implementation is only somewhat supported throughout
the ecosystem.

And the documentation across the board for Async PHP applications is pretty bad,
making it very hard to get into. I noticed that with Amphp, I had to dig into the
code or the example files in the git repos to learn stuff, or learn about other
packages I need to do what I'm wanting to do.

## So, that's been a lot of complaining. But where is the solution?

I did say, "And how to fix it" in the title. Well, the solution really comes down
to us. We need to revive the [Async-Interop], or even make it a subset of PHP-FIG,
so that we can maintain concrete rules of how Async in PHP works, and have a single
set of standard Interfaces that everyone uses.

This would allow for a push to get Async compatability into things like [Flysystem],
and other tools, or allow for a consistent set of tools across the entire Ecosystem,
so that whether you use [ReactPHP] or [Amphp], you would have an ORM, filesystem tools,
event handlers, queue systems, etc.

**So this is a call to arms.** If you work with or on Async PHP code, you need
to help with building out an ecosystem of tools, like how the synchronous PHP world
has. We need a Symfony or Laravel for the Async world, in the end.

And here's where I swing back to the beginning of this. In working on that microservice
for work, I've noticed I had to spend much of my time working on implementing
standard framework functionality, such as controllers, configuration injestion, etc.
As such, I'm going to work on branching out all that code, cleaning it up for use
as a micro-framework, and get that out as an Open Source package, and see if I can
get things like a Query Builder/ORM, filesystem tools, etc. all built out for it,
and for the Async Ecosystem. But this cannot be a solo project, and interoperability
is going to be one of those issues, once again.

But if you aren't someone who can help build frameworks, you can still help in other
ways. Help with the Amphp/ReactPHP documentation. If you are YouTuber/Twitch Streamer,
make content on using Amphp/ReactPHP, get the word out.

The key thing is: **We need to work on making Async PHP normal, not a niche**

[ElephantMFA]: https://github.com/elephantmfa/framework
[ReactPHP]: https://reactphp.org/
[Amphp]: https://amphp.org/
[Swoole]: https://www.swoole.co.uk/
[Flysystem]: https://flysystem.thephpleague.com/v1/docs/
[Async-Interop]: https://github.com/async-interop
