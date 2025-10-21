<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD PAGE
|--------------------------------------------------------------------------
| Adds the "BizCore360" menu item inside the WordPress admin sidebar
| and displays a simple welcome page when clicked.
*/
function bizcore360_admin_menu() {
    add_menu_page(
        'BizCore360',                // Page title
        'BizCore360',                // Menu title
        'manage_options',            // Capability
        'bizcore360',                // Menu slug
        'bizcore360_dashboard_page', // Callback function
        'dashicons-admin-generic',   // Icon
        3                            // Position
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
| Allows you to embed BizCore360 inside any WordPress page or post
| using:  [bizcore360_app]
*/
function bizcore360_app_shortcode() {
    ob_start();
    ?>
    <style>
        /* Basic styling for a full-width responsive iframe */
        #bizcore360-app {
            padding: 40px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 900px;
            background: radial-gradient(circle at top left, #1a1a1a, #000);
            color: #fff;
            border-radius: 16px;
            box-shadow: 0 0 30px rgba(0,0,0,0.3);
        }
        #bizcore360-app h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #00d4ff, #0078ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        #bizcore360-app iframe {
            width: 95%;
            height: 850px;
            border: none;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(255,255,255,0.05);
        }
    </style>

    <div id="bizcore360-app">
        <h2>Welcome to BizCore360</h2>
        <p>Your AI-powered business management suite is now active on the front end.</p>

        <!-- Example iframe embed of your app -->
        <iframe src="https://app.bizcore360.ai" title="BizCore360 Application"></iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('bizcore360_app', 'bizcore360_app_shortcode');

/*
|--------------------------------------------------------------------------
| CONFIRM SHORTCODE REGISTERED
|--------------------------------------------------------------------------
| Optional logging for debugging (only writes if WP_DEBUG is true).
*/
if (defined('WP_DEBUG') && WP_DEBUG) {
    add_action('init', function() {
        if (shortcode_exists('bizcore360_app')) {
            error_log('BizCore360: Shortcode [bizcore360_app] successfully registered.');
        } else {
            error_log('BizCore360: Shortcode registration failed.');
        }
    });
}
