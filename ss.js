// Get all the IDS needed for the game
const blue = document.getElementById( 'blue' );
const violet = document.getElementById( 'violet' );
const orange = document.getElementById( 'orange' );
const green = document.getElementById( 'green' );
const colorButtons = document.getElementsByClassName( 'color' );

const btnStart = document.getElementById( 'btnStart' );

const MAX_LEVEL = 15;

/*

function userInput( button ) {
    console.log( "Color opressed by the user : " + button[ 'id' ] );
}

*/



// Contains all the logic of the game
class Game {

    constructor() {
        this.nextLevel = this.nextLevel.bind( this );

        this.eventsListener( "add" );
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
        this.speed = 1000;
    }


    // Create the sequence
    generateSequence() {
        this.sequence = new Array( MAX_LEVEL ).fill( 0 ).map( ( i ) => {
            return( Math.floor( Math.random() * 4 ) );
        });
    }


    // It shows the sequence by levels
    nextLevel() {
        this.subLevel = 0;
        this.showSequence();
    }


    // This functions is in charge of transforming numbers to colors
    transformNumberColor( data ) {

        if ( typeof( data ) === "number" ) {

            switch( data ) {
                case 0:
                    return( "blue" );
                break;

                case 1:
                    return( "violet" );
                break;

                case 2:
                    return( "orange" );
                break;

                case 3:
                    return( "green" );
                break;

                default:
                    console.log( "Is not a valid number!" );
            }
        }


        if ( typeof( data ) === "string" ) {

            switch( data ) {
                case "blue":
                    return( 0 );
                break;

                case "violet":
                    return( 1 );
                break;

                case "orange":
                    return( 2 );
                break;

                case "green":
                    return( 3 );
                break;

                default:
                    console.log( "Is not a valid string!" );
            }
        }


    }


    // Turn on (Or show) the sequence color to color
    showSequence() {
        for ( let i=0; i < this.level; i++ ) {
            let color = this.transformNumberColor( this.sequence[i] );

            setTimeout( () => { this.illuminateColor( color ) }, ( this.speed * i ) );
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

    eventsListener( mode ) { // the mode is if you want to put or remove events (remove)You wanna remove events, (add)You wanna add events

        mode = mode.toUpperCase( mode );

        // This loop putting an event listener on each colored button
        if ( mode === "ADD" ) {
            for ( let i=0; i < colorButtons.length; i++ ) {
                colorButtons[i].addEventListener( "click", () => { this.userInput( colorButtons[i] ) } );
            }
        }

        if ( mode === "REMOVE" ) {
            for ( let i=0; i < colorButtons.length; i++ ) {
                colorButtons[i].removeEventListener( "click", () => { this.userInput( colorButtons[i] ) } );
            }
        }

    }



    userInput( button ) {
        const nameColor = button[ 'id' ]

        const numColor = this.transformNumberColor( nameColor );

        this.illuminateColor( nameColor );

        if ( numColor === this.sequence[ this.subLevel ] ) {
            this.subLevel++;

            if ( this.subLevel === this.level ) {

                alert( `Great Work!\nYou have passed level ${this.level}` );
                this.level++;

                if ( this.level === 5 ) { this.speed -= 500; } // Increase Speed

                if ( this.level === MAX_LEVEL ) {
                    // YOU WIN!!
                } else {
                    setTimeout( this.nextLevel, 1000 );
                }
            }
        } else {
            // GAME OVER
        }

        console.log( `The number oprimed was : ${ numColor } - ${ nameColor } ` );

    }

}


// Function called by main event
function startGame() {
    window.game = new Game();
}



// The event that is responsible for starting the game
btnStart.addEventListener( "click", startGame );
