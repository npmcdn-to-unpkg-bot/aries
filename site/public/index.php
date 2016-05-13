<?php ## public/index.php


// Path to your craft/ folder
$craftPath = '../craft';

// Check the SERVER_NAME variable ourselves
switch ($_SERVER['SERVER_NAME'])
{
		// If the SERVER_NAME variable matches our case,
		// assign the CRAFT_ENVIRONMENT variable a keyword
		// that identifies this environment that we can
		// use in our multi-environment config

		case 'ct.digital' :
				define('CRAFT_ENVIRONMENT', 'live');
				break;

		case 'dev.ct.digital' :
				define('CRAFT_ENVIRONMENT', 'dev');
				break;

		default :
				define('CRAFT_ENVIRONMENT', 'local');
				break;
}

// Try to set the Craft Locale automatically
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
switch ($lang)
{
    case "en":
    	define('CRAFT_LOCALE', 'en_us');
        break;
    case "es":
    	define('CRAFT_LOCALE', 'es_mx');
        break;
    default:
//Let Craft figure it out
        break;
}

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
