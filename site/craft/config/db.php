<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

 return array(
 		'*' => array(
 				'tablePrefix' => 'craft',
 		),
 		'live' => array(
 				'server' => 'localhost',
 				'user' => 'af675e1eb7f2',
 				'password' => '1dc30cd842d7ffac',
 				'database' => 'prod-ctdigital'
 		),
 		'dev' => array(
 				'server' => 'localhost',
 				'user' => 'df2f3dbd669d',
 				'password' => '7ecf3289fffb2bd3',
 				'database' => 'dev-ctdigital'
 		),
 		'local' => array(
 				'server' => 'localhost',
 				 'user' => 'root',
 				 'password' => 'access',
 				 'database' => 'local.ctdigital',
 		),

);
