class Player {
  sprite = { walk: null, stay: null, jump: null }
  action = 'stay';
  moveDirection = 0;

  get currentSprite() {
    return this.sprite[ this.action ]
  }

  set spriteX( v ) {
    this.sprite.walk.x = v;
    this.sprite.stay.x = v;
  }

  get spriteX() {
    return this.sprite.walk.x;
  }

  constructor( character ) {
    this.sprite.walk = new Sprite( resourceData[ character.toLowerCase() + '-walk' ] );
    this.sprite.walk.animationDuration = 800;
    this.sprite.stay = new Sprite( resourceData[ character.toLowerCase() + '-stay' ] );
    this.sprite.jump = this.sprite.stay;
  }

  updateAction() {
    this.action = ( state.pressedKey.LEFT || state.pressedKey.RIGHT )
      ? 'walk'
      : state.pressedKey.UP
        ? 'jump'
        : 'stay';
  }

  move() {
    if ( state.pressedKey.LEFT || state.pressedKey.RIGHT ) {
      this.moveDirection = state.pressedKey.LEFT ? -1 : 1;
    } else this.moveDirection = 0;


    if ( this.moveDirection === -1 ) {
      state.ctx.scale( -1, 1 );

      this.spriteX = -this.spriteX - this.sprite.stay.w - this.moveDirection;
    } else {
      this.spriteX = this.spriteX + this.moveDirection;
    }
  }

  update( dt ) {
    state.ctx.save();
    this.updateAction();
    this.move();

    this.currentSprite.update( dt );
    state.ctx.restore();
  }
}
