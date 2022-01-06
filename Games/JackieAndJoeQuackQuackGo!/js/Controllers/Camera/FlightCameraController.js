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
        scaleSpeed,
        maxLeftMovement,
        maxRightMovement
    ) {
        this.keyboardManager = keyboardManager;
        this.moveKeys = moveKeys;
        this.moveSpeed = moveSpeed;
        this.scaleSpeed = scaleSpeed;
        this.maxLeftMovement = maxLeftMovement;
        this.maxRightMovement = maxRightMovement;
    }

    /**
     * 
     * @param {GameTime} gameTime 
     * @param {Actor2D} parent 
     */
    update(gameTime, parent) {

        // ISN'T WORKING - Trying to stop the camera from moving off the edges of the map
        // if(parent.transform > this.maxLeftMovement && parent.transform < this.maxRightMovement)
        // {
        //     // Translate camera
        //     if (this.keyboardManager.isKeyDown(this.moveKeys[0])) {

        //         // Move left
        //         parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, -1));
        //     }

        //     else if (this.keyboardManager.isKeyDown(this.moveKeys[1])) {

        //         // Move right
        //         parent.transform.translateBy(Vector2.MultiplyScalar(this.moveSpeed, 1));
        //     }
        // }

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