<?php
/*
Plugin Name: BizCore360
Plugin URI: https://github.com/tonym642/bizcore360
Description: AI-powered business management plugin for WordPress.
Version: 1.0.1
Author: Tony Medina
Author URI: https://bizcore360.ai
GitHub Plugin URI: tonym642/bizcore360
Primary Branch: main
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/*
|--------------------------------------------------------------------------
| LOAD CORE FILES
|--------------------------------------------------------------------------
| Ensures all core components (admin + shortcode) load correctly.
| Uses a safe path method to prevent folder or case sensitivity issues.
*/

$bizcore360_app_file = trailingslashit(plugin_dir_path(__FILE__)) . 'bizcore360-app.php';

if (file_exists($bizcore360_app_file)) {
    require_once $bizcore360_app_file;
} else {
    // Log the issue if the file can't be found
    error_log('BizCore360 Plugin Error: Could not locate bizcore360-app.php at ' . $bizcore360_app_file);
}

/*
|--------------------------------------------------------------------------
| CONFIRM PLUGIN LOADED
|--------------------------------------------------------------------------
| Adds a small check to make sure the plugin initialized properly.
*/

add_action('init', function() {
    if (!shortcode_exists('bizcore360_app')) {
        error_log('BizCore360 Warning: Shortcode not registered. Check bizcore360-app.php include path.');
    }
});
