var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.startGame('deviceready');
    },

    // Update DOM on a Received Event
    startGame: function(id) {
        var config = {
            type: Phaser.AUTO,
            autoResize: true,
            parent: 'game',
            width: 800,
            height: 450,
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
            title: 'PokeRun',
            pixelArt: true,
            physics:
            {
                default:'arcade',
                    arcade:{
                        gravity: {
                            y:0
                        },
                        debug: true
                    }
            }
        }
        
        var game = new Phaser.Game(config);
        
        function preload()
        {
            this.load.image('background','../assets/background.png');
            this.load.image('ground','../assets/ground.png');
            this.load.image('pokebola','../assets/pokebola.png');
            
            this.load.spritesheet('pikachu','../assets/pikachu_spritesheet.png',
            {
               frameWidth:480,
               frameHeight:342,
               margin: 0,
               spacing: 0
            });
        }
        function create()
        {
            this.bg = this.add.sprite(0,0,'background').setOrigin(0);
            this.ground = this.add.sprite(0,354,'ground').setOrigin(0);
            this.pikachu = this.add.sprite(70,320,'pikachu');
            this.pikachu.setScale(0.3);

            this.pokebolas = this.add.group(
                    {
                        key: 'pokebola',
                        repeat: 3,
                        setXY: 
                        {
                            x:170,
                            y:100,
                            stepX: 200,
                            stepY:20
                        },
                        setScale:
                        {
                            x:0.2,
                            y:0.2
                        }
                    });
            
            this.physics.add.existing(this.pikachu);
            this.pikachu.body.setSize(this.pikachu.width *0.7, this.pikachu.height*0.85);
            
            this.physics.add.existing(this.ground);
            
            Phaser.Actions.Call( this.pokebolas.getChildren(), function(pokebola)
            {
                this.physics.add.existing(pokebola);
                pokebola.body.setVelocity(0,100);
                pokebola.body.setBounce(0,1);
                pokebola.body.setSize(pokebola.width, pokebola.height);
                pokebola.body.collideWorldBounds = true;
            },this);
            
        }
        function update()
        {
            
        }
    }
};
app.initialize();