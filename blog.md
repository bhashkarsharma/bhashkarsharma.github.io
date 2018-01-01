---
title: Posts
layout: base
---
<div class="blog">
    <h1 class="page-heading">Posts</h1>
    
    {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
    {% for year in postsByYear %}
      <h2>{{ year.name }}</h2>
        <ul class="post-list">
          {% for post in year.items %}
            <li>
                {% assign date_format = site.minima.date_format | default: "%d/%m" %}
                <span class="post-meta">{{ post.date | date: date_format }}</span>
                <a class="post-link" href="{{ post.url }}">{{ post.title | escape | truncate: 75 }}</a>
                <span class="post-meta small">{{ post.categories[0] | escape }}</span>
            </li>
          {% endfor %}
        </ul>
    {% endfor %}
</div>
