<?php
error_reporting(E_ALL); ini_set('display_errors', 1);
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
echo json_encode(['get'=>$_GET,'post'=>$_POST]);
