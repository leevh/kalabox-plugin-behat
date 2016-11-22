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

    if (!fs.existsSync(path.resolve(__dirname, '../../..', './config/behat'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../..', 'config/behat'));
      fs.copy(path.resolve(__dirname, '..', 'settings.php'),
          path.resolve(__dirname, '../../..', 'config/behat/settings.php'), {});
      fs.copy(path.resolve(__dirname, '..', 'usermap.sh'),
          path.resolve(__dirname, '../../..', 'config/behat/usermap.sh'), {});
    }

    // Use supplied behat files if none exist
    if (!fs.existsSync(path.resolve(__dirname, '../../..', 'code/features'))) {
      fs.copy(path.resolve(__dirname, '..', 'test/features'),
          path.resolve(__dirname, '../../..', 'code/features'), {});
    }
    if (!fs.existsSync(path.resolve(__dirname, '../../..', 'code/behat.yml'))) {

      // Replace domain in behat file with current site
      var kboxURL = process.env.HTTP_HOST;

      var behatPath = path.resolve(__dirname, '../../..', 'code/behat.yml');
      fs.copy(path.resolve(__dirname, '..', 'test/behat.yml'),
          behatPath, function(err) {
            console.log(kboxURL);
            fs.readFile(behatPath, 'utf8', function(err, data) {
              if (err) {
                return console.log(err);
              }
              // todo - replace with actual running kbox site URL
              var result = data.replace(/http:\/\/viu-behat.kbox.host/g, 'http://yoursite.kbox.host');

              fs.writeFile(behatPath, result, 'utf8', function(err) {
                if (err) {return console.log(err);}
              });
            });
            if (err) {return console.log(err);}
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
