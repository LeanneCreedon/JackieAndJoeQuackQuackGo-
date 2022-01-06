/**
 * @author James Farrell
 */
 class EnemyShootController {

    /**
     * 
     * @param {*} notificationCenter 
     * @param {*} objectManager 
     * @param {*} bulletSprite  
     * @param {*} fireIntervalMs 
     */
    constructor(
        notificationCenter,
        objectManager,
        bulletSprite,
        fireIntervalMs
    ) {
        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;

        this.bulletSprite = bulletSprite;
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
            
            //Play the shoot sound
            // this.notificationCenter.notify(
            //     new Notification(
            //         NotificationType.Sound,     // Type
            //         NotificationAction.Play,    // Action
            //         ["sound_gun"]              // Arguments
            //     )
            // );

            // Reset time
            this.timeSinceLastBullet = 0;
        }
        
        // Increase time using gameTime
        this.timeSinceLastBullet += gameTime.elapsedTimeInMs;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new EnemyShootController(
            this.notificationCenter,
            this.objectManager,
            this.bulletSprite.clone(),
            this.moveDirection,
            this.moveSpeed
        );
    }
}