//We create the game object

var App = function() {};

App.prototype.start = function()
{
    // Scenes
    var scenes = [];

    //scenes.push(Map);
    scenes.push(Avatars);
    scenes.push(Map);
    scenes.push(Shooter);
    scenes.push(Trivia);
    scenes.push(Pacman);
    scenes.push(Cage);


    // Game config
    var config = {
        type	: Phaser.AUTO,
        width : 800,
        height : 600,
        parent	: 'phaser-app',
        scene	: scenes,
        title	: 'Walkie'
    };

    // Create game app
    var game = new Phaser.Game(config);

    // Globals
    game._URL = 'http://localhost/PhaserGames/PixelMemory/';	// this.sys.game._URL
    game._USER_ID = 0;

    game._CONFIG = config;
};

window.onload = function()
{
    'use strict';

    var app = new App();

    app.start();
}


//set the positions for different points the player will move to
var startPoint = {x: 268, y:130};
var theCage = {x: 60, y: 200};
var pacman = {x: 740, y: 200};
var trivia = {x: 605, y: 450};
var place;


/**********************************
*********- A V A T A R S -*********
**********************************/
var Avatars = new Phaser.Scene('Avatars');

var avatarChosen = 1;//the number of the avatar chosen. to prevent errors, we set a default.

var index = 1;//the index to loop on the list of avatars
var avatarSizes = {small: 0.3, big:0.8};
var avatarTable = [];

Avatars.preload = function(){
    this.load.image('background', 'images/background.png');
    this.load.image('avatar1', 'images/character1.png');
    this.load.image('avatar2', 'images/character2.png');
    this.load.image('avatar3', 'images/character3.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
    
};

var BTNnextAvatar;
var BTNconfirmAvatar;

Avatars.create = function(){
    //add the images
    this.add.image(400, 300, 'background');
    this.avatar1 = this.add.image(200, 350, 'avatar1');
    this.avatar2 = this.add.image(400, 350, 'avatar2');
    this.avatar3 = this.add.image(600, 350, 'avatar3');
    

    //rescale the images
    this.avatar1.setScale(avatarSizes.small);
    this.avatar2.setScale(avatarSizes.big);
    this.avatar3.setScale(avatarSizes.small);
    
    // store all this in an array so we can loop on it later
    avatarTable = [this.avatar1, this.avatar2, this.avatar3];
    
    
    //add the buttons
    BTNnextAvatar = this.add.image(780, 400, 'transparentButton');
    BTNconfirmAvatar = this.add.image(400, 580, 'transparentButton');
    
    //make them interactive
    BTNnextAvatar.setInteractive();
    BTNconfirmAvatar.setInteractive();
    
    //  The buttons will dispatch a 'clicked' event when they are clicked on
    BTNnextAvatar.on('clicked', handlerBTNnextAvatar, this); 
    BTNconfirmAvatar.on('clicked', handlerBTNconfirmAvatar, this, index);
    
    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);
    
    //type the texts
    this.add.text(220, 30, 'Pick your avatar', {fontSize: '32px', fill: '#000'});
    this.add.text(130, 70, 'Say "NEXT" to go through the avatars, and "CONFIRM" to select', {fontSize: '16px', fill: '#000'});
};

Avatars.update = function(){
    
};


//EVENT HANDLERS
function handlerBTNnextAvatar(BTNnextAvatar){
    index +=1;
    console.log('next avatar, current index value is: ' + index);
    console.log('mod: '+ index%3);
    avatarTable[index%3].setScale(avatarSizes.big);
    avatarTable[Math.abs((index%3+1)%3)].setScale(avatarSizes.small);
    avatarTable[Math.abs((index%3+2)%3)].setScale(avatarSizes.small);
};

function handlerBTNconfirmAvatar(BTNconfirmAvatar){
    console.log('confirm avatar');
    avatarChosen = (index%3)+1;
    console.log('chosen avatar number: ' + (avatarChosen));
    this.scene.start('Map');
};


/********************************
************- M A P -************
********************************/
var Map= new Phaser.Scene('Map');

