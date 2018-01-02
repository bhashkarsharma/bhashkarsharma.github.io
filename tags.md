---
layout: base
title: Tags
---
<div class="blog">
  <h1 class="page-heading">Tags</h1>
  <div>
    {% assign sitetags = site.tags | sort %}
    {% for tag in sitetags %}
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