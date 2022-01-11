class MyMenuManager extends MenuManager {

    constructor(id, notificationCenter, keyboardManager) {

        super(id);

        this.notificationCenter = notificationCenter;
        this.keyboardManager = keyboardManager;

        this.initializeMainMenu();
        this.registerForNotifications();
    }

    registerForNotifications() {

        // When a 'menu' event fires, call the 'handleMenuNotification' function of 'this' object
        this.notificationCenter.register(
            NotificationType.Menu,
            this,
            this.handleMenuNotification
        );
    }

    handleMenuNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.ShowMainMenu:
                this.showMainMenu(notification.notificationArguments[0]);
                break;
            case NotificationAction.ShowLoseMenu:
                this.initializeLoseMenu();
                this.showLoseMenu(notification.notificationArguments[0]);
                break;
            case NotificationAction.ShowWinMenu:
                this.initializeWinMenu();
                this.showWinMenu(notification.notificationArguments[0]);
                break;

            default:
                break;
        }
        
    }

    showMainMenu(statusType) {
     

        // Check out the initialize function of this class. In it, we create a 'Menu' notification
        // whenever the play button is pressed. This notification has an action of ShowMenuChanged,
        // and an argument of [StatusType.Updated | StatusType.Drawn]. The handleMenuNotification 
        // function of this class is registered to the 'Menu' event. So, it will be called whenever
        // a 'Menu' notification is created. In the handleMenuNotification, we call this showMenu
        // function if the notification's action is of type 'ShowMenuChanged'. We also pass through 
        // the parameters that were added to the notification - [StatusType.Updated | StatusType.Drawn] 
        // in our case.

        // So, the statusType that is passed to this function will ultimately be [StatusType.Updated |
        // StatusType.Drawn] (or simply '3', if we work it out). 

        // This means, that when the user presses the 'play' button, a ShowMenuChanged notification is
        // created, which ultimately tells this function to hide the menu. On the other hand, we could
        // tell this notification to show the menu, by creating another ShowMenuChanged notification, but
        // by passing through a StatusType of off.

        // The reason why we use [StatusType.Drawn | StatusType.Updated] to turn off the menu, and 
        // [StatusType.Off] to turn on the menu, is because the same notification is sent to the
        // object manager, which ultimately tells it to start Updating and Drawing if the menu is
        // turned off, or to stop Updating and Drawing if the menu is turned on. Here we see how
        // one notification may be used to control multiple separate elements.

        // If we created an event to tell the ObjectManager to draw and update,
        // then it means we want the game to run i.e. hide the menu
       
        if (statusType != 0 ) {

            $('#main_menu').hide();
        }
        else{

            $('#main_menu').show();
            
        }
    
    }

    showLoseMenu(statusType) {


        if (statusType != 0) {
            
            $('#lose_menu').hide();
            
        }
        else {

            $('#lose_menu').show();
            
        }

    }

    showWinMenu(statusType) {


        if (statusType != 0) {

            $('#win_menu').hide();
        }
        else {

            $('#win_menu').show();
        
        }

    }
    

    initializeMainMenu() {

        // Hide the exit menu
        $('#exit_menu').hide();
        $('#exit_menu').addClass('hidden');

        $('#win_menu').hide();
        $('#win_menu').addClass('hidden');

        $('#lose_menu').hide();
        $('#lose_menu').addClass('hidden');


        /*************** MAIN MENU ****************/

        // If the play button is clicked
        $('.play').click(function () {

            // Hide the menu
            $('#main_menu').hide();

            // Send a notification to update and draw the game
            notificationCenter.notify(
                new Notification(
                    NotificationType.Menu,
                    NotificationAction.ShowMainMenu,
                    [StatusType.Updated | StatusType.Drawn]
                )
            );

            // TIMER RUNS OUT
            setTimeout(function(){
                timesUp=true;
            }, 120000);

            countDownTimer = countdown(2);
        });

        $('.audio').click(function () {

            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.SetVolume,
                    ["background_music", 0.2]
                )
            );

            notificationCenter.notify(
                new Notification(
                    NotificationType.Sound,
                    NotificationAction.Play,
                    ["background_music"]
                )
            );
            
        });

        // If the exit button is clicked
        $('.exit').click(function () {

            // Show exit menu
            $('#exit_menu').show();
            $('#exit_menu').removeClass('hidden');
        });
            
    }

    initializeLoseMenu() {

        // HELP WITH THIS LINE FROM HERE => https://www.tutorialspoint.com/How-to-hide-HTML-element-with-JavaScript
        
        document.getElementById("timer").style.visibility = "hidden";

        $('#lose_menu').show();
        $('#lose_menu').removeClass('hidden');

        $('#exit_menu').hide();
        $('#exit_menu').addClass('hidden');

    }
    
    initializeWinMenu() {

        document.getElementById("timer").style.visibility = "hidden";

        $('#win_menu').show();
        $('#win_menu').removeClass('hidden');

        $('#exit_menu').hide();
        $('#exit_menu').addClass('hidden');
        
    }

    update(gameTime) {

        // TO DO: Add code to listen for a 'pause key' press, and show/hide the menu accordingly
    }
}