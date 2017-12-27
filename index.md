---
layout: base
---
<div class="index">
    <h2>My Creations</h2>
    <div id="insta-box"></div>
    <h2>Recent Post</h2>
    {% for post in site.posts limit:1 %}
        <ul class="post-list">
            <li>
                {% assign date_format = site.minima.date_format | default: "%d/%m" %}
                <span class="post-meta">{{ post.date | date: date_format }}</span>
                <a class="post-link" href="{{ post.url }}">{{ post.title | escape | truncate: 75 }}</a>
            </li>
        </ul>
    {% endfor %}
    <h2>My Tools</h2>
    <div class="tools">
        <div><i class="fab fa-angular"></i></div>
        <div><i class="fab fa-aws"></i></div>
        <div><i class="fab fa-gulp"></i></div>
        <div><i class="fab fa-css3-alt"></i></div>
        <div><i class="fab fa-html5"></i></div>
        <div><i class="fab fa-js"></i></div>
        <div><i class="fab fa-node"></i></div>
        <div><i class="fab fa-python"></i></div>
        <div><i class="fab fa-react"></i></div>
        <div><i class="fab fa-sass"></i></div>
    </div>
</div>
