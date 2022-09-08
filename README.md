<p align="center">
  <img height="200" src="https://ik.imagekit.io/hopsoft/turbo-reflex-logo_dgjKz2_SK.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661529169962" />
  <h1 align="center">
    Welcome to TurboReflex 👋<br />
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-231-47d299.svg" />
    </a>
    <a href="https://codeclimate.com/github/hopsoft/turbo_reflex/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/fe1162a742fe83a4fdfd/maintainability" />
    </a>
    <a href="https://rubygems.org/gems/turbo_reflex">
      <img alt="GEM Version" src="https://img.shields.io/gem/v/turbo_reflex?color=168AFE&include_prereleases&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://rubygems.org/gems/turbo_reflex">
      <img alt="GEM Downloads" src="https://img.shields.io/gem/dt/turbo_reflex?color=168AFE&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://github.com/testdouble/standard">
      <img alt="Ruby Style" src="https://img.shields.io/badge/style-standard-168AFE?logo=ruby&logoColor=FE1616" />
    </a>
    <a href="https://www.npmjs.com/package/turbo_reflex">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/turbo_reflex?color=168AFE&logo=npm">
    </a>
    <a href="https://www.npmjs.com/package/turbo_reflex">
      <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/turbo_reflex?color=168AFE&logo=npm">
    </a>
    <a href="https://bundlephobia.com/package/turbo_reflex@">
      <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/turbo_reflex?label=bundle%20size&logo=npm&color=47d299">
    </a>
    <a href="https://github.com/sheerun/prettier-standard">
      <img alt="JavaScript Style" src="https://img.shields.io/badge/style-prettier--standard-168AFE?logo=javascript&logoColor=f4e137" />
    </a>
    <a href="https://twitter.com/hopsoft">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/hopsoft?logo=twitter&style=social">
    </a>
  </p>
</p>

#### TurboReflex brings the [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) model to [Turbo Frames](https://turbo.hotwired.dev/reference/frames).

<!-- Tocer[start]: Auto-generated, don't remove. -->

