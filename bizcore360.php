<?php
/*
Plugin Name: BizCore360
Plugin URI: https://bizcore360.ai
Description: AI-powered business management suite plugin for WordPress.
Version: 1.0.0
Author: Tony Medina
Author URI: https://bizcore360.ai
*/

if (!defined('ABSPATH')) exit;

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD PAGE
|--------------------------------------------------------------------------
*/
add_action('admin_menu', function () {
    add_menu_page(
        'BizCore360',
        'BizCore360',
        'manage_options',
        'bizcore360',
        function () {
            echo '<div class="wrap"><h1>Welcome to BizCore360</h1><p>Your AI-powered business management suite is active in WordPress Admin.</p></div>';
        },
        'dashicons-admin-generic',
        3
    );
});

/*
|--------------------------------------------------------------------------
| FRONT-END SHORTCODE
|--------------------------------------------------------------------------
| Usage: [bizcore360_app]
*/
add_shortcode('bizcore360_app', function () {
    ob_start(); ?>
    <div style="width:100%;min-height:100vh;margin:0;padding:0;background:#0a0a0a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;">
        <h2 style="margin:30px 0 10px;background:linear-gradient(90deg,#00d4ff,#0078ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
            Welcome to BizCore360
        </h2>
        <p style="color:#ccc;margin-bottom:20px;">Your AI-powered business management suite is active on the front end.</p>
        <iframe src="https://app.bizcore360.ai/index.html" title="BizCore360 Dashboard" style="width:100%;height:calc(100vh - 120px);border:none;"></iframe>
    </div>
    <?php
    return ob_get_clean();
});
