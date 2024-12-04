<?php
header('Content-Type: application/json');

// API Base URL
$apiBase = 'https://carapi.mercantec.tech/api/';

// Function to make API calls
function callApi($endpoint) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        return ['error' => curl_error($ch)];
    }

    curl_close($ch);

    // Decode the JSON response
    return json_decode($response, true);
}

// Fetch data from various endpoints
$cars = callApi($apiBase . 'Cars');
$rpms = callApi($apiBase . 'RPMs');
$tempHumidities = callApi($apiBase . 'TempHumidities');
$users = callApi($apiBase . 'Users'); // Add Users endpoint

// Validate data
if (!$cars || isset($cars['error'])) {
    $cars = []; // Default to empty if API call fails
}
if (!$rpms || isset($rpms['error'])) {
    $rpms = []; // Default to empty if API call fails
}
if (!$tempHumidities || isset($tempHumidities['error'])) {
    $tempHumidities = []; // Default to empty if API call fails
}
if (!$users || isset($users['error'])) {
    $users = []; // Default to empty if API call fails
}

// Prepare data for the frontend
$data = [
    'cars' => $cars,
    'rpms' => $rpms,
    'tempHumidities' => $tempHumidities,
    'users' => $users // Include Users in the response
];

// Return JSON response
echo json_encode($data);
?>
