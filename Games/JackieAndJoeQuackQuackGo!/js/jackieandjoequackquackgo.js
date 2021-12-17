// CREATING HANDLE TO CANVAS
const canvas = document.getElementById("main_canvas");

// GET HANDLE TO CANVAS 2D CONTEXT
const context = canvas.getContext("2d");

/* CORE GAME LOOP CODE */

let gameTime;
let notificationCenter;

let cameraManager;
let objectManager;
let keyboardManager;
let mouseManager;
let soundManager;
let gameStateManager;
let menuManager;
let uiManager;

const debugMode = false;

function start() {

    //KEEP TRACK OF GAME TIME
    gameTime = new GameTime();

    //INITIALIZE ELEMENTS OF GAME
    initialize();

    // SHOWS MENU
    notificationCenter.notify(
        new Notification(
            NotificationType.Menu,
            NotificationAction.ShowMenuChanged,
            [StatusType.Off]
        )
    );

    //START GAME LOOP
    window.requestAnimationFrame(animate);
}

function animate(now) {

    //UPDATE GAME TIME
    gameTime.update(now);

    //UPDATE GAME
    update(gameTime);

    //RE-DRAW GAME
    draw(gameTime);

    //LOOP
    window.requestAnimationFrame(animate);
}

function update(gameTime) {

    //CALLING UPDATE METHOD OF OBJECT MANAGER CLASS
    //TO UPDATE SPRITES
    objectManager.update(gameTime);

    // CALL CLASS TO UPDATE GAME STATE
    gameStateManager.update(gameTime);

    // CALL MANAGER CLASS TO CHECK FOR MENU STATE CHANGES
    menuManager.update(gameTime);

    // CALL UPDATE METHOD FROM MENU MANAGER TO CHECK FOR MENU STATE CHANGES
    uiManager.update(gameTime);

    // CALL UPDATE FROM CAMERA MANAGER TO CHECK FOR UI STATE CHANGES
    cameraManager.update(gameTime);

    // IF IN DEBUG MODE
    if (debugMode) {

        // CALL UPDATE FROM DEBUG TO UPDATE DEBUG INFO
        debugDrawer.update(gameTime);
    }
    
}

