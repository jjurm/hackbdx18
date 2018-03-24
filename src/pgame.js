//We create the game object

var App = function() {};

App.prototype.start = function()
{
    // Scenes
    var scenes = [];

    scenes.push(Map);
    scenes.push(Shooter);

    // Game config
    var config = {
        type	: Phaser.AUTO,
        width	: 9  * 64,		// 576
        height	: 15 * 64,		// 960
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

var Map= new Phaser.Scene('Map');

Map.preload = function()
{
    this.load.image('background', 'images/background.png');
    this.load.image('map', 'images/map.png');
    this.load.image('button', 'images/button.png');
};

Map.create= function()
{
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'map');

    // button event
    var box = this.add.image(30, 30, 'button');

    //  Make them all input enabled
    box.setInteractive();

    //  The images will dispatch a 'clicked' event when they are clicked on
    box.on('clicked', clickHandler, this);

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

function clickHandler (box)
{
    console.log("clicked");
    this.scene.start('Shooter');
};


var Shooter= new Phaser.Scene('Shooter');
Shooter.preload = function()
{
    this.load.image('background', 'images/background.png');
};

Shooter.create= function()
{
    this.add.image(400, 300, 'background');
};
