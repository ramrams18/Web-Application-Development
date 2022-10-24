<?php

try { # begin try

  session_start();
  error_reporting(E_ALL);
  ini_set('display_errors', 'On');

  #create test user
  createUser();

  # verify login
  $user = isset($_SESSION["username"]) ? $_SESSION["username"] : '';
  if ($user == '') {
    header("Location: login.php");
  }

  # logout 
  if (isset($_POST['logout'])) {
    logout();
  }

  # new msg
  if (isset($_POST['newPost'])) {

    if (isset($_POST['msg']) && $_POST['msg'] != '') {

      $msg =  $_POST['msg'];
      insertMessageToDb(null, $msg);
    } else {
      echo '<br> Cannot post empty msg.';
    }
  }

  # reply to msg 
  if (isset($_POST['replyPost'])) {

    if (isset($_POST['msg']) && $_POST['msg'] != '') {

      $replyTo = $_GET['replyTo'];
      $msg = $_POST['msg'];
      insertMessageToDb($replyTo, $msg);
    } else {
      echo '<br> Cannot post empty msg.';
    }
  }

  # get all messages

  $msgs = fetchAllMsgs();

  ?>
  <html>

  <head>
    <title>Message Board</title>
  </head>

  <body>

    <div class="heading">
      <h1>Message Board</h1>
    </div>

    <form method="post" id="form">

      <div id="msg-list">

        <h2>New Message: </h2>
        <div class="msg-wrapper">
          <div class="msg-details">

            <p> Logged in as: <?php echo $user ?></p>
            <p><button type="submit" name="logout">Logout</button></p>

          </div>
          <div class="msg-text">
            <textarea name="msg" id="msg" cols="30" rows="5" placeholder="Write your message here"></textarea>
          </div>
          <div class="submit-btn">
            <button type="submit" name="newPost" formaction="board.php">New Post</button>
          </div>
        </div>

        <h2 id="msg-heading">Messages: </h2>

        <?php

          if (count($msgs) == 0) {
            echo 'No messages to display';
          }
          foreach ($msgs as $msg) {
            # begin loop
            ?>

          <div class="msg-wrapper">
            <div class="msg-details">
              <p><strong>Message ID: </strong> <?= $msg['id'] ?> </p>
              <p><strong>Posted by: </strong> <?= $msg['postedby'] ?> (<?= $msg['fullname'] ?>) </p>
              <p><strong>Posted at: </strong> <?= $msg['datetime'] ?> </p>
              <p><strong>Reply to: </strong> <?= $msg['replyto'] ?> </p>
            </div>
            <div class="msg-text">
              <?= $msg['message'] ?>
            </div>
            <div class="submit-btn">
              <button type="submit" name="replyPost" formaction="<?= 'board.php?replyTo=' . $msg['id'] ?>">Reply</button>
            </div>
          </div>
        <?php

          }
          # end of loop
          ?>
      </div>

    </form>

  <?php

  } # end of try block 

  catch (PDOException $e) { # begin catch block

    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  } # end of catch block


  # begin function definitions

  function getDBConnection()
  {

    $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board", "root", "", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    $dbh->beginTransaction();

    return $dbh;
  }

  function insertMessageToDb($replyTo, $msg)
  {
    global $user;
    $msgId = uniqid();

    $dbh = getDBConnection();

    if (isset($replyTo)) {
      $dbh->exec("insert into posts values('$msgId' , '$replyTo' , '$user', NOW(), '$msg' );")
        or die(print_r($dbh->errorInfo(), true));
    } else {
      $dbh->exec("insert into posts values('$msgId' , null , '$user', NOW(), '$msg' );")
        or die(print_r($dbh->errorInfo(), true));
    }

    $dbh->commit();
  }

  function createUser()
  {
    $dbh = getDBConnection();
    $dbh->exec('delete from users where username="smith"');
    $dbh->exec('insert into users values("smith","' . md5("mypass") . '","John Smith","smith@cse.uta.edu")');
    $dbh->commit();
  }

  function logout()
  {
    $_SESSION["username"] = null;
    session_destroy();
    header("Location: login.php");
  }

  function fetchAllMsgs()
  {
    $dbh = getDBConnection();
    $stmt = $dbh->prepare("select * from posts , users where posts.postedby = users.username order by posts.datetime desc");
    $stmt->execute();

    $msgs = array();
    while ($row = $stmt->fetch()) {
      $msgs[] = $row;
    }
    return $msgs;
  }

  # end function definitions

  ?>

  </body>

  <style>
    body {

      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.5;
    }

    .heading {
      text-align: center;
      border-bottom: 3px solid black;
      margin: 20px;
    }

    #msg-list {
      margin: 20px;
    }

    .msg-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      border: 1px solid black;
      padding: 20px;
      margin: 20px 0;
    }

    .msg-details {
      border-right: 1px solid black;
      padding-right: 20px;
      width: 20%;
    }

    .msg-details p {
      margin: 5px 0;
    }

    .msg-text {
      border-right: 1px solid black;
      padding: 0 20px;
      width: 60%;
    }

    .submit-btn {
      padding: 0 20px;
    }

    textarea {
      width: 100%;
    }

    #msg-heading {
      border-top: 2px solid black;
      padding-top: 20px;
    }

    button {
      padding: 7px;
      font-size: 16px;
    }
  </style>

  </html>