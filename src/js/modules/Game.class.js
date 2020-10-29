class Game {

  hp = 100;
  eatenCheese = 0;

  constructor( character ) {
    this.player = new Player( character );
  }

  update( dt ) {
    this.player.update( dt );
  }

}
