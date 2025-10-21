<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD PAGE
|--------------------------------------------------------------------------
| This creates a BizCore360 menu item inside the WordPress admin sidebar
| and loads a simple dashboard page when clicked.
*/
function bizcore360_admin_menu() {
    add_menu_page(
        'BizCore360',                          // Page title
        'BizCore360',                          // Menu title
        'manage_options',                      // Capability
        'bizcore360',                          // Menu slug
        'bizcore360_dashboard_page',           // Callback function
        'dashicons-admin-generic',             // Icon
        3                                      // Position
    );
}
add_action('admin_menu', 'bizcore360_admin_menu');

function bizcore360_dashboard_page() {
    echo '<div class="wrap">';
    echo '<h1>Welcome to BizCore360</h1>';
    echo '<p>Your AI-powered business management suite is now active in WordPress Admin.</p>';
    echo '</div>';
}

/*
|--------------------------------------------------------------------------
| FRONT-END SHORTCODE
|--------------------------------------------------------------------------
| This lets you embed the BizCore360 app inside any WordPress page or post
| using the shortcode [bizcore360_app].
*/
function bizcore360_app_shortcode() {
    ob_start();
    ?>
    <div id="bizcore360-app" style="padding: 20px;">
        <h2>Welcome to BizCore360</h2>
        <p>Your AI-powered business management suite is now active on the front end.</p>

        <!-- Example iframe embed of your app -->
        <iframe src="https://app.bizcore360.ai"
                style="width:100%; height:800px; border:none; border-radius:10px;">
        </iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('bizcore360_app', 'bizcore360_app_shortcode');
