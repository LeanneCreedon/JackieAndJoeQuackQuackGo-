/**
 * @author James Farrell
 */
 class PlayerShootController {

    /**
     * 
     * @param {*} notificationCenter 
     * @param {*} objectManager 
     * @param {*} keyboardManager 
     * @param {*} bulletSprite 
     * @param {*} shootKey 
     * @param {*} fireIntervalMs 
     */
    constructor(
        notificationCenter,
        objectManager,
        keyboardManager,
        bulletSprite,
        shootKey,
        fireIntervalMs
    ) {
        this.notificationCenter = notificationCenter;

        this.objectManager = objectManager;
        this.keyboardManager = keyboardManager;

        this.bulletSprite = bulletSprite;
        this.shootKey = shootKey;
        this.fireIntervalMs = fireIntervalMs;

        // Create internal time variable
        this.timeSinceLastBullet = 0;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {

        // If the user is pressing shoot button
        if (this.keyboardManager.isKeyDown(this.shootKey[0])) {

            // If enough time has passed since the last bullet was fired
            if (this.timeSinceLastBullet >= this.fireIntervalMs) {

                // Clone the bullet sprite
                let bullet = this.bulletSprite.clone();

                // Set the bullet's animation take
                bullet.artist.setTake("Default");
                
                // Update the status type of the bullet
                bullet.statusType = StatusType.Updated | StatusType.Drawn;

                // Move the bullet to the player
                bullet.transform.setTranslation(parent.transform.translation);

                // Add the bullet to the object manager
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sprite,    // Type
                        NotificationAction.Add,     // Action
                        [bullet]                    // Arguments
                    )
                );

                // ISSUE: WHEN PLAYER IS FACING LEFT, IT SHOULD CHANGE TO "Shooting Left"
                //if(parent.moveDirection === 1) {
                    parent.artist.setTake("Shooting Right");

                    // HELP WITH THIS CODE FROM THE FOLLOWING SITE:
                    // https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/
                    //--------------------------------------------
                    setTimeout(function(){
                        parent.artist.setTake("Moving Right");
                    }, 1000);
                    //--------------------------------------------
                //}
                // else if(parent.moveDirection === -1) {
                //     parent.artist.setTake("Shooting Left");

                //     setTimeout(function(){
                //         parent.artist.setTake("Moving Left");
                //     }, 1000);
                // }
                
                //Play the shoot sound
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,     // Type
                        NotificationAction.Play,    // Action
                        ["sound_gun"]              // Arguments
                    )
                );

                // Reset time
                this.timeSinceLastBullet = 0;
            }
        }

        // Increase time using gameTime
        this.timeSinceLastBullet += gameTime.elapsedTimeInMs;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new PlayerShootController(
            this.notificationCenter,
            this.objectManager,
            this.keyboardManager,
            this.bulletSprite.clone(),
            this.moveDirection,
            this.moveSpeed
        );
    }
}