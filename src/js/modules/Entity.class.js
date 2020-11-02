/** Класс существа с координатами и спрайтом */
class Entity {

  speed;
  direction;
  state = {};
  currentState;

  constructor( x = 0, y = 0 ) {
    this.coords = new Coords( x, y );
  }

  setSprite( entityKey, entityState ) {
    this.state[ entityState ] = gameResources[ `${entityKey}:${entityState}` ];
  }

  render( dt ) {
    if ( !this.direction || !this.currentState ) return;

    let rd = this.state[ this.currentState ].getRenderData();

    window.game.ctx.save();
    window.game.ctx.scale( this.direction, 1 );
    this.direction === -1 && ( this.coords.x = -this.coords.x - this.state[ this.currentState ].w );
    window.game.ctx.drawImage( rd.img, rd.sx || 0, rd.sy || 0, rd.sw, rd.sh, this.coords.x, this.coords.y, rd.dw, rd.dh );
    this.direction === -1 && ( this.coords.x = -this.coords.x - this.state[ this.currentState ].w );
    window.game.ctx.restore();

    if ( this.state[ this.currentState ].isSprite ) this.state[ this.currentState ].update( dt );
    else {
      for ( let k in this.state ) {
        this.state[ k ].isSprite && this.state[ k ].reset();
      }
    }
  }

}
