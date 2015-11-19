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

      $what = $query['what'];
      if(isset($query['criteria'])) {
        $criteria = $query['criteria'];
      } else {$criteria = 'nope';};

      $read = $this -> readStmt($what, $criteria);

      if($statement = $db -> prepare($read)) {
        $statement -> execute();
      } else {
        $error = $db -> errno . ' ' . $db -> error;
        echo $error;
      }
      $result = $statement -> get_result();
      $response = $result -> fetch_all(MYSQLI_ASSOC);
      echo json_encode($response);
    }
    public function readStmt($what, $criteria) {
      $read = '';
      $allColumns = 'ttb,eon,ops_console,company_name,submitted_by,sla_start,owner,domintl,supporting,issue_info';
      $commentsColumns = 'ttb,comment,timestamp,submitted_by';
      switch($what) {
        case 'all':
          $read = "SELECT $allColumns FROM tickets WHERE 1";
          break;
        case 'comments':
          $read = "SELECT $commentsColumns FROM comments WHERE 1";
          break;
        case 'search':
          break;
      }
      if($what == 'comments') {
        $read = $read . ' AND ttb = ' . $criteria;
      }
      return $read;
    }
  }
?>
