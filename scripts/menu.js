$(document).ready(menu);
    
function menu(){
    $("<div/>").attr("id", "map").appendTo("body");
    $("<img/>").attr("src", "images/ping-pong.jpg").attr("id","img").appendTo("#map");
    var btn = $("<button/>").attr("id", "btn").text("Play").appendTo("#map");
    btn.click(function(){
        $("body").empty();
        game();
    });

    btn.css({
       "position":"absolute",
        "top":"60%",
        "left":"57%",
        "font-size":"30px"
    })  
    //$("<button/>").attr("id","sound").text("Sound").appendTo("#map");
    var sound = $("<img/>").attr("src", "images/sound.jpg").attr("id","sdimg").appendTo("#map");
    var clickSound = $("<audio/>").appendTo("#map");
    clickSound[0].src = "sounds/click.wav";
    sound.css({
        "position":"absolute",
        "top":"90%",
        "font-size":"10px"
    })

    sound.click(function(){
        clickSound[0].play();
        console.log('clicked');
    })

}
