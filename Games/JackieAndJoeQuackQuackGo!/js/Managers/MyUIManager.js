class MyUIManager extends UIManager {

    constructor(id, notificationCenter, objectManager, mouseManager) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.mouseManager = mouseManager;

        this.registerForNotifications();
    }

    registerForNotifications() {

        // When a 'ui' event fires, call the 'handleUINotification' function 
        // of 'this' object
        this.notificationCenter.register(
            NotificationType.UI,
            this,
            this.handleUINotification
        );
    }

    handleUINotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.Health:

                this.updateHealth(notification.notificationArguments);
                break;


            case NotificationAction.Inventory:

                // Pass through the argument (which in this case, is the id of the pickup sprite)
                this.updateInventory(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
    }

    updateHealth(argArray) {

        // Extract the values from the notification array
        const playerName = argArray[0];
        const playerHealth = argArray[1];

        // Get a list of all the HUD sprites in our object manager
        const hudSprites = this.objectManager.get(ActorType.HUD);

        // Loop through the HUD sprites
        for (let i = 0; i < hudSprites.length; i++) {

            // Grab a reference to the current HUD sprite
            const hudSprite = hudSprites[i];

            // Check if the ID of the HUD sprite includes the player name string
            // i.e., "JoeLives"
            if (hudSprite.id.includes(playerName + "Lives")) {

                // Update the sprite's TextArtist text
                hudSprite.artist.text = "x0" + playerHealth;
            }
        }
    }

    updateInventory(item) {

        // So, how do we link the duckling pickup to the duckling HUD sprite?
        // The easiest way to do this is to give these sprites a similar ID

        // For example, imagine that you have a duckling sprite called "Duckling - Clone 1",
        // and a HUD sprite called "HUD Duckling - Clone 1". In this case, the only difference 
        // between the two, is that the HUD sprite has the string "HUD" added to it. 

        // So, the string "Duckling - Clone 1" is a substring of "HUD Duckling - Clone 1".

        // Thus, we can use the ID of our pickup (i.e., "Duckling - Clone 1"), to link it with the 
        // matching HUD sprite (i.e., "HUD Duckling - Clone 1"), by checking if the pickup ID is a
        // subtring of the HUD ID. 

        // In which case,
        // "Duckling - Clone 1" matches with "HUD Duckling - Clone 1"
        // "Duckling - Clone 2" matches with "HUD Duckling - Clone 2"
        // "Duckling - Clone 3" matches with "HUD Duckling - Clone 3"
        // etc, etc.

        // In this case, it is important that we design our ID's so that they can easily match each other
        // For example "Duckling - Clone 1" would not match "Duckling HUD - Clone 1", because 
        // "Duckling - Clone 1" is not a substring of "Duckling HUD - Clone 1".

        // Get a list of all the HUD sprites in our object manager
        const hudSprites = this.objectManager.get(ActorType.HUD);

        // Loop through the HUD sprites
        for (let i = 0; i < hudSprites.length; i++) {

            // Grab a reference to the current HUD sprite
            const hudSprite = hudSprites[i];

            // Check if the ID of the HUD sprite includes the item string
            // Remember, the item string is the ID of the pickup
            if (hudSprite.id.includes(item)) {

                // Update the status of the HUD sprite
                hudSprite.statusType = StatusType.Updated | StatusType.Drawn;
            }
        }
    }

    /**
     * 
     * @param {GameTime} gameTime 
     */
    update(gameTime) {

        // The below code checks to see if the mouse has been clicked.
        // It then extracts all of the HUD sprites from the object manager.
        // Next, it loops through the list of HUD sprites, and checks to see 
        // if the mouse click took place on top of any HUD sprite. If so,
        // some action is performed.

        // For example, this will allow us to check if the user has clicked on 
        // the pause button.

        // If the mouse has been clicked (i.e., if the click position 
        // is not null)
        /*
        if (this.mouseManager.clickPosition) {

            // Get a list of all the HUD sprites that are stored
            // within the object manager
            const hudSprites = objectManager.get(ActorType.HUD);

            // Loop through the list of HUD sprites
            for (let i = 0; i < hudSprites.length; i++) {

                // Store a reference to the current HUD sprite
                const hudSprite = hudSprites[i];

                // Create a new Rect object, with a width of 1 and height of 1
                // to represent the pixel at which the mouse was clicked
                const mouseClickPosition = new Rect(
                    this.mouseManager.clickPosition.x,
                    this.mouseManager.clickPosition.y,
                    1,                                      // Width
                    1                                       // Height
                );

                // Use the rect object to check if the mouse click took place
                // inside of the hudSprite
                if (hudSprite.transform.boundingBox.contains(mouseClickPosition)) {

                    // TO DO: Your code here...

                    // If the user clicks the pause button...
                    // If the user clicks the menu button...
                    // If the user clicks the flip gravity button...

                    if (hudSprite.id === "Pause Button") {

                        console.log("You clicked the pause button!");
                        //create notification to change to the pause menu.
                    }

                    if (hudSprite.id === "Exit Button") {

                        console.log("You clicked the exit button!");
                    }
                }
            }
        }*/
    }
}