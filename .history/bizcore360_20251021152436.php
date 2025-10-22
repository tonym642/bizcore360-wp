<?php
/*
Plugin Name: BizCore360
Plugin URI: https://github.com/tonym642/bizcore360-wp
Description: AI-powered business management plugin for WordPress.
Version: 1.0.2
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
| Adds a simple dashboard menu inside WordPress Admin.
*/
add_action('admin_menu', function () {
    add_menu_page(
        'BizCore360',
        'BizCore360',
        'manage_options',
        'bizcore360',
        function () {
            echo '<div class="wrap"><h1>Welcome to BizCore360</h1>
            <p>Your AI-powered business management suite is now active in WordPress Admin.</p></div>';
        },
        'dashicons-admin-generic',
        3
    );
});

/*
|--------------------------------------------------------------------------
| FRONT-END SHORTCODE
|--------------------------------------------------------------------------
| Embeds the BizCore360 web app inside any page using:
| [bizcore360_app]
*/
function bizcore360_app_shortcode()
{
    ob_start();
    ?>
    <div id="bizcore360-app" style="padding:20px; text-align:center;">
        <h2 style="color:#00aaff; margin-bottom:10px;">Welcome to BizCore360</h2>
        <p style="margin-bottom:20px;">Your AI-powered business management suite is active on the front end.</p>

        <!-- Embed BizCore360 app directly from plugin folder -->
        <iframe 
            src="https://apps.bizmate360.com/wp-content/plugins/bizcore360/index.html"
            style="width:100%; height:90vh; border:none; border-radius:10px;"
            title="BizCore360 App"
            allowfullscreen
        ></iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('bizcore360_app', 'bizcore360_app_shortcode');

<!-- forced-sync: 2025-10-21 17:41:54 -->
