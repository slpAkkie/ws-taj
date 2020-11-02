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
    this.#x = v;
  }

  get y() {
    return this.#y;
  }
  set y( v ) {
    this.#y = v;
  }

}
