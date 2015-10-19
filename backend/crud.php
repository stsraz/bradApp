<?php // Just the CRUD ma'am.
  class CRUD {
    public $response = '';
    function connectDB() {
      $db = new mysqli('localhost', 'bradapp', 'bradapp_password', 'bradapp');
      if($db->connect_errno > 0) {
        die('I just caint doo it Capn! [' . $db->connect_error . ']');
      } else {return $db;}
    }
    public function read($query) {
      $db = $this -> connectDB();
      $what = $query['what'];
      $where = $query['where'];
      $read = "SELECT $what FROM tickets WHERE $where";
      $statement = $db -> prepare($read);
      $statement -> execute();
      $statement -> bind_result($ttb,$eon,$ops_console);
      while($statement -> fetch()) {        // FLESH THIS OUT TO CYCLE THROUGH ALL RESULTS AND STORE THEM IN AN ARRAY
        echo $ttb . ' + ' . $eon . ' + ' . $ops_console . ' - ';
      }
      return $result;
    }
  }
?>
