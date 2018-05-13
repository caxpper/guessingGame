$(document).ready(initializeApp);

var the_number = null;

function initializeApp(){
    $("#buttonId").on('click',make_guess);
    createDoors();
}


function pick_number(){
    var random_number = getRandomInt(1, 15);
    return random_number;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function make_guess(){
    var the_guess = $("#guess_input")[0].value;
    if(the_guess > the_number){
        $("#response_div").text("Too High!");
    }else if(the_guess < the_number){
        $("#response_div").text("Too Low!");
    }else if(the_guess == the_number){
        $("#response_div").text("You guessed it!");
        $("#response_div").css({'font-weight':'bold',
                                'font-size': 'larger'});
    }
}

function createDoors(){
    var recipient = $(".doors");
    for(var row = 0; row < 3; row++) {
        var rowElem = $("<div>").addClass("row");
        for (var col = 1; col < 6; col++) {
            rowElem.append(createDoor((row*5)+col));
        }
        recipient.append(rowElem);
    }
}

function createDoor(index){
    var door = $('<div>',{
        class: "thumb",
        css: {background: "url(images/door"+index+".png\)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center"},
        id: index
    });
    var doorBorder = $('<div>',{
       class : "perspective"
    });
    doorBorder.on('click',function (){
        openDoor(this);
    });
    doorBorder.append(door);
    return doorBorder;
}

function openDoor(field) {
    var y = $(field).find(".thumb");
    var x = y.attr("class");
    if (y.hasClass("thumbOpened")) {
        y.removeClass("thumbOpened");
    }
    else {
        $(".thumb").removeClass("thumbOpened");
        y.addClass("thumbOpened");

        var the_guess = y.attr('id');
        if(the_guess > the_number){
            $("#response_div").text("She is not here. I saw her more to the left!");
        }else if(the_guess < the_number){
            $("#response_div").text("She is not here. I saw her more to the right!");
        }else if(the_guess == the_number){
            y.parent().append($("<div>").addClass("boo"));
            $("#response_div").text("You found her!");
            $("#response_div").css({'font-weight':'bold',
                'font-size': 'larger'});
        }
    }
}

