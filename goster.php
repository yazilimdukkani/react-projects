<?php 



$name=$_POST['name'];
$email=$_POST['email'];

if (!empty($name) && !empty($email)) {
    # code...

header("Access-Control-Allow-Origin: *");

include("api.php");

$goster= new Api();




    //$data= json_decode(file_get_contents('php://input'),true);


    

    $goster->UyeGirisi($email);
        $varise= $goster->GirisLogin();
        
        
        if ($varise) {
            # code...
        echo "user var";
        
        }
        else{
            $goster->UyeEkle($name,$email);
        
 

        }
       
        
  
        
    }
    











?>