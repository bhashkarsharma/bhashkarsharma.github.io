---
title: The plight of shortlinks
canonical: http://rockerhome.wordpress.com/2012/10/08/the-internets-are-broken-again/
date: 2012/10/08 10:40:14
tags: technology, twitter
---
This morning, it turns out, t.co, twitter's own URL shortner links were not working. The browser responded with 'Lookup failed', while wget said this:<span class="more"></span> 

```bash
Resolving t.co (t.co)... failed: nodename nor servname provided, or not known. 
wget: unable to resolve host address `t.co'
```

So I tried to look into what was going on. This potentially meant that almost all of the millions of links being shared on twitter were rendered useless. Here's what whois revealed: 

```bash
Domain Name: T.CO
Domain ID: D740225-CO
Sponsoring Registrar: MELBOURNE IT LTD
Sponsoring Registrar IANA ID: 13
Registrar URL (registration services): www.melbourneit.com.au
Domain Status: clientDeleteProhibited
Domain Status: clientHold
Domain Status: clientTransferProhibited
Domain Status: clientUpdateProhibited
Domain Status: serverDeleteProhibited
Domain Status: serverTransferProhibited
Registrant ID: TWITTERREG2012
Registrant Name: Twitter, Inc.
Registrant Organization: Twitter, Inc.
Registrant Address1: 1355 Market Street
Registrant Address2: Suite 900
Registrant City: San Francisco
Registrant State/Province: CA
Registrant Postal Code: 94103
Registrant Country: United States
Registrant Country Code: US
Registrant Phone Number: +1.4152229670
Registrant Facsimile Number: +1.4152220922
Registrant Email: domains@twitter.com
Administrative Contact ID: TWITTERADMIN2012
Administrative Contact Name: Domain Admin
Administrative Contact Organization: Twitter, Inc.
Administrative Contact Address1: 1355 Market Street
Administrative Contact Address2: Suite 900
Administrative Contact City: San Francisco
Administrative Contact State/Province: CA
Administrative Contact Postal Code: 94103
Administrative Contact Country: United States
Administrative Contact Country Code: US
Administrative Contact Phone Number: +1.4152229670
Administrative Contact Facsimile Number: +1.4152220922
Administrative Contact Email: domains@twitter.com
Billing Contact ID: MIT_BILLING
Billing Contact Name: DBS Billing
Billing Contact Address1: 636 Ellis Street
Billing Contact City: Mountain View
Billing Contact State/Province: CA
Billing Contact Postal Code: 94043
Billing Contact Country: United States
Billing Contact Country Code: US
Billing Contact Phone Number: +1.8669073267
Billing Contact Facsimile Number: +1.6506182574
Billing Contact Email: billing@melbourneitdbs.com
Technical Contact ID: TWITTERTECH2012
Technical Contact Name: Tech Admin
Technical Contact Organization: Twitter, Inc.
Technical Contact Address1: 1355 Market Street
Technical Contact Address2: Suite 900
Technical Contact City: San Francisco
Technical Contact State/Province: CA
Technical Contact Postal Code: 94103
Technical Contact Country: United States
Technical Contact Country Code: US
Technical Contact Phone Number: +1.4152229670
Technical Contact Facsimile Number: +1.4152220922
Technical Contact Email: domains-tech@twitter.com
Name Server: NS1.P34.DYNECT.NET
Name Server: NS2.P34.DYNECT.NET
Name Server: NS3.P34.DYNECT.NET
Name Server: NS4.P34.DYNECT.NET
Created by Registrar: INJECTCSR
Last Updated by Registrar: MELBOURNE IT LTD
Last Transferred Date: Mon Mar 14 22:21:58 GMT 2011
Domain Registration Date: Mon Apr 26 07:50:40 GMT 2010
Domain Expiration Date: Thu Apr 25 23:59:59 GMT 2013
Domain Last Updated Date: Mon Oct 08 05:13:38 GMT 2012

>>>> Whois database was last updated on: Mon Oct 08 05:35:46 GMT 2012 <<<<
```

See the last line? I'm guessing somebody messed around with DNS settings. Hopefully the nameservers around the world will pick it up sooner, than later. But the question is: is there a need for more 'embedded' URL shorteners, maybe baked into the browsers, kinda along the lines of [Mozilla Persona](https://login.persona.org/) for authentication?

[**Update**: Just noticed that TNW has already reported this and is [trending on HN](http://news.ycombinator.com/item?id=4625646)]