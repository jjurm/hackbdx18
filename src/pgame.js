//We create the game object
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};
var main = new Phaser.Game(config);

// load asset files for our game
function preload (){
    this.load.image('background', 'images/background.png');
    this.load.image('map', 'images/map.png');
};

// executed once, after assets were loaded
function create (){
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'map');
};

function update(){
};

function render(){
};
