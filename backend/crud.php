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
      $allColumns = 'ttb,eon,ops_console,company_name,submitted_by,sla_start,owner,domintl,supporting,issue_info,updated';
      $commentsColumns = 'ttb,comment,timestamp,submitted_by';
      switch($what) {
        case 'all':
          $read = "SELECT $allColumns FROM tickets WHERE closed = 'no'";
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
    public function create($query) {
      $db = $this -> connectDB();

      $what = $query['what'];  // comments tickets

      if($what == 'comments') {
        $ttb = $query['criteria']['ttb'];
        $comment = $query['criteria']['comment'];
        $submitted_by = $query['criteria']['submitted_by'];

        $create = $this -> createStmt($what);

        if($statement = $db -> prepare($create)) {
          $statement->bind_param('sss',$ttb,$comment,$submitted_by);
          $statement -> execute();
        } else {
          $error = $db -> errno . ' ' . $db -> error;
          echo $error;
        }
      }

      if($what == 'tickets') {

      }
    }
    public function createStmt($what) {
      $create = '';
      $allColumns = 'ttb,eon,ops_console,company_name,submitted_by,owner,domintl,supporting,issue_info';
      $commentsColumns = 'ttb,comment,submitted_by';
      switch($what) {
        case 'tickets':
          break;
        case 'comments':
          $create = "INSERT INTO $what ($commentsColumns) VALUES (?, ?, ?)";
          break;
      }
      return $create;
    }
    public function update($query) {
      $db = $this -> connectDB();

      $what = $query['what'];
      $criteria = $query['criteria'];
      $update = $this -> updateStmt($what,$criteria);

      if($statement = $db -> prepare($update)) {
        $statement -> execute();
      } else {
        $error = $db -> errno . ' ' . $db -> error;
        echo $error;
      }
    }
    public function updateStmt($what,$criteria) {
      $columns = $criteria['columns'];
      $values = $criteria['values'];
      $filterColumns = $criteria['filterColumns'];
      $filters = $criteria['filters'];

      $setInsert = '';
      $filterInsert = '';

      for($i=0; $i<count($columns); $i++) {
        $setInsert = $setInsert . $columns[$i] . " = '" . $values[$i] . "'";
        if($i<count($columns)-1) {$setInsert = $setInsert . ', ';}
      }

      for($i=0; $i<count($filterColumns); $i++) {
        $filterInsert = $filterInsert . $filterColumns[$i] . " = '" . $filters[$i] . "'";
        if($i<count($filterColumns)-1) {$filterInsert = $filterInsert . ', ';}
      }

      $update = "UPDATE $what SET $setInsert WHERE $filterInsert";
      return $update;
    }
  }
?>
