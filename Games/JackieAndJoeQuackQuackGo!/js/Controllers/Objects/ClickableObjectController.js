class ClickableObjectController {

    /**
     * Constructs a clickable object controller, which checks to see 
     * @param {MouseManager} mouseManager 
     * @param {Function} callbackFunction  
     */
    constructor(mouseManager, callbackFunction) {
        this.mouseManager = mouseManager;
        this.callbackFunction = callbackFunction;
    }

    update(gameTime, parent) {

        // The below code checks to see if the mouse has been clicked.
        // It then extracts all of the HUD sprites from the object manager.
        // Next, it loops through the list of HUD sprites, and checks to see 
        // if the mouse click took place on top of any HUD sprite. If so,
        // some action is performed.

        // For example, this will allow us to check if the user has clicked on 
        // the pause button.

        // If the mouse has been clicked (i.e., if the click position 
        // is not null)
        if (this.mouseManager.clickPosition) {

            // Create a new Rect object, with a width of 1 and height of 1
            // to represent the pixel at which the mouse was clicked
            const mouseClickPosition = new Rect(
                this.mouseManager.clickPosition.x,
                this.mouseManager.clickPosition.y,
                1,                                      // Width
                1                                       // Height
            );

            // Use the rect object to check if the mouse click took place
            // inside of the sprite that this controller is attached to
            if (parent.transform.boundingBox.contains(mouseClickPosition)) {

                this.callbackFunction();
            }
        }
    }
}