/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class PlayerMoveController
 */
 class PlayerMoveController {

    constructor(
        notificationCenter,
        keyboardManager,
        objectManager,
        moveKeys,
        runVelocity,
        jumpVelocity
    ) {
        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;
        this.objectManager = objectManager;

        this.moveKeys = moveKeys;
        this.runVelocity = runVelocity;
        this.jumpVelocity = jumpVelocity;
    }

    update(gameTime, parent) {

        this.handleInput(gameTime, parent);
        this.applyForces(parent);
        this.checkCollisions(parent);
        this.applyInput(parent);
    }

    handleInput(gameTime, parent) {

        this.handleMove(gameTime, parent);
        this.handleJump(gameTime, parent);
    }

    handleMove(gameTime, parent) {

        // If the move left key is pressed
        if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {

            // Add velocity to begin moving player left
            parent.body.addVelocityX(-this.runVelocity * gameTime.elapsedTimeInMs);

            // Update the player's animation
            parent.artist.setTake("Moving Left");

            // CHECK QUACK
            if (this.keyboardManager.isKeyDown(this.moveKeys[3])) {

                // Update the player's animation
                parent.artist.setTake("Left Quack");

                // PLAY SOUND
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["sound_quack"]
                    )
                );
            }
        }

        // If the move right key is pressed
        else if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {

            // Add velocity to begin moving the player right
            parent.body.addVelocityX(this.runVelocity * gameTime.elapsedTimeInMs);

            // Update the player's animation
            parent.artist.setTake("Moving Right");

            // CHECK QUACK
            if (this.keyboardManager.isKeyDown(this.moveKeys[3])) {

                // Update the player's animation
                parent.artist.setTake("Right Quack");

                // PLAY SOUND
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["sound_quack"]
                    )
                );
            }
        }

    }

    handleJump(gameTime, parent) {

        // If the player is already jumping, or if the player is
        // not on the ground, then don't allow the player to jump
        if (parent.body.jumping || !parent.body.onGround) return;

        // If the jump key is pressed
        if (this.keyboardManager.isKeyDown(this.moveKeys[2])) {

            // Update body variables
            parent.body.jumping = true;
            parent.body.onGround = false;

            // Apply velocity to begin moving the player up
            // This gives the effect of jumping 
            parent.body.velocityY = -this.jumpVelocity * gameTime.elapsedTimeInMs;

            // Create a jump sound notification
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["sound_jump"]
                )
            );

        }
    }

    applyForces(parent) {

        // Apply basic physic forces to the
        // player sprite

        parent.body.applyGravity();
        parent.body.applyFriction();
    }

    checkCollisions(parent) {

        // Assume that the play is not on the ground - i.e., 
        // assume that they are falling. We will update this
        // value in handlePlatformCollision function if the
        // player is currently colliding with a platform that
        // is below them (i.e., if they are on the ground)
        parent.body.onGround = false;

        this.handlePlatformCollision(parent);
        this.handleFallenOffCliff(parent);
        this.handlePickupCollision(parent);
        this.handleEnemyCollision(parent);
        this.handleSpikeTrapCollision(parent);
        this.handleHouseCollision(parent);
    }

    handlePlatformCollision(parent) {

        // Get a list of all the platform sprites that are stored
        // within the object manager
        const platforms = this.objectManager.get(ActorType.Environment);

        // If platforms is null, exit the function
        if (platforms == null) return;

        // Loop through the list of platform sprites        
        for (let i = 0; i < platforms.length; i++) {

            // Store a reference to the current pickup sprite
            const platform = platforms[i];

            // Determine what type of collision has occured (if any)
            // Ultimately, if a collision has taken place, this function will 
            // return the direction at which that collision took place, 
            // otherwise, it will return null

            // e.g.
            // CollisionLocationType.Left       if the player has collided with a platform to the left
            // CollisionLocationType.Right      if the player has collided with a platform to the right
            // CollisionLocationType.Bottom     if the player has collided with a platform below
            // CollisionLocationType.Top        if the player has collided with a platform above
            // null                             if no collision has taken place

            let collisionLocationType = Collision.GetCollisionLocationType(
                parent,
                platform
            );

            // If the player has ran into a platform that is to the
            // left or to the right of them
            if (
                collisionLocationType === CollisionLocationType.Left ||
                collisionLocationType === CollisionLocationType.Right
            ) {

                // Reduce their horizontal velocity to 0, to stop them
                // from moving
                parent.body.velocityX = 0;
            }

            // If the player has landed on a platform
            else if (collisionLocationType === CollisionLocationType.Bottom) {

                // Update variables to represent their new state
                parent.body.onGround = true;
                parent.body.jumping = false;

            }

            // If the player has collided with a platform that is above
            // them
            else if (collisionLocationType === CollisionLocationType.Top) {

                // Update their velocity to move them downwards.
                // This will create a bounce effect, where it will look 
                // like the player is bouncing off the platform above
                parent.body.velocityY = 1;
            }
        }
    }

    handleFallenOffCliff(parent) {

        // Checking if player falls off cliff

        const cliffs = this.objectManager.get(ActorType.Cliff);
        if (cliffs == null) return;

        for (let i = 0; i < cliffs.length; i++) {

            const cliff = cliffs[i];

            if (parent.transform.boundingBox.intersects(cliff.transform.boundingBox))
            {
                // PLAYER DIES!
                notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.PlayerDeath,
                        [parent.id]
                    )
                );
            }
        }
    }

    handlePickupCollision(parent) {

        // Get a list of all the pickup sprites that are stored
        // within the object manager
        const pickups = this.objectManager.get(ActorType.Pickup);

        // If pickups is null, exit the function
        if (pickups == null) return;

        // Loop through the list of pickup sprites
        for (let i = 0; i < pickups.length; i++) {

            // Store a reference to the current pickup sprite
            const pickup = pickups[i];

            // We can use a simple collision check here to check if the player has collided
            // with the pickup sprite
            if (parent.transform.boundingBox.intersects(pickup.transform.boundingBox)) {

                // If the player has collided with a pickup, do something...

                // Create a notification that will ultimately remove
                // the pickup sprite

                // REMOVE PICKUP ITEM
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,
                        NotificationAction.Remove,
                        [pickup]
                    )
                );

                // Updated if statement from id === "Duckling" to id.includes("Duckling")
                // This is because the id for the duckling may be Duckling - Clone 1 (in which case, using === would not work)
                // Instead, we can use .includes to check if the id string includes the substring "Duckling" (in which case, "Duckling - Clone 1" does include the substring "Duckling")
                if (pickup.id.includes("Duckling")) {
                    // PLAY SOUND
                    this.notificationCenter.notify(
                        new Notification(
                            NotificationType.Sound,
                            NotificationAction.Play,
                            ["sound_duckling_quack"]
                        )
                    );

                    // I have also removed your UI code that was here
                    
                    // Instead, I have created a notification which will notify our game stayte manager of an inventory 
                    // event. In the game state manager, I will deal with adding the pickup to the inventory, and with
                    // sending a notification to update the UI

                    this.notificationCenter.notify(
                        new Notification(
                            NotificationType.GameState,
                            NotificationAction.Inventory,
                            [pickup]
                        )
                    );
                }

                // Also note that I've updated this if statement
                if (pickup.id.includes("Heart")) {

                    // PLAY SOUND
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.Sound,
                            NotificationAction.Play,
                            ["sound_health"]
                        )
                    );

                    // Create a new health notification. Pass through the ID of the player (i.e., Jackie or Joe), 
                    // along with how much health that you want to add or remove from them (either +1 or -1)

                    // Check out the handleHealth method of the game state manager class to see how this notification is handled

                    // ADD TO PLAYER HEALTH
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.GameState,
                            NotificationAction.Health,
                            [parent.id, 1]
                        )
                    );
                }

            }
        }
    }

    // This value needs to be set outside of the function, otherwise it will
    // be set to true every time the function is called. 
    initialEnemyCollision = true;
    
    handleEnemyCollision(parent) {
        
        // Get a list of all the enemy sprites that are stored within
        // the object mananger
        const enemies = this.objectManager.get(ActorType.Enemy);
        
        // If enemies is null, exit the function
        if (enemies == null) return;

        // Loop through the list of enemy sprites
        for (let i = 0; i < enemies.length; i++) {

            // Store a reference to the current enemy sprite
            const enemy = enemies[i];

            // We can use a simple collision check here to check if the player has collided
            // with the enemy sprite
            if (parent.transform.boundingBox.intersects(enemy.transform.boundingBox)) {

                // INITIAL COLLISION
                if (this.initialEnemyCollision) {

                    // PLAY SOUND
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.Sound,
                            NotificationAction.Play,
                            ["sound_gun"]
                        )
                    );

                    // Update health
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.GameState,
                            NotificationAction.Health,
                            [parent.id, -1]
                        )
                    );

                    this.initialEnemyCollision = false;
                }

                // Exit the function
                return;
            }
        }

        // If we reach this point in the code, then we must no longer be intersecting
        // with any enemy. So, we can set initial enemy collision back to true.

        // This is because we exit the function if we find an enemy that we are currently
        // intersecting with (meaning that we would not reach this line of code). In every
        // other case, we reach this line of code.
        
        this.initialEnemyCollision = true;
    }

    handleSpikeTrapCollision(parent) {

        // Get a list of all the spike trap sprites that are stored within
        // the object mananger
        const spikeTraps = this.objectManager.get(ActorType.SpikeTrap);
        
        // If spike trap is null, exit the function
        if (spikeTraps == null) return;

        // Loop through the list of spike trap sprites
        for (let i = 0; i < spikeTraps.length; i++) {

            // Store a reference to the current spike trap sprite
            const spikeTrap = spikeTraps[i];  

            //-----------------------------------------------------------
            let collisionLocationType = Collision.GetCollisionLocationType(
                parent,
                spikeTrap
            );

            // If the player has ran into a Spike trap that is to the
            // left or to the right of them
            if (
                collisionLocationType === CollisionLocationType.Left ||
                collisionLocationType === CollisionLocationType.Right
            ) {

                // Reduce their horizontal velocity to 0, to stop them
                // from moving
                parent.body.velocityX = 0;
            }

            // If the player has landed on a spike trap
            else if (collisionLocationType === CollisionLocationType.Bottom) {

                // Update variables to represent their new state
                parent.body.onGround = true;
                parent.body.jumping = false;

                notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.PlayerDeath,
                        [parent.id]
                    )
                );
                        
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["sound_spike"]
                    )
                );
            }
        }
    }

    playTuneOnce = true;

    handleHouseCollision(parent) {

        // Get a list of all the enemy sprites that are stored within
        // the object mananger
        const decorators = this.objectManager.get(ActorType.Decorator);
        
        // If house is null, exit the function
        if (decorators == null) return;

        for (let i = 0; i < decorators.length; i++) {

        // Store a reference to the current enemy sprite
        const house = decorators[i];

        if (parent.transform.boundingBox.intersects(house.transform.boundingBox)) {

            // If player collides with the house
            if (house.id.includes("House")) {   
            
                    if(this.playTuneOnce)
                    {
                        notificationCenter.notify(
                            new Notification(
                                NotificationType.Sound,
                                NotificationAction.Play,
                                ["sound_win"]
                            )
                        );
                        this.playTuneOnce=false;
                    }
                    
                    setTimeout(function() {
                        notificationCenter.notify(
                            new Notification(
                                NotificationType.Menu,
                                NotificationAction.ShowWinMenu,
                                [StatusType.Off]
                            )
                        ); 
                    }, 3000);
                }
            }
        }
    }
    
    applyInput(parent) {

        // If the player is on the ground
        if (parent.body.onGround) {

            // Then remove any y velocity
            parent.body.velocityY = 0;
        }

        // If the x velocity value is very small
        if (Math.abs(parent.body.velocityX) <= Body.MIN_SPEED) {

            // Then set the velocity to zero
            parent.body.velocityX = 0;
        }

        // If the y velocity value is very small
        if (Math.abs(parent.body.velocityY) <= Body.MIN_SPEED) {

            // Then set the velocity to zero
            parent.body.velocityY = 0;
        }

        // It is important that we 'Zero' velocity valuees which are
        // very small, otherwise, it is likely that there will always
        // be some velocity being applied to the physics object, which
        // is often desireable

        // Use the values of the player's velocity to update the
        // translation of the player sprite

        // This is where the velocity is actually applied to the
        // player sprite - if we removed the below code, then the 
        // player would never move.

        parent.transform.translateBy(
            new Vector2(
                parent.body.velocityX,
                parent.body.velocityY
            )
        );
    }

    equals(other) {

        // TO DO...
        throw "Not Yet Implemented";
    }

    toString() {

        // TO DO...
        throw "Not Yet Implemented";
    }

    clone() {

        // TO DO...
        throw "Not Yet Implemented";
    }
}