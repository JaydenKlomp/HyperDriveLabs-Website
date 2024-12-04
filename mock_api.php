<?php
header('Content-Type: application/json');

// Simulated response for /api/Cars
$data = [
    [
        "id" => "1",
        "createdAt" => "2024-11-27T22:51:29.859Z",
        "lastEmergency" => "2024-11-27T22:51:29.859Z"
    ],
    [
        "id" => "2",
        "createdAt" => "2024-11-27T22:52:29.859Z",
        "lastEmergency" => "2024-11-27T22:52:29.859Z"
    ]
];

echo json_encode($data);
?>
