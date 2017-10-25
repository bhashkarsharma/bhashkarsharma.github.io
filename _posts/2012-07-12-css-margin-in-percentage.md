---
title: CSS Margin In Percentage
canonical: http://rockerhome.wordpress.com/2012/07/12/css-margin-in-percentage/
date: 2012/07/12 19:29:30
tags: technology, css
---
Okay, this is funny; but only if it doesn't come in the way of you getting things done on time. I was trying to assign percentage margin to a &lt;div&gt; and it kept throwing me off on the calculations. A bit of googling led me to this [explanation](http://www.mattsnider.com/css-using-percent-for-margin-and-padding/). If you are giving padding/margin in percentage, due to some out-of-the-world reason it would calculate on the basis of the _width_ of the parent element; whether you are calculating left-right values for margin/padding, or the top-bottom ones. It beats me as to why is it this way. Let me know if you know the answer. Back to work!