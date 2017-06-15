<?php
$songs = [
    'ba$ement_dweller - dissolved in a bathtub of memes.aac',
    'ba$ement_dweller - when does the ride end.aac',
    'ba$ement dweller - butt chugging cough syrup.aac',
    'ba$ement_dweller - pissing right of the water so it makes less noise.aac',
    'ba$ement_dweller - the end is nigh.aac',
];

?>

<html>
<head>
    <title>Well done!</title>
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="c/css.css">
    <title id="title">Bi$op i$ G0d</title>
</head>
<body>
<audio autoplay controls id="player">
    <?php
    foreach ($songs as $song) {
        print '<source src="/' . $song . '">';
    }
    ?>
</audio>
<div id="visualisation">
</div>
<script type="text/javascript" src="./s/js.js"></script>
</body>
</html>
