# Building Dynamic Forms with GraphCMS and NextJS

First, to see the prior art and foundation to this project, [check out the excellent starter by @notrab](https://github.com/notrab/dynamic-graphql-nextjs-forms).

Ultimately, the only content we've added on top of that is some opinionated styling and hero content for our landing page.

Our Page schema is composed of a form and hero fields.

![](images/page-model.png?raw=true)

Our form model looks like this.

![](images/form-model.png?raw=true)

![](images/text-area-model.png?raw=true)

The interesting thing to note here is the Union Type which accepts a number of additional field models which lets us compose our form like the photo below.

![](images/form-content.png?raw=true)
