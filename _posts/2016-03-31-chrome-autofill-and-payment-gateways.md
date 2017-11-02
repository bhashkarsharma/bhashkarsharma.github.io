---
title: Chrome Autofill and Payment Gateways
date: 2016/03/31 09:00:00
image: "/assets/images/posts/credit-card.jpg"
comments: true
---
Google Chrome has an autofill option which comes in very handy while entering personal details like email, name, address etc.<span class="more"></span> Lately, they have added a Credit Card option that allows you to autofill your card details.

You can find it in `Settings > Show advanced settings > Passwords and Forms > Manage Autofill settings > Credit cards`. Or you can go to `chrome://settings/autofill`.

![](/assets/images/posts/card-autofill.jpg)

When you add a card for the first time, a reversible temporary transaction is generated on the card to ensure its validity. The card also gets added to your Google account, and shows up on your Google Payments page.

![](/assets/images/posts/card-wallet.jpg)

I've been using this feature for a while and it is pretty useful. All you need to do is enter your CVV number when prompted by the browser.

I became so used to autofilling this information that I never looked at the value in the fields, trusting that Chrome would do the right thing, and expecting that the sites would too. Turns out I was wrong.

In India, you also need to enter a One-Time Password (OTP), that is usually sent via an SMS, to authorize the payment after entering your card details. When I faced failed payment twice, I thought I had typed in the OTP wrong.

Turns out the problem was that the month field being autofilled was off by one.

##Javascript

In Javascript, month is zero-indexed, which means January would be 0 and December would be 11. I didn't bother looking into the source code of the websites, but I'm assuming the sites getting this wrong have to do with zero-indexing. On observation, I found that for a Card with expiry month April (4th month; index 3 for JS), the form autofilled the (displayed) month to 05 (May).

I am assuming that the `value` in the month `<select>` field was 4 - the index for May.

Something like this:
```
	<option value="4">05</option>
```

I have observed this issue on a couple of Indian payment gateways so far.
