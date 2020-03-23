<?php
    require 'database.php';

    if(!empty($_GET['id'])) 
    {
        $id = checkInput($_GET['id']);
    }
     
    $db = Database::connect();
    $statement = $db->prepare("SELECT products.id, products.name, products.description, products.price, products.img, category_p.name AS category FROM products LEFT JOIN category_p ON products.category = category_p.id WHERE products.id = ?");
    $statement->execute(array($id));
    $product = $statement->fetch();
    Database::disconect();

    function checkInput($data) 
    {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/syle.css">
    <title>Document</title>
</head>

<body>

    <div class="container">
        <h1> Espace Admin </h1>
    </div>




    <div class='container admin'>
        <div class='row'>



            <div class="Col-sm-6">

                <!-- <h1><strong>Voir un produits</strong> </h1> -->
                <br>

                <form>

                    <div class="form-group">

                        <label>Nom :</label><?php echo ' ' . $product['name'];  ?>

                    </div>

                    <div class="form-group">

                        <label>Description :</label><?php echo ' '.$product['description'];  ?>

                    </div>

                    <div class="form-group">

                        <label>Category :</label><?php echo ' '.$product['category'];  ?>

                    </div>

                    <div class="form-group">

                        <label>Image :</label><?php echo ' '.$product['img'];  ?>

                    </div>

                    <div class="form-group">

                        <label>Prix :</label><?php echo ' '.$product['price'].'$';  ?>

                    </div>

                </form>

                <div class="form-actions">
                    <a class="btn btn-primary" href="index.php">Retour</a>
                </div>

            </div>

            <div class="Col-sm-6">


                <div class="artH">
                    

                            <img src="<?php echo '../img/' .$product['img'] ;  ?>" class="artH1">
                           

                </div>
            </div>


        </div>
    </div>


</body>

</html>



