class Player {
  sprite = { walk: null, idle: null }
  state = 'idle';

  _x;
  _y;

  set x( v ) {
    this._x = v;
    this.sprite.idle.x = v;
    this.sprite.walk.x = v;
  }

  set y( v ) {
    this._y = v;
    this.sprite.idle.y = v;
    this.sprite.walk.y = v;
  }

  _hp = 100;

  set hp( v ) {
    this._hp = ( v > 100 ? 100 : v < 0 ? 0 : v );
  }

  get hp() {
    return Math.ceil( this._hp );
  }

  constructor( character ) {
    this.sprite.walk = new Sprite( resourceData[ character + '-walk' ] );
    this.sprite.walk.animationDuration = 800;
    this.sprite.idle = new Sprite( resourceData[ character + '-idle' ] );
  }

  update( dt ) {
    this.state = ( state.pressedKey.LEFT || state.pressedKey.RIGHT ) ? 'walk' : 'idle';
  }

  render( dt ) {
    this.sprite[ this.state ].render( dt );
  }
}
