
/**
 * Moves the parent sprite over and back, then down the screen for Space Invaders game.
 * 
 * @author Niall McGuinness
 * @version 1.0
 * @class CycleMoveDescendController
 */
class CycleMoveController {

    /**
     * 
     * @param {*} moveVector 
     * @param {*} maxMoveIncrements 
     * @param {*} intervalBetweenInMs 
     * @param {*} moveVelocity 
     * 
     */
     constructor(moveVector, maxMoveIncrements, intervalBetweenInMs, moveVelocity) {
        this.moveVector = moveVector;
        this.maxMoveIncrements = maxMoveIncrements;
        this.intervalBetweenInMs = intervalBetweenInMs;
        this.moveVelocity = moveVelocity;

        // Internal variables
        this.currentMoveIncrement = 0;
        this.timeSinceLastMoveInMs = 0;
        this.moveDirection = 1;
    }

    /**
     * 
     * @param {*} gameTime 
     * @param {*} parent 
     */
    update(gameTime, parent) {

        // Doesn't work, trying to add velocity to the movement
        this.currentMoveIncrement*this.moveVelocity;

        // If enough time has passed since the sprite last moved
        if (this.timeSinceLastMoveInMs >= this.intervalBetweenInMs) {

            // If the sprite has not reached the edge of the screen
            if (this.currentMoveIncrement <= this.maxMoveIncrements) {

                // Calculate movement vector
                let translateBy = Vector2.MultiplyScalar(
                    this.moveVector,
                    this.moveDirection,
                );

                // Move sprite
                parent.transform.translateBy(translateBy);
                
                // Reset time
                this.timeSinceLastMoveInMs = 0;
            }

            // Otherwise
            else {

                // Invert move direction
                this.moveDirection *= -1;

                // Reset move increment
                this.currentMoveIncrement = 0;

                // Change animation
                if(this.moveDirection === 1) {
                    if((parent.id === "Enemy") || (parent.id === "Enemy2") || (parent.id === "Enemy3")) {
                        parent.artist.setTake("Moving Right");
                    }
                }
                else {
                    if((parent.id === "Enemy") || (parent.id === "Enemy2") || (parent.id === "Enemy3")) {
                        parent.artist.setTake("Moving Left");
                    }
                }

                // Reduce time to account for downwards movement
                this.timeSinceLastMoveInMs = -this.intervalBetweenInMs;

            }

            // Increase move incremenets
            this.currentMoveIncrement++;
        }

        // Increase time based on gameTime
        this.timeSinceLastMoveInMs += gameTime.elapsedTimeInMs;
    }

    /**
     * 
     * @returns 
     */
    clone() {
        return new CycleMoveController(
            this.moveVector,
            this.maxMoveIncrements,
            this.intervalBetweenInMs,
            this.moveVelocity,
        );
    }
};
