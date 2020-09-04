# Building Dynamic Forms with GraphCMS and NextJS

First, to see the prior art and foundation to this project, [check out the excellent starter by @notrab](https://github.com/notrab/dynamic-graphql-nextjs-forms).

You can see the talk I gave going over this example at the following video.

<iframe width="560" height="315" src="https://www.youtube.com/embed/DoR7h88Xlvg?start=4108" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Ultimately, the only content we've added on top of that is some opinionated styling and hero content for our landing page.

Our Page schema is composed of a form and hero fields.

![](images/page-model.png?raw=true)

Our form model looks like this.

![](images/form-model.png?raw=true)

![](images/text-area-model.png?raw=true)

The interesting thing to note here is the Union Type which accepts a number of additional field models which lets us compose our form like the photo below.

![](images/form-content.png?raw=true)
