<?php
/*
Plugin Name: BizCore360
Plugin URI: https://github.com/tonym642/bizcore360-wp
Description: AI-powered business management plugin for WordPress.
Version: 1.0.3
Author: Tony Medina
Author URI: https://bizcore360.ai
*/

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

/*
|--------------------------------------------------------------------------
| ADMIN MENU (BACKEND)
|--------------------------------------------------------------------------
*/
add_action('admin_menu', function () {
    add_menu_page(
        'BizCore360',
        'BizCore360',
        'manage_options',
        'bizcore360',
        function () {
            echo '<div class="wrap"><h1>BizCore360 Dashboard</h1></div>';
        },
        'dashicons-admin-generic',
        3
    );
});

/*
|--------------------------------------------------------------------------
| FRONT-END SHORTCODE
|--------------------------------------------------------------------------
| Embed the BizCore360 web app inside any page using: [bizcore360_app]
*/
function bizcore360_app_shortcode()
{
    ob_start();
    ?>
    <!-- BizCore360 App Embed -->
    <iframe 
        src="https://apps.bizmate360.com/wp-content/plugins/bizcore360/index.html"
        style="width:100%; height:100vh; border:none;"
        title="BizCore360 App"
        allowfullscreen>
    </iframe>
    <?php
    return ob_get_clean();
}
add_shortcode('bizcore360_app', 'bizcore360_app_shortcode');
