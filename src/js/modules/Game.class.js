class Game {

  hp = 100;
  eatenCheese = 0;
  gameStatus = 'play';

  constructor( character ) {
    this.player = new Player( character );

    $( document ).on( 'keydown keyup', ( e ) => {
      if ( e.originalEvent.repeat ) return;

      ( e.code === 'KeyA' && e.type === 'keydown' ) && ( state.pressedKey.LEFT = true );
      ( e.code === 'KeyA' && e.type === 'keyup' ) && ( state.pressedKey.LEFT = false );
      ( e.code === 'KeyD' && e.type === 'keydown' ) && ( state.pressedKey.RIGHT = true );
      ( e.code === 'KeyD' && e.type === 'keyup' ) && ( state.pressedKey.RIGHT = false );
      ( e.code === 'KeyW' && e.type === 'keydown' ) && ( state.pressedKey.UP = true );
      ( e.code === 'KeyW' && e.type === 'keyup' ) && ( state.pressedKey.UP = false );

      if ( e.code === 'Escape' ) {
        this.gameStatus = this.gameStatus === 'play' ? 'pause' : 'play';
        $( '#pause-screen' ).toggleClass( 'hide' );
      }
    } );
  }

  update( dt ) {
    this.player.update( dt );
  }

}
