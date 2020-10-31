/** 2D Координаты */
class Coords {

  #x;
  #y;

  constructor( x, y ) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  set x( v ) {
    this.#x = this.#checkX( window.game.state.globalLeftOffset + v );
  }

  get y() {
    return this.#y;
  }
  set y( v ) {
    this.#y = v;
  }

  #checkX( x ) {
    if ( x < window.game.globalCoords.x ) throw new Error( 'Координата x не должна быть меньше глобальной левой коордлинате' );
    return x;
  }

}
