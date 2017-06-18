<?php
$songs = [
    'ba$ement_dweller - dissolved in a bathtub of memes.aac',
    'ba$ement_dweller - when does the ride end.aac',
    'ba$ement_dweller - the end is nigh.aac',
    'ba$ement dweller - butt chugging cough syrup.aac',
    'ba$ement_dweller - pissing right of the water so it makes less noise.aac',
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
<audio id="player" src="bishop.aac" autoplay>
</audio>
<canvas id="visualisation" width="700" height="700">
</canvas>
<ul class="c-song-list">
<?php
foreach ($songs as $song) {
    $artwork = '/i/' . str_replace('aac', 'png', $song);
    $title = str_replace('.aac', '', $song);
    print <<<HTML
    <li class="c-song-conainer js-song-superouter" data-src="{$song}">
        <div class="c-song-outer">
            <div class="c-song-title">
                <p>{$title}</p>
            </div>
            <div class="c-song-image">
                <img src="{$artwork}">
            </div>
        </div>    
    </li>
HTML;
}
?>
</ul>
<script type="text/javascript" src="./s/js.js"></script>
</body>
</html>
