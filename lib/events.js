
'use strict';

module.exports = function(kbox, app) {

    /*
     * Add behat specific CLI containers
     */
    app.events.on('post-app-load', function(app) {

        var path = require('path');

        // Move the static settings.php file to a common location, regardless of user or developer install location.
        // From this new location it will be mounted into the container.
        var fs = require('fs');

        if (!fs.existsSync('./config/behat')){
            fs.mkdirSync('./config/behat');
        }
        var behatSettingsPHP = path.resolve(__dirname, '..', 'settings.php');
        var newBehatSettingsPHP = path.resolve('', 'config/behat/settings.php');
        fs.createReadStream(behatSettingsPHP).pipe(fs.createWriteStream(newBehatSettingsPHP));

        // Add drupal cli containers
        var drupalComp = path.resolve(__dirname, '..', 'behat-compose.yml');
        app.composeCore.push(drupalComp);

        // Add drupal specific tasks
        var drupalCli = path.resolve(__dirname, '..', 'behat-cli.yml');
        app.taskFiles.push(drupalCli);

    });

};
