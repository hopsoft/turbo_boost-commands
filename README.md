<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/hopsoft/turbo-boost-logo-dark-bg_o_f0bVskz.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004391">
    <img height="60" src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342" />
  </picture>
  <br />
  <h1 align="center">
    Welcome to TurboBoost Commands 👋
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-1783-47d299.svg" />
    </a>
    <a href="https://codeclimate.com/github/hopsoft/turbo_boost-commands/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/fe1162a742fe83a4fdfd/maintainability" />
    </a>
    <a href="https://rubygems.org/gems/turbo_boost-commands">
      <img alt="GEM Version" src="https://img.shields.io/gem/v/turbo_boost-commands?color=168AFE&include_prereleases&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://rubygems.org/gems/turbo_boost-commands">
      <img alt="GEM Downloads" src="https://img.shields.io/gem/dt/turbo_boost-commands?color=168AFE&logo=ruby&logoColor=FE1616">
    </a>
    <a href="https://github.com/testdouble/standard">
      <img alt="Ruby Style" src="https://img.shields.io/badge/style-standard-168AFE?logo=ruby&logoColor=FE1616" />
    </a>
    <a href="https://www.npmjs.com/package/@turbo-boost/commands">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/@turbo-boost/commands?color=168AFE&logo=npm">
    </a>
    <a href="https://www.npmjs.com/package/@turbo-boost/commands">
      <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@turbo-boost/commands?color=168AFE&logo=npm">
    </a>
    <a href="https://bundlephobia.com/package/@turbo-boost/commands@">
      <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/@turbo-boost/commands?label=bundle%20size&logo=npm&color=47d299">
    </a>
    <a href="https://github.com/prettier/prettier">
      <img alt="JavaScript Style" src="https://img.shields.io/badge/style-prettier-ff69b4?logo=javascript&logoColor=f4e137" />
    </a>
    <a href="https://github.com/hopsoft/turbo_boost-commands/actions/workflows/tests.yml">
      <img alt="Tests" src="https://github.com/hopsoft/turbo_boost-commands/actions/workflows/tests.yml/badge.svg" />
    </a>
    <a href="https://discord.gg/stimulus-reflex">
      <img alt="Discord Community" src="https://img.shields.io/discord/629472241427415060?color=8892F6&label=discord&logo=discord&logoColor=8892F6">
    </a>
    <a href="https://github.com/sponsors/hopsoft">
      <img alt="Sponsors" src="https://img.shields.io/github/sponsors/hopsoft?color=eb4aaa&logo=GitHub%20Sponsors" />
    </a>
    <br />
    <a href="https://ruby.social/@hopsoft">
      <img alt="Ruby.Social Follow" src="https://img.shields.io/mastodon/follow/000008274?domain=https%3A%2F%2Fruby.social&label=%40hopsoft&style=social">
    </a>
    <a href="https://twitter.com/hopsoft">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/url?label=%40hopsoft&style=social&url=https%3A%2F%2Ftwitter.com%2Fhopsoft">
    </a>
  </p>
</p>

#### TurboBoost Commands enhance the [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) model for Rails/Hotwire applications.

<!-- Tocer[start]: Auto-generated, don't remove. -->

