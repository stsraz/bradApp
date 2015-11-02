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
      $result = [];
      $db = $this -> connectDB();
      $read = "SELECT * FROM tickets WHERE ?";
      $statement = $db -> prepare($read);
      $statement -> bind_param("s", $where);
      $where = $query['where'];
      $statement -> execute();
      $result = $statement -> get_result();
      $response = $result -> fetch_all(MYSQLI_ASSOC);
      echo json_encode($response);
    }
  }
?>
