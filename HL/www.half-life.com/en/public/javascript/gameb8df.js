var timePerLaud = 1500;

jQuery(document).ready(function($){

    var timer;
    var $lauds = $('.laud');
    var laudCount = $lauds.length;
    var current = Math.floor((Math.random()*laudCount));

    setTimer();
    next();
    
    function setTimer(override){
        clearTimeout(timer);
        duration = override || timePerLaud;
        timer = setTimeout(next, duration);
    }

    function next() {
        current++;
        if (current >= laudCount ) { current = 0; }
        $lauds.fadeOut(200);
        var currentObj = $lauds.get(current);
        $(currentObj).promise().done(function(){$(currentObj).fadeIn(200);});
        if ($(currentObj).data("duration")) {
            var override = $(currentObj).data("duration");
            setTimer(override);
        } else { setTimer(); }
    }

    var carouselon = true;

    $('#debugcarousel').click(function(){
        if (carouselon)
        {
            clearTimeout(timer);
            carouselon = !carouselon;
        }
        else
        {
            setTimer();
            carouselon = !carouselon;
        }
    });
});
