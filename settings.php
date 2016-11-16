<?php

/**
 * Default settings.php with database connection for Behat Drupal API driver.
 */

$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => 'pantheon',
  'username' => 'pantheon',
  'password' => 'pantheon',
  'host' => 'database',
  'port' => 3306,
  'preFix' => '',
);
