<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

  return array(
    '*' => array(
      // Config overrides for all of our environments
      'omitScriptNameInUrls' => true,
    ),

    'live' => array(
    // Config overrides for our live environment
        'cooldownDuration' => 0,
        'allowAutoUpdates' => 'false',
        'environment' => 'live',
        'siteUrl' => 'http://ct.digital/',
        'environmentVariables' => array(
            'siteUrl' => 'http://ct.digital/',
            'fileSystemPath' => ''
        )
    ),

    'dev' => array(
    // Config overrides for our dev environment
        'devMode' => true,
        'environment' => 'dev',
        'siteUrl' => 'http://dev.ct.digital/',
        'cooldownDuration' => 0,
        'allowAutoUpdates' => false,
        'environmentVariables' => array(
            'siteUrl' => 'http://dev.ct.digital/',
            'fileSystemPath' => ''
        )
    ),

    'local' => array(
    // Config overrides for our local environment
        'devMode' => true,
        'environment' => 'local',
        'siteUrl' => 'http://ctdigital.craft.dev/',
        'environmentVariables' => array(
            'siteUrl' => 'http://ctdigital.craft.dev/',
            'fileSystemPath' => '../public/'
            )
    ),

  );
