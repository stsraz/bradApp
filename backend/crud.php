<?php
  class CRUD {
    protected $db;
    private function _construct() {
      $db = new mysqli('localhost', 'bradApp', 'bradApp_password', 'bradApp');
      if($db->connect_errno > 0) {
        die('I just caint doo it Capn! [' . $db->connect_error . ']');
      }
    }
    private function results_to_JSON() {

    }
    private function get_all() {
      $getAllSQL = 'SELECT * FROM " "';
      $statement = $db -> prepare($getAllSQL);
      $statement->execute();
      $statement->bind_result($get_all_result);
      while($statement->fetch()) {
        echo $get_all_result;
      }
    }
  }

  session_start();
  echo $_POST['payload'];
?>
