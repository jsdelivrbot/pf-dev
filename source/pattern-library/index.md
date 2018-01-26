---
title: Pattern Library Overview
author: dlabrecq
layout: page
---
<p>The PatternFly library is a collection of UI design patterns. Design patterns are recurring solutions that solve
common design problems and provide a common language for people who create user interfaces. In general, patterns do not
specify requirements, but rather, present recommended solutions to design problems. PatternFly patterns build on that
approach by additionally considering the needs of complex enterprise IT software, and the habits and motivations of its
users, in their recommendations.</p>
<p>Each pattern within this library contains suggested usages and examples that are annotated with interaction and
visual design specifications. Patterns that have gone through usability testing include a link to the PatternFly blog
where relevant findings are described in more detail. Many patterns also include the code you can use to build the
example. The library is continually being updated with new patterns or code samples for existing patterns. Stay current
with these updates by checking out “What’s New” on the <a href="https://blog.patternfly.org" target="_blank">PatternFly blog</a></p>

{% assign patterns_by_category = site.data.patterns | group_by:"category" %}
{% for category in patterns_by_category %}
  <div class="overview-section">
    <h2 class="overview-section_title">{{ category.name }}</h2>
    <div class="overview-section__body">
      <div class="gallery">
      {% for pattern in category.items %}
          <div class="gallery__item">
            <p class="gallery__item_caption">{{ pattern.name }}</p>
            <a class="gallery__thumbnail" href="{{ pattern.slug }}">
              <img class="gallery__thumbnail_img" src="{{ pattern.thumbnail }}" alt="{{ pattern.name }}"/>
            </a>
          </div>
      {% endfor %}
      </div>
    </div>
  </div>
{% endfor %}
