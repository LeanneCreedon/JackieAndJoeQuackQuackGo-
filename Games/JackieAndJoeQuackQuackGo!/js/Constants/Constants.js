/*
 * Class to store all data for jackie and joe quack quack go!
*/

class GameData {
    static AUDIO_CUE_ARRAY = [
      new AudioCue("background_music", AudioType.Background, 1, 1, 0, true),
      new AudioCue("menu_music", AudioType.Background, 1, 1, 0, true),
      new AudioCue("sound_quack", AudioType.Move, 1, 1, 0, false),
      new AudioCue("sound_duckling_quack", AudioType.Move, 1, 1, 0, false),
      new AudioCue("sound_health", AudioType.Move, 1, 1, 0, false),
      new AudioCue("sound_jump", AudioType.Move, 1, 1, 0, false),
      new AudioCue("sound_gun", AudioType.All, 1, 1, 0, false),
      new AudioCue("sound_lose", AudioType.WinLose, 1, 1, 0, false),
      new AudioCue("sound_win", AudioType.WinLose, 1, 1, 0, false),
      new AudioCue("sound_spike", AudioType.Move, 1, 1, 0, false)
    ];
  
    static BACKGROUND_DIMENSIONS = new Vector2(980, 600);
  
    static BACKGROUND_DATA = {
  
        id: "Background",
        spriteSheet: document.getElementById("background_sprite"),
        sourcePosition: Vector2.Zero,
        sourceDimensions: this.BACKGROUND_DIMENSIONS,
        translation: Vector2.Zero,
        rotation: 0,
        scale: Vector2.One,
        origin: Vector2.Zero,
        actorType: ActorType.Background,
        collisionType: CollisionType.NotCollidable,
        scrollSpeedMultiplier: 0.2,
    };

    // COLLISION FOR WALL (THERE WAS ISSUE WHERE PLAYER COULD JUMP UP THE WALL)

    static WALL_COLLISION_BOX_DIMENSIONS = new Vector2(320, 672);
  
    static WALL_COLLISION_BOX_DATA = {
  
        id: "Wall Collision Box",
        spriteSheet: document.getElementById("collision_box_sprite"),
        sourcePosition: Vector2.Zero,
        sourceDimensions: this.WALL_COLLISION_BOX_DIMENSIONS,
        rotation: 0,
        scale: new Vector2(0.5, 0.5),
        origin: Vector2.Zero,
        actorType: ActorType.Environment,
        collisionType: CollisionType.Collidable,
        scrollSpeedMultiplier: 0.2,

        translationArray: [
          new Vector2(-160, 218),
          new Vector2(4800, 321),
          new Vector2(5600, 321),
          new Vector2(6670, -5),
        ]
    };

    // COLLISION FOR CLIFF

    static CLIFF_COLLISION_BOX_DIMENSIONS = new Vector2(240, 14);
  
    static CLIFF_COLLISION_BOX_DATA = {
  
        id: "Cliff Collision Box",
        spriteSheet: document.getElementById("collision_box_sprite"),
        sourcePosition: Vector2.Zero,
        sourceDimensions: this.CLIFF_COLLISION_BOX_DIMENSIONS,
        rotation: 0,
        scale: Vector2.One,
        origin: Vector2.Zero,
        actorType: ActorType.Cliff,
        collisionType: CollisionType.Collidable,
        scrollSpeedMultiplier: 0.2,

        translationArray: [
          new Vector2(1040, 750),
          new Vector2(2880, 750),
          new Vector2(3120, 750),
          new Vector2(3360, 750),
          new Vector2(3600, 750),
        ]
    };

    static BOX_DIMENSIONS = new Vector2(265, 265);
  
