<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/hopsoft/turbo-reflex-logo-light_2cG9cdQd1.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1663075749336">
    <img width="320" src="https://ik.imagekit.io/hopsoft/turbo-reflex-logo-dark_kSmo1eDLm.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1663075749241" />
  </picture>
  <h1 align="center">
    Welcome to TurboReflex 👋<br />
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-400-47d299.svg" />
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
    <a href="https://github.com/hopsoft/turbo_reflex/actions/workflows/tests.yml">
      <img alt="Tests" src="https://github.com/hopsoft/turbo_reflex/actions/workflows/tests.yml/badge.svg" />
    </a>
    <a href="https://twitter.com/hopsoft">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/hopsoft?logo=twitter&style=social">
    </a>
  </p>
</p>

#### TurboReflex enhances the [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) model for [Turbo Frames](https://turbo.hotwired.dev/reference/frames).

<!-- Tocer[start]: Auto-generated, don't remove. -->

## Table of Contents

  - [Why TurboReflex?](#why-turboreflex)
      - [Reflexes improve the developer experience (DX) of creating modern reactive applications.](#reflexes-improve-the-developer-experience-dx-of-creating-modern-reactive-applications)
  - [Sponsors](#sponsors)
  - [Dependencies](#dependencies)
  - [Setup](#setup)
  - [Usage](#usage)
    - [Reflex Triggers](#reflex-triggers)
    - [Lifecycle Events](#lifecycle-events)
    - [Targeting Frames](#targeting-frames)
    - [Working with Forms](#working-with-forms)
    - [Server Side Reflexes](#server-side-reflexes)
    - [Appending Turbo Streams](#appending-turbo-streams)
    - [Setting Instance Variables](#setting-instance-variables)
    - [Hijacking the Response](#hijacking-the-response)
    - [Broadcasting Turbo Streams](#broadcasting-turbo-streams)
    - [Putting it All Together](#putting-it-all-together)
  - [License](#license)
  - [Todos](#todos)
      - [Helpful Context](#helpful-context)

<!-- Tocer[finish]: Auto-generated, don't remove. -->

## Why TurboReflex?

[Turbo Frames](https://turbo.hotwired.dev/reference/frames) are a terrific technology that can help you build modern reactive web applications.
They are similar to [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in that they focus on features like
discrete isolated content, browser history, and scoped navigation... *with the caveat that they share their parent's DOM tree.*

**TurboReflex** extends Turbo Frames and adds support for client triggered reflexes [*(think RPC)*](https://en.wikipedia.org/wiki/Remote_procedure_call).
Reflexes let you *sprinkle* ✨ in functionality that doesn't warrant the ceremony of typical [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) boilerplate *(routes, controllers, actions, etc...)*.
Reflexes are great for features that ride atop RESTful resources. Things like making selections, toggling switches, adding filters, etc...
**Basically any feature where you've been tempted to create a non-RESTful action in a controller.**

Reflexes improve the developer experience (DX) of creating modern reactive applications.
They share the same mental model as React and other client side frameworks.

1. **Trigger an event**
2. **Change state**
3. **(Re)render to reflect the new state**
4. *repeat...*

*The primary distinction being that __state is wholly managed by the server__.*

TurboReflex is a lightweight Turbo Frame extension... which means that reactivity runs over HTTP.
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

## Setup

1. Add the TurboReflex dependencies

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

   *Be sure to install the __same version__ of the Ruby and JavaScript libraries.*

2. Import TurboReflex in your JavaScript app

    ```diff
    # app/javascript/application.js
    +import 'turbo_reflex'
    ```

2. Add TurboReflex behavior to the Rails app

    ```diff
    # app/views/layouts/application.html.erb
    <html>
      <head>
        ...
    +    <%= turbo_reflex_meta_tag %>
        ...
    ```

    ```diff
    # /app/controllers/application_controller.rb
    class ApplicationController < ActionController::Base
    +  include TurboReflex::Controller
    end
    ```

## Usage

This example illustrates how to use TurboReflex to manage upvotes on a Post.

1. **Trigger an event** - *register an element to listen for events that trigger reflexes*

    ```erb
    <!-- app/views/posts/show.html.erb -->
    <%= turbo_frame_tag dom_id(@post) do %>
      <a href="#" data-turbo-reflex="VotesReflex#upvote">Upvote</a>
      Upvote Count: <%= @post.votes >
    <% end %>
    ```

2. **Change state** - *create a server side reflex that modifies state*

    ```ruby
    # app/reflexes/posts_reflex.rb
    class PostsReflex < TurboReflex::Base
      def upvote
        Post.find(controller.params[:id]).increment! :votes
      end
    end
    ```

3. **(Re)render to reflect the new state** - *normal Rails / Turbo Frame behavior runs and (re)renders the frame*

### Reflex Triggers

TurboReady uses [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation) to capture events that can trigger reflexes.

Here is the list of default events and respective elements that TurboReflex monitors.

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

### Lifecycle Events

TurboReflex supports the following lifecycle events.

- `turbo-reflex:before-start` - fires before reflex processing starts
- `turbo-reflex:start` - fires before the reflex is sent to the server
- `turbo-reflex:finish` - fires after the server has processed the reflex and responded
- `turbo-reflex:missing-frame-id` - fires if the reflex cannot determine the target frame id
- `turbo-reflex:missing-frame` - fires if the the reflex cannot locate the frame element
- `turbo-reflex:missing-frame-src` - fires if the reflex cannot determine the frame's `src`
- `turbo-reflex:error` - fires if an unexpected error occurs

### Targeting Frames

By default TurboReflex targets the [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) `<turbo-frame>` element,
but you can also explicitly target other frames.

1. Look for `data-turbo-reflex-frame` on the reflex elemnt

    ```erb
    <input type="checkbox"
      data-turbo-reflex="ExampleReflex#work"
      data-turbo-reflex-frame="some-frame-id">
    ```

2. Look for `data-turbo-frame` on the reflex element

    ```erb
    <input type="checkbox"
      data-turbo-reflex="ExampleReflex#work"
      data-turbo-frame="some-frame-id">
    ```

3. Find the closest `<turbo-frame>` to the reflex element

    ```erb
    <turbo-frame id="example-frame">
      <input type="checkbox" data-turbo-reflex="ExampleReflex#work">
    </turbo-frame>
    ```

### Working with Forms

TurboReflex works great with Rails forms.
Just specify the `data-turbo-reflex` attribute on the form.

```erb
# app/views/posts/post.html.erb
<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_with model: @post, html: { turbo_reflex: "ExampleReflex#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_for @post, remote: true, html: { turbo_reflex: "ExampleReflex#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= form_with model: @post,
  html: { turbo_frame: dom_id(@post), turbo_reflex: "ExampleReflex#work" } do |form| %>
  ...
<% end %>
```

### Server Side Reflexes

The client side DOM attribute `data-turbo-reflex` is indicates what reflex *(Ruby class and method)* to invoke.
The attribute value is specified with RDoc notation. i.e. `ClassName#method_name`

Here's an example.

```erb
<a data-turbo-reflex="DemoReflex#example">
```

Server side reflexes can live anywhere in your app; however, we recommend you keep them in the `app` directory.

```diff
 |- app
 |  |...
 |  |- models
+|  |- reflexes
 |  |- views
```

Reflexes are simple Ruby classes that inherit from `TurboReflex::Base`.
They expose the following instance methods and properties.

- `element` - a struct that represents the DOM element that triggered the reflex
- `controller` - the Rails controller processing the HTTP request
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
Appended streams are added to the response body **after** the Rails controller action has completed and rendered the view template.

```ruby
# app/reflexes/demo_reflex.rb
class DemoReflex < TurboReflex::Base
  def example
    # logic...
    turbo_streams << turbo_stream.append("dom_id", "CONTENT")
    turbo_streams << turbo_stream.prepend("dom_id", "CONTENT")
    turbo_streams << turbo_stream.replace("dom_id", "CONTENT")
    turbo_streams << turbo_stream.update("dom_id", "CONTENT")
    turbo_streams << turbo_stream.remove("dom_id")
    turbo_streams << turbo_stream.before("dom_id", "CONTENT")
    turbo_streams << turbo_stream.after("dom_id", "CONTENT")
    turbo_streams << turbo_stream.invoke("console.log", args: ["Whoa! 🤯"])
  end
end
```

*This proves especially powerful when paired with [TurboReady](https://github.com/hopsoft/turbo_ready).*

> 📘 **NOTE:** `turbo_stream.invoke` is a [TurboReady](https://github.com/hopsoft/turbo_ready#usage) feature.

### Setting Instance Variables

It can be useful to set instance variables on the Rails controller from the reflex.

Here's an example that shows how to do this.

```erb
<!-- app/views/posts/index.html.erb -->
<%= turbo_frame_tag dom_id(@posts) do %>
  <%= check_box_tag :all, :all, @all, data: { turbo_reflex: "PostsReflex#toggle_all" } %>
  View All

  <% @posts.each do |post| %>
    ...
  <% end %>
<% end %>
```

```ruby
# app/reflexes/posts_reflex.rb
class PostsReflex < TurboReflex::Reflex
  def toggle_all
    posts = element.checked ? Post.all : Post.unread
    controller.instance_variable_set(:@all, element.checked)
    controller.instance_variable_set(:@posts, posts)
  end
end
```

```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    @posts ||= Post.unread
  end
end
```

### Hijacking the Response

Sometimes you may want to hijack the normal Rails response from within a reflex.

For example, consider the need for a related but separate form that updates a subset of user attributes.
We'd like to avoid creating a non RESTful route,
but aren't thrilled at the prospect of adding REST boilerplate for a new route, controller, action, etc...

In that scenario we can reuse an existing route and hijack the response handling with a reflex.

Here's how to do it.

```erb
<!-- app/views/users/show.html.erb -->
<%= turbo_frame_tag "user-alt" do %>
  <%= form_with model: @user, data: { turbo_reflex: "UserReflex#example" } do |form| %>
    ...
  <% end %>
<% end %>
```

The form above will send a `PATCH` request to `users#update`,
but we'll hijack the handling in the reflex so we never hit `users#update`.

```ruby
# app/reflexes/user_reflex.html.erb
class UserReflex < TurboReflex::Base
  def example
    # business logic, save record, etc...
    controller.render html: "<turbo-frame id='user-alt'>We Hijacked the response!</turbo-frame>".html_safe
  end
end
```

Remember that reflexes are invoked by a controller [before filter](https://guides.rubyonrails.org/action_controller_overview.html#filters).
That means rendering from inside a reflex halts the standard request cycle.

### Broadcasting Turbo Streams

You can also broadcast Turbo Streams to subscribed users from a reflex.

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

*Learn more about Turbo Stream broadcasting by reading through the
[hotwired/turbo-rails](https://github.com/hotwired/turbo-rails/blob/main/app/models/concerns/turbo/broadcastable.rb) source code.*

> 📘 **NOTE:** `broadcast_invoke_later_to` is a [TurboReady](https://github.com/hopsoft/turbo_ready#broadcasting) feature.

### Putting it All Together

The best way to learn this stuff is from working examples.
Be sure to clone the library and run the test application.
Then dig into the internals.

```sh
git clone https://github.com/hopsoft/turbo_reflex.git
cd turbo_reflex
bundle
cd test/dummy
bin/rails s
# View the app in a browser at http://localhost:3000
```

You can review the implementation in [`test/dummy/app`](https://github.com/hopsoft/turbo_reflex/tree/main/test/dummy).
*Feel free to add some demos and submit a pull request while you're in there.*

![TurboReflex Demos](https://ik.imagekit.io/hopsoft/turbo-reflex-demos_EP54JuWt5.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1663083040904)

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Todos

- [ ] Add tests for lifecycle events
- [ ] Add tests for select elements
- [ ] Add tests for checkbox elements
- [ ] Add controller tests
- [ ] Add tests for all variants of frame targeting

#### Helpful Context

- [Allow Turbo Streams with GET via data-turbo-stream](https://github.com/hotwired/turbo/pull/612)
- [Document data-turbo-stream](https://github.com/hotwired/turbo-site/pull/103)
