<?php
    require 'admin/database.php';

    if(!empty($_GET['id'])) 
    {
        $id = checkInput($_GET['id']);
    }
     
    $db = Database::connect();
    $statement = $db->prepare("SELECT products.id, products.name, products.description, products.price, products.img1, products.img2, products.img3, products.img, category_p.name AS category FROM products LEFT JOIN category_p ON products.category = category_p.id WHERE products.id = ?");
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
    <link rel="stylesheet" href="css/syle.css">
    <title>Document</title>
</head>
<div class="container"></div>

<body>



    <?php include "includes/entete.php" ; ?>

    <div class="container">

    <div class="col-s-">
        <div class="spGen">




            <div class="singleProductPage">
            


               <?php 
               
               echo '<img src="./img/'.$product['img'] . '" class="singleProductCss"  id="imgDefault" style="width:500px" > 
               

                <div class="reactAnglePage" >' ;

                 echo  '<img src="./img/'.$product['img1'] . '" class="reactAj1" id="imgChange1" onclick="imgDefault.src = this.src" >' ;
                 echo  '<img src="./img/'.$product['img2'] . '" class="reactAj2" id="imgChange2" onclick="imgDefault.src = this.src">' ;
                 echo  '<img src="./img/'.$product['img3'] . '" class="reactAj3" id="imgChange3" onclick="imgDefault.src = this.src">' ;
                 echo  '<img src="./img/'.$product['img']  . '" class="reactAj4" id="imgChange4" onclick="imgDefault.src = this.src"> 

                 

            </div>';

                Database::disconect(); ?>
                
                </div>
            <div class="texte">
                Chaussure pour Homme 140$ <br>
                <span>Nike React Element 55 Premium</span>

                <p> Selectionner la taille </p>

                <form method="post" name="form1">
                    <select name="taille">
                        <option value="40" class="">40</option>
                        <option value="41" class="">41</option>
                        <option value="42" class="">42</option>
                        <option value="43" class="">43</option>
                        <option value="44" class="">44</option>
                        <option value="45" class="">45</option>

                    </select>
                </form>

                <button class = "btn" >Ajouter au panier</button> <br>

                <p> La Nike React Element 55 s'inspire des chaussures de running classiques, telles que la Nike
                    Internationalist, et intègre la technologie Nike React.
                </p><br>

                <ul>
                    <li>Couleur affichée : Argent métallique/Platine pur/Gris foncé/Noir</li>
                    <li>Article : CI3835-001</li>
                </ul>
                <div class="btn">


                    <div id="lrg" onclick="delLivraison()" >Livraison et retour gratuits  </div>
                </div>
                <div id="texteLivraison">
                    Livraison standard gratuite avec votre compte NikePlus. <br>
                    <br>
                    <ul>
                        <li>
                             Le délai des livraisons standard est de 2 à 4 jours ; nous effectuons des livraisons 5 jours sur 7.
                        </li>
                        <li>
                            Pour une commande passée avant 13 heures avec option de livraison le lendemain, du lundi au jeudi.
                        </li>
                        <li>
                            Possibilité de retirer les commandes en magasin Nike et dans une centaine de points de retrait
                             faciles d'accès.
                        </li>
                        <li>
                            Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60
                                                jours.
                        </li>
                    </ul>
                    

                   
                    
                   
                    
                </div>


            </div>
        </div></div>
    </div>


    <?php include 'includes/footer.php'; ?>



    <script src="js/main.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</body>

</html>