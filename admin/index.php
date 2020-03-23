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

    <h1>Admin</h1>



    <div class='container admin'>
        <div class='row'>
            <h1><strong>Liste des produits</strong><a href="insert.php" class="btn btn-success btn-lg"> + Ajouter</a>
            </h1>
            <table class="table table-striped table-bordered">

                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>prix</th>
                        <th>categorie</th>
                        <th>action</th>
                    </tr>
                </thead>
                
                <tbody>


                <?php
            require ('database.php') ;
            $db = Database::connect() ;
            
            $statement = $db->query('SELECT products.id, products.name, products.description, products.price, category_p.name AS category FROM products LEFT JOIN category_p ON products.category = category_p.id ');
            while ($product = $statement->fetch() ) {
               
               echo'<tr>';
               echo'<td>' .$product['name'] .'</td>';
               echo'<td>' .$product['description'].'</td>';
               echo'<td>' .$product['price'].'</td>';
               echo'<td>' .$product['category'].'</td>';
               
               echo '<td width=300>' ;
               echo '<a class="btn btn-default add"  href="view.php?id='.$product['id'].'"  style="border:solid;color:black"><span
                            class="glyphicon glyphicon-eye-open"></span> Voir</a>'; 
                            echo ' ';
               echo '<a href="update.php?id='. $product['id'].'" class="btn btn-primary add" style="border:solid;color:black"><span
                            class="glyphicon glyphicon-eye-open"></span> Modifier</a>';
                            echo ' ';
               echo' <a href="delete.php?id='.$product['id'].'" class="btn btn-danger add" style="border:solid;color:black"><span
                            class="glyphicon glyphicon-eye-open"></span> Supprimer</a>';

               echo  '</td>';
            echo '</tr>';
            Database::disconect();

            }

                ?>


                  <!--                 
                    <tr>
                        <td>item 1</td>
                        <td>Description 1</td>
                        <td> Prix 1</td>
                        <td>Azert</td>
                        <td width=300>
                            <a href="view.php?id=1" class="btn btn-default add" style="border:solid;color:black"><span
                                    class="glyphicon glyphicon-eye-open"></span> Voir</a>
                            <a href="update.php?id=1" class="btn btn-primary add" style="border:solid;color:black"><span
                                    class="glyphicon glyphicon-eye-open"></span> Modifier</a>
                            <a href="delete.php?id=1" class="btn btn-danger add" style="border:solid;color:black"><span
                                    class="glyphicon glyphicon-eye-open"></span> Supprimer</a>

                        </td>
                    </tr> -->

                </tbody>

            </table>


        </div>
    </div>


</body>

</html>