'use strict';

module.exports = function(kbox, app) {

  /*
   * Add behat specific CLI containers
   */
  app.events.on('post-app-load', function(app) {

    var path = require('path');

    // Move the static settings.php file to a common location, regardless of user or developer install location.
    // From this new location it will be mounted into the container.
    var fs = require('fs-extra');

    // If new behat install and config/behat doesn't exist, create it and add settings.php and usermap.sh
    if (!fs.existsSync(path.resolve(__dirname, '../../..', './config/behat'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../..', 'config/behat'));

      // Copy over the temp settings file
      var settingsPath = path.resolve(__dirname, '../../..', 'config/behat/settings.php');
      fs.copySync(path.resolve(__dirname, '..', 'settings.php'), settingsPath, {});

      // Replace database settings if necessary (differen type of app)
      fs.readFile(settingsPath, 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/pantheon/g, app.env['state']['KALABOX_APP_PHP_CONFIG_FRAMEWORK']);

        fs.writeFile(settingsPath, result, 'utf8', function(err) {
          if (err) {return console.log(err);}
        });
      });

      // Copy over the usermap.sh file.  Need to do this because we need a consistent location to mount from.
      // Plugin can be installed in two different places.
      fs.copySync(path.resolve(__dirname, '..', 'usermap.sh'),
          path.resolve(__dirname, '../../..', 'config/behat/usermap.sh'), {});
    }

    // Use supplied behat features folder if doesn't exist.
    if (!fs.existsSync(path.resolve(__dirname, '../../..', 'code/features'))) {
      fs.copy(path.resolve(__dirname, '..', 'test/features'),
          path.resolve(__dirname, '../../..', 'code/features'), {});
    }
    // Use supplied behat.yml if doesn't exist.
    if (!fs.existsSync(path.resolve(__dirname, '../../..', 'code/behat.yml'))) {
      var behatPath = path.resolve(__dirname, '../../..', 'code/behat.yml');
      fs.copySync(path.resolve(__dirname, '..', 'test/behat.yml'),
          behatPath, {});

      // Substitute in the right kbox URL for this app.
      fs.readFile(behatPath, 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/http:\/\/viu-behat.kbox.host/g, app.url);

        fs.writeFile(behatPath, result, 'utf8', function(err) {
          if (err) {return console.log(err);}
        });
      });
    }

    // Add drupal cli containers
    var drupalComp = path.resolve(__dirname, '..', 'behat-compose.yml');
    app.composeCore.push(drupalComp);

    // Add drupal specific tasks
    var drupalCli = path.resolve(__dirname, '..', 'behat-cli.yml');
    app.taskFiles.push(drupalCli);

  });

};
