<?php
  header("Content-Type: application/json");
  $host = "http://ws.audioscrobbler.com/2.0/";
  $query = $_SERVER['QUERY_STRING'];
  $ch = curl_init($host . "?" . $query);
  curl_exec($ch);
  curl_close($ch);
?>