function draw(gameTime) {

    // CLEAR THE CANVAS
    clearCanvas();

    // CALL DRAW METHOD FROM OBJECT MANAGER TI DRAW SPRITES
    objectManager.draw(gameTime);

    // ID DEBUG MODE
    if (debugMode) {

        // CALL UPDATE FROM DEBUG TO UPDATE DEBUG INFO
        debugDrawer.draw(gameTime);
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}


/** GAME SPECIFIC CODE BELOW */


function initialize() {

    initializeNotificationCenter();
    initializeManagers();
    initializeCameras();
    initializeSprites();

    // IF DEBUG MODE
    if (debugMode) {

        // CALL UPDATE FROM DEBUG TO UPDATE DEBUG INFO
        initializeDebugDrawer();
    }
}

function initializeNotificationCenter() {
    notificationCenter = new NotificationCenter();
}

function initializeManagers() {

    cameraManager = new CameraManager(
        "Camera Manager"
    );

    objectManager = new ObjectManager(
        "Object Manager",
        notificationCenter,
        context,
        StatusType.Drawn | StatusType.Updated,
        cameraManager
    );

    keyboardManager = new KeyboardManager(
        "Keyboard Manager"
    );

    mouseManager = new MouseManager(
        "Mouse Manager"
    );

    soundManager = new SoundManager(
        "Sound Manager",
        notificationCenter,
        GameData.AUDIO_CUE_ARRAY
    );

    gameStateManager = new MyGameStateManager(
        "Game State Manager",
        notificationCenter,
        100,                            // Initial player health
        36                              // Initial player ammo
    )

    menuManager = new MyMenuManager(
        "Menu Manager",
        notificationCenter,
        keyboardManager
    );

    uiManager = new MyUIManager(
        "UI Manager",
        notificationCenter,
        objectManager,
        mouseManager
    )
}

function initializeDebugDrawer() {

    debugDrawer = new DebugDrawer(
        "Debug Drawer",
        context,
        objectManager,
        cameraManager
    );
}

function initializeCameras() {

    let transform = new Transform2D(
        Vector2.Zero,
        0,
        Vector2.One,
        new Vector2(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2
        ),
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    let camera = new Camera2D(
        "Camera 1",
        transform,
        ActorType.Camera,
        StatusType.Updated
    );

    // You should extract the below variables used to construct the flight
    // camera controller class into a seperate constants file. There should
    // be very few magic variables/numbers in your code!

    // See more: 
    // https://stackoverflow.com/questions/47882/what-is-a-magic-number-and-why-is-it-bad

    camera.attachController(
        new FlightCameraController(
            keyboardManager,
            [
                Keys.Numpad4, Keys.Numpad6, Keys.Numpad7, Keys.Numpad9,
                Keys.Numpad8, Keys.Numpad2, Keys.Numpad5
            ],
            new Vector2(3, 0),
            Math.PI / 180,
            new Vector2(0.005, 0.005)
        )
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    initializeBackground();
    initializePlayer1();
    //initializePlayer2();
    initializePlatforms();
    initializeHearts();
    initializeDucklings();
    initializeHunters();

    initializeHUDJoeHead();
    initializeHUDJackieHead();
    initializeHUDDucklings();
    initializeOnScreenText();
    initializeJoesLives();
    initializeJackieLives();
}

function initializeBackground() {

    let transform;
    let artist;
    let sprite;

    artist = new ScrollingSpriteArtist(
        context,
        1,
        GameData.BACKGROUND_DATA.spriteSheet,
        GameData.BACKGROUND_DATA.sourcePosition,
        GameData.BACKGROUND_DATA.sourceDimensions,
        canvas.clientWidth,
        canvas.clientHeight
    );

    transform = new Transform2D(
        GameData.BACKGROUND_DATA.translation,
        GameData.BACKGROUND_DATA.rotation,
        GameData.BACKGROUND_DATA.scale,
        GameData.BACKGROUND_DATA.origin,
        new Vector2(
            canvas.clientWidth,
            canvas.clientHeight
        )
    );

    sprite = new Sprite(
        GameData.BACKGROUND_DATA.id,
        transform,
        GameData.BACKGROUND_DATA.actorType,
        GameData.BACKGROUND_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.BACKGROUND_DATA.scrollSpeedMultiplier
    );
    
    objectManager.add(sprite);
}

function initializeGround() {
    

    /* BOUNDING BOXES*/

    /* GROUND */

    let artist;
    let transform;
    let sprite = null;

    artist = new SpriteArtist(
        context,
        1,
        GameData.GROUND_DATA.spriteSheet,
        GameData.GROUND_DATA.sourcePosition,
        GameData.GROUND_DATA.sourceDimensions
    );

    transform = new Transform2D(
        GameData.GROUND_DATA.translation,
        GameData.GROUND_DATA.rotation,
        GameData.GROUND_DATA.scale,
        GameData.GROUND_DATA.origin,
        GameData.GROUND_DATA.sourceDimensions,
    );

    sprite = new Sprite(
        GameData.GROUND_DATA.id,
        transform,
        GameData.GROUND_DATA.actorType,
        GameData.GROUND_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.GROUND_DATA.scrollSpeedMultiplier,
        GameData.GROUND_DATA.layerDepth
    );

    // Add to object manager
    objectManager.add(sprite);
}

function initializePlatforms() {

    let artist;
    let transform;

    let spriteArchetype;
    let spriteClone = null;

    artist = new SpriteArtist(
        context,
        1,
        GameData.PLATFORM_DATA.spriteSheet,
        GameData.PLATFORM_DATA.sourcePosition,
        GameData.PLATFORM_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.PLATFORM_DATA.rotation,
        GameData.PLATFORM_DATA.scale,
        GameData.PLATFORM_DATA.origin,
        GameData.PLATFORM_DATA.sourceDimensions,
    );

    spriteArchetype = new Sprite(
        GameData.PLATFORM_DATA.id,
        transform,
        GameData.PLATFORM_DATA.actorType,
        GameData.PLATFORM_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.PLATFORM_DATA.scrollSpeedMultiplier,
        GameData.PLATFORM_DATA.layerDepth
    );

    // Check out the Constant.js file - it contains an object called
    // PLATFORM_DATA, which contains an array property called translationArray.
    // This translationArray simply contains a list of positions for where we
    // want to position the platforms on our screen. Take a look at this array
    // to understand more.
    for (let i = 0; i < GameData.PLATFORM_DATA.translationArray.length; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update id
        spriteClone.id = spriteClone.id + " " + i;

        // Update translation
        spriteClone.transform.setTranslation(GameData.PLATFORM_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(spriteClone);
    }
}


function initializeHearts() {
        

    /******************   HEARTS   *************************/

    let artist;
    let transform;

    let spriteArchetype = null;
    let spriteClone = null;

    artist = new AnimatedSpriteArtist(
        context,                                        // Context
        1,
        GameData.HEART_ANIMATION_DATA                   // Animation data
    );

    transform = new Transform2D(
        new Vector2(660, 370),                          // Translation
        0,                                              // Rotation
        new Vector2(
            0.2,
            0.2
        ),                                              // Scale
        Vector2.Zero,                                   // Origin
        artist.getBoundingBoxByTakeName("Anim1"),       // Dimensions
        0
    );

    spriteArchetype = new Sprite(
        "Heart",                                        // ID
        transform,
        ActorType.Pickup,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,                                              // Scroll speed multiplier
        1                                               // Layer depth
    );

    for (let i = 1; i <= 2; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        spriteClone.transform.translateBy(
            new Vector2(
                (i * 500),
                0
            )
        );

        // Set sprite take
        spriteClone.artist.setTake("Anim1");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}


function initializeDucklings() {

    /******************   DUCKLINGS  *************************/

    let artist;
    let transform;

    let spriteArchetype = null;
    let spriteClone = null;

    artist = new AnimatedSpriteArtist(
        context,                                            // Context
        1,
        GameData.DUCKLING_ANIMATION_DATA                    // Animation data
    );

    transform = new Transform2D(
        new Vector2(340, 456),                              // Translation
        0,                                                  // Rotation
        new Vector2(
            0.3,
            0.3
        ),                                                  // Scale
        Vector2.Zero,                                       // Origin
        artist.getBoundingBoxByTakeName("DucklingAnim1"),   // Dimensions
        0
    );

    spriteArchetype = new Sprite(
        "Duckling",                                         // ID
        transform,
        ActorType.Pickup,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,                                                  // Scroll speed multiplier
        1                                                   // Layer depth
    );

    for (let i = 1; i <= 2; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        spriteClone.transform.translateBy(
            new Vector2(
                (i * 200),
                0
            )
        );

        // Set sprite take
        spriteClone.artist.setTake("DucklingAnim1");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializePlayer1() {

    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.JOE_ANIMATION_DATA                             // Animation Data
    );

    // Set animation
    artist.setTake("Idle");

    transform = new Transform2D(
        GameData.JOE_START_POSITION,                            // Translation
        0,                                                      // Rotation
        new Vector2(
            0.5,
            0.5
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Idle"),                // Dimensions
        0                                                       // Explode By
    );

    sprite = new MoveableSprite(
        "Player",                                               // ID
        transform,                                              // Transform
        ActorType.Player,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    // Set characteristics of the body attached to the moveable sprite
    // Play around with these values and see what happens.
    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Weak;

    
    sprite.attachController(
        new PlayerMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.JOE_MOVE_KEYS,
            GameData.JOE_RUN_VELOCITY,
            GameData.JOE_JUMP_VELOCITY
        )
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}

function initializePlayer2() {


}

function initializeHunters() {

    let transform;
    let artist;
    let sprite;

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.HUNTER_ANIMATION_DATA                             // Animation Data
    );

    // Set animation
    artist.setTake("HunterAnim1Left");

    transform = new Transform2D(
        GameData.HUNTER_START_POSITION,                            // Translation
        0,                                                      // Rotation
        new Vector2(
            0.6,
            0.6
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("HunterAnim1Left"),                // Dimensions
        0                                                       // Explode By
    );

    sprite = new MoveableSprite(
        "Enemy",                                               // ID
        transform,                                              // Transform
        ActorType.Enemy,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    // Set characteristics of the body attached to the moveable sprite
    // Play around with these values and see what happens.
    sprite.body.maximumSpeed = 6;
    sprite.body.friction = FrictionType.Low;
    sprite.body.gravity = GravityType.Weak;

    // TO DO: Add other controllers 
    // Add bee move controller...
    // Add bee shoot controller...

    // Add enemy to object manager
    objectManager.add(sprite);
}



/****************  HUD ITEMS  *******************/

const uiSpriteSheet = document.getElementById("hud_sprite_sheet");

function initializeHUDJoeHead() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(20, 20),
        0,
        new Vector2(
            7,
            7
        ),   
        new Vector2(10, 10),
        new Vector2(10, 10),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        Vector2.Zero,                                   // Source Position
        new Vector2(83, 89),                            // Source Dimension
        
        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                                            // Fixed Position
    );

    sprite = new Sprite(
        "JoeHead",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to the object manager
    objectManager.add(sprite);
    
}

function initializeHUDJackieHead() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(20, 20),
        0,
        new Vector2(
            7,
            7
        ),                                              // Scale
        new Vector2(-170, 15),
        new Vector2(10, 10),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        new Vector2(182, 0),                                   // Source Position
        new Vector2(88, 95),                            // Source Dimension
        
        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                                            // Fixed Position
    );

    sprite = new Sprite(
        "JackieHead",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to the object manager
    objectManager.add(sprite);
    
}

function initializeHUDDucklings() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(20, 20),
        0,
        new Vector2(
            4.5,
            4.5
        ),                                              // Scale
        new Vector2(-770, 10),
        new Vector2(40, 20),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        new Vector2(0, 108),                            // Source Position
        new Vector2(270, 122),                          // Source Dimension
        
        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                                            // Fixed Position
    );

    sprite = new Sprite(
        "DucklingsHUD",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to the object manager
    objectManager.add(sprite);
    
}

function initializeOnScreenText() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(
            (canvas.clientWidth / 2 - 40), 
            10
        ),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "Go, Joe, go!",                  // Text
        FontType.InformationMedium,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width

        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                            // Fixed Position
    );

    sprite = new Sprite(
        "Text UI Info",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}

function initializeJoesLives() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(90, 35),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "x03",                          // LIVES
        FontType.InformationLarge,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width

        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                            // Fixed Position
    );

    sprite = new Sprite(
        "Text UI Info",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}

function initializeJackieLives() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(280, 35),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "x04",                          // LIVES
        FontType.InformationLarge,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width

        // Set this to true if you want the sprite to stay in one
        // position on the screen (i.e., the sprite WON'T scroll
        // off-screen if the camera moves right or left).

        // Set this to false if you want the sprite to move with
        // the world (i.e., the sprite WILL scroll off-screen when
        // the camera moves to the right or to the left.

        true                            // Fixed Position
    );

    sprite = new Sprite(
        "Text UI Info",
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,
        1
    );

    // Add sprite to object manager
    objectManager.add(sprite);
}


function resetGame() {
    
    clearCanvas();
    startGame();
}

window.addEventListener("load", start);