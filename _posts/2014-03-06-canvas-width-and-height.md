---
title: Canvas width and height
canonical: http://rockerhome.wordpress.com/2014/03/06/canvas-width-and-height/
date: 2014/03/06 15:30:57
tags: technology, html, css
---
When using canvas, remember to add width and height attributes to the markup
```html
<canvas width="200" height="300"></canvas>
```
even if you have defined them in the CSS, otherwise you might see some unexpected code behavior.