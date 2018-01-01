---
layout: base
title: Categories
---
<div class="blog">
  <h1 class="page-heading">Categories</h1>
  <div>
    {% for tag in site.categories %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
    <ul class="post-list">
      {% for post in tag[1] %}
      <li>
          {% assign date_format = site.minima.date_format | default: "%d/%m" %}
          <span class="post-meta">{{ post.date | date: date_format }}</span>
          <a class="post-link" href="{{ post.url }}">{{ post.title | escape | truncate: 75 }}</a>
      </li>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>
