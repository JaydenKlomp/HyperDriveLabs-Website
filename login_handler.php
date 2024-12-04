<?php
header('Content-Type: application/json');

// API Base URL
$apiBase = 'https://carapi.mercantec.tech/api/';

// Fetch input from POST request
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Validate input
if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Email and password are required']);
    http_response_code(400); // Bad Request
    exit;
}

// Function to make API call
function callApi($endpoint, $method = 'POST', $body = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    if (!empty($body)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        return ['error' => curl_error($ch)];
    }

    curl_close($ch);

    return json_decode($response, true);
}

// Send login request to the API
$response = callApi($apiBase . 'Users/login', 'POST', [
    'email' => $data['email'],
    'password' => $data['password']
]);

// Check if the API returned a token
if (isset($response['token'])) {
    echo json_encode([
        'success' => true,
        'token' => $response['token'],
        'username' => $response['username'],
        'userId' => $response['id']
    ]);
    http_response_code(200); // OK
} else {
    echo json_encode(['error' => $response['error'] ?? 'Login failed']);
    http_response_code(401); // Unauthorized
}