Map.preload = function()
{
    this.load.image('background', 'images/background.png');
    this.load.image('map', 'images/map.png');
    this.load.image('button', 'images/button.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
    this.load.image('character', 'images/character' + avatarChosen + '.png');   
};

var BTNshooter;
var BTNtheCage;
var BTNpacman;
var BTNtrivia;

Map.create = function()
{
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'map');
    this.character = this.add.image(startPoint.x, startPoint.y, 'character');
    this.character.setScale(0.2);

    // buttons
    //BTNshooter = this.add.image(30, 30, 'button');
    BTNtheCage = this.add.image(theCage.x, theCage.y, 'transparentButton');
    BTNpacman = this.add.image(pacman.x, pacman.y, 'transparentButton');
    BTNtrivia = this.add.image(trivia.x, trivia.y, 'transparentButton');

    //  Make the buttons input-enabled
    BTNshooter.setInteractive();
    BTNtheCage.setInteractive();
    BTNpacman.setInteractive();
    BTNtrivia.setInteractive();

    //  The buttons will dispatch a 'clicked' event when they are clicked on
    BTNshooter.on('clicked', handlerBTNshooter, this);
    BTNtheCage.on('clicked', handlerBTNtheCage, this);
    BTNpacman.on('clicked', handlerBTNpacman, this);
    BTNtrivia.on('clicked', handlerBTNtrivia, this);

    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('clicked', gameObject);
    }, this);
};

Map.update= function()
{
    'use strict';
};


//EVENT HANDLERS
function handlerBTNshooter (BTNshooter){
    console.log("shooter button clicked");
    //this.scene.start('Shooter');
    handlerLaunchGame();
};

function handlerBTNtheCage (BTNtheCage){
    console.log("The Cage button clicked");
    moveToTheCage(this.character);
};

function handlerBTNpacman (BTNpacman){
    console.log("Pacman button clicked");
    moveToPacman(this.character);
};

function handlerBTNtrivia (BTNtrivia){
    console.log("Trivia button clicked");
    moveToTrivia(this.character);
};

function handlerLaunchGame(){
    if (place = 'cage'){this.scene.start('Cage');}
    else if (place = 'pacman'){this.scene.start('Pacman');}
    else if (place = 'trivia'){this.scene.start('Trivia');}
};


//movement functions
function moveToTheCage(Player){
    place = 'cage';
    Player.x = theCage.x;
    Player.y = theCage.y;
};

function moveToPacman(Player){
    place = 'pacman';
    Player.x = pacman.x;
    Player.y = pacman.y;
};

function moveToTrivia(Player){
    place = 'trivia';
    Player.x = trivia.x;
    Player.y = trivia.y;
};



/*******************************
*********- T R I V I A -********
*******************************/
var Trivia= new Phaser.Scene('Trivia');
Trivia.preload = function(){
    this.load.image('background', 'images/background.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
    this.load.image('character', 'images/character' + avatarChosen + '.png');   
};

Trivia.create = function(){
    this.add.image(400, 300, 'background');
};

Trivia.update = function(){
    
};




/*******************************
***********- C A G E -**********
*******************************/
var Cage= new Phaser.Scene('Cage');
Cage.preload = function(){
    this.load.image('background', 'images/background.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
    this.load.image('character', 'images/character' + avatarChosen + '.png');
};

Cage.create = function(){
        this.add.image(400, 300, 'background');
};

Cage.update = function(){
    
};




/*******************************
*********- P A C M A N -********
*******************************/
var Pacman= new Phaser.Scene('Pacman');
Pacman.preload = function(){
    this.load.image('background', 'images/background.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
    this.load.image('character', 'images/character' + avatarChosen + '.png');
};

Pacman.create = function(){
    this.add.image(400, 300, 'background');
};

Pacman.update = function(){
    
};




/*******************************
********- S H O O T E R -*******
*******************************/
var Shooter= new Phaser.Scene('Shooter');
Shooter.preload = function()
{
    this.load.image('background', 'images/background.png');
};

Shooter.create= function()
{
    this.add.image(400, 300, 'background');
};


//========= Bindings ==========

function bMove(place) {
    if (place == 'cage'){// the user want to go to the cage
        //handlerBTNtheCage(BTNtheCage);
        handlerBTNtheCage.apply(Map, BTNtheCage);
    };

    if (place == 'trivia'){// the user want to go to the cage
        handlerBTNtrivia.apply(Map, BTNtrivia);
    };

    if (place == 'pacman'){// the user want to go to the cage
        handlerBTNpacman.apply(Map, BTNpacman);
    };
}

function bLaunchGame(){
    handlerLaunchGame();
};

function bChooseAvatar(ordinal) {
    switch (ordinal) {
        case "1":
            handlerBTNnextAvatar.apply(Map, BTNnextAvatar);
            handlerBTNnextAvatar.apply(Map, BTNnextAvatar);
            handlerBTNconfirmAvatar.apply(Map, BTNconfirmAvatar);
            break;
        case "2":
            handlerBTNconfirmAvatar.apply(Map, BTNconfirmAvatar);
            break;
        case "3":
            handlerBTNnextAvatar.apply(Map, BTNnextAvatar);
            handlerBTNconfirmAvatar.apply(Map, BTNconfirmAvatar);
            break;
    }
}
