<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/hopsoft/turbo-boost-logo-dark-bg_o_f0bVskz.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004391">
    <img height="60" src="https://ik.imagekit.io/hopsoft/turbo-boost-logo_zHiiimlvT.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1671722004342" />
  </picture>
  <h1 align="center">
    Welcome to TurboBoost Commands 👋<br />
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-1268-47d299.svg" />
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
    <a href="https://github.com/sheerun/prettier-standard">
      <img alt="JavaScript Style" src="https://img.shields.io/badge/style-prettier--standard-168AFE?logo=javascript&logoColor=f4e137" />
    </a>
    <a href="https://github.com/hopsoft/turbo_boost-commands/actions/workflows/tests.yml">
      <img alt="Tests" src="https://github.com/hopsoft/turbo_boost-commands/actions/workflows/tests.yml/badge.svg" />
    </a>
    <a href="https://twitter.com/hopsoft">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/hopsoft?logo=twitter&style=social">
    </a>
  </p>
</p>

#### TurboBoost Commands enhance the [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) model for Rails/Hotwire applications.

<!-- Tocer[start]: Auto-generated, don't remove. -->

## Table of Contents

  - [Why TurboBoost Commands?](#why-turboboost-commands)
  - [Sponsors](#sponsors)
  - [Dependencies](#dependencies)
  - [Setup](#setup)
  - [Usage](#usage)
    - [Command Triggers](#command-triggers)
    - [Lifecycle Events](#lifecycle-events)
    - [Targeting Frames](#targeting-frames)
    - [Working with Forms](#working-with-forms)
    - [Server Side Commands](#server-side-commands)
    - [Appending Turbo Streams](#appending-turbo-streams)
    - [Setting Instance Variables](#setting-instance-variables)
    - [Prevent Controller Action](#prevent-controller-action)
    - [Broadcasting Turbo Streams](#broadcasting-turbo-streams)
    - [Putting it All Together](#putting-it-all-together)
      - [Running Locally](#running-locally)
      - [Running in Docker](#running-in-docker)
  - [License](#license)
  - [Todos](#todos)
  - [Releasing](#releasing)

<!-- Tocer[finish]: Auto-generated, don't remove. -->

## Why TurboBoost Commands?

Commands to help you build robust reactive applications with Rails & Hotwire.
They allow you to declaratively specify server methods that will execute when triggered by users *(think reactive applications)*.

TurboBoost Commands work with Hotwire's Turbo Frames.
They also work independent of frames.
You choose.

They let you *sprinkle* ✨ in reactive functionality and skip the ceremony of the typical
[REST semantics](https://en.wikipedia.org/wiki/Representational_state_transfer)
imposed by Rails conventions and Turbo Frames i.e. boilerplate *(routes, controllers, actions, etc...)*.

Commands are great for features adjacent to traditional RESTful resources.
Things like making selections, toggling switches, adding filters, etc...
**Basically for any feature where you've been tempted to create a non-RESTful action in a controller.**

Commands improve the developer experience (DX) of creating modern reactive applications.
They share the same mental model as React and other client side frameworks.
Namely,

1. **Trigger an event**
2. **Change state**
3. **(Re)render to reflect the new state**
4. *repeat...*

*The primary distinction being that __state is wholly managed by the server__.*

Commands are executed via Rails a `before_action` which means that reactivity runs over HTTP.
_**Web sockets are NOT used for the reactive critical path!** 🎉_
This also means that standard Rails mechanics drive their behavior.

Also, commands can be tested in isolation or via Rails controller, integration, and system tests.

## Sponsors

<p align="center">
  <em>Proudly sponsored by</em>
</p>
<p align="center">
  <a href="https://www.clickfunnels.com?utm_source=hopsoft&utm_medium=open-source&utm_campaign=turbo_boost-commands">
    <img src="https://images.clickfunnel.com/uploads/digital_asset/file/176632/clickfunnels-dark-logo.svg" width="575" />
  </a>
</p>

## Dependencies

- [rails](https://rubygems.org/gems/rails) `>=6.1`
- [turbo-rails](https://rubygems.org/gems/turbo-rails) `>=1.1`
- [@hotwired/turbo-rails](https://yarnpkg.com/package/@hotwired/turbo-rails) `>=7.1`
- [ruby](https://github.com/ruby/ruby) `>=2.7`

## Setup

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

   *Be sure to install the __same version__ of the Ruby and JavaScript libraries.*

2. Import TurboBoost Commands in your JavaScript app

    ```diff
    # app/javascript/application.js
    import '@hotwired/turbo-rails'
    +import '@turbo-boost/commands'
    ```

2. Add TurboBoost Commands behavior to the Rails app

    ```diff
    # app/views/layouts/application.html.erb
    <html>
      <head>
    +  <%= turbo_boost.meta_tag %>
      </head>
      <body>
      </body>
    </html>
    ```

## Usage

This example illustrates how to use TurboBoost Commands to manage upvotes on a Post.

1. **Trigger an event** - *register an element to listen for client side events that trigger server side commands*

    ```erb
    <!-- app/views/posts/show.html.erb -->
    <%= turbo_frame_tag dom_id(@post) do %>
      <a href="#" data-command="PostCommand#upvote">Upvote</a>
      Upvote Count: <%= @post.votes %>
    <% end %>
    ```

2. **Change state** - *create a server side command that modifies state*

    ```ruby
    # app/commands/post_command.rb
    class PostCommand < TurboBoost::Commands::Command
      def upvote
        Post.find(controller.params[:id]).increment! :votes
      end
    end
    ```

3. **(Re)render to reflect the new state** - *normal Rails / Turbo Frame behavior runs and (re)renders the frame*

### Command Triggers

TurboBoost Commands use [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation) to capture client side events that invoke server side commands.

Here is the list of default events and respective elements that TurboBoost Commands monitors.

- **`change`** - `<input>`, `<select>`, `<textarea>`
- **`submit`** - `<form>`
- **`click`** - `*` *all other elements*

It's possible to override these defaults like so.

```js
// restrict `click` monitoring to <a> and <button> elements
TurboBoost.Commands.registerEventDelegate('click', ['a[data-command]', 'button[data-command]'])
```

You can also register custom events and elements.
Here's an example that sets up monitoring for the `sl-change` event on the `sl-switch` element from the [Shoelace web component library](https://shoelace.style/).

```js
TurboBoost.Commands.registerEventDelegate('sl-change', ['sl-switch[data-command]'])
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
      data-command="ExampleCommand#work"
      data-turbo-frame="some-frame-id">
    ```

1. Find the closest `<turbo-frame>` to the command element

    ```erb
    <turbo-frame id="example-frame">
      <input type="checkbox" data-command="ExampleCommand#work">
    </turbo-frame>
    ```

### Working with Forms

TurboBoost Commands work great with Rails forms.
Just specify the `data-command` attribute on the form.

```erb
# app/views/posts/post.html.erb
<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_with model: @post, data: { command: "ExampleCommand#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= turbo_frame_tag dom_id(@post) do %>
  <%= form_for @post, remote: true, data: { command: "ExampleCommand#work" } do |form| %>
    ...
  <% end %>
<% end %>

<%= form_with model: @post,
  data: { turbo_frame: dom_id(@post), command: "ExampleCommand#work" } do |form| %>
  ...
<% end %>
```

### Server Side Commands

The client side DOM attribute `data-command` indicates what Ruby class and method to invoke.
*The attribute value is specified with RDoc notation. i.e. `ClassName#method_name`*

Here's an example.

```erb
<a data-command="DemoCommand#example">
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
# * dom_id ...................... The Rails dom_id helper
# * dom_id_selector ............. Returns a CSS selector for a dom_id
# * controller .................. The Rails controller processing the HTTP request
# * element ..................... A struct that represents the DOM element that triggered the command
# * morph ....................... Appends a Turbo Stream to morph a DOM element
# * params ...................... Commands specific params (frame_id, element, etc.)
# * render ...................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * render_response ............. Renders a full controller response
# * renderer .................... An ActionController::Renderer
# * turbo_stream ................ A Turbo Stream TagBuilder
# * turbo_streams ............... A list of Turbo Streams to append to the response (also aliased as streams)
# * state ....................... An object that stores ephemeral `state`
```

```ruby
# app/commands/demo_command.rb
class DemoCommand < TurboBoost::Commands::Command
  # The command method is invoked by an ActionController `before_action`.
  def example
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

*This proves especially powerful when paired with [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams).*

> 📘 **NOTE:** `turbo_stream.invoke` is a [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams#usage) feature.

### Setting Instance Variables

It can be useful to set instance variables on the Rails controller from within a command.

Here's an example that shows how to do this.

```erb
<!-- app/views/posts/index.html.erb -->
<%= turbo_frame_tag dom_id(@posts) do %>
  <%= check_box_tag :all, :all, @all, data: { command: "PostsCommand#toggle_all" } %>
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
  <%= form_with model: @user, data: { command: "UserCommand#example" } do |form| %>
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

*Learn more about Turbo Stream broadcasting by reading through the
[hotwired/turbo-rails](https://github.com/hotwired/turbo-rails/blob/main/app/models/concerns/turbo/broadcastable.rb) source code.*

> 📘 **NOTE:** `broadcast_invoke_later_to` is a [TurboBoost Streams](https://github.com/hopsoft/turbo_boost-streams#broadcasting) feature.

### Putting it All Together

The best way to learn this stuff is from working examples.
Be sure to clone the library and run the test application.
Then dig into the internals.

#### Running Locally

```sh
git clone https://github.com/hopsoft/turbo_boost-commands.git
cd turbo_boost-commands
bundle
cd test/dummy
bin/rails s
# View the app in a browser at http://localhost:3000
```

#### Running in Docker

Docker users can get up and running even faster.

```sh
git clone https://github.com/hopsoft/turbo_boost-commands.git
cd turbo_boost-commands
docker compose up -d
# View the app in a browser at http://localhost:3000
```

You can review the implementation in [`test/dummy/app`](https://github.com/hopsoft/turbo_boost-commands/tree/main/test/dummy).
*Feel free to add some demos and submit a pull request while you're in there.*

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Releasing

1. Run `yarn upgrade` and `bundle update` to pick up the latest
1. Bump version number at `lib/turbo_boost-commands/version.rb`. Pre-release versions use `.preN`
1. Run `bin/standardize`
1. Run `rake build` and `yarn build`
1. Commit and push changes to GitHub
1. Run `rake release`
1. Run `yarn publish --no-git-tag-version`
1. Yarn will prompt you for the new version. Pre-release versions use `-preN`
1. Commit and push any changes to GitHub
1. Create a new release on GitHub ([here](https://github.com/hopsoft/turbo_boost-commands/releases)) and generate the changelog for the stable release for it
