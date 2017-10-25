---
title: Hacking Django-Piston
canonical: http://rockerhome.wordpress.com/2012/05/06/hacking-django-piston/
date: 2012/05/06 11:29:59
tags: technology, python, django, piston
---
At [MobStac](http://mobstac.com), we are working on building REST API support for the system. After evaluating various REST API framworks for [django](http://djangoproject.com/), I chose to go with [django-piston](https://bitbucket.org/jespern/django-piston/).<span class="more"></span>

Trust me, there is hundreds of pages such as [this one](http://stackoverflow.com/questions/656979/django-and-restful-apis) debating on which framework to go with, and amongst the top choices (alongside piston) were [Django REST Framework](http://django-rest-framework.org/), [RESTify Django](http://code.google.com/p/django-rest-interface/wiki/RestifyDjango) and others. 

The reason we chose to go with piston is because of the use case we had; which is: an already existing web UI to perform actions, to which (at least for now) the API is going to be a supporting component. Piston is quite well-written, comes with out-of-the-box support for standard output formats (XML, JSON, YAML) and has Basic HTTP Authentication and OAuth built in.

The down-sides, on the other hand, are that it is not well maintained, and there exist almost 150 forks to it, which people created to solve their own problem set. It would have been much better had there been an active support community and integrating features into piston.

One thing I did not understand is the reason to why the author himself has forked it to create another repo that supports OAuth2. I mean, OAuth2 has essentially become the de-facto standard and OAuth has been phased out, especially by the majors (twitter and facebook).

I personally think it would have made more sense to deprecate OAuth support from the main branch. Anyways.

[**Update: **After reading [this article](http://hueniverse.com/2012/07/oauth-2-0-and-the-road-to-hell/) I want to take back what I said above about OAuth 2.0.]

As has been my experience with using the plug-and-play frameworks, there are rarely the ones which, essentially, just work to suit your use case. I experienced the same thing when I was building the MobStac Authentication module and tried using [django-registration](https://bitbucket.org/ubernostrum/django-registration/). It worked for a while, but soon we outgrew it's capabilities (when we had to start adding support for Facebook/Twitter OAuth2 integration, or payment for example). Eventually we had to scrap it and write our own Auth module which, so far, has scaled well. Although there are traces of designs from django-registration remaining, which I intend to get rid of at some point of time. Piston was a similar case. It lacked support for customizing response keys if you wanted to use a Model handler. Let me explain. Django is built on the MVC architecture, except that its more MTV (Model-Template-View). A typical model looks such: 

```python
class Book(models.Model):
    title = models.CharField(max_length=256, db_index=True)
    author = models.CharField(max_length=512, db_index=True)
    published = models.DateTimeField(db_index=True)
```

Piston, with its default integration, allows you to create a handler which directly ties to a model:

```python
class BookHandler(BaseHandler):
     allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
     fields = ('id', 'title', 'author' )
     model = Book
```

So far, so good. My problem with this was that I can't expose the 'title' field as 'book_name' or anything else if I wanted to. Piston did not have support for inbuilt mappings of such kind. The only way out would have been to write a method like so: 

```python
class BookHandler(BaseHandler):
     allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
     fields = ('id', 'book_name', 'author' )
     model = Book

@staticmethod
     def book_name(object):
         return object.title

```

Which, I felt, was overkill to do each time I wanted a custom field name. So I chose to go ahead and modify the emitters module which processes the input format and returns the output. I have already [forked](https://bitbucket.org/bhashkar/django-piston/) piston, but yet have to apply the patch to it. Will do it soon, I promise. I also added Session-based authentication support to it. Now for the same outcome, all you need to do is the following:

```python
class BookHandler(BaseHandler):
    allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
    fields = ('id', { 'book_name' : 'title' }, 'author' )
    model = Book
```

That's right! I added yet another fork to the already present tons of piston forks in the World. C'est la vie.

Peace out, people!

[**PS:** You might be interested in reading this post by the author of Django about the REST API worst practices: http://jacobian.org/writing/rest-worst-practices]