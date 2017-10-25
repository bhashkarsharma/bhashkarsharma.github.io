---
title: Sync your Nokia contacts with GMail contacts
canonical: http://rockerhome.wordpress.com/2011/01/31/sync-your-nokia-contacts-with-gmail/
date: 2011/01/31 13:43:20
tags: technology, nokia, sync, google
---
![Nokia GMail sync](http://rockerhome.files.wordpress.com/2011/01/gmail-app-mobile.jpg?w=300)

Hi fellas. So I have this Nokia S60 phone (5233) which, sadly, does not have support for Mail for Exchange ActiveSync. And that is the reason I started looking for alternatives to backup and sync my contacts and calendar.<span class="more"></span> An option that can serve the backup purpose is [Nokia Ovi](http://ovi.com/) but that is limited to a backup and restore functionality and does not support any syncing with other services AFAIK, which didn't help my purpose. So I started searching for other alternatives. Now, I don't know whether any paid solutions work (assuming they exist) but yours truly was not looking for those. After running some queries on Google, I landed on some interesting solutions. And the one that worked for me, I'm sharing here: 
1. Go to Settings » Connectivity » Data transfer » Sync
2. Select 'Options' » 'New sync profile'
3. A profile wizard will start, and would ask for a profile name. Just give a unique name such as 'GMail sync' and hit 'Next'
4. Now it would prompt you for a server version. Choose '1.2'
5. Next, choose what you want to sync. In our case, it will just be 'Contacts'.
6. Now, the name of the Contacts database. Enter exactly 'Contacts' (without the quotes)
7. For Data bearer, choose 'Internet'
8. Host address next. Enter the URL 'https://m.google.com/syncml'
9. Server ID will be 'Google' 
10. Port, if it prompts you for, would be '443' 
11. Now for the login credentials: Username and Password. Just enter your Google account username and password.
12. Okay, we are good to go. Now choose 'Save profile'. It will prompt you for whether this should be the active profile. 

Choose 'Yes'. Now all you need to do is go to 'Options' » 'Synchronize'. 

Once synchronization is complete, all your GMail contacts will be in sync with your phone contacts and vice-versa. Oh, and did I mention that includes the pics that people have set as their Google profile pic? Cool, huh? 

Also, you can get push mail for your phone using Nokia Mail service, for which you might need to update your phone software. I updated my phone recently and is currently running V 21.1.102 dated 17-09-2010. Works beautifully for me. 

The default Email app has inbuilt templates for GMail, Yahoo! mail, Hotmail, Rediffmail etc. And an option 'others', although I think very few would need to go there. I'm hoping it helps! :) 

Take care. I will be back. Till then...