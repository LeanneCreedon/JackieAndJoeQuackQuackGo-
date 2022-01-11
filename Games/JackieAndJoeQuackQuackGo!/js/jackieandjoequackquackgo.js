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
            NotificationAction.ShowMainMenu,
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
        3,                              // Initial player health
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

    /* Doesn't work as well as I wanted, I tried to have the camera reset centre on the player
       But I wasn't sure how to do it. So if it's awkward, just change the controlls back
       to the numpad buttons. */

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

    camera.attachController(
        new FlightCameraController(
            keyboardManager,
            [
                Keys.A, Keys.D, Keys.Numpad5
            ],
            new Vector2(4, 0),
        )
    );

    cameraManager.add(camera);
}

function initializeSprites() {

    initializeBackground();
    EmptyCollsionBoxWall();
    EmptyCollsionBoxCliff();

    initializePlayer1();
    initializePlayer2();
    initializePlatforms();
    initializeMovingPlatforms()
    initializeHearts();
    initializeDucklings();
    initializeHunters();

    initializeHUDJoeHead();
    initializeHUDJackieHead();
    initializeHUDDucklingsBox();
    initializeHUDDucklings();
    initializeHUDTimer();
    initializeJoesLives();
    initializeJackieLives();

    initializeOtherDecorations();
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

function initializeMovingPlatforms() {

    let artist;
    let transform;

    /************************ HORIZONTAL MOVING PLATFORMS ***************************/

    artist = new SpriteArtist(
        context,
        1,
        GameData.H_MOVING_PLATFORM_DATA.spriteSheet,
        GameData.H_MOVING_PLATFORM_DATA.sourcePosition,
        GameData.H_MOVING_PLATFORM_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.H_MOVING_PLATFORM_DATA.rotation,
        GameData.H_MOVING_PLATFORM_DATA.scale,
        GameData.H_MOVING_PLATFORM_DATA.origin,
        GameData.H_MOVING_PLATFORM_DATA.sourceDimensions,
    );

    let platformSpriteH = new MoveableSprite(
        GameData.H_MOVING_PLATFORM_DATA.id,
        transform,
        GameData.H_MOVING_PLATFORM_DATA.actorType,
        GameData.H_MOVING_PLATFORM_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.H_MOVING_PLATFORM_DATA.scrollSpeedMultiplier,
        GameData.H_MOVING_PLATFORM_DATA.layerDepth
    );

    platformSpriteH.attachController(
        new CycleMoveController(
            new Vector2(1, 0),
            710,
            0,
            GameData.H_MOVING_PLATFORM_VELOCITY
        )
    );

    for (let i = 0; i < GameData.H_MOVING_PLATFORM_DATA.translationArray.length; i++) {

        // Clone sprite
        platformSpriteHClone = platformSpriteH.clone();

        // Update id
        platformSpriteHClone.id = platformSpriteHClone.id + " " + i;

        // Update translation
        platformSpriteHClone.transform.setTranslation(GameData.H_MOVING_PLATFORM_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(platformSpriteHClone);
    }

    /************************ VERTICAL MOVING PLATFORMS ***************************/
    
    artist = new SpriteArtist(
        context,
        1,
        GameData.V_MOVING_PLATFORM_DATA.spriteSheet,
        GameData.V_MOVING_PLATFORM_DATA.sourcePosition,
        GameData.V_MOVING_PLATFORM_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.V_MOVING_PLATFORM_DATA.rotation,
        GameData.V_MOVING_PLATFORM_DATA.scale,
        GameData.V_MOVING_PLATFORM_DATA.origin,
        GameData.V_MOVING_PLATFORM_DATA.sourceDimensions,
    );

    let platformSpriteV = new MoveableSprite(
        GameData.V_MOVING_PLATFORM_DATA.id,
        transform,
        GameData.V_MOVING_PLATFORM_DATA.actorType,
        GameData.V_MOVING_PLATFORM_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.V_MOVING_PLATFORM_DATA.scrollSpeedMultiplier,
        GameData.V_MOVING_PLATFORM_DATA.layerDepth
    );

    platformSpriteV.attachController(
        new CycleMoveController(
            new Vector2(0, 1),
            200,
            0,
            GameData.V_MOVING_PLATFORM_VELOCITY
        )
    );

    for (let i = 0; i < GameData.V_MOVING_PLATFORM_DATA.translationArray.length; i++) {

        // Clone sprite
        platformSpriteVClone = platformSpriteV.clone();

        // Update id
        platformSpriteVClone.id = platformSpriteVClone.id + " " + i;

        // Update translation
        platformSpriteVClone.transform.setTranslation(GameData.V_MOVING_PLATFORM_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(platformSpriteVClone);
    }
}

function EmptyCollsionBoxWall()
{
    let artist;
    let transform;

    artist = new SpriteArtist(
        context,
        1,
        GameData.WALL_COLLISION_BOX_DATA.spriteSheet,
        GameData.WALL_COLLISION_BOX_DATA.sourcePosition,
        GameData.WALL_COLLISION_BOX_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.WALL_COLLISION_BOX_DATA.rotation,
        GameData.WALL_COLLISION_BOX_DATA.scale,
        GameData.WALL_COLLISION_BOX_DATA.origin,
        GameData.WALL_COLLISION_BOX_DATA.sourceDimensions,
    );

    let collisionBoxSprite = new MoveableSprite(
        GameData.WALL_COLLISION_BOX_DATA.id,
        transform,
        GameData.WALL_COLLISION_BOX_DATA.actorType,
        GameData.WALL_COLLISION_BOX_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.WALL_COLLISION_BOX_DATA.scrollSpeedMultiplier,
        GameData.WALL_COLLISION_BOX_DATA.layerDepth
    );

    for (let i = 0; i < GameData.WALL_COLLISION_BOX_DATA.translationArray.length; i++) {

        // Clone sprite
        collisionBoxSpriteClone = collisionBoxSprite.clone();

        // Update id
        collisionBoxSpriteClone.id = collisionBoxSpriteClone.id + " " + i;

        // Update translation
        collisionBoxSpriteClone.transform.setTranslation(GameData.WALL_COLLISION_BOX_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(collisionBoxSpriteClone);
    }
}

function EmptyCollsionBoxCliff()
{
    let artist;
    let transform;

    artist = new SpriteArtist(
        context,
        1,
        GameData.CLIFF_COLLISION_BOX_DATA.spriteSheet,
        GameData.CLIFF_COLLISION_BOX_DATA.sourcePosition,
        GameData.CLIFF_COLLISION_BOX_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.CLIFF_COLLISION_BOX_DATA.rotation,
        GameData.CLIFF_COLLISION_BOX_DATA.scale,
        GameData.CLIFF_COLLISION_BOX_DATA.origin,
        GameData.CLIFF_COLLISION_BOX_DATA.sourceDimensions,
    );

    let collisionBoxSprite = new MoveableSprite(
        GameData.CLIFF_COLLISION_BOX_DATA.id,
        transform,
        GameData.CLIFF_COLLISION_BOX_DATA.actorType,
        GameData.CLIFF_COLLISION_BOX_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.CLIFF_COLLISION_BOX_DATA.scrollSpeedMultiplier,
        GameData.CLIFF_COLLISION_BOX_DATA.layerDepth
    );

    for (let i = 0; i < GameData.CLIFF_COLLISION_BOX_DATA.translationArray.length; i++) {

        // Clone sprite
        collisionBoxSpriteClone = collisionBoxSprite.clone();

        // Update id
        collisionBoxSpriteClone.id = collisionBoxSpriteClone.id + " " + i;

        // Update translation
        collisionBoxSpriteClone.transform.setTranslation(GameData.CLIFF_COLLISION_BOX_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(collisionBoxSpriteClone);
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
        new Vector2(880, 140),                          // Translation
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

    for (let i = 1; i <= 3; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        if(i==1 || i==3)
        {
            spriteClone.transform.translateBy(
                new Vector2(
                    (i * 1100),
                    0
                )
            );
        }
        else
        {
            spriteClone.transform.translateBy(
                new Vector2(
                    (i * 1225),
                    (i + 240)
                )
            );
        }

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
        new Vector2(670, 201),                              // Translation
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

    for (let i = 1; i <= 3; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        if(i==1)
        {
            spriteClone.transform.translateBy(
                new Vector2(
                    (i - 550),
                    (i - 17)
                )
            );
        }
        if(i==2)
        {
            spriteClone.transform.translateBy(
                new Vector2(
                    (i * 1330),
                    (i + 1)
                )
            );
        }
        else
        {
            spriteClone.transform.translateBy(
                new Vector2(
                    (i * 1530),
                    (i + 273)
                )
            );
        }
        

        // Set sprite take
        spriteClone.artist.setTake("DucklingAnim1");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}

function initializePlayer1() {

    let transform;
    let artist;
    
    /*************************************** BULLET ***************************************/

    artist = new AnimatedSpriteArtist(
        context,                                    // Context
        1,                                          // Alpha
        GameData.BULLET_ANIMATION_DATA              // Animation data
    );

    artist.setTake("Default");

    transform = new Transform2D(
        Vector2.Zero,                               // Translation
        0,                                          // Rotation
        new Vector2(
            0.4,
            0.4
        ),                                             // Scale

        // Origin - 
        // ISSUE: BULLET CAUSING PROBEMS WHEN I TRY TO SHOOT IT FROM CENTER OF PLAYER
        new Vector2(
            GameData.BULLET_WIDTH / 2,
            GameData.BULLET_HEIGHT / 2
        ),     

        artist.getBoundingBoxByTakeName("Default"),    // Dimensions
        0                                              // Explode
    );

    let bulletSprite = new Sprite(
        "Bullet",                               // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.Projectile,                   // Projectile
        CollisionType.Collidable,               // CollisionType
        StatusType.Off,                         // Set this to off initially (we will change this later)
        artist,                                 // Artist (Set up above)
        1,
        1
    );

    // Attach bullet controller to the bullet sprite
    bulletSprite.attachController(
        new BulletMoveController(
            notificationCenter,
            objectManager,
            Vector2.Right, // UNSURE HOW TO SHOOT RIGHT/LEFT DEPENDING ON WHICH DIRECTION THE PLAYER IS FACING
            GameData.BULLET_SPEED
        )
    );


    /*************************************** PLAYER ***************************************/

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.JOE_ANIMATION_DATA                             // Animation Data
    );

    // Set animation
    artist.setTake("Moving Right");

    transform = new Transform2D(
        GameData.JOE_START_POSITION,                            // Translation
        0,                                                      // Rotation
        new Vector2(
            0.5,
            0.5
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Moving Right"),                // Dimensions
        0                                                       // Explode By
    );

    let playerSprite = new MoveableSprite(
        "Joe",                                                  // ID
        transform,                                              // Transform
        ActorType.Player,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    playerSprite.body.maximumSpeed = 6;
    playerSprite.body.friction = FrictionType.Low;
    playerSprite.body.gravity = GravityType.Weak;

    
    playerSprite.attachController(
        new PlayerMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.JOE_MOVE_KEYS,
            GameData.JOE_RUN_VELOCITY,
            GameData.JOE_JUMP_VELOCITY
        )
    );

    playerSprite.attachController(
        new PlayerShootController(
            notificationCenter,
            objectManager,
            keyboardManager,
            bulletSprite,
            GameData.JOE_SHOOT_KEY,
            GameData.FIRE_INTERVAL
        )
    );

    // Add sprite to object manager
    objectManager.add(playerSprite);
}

function initializePlayer2() {

    let transform;
    let artist;

    /*************************************** BULLET ***************************************/

    artist = new AnimatedSpriteArtist(
        context,                                    // Context
        1,                                          // Alpha
        GameData.BULLET_ANIMATION_DATA              // Animation data
    );

    artist.setTake("Default");

    transform = new Transform2D(
        Vector2.Zero,                               // Translation
        0,                                          // Rotation
        new Vector2(
            0.4,
            0.4
        ),                                              // Scale
        Vector2.One,                                    // Origin
        artist.getBoundingBoxByTakeName("Default"),     // Dimensions
        0                                               // Explode
    );

    let bulletSprite = new Sprite(
        "Bullet",                               // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.Projectile,                   // Projectile
        CollisionType.Collidable,               // CollisionType
        StatusType.Off,                         // Set this to off initially (we will change this later)
        artist,                                 // Artist (Set up above)
        1,
        1
    );

    // Attach bullet controller to the bullet sprite
    bulletSprite.attachController(
        new BulletMoveController(
            notificationCenter,
            objectManager,
            Vector2.Right,
            GameData.BULLET_SPEED
        )
    );

    /*************************************** PLAYER 2 ***************************************/

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.JACKIE_ANIMATION_DATA                             // Animation Data
    );

    // Set animation
    artist.setTake("Moving Right");

    transform = new Transform2D(
        GameData.JACKIE_START_POSITION,                            // Translation
        0,                                                      // Rotation
        new Vector2(
            0.5,
            0.5
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Moving Right"),        // Dimensions
        0                                                       // Explode By
    );

    let player2Sprite = new MoveableSprite(
        "Jackie",                                               // ID
        transform,                                              // Transform
        ActorType.Player,                                       // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    player2Sprite.body.maximumSpeed = 6;
    player2Sprite.body.friction = FrictionType.Low;
    player2Sprite.body.gravity = GravityType.Weak;

    
    player2Sprite.attachController(
        new PlayerMoveController(
            notificationCenter,
            keyboardManager,
            objectManager,
            GameData.JACKIE_MOVE_KEYS,
            GameData.JACKIE_RUN_VELOCITY,
            GameData.JACKIE_JUMP_VELOCITY
        )
    );

    player2Sprite.attachController(
        new PlayerShootController(
            notificationCenter,
            objectManager,
            keyboardManager,
            bulletSprite,
            GameData.JACKIE_SHOOT_KEY,
            GameData.FIRE_INTERVAL
        )
    );

    // Add sprite to object manager
    objectManager.add(player2Sprite);

}

function initializeHunters() {

    let transform;
    let artist;

      /*************************************** BULLET ***************************************/

      artist = new AnimatedSpriteArtist(
        context,                                    // Context
        1,                                          // Alpha
        GameData.BULLET_ANIMATION_DATA              // Animation data
    );

    artist.setTake("Default");

    transform = new Transform2D(
        Vector2.Zero,                               // Translation
        0,                                          // Rotation
        new Vector2(
            0.4,
            0.4
        ),                                              // Scale
        new Vector2(
            GameData.HUNTER1_WIDTH/2,
            GameData.HUNTER1_WIDTH/2
        ),                                               // Origin
        artist.getBoundingBoxByTakeName("Default"),     // Dimensions
        0                                               // Explode
    );

    let bulletSprite = new Sprite(
        "Bullet",                               // Unique ID
        transform,                              // Transform (Set up above)
        ActorType.Projectile,                   // Projectile
        CollisionType.Collidable,               // CollisionType
        StatusType.Off,                         // Set this to off initially (we will change this later)
        artist,                                 // Artist (Set up above)
        1,
        1
    );

    // Attach bullet controller to the bullet sprite
    bulletSprite.attachController(
        new BulletMoveController(
            notificationCenter,
            objectManager,
            Vector2.Left,                   // AGAIN, MUST FIRE IN DIRECTION THAT ENEMY IS FACING
            GameData.BULLET_SPEED
        )
    );

    /************************** HUNTER ONE *************************/

    artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.HUNTER_ANIMATION_DATA                          // Animation Data
    );

    // Set animation
    artist.setTake("Moving Right");

    transform = new Transform2D(
        GameData.HUNTER_START_POSITION,                         // Translation
        0,                                                      // Rotation
        new Vector2(
            0.6,
            0.6
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Moving Right"),         // Dimensions
        0                                                       // Explode By
    );

    let hunter1 = new MoveableSprite(
        "Enemy",                                                // ID
        transform,                                              // Transform
        ActorType.Enemy,                                        // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    hunter1.body.maximumSpeed = 6;
    hunter1.body.friction = FrictionType.Low;
    hunter1.body.gravity = GravityType.Weak;

    // TO DO: Add other controllers 
    // Add bee move controller...
    // Add bee shoot controller...

    hunter1.attachController(
        new CycleMoveController(
            new Vector2(1, 0),
            200,
            0,
            Vector2.Zero
        )
    );

    // DOESN'T WORK. ENEMY SPRITE DISSAPEARS WHEN CONTROLLER ATTACHED

    // hunter1.attachController(
    //     new EnemyShootController(
    //         notificationCenter,
    //         objectManager,
    //         bulletSprite,
    //         GameData.ENEMY_FIRE_INTERVAL
    //     )
    // );

    // Add enemy to object manager
    objectManager.add(hunter1);


    /************************** HUNTER TWO *************************/

     artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.HUNTER2_ANIMATION_DATA                         // Animation Data
    );

    // Set animation
    artist.setTake("Moving Right");

    transform = new Transform2D(
        GameData.HUNTER2_START_POSITION,                        // Translation
        0,                                                      // Rotation
        new Vector2(
            0.6,
            0.6
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Moving Right"),         // Dimensions
        0                                                       // Explode By
    );

    let hunter2 = new MoveableSprite(
        "Enemy2",                                               // ID
        transform,                                              // Transform
        ActorType.Enemy,                                        // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    hunter2.body.maximumSpeed = 6;
    hunter2.body.friction = FrictionType.Low;
    hunter2.body.gravity = GravityType.Weak;

    // TO DO: Add other controllers 
    // Add bee move controller...
    // Add bee shoot controller...

    hunter2.attachController(
        new CycleMoveController(
            new Vector2(1, 0),
            400,
            0,
            Vector2.Zero
        )
    );

    // Add enemy to object manager
    objectManager.add(hunter2);


     /************************** HUNTER THREE *************************/

     artist = new AnimatedSpriteArtist(
        context,                                                // Context
        1,                                                      // Alpha
        GameData.HUNTER3_ANIMATION_DATA                         // Animation Data
    );

    // Set animation
    artist.setTake("Moving Left");

    transform = new Transform2D(
        GameData.HUNTER3_START_POSITION,                        // Translation
        0,                                                      // Rotation
        new Vector2(
            0.6,
            0.6
        ),                                                      // Scale
        Vector2.Zero,                                           // Origin
        artist.getBoundingBoxByTakeName("Moving Left"),         // Dimensions
        0                                                       // Explode By
    );

    let hunter3 = new MoveableSprite(
        "Enemy3",                                               // ID
        transform,                                              // Transform
        ActorType.Enemy,                                        // ActorType
        CollisionType.Collidable,                               // CollisionType
        StatusType.Updated | StatusType.Drawn,                  // StatusType
        artist,                                                 // Artist
        1,                                                      // ScrollSpeedMultipler
        1                                                       // LayerDepth
    );

    hunter3.body.maximumSpeed = 6;
    hunter3.body.friction = FrictionType.Low;
    hunter3.body.gravity = GravityType.Weak;

    // TO DO: Add other controllers 
    // Add bee move controller...
    // Add bee shoot controller...

    hunter3.attachController(
        new CycleMoveController(
            new Vector2(1, 0),
            405,
            0,
            Vector2.Zero
        )
    );

    // Add enemy to object manager
    objectManager.add(hunter3);
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
        new Vector2(-160, 15),
        new Vector2(10, 10),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        new Vector2(182, 0),                                   // Source Position
        new Vector2(88, 95),                            // Source Dimension
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

function initializeHUDDucklingsBox() {

    let transform;
    let artist;
    let sprite;

    transform = new Transform2D(
        new Vector2(800, 20), 
        0,
        new Vector2(
            0.6,
            0.6
        ),                                              // Scale
        Vector2.Zero,  
        new Vector2(270, 121),
        0
    );

    artist = new SpriteArtist(
        context,                                        // Context
        1,                                              // Alpha
        uiSpriteSheet,                                  // Spritesheet
        new Vector2(0, 109),                            // Source Position
        new Vector2(270, 121),                          // Source Dimension
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

function initializeHUDDucklings() {

    /******************   DUCKLINGS  *************************/

    let artist;
    let transform;

    let spriteArchetype = null;
    let spriteClone = null;

    artist = new AnimatedSpriteArtist(
        context,                                            // Context
        1,
        GameData.DUCKLING_ANIMATION_DATA, 
        true                                               // Animation data
    );

    transform = new Transform2D(
        new Vector2(759, 24.7),                             // Translation
        0,                                                  // Rotation
        new Vector2(                                        // Scale
            0.19,
            0.19
        ),
        Vector2.Zero,                                       // Origin
        Vector2.Zero,                                       // Dimensions
        0
    );

    spriteArchetype = new Sprite(
        "HUD Duckling",                                     // ID
        transform,
        ActorType.HUD,
        CollisionType.NotCollidable,
        StatusType.Off,
        artist,
        1,                                                  // Scroll speed multiplier
        1                                                   // Layer depth
    );

    for (let i = 1; i <= 3; i++) {

        // Clone sprite
        spriteClone = spriteArchetype.clone();

        // Update ID
        spriteClone.id = spriteClone.id + " " + i;

        // Translate sprite
        spriteClone.transform.translateBy(
            new Vector2(
                (i * 52),
                0
            )
        );

        // Set sprite take
        spriteClone.artist.setTake("DucklingHUDAnim");

        // Add to object manager
        objectManager.add(spriteClone);
    }
}


/**************************** TIMER ***************************/
// Help from this site : https://navaneeth.me/simple-countdown-timer-using-javascript/#.YddOpGjP2Ul

var timeoutHandle;
var timesUp = false;
var countDownTimer = 1;

function countdown(minutes) 
{
    var seconds = 60;
    var mins = minutes
    
    function tick() 
    {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);

        if( seconds > 0 ) 
        {
            timeoutHandle=setTimeout(tick, 1000);
        } 
        else 
        {
            if(mins > 1)
            {
                // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
                setTimeout(function () { countdown(mins - 1); }, 1000);
            }
        }
    }
    tick();
}

function initializeHUDTimer() {

    let transform;
    let artist;
    let sprite;

    /**************************** 'TIMER' TEXT ***************************/

    transform = new Transform2D(
        new Vector2(818, 110),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "Time: ",                       // Text
        FontType.InformationMedium,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        300,                            // Max Width
        true                            // Fixed Position
    );

    sprite = new Sprite(
        "Timer Text",
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
        "x0" + gameStateManager.joeHealth,                          // LIVES
        FontType.InformationLarge,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width
        true                            // Fixed Position
    );

    sprite = new Sprite(
        "JoeLives",
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
        new Vector2(265, 35),
        0,
        Vector2.One,
        Vector2.Zero,
        Vector2.Zero,
        0
    );

    artist = new TextSpriteArtist(
        context,                        // Context
        1,                              // Alpha
        "x0"+gameStateManager.jackieHealth,                          // LIVES
        FontType.InformationLarge,     // Font Type
        Color.Black,                    // Color
        TextAlignType.Left,             // Text Align
        200,                            // Max Width
        true                            // Fixed Position
    );

    sprite = new Sprite(
        "JackieLives",
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

function initializeOtherDecorations()
{

    /************************ BOXS *******************/

    let artist;
    let transform;
    let boxSpriteClone = null;

    artist = new SpriteArtist(
        context,
        1,
        GameData.BOX_DATA.spriteSheet,
        GameData.BOX_DATA.sourcePosition,
        GameData.BOX_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.BOX_DATA.rotation,
        GameData.BOX_DATA.scale,
        GameData.BOX_DATA.origin,
        GameData.BOX_DATA.sourceDimensions,
    );

    let boxSprite = new Sprite(
        GameData.BOX_DATA.id,
        transform,
        GameData.BOX_DATA.actorType,
        GameData.BOX_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.BOX_DATA.scrollSpeedMultiplier,
        GameData.BOX_DATA.layerDepth
    );

    for (let i = 0; i < GameData.BOX_DATA.translationArray.length; i++) {

        // Clone sprite
        boxSpriteClone = boxSprite.clone();

        // Update id
        boxSpriteClone.id = boxSpriteClone.id + " " + i;

        // Update translation
        boxSpriteClone.transform.setTranslation(GameData.BOX_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(boxSpriteClone);
    }


    /************************ HOUSE ***********************/
    // GOAL: When collided with, will play win sound and
    // then a delay before the win screen pops up 

    artist = new AnimatedSpriteArtist(
        context,                                        // Context
        1,
        GameData.HOUSE_ANIMATION_DATA                   // Animation data
    );

    artist.setTake("HouseAnim1");

    transform = new Transform2D(
        new Vector2(6100, -14),                          // Translation
        0,                                              // Rotation
        Vector2.One,                                    // Scale
        Vector2.Zero,                                   // Origin
        artist.getBoundingBoxByTakeName("HouseAnim1"),  // Dimensions
        0
    );

    let houseSprite = new Sprite(
        "House",                                        // ID
        transform,
        ActorType.Decorator,
        CollisionType.Collidable,
        StatusType.Updated | StatusType.Drawn,
        artist,
        1,                                              // Scroll speed multiplier
        1                                               // Layer depth
    );

    objectManager.add(houseSprite);


    /************************** SIGN ****************************/ 

    artist = new SpriteArtist(
        context,
        1,
        GameData.SIGN_DATA.spriteSheet,
        GameData.SIGN_DATA.sourcePosition,
        GameData.SIGN_DATA.sourceDimensions
    );

    transform = new Transform2D(
        GameData.SIGN_DATA.translation,
        GameData.SIGN_DATA.rotation,
        GameData.SIGN_DATA.scale,
        GameData.SIGN_DATA.origin,
        GameData.SIGN_DATA.sourceDimensions,
    );

    let signSprite = new Sprite(
        GameData.SIGN_DATA.id,
        transform,
        GameData.SIGN_DATA.actorType,
        GameData.SIGN_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.SIGN_DATA.scrollSpeedMultiplier,
        GameData.SIGN_DATA.layerDepth
    );

    objectManager.add(signSprite);


    /****************** SPIKE TRAPS *******************/


    artist = new SpriteArtist(
        context,
        1,
        GameData.SPIKE_TRAP_DATA.spriteSheet,
        GameData.SPIKE_TRAP_DATA.sourcePosition,
        GameData.SPIKE_TRAP_DATA.sourceDimensions
    );

    transform = new Transform2D(
        Vector2.Zero,
        GameData.SPIKE_TRAP_DATA.rotation,
        GameData.SPIKE_TRAP_DATA.scale,
        GameData.SPIKE_TRAP_DATA.origin,
        GameData.SPIKE_TRAP_DATA.sourceDimensions,
    );

    let spikeTrapSprite = new Sprite(
        GameData.SPIKE_TRAP_DATA.id,
        transform,
        GameData.SPIKE_TRAP_DATA.actorType,
        GameData.SPIKE_TRAP_DATA.collisionType,
        StatusType.Updated | StatusType.Drawn,
        artist,
        GameData.SPIKE_TRAP_DATA.scrollSpeedMultiplier,
        GameData.SPIKE_TRAP_DATA.layerDepth
    );

    for (let i = 0; i < GameData.SPIKE_TRAP_DATA.translationArray.length; i++) {

        // Clone sprite
        spikeTrapSpriteClone = spikeTrapSprite.clone();

        // Update id
        spikeTrapSpriteClone.id = spikeTrapSpriteClone.id + " " + i;

        // Update translation
        spikeTrapSpriteClone.transform.setTranslation(GameData.SPIKE_TRAP_DATA.translationArray[i]);

        // Add to object manager
        objectManager.add(spikeTrapSpriteClone);
    }

}


function resetGame() {
    
    clearCanvas();
    start();
}

window.addEventListener("load", start);