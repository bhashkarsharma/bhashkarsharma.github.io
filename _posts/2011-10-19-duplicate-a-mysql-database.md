---
title: Duplicate a MySQL database
canonical: http://rockerhome.wordpress.com/2011/10/19/duplicate-a-mysql-database/
date: 2011/10/19 12:03:37
tags: technology, mysql
---
I was testing something out, and realized that I needed to clone my database to run some tests while still being able to keep the data intact. And that's when I started searching for a way to do it, and turns out there's a one-liner to do the same :) <span class="more"></span>

```sql
# mysqladmin create DB_name -u DB_user --password=DB_pass && \
mysqldump -u DB_user --password=DB_pass DB_name |
mysql -u DB_user --password=DB_pass -h DB_host DB_name
```

This is the site where I found it: http://www.rubyrobot.org/article/duplicate-a-mysql-database (although at this point of time I'm kinda feeling it was moot writing this post as anyone Googling for the solution can land on the page anyway :P )

Gotta run! Peace out.