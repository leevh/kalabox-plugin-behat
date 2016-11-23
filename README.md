BEHAT on Kalabox
=================

**"Behat on Kalabox"** is a [Kalabox](http://kalabox.io) plugin that allows users to add [Behat](http://behat.org/en/latest/) to their Kalabox app so they can perform behaviour driven testing.

**If you are unfamiliar with Kalabox we highly recommend you read the main [Kalabox docs](http://docs.kalabox.io) before continuing.**

Installation
------------

Before you install **"Behat on Kalabox"**  we assume you have [installed Kalabox](http://docs.kalabox.io/en/stable/users/install/) and have a running Kalabox app. You will also need to have [node and npm](http://nodejs.org) installed.

**Download the plugin**

```bash
# Go into an app you are running
cd /path/to/my/app

# Install plugin with npm
npm install https://github.com/leevh/kalabox-plugin-behat.git --save
```

**Activate the plugin**

Find the `kalabox.yml` for your app and ensure `kalabox-plugin-behat` is included in your list of plugins. NOTE: You may need to add `plugins` if it does not already appear in your `kalabox.yml` file.

```yaml
plugins:
  - kalabox-plugin-behat
```

**Restart the app**

Restart your app. This will download and build any needed Docker images provided by the plugin.

```bash
# Restart the app with debug more on so we can get some extra info
kbox restart -- -d
```
**Test the plugin**

Simply run `kbox behat` to run the sample tests that are now located in `code/features` folder.

Configuring Behat
------------------

Kalabox Behat is configured to use the default file locations of the `features` (tests) folder and the `behat.yml` file.  If you don't already have these in your root `code` folder, they will be created for you on `kbox restart`.  You can immediately run the included sample tests by simply using `kbox behat`. Some may fail depending on your site, but should pass with default d7/d8.  Tests can be added in the `features` folder and committed with your project. Details on tests can be found on [Drupal Behat Extension](https://behat-drupal-extension.readthedocs.io) docs.

For Developers
--------------

Developers can install the plugin with git.

```bash
cd /path/to/app
mkdir -p plugins
cd plugins
git clone https://github.com/leevh/kalabox-plugin-behat.git
cd kalabox-plugin-behat
npm install
```

Then follow the steps to activate the plugin and restart the app from the main installation steps above.

Other Resources
---------------

* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)