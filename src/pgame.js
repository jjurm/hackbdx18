//We create the game object

var App = function() {};

App.prototype.start = function()
{
    // Scenes
    var scenes = [];

    scenes.push(Avatars);
    scenes.push(Map);
    scenes.push(Shooter);


    // Game config
    var config = {
        type	: Phaser.AUTO,
        //width	: 9  * 64,		// 576
        //@ADAM : to properly display the map and move the character on it we need at least 800x400px, is it okay for you?
        //height	: 15 * 64,		// 960
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
var startPoint = {x: 265, y:140};
var theCage = {x: 55, y: 210};
var pacman = {x: 740, y: 210};
var trivia = {x: 605, y: 460};


/**********************************
*********- A V A T A R S -*********
**********************************/
var Avatars = new Phaser.Scene('Avatars');

Avatars.preload = function(){
    this.load.image('background', 'images/background.png');
    this.load.image('avatar1', 'images/character1.png');
    this.load.image('avatar2', 'images/character2.png');
    this.load.image('avatar3', 'images/character3.png');
    this.load.image('transparentButton', 'images/transparentButton.png');
};

Avatars.create = function(){
    //add the buttons
    var BTNnextAvatar = this.add.image(580, 350, 'transparentButton');
    var BTNconfirmAvatar = this.add.image(400, 380, 'transparentButton');
    
    //make them interactive
    BTNnextAvatar.setInteractive();
    BTNconfirmAvatar.setInteractive();
    
    //add the images
    this.add.image(400, 300, 'background');
    this.avatar1 = this.add.image(200, 350, 'avatar1');
    this.avatar2 = this.add.image(400, 350, 'avatar2');
    this.avatar3 = this.add.image(600, 350, 'avatar3');
    

    //rescale the images
    var avatarSizes = {small: 0.3, big:0.8};
    this.avatar1.setScale(avatarSizes.small);
    this.avatar2.setScale(avatarSizes.big);
    this.avatar3.setScale(avatarSizes.small);
    
    // store all this in an array so we can loop on it later
    var avatars = [this.avatar1, this.avatar2, this.avatar3];
    
    //type the texts
    this.add.text(220, 30, 'Pick your avatar', {fontSize: '32px', fill: '#000'});
    this.add.text(130, 70, 'Say NEXT to go through the avatars, and CONFIRM to select', {fontSize: '16px', fill: '#000'});
};

Avatars.update = function(){
    
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
    this.load.image('character', 'images/character1.png');
    
};

Map.create= function()
{
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'map');
    this.character = this.add.image(startPoint.x, startPoint.y, 'character');
    this.character.setScale(0.2);

    // buttons
    var BTNshooter = this.add.image(30, 30, 'button');
    var BTNtheCage = this.add.image(theCage.x, theCage.y, 'transparentButton');
    var BTNpacman = this.add.image(pacman.x, pacman.y, 'transparentButton');
    var BTNtrivia = this.add.image(trivia.x, trivia.y, 'transparentButton');

    //  Make the buttons input-enabled
    BTNshooter.setInteractive();
    BTNtheCage.setInteractive();
    BTNpacman.setInteractive();
    BTNtrivia.setInteractive();

    //  The images will dispatch a 'clicked' event when they are clicked on
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

    // ...
};


//EVENT HANDLERS
function handlerBTNshooter (BTNshooter){
    console.log("clicked");
    this.scene.start('Shooter');
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



//movement functions
function moveToTheCage(Player){
        Player.x = theCage.x;
        Player.y = theCage.y;
};

function moveToPacman(Player){
        Player.x = pacman.x;
        Player.y = pacman.y;
};

function moveToTrivia(Player){
        Player.x = trivia.x;
        Player.y = trivia.y;
};