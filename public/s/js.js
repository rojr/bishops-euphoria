$(function () {
    // Future-proofing...
    var context;
    var canvas = $('#visualisation');
    var ctx = canvas.get(0).getContext('2d');
    var width = 1000;
    var height = 1000;
    var barCount = 2048;

    if (typeof AudioContext !== "undefined") {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== "undefined") {
        context = new webkitAudioContext();
    } else {
        $(".hideIfNoApi").hide();
        $(".showIfNoApi").show();
        return;
    }

    // Overkill - if we've got Web Audio API, surely we've got requestAnimationFrame. Surely?...
    // requestAnimationFrame polyfill by Erik M�ller
    // fixes from Paul Irish and Tino Zijdel
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                0);
            lastTime = currTime;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

    // Create the analyser
    var analyser = context.createAnalyser();
    analyser.fftSize = barCount;

    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // Get the frequency data and update the visualisation
    function update() {
        ctx.clearRect(0, 0, width, height);

        //getByteTimeDomainData
        analyser.getByteFrequencyData(frequencyData);

        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        for (var i = 0; i < barCount; i++) {
            ctx.save();
            ctx.translate( width / 2, height / 2);
            ctx.rotate((141 * (i/barCount)) * (Math.PI));
            ctx.lineTo(i, frequencyData[i]);
            ctx.translate(-(width/2), -(height / 2));
            ctx.restore();
        }
        ctx.stroke();
    }

    // Hook up the audio routing...
    // player -> analyser -> speakers
    // (Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4)
    $("#player").bind('canplay', function() {
        var source = context.createMediaElementSource(this);
        source.connect(analyser);
        analyser.connect(context.destination);
    });

    // Kick it off...
    setInterval(function(){
        update();
    }, 5);
});