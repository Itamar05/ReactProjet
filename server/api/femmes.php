<?php
require '../db/database.php';

$db = Database::connect();

    $statement = $db->prepare("SELECT * FROM products WHERE products.category = '2' ");
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;

Database::disconect();

?>
