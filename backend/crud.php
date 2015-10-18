<?php
  class CRUD {
    public $response = '';
    function connectDB() {
      $db = new mysqli('localhost', 'bradapp', 'bradapp_password', 'bradapp');
      if($db->connect_errno > 0) {
        die('I just caint doo it Capn! [' . $db->connect_error . ']');
      } else {return $db;}
    }
    public function results_to_JSON() {

    }
    public function create_select_statement($query) { // DON'T NEED THIS.  USE A ? PLACEHOLDER INSTEAD
      $temp = '';
      if($query == 'all'){
        $temp = 'SELECT * FROM tickets';
      }
      return $temp;
    }
    public function read($query) {
      $db = $this -> connectDB();
      // $sql = $this->create_select_statement($query);
      if($query != 'all') {
        $statement = $db::prepare('SELECT ') //*****************************************************
      } else {
        $statement = $db::prepare('SELECT * FROM tickets');
      }
      $statement = $db -> prepare($sql);
      $statement->execute();
      $statement->bind_result($ttb,$eon,$ops_console);
      while($statement -> fetch()) {
        echo $ttb . ' + ' . $eon . ' + ' . $ops_console;
      }
    }
  }

  session_start();
  $tempCRUD = new CRUD();
  $tempQuery = $_POST['query'];
  $tempCRUD -> read($tempQuery);

?>
