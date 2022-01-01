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

    set playerHealth(value) {
        this._playerHealth = value;
    }
    set inventory(value) {
        this._inventory = value;
    }

    constructor(id, notificationCenter, initialPlayerHealth) {

        super(id);

        this.notificationCenter = notificationCenter;
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

            // Add more cases here...

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

            // Create a UI notification that will update the JackieLives
            // text sprite

            // Check out the updateHealth method of the UI manager to see how this notification
            // is handled

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

    update(gameTime) {

        // Add your code here...

        // For example, every update(), we could check the player's health. If
        // the player's health is <= 0, then we can create a notification...
        // eg.

        if(this.joeHealth <=0 && this.jackieHealth <=0)
        {
            
            // PLAY SOUND
            this.notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["sound_lose"]
                )
            );

            // this.notificationCenter.notify(
            //     new Notification(
            //         NotificationType.GameState,
            //         NotificationAction.Lose,
            //         []
            //     )
            // );
        }

        // Play a sound?
        // Pause the game?
        // Play the 'player death' animation?
        // Remove the player sprite from the game?
        // Show the win/lose screen?

        // How could we have these events fire one after each other, rather
        // than all at the same time? Hint: use timers.
    }
}