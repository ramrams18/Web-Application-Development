<?php

// display all errors on the browser
error_reporting(E_ALL);
ini_set('display_errors', 'On');

require_once 'demo-lib.php';
demo_init(); // enables nicer output

set_time_limit(0);

require_once 'DropboxClient.php';

/** @noinspection SpellCheckingInspection */
$dropbox = new DropboxClient(array(
    'app_key' => "",      // Dropbox API key here
    'app_secret' => "",   // Dropbox API secret here
    'app_full_access' => false,
));

/**
 * Dropbox will redirect the user here
 * @var string $return_url
 */
$return_url = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . "?auth_redirect=1";

// first, try to load existing access token
$bearer_token = demo_token_load("bearer");

if ($bearer_token) {
    $dropbox->SetBearerToken($bearer_token);
    //echo "<pre> loaded bearer token: " . json_encode($bearer_token, JSON_PRETTY_PRINT) . "</pre>";
}
// are we coming from dropbox's auth page?
else if (!empty($_GET['auth_redirect'])) {

    // get & store bearer token
    $bearer_token = $dropbox->GetBearerToken(null, $return_url);
    demo_store_token($bearer_token, "bearer");
}
// not authorized
else if (!$dropbox->IsAuthorized()) {

    // redirect user to Dropbox auth page
    $auth_url = $dropbox->BuildAuthorizeUrl($return_url);
    die("Authentication required. <a href='$auth_url'>Continue.</a>");
}

$dltMsg = "";
# delete img
if (isset($_POST['delete'])) {

    $filePath =  isset($_GET['delete']) ? $_GET['delete'] : '';
    $deleted = $dropbox->Delete($filePath);
    $dltMsg = $filePath . " deleted successfully!";
}

$uploadMsg = "";
#upload img
if (isset($_POST['upload']) && isset($_FILES["imgUpload"]["name"])) {

    $uploadImg = $_FILES["imgUpload"]["name"];
    $tmpImg = $_FILES["imgUpload"]["tmp_name"];
    $fileExtension = strtolower(pathinfo(basename($uploadImg), PATHINFO_EXTENSION));

    if ($fileExtension == 'jpg') {

        # upload temp file
        $isUploaded = $dropbox->UploadFile($tmpImg, $uploadImg);

        if ($isUploaded) {
            $uploadMsg = "File uploaded successfully!";
        } else {
            $uploadMsg =  "Error uploading file.";
        }
    } else {
        $uploadMsg =  "Unsupported file type " . $fileExtension;
    }
}

?>

<!DOCTYPE html>
<html>

<head>
    <title>Photo Album</title>
    <link rel="stylesheet" href="style.css">
</head>

<body onload="init();">
    <h1>Photo Album</h1>
    <div class="container">
        <div class="img-wrapper">
            <h2>Preview:</h2>
            <img id="preview">
            <div id="no-img"></div>
        </div>
        <div class="content-wrapper">
            <div class="form-wrapper">
                <form action="album.php" method="post" enctype="multipart/form-data">
                    <h2>Upload image:</h2>
                    <input type="file" name="imgUpload" id="imgUpload">
                    <button type="submit" name="upload">Upload Image</button>
                </form>
                <p class='msg'><?= $uploadMsg ?></p>
            </div>
            <div class="list-wrapper">
                <h2>Image list</h2>
                <form method="post">
                    <p class='msg'><?= $dltMsg ?></p>
                    <ul>
                        <?php
                        # display list
                        $files = $dropbox->GetFiles("", false);

                        foreach ($files as  $file) {

                            # to display img preview
                            $img_data = base64_encode($dropbox->GetThumbnail($file->path, "xl"));

                            echo "<li>";
                            echo " <a download href='data:image/jpeg;base64," . $img_data . "' onClick='showPreview(this);'>" . $file->name . "</a> ";
                            echo " <button type='submit' formaction='album.php?delete=" . $file->path . "' name='delete'> Delete </button> ";
                            echo "</li>";
                        }

                        ?>
                    </ul>
                </form>
            </div>
        </div>

    </div>
</body>

<script>
    var preview;
    var noImg;

    function init() {
        preview = document.getElementById('preview');
        noImg = document.getElementById('no-img');
        noImg.innerHTML = "No image selected!";
    }

    function showPreview(e) {

        if (preview) {
            preview.src = e.href;
            noImg.innerHTML = "";
        }
    }
</script>

</html>