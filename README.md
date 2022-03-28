# PEPS

[]!(assets/images/peps.svg)

## Table of contents

- [The task](#the-task)

- [The driving concept](#the-driving-concept)

- [Try it out](#try-it-out)

- [Main Features](#main-features)

- [The stack](#the-stack)

- [The team](#the-team)

- [Useful links](#useful-links)

---

## The Task

After having spent about 2 and a half months learning ReactJS at The Hacking Project Bootcamp, we've been tasked with building a website that combines this library to our own back-end API.
We went for Next JS, a framework we found about a week before. 

We decided to build a collaborative cooking webiste whose main asset lies within the handling of the database.

## The driving concept

It's no secret that the internet is already well served in terms of cooking websites.

However, according to numerous testimonies, two main issues tend to be uncountered while navigating:

1. It's often annoying to have to scroll past the unnecessary introduction to get to the recipe itself.

2. Most classification systems make it hard to discover all varieties of a given dish.

To answer this, our system is heavily based on [Discogs](https://www.discogs.com/), a music database and marketplace whose success is based, among other things, on its clever architecture, the main principle being that products are ordered through a two-level system: master releases and releases, the former having a 1:N relationship with the latter.

We've adapted this design to the cooking world by setting up main dishes that can be adapted into as many recipes as the users will be able to provide. For example, while pizza is a dish, neapolitan pizze and calzoni are recipes.

## Try it out

Discover it on line [here!](https://peps.life/)

Connect, browse & contribute

## Main Features

### User classics

- Sign-up, sign-in, log-in, log-out, editing etc.

- User profile

### Find the perfect recipe

- The main page displays the latest additions

- The search bar lets you find a specific recipe

- Numerous filters to select by type, country, comments, likes etc.

- See all recipes steming from a dish you like

- Create your list of favourite recipes and make it public or private


### User interaction

- Likes to let the best recipes shine

- Comments to discuss, get more details, give your own twist etc.

## The Stack

As said before, **ReactJS** is used for the front-end, and we've selected **NextJS** combined with **Prisma** in order to build our API. Additionnaly, we've used other tools that fit our needs:

- **Axios**. An easier and more efficient fetching process is always compelling.

- **Mantine**. Since it's a React library, the final product is naturally more tailored than other more generalist alternatives.

As for the authentification system, we made a very vanilla version based on *bcrypt*, *jsonwebtoken* & *js-cookies*.

## The team

[Mathias P.](https://github.com/mrprst/) || [Violette M.](https://github.com/VioMrqs) || [Laurent C.](https://github.com/Laurent-Ch) || [Antoine O.](https://github.com/SuperOrteg) || [Lucas O.](https://github.com/Luucas51)

## Useful links

- More about [The Hacking Project](https://www.thehackingproject.org/)