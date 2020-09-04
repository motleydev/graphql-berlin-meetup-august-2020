# Building Dynamic Forms with GraphCMS and NextJS

First, to see the prior art and foundation to this project, [check out the excellent starter by @notrab](https://github.com/notrab/dynamic-graphql-nextjs-forms).

Ultimately, the only content we've added on top of that is some opinionated styling and hero content for our landing page.

Our Page schema is defined of forms and hero fields.

Our form model looks like this. The interesting thing to note here is the Union type which takes a number of additional field models. which then let's us compose our form like the photo below.
