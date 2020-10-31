/** Картинка для игрового объекта */
class EntityImage {

  #path;
  #w;
  #h;

  #img;

  constructor( { path, width, height } ) {
    if ( !path || !width || !height ) throw new Error( 'Картинка создана не верно' );

    this.#path = path;
    this.#w = width;
    this.#h = height;
  }

  // Получить картинку
  getRenderData() {
    return {
      img: this.#img,
      width: this.#w,
      height: this.#h,
    };
  }

  // Получить всю информацию о текущей картинке
  getFullData() {
    return {
      path: this.#path,
      img: this.#img,
      width: this.#w,
      height: this.#h,
    };
  }

  // Загрузить картинку
  load() {
    this.#img = new Image();
    this.#img.src = this.#path;
  }

}
