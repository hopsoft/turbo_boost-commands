<p align="center">
  <img height="200" src="https://ik.imagekit.io/hopsoft/turbo-reflex-logo_dgjKz2_SK.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1661529169962" />
  <h3 align="center">
    Turbo Frame's Reactive Toolkit
  </h3>
  <h1 align="center">
    Welcome to TurboReflex 👋
  </h1>
  <p align="center">
    <a href="http://blog.codinghorror.com/the-best-code-is-no-code-at-all/">
      <img alt="Lines of Code" src="https://img.shields.io/badge/loc-193-47d299.svg" />
    </a>
  </p>
</p>

**TurboReflex extends [Turbo Frames](https://turbo.hotwired.dev/reference/frames) with reflex behaviors to help you build reactive applications.**

## Why TurboReflex?

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

Be sure to install the same version for each libary.

```sh
bundle add "turbo_reflex --version VERSION"
yarn add "turbo_reflex@VERSION --exact"
```


## Setup

Import and intialize TurboReflex in your application.

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

```diff
# app/javascript/application.js
+import 'turbo_reflex'
```

## Usage

This example illustrates how to use TurboReflex for a simple voting mechanic.

```erb
<!-- app/views/posts/show.html.erb -->
<%= turbo_frame_tag dom_id(@post) do %>
  <a href="#" data-turbo-reflex="VotesReflex#upvote">Upvote</a>
<% end %>
```

When the user clicks the upvote link, the reflex will be invoked and the Turbo Frame will automatically rerender.
Any additional Turbo Streams created in the reflex are appended to the response and then executed on the client.

```ruby
# app/reflexes/votes_reflex.rb
class VotesReflex < TurboReflex::Base
  def upvote
    model = controller.controller_name.classify.constantize
    instance = model.find(controller.params[:id])
    instance.increment! :votes
    turbo_streams << turbo_stream.invoke("alert", args: ["Thanks for voting!"])
  end
end
```

> 📘 **NOTE:** This is a generic reflex that can be used on any controller/model with a `votes` column.

## Requirements

### Scope

Only support default behavior of frame (re)render with additional TurboStreams.

### Helpful Context

- [Allow Turbo Streams with GET via data-turbo-stream](https://github.com/hotwired/turbo/pull/612)
- [Document data-turbo-stream](https://github.com/hotwired/turbo-site/pull/103)

## Todos

- [ ] Add support for forms
- [ ] Look into adding a reflex frame to support things like morph or at least document how this can be done

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
