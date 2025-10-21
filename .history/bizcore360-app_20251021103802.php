<?php
if (!defined('ABSPATH')) {
    exit;
}

// Example admin page for BizCore360
function bizcore360_admin_menu() {
    add_menu_page(
        'BizCore360',
        'BizCore360',
        'manage_options',
        'bizcore360',
        'bizcore360_dashboard_page',
        'dashicons-admin-generic',
        3
    );
}

function bizcore360_dashboard_page() {
    echo '<div class="wrap"><h1>Welcome to BizCore360</h1><p>Your AI-powered business management suite is now active.</p></div>';
}

add_action('admin_menu', 'bizcore360_admin_menu');
