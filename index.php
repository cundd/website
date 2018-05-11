<!doctype html>
<html class="no-js" lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <?php include "head.phtml" ?>
</head>
<body>

<script type="text/irlib-template" id="app-template">
    <div class="content">
        <div class="row">
            <div class="col col-6 term">
                <pre>{{{buffer}}}</pre>
                {%view view/textField%}
            </div>
        </div>
    </div>
</script>

<section id="main">
    <div class="row">
        <div class="large-12 columns content">
            <div id="app-root"></div>

            <?php include "footer.phtml" ?>
        </div>
    </div>
</section>

<script type="application/javascript" src="/Resources/JavaScript/irlib.js"></script>
<script type="application/javascript" src="/Resources/JavaScript/main.js"></script>
<?php include "body_end.phtml" ?>
</body>
</html>
