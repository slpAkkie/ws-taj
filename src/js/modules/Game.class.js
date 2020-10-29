class Game {

  hp = 100;
  eatenCheese = 0;
  gameStatus = 'play';

  constructor( character ) {
    this.player = new Player( character );

    $( document ).on( 'keydown keyup', ( e ) => {
      if ( e.originalEvent.repeat ) return;

      if ( e.code === 'KeyA' || e.code === 'KeyD' )
        this.player.actionToggle();
      else if ( e.code === 'Escape' && e.type === 'keydown' )
        this.gameStatus = this.gameStatus === 'play' ? 'pause' : 'play';
    } )
  }

  update( dt ) {
    this.player.update( dt );
  }

}
