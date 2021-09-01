// Get all the IDS needed for the game
const blue = document.getElementById( 'blue' );
const violet = document.getElementById( 'violet' );
const orange = document.getElementById( 'orange' );
const green = document.getElementById( 'green' );

const btnStart = document.getElementById( 'btnStart' );


// Contains all the logic of the game
class Game {

    constructor() {
        this.initialize();
    }


    // hide the "start" button
    initialize() {
        btnStart.classList.add( 'hide' );
        this.level = 7;
    }

}


// Function called by main event
function startGame() {
    window.game = new Game();
}



// The event that is responsible for starting the game
btnStart.addEventListener( "click", startGame );
