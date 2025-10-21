<?php
// Fallback for servers that don't support .htaccess or web.config
// This ensures index.html is served when visiting the root directory

$request_uri = $_SERVER['REQUEST_URI'];
$request_path = parse_url($request_uri, PHP_URL_PATH);

// Remove leading slash
$request_path = ltrim($request_path, '/');

// Handle different routes
if (empty($request_path) || $request_path === '/') {
    // Root directory - serve landing page
    include 'index.html';
} elseif ($request_path === 'app' || strpos($request_path, 'app/') === 0) {
    // App route - serve React app
    include 'app.html';
} elseif (file_exists($request_path)) {
    // File exists - serve it directly
    $mime_type = mime_content_type($request_path);
    header('Content-Type: ' . $mime_type);
    readfile($request_path);
} else {
    // Fallback - serve landing page
    include 'index.html';
}
?>