    static BOX_DATA = {
  
      id: "Box",
      spriteSheet: document.getElementById("decorators_sprite_sheet"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: this.BOX_DIMENSIONS,
      rotation: 0,
      scale: new Vector2(0.33, 0.33),
      origin: Vector2.Zero,
      actorType: ActorType.Environment,
      collisionType: CollisionType.Collidable,
      layerDepth: 0,

      translationArray: [
  
        new Vector2(1425, 471),
        new Vector2(1520, 471),
        new Vector2(1500, 386),

      ]
    };

    // SPIKE TRAPS
    static SPIKE_TRAP_DIMENSIONS = new Vector2(213, 99);
  
    static SPIKE_TRAP_DATA = {
  
      id: "Spike Trap",
      spriteSheet: document.getElementById("decorators_sprite_sheet"),
      sourcePosition: new Vector2(500, 166),
      sourceDimensions: this.SPIKE_TRAP_DIMENSIONS,
      rotation: 0,
      scale: new Vector2(0.5, 0.5),
      origin: Vector2.Zero,
      actorType: ActorType.SpikeTrap,
      collisionType: CollisionType.Collidable,
      layerDepth: 0,

      translationArray: [
        new Vector2(2550, 505),
        new Vector2(4980, 525),
      ]
    };

    static PLATFORM_DATA = {

      id: "Environment",
      spriteSheet: document.getElementById("platform_sprite"),
      sourcePosition: Vector2.Zero,
      sourceDimensions: new Vector2(160, 48),
      rotation: 0,
      scale: Vector2.One,
      origin: Vector2.Zero,
      actorType: ActorType.Environment,
      collisionType: CollisionType.Collidable,
      layerDepth: 0,
  
      translationArray: [
  
        /****************** Screen 1 *******************/
  
        // START
        new Vector2(0, 555),
        new Vector2(160, 555),
        new Vector2(320, 555),
        new Vector2(480, 555),
        new Vector2(640, 555),
        new Vector2(800, 555),
        new Vector2(880, 555),

        // SMALL GAP
        new Vector2(1280, 555),
        new Vector2(1440, 555),
        new Vector2(1600, 555),
        new Vector2(1760, 555),
        new Vector2(1920, 555),
        new Vector2(2080, 555),
        new Vector2(2240, 555),
        new Vector2(2400, 555),
        new Vector2(2560, 555),
        new Vector2(2720, 555),

        // FLOATING PLATFORM 1
        new Vector2(1600, 300),
        new Vector2(1760, 300),
        new Vector2(1920, 300),
        new Vector2(2080, 300),
        new Vector2(2240, 300),

        // BIG GAP!
        new Vector2(3840, 555),
        new Vector2(4000, 555),
        new Vector2(4160, 555),
        new Vector2(4320, 555),
        new Vector2(4480, 555),
        new Vector2(4640, 555),
        new Vector2(4800, 555),

        // FLOATING PLATFORM 2
        new Vector2(3040, 300),
        new Vector2(3200, 300),
        new Vector2(3360, 300),
        new Vector2(3520, 300),

        // HIGHER GROUND
        new Vector2(4800, 537),
        new Vector2(4800, 519),
        new Vector2(4800, 501),
        new Vector2(4800, 483),
        new Vector2(4800, 465),
        new Vector2(4800, 447),
        new Vector2(4800, 429),
        new Vector2(4800, 411),
        new Vector2(4800, 393),
        new Vector2(4800, 375),
        new Vector2(4800, 357),
        new Vector2(4800, 339),
        new Vector2(4800, 321),

        // LOWER HEIGHT
        new Vector2(4960, 575),
        new Vector2(5120, 575),
        new Vector2(5280, 575),
        new Vector2(5440, 575),
        

        // HIGHER GROUND
        new Vector2(5600, 555),
        new Vector2(5600, 537),
        new Vector2(5600, 519),
        new Vector2(5600, 501),
        new Vector2(5600, 483),
        new Vector2(5600, 465),
        new Vector2(5600, 447),
        new Vector2(5600, 429),
        new Vector2(5600, 411),
        new Vector2(5600, 393),
        new Vector2(5600, 375),
        new Vector2(5600, 357),
        new Vector2(5600, 339),
        new Vector2(5600, 321),


        // FLOATING PLATFORM 3
        new Vector2(5120, 315),
        new Vector2(5280, 315),
       
      

        // FINAL PLOT
        new Vector2(5760, 555),
        new Vector2(5760, 537),
        new Vector2(5760, 519),
        new Vector2(5760, 501),
        new Vector2(5760, 483),
        new Vector2(5760, 465),
        new Vector2(5760, 447),
        new Vector2(5760, 429),
        new Vector2(5760, 411),
        new Vector2(5760, 393),
        new Vector2(5760, 375),
        new Vector2(5760, 357),
        new Vector2(5760, 339),
        new Vector2(5760, 321),

        new Vector2(5920, 555),
        new Vector2(5920, 537),
        new Vector2(5920, 519),
        new Vector2(5920, 501),
        new Vector2(5920, 483),
        new Vector2(5920, 465),
        new Vector2(5920, 447),
        new Vector2(5920, 429),
        new Vector2(5920, 411),
        new Vector2(5920, 393),
        new Vector2(5920, 375),
        new Vector2(5920, 357),
        new Vector2(5920, 339),
        new Vector2(5920, 321),
        
        new Vector2(6080, 555),
        new Vector2(6080, 537),
        new Vector2(6080, 519),
        new Vector2(6080, 501),
        new Vector2(6080, 483),
        new Vector2(6080, 465),
        new Vector2(6080, 447),
        new Vector2(6080, 429),
        new Vector2(6080, 411),
        new Vector2(6080, 393),
        new Vector2(6080, 375),
        new Vector2(6080, 357),
        new Vector2(6080, 339),
        new Vector2(6080, 321),

        new Vector2(6240, 555),
        new Vector2(6240, 537),
        new Vector2(6240, 519),
        new Vector2(6240, 501),
        new Vector2(6240, 483),
        new Vector2(6240, 465),
        new Vector2(6240, 447),
        new Vector2(6240, 429),
        new Vector2(6240, 411),
        new Vector2(6240, 393),
        new Vector2(6240, 375),
        new Vector2(6240, 357),
        new Vector2(6240, 339),
        new Vector2(6240, 321),

        new Vector2(6400, 555),
        new Vector2(6400, 537),
        new Vector2(6400, 519),
        new Vector2(6400, 501),
        new Vector2(6400, 483),
        new Vector2(6400, 465),
        new Vector2(6400, 447),
        new Vector2(6400, 429),
        new Vector2(6400, 411),
        new Vector2(6400, 393),
        new Vector2(6400, 375),
        new Vector2(6400, 357),
        new Vector2(6400, 339),
        new Vector2(6400, 321),

        new Vector2(6560, 555),
        new Vector2(6560, 537),
        new Vector2(6560, 519),
        new Vector2(6560, 501),
        new Vector2(6560, 483),
        new Vector2(6560, 465),
        new Vector2(6560, 447),
        new Vector2(6560, 429),
        new Vector2(6560, 411),
        new Vector2(6560, 393),
        new Vector2(6560, 375),
        new Vector2(6560, 357),
        new Vector2(6560, 339),
        new Vector2(6560, 321),

      ]
  };

  // HORIZONTAL MOVING PLATFORMS
  
  static H_MOVING_PLATFORM_VELOCITY = 0.8; 

  static H_MOVING_PLATFORM_DATA = {

    id: "Horizontal Moving Platforms",
    spriteSheet: document.getElementById("moving_platform_sprite"),
    sourcePosition: Vector2.Zero,
    sourceDimensions: new Vector2(495, 75),
    rotation: 0,
    scale: new Vector2(0.5, 0.5),
    origin: Vector2.One,
    actorType: ActorType.Environment,
    collisionType: CollisionType.Collidable,
    layerDepth: 0,

    translationArray: [
      new Vector2(2880, 555),
      new Vector2(3700, 300),
    ]

  };
  
  // VERTICAL MOVING PLATFORMS

  static V_MOVING_PLATFORM_VELOCITY = 0.5; 

  static V_MOVING_PLATFORM_DATA = {

    id: "Vertical Moving Platforms",
    spriteSheet: document.getElementById("moving_platform_sprite"),
    sourcePosition: Vector2.Zero,
    sourceDimensions: new Vector2(495, 75),
    rotation: 0,
    scale: new Vector2(0.2, 0.2),
    origin: Vector2.One,
    actorType: ActorType.Environment,
    collisionType: CollisionType.Collidable,
    layerDepth: 0,

    translationArray: [
      new Vector2(4690, 330),
      new Vector2(5475, 350),
    ]

  };

  // END OF LEVEL SIGN
  
  static SIGN_WIDTH = 233;
  static SIGN_HEIGHT = 200;

  static SIGN_DATA = {

    id: "Sign",
    spriteSheet: document.getElementById("decorators_sprite_sheet"),
    sourcePosition: new Vector2(265, 48),
    sourceDimensions: new Vector2(this.SIGN_WIDTH, this.SIGN_HEIGHT),
    translation: new Vector2(5950, 235),
    rotation: 0,
    scale: new Vector2(0.43, 0.43),
    origin: Vector2.Zero,
    actorType: ActorType.Decorator,
    collisionType: CollisionType.Collidable,
    layerDepth: 5,

  };

  static HOUSE_WIDTH = 385;
  static HOUSE_HEIGHT = 340;

  static HOUSE_ANIMATION_DATA = {

    id: "House Animation Data",
    spriteSheet: document.getElementById("house_sprite_sheet"),

  // Animations
    takes: {

      // Animation 1
      "HouseAnim1": {

        frameRatePerSec: 2,

        // -1 = Loop forever
        //  0 = Run once (no loop)
        //  N = Loop N times
        maxLoopCount: -1,

        startFrameIndex: 0,
        endFrameIndex: 3,

        // Notice that I chose the largest of all the widths taken from the frames
        // array below
        boundingBoxDimensions: new Vector2(this.HOUSE_WIDTH, this.HOUSE_HEIGHT),

        frames: [

          // This list of rects just represent the positions
          // and dimension of each individual animation frame
          // on the sprite sheet
          new Rect(0, 11, this.HOUSE_WIDTH, this.HOUSE_HEIGHT),      // Animation frame 0
          new Rect(391, 11, this.HOUSE_WIDTH, this.HOUSE_HEIGHT),    // Animation frame 1
          new Rect(784, 11, this.HOUSE_WIDTH, this.HOUSE_HEIGHT),    // Animation frame 2
          new Rect(1181, 11, this.HOUSE_WIDTH, this.HOUSE_HEIGHT),   // Animation frame 3
        ]
      },
    }
  };
   
    static HEART_WIDTH = 315;
    static HEART_HEIGHT = 305;

    static HEART_ANIMATION_DATA = {

      id: "Heart Animation Data",
      spriteSheet: document.getElementById("pickups_sprite_sheet"),

      // Animations
      takes: {
  
        // Animation 1
        "Anim1": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(315, 305),
  
          frames: [
            new Rect(435, 304, this.HEART_WIDTH, this.HEART_HEIGHT),   // Animation frame 0
            new Rect(435, 0, this.HEART_WIDTH, this.HEART_HEIGHT),     // Animation frame 1
          ]
        },
      }
    };
    

