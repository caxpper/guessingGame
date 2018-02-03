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
    doorBorder.append($("<div>",{
        class: "monster",
        css:
            {
                background: 'url('+getMonster()+')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }
    }));
    return doorBorder;
}

function getMonster(){
    var monsters = ["images/sully.png","images/bile.png","images/celia.png","images/George.png","images/Randall.png","images/Mike.png"];
    var index = Math.floor(Math.random() * 5);
    return monsters[index];
}

function openDoor(field) {
    var y = $(field).find(".thumb");
    var monster = y.parent().find(".monster");
    if (y.hasClass("thumbOpened")) {
        y.removeClass("thumbOpened");
        monster.hide();
    }
    else {
        $(".thumb").removeClass("thumbOpened");
        $(".monster").hide();
        y.addClass("thumbOpened");

        var the_guess = y.attr('id');
        if(the_guess > the_number){
            $("#response_div").text("She is not here. I saw her more to the left!");
            monster.show();
        }else if(the_guess < the_number){
            $("#response_div").text("She is not here. I saw her more to the right!");
            monster.show();
        }else if(the_guess == the_number){
            y.parent().append($("<div>").addClass("boo"));
            $("#response_div").text("You found her!");
            setTimeout(function(){location.href="end.html"} , 2000);
        }
    }
}

