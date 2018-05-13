$(document).ready(initializeApp);

var the_number = null;

/**
 *
 */
function initPageSound(){
    var sound = new Audio();
    sound.src= "sounds/2319.wav";
    sound.play();
}

/**
 *
 */
function endPageSound(){
    var sound = new Audio();
    sound.src= "sounds/week.wav";
    sound.play();
}

/**
 *
 */
function initializeApp(){
    createDoors();
}

/**
 *
 */
function pick_number(){
    var random_number = getRandomInt(1, 15);
    return random_number;
}

/**
 * return a random number between 2 numbers
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/**
 * DOM Creation
 * Create 15 div with door image in 3 rows
 */
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

/**
 * create a HTMLelement for a specific index
 * @param index
 * @returns {*|jQuery|HTMLElement}
 */
function createDoor(index){
    //included css in order to not have 15 different classes for every door in the css file
    var door = $('<div>',{
        class: "door",
        css: {
            background: "url(images/door"+index+".png\)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
        },
        id: index
    });
    var doorBorder = $('<div>',{
       class : "border"
    });
    doorBorder.on('click',function (){
        openDoor(this);
    });
    doorBorder.append(door);
    //included css in order to not have different classes for every monster in the css file
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

/**
 * return the url of a random monster image
 * @returns {string}
 */
function getMonster(){
    var monsters = ["images/sully.png","images/bile.png","images/celia.png","images/George.png","images/Randall.png","images/Mike.png"];
    var index = Math.floor(Math.random() * 5);
    return monsters[index];
}

/**
 * if the door is close, open the door and close the others that are open.
 * if the door is open, close the door
 * check if the id of the door is the number to guess
 * @param field
 */
function openDoor(field) {
    var y = $(field).find(".door");
    var monster = y.parent().find(".monster");
    var power = y.parent().find(".power");


    if (y.hasClass("doorOpened")) {
        y.removeClass("doorOpened");
        var sound = new Audio();
        sound.src= "sounds/door-7-close.wav";
        sound.play();
        monster.hide();
        $(".power").hide();
    }
    else {
        $(".door").removeClass("doorOpened"); //close all the doors are open
        $(".monster").hide(); //Hide all the monster's div
        $(".power").hide(); //Hide the power led on the doors
        y.addClass("doorOpened");

        var sound = new Audio();
        sound.src= "sounds/door-1-open.wav";
        sound.play();

        //check if the player choose the correct door
        var the_guess = y.attr('id');
        if(the_guess > the_number){
            setTimeout(function(){
                monster.show();
                $("#response_div").text("She isn\'t here! \r\n Look on the left!");
                //power led on the doors
                powerLed(y.parent(),power);
                } , 500);
        }else if(the_guess < the_number){
            setTimeout(function(){
                monster.show();
                $("#response_div").text("She isn\'t here! \r\n Look on the right!");
                //power led on the doors
                powerLed(y.parent(),power);
            } , 500);
        }else if(the_guess == the_number){
            var sound = new Audio();
            sound.src= "sounds/kitty.mp3";
            sound.play();
            setTimeout(function(){
                y.parent().append($("<div>").addClass("boo"));
                $("#response_div").text("You found her!");
                //power led on the doors
                powerLed(y.parent(),power);
                }, 500);
            //if the player guess the correct door, jump to the end page
            setTimeout(function(){location.href="end.html"} , 2000);
        }
    }

    /**
     *
     * @param elem
     * @param oldPower
     */
    function powerLed(elem,oldPower) {
        if(oldPower.length === 0) {
            elem.append($("<div>").addClass("power"));
        }else{
            oldPower.show();
        }
    }
}

