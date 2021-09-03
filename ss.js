// Get all the IDS needed for the game
const blue = document.getElementById( 'blue' );
const violet = document.getElementById( 'violet' );
const orange = document.getElementById( 'orange' );
const green = document.getElementById( 'green' );
const btnStart = document.getElementById( 'btnStart' );
const MAX_LEVEL = 15;


// Contains all the logic of the game
class Game {

    colors = {
        blue: blue,
        violet: violet,
        orange: orange,
        green: green,
    };


    constructor() {
        this.nextLevel = this.nextLevel.bind( this );
        this.userInput = this.userInput.bind( this );

        this.initialize();
        this.generateSequence();

        setTimeout( this.nextLevel, 1000 ); // This setTimeOut() gives the user time to start (One second)
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
        this.eventsListener( "add" );
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

    eventsListener( modeToUse ) { // the mode is if you want to put or remove events (remove)You wanna remove events, (add)You wanna add events

        let mode = modeToUse.toUpperCase();

        // depending on the option, the type of message is chosen
        let message = ( (mode === "ADD") ? "Added Events!" : (mode === "REMOVE") ? "Deleted Events!" : "It is not a valid option"); // Nested Ternary Operator


        // depending on the option, the type of event is chosen
        let event = "this.colors[ color ].event( 'click', this.userInput );";

        if ( mode === "ADD" ) {
            event = event.replace( "event", "addEventListener" );
        }
        if ( mode === "REMOVE" ) {
            event = event.replace( "event", "removeEventListener" );
        }

        // This loop putting an event listener on each colored button
        for ( let color in this.colors ) {
            if ( mode != "ADD" && mode != "REMOVE" ) { continue; } else { eval( event ) }
        }
        console.log( message );
    }



    userInput( ev ) {

        const nameColor = ev.target.dataset.color;

        const numColor = this.transformNumberColor( nameColor );

        this.illuminateColor( nameColor );

        if ( numColor === this.sequence[ this.subLevel ] ) {
            this.subLevel++;

            if ( this.subLevel === this.level ) {

                console.log( `Great Work!\nYou have passed level ${this.level}` );
                this.level++;

                if ( this.level === 5 ) { this.speed -= 500; } // Increase Speed

                if ( this.level === (MAX_LEVEL + 1) ) {
                    this.gameWon();
                } else {
                    setTimeout( this.nextLevel, 1000 );
                }
            }
        } else {
            this.gameOver();
            this.initialize();
        }
    }


    gameOver() {
        this.eventsListener( "remove" );

        swal( {
            title : "GAME OVER",
            text : "You were wrong in the sequence :(",
            icon : "error",
             button : "Okay",
        });
    }

    gameWon() {
        swal( {
            title : "YOU WIN",
            text : "Congratilations!! You won the game :D",
            icon : "success",
             button : "Yeahh",
        }).then( () => {
            this.initialize();
        });
    }
}


// Function called by main event
function startGame() {
    window.game = new Game();
}



// The event that is responsible for starting the game
btnStart.addEventListener( "click", startGame );
