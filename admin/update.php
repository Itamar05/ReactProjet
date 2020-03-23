<?php require 'database.php' ; 

if(!empty($_GET['id'])){

    $id = checkInput($_GET['id']) ;
}

$nameError = $descriptionError = $priceError = $categoryError = $imageError = $name = $description = $price = $category = $image = "" ;

if(!empty($_POST)){

    $name              = checkInput($_POST['name']) ;
    $description       = checkInput( $_POST['description'] ) ;
    $price             = checkInput( $_POST['price'] ) ;
    $category          = checkInput( $_POST['category'] ) ;
    $image             = checkInput( $_FILES["image"]["name"] ) ;
    $imagePath         = '../img/' . basename($image) ;
    $imageExtension    = pathinfo($imagePath, PATHINFO_EXTENSION) ;
    $isSuccess         = true;
    

        if(empty($name)){
            $nameError = "Ce champ ne peut pas etre vide" ;
            $isSuccess = false ;
        }

        if(empty($description)){
            $descriptionError = "Ce champ ne peut pas etre vide" ;
            $isSuccess = false ;
        }

        if(empty($price)){
            $priceError = "Ce champ ne peut pas etre vide" ;
            $isSuccess = false ;
        }

        if(empty($category)){
            $categoryError = "Ce champ ne peut pas etre vide" ;
            $isSuccess = false ;
        }

        if(empty($image)){

             $isImageUpdated = false ;

        } else {

                    $isImageSuccess  = true ;
                    $isUploadSuccess = true ;

                    if($imageExtension != "jpg" && $imageExtension != "png" && $imageExtension != "JPEG" && $imageExtension != "gif" && $imageExtension != "PNG"   ){

                    $imageError = "Les fichiers autorise sont: .jpg, .jpeg, .png, .gif" ;
                    $isUploadSuccess = false ;

                    }

                    if(file_exists($imagePath)){
                        $imageError = "Le fichier existe deja" ;
                        $isUploadSuccess = false ;
                    }

                    if($_FILES['image']['size'] > 500000  ){
                        $imageError = "Le fichier ne doit pas depasser les 500KB";
                        $isUploadSuccess = false ;
                    }

                    if($isUploadSuccess) {
                                
                            if(!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)){
                            $imageError = "Il y'a eu une erreur lors de l'upload" ;
                            $isUploadSuccess = false;

                                }
                    }
       }
       
       if (($isSuccess && $isUploadSuccess && $isImageSuccess) || ($isSuccess && !$isImageSuccess)) {

                    $db = Database::connect();
                    if ($isImageUpdated) {

                        $statement = $db->prepare("UPDATE products set  name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?") ;
                        $statement->execute(array($name,$description,$price,$category,$image,$id));

                    } else {

                        $statement = $db->prepare("UPDATE products set  name = ?, description = ?, price = ?, category = ? WHERE id = ?") ;
                        $statement->execute(array($name,$description,$price,$category,$id));

                    }
                    
                    Database::disconect();
                    header("Location: index.php");

       } else if ($isImageSuccess && !$isUploadSuccess) {
           
      $db = Database::connect();
      $statement = $db->prepare((" SELECT img FROM products WHERE id = ? "))      ;
      $statement->execute(array($id)) ;
      $product = $statement->fetch() ;

      $image  = $product['img'] ;

      Database::disconect();

       } ;

} else {

      $db = Database::connect();
      $statement = $db->prepare((" SELECT * FROM products WHERE id = ? "))      ;
      $statement->execute(array($id)) ;
      $product = $statement->fetch() ;

      $name              = $product['name'] ;
      $description       = $product['description'] ;
      $price             = $product['price'] ;
      $category          = $product['category'] ;
      $image             = $product['img'] ;

      Database::disconect();
} ;



function checkInput($data){

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
       <h1> Espace Admin <br> Modifier un item </h1>
   </div>




   <div class='container admin col-sm-'>
       <div class='row'>
         
       <div class="col-sm-6">

      


           

               <!-- <h1><strong>Voir un produits</strong> </h1> -->
               <br>

                   <form  class="form" role="form" action="<?php echo 'update.php?id='.$id ;?>" method="post" enctype="multipart/form-data">

                       <div class="form-group">

                        <label for="name">Nom :</label>  
                       <input type="text" name="name" class="form-control" id="name" placeholder="Nom" value="<?php echo $name ; ?>">
                       <span class="help-inline"><?php echo $nameError ; ?></span>

                       </div>



                       <div class="form-group">

                       <label for="description">Description :</label>
                       <input type="text" name="description" class="form-control" id="description" placeholder="description" value="<?php echo $description ; ?>">
                       <span class="help-inline"><?php echo $descriptionError ; ?></span>
                           
                       </div>



                       <div class="form-group">

                       <label for="category">Category :</label> 
                       <select class="form-control" name="category" id="category">

                      <?php
                       
                       $db = Database::connect();
                       foreach ($db->query('SELECT * FROM category_p') as $row) {
                           
                            if($row['id'] == $category ){

                                echo '<option selected="selected" value ="'. $row['id'] . '">' . $row['category'] . '<option>' ;
                            }
                            else{
                                echo '<option value="' .$row['id'] . '">' .$row['name'] . '</option>';
                            }
                          


                       }
                       Database::disconect();

                       ?> 


                       </select>
                       <span class="help-inline"><?php echo $categoryError ; ?></span>
                          
                       </div>



                       <div class="form-group">

                       <label for="price">Prix :</label> 
                       <input type="text" name="price" class="form-control" id="price" placeholder="prix" value="<?php echo $price ; ?>">
                       <span class="help-inline"><?php echo $priceError ; ?></span>

                           

                       </div>

                       <div class="form-group">
                           
                       <label for="image">Selectioner une image</label>
                       <input type="file" id="img" name="image" value="<?php echo $image ; ?>">
                       <br>
                       <span class="help-inline"><?php echo $imageError ; ?></span>

                                           
                       </div>


                  

                   <div class="form-actions">
                       <button type="submit" class="btn btn-success" style="margin-top: 0%" >Modifier</button> 
                       
                   </div>

                   <div class="form-actions">
                       <a class="btn btn-primary" href="index.php" >Retour</a>
                   </div>

                   </form>
          



            </div class="col-sm-6">

            <img src="<?php echo '../img/' .$image ;  ?>" class="artH1"> <br>
            
            <p style="margin-left: 3%"><?php echo  $name . '<br>' . $price . '$' ?> </p>




            <div>

            </div>
       </div>
   </div>


 </body>

</html>




