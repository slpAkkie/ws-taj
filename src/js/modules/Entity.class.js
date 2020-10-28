// Класс сущности на игровом поле
class Entity {

  // Спрайт сущности
  #Sprite;

  // Позиция сущности
  #x;
  get x() {
    return this.#x;
  }

  #y;
  get y() {
    return this.#y;
  }

  // Сколько кадров в секунду обновлять
  #fps;

  //Количество кадров анимации
  #frames;

  constructor( sprite, startX, startY, fps = null ) {
    this.#Sprite = sprite.img;
    this.#fps = fps || 1;
    this.#frames = sprite.frames;
    this.#x = startX;
    this.#y = startY;

    setInterval( ( () => {
      this.update();
    } ).bind( this ), 1000 / fps );
  }

  async update() {
    console.log( 'Обновление фрейма' );
  }

}
