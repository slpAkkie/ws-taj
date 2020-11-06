class Player extends Entity {

  #hp = 100;
  eatenCheese = 0;
  speed = 500;
  jumpSpeed = 500;
  direction = 1;
  currentState = 'idle';
  jumpState = { isJump: false, fall: false, jump: false };
  upperJumpPoint = 100;
  baseLine;
  isOnHill = false;
  isUnderHill = false;
  entityCollisionWith = null;

  constructor( ...param ) {
    super( ...param );
    this.baseLine = window.gameData.baseLine;
  }

  set hp( v ) {
    this.#hp = ( v > 100 ? 100 : v < 0 ? 0 : v );
  }

  get hp() {
    return this.#hp;
  }

  isAboutHill( entity ) {
    return ( entity.coords.x + window.game.state.globalLeftOffset ) <= ( this.coords.x + this.width )
      && ( ( entity.coords.x + window.game.state.globalLeftOffset ) + entity.width ) >= this.coords.x;
  }

  checkCollision( entity ) {
    return ( entity.coords.x + window.game.state.globalLeftOffset ) <= ( this.coords.x + this.width )
      && ( ( entity.coords.x + window.game.state.globalLeftOffset ) + entity.width ) >= this.coords.x
      && entity.coords.y <= ( this.coords.y + this.height )
      && ( entity.coords.y + entity.height ) >= this.coords.y;
  }

  checkCollisionWithEnemy( enemy ) {
    return ( enemy.coords.x ) <= ( this.coords.x + this.width )
      && ( ( enemy.coords.x ) + enemy.width ) >= this.coords.x
      && enemy.coords.y <= ( this.coords.y + this.height )
      && ( enemy.coords.y + enemy.height ) >= this.coords.y;
  }

}
