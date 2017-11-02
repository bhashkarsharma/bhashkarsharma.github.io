---
layout: base
permalink: /lists/index.html
---
<div class="lists">
<h1>Lists</h1>
<a href="/lists/reading/"><i class="fa fa-book fa-5x" aria-hidden="true"></i></a>
<a href="/lists/movies/"><i class="fa fa-film fa-5x" aria-hidden="true"></i></a>
{% comment %}
{% for item in site.lists %}
  <p><a href="{{ item.url }}">{{ item.title }}</a></p>
{% endfor %}
{% endcomment %}
</div>