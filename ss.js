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
        this.generateSequence();
        this.nextLevel();

        this.colors = {
            blue: blue,
            violet: violet,
            orange: orange,
            green: green,
        };
    }


    // hide the "start" button
    initialize() {
        btnStart.classList.add( 'hide' );
        this.level = 1;
    }


    // Create the sequence
    generateSequence() {
        this.sequence = new Array( 10 ).fill( 0 ).map( ( i ) => {
            return( Math.floor( Math.random() * 4 ) );
        });
    }


    // It shows the sequence by levels
    nextLevel() {
        this.showSequence();
    }


    // This functions is in charge of transforming numbers to colors
    transformNTC( number ) {
        switch( number ) {
            case 0:
                return "blue";
            break;

            case 1:
                return "violet";
            break;

            case 2:
                return "orange";
            break;

            case 3:
                return "green";
            break;
        }
    }


    // Turn on (Or show) the sequence color to color
    showSequence() {
        for ( let i=0; i < this.level; i++ ) {
            let color = this.transformNTC( this.sequence[i] );

            setTimeout( () => { this.illuminateColor( color ) }, ( 1000 * i ) );
        }
    }


    // Turn on each color of the sequence
    illuminateColor( color ) {
        this.colors[ color ].classList.add( 'light' );

        setTimeout( () => { this.shutdownColor( color ) }, 350);
    }


    // Shutdown each color of the sequence
    shutdownColor( color ) {
        this.colors[ color ].classList.remove( 'light' );
    }

}


// Function called by main event
function startGame() {
    window.game = new Game();
}



// The event that is responsible for starting the game
btnStart.addEventListener( "click", startGame );
