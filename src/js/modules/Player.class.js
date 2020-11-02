class Player extends Entity {

  hp = 100;
  eatenCheese = 0;
  speed = 500;
  direction = 1;
  currentState = 'idle';

  set hp( v ) {
    this.hp = ( v > 100 ? 100 : v < 0 ? 0 : v );
  }

  get width() {
    return this.state[ this.currentState ].w;
  }

}
