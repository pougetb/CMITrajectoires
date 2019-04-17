<?php
session_start();
?>
<html>
    <body>
        <form action="file_load.php" method="POST" enctype="multipart/form-data">
            Your file: <input type="file" name="sheet" /><br/>
            Start date (YYYY-MM-DD): <input type="text" name="start-date"/><br/>
            End date (YYYY-MM-DD): <input type="text" name="end-date"/><br/>
            Clustering period: <input type="text" name="interval"/><br/>
            DBSCAN epsilon: <input type="text" name="epsilon" value="0.7"/><br/>
            DBSCAN min_t: <input type="text" name="mint" value="5"/><br/>
            <input type="submit" value="upload" name="submit"/>
        </form>
        <br/>
        <ul>
            <?php
            if(isset($_SESSION["errors"])) {

                foreach($_SESSION["errors"] as $error) {
            ?>

            <li><?php echo $error; ?></li>

            <?php } unset($_SESSION["errors"]);} ?>
        </ul>
   </body>
</html>
