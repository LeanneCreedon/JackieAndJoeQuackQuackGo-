/**
 * Moves Camera2D by changing the parent transform based on user input.
 *
 * @author Niall McGuinness
 * @version 1.0
 * @class FlightCameraController
 */
 class FlightCameraController {
    
    constructor(
        keyboardManager, 
        moveKeys, 
        moveSpeed, 
    ) {
        this.keyboardManager = keyboardManager;
        this.moveKeys = moveKeys;
        this.moveSpeed = moveSpeed;
    }

    /**
     * 
     * @param {GameTime} gameTime 
     * @param {Actor2D} parent 
     */
    update(gameTime, parent) {

        // Translate camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {

            // Move left
            parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, -1));
        }

        else if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {

            // Move right
            parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, 1));
        }

        // Reset camera
        if (this.keyboardManager.isKeyDown(this.moveKeys[2])) {

            // Reset
            parent.transform.reset();
        }
    }
}