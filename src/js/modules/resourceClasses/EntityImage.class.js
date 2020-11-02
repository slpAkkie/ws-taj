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
    this.load();
  }

  get width() {
    return this.#img.naturalWidth;
  }
  get height() {
    return this.#img.naturalHeight;
  }

  get w() {
    return this.#w;
  }

  // Получить картинку
  getRenderData() {
    return {
      img: this.#img,
      sw: this.width,
      sh: this.height,
      dw: this.#w,
      dh: this.#h,
    };
  }

  // Получить всю информацию о текущей картинке
  getFullData() {
    return {
      path: this.#path,
      img: this.#img,
      sw: this.#img.width,
      sh: this.#img.height,
      dw: this.#w,
      dh: this.#h,
    };
  }

  // Загрузить картинку
  load() {
    this.#img = new Image();
    this.#img.src = this.#path;
  }

}