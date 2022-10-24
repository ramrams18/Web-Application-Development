<?php
session_start();
?>

<html>

<head>
    <title>Board - Login</title>
</head>

<body>

    <div class="login">

        <h1>Login</h1>

        <form action="login.php" method="post">

            <label for="username">Username: </label><input type="text" required name="username" id="username" placeholder="Enter username">
            <br><br>
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" required placeholder="Enter password">
            <br><br><br>
            <button type="submit">Login</button>
            <br><br>
            <div class="err-msg">
                <?php

                $user = isset($_POST["username"]) ? $_POST["username"] : '';
                $pass = isset($_POST["password"]) ? $_POST["password"] : '';

                if ($user != '' && $pass != '') {

                    try {
                        $dbh = new PDO("mysql:host=127.0.0.1:3306;dbname=board", "root", "", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
                        $dbh->beginTransaction();
                        $stmt = $dbh->prepare("select * from users where username = '" . $user . "' and password = '" . md5($pass) . "'");
                        $stmt->execute();
                        if ($row = $stmt->fetch()) {
                            $_SESSION["username"] = $user;
                            header("Location: board.php");
                        } else {
                            echo 'Incorrect username or password';
                        }
                    } catch (PDOException $e) {
                        die();
                    }
                }
                ?>
            </div>
        </form>
    </div>
</body>

<style>
    body {

        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
    }

    .login {

        border: 2px solid black;
        padding: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
    }

    .login h1 {
        text-align: center;
    }

    .err-msg {
        color: red;
    }

    input,
    button {
        padding: 10px;
        width: 100%;
        border: 1px solid black;
        font-size: 16px;
    }
</style>

</html>