<?php 
class Db{

public function __construct(){
    $this->db = new PDO("mysql:host=localhost;dbname=chat;charset=utf8", "root", "flamenko86");

$this->db->exec("SET NAMES utf8");

}

}

?>