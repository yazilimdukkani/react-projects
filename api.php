<?php 
include("db.php");

class Api extends Db{

public $sql,$goster,$insert,$update,$sil;


public function Goster(){

$this->sql= $this->db->prepare("SELECT* FROM futbol");
return $this->sql->execute();




}
public function GosterFetch(){

return $this->sql->fetchAll(PDO::FETCH_ASSOC);


}


public function Ekle($user){

$this->sql=$this->db->prepare("INSERT INTO futbol(user)VALUES(?)");

$this->sql->bindParam(1,$user);
$this->sql->execute();

}

public function Login($login,$user){

$this->sql=$this->db->prepare("UPDATE users SET  login=? WHERE kadi=?");
$this->sql->bindParam(1,$login);

$this->sql->bindParam(2,$user);

return $this->sql->execute();



}

#giris var ise

public function Kontrol($login,$user){

    $this->sql=$this->db->prepare("UPDATE users SET  login=? WHERE kadi=?");
    $this->sql->bindParam(1,$login);
    
    $this->sql->bindParam(2,$user);
    
    return $this->sql->execute();


}
public function KontrolRow(){


return $this->sql->rowCount();

}


#uye degilse uye olsun












public function Uye($kadi,$email){





}

#uye bilgilerini cek


public function UyeBilgiler($email){

$this->sql=$this->db->prepare("SELECT* FROM users WHERE email=?");
$this->sql->bindParam(1,$email);
return $this->sql->execute();




}

public function UyeBilgiFetch(){


return $this->sql->fetchAll(PDO::FETCH_ASSOC);

}


#banlanan kullanici giris yapamaz

public function Ban($email,$login){

$this->sql=$this->db->prepare("SELECT* FROM users WHERE email=? AND login=?");
$this->sql->bindParam(1,$email);
$this->sql->bindParam(2,$login);

return $this->sql->execute();


}

public function BanRow(){


return $this->sql->rowCount();

}


#uyegirisi

public function UyeGirisi($email){

$this->sql=$this->db->prepare("SELECT* FROM users WHERE email=?");
$this->sql->bindParam(1,$email);

return $this->sql->execute();

}

public function GirisLogin(){

return $this->sql->rowCount();


}

#uyegirisi

#uye ekle

public function UyeEkle($kadi,$email){

$this->sql=$this->db->prepare("INSERT INTO users(kadi,email)VALUES(?,?)");
$this->sql->bindParam(1,$kadi);
$this->sql->bindParam(2,$email);

$this->sql->execute();
}


#uye ekle

}


?>