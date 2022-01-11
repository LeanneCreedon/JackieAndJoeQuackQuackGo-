/**
 * Stores, updates, and changes game state in my specific game e.g. Snailbait.
 * @author
 * @version 1.0
 * @class MyGameStateManager
 */
class MyGameStateManager extends GameStateManager {

    get playerHealth() {
        return this._playerHealth;
    }
    get inventory() {
        return this._inventory;
    }
    get player() {
        return this._player;
    }

    set playerHealth(value) {
        this._playerHealth = value;
    }
    set inventory(value) {
        this._inventory = value;
    }

    constructor(id, notificationCenter, initialPlayerHealth) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.objectManager = objectManager;
        this.joeHealth = initialPlayerHealth;
        this.jackieHealth = initialPlayerHealth;

        this.inventory = [];

        this.registerForNotifications();
    }

    // Handle all GameState type events - see PlayerBehavior::HandleEnemyCollision()
    registerForNotifications() {
        this.notificationCenter.register(
            NotificationType.GameState,
            this,
            this.handleGameStateNotification
        );
    }

    handleGameStateNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.Health:
                this.handleHealthStateChange(notification.notificationArguments);
                break;

            case NotificationAction.Inventory:
                this.handleInventoryStateChange(notification.notificationArguments);
                break;

            case NotificationAction.PlayerDeath:
                this.playerDeath(notification.notificationArguments);
                break;

            default:
                break;
        }
    }

    handleHealthStateChange(argArray) {
        
        // Arg array is the array we passed through the notification
        // i.e., ["Jackie", 1]

        // Extract these two values into two usable variables
        
        const playerID = argArray[0];
        const healthDelta = argArray[1];

        // If the player id is Jackie
        if (playerID == "Jackie") {

            // Update jackies health
            this.jackieHealth += healthDelta;

            notificationCenter.notify(
                new Notification(
                    NotificationType.UI,
                    NotificationAction.Health,
                    [playerID, this.jackieHealth]
                )
            );
        }

        // If the player ID is Joe
        if (playerID == "Joe") {

            // Update joes health
            this.joeHealth += healthDelta;

            // Create a UI notification that will update the JoeLives
            // text sprite

            // Check out the updateHealth method of the UI manager to see how this notification
            // is handled

            notificationCenter.notify(
                new Notification(
                    NotificationType.UI,
                    NotificationAction.Health,
                    [playerID, this.joeHealth]
                )
            );
        }
    }

    handleInventoryStateChange(argArray) {

        // Extract pickup from the array
        const pickup = argArray[0];

        // Add pickup to inventory
        this.inventory.push(pickup);

        // Notify UI of change

        // Please note that I am passing through the ID of the pickup as an argument to the notification
        // Check out the updateInventory method of the UI manager class to see how this works

        this.notificationCenter.notify(
            new Notification(
                NotificationType.UI,
                NotificationAction.Inventory,
                [pickup.id]
            )
        );

        // You may need to change this code if you would like to also remove an item from the inventory
        // Maybe you could have separate InventoryAdd and InventoryRemove actions, that call separate 
        // functions in your GameState manager and UI manager
    }

    playerDeath(argArray) {

        const playerID = argArray[0];

        const players = this.objectManager.get(ActorType.Player);
        
        // If house is null, exit the function
        if (players == null) return;

        for (let i = 0; i < players.length; i++) {

            // Store a reference to the current enemy sprite
            const player = players[i];

            // If the player id is Jackie
            if (playerID == "Jackie") {

                // JACKIE DIES!
                notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.Health,
                        [playerID, -this.jackieHealth]
                    )
                );

                // REMOVE SPRITE
                if(playerID == player.id)
                {
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.Sprite,
                            NotificationAction.Remove,
                            [player]
                        )
                    );
                }
                
            }

            // If the player ID is Joe
            if (playerID == "Joe") {

                // JOE DIES!
                notificationCenter.notify(
                    new Notification(
                        NotificationType.GameState,
                        NotificationAction.Health,
                        [playerID, -this.joeHealth]
                    )
                );

                // REMOVE SPRITE
                if(playerID == player.id)
                {
                    notificationCenter.notify(
                        new Notification(
                            NotificationType.Sprite,
                            NotificationAction.Remove,
                            [player]
                        )
                    );
                }
            }
        }
    }

    playSoundOnce = true;

    update(gameTime) {

        if(this.joeHealth <=0 && this.jackieHealth <=0 || timesUp)
        {
            if(this.playSoundOnce)
            {
                // PLAY SOUND
                this.notificationCenter.notify(
                    new Notification(
                        NotificationType.Sound,
                        NotificationAction.Play,
                        ["sound_lose"]
                    )
                );
                this.playSoundOnce=false;
            }
        
            setTimeout(function() {
                notificationCenter.notify(
                    new Notification(
                        NotificationType.Menu,
                        NotificationAction.ShowLoseMenu,
                        [StatusType.Off]
                    )
                ); 
            }, 2000);
        }

    }
}