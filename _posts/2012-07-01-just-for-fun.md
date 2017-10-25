---
title: Just For Fun
canonical: http://rockerhome.wordpress.com/2012/07/01/just-for-fun/
date: 2012/07/01 15:30:51
tags: technology, python
---
Just the other day... 

```python
import re, os
avi_re = '(Friends)(\\.)(S)(01)(E)(?P&lt;epi&gt;.*?)(\\.)(DVDRip)(\\.)(XviD)(\\.)(avi)'
sub_re = '(Friends)( )(-)( )(1)(\\.)(?P&lt;epi&gt;\w+)(?P&lt;name&gt;.*?)(\\(EN\\))(\\.)(sub)'

for avi_f in filelist:
  if re.match(avi_re, avi_f):
    e = re.match(avi_re, avi_f).group('epi')
    for sub_f in filelist:
      if re.match(sub_re, sub_f):
        ep = re.match(sub_re, sub_f).group('epi')
        if e == ep:
          new = 'Friends - 1.' + ep + re.match(sub_re, sub_f).group('name')
          os.rename(avi_f, new + '.avi')
          os.rename(sub_f, new + '.sub')
```

because I can! ;)