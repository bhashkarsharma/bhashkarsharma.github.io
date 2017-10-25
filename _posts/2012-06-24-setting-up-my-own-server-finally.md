---
title: Setting up my own server, finally!
canonical: http://rockerhome.wordpress.com/2012/06/24/setting-up-my-own-server-finally/
date: 2012/06/24 13:55:45
tags: technology, aws, unix, python, django
---
I had bought the domain [bhashkar.me](http://bhashkar.me) a year back, but didn't really use it for something worthwhile. It hit me when time came to renew the lease on that thing that it was something I could have made good use of, and I decided to.<span class="more"></span>

Next thing I know, I had got myself an [AWS Free tier](http://aws.amazon.com/free/) and decided to set up a micro-site of sorts. I started looking for best options for a basic platform.

Don't get enraged, I know how awesome Wordpress is. It's just that I wanted something more powerful and tinker-able. I came across [Octopress](http://octopress.org) in the process, but wasn't really inclined towards it, because it is a Ruby setup, and I wanted to do my playing around in Python. No, it doesn't have that much to do with being language-bound, but given the constraints of resources at hand, I didn't really have the freedom to install three setups at once.

You can all it luck (I prefer [LoA](http://en.wikipedia.org/wiki/Law_of_attraction)) that the same day [Rodrigo Neri](http://rigoneri.com/) came up with [Syte](http://rigoneri.github.com/syte/), a setup on top of [Django](http://djangoproject.com) (it's what you call getting what you wished for :) ) and there was no turning back for me!

(In case you're wondering, his own website is built on top of Syte too) In the process of trying to get things working, I got a chance to play with [Gunicorn](http://gunicorn.org), [Nginx](http://nginx.org/) (although I'm not exactly a stranger to it), python [virtualenv](http://pypi.python.org/pypi/virtualenv), [postgresql](http://www.postgresql.org/) and a host of other utilities. There, I just revealed my setup to you. Now that I have a playground of sorts, I will try to tinker with things and post stuff here.

Ciao for now!