    static DUCKLING_WIDTH = 185;
    static DUCKLING_HEIGHT = 330;

    static DUCKLING_ANIMATION_DATA = {

     
      id: "Duckling Animation Data",
      spriteSheet: document.getElementById("pickups_sprite_sheet"),

      // Animations
      takes: {
  
        // Animation 1
        "DucklingAnim1": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),
  
          frames: [
            new Rect(207, 0, this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),  // CLOSED BEAK
            new Rect(4, 0, this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),    // OPEN BEAK
          ]
        },

        // Animation 2
        "DucklingHUDAnim": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 0,
  
          boundingBoxDimensions: new Vector2(this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),
  
          frames: [
            new Rect(207, 0, this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),  // CLOSED BEAK
          ]
        },
      }
    };


    // BULLET
    static BULLET_WIDTH = 35;
    static BULLET_HEIGHT = 35;

    static FIRE_INTERVAL = 1500;
    static ENEMY_FIRE_INTERVAL = 2500;
    static BULLET_SPEED = 0.7;

    static BULLET_ANIMATION_DATA = {

        id: "Animated Bullet Sprite",
        spriteSheet: document.getElementById("bullet_sprite"),

        takes: {

          "Default": {
              frameRatePerSec: 2,
              maxLoopCount: -1,
              startFrameIndex: 0,
              endFrameIndex: 0,

              boundingBoxDimensions: new Vector2(this.BULLET_WIDTH, this.BULLET_HEIGHT),

              frames: [
                new Rect(0, 0, this.BULLET_WIDTH, this.BULLET_HEIGHT)
              ]
          },
        }
    };


    // PLAYER
    static JOE_START_POSITION = new Vector2(175, 422);              // START POS
    static JOE_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space, Keys.Q];    // MOVE KEYS
    static JOE_SHOOT_KEY = [Keys.S];                                // SHOOT KEY
    static JOE_RUN_VELOCITY = 0.1;                                  // SPEED
    static JOE_JUMP_VELOCITY = 0.5;                                 // JUMP SPEED

    // DIMENSIONS
    static PLAYER1_WIDTH = 245;
    static PLAYER1_HEIGHT = 266;

    static JOE_ANIMATION_DATA = {

      id: "Joe Animation Data",
      spriteSheet: document.getElementById("joe_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Moving Right": {
  
          frameRatePerSec: 2,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(1255, 534, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),    // Animation frame 0
            new Rect(250, 534, 214, this.PLAYER1_HEIGHT),                    // Animation frame 1
          ]
        },

        // Animation 2
        "Moving Left": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),
  
          frames: [
            new Rect(0, 1334, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),       // Animation frame 0
            new Rect(1018, 1334, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),    // Animation frame 1
          ]
        },

        // Animation 3
        "Shooting Right": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(255, 265),
  
          frames: [
            new Rect(231, -1, 255, 266),    // Animation frame 0
            new Rect(989, -1, 250, 266),    // Animation frame 1
          ]
        },

        // Animation 4
        "Shooting Left": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(1014, 800, 255, 291),    // Animation frame 0
            new Rect(261, 800, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 5
        "Jumping Left": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(1270, 1334, 255, 291),    // Animation frame 0
            new Rect(525, 1334, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 6
        "Jumping Right": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(0, 0, 255, 291),       // Animation frame 0
            new Rect(769, 0, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 7
        "Right Quack": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(255, 265),
  
          frames: [
            new Rect(993, 534, 255, 265),     // Animation frame 0
            new Rect(1134, 265, 250, 265),    // Animation frame 1
          ]
        },

        // Animation 8
        "Left Quack": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(255, 265),
  
          frames: [
            new Rect(257, 1335, 255, 265),     // Animation frame 0
            new Rect(146, 1067, 250, 265),     // Animation frame 1
          ]
        },
      }
    };

    static JACKIE_START_POSITION = new Vector2(30, 410);                                        // START POS
    static JACKIE_MOVE_KEYS = [Keys.ArrowLeft, Keys.ArrowRight, Keys.ArrowUp, Keys.Numpad1];    // MOVE KEYS
    static JACKIE_SHOOT_KEY = [Keys.Numpad0];                                                   // SHOOT KEY
    static JACKIE_RUN_VELOCITY = 0.1;                                                           // SPEED
    static JACKIE_JUMP_VELOCITY = 0.5;                                                          // JUMP SPEED

    // PLAYER 2 DIMENSIONS
    static PLAYER2_WIDTH = 245;
    static PLAYER2_HEIGHT = 291;

    static JACKIE_ANIMATION_DATA = {

      id: "Jackie Animation Data",
      spriteSheet: document.getElementById("jackie_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Moving Right": {
 
          frameRatePerSec: 2,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(this.PLAYER2_WIDTH, 289),
          
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(0, 609, this.PLAYER2_WIDTH, this.PLAYER2_HEIGHT),    // Animation frame 0
            new Rect(1285, 609, 216, this.PLAYER2_HEIGHT),                // Animation frame 1
          ]
        },

        // Animation 2
        "Moving Left": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(this.PLAYER2_WIDTH, this.PLAYER2_HEIGHT),
  
          frames: [
            new Rect(1255, 1510, this.PLAYER2_WIDTH, this.PLAYER2_HEIGHT),       // Animation frame 0
            new Rect(-20, 1510, this.PLAYER2_WIDTH, this.PLAYER2_HEIGHT),        // Animation frame 1
          ]
        },

        // Animation 3
        "Shooting Right": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(255, 291),
  
          frames: [
            new Rect(764, 610, 255, 291),    // Animation frame 0
            new Rect(1250, 0, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 4
        "Shooting Left": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(481, 1510, 255, 291),    // Animation frame 0
            new Rect(0, 1510, 255, 291),      // Animation frame 1
          ]
        },

        // Animation 5
        "Jumping Left": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(226, 1510, 255, 291),      // Animation frame 0
            new Rect(1025, 1510, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 6
        "Jumping Right": {
          
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,

          boundingBoxDimensions: new Vector2(255, 291),

          frames: [
            new Rect(1044, 610, 255, 291),    // Animation frame 0
            new Rect(272, 610, 255, 291),     // Animation frame 1
          ]
        },

        // Animation 7
        "Right Quack": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(249, 290),
  
          frames: [
            new Rect(410, 305, 249, 290),     // Animation frame 0
            new Rect(750, 0, 220, 289),       // Animation frame 1
          ]
        },

        // Animation 8
        "Left Quack": {
  
          frameRatePerSec: 2,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 1,
  
          boundingBoxDimensions: new Vector2(249, 290),
  
          frames: [
            new Rect(840, 1205, 249, 290),      // Animation frame 0
            new Rect(530, 901, 220, 289),       // Animation frame 1
          ]
        },
      }
    };

    // HUNTER ENEMY ONE
    static HUNTER_START_POSITION = new Vector2(1800, 381);      // START POS
    static HUNTER_RUN_VELOCITY = 0.8;                           // SPEED

    // DIMENSIONS
    static HUNTER_WIDTH = 270;
    static HUNTER_HEIGHT = 290;

    static HUNTER_ANIMATION_DATA = {

      id: "Hunter Animation Data",
      spriteSheet: document.getElementById("hunters_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Moving Left": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,

          boundingBoxDimensions: new Vector2(this.HUNTER_WIDTH, this.HUNTER_HEIGHT),
  
          frames: [
            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 0
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 1

            new Rect(830, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 2
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 3

            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 4
            new Rect(555, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 5
            
            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 6
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 7

            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 8
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 9

            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 10
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 11

            new Rect(0, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 12
            new Rect(276, 303, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),  // Animation frame 13
          ]
        },

        // Animation 2
        "Moving Right": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,

          boundingBoxDimensions: new Vector2(this.HUNTER_WIDTH, this.HUNTER_HEIGHT),
  
          frames: [
            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 0
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 1

            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 2
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 3

            new Rect(0, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 4
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 5
            
            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 6
            new Rect(275, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 7

            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 8
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 9

            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 10
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 11

            new Rect(830, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 12
            new Rect(554, 1223, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 13
          ]
        },
      }
    };

    // HUNTER ENEMY TWO
    static HUNTER2_START_POSITION = new Vector2(3100, 126);
    
    static HUNTER2_ANIMATION_DATA = {

      id: "Hunter2 Animation Data",
      spriteSheet: document.getElementById("hunters_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Moving Left": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,
  
          boundingBoxDimensions: new Vector2(270, 290),
  
          frames: [
            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 0
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 1

            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 2
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 3

            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 4
            new Rect(551, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 5

            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 6
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 7

            new Rect(277, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 8
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 9

            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 10
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 11

            new Rect(0, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 12
            new Rect(830, 0, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 13
         
          ]
        },

        // Animation 2
        "Moving Right": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,
  
          boundingBoxDimensions: new Vector2(270, 290),
  
          frames: [
            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 0
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 1

            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 2
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 3

            new Rect(554, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 4
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 5

            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 6
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 7

            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 8
            new Rect(278, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 9

            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 10
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 11

            new Rect(830, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 12
            new Rect(0, 919, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 13
         
          ]
        },
      }
    };

    // HUNTER 3
    static HUNTER3_START_POSITION = new Vector2(4100, 381);      // START POS
    static HUNTER3_ANIMATION_DATA = {

      id: "Hunter3 Animation Data",
      spriteSheet: document.getElementById("hunters_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Moving Left": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,

          boundingBoxDimensions: new Vector2(270, 290),
  
          frames: [
            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 0
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 1

            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 2
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 3

            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 4
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 5

            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 6
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 7

            new Rect(280, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 8
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 9

            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 10
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 11

            new Rect(556, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 12
            new Rect(830, 610, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 13
          ]
        },

        // Animation 1
        "Moving Right": {
  
          frameRatePerSec: 3,
          maxLoopCount: -1,
          startFrameIndex: 0,
          endFrameIndex: 13,

          boundingBoxDimensions: new Vector2(270, 290),
  
          frames: [
            new Rect(274, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 0
            new Rect(0, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 1

            new Rect(550, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 2
            new Rect(830, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 3

            new Rect(550, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 4
            new Rect(830, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 5

            new Rect(550, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 6
            new Rect(830, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 7

            new Rect(274, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 8
            new Rect(0, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 9

            new Rect(274, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 10
            new Rect(0, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 11

            new Rect(274, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),      // Animation frame 12
            new Rect(0, 1530, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),        // Animation frame 13
          ]
        },
      }
    };

  }
  
  const FontType = {
    InformationSmall: "12px Vanilla",
    InformationMedium: "18px Vanilla",
    InformationLarge: "24px Vanilla"
  };  