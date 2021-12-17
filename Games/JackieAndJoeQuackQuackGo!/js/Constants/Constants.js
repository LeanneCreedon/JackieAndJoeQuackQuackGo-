/*
 * Class to store all sprite data for jackie and joe quack quack go!
 
class SpriteData {


    // Player1 Sprite position on Sprite Sheet
    static PLAYER1_X = 1255;
    static PLAYER1_Y = 534;
    static PLAYER1_WIDTH = 245;
    static PLAYER1_HEIGHT = 266;

    static PLAYER2_X = 600;
    static PLAYER2_Y = 900;
    static PLAYER2_WIDTH = 245;
    static PLAYER2_HEIGHT = 290;

    static CANVAS_WIDTH = 980;
    static CANVAS_HEIGHT = 600;
    static CANVAS_MARGIN = 10;
 

}
class GameData {
    
    // Speed variables
    static PLAYER_SPEED = 0.2;
   
}
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
      new AudioCue("sound_lose", AudioType.Move, 1, 1, 0, false),
      new AudioCue("sound_win", AudioType.WinLose, 1, 1, 0, false)
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

    // static GROUND_DATA = {
    //   id: "Ground",
    //   spriteSheet: document.getElementById("ground_sprite"),
    //   sourcePosition: Vector2.Zero,
    //   sourceDimensions: Vector2.One,
    //   translation: new Vector2(70, 555),
    //   rotation: 0,
    //   scale: new Vector2(980, 50),
    //   origin: Vector2.Zero,
    //   actorType: ActorType.Environment,
    //   collisionType: CollisionType.Collidable,
    //   layerDepth: 0,
    // };
  
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
  
        // Floor
        new Vector2(0, 555),
        new Vector2(160, 555),
        new Vector2(320, 555),
        new Vector2(480, 555),
        new Vector2(640, 555),
        new Vector2(800, 555),
        new Vector2(960, 555),
        new Vector2(1280, 555),
        new Vector2(1440, 555),
        new Vector2(1600, 555),
        new Vector2(1760, 555),
        new Vector2(1920, 555),
        new Vector2(2080, 555),
        new Vector2(2240, 555),
  
      ]
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
  
          frameRatePerSec: 2,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 0,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(315, 305),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(435, 304, this.HEART_WIDTH, this.HEART_HEIGHT),    // Animation frame 2
          ]
        },
  
        // Animation 2
        "Anim2": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(245, 266),
  
          frames: [
            new Rect(1255, 534, this.HEART_WIDTH,this.HEART_HEIGHT),     // Animation frame 1
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
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 0,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(185, 330),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(190, 0, this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),    // Animation frame 2
          ]
        },
  
        // Animation 2
        "DucklingAnim2": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(185, 330),
  
          frames: [
            new Rect(190, 0, this.DUCKLING_WIDTH, this.DUCKLING_HEIGHT),     // Animation frame 1
          ]
        },
  
      }
    };


    static JOE_START_POSITION = new Vector2(115, 422);      //START POS
    static JOE_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space];    // MOVE KEYS
    static JOE_RUN_VELOCITY = 0.1;                          // SPEED
    static JOE_JUMP_VELOCITY = 0.5;                         // JUMP SPEED
    static PLAYER1_WIDTH = 245;
    static PLAYER1_HEIGHT = 266;

    static JOE_ANIMATION_DATA = {

      id: "Joe Animation Data",
      spriteSheet: document.getElementById("joe_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "Idle": {
  
          frameRatePerSec: 2,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 0,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(245, 266),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(1255, 534, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),    // Animation frame 2
          ]
        },
  
        // Animation 2
        "Run Left": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(245, 266),
  
          frames: [
            new Rect(1255, 534, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),     // Animation frame 1
          ]
        },
  
        // Animation 3
        "Run Right": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(245, 266),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
  
            new Rect(1255, 534, this.PLAYER1_WIDTH, this.PLAYER1_HEIGHT),   // Animation frame 1
          ]
        },
      }
    };
    
    static HUNTER_START_POSITION = new Vector2(850, 381);      //START POS
    static HUNTER_RUN_VELOCITY = 0.1;                          // SPEED
    static HUNTER_JUMP_VELOCITY = 0.5;                         // JUMP SPEED
    static HUNTER_WIDTH = 270;
    static HUNTER_HEIGHT = 289;

    static HUNTER_ANIMATION_DATA = {

      id: "Hunter Animation Data",
      spriteSheet: document.getElementById("hunters_sprite_sheet"),
  
      // Animations
      takes: {
  
        // Animation 1
        "HunterAnim1Left": {
  
          frameRatePerSec: 2,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 0,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(270, 289),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
            new Rect(0, 286, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),    // Animation frame 2
          ]
        },
  
        // Animation 2
        "HunterAnim2Left": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(270, 289),
  
          frames: [
            new Rect(0, 591, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),     // Animation frame 1
          ]
        },
  
        // Animation 3
        "HunterAnim1Right": {
  
          frameRatePerSec: 12,
  
          // -1 = Loop forever
          //  0 = Run once (no loop)
          //  N = Loop N times
          maxLoopCount: -1,
  
          startFrameIndex: 0,
          endFrameIndex: 8,
  
          // Notice that I chose the largest of all the widths taken from the frames
          // array below
          boundingBoxDimensions: new Vector2(270, 289),
  
          frames: [
  
            // This list of rects just represent the positions
            // and dimension of each individual animation frame
            // on the sprite sheet
  
            new Rect(0, 591, this.HUNTER_WIDTH, this.HUNTER_HEIGHT),   // Animation frame 1
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