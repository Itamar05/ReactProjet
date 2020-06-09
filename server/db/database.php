<?php

    class Database {

       private static $dbHost = "localhost";
       private static $dbName = "projet";
       private static $username = "root";
       private static $password = "";

       private static $conn = null ;

       static function connect() {

      try {
            self::$conn = new PDO("mysql:host=". self:: $dbHost .";dbname=" .self::$dbName, self::$username,self::$password);
            // set the PDO error mode to exception
            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "";
          }

     catch(PDOException $e) {

            echo "Connection failed: " . $e->getMessage();
          } 
          return self::$conn ;
    } 

     public static function disconect() {
        self::$conn = null ;

    } 
} ;

?>


