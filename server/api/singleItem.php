<?php
require '../db/database.php';
// if(!empty($_GET['id'])) 
//     {
//         $id = checkInput($_GET['id']);
//     }
$db = Database::connect();
$id = $_GET['id'];
    $statement = $db->prepare("SELECT * FROM products WHERE products.id = '$id'");
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
   echo $json;

Database::disconect();

?>
