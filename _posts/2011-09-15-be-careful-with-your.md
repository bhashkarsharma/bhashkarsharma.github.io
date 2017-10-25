---
title: Be careful with your /hosts file
canonical: http://rockerhome.wordpress.com/2011/09/15/be-careful-with-your/
date: 2011/09/15 11:14:35
tags: technology, unix
---
Never remove the mapping that points localhost to 127.0.0.1 in the /hosts file (location can vary depending on the OS).<span class="more"></span>

I spent 1 day trying to figure out why things were not working expectedly. The reason the issue occurred was because some daemon services running on the machine used the address localhost:port to communicate to each other (which makes perfect sense btw).

Its just that I modified the localhost mapping from 127.0.0.1 to the network IP instead of adding a new entry for the same. You might be thinking: this guy only posts about problems, doesn't he? Well, what can I say.. I'm still learning ;) 

Ciao for now!