## Table of Contents

  - [Why TurboReflex?](#why-turboreflex)
  - [Sponsors](#sponsors)
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Usage](#usage)
    - [Client Side Events](#client-side-events)
    - [Targeting Frames](#targeting-frames)
    - [Server Side Reflexes](#server-side-reflexes)
    - [Appending Turbo Streams](#appending-turbo-streams)
    - [Broadcasting Turbo Streams](#broadcasting-turbo-streams)
  - [License](#license)
  - [Contributing](#contributing)
  - [Todos](#todos)
    - [Requirements](#requirements)
      - [Scope](#scope)
      - [Helpful Context](#helpful-context)

<!-- Tocer[finish]: Auto-generated, don't remove. -->

## Why TurboReflex?

[Turbo Frames](https://turbo.hotwired.dev/reference/frames) are a terrific technology that can help you build modern reactive web applications.
They are similar to [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in that they focus on features like
discrete isolated content, browser history, and scoped navigation... *with the caveat that they share their parent's DOM tree.*

**TurboReflex** extends Turbo Frames and adds support for client triggered reflexes [*(think RPC)*](https://en.wikipedia.org/wiki/Remote_procedure_call).
Reflexes let you *sprinkle* ✨ in functionality that doesn't warrant the ceremony of typical [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) boilerplate *(routes, controllers, actions, etc...)*.
Reflexes are great for features that ride atop RESTful resources. Things like making selections, toggling switches, etc...
Basically any feature where you've been tempted to create a non-RESTful action in a controller.

**Reflexes improve the developer experience (DX) of creating modern reactive applications.**
They share the same mental model as React and other client side frameworks.

1. **Trigger an event**
2. **Change state**
3. **(Re)render to reflect the state change**
4. *repeat...*

*The primary distinction being that **state** is wholly managed by the server.*

Also, the fact that TurboReflex is a lightweight Turbo Frame extension means that reactivity runs over HTTP.
**Web sockets are NOT used for the reactive critical path!** 🎉

## Sponsors

<p align="center">
  <em>Proudly sponsored by</em>
</p>
<p align="center">
  <a href="https://www.clickfunnels.com?utm_source=hopsoft&utm_medium=open-source&utm_campaign=turbo_reflex">
    <img src="https://images.clickfunnel.com/uploads/digital_asset/file/176632/clickfunnels-dark-logo.svg" width="575" />
  </a>
</p>

## Dependencies

- [rails](https://rubygems.org/gems/rails) `>=6.1`
- [turbo-rails](https://rubygems.org/gems/turbo-rails) `>=1.1`
- [@hotwired/turbo-rails](https://yarnpkg.com/package/@hotwired/turbo-rails) `>=7.1`

## Installation

Be sure to install the same version of each libary.

```sh
bundle add "turbo_reflex --version VERSION"
yarn add "turbo_reflex@VERSION --exact"
```


## Setup

1. Add TurboReflex as a dependency

    ```diff
    # Gemfile
    +gem "turbo_reflex", "~> 0.0.2"
    ```

    ```diff
    # package.json
    "dependencies": {
      "@hotwired/turbo-rails": ">=7.1",
    +  "turbo_reflex": "^0.0.2"
    ```

2. Import TurboReflex in the JavaScript application

    ```diff
    # app/javascript/application.js
    +import 'turbo_reflex'
    ```

2. Add TurboReflex behavior to the Rails application

    ```diff
    # app/views/layouts/application.html.erb
    <!DOCTYPE html>
    <html>
      <head>
        ...
    +    <%= turbo_reflex_meta_tag %>
        ...
    ```

    ```diff
    # /app/controllers/application_controller.rb
    class ApplicationController < ActionController::Base
    +  include TurboReflex::Behavior
    end
    ```

## Usage

This example illustrates how to use TurboReflex to manage upvotes on a Post.

```erb
<!-- app/views/posts/show.html.erb -->
<%= turbo_frame_tag dom_id(@post) do %>
  <a href="#" data-turbo-reflex="VotesReflex#upvote">Upvote</a>
  Upvote Count: <%= @post.votes >
<% end %>
```

When the user clicks the upvote link, the reflex will be invoked and the Turbo Frame will automatically (re)render.

```ruby
# app/reflexes/posts_reflex.rb
class PostsReflex < TurboReflex::Base
  def upvote
    Post.find(controller.params[:id]).increment! :votes
    turbo_streams << turbo_stream.invoke("alert", args: ["Thanks for voting!"])
  end
end
```

Note that you can create additional Turbo Streams in the reflex.
These additional streams will be appended to the standard Turbo Frame response.
*This is an exceptionally powerful feature.*

> 📘 **NOTE:** `turbo_stream.invoke` is a [TurboReady](https://github.com/hopsoft/turbo_ready#usage) feature.

### Client Side Events

TurboReady uses [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation) to capture events that can trigger reflexes.

This is the list of default events and their respective elements that TurboReflex monitors.

- **`change`** - `<input>`, `<select>`, `<textarea>`
- **`submit`** - `<form>`
- **`click`** - `*` *all other elements*

It's possible to override these defaults like so.

```js
import TurboReflex from 'turbo_reflex'

// restrict `click` monitoring to <a> and <button> elements
TurboReflex.registerEvent('click', ['a', 'button'])
```

You can also register custom events and elements.
Here's an example that sets up monitoring for the `sl-change` event on the `sl-switch` element from the [Shoelace web component library](https://shoelace.style/).

```js
TurboReflex.registerEvent('sl-change', ['sl-switch'])
```

### Targeting Frames

By default TurboReflex targets the [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) `turbo-frame` element; however, it's possible to explicitly target other frames.

```erb
<input type="checkbox"
  data-turbo-reflex="ExampleReflex#work"
  data-turbo-reflex-frame="some-frame-id">
```

### Server Side Reflexes

The attribute `data-turbo-reflex` specifies the Ruby class and method to invoke.
*Set the value with RDoc notation. i.e. `ClassName#method_name`*

```erb
<a data-turbo-reflex="DemoReflex#example">
```

Reflexes can live anywhere in your app, but we recommend you keep them in the `app` directory.

```diff
 |- app
 |  |...
 |  |- models
+|  |- reflexes
 |  |- views
```

Server side reflexes define methods that can be invoked by the client.

Reflexes are simple Ruby classes that inherit from `TurboReflex::Base`.
They expose the following instance methods and properties.

- `element` - a struct that represents the DOM element that triggered the reflex
- `controller` - the Rails controller processing the Turbo Frame request
- `turbo_stream` - a Turbo Stream [`TagBuilder`](https://github.com/hotwired/turbo-rails/blob/main/app/models/turbo/streams/tag_builder.rb)
- `turbo_streams` - a list of Turbo Streams to append to the response

```ruby
# app/reflexes/demo_reflex.rb
class DemoReflex < TurboReflex::Base
  # The reflex method is invoked by an ActionController before filter.
  # Standard Rails behavior takes over after the reflex method completes.
  def example
    # - execute business logic
    # - update state
    # - append additional Turbo Streams
  end
end
```

### Appending Turbo Streams

It's possible to append additional Turbo Streams to the response in a reflex.
*This proves incredibly powerful when paired with [TurboReady](https://github.com/hopsoft/turbo_ready).*

```ruby
# app/reflexes/demo_reflex.rb
class DemoReflex < TurboReflex::Base
  def example
    # logic...
    turbo_streams << turbo_stream.invoke("console.log", args: ["Whoa! 🤯"])
  end
end
```

> 📘 **NOTE:** `turbo_stream.invoke` is a [TurboReady](https://github.com/hopsoft/turbo_ready#usage) feature.

### Broadcasting Turbo Streams

This isn't a TurboReflex feature *per se*, but it may prove helpful to illustrate that you can broadcast Turbo Streams to other subscribed users from a reflex.

```ruby
# app/reflexes/demo_reflex.rb
class DemoReflex < TurboReflex::Base
  def example
    # logic...
    Turbo::StreamsChannel
      .broadcast_invoke_later_to "some-subscription", "console.log", args: ["Whoa! 🤯"]
  end
end
```

*You can learn more about Turbo Stream broadcasting by reading through the [hotwired/turbo-rails](https://github.com/hotwired/turbo-rails/blob/main/app/models/concerns/turbo/broadcastable.rb) source code.*

> 📘 **NOTE:** `broadcast_invoke_later_to` is a [TurboReady](https://github.com/hopsoft/turbo_ready#broadcasting) feature.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

## Todos

- [ ] Add support for forms
- [ ] Add support for setting instance variables on the controller
- [ ] Look into adding a reflex frame to support things like morph or at least document how this can be done

### Requirements

#### Scope

Only support default behavior of frame (re)render with additional TurboStreams.

#### Helpful Context

- [Allow Turbo Streams with GET via data-turbo-stream](https://github.com/hotwired/turbo/pull/612)
- [Document data-turbo-stream](https://github.com/hotwired/turbo-site/pull/103)
