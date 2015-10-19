<?php // TACOPS for CRUD
  include 'crud.php';
  session_start();
  $requests = $_POST;
  $CRUD = new CRUD();
  foreach($requests as $request) {
    if($request['type'] == 'read') {
      $query = $request['query'];
      $result = $CRUD -> read($query);
      echo $result;
    }
  }
?>
