class Player extends Entity {

  #hp = 100;
  eatenCheese = 0;
  speed = 500;
  jumpSpeed = 500;
  direction = 1;
  currentState = 'idle';
  jumpState = { isJump: false, fall: false, jump: false };

  set hp( v ) {
    this.#hp = ( v > 100 ? 100 : v < 0 ? 0 : v );
  }

  get hp() {
    return this.#hp;
  }

  checkCollision( entity ) {
    return ( entity.coords.x + window.game.state.globalLeftOffset ) <= ( this.coords.x + this.width )
      && ( ( entity.coords.x + window.game.state.globalLeftOffset ) + entity.width ) >= this.coords.x
      && entity.coords.y <= ( this.coords.y + this.height )
      && ( entity.coords.y + entity.height ) >= this.coords.y;
  }

}