## Table of Contents

  - [Why TurboBoost Commands?](#why-turboboost-commands)
  - [Sponsors](#sponsors)
    - [Open Source projects like TurboBoost rely on your support](#open-source-projects-like-turboboost-rely-on-your-support)
  - [Dependencies](#dependencies)
  - [Setup](#setup)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Event Delegates](#event-delegates)
    - [Lifecycle Events](#lifecycle-events)
    - [Targeting Frames](#targeting-frames)
    - [Working with Forms](#working-with-forms)
    - [Server Side Commands](#server-side-commands)
    - [Appending Turbo Streams](#appending-turbo-streams)
    - [Setting Instance Variables](#setting-instance-variables)
    - [Prevent Controller Action](#prevent-controller-action)
    - [Broadcasting Turbo Streams](#broadcasting-turbo-streams)
  - [State](#state)
    - [Server-State](#server-state)
    - [Now-State](#now-state)
    - [Client-State](#client-state)
    - [Page-State](#page-state)
    - [State Resolution](#state-resolution)
  - [Community](#community)
  - [Developing](#developing)
      - [Notable Files](#notable-files)
  - [Deploying](#deploying)
      - [Notable Files](#notable-files-1)
      - [How to Deploy](#how-to-deploy)
  - [Releasing](#releasing)
  - [About TurboBoost](#about-turboboost)
  - [License](#license)

<!-- Tocer[finish]: Auto-generated, don't remove. -->

## Why TurboBoost Commands?

Commands help you build robust reactive applications with Rails & Hotwire.
They allow you to declaratively specify server methods that will execute whenever client side events are triggered by users.

TurboBoost Commands work with Hotwire's Turbo Frames.
**They also work independent of frames.**

Commands let you _sprinkle_ ✨ in reactive functionality and skip the ceremony of the typical
[REST semantics](https://en.wikipedia.org/wiki/Representational_state_transfer)
imposed by Rails conventions and Turbo Frames i.e. boilerplate _(routes, controllers, actions, etc...)_.

Commands are great for features adjacent to traditional RESTful resources.
Things like making selections, toggling switches, adding filters, etc...
**Basically for any feature where you've been tempted to create a non-RESTful action in a controller.**

Commands improve the developer experience (DX) of creating modern reactive applications.
They share the same mental model as React and other client side frameworks.
Namely,

1. **Trigger an event**
2. **Change state**
3. **(Re)render to reflect the new state**
4. _repeat..._

Commands are executed via a Rails `before_action` which means that reactivity runs over HTTP.
_**Web sockets are NOT used for the reactive critical path!** 🎉_
This also means that standard Rails mechanics drive their behavior.

Commands can be tested in isolation as well as with standard Rails controller, integration, and system tests.

## Sponsors

### Open Source projects like TurboBoost rely on your support

Please consider a **one-time donation** to ensure the continued growth and maintenance of this project.
Your contribution will help drive the evolution of **TurboBoost**, enabling new features, enhancements, and bug fixes that benefit the entire community.

> [!TIP]
> Every contribution makes a difference, _no matter the amount._<br />
> <sub>You will receive a receipt for your financial records and accounting purposes.</sub>

<p>
  <a href="https://donate.stripe.com/fZe9EjfhZbZRdeE9AA?utm_source=github&utm_medium=readme&utm_campaign=hopsoft&utm_content=turbo_boost-commands">
    <img src="https://img.shields.io/badge/Donate_with_Stripe-635bff?style=flat&labelColor=c4b8ff&logo=Stripe&logoColor=635bff&logoSize=auto" alt="Make a one-time Stripe donation" height="24" />
  </a>
  <a href="https://commerce.coinbase.com/checkout/0a6079bf-5c7a-4a93-a943-401bba8981a0?utm_source=github&utm_medium=readme&utm_campaign=hopsoft&utm_content=turbo_boost-commands">
    <img src="https://img.shields.io/badge/Donate_with_Coinbase-0052ff.svg?style=flat&logoSize=30&labelColor=a3c4ff&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3Qgd2lkdGg9IjEwMjQiIGhlaWdodD0iMTAyNCIgZmlsbD0iIzAwNTJmZiIgcng9IjUxMiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01MTIuMTQ3IDY5MmMtOTkuNDUgMC0xODAtODAuNTUtMTgwLTE4MHM4MC41NS0xODAgMTgwLTE4MGM4OS4xIDAgMTYzLjA1IDY0Ljk1IDE3Ny4zIDE1MGgxODEuMzVjLTE1LjMtMTg0LjgtMTcwLTMzMC0zNTguNjUtMzMwLTE5OC43NSAwLTM2MCAxNjEuMjUtMzYwIDM2MHMxNjEuMjUgMzYwIDM2MCAzNjBjMTg4LjY1IDAgMzQzLjM1LTE0NS4yIDM1OC42NS0zMzBoLTE4MS41Yy0xNC4yNSA4NS4wNS04OC4yNSAxNTAtMTc3LjE1IDE1MHoiLz48L3N2Zz4=" alt="Make a one-time Coinbase donation" height="24" />
  </a>
</p>

---

<sub>Proudly sponsored by</sub>

<a href="https://www.clickfunnels.com?utm_source=hopsoft&utm_medium=open-source&utm_campaign=turbo_boost-commands">
  <img src="https://images.clickfunnel.com/uploads/digital_asset/file/176632/clickfunnels-dark-logo.svg" width="575" />
</a>

## Dependencies

- [rails](https://rubygems.org/gems/rails) `>= 6.1`
- [turbo-rails](https://rubygems.org/gems/turbo-rails) `>= 1.1`
- [@hotwired/turbo-rails](https://www.npmjs.com/package/@hotwired/turbo-rails) `>= 7.2`
- [turbo_boost-streams](https://rubygems.org/gems/turbo_boost-streams) `>= 0.1.10`
- [@turbo-boost/streams](https://www.npmjs.com/package/@turbo-boost/streams) `>= 0.1.10`

## Setup

Complete the steps below, or use [this RailsByte](https://railsbytes.com/templates/xkjsbB):

```sh
rails app:template LOCATION='https://railsbytes.com/script/xkjsbB'
```

1. Add TurboBoost Commands dependencies

   ```diff
   # Gemfile
   gem "turbo-rails", ">= 1.1", "< 2"
   +gem "turbo_boost-commands", "~> VERSION"
   ```

   ```diff
   # package.json
   "dependencies": {
     "@hotwired/turbo-rails": ">=7.2",
   +  "@turbo-boost/commands": "^VERSION"
   ```

   _Be sure to install the **same version** of the Ruby and JavaScript libraries._

2. Import TurboBoost Commands in your JavaScript app

   ```diff
   # app/javascript/application.js
   import '@hotwired/turbo-rails'
   +import '@turbo-boost/commands'
   ```

## Configuration

TurboBoost Commands can be configured via Rails initializer.

```ruby
# config/initializers/turbo_boost_commands.rb
TurboBoost::Commands.config.tap do |config|
  # opt-[in/out] of alerting on abort (true, *false, "development", "test", "production")
  config.alert_on_abort = "development"

  # opt-[in/out] of alerting on error (true, *false, "development", "test", "production")
  config.alert_on_error = "development"

  # opt-[in/out] of precompiling TurboBoost assets (*true, false)
  config.precompile_assets = true

  # opt-[in/out] of forgery protection (*true, false)
  config.protect_from_forgery = true

  # opt-[in/out] of raising an error when an invalid command is invoked (true, false, *"development", "test", "production")
  config.raise_on_invalid_command = "development"

  # opt-[in/out] of state resolution (true, *false)
  config.resolve_state = true

  # opt-[in/out] of verifying the client browser (*true, false)
  config.verify_client = true
end
```

## Usage

This example illustrates how to use TurboBoost Commands to manage upvotes on a Post.

1. **Trigger an event** - _register an element to listen for client side events that trigger server side commands_

   ```erb
   <!-- app/views/posts/show.html.erb -->
   <%= turbo_frame_tag dom_id(@post) do %>
     <a href="#" data-turbo-command="PostCommand#upvote">Upvote</a>
     Upvote Count: <%= @post.votes %>
   <% end %>
   ```

2. **Change state** - _create a server side command that modifies state_

   ```ruby
   # app/commands/post_command.rb
   class PostCommand < TurboBoost::Commands::Command
     def upvote
       Post.find(controller.params[:id]).increment! :votes
     end
   end
   ```

3. **(Re)render to reflect the new state** - _normal Rails / Turbo Frame behavior runs and (re)renders the frame_

### Event Delegates

TurboBoost Commands use [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation) to capture client side events that invoke server side commands.

Here is the list of default **event delegates** _(DOM event name + CSS selectors)_ that TurboBoost Commands monitors.

- **`change`** - `input[data-turbo-command],select[data-turbo-command],textarea[data-turbo-command]`
- **`submit`** - `form[data-turbo-command]`
- **`click`** - `[data-turbo-command]`

Note that the list of event delegates is ordinal.
Matches are identified by scanning the list of delegates top to bottom _(first match wins)_.

It's possible to override the default event delegates.
Just note that registered events are required to [bubble up through the DOM tree](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles).

**IMPORTANT:** _New entries and overrides are prepended to the list of delegates and will match before defaults._

```js
// restrict `click` monitoring to <a> and <button> elements
TurboBoost.Commands.registerEventDelegate('click', [
  'a[data-turbo-command]',
  'button[data-turbo-command]'
])
```

```js
// append selectors to the `change` event
const delegate = TurboBoost.Commands.eventDelegates.find(
  e => e.name === 'change'
)
const selectors = [...delegate.selectors, '.example[data-turbo-command]']
TurboBoost.Commands.registerEventDelegate('change', selectors)
```

You can also register custom events and elements.
Here's an example that sets up monitoring for the `sl-change` event on the `sl-switch` element from the [Shoelace web component library](https://shoelace.style/).

```js
TurboBoost.Commands.registerEventDelegate('sl-change', [
  'sl-switch[data-turbo-command]'
])
```

### Lifecycle Events

TurboBoost Commands support the following lifecycle events.

- `turbo-boost:command:start` - fires before the command is sent to the server
- `turbo-boost:command:finish` - fires after the server has executed the command and responded
- `turbo-boost:command:error` - fires if an unexpected error occurs

### Targeting Frames

TurboBoost Commands target the [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) `<turbo-frame>` element by default,
but you can also explicitly target other frames just like you normally would with Turbo Frames.

1. Look for `data-turbo-frame` on the command element

   ```erb
   <input type="checkbox"
     data-turbo-command="ExampleCommand#work"
     data-turbo-frame="some-frame-id">
   ```

1. Find the closest `<turbo-frame>` to the command element

   ```erb
   <turbo-frame id="example-frame">
     <input type="checkbox" data-turbo-command="ExampleCommand#work">
   </turbo-frame>
   ```

### Working with Forms

TurboBoost Commands work great with Rails forms.
Just specify the `data-turbo-command` attribute on the form.

```erb
# app/views/posts/post.html.erb
<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_with model: @post, data: { turbo_command: "ExampleCommand#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_for @post, remote: true, data: { turbo_command: "ExampleCommand#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= form_with model: @post,
  data: { turbo_frame: dom_id(@post), turbo_command: "ExampleCommand#work" } do |form| %>
  ...
<% end %>
```

### Server Side Commands

The client side DOM attribute `data-turbo-command` indicates what Ruby class and method to invoke.
_The attribute value is specified with RDoc notation. i.e. `ClassName#method_name`_

Here's an example.

```erb
<a data-turbo-command="DemoCommand#example">
```

Server side commands can live anywhere in your app; however, we recommend you keep them in the `app/commands` directory.

```diff
 |- app
 |  |- ...
+|  |- commands
 |  |- controllers
 |  |- helpers
 |  |- ...
```

Commands are simple Ruby classes that inherit from `TurboBoost::Commands::Command`.
They expose the following instance methods and properties.

```ruby
# * controller ...................... The Rails controller processing the HTTP request
# * convert_to_instance_variables ... Converts a Hash to instance variables
# * css_id_selector ................. Returns a CSS selector for an element `id` i.e. prefixes with `#`
# * dom_id .......................... The Rails dom_id helper
# * dom_id_selector ................. Returns a CSS selector for a dom_id
# * element ......................... A struct that represents the DOM element that triggered the command
# * morph ........................... Appends a Turbo Stream to morph a DOM element
# * params .......................... Commands specific params (frame_id, element, etc.)
# * render .......................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer ........................ An ActionController::Renderer
# * state ........................... An object that stores ephemeral `state`
# * transfer_instance_variables ..... Transfers all instance variables to another object
# * turbo_stream .................... A Turbo Stream TagBuilder
# * turbo_streams ................... A list of Turbo Streams to append to the response (also aliased as streams)
```

They also have access to the following class methods:

```ruby
# * prevent_controller_action ... Prevents the rails controller/action from running (i.e. the command handles the response entirely)
```

Here's an example command.

```ruby
# app/commands/demo_command.rb
class DemoCommand < TurboBoost::Commands::Command
  # The command method `perform` is invoked by an ActionController `before_action`.
  def perform
    # - execute business logic
    # - update state
    # - append additional Turbo Streams
  end
end
```

### Appending Turbo Streams

It's possible to append additional Turbo Streams to the response from within a command.
Appended streams are added to the response body **after** the Rails controller action has completed and rendered the view template.

```ruby
# app/commands/demo_command.rb
class DemoCommand < TurboBoost::Commands::Command
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

_This proves especially powerful when paired with [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams)._

> [!NOTE]
> `turbo_stream.invoke` is a [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams#usage) feature.

### Setting Instance Variables

It can be useful to set instance variables on the Rails controller from within a command.

Here's an example that shows how to do this.

```erb
<!-- app/views/posts/index.html.erb -->
<%= turbo_frame_tag dom_id(@posts) do %>
  <%= check_box_tag :all, :all, @all, data: { turbo_command: "PostsCommand#toggle_all" } %>
  View All

  <% @posts.each do |post| %>
    ...
  <% end %>
<% end %>
```

```ruby
# app/commands/posts_command.rb
class PostsCommand < TurboBoost::Commands::Command
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

### Prevent Controller Action

Sometimes you may want to prevent normal response handling.

For example, consider the need for a related but separate form that updates a subset of user attributes.
We'd like to avoid creating a non RESTful route
but aren't thrilled at the prospect of adding REST boilerplate for a new route, controller, action, etc...

In that scenario we can reuse an existing route and prevent normal response handling with a command.

Here's how to do it.

```erb
<!-- app/views/users/show.html.erb -->
<%= turbo_frame_tag "user-alt" do %>
  <%= form_with model: @user, data: { turbo_command: "UserCommand#example" } do |form| %>
    ...
  <% end %>
<% end %>
```

The form above will send a `PATCH` request to `users#update`,
but we'll prevent normal request handling in the command to prevent running `users#update` in the controller.

```ruby
# app/commands/user_command.html.erb
class UserCommand < TurboBoost::Commands::Command
  def example
    # business logic, save record, etc...
    controller.render html: "<turbo-frame id='user-alt'>We prevented the normal response!</turbo-frame>".html_safe
  end
end
```

Remember that commands are invoked by a controller [before action filter](https://guides.rubyonrails.org/action_controller_overview.html#filters).
That means controller rendering from inside a command halts the standard request cycle.

### Broadcasting Turbo Streams

You can also broadcast Turbo Streams to subscribed users from a command.

```ruby
# app/commands/demo_command.rb
class DemoCommand < TurboBoost::Commands::Command
  def example
    # logic...
    Turbo::StreamsChannel
      .broadcast_invoke_later_to "some-subscription", "console.log", args: ["Whoa! 🤯"]
  end
end
```

_Learn more about Turbo Stream broadcasting by reading through the
[hotwired/turbo-rails](https://github.com/hotwired/turbo-rails/blob/main/app/models/concerns/turbo/broadcastable.rb) source code._

> [!NOTE]
> `broadcast_invoke_later_to` is a [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams#broadcasting) feature.

## State

TurboBoost manages various forms of state to provide a terrific reactive user experience.

Here’s a breakdown of each type:

### Server-State

Server-State is the persistent state that the server used for the most recent render.
This state is signed, ensuring data integrity and security.

The client includes this signed state along with its own optimistic changes whenever a Command is invoked.
The server can then compute the difference between the Client-State and the Server-State,
allowing you to accept or reject the client's optimistic changes.

This ensures the server remains the single source of truth.

Server-State can be accessed within Commands like so.

```ruby
state[:key] = "value"
state[:key]
#=> "value"
```

Server-State is also accessible in controllers and views.

```ruby
# controller
turbo_boost.state[:key] = "value"
turbo_boost.state[:key]
#=> "value"
```

```erb
<%
  # view
  turbo_boost.state[:key] = "value"
  turbo_boost.state[:key]
  #=> "value"
%>
```

### Now-State

Now-State is ephemeral server side state that only exists for the current render cycle.
Similar to `flash.now` in Rails, this state is discarded after rendering.

It’s useful for managing temporary data that doesn’t need to persist beyond the current request.

Now-State can be accessed within Commands like so.

```ruby
state.now[:key] = "value"
state.now[:key]
#=> "value"
```

Now-State is also accessible in controllers and views.

```ruby
# controller
turbo_boost.state.now[:key] = "value"
turbo_boost.state.now[:key]
#=> "value"
```

```erb
<%
  # view
  turbo_boost.state.now[:key] = "value"
  turbo_boost.state.now[:key]
  #=> "value"
%>
```

### Client-State

Client-State is a mutable version of the signed Server-State, wrapped in an observable JavaScript proxy.
This allows for sophisticated techniques like data binding via custom JavaScript, Stimulus controllers, or web components.

Client-State enables immediate UI updates, providing a fast and smooth user experience while the server
[resolves state](#state-resolution) differences whenever Commands are invoked.

Client-State can be accessed on the client like so.

```js
TurboBoost.State.current['key'] = 'value'
TurboBoost.State.current['key']
//=> 'value'
```

### Page-State

Page-State is managed by the client and used to remember element attribute values between server renders.
It’s best for tracking transient user interactions, such as - which elements are visible, open/closed, their position, etc.

This enhances the user experience by maintaining the state of UI elements between renders.
When invoking commands, the client sends the Page-State to the server, allowing it to preserve element attributes when rendering.
_The client also checks and restores Page-State whenever the DOM changes if needed._

You can opt-in to remember Page-State with Rails tag helpers via the `turbo_boost[:remember]` option.

```erb
<%= tag.details id: "page-state-example", open: "open", turbo_boost: { remember: [:open] } do %>
  <summary>Page-State Example</summary>
  Content...
<% end %>
```

This will remember whether the `details` element is open or closed.

__That's it!__ You're done.

> [!NOTE]
> Page-State tracking works with all element attributes, including `aria`, `data`, and even custom attributes.
> Elements must have a unique `id` to participate in Page-State tracking.

### State Resolution

Commands can perform state resolution by implementing the `resolve_state` method.

The Command has access to all forms of state, so you should use explicit access during resolution.

You can access both the signed Server-State and the optimistc Client-State from within the Command like so.

```ruby
class ExampleCommand < TurboBoost::Commands::Command

  def resolve_state
    state.signed #=> the Server-State (from the last render)
    state.unsigned #=> the optimistic Client-State
    # compare and resolve the delta
  end
end
```

> [!TIP]
> State resolution can involve data lookups, updates to persistent data stores, calls to 3rd party APIs, etc.

You can opt-in to state resolution with the following config option.

```ruby
# config/initializers/turbo_boost.rb
TurboBoost::Commands.config.tap do |config|
  config.resolve_state = true
end
```

> [!TIP]
> TurboBoost State mechanics can also be used independent of Commands with standard Hotwire techniques.

## Community

Come join the party with over 2200+ like-minded friendly Rails/Hotwire enthusiasts on our [Discord server](https://discord.gg/stimulus-reflex).

## Developing

This project supports a fully Dockerized development experience.

1. Simply run the following commands to get started.

   ```sh
   git clone -o github https://github.com/hopsoft/turbo_boost-streams.git
   cd turbo_boost-streams
   ```

   ```sh
   docker compose up -d # start the envionment (will take a few minutes on 1st run)
   docker exec -it turbo_boost-streams-web rake # run the test suite
   open http://localhost:3000 # open the `test/dummy` app in a browser
   ```

   And, if you're using the [containers gem (WIP)](https://github.com/hopsoft/containers).

   ```sh
   containers up # start the envionment (will take a few minutes on 1st run)
   containers rake # run the test suite
   open http://localhost:3000 # open the `test/dummy` app in a browser
   ```

1. Edit files using your preferred tools on the host machine.

1. That's it!

#### Notable Files

- [Dockerfile](https://github.com/hopsoft/turbo_boost-streams/blob/main/Dockerfile)
- [docker-compose.yml](https://github.com/hopsoft/turbo_boost-streams/blob/main/docker-compose.yml)
- [bin/docker/run/local](https://github.com/hopsoft/turbo_boost-streams/blob/main/bin/docker/run/local)

## Deploying

This project supports Dockerized deployment via the same configurtation used for development,
and... it actually runs the [`test/dummy`](https://github.com/hopsoft/turbo_boost-streams/tree/main/test/dummy) application in "production". 🤯

The `test/dummy` app serves the following purposes.

- Test app for the Rails engine
- Documentation and marketing site with interactive demos

You can [**see it in action** here.](https://hopsoft.io/@turbo-boost/streams)
_How's that for innovative simplicity?_

#### Notable Files

- [Dockerfile](https://github.com/hopsoft/turbo_boost-streams/blob/main/Dockerfile)
- [fly.toml](https://github.com/hopsoft/turbo_boost-streams/blob/main/fly.toml)
- [bin/docker/run/remote](https://github.com/hopsoft/turbo_boost-streams/blob/main/bin/docker/run/remote)

#### How to Deploy

```sh
fly deploy
```

## Releasing

> [!TIP]
> Run these commands on the host machine _(i.e. not inside the dev container)_

1. Run `npm update` and `bundle update` to pick up the latest dependencies
1. Update the version number consistently in the following files:
   * `lib/turbo_boost/commands/version.rb` - pre-release versions should use `.preN`
   * `app/javascript/version.js` - pre-release versions use `-preN`
   * `package.json` - pre-release versions use `-preN`
1. Run `bin/standardize`
1. Run `rake build`
1. Run `npm run build`
1. Commit and push any changes to GitHub
1. Run `rake release`
1. Run `npm publish --access public`
1. Create a new release on GitHub ([here](https://github.com/hopsoft/turbo_boost-commands/releases))

## About TurboBoost

TurboBoost is a suite of libraries that enhance Rails, Hotwire, and Turbo... making them even more powerful and boosing your productivity.
Be sure to check out all of the various the libraries.

- [Streams](https://github.com/hopsoft/turbo_boost-streams)
- [Commands](https://github.com/hopsoft/turbo_boost-commands)
- [Elements](https://github.com/hopsoft/turbo_boost-elements)
- [Devtools](https://github.com/hopsoft/turbo_boost-devtools)
- Coming soon...

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
