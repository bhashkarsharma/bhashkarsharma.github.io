---
title: VirtualBox Guest Additions on Ubuntu Server 12.04
canonical: http://rockerhome.wordpress.com/2012/09/15/virtualbox-guest-additions-on-ubuntu-server-12-04/
date: 2012/09/15 23:38:19
tags: technology, unix, ubuntu, virtualbox
---
While trying to set up the development environment for my site, I was having problems making VirtualBox Guest Additions let me share files with the host OS. The production env is Ubuntu Server 12.04 running on AWS EC2 so it was obvious I had to use a VM on the MacBook to ensure my dev env is in sync with the production.<span class="more"></span>

When a couple of tries failed, I decided to start fresh. I deleted the existing VM, churned out a new machine and installed Ubuntu Server 12.04 (Precise Pangolin) on it. Then I proceeded with installing the VirtualBox Guest Additions. For this, I mounted the VBoxGuestAdditions_4.1.6.iso on the machine and ran the following command on it

```bash
sudo ./VBoxLinuxAdditions.run
```
and here's the output

```bash
Verifying archive integrity... All good.
Uncompressing VirtualBox 4.1.6 Guest Additions for Linux.........
VirtualBox Guest Additions installer
Removing existing VirtualBox DKMS kernel modules ...done.
Removing existing VirtualBox non-DKMS kernel modules ...done.
Building the VirtualBox Guest Additions kernel modules
The headers for the current running kernel were not found. If the following
module compilation fails then this could be the reason.

Building the main Guest Additions module ...done.
Building the shared folder support module ...fail!
(Look at /var/log/vboxadd-install.log to find out what went wrong)
Doing non-kernel setup of the Guest Additions ...done.
Installing the Window System drivers ...fail!
(Could not find the X.Org or XFree86 Window System.)
```

The aforementioned log file printed thus

```bash
/tmp/vbox.0/utils.c:122:9: error: assignment of read-only member ‘i_nlink’
/tmp/vbox.0/utils.c:132:9: error: assignment of read-only member ‘i_nlink’
/tmp/vbox.0/utils.c: In function ‘sf_nlscpy’:
/tmp/vbox.0/utils.c:563:13: warning: passing argument 3 of ‘utf8_to_utf32’ from incompatible pointer type [enabled by default]
include/linux/nls.h:53:12: note: expected ‘unicode_t *’ but argument is of type ‘wchar_t *’
make[2]: *** [/tmp/vbox.0/utils.o] Error 1
make[1]: *** [_module_/tmp/vbox.0] Error 2
make: *** [vboxsf] Error 2
Creating user for the Guest Additions.
Creating udev rule for the Guest Additions kernel module.
```

This had me confused so I Googled for solutions. [Here's one](http://en.ig.ma/notebook/2012/virtualbox-guest-additions-on-ubuntu-server) I stumbled upon and tried, but didn't help fix the problem. Even though the problem was apparently occurring due to missing headers, adding them didn't fix it.

I continued searching and landed on [ubuntuforums](http://ubuntuforums.org/showthread.php?t=1888470). I followed [these instructions](http://ubuntuforums.org/showpost.php?p=11517689&postcount=6) and voila! it worked.

Also, looks like it is a [fixed changeset on Vbox](https://www.virtualbox.org/changeset/39224/vbox).

Finally, peace was restored :)

_Tip:_ You would need to edit /etc/group file and add your username, www-data and root thus in order for permissions on the shared directory to work: 

change **vboxsf:x:1001:** line to **vboxsf:x:1001:<your-user-name>,www-data,root**