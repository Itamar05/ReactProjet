<?php require 'database.php' ; 

 if (!empty($_GET['id'])) {

   $id = checkInput($_GET['id']) ;

 } ;

 if (!empty($_POST)) {
     $id = checkInput($_POST['id']) ;
     $db = Database::connect();
     $statement = $db->prepare("DELETE FROM products WHERE id = ?");
     $statement->execute(array($id));
     Database::disconect();
    header("location: index.php");

 }

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
        <h1> Espace Admin </h1> <br>
        
    </div>




    <div class='container admin '>
        <div class='row'>



            

                <!-- <h1><strong>Voir un produits</strong> </h1> -->
                <br>

                    <form  class="form" role="form" action="delete.php" method="post" >
                        <input type="hidden" name="id" value="<?php echo $id ; ?>">
                        <p class="alert alert-warning">Etes vous sur de vouloir supprimer ?</p>

                        
                   
                    <div class="form-actions">
                        <button type="submit" class="btn btn-warning" style="margin-top: 0%" >Oui</button> 
                        <a class="btn btn-default" href="index.php" >Non</a>
                    </div>

              
                       

                    </form>
           




        </div>
    </div>


</body>

</html>
