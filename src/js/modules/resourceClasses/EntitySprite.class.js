/** Спрайт для игрового объекта */
class EntitySprite extends EntityImage {

  #path;
  #w;
  #h;

  #isSprite = true;
  #frameCount;
  #frameWidth;
  #animationDuration;
  #frameDuration;

  #currentAnimationTime = 0;
  #currentFrameTime = 0;
  #currentFrame = 0;

  #img;

  constructor( { path, width, height, frameCount, animationDuration } ) {
    super( { path, width, height } );

    if ( !frameCount || !animationDuration ) throw new Error( 'Спрайт создан не верно' );

    this.#frameCount = frameCount;
    this.#frameWidth = Math.ceil( width / frameCount );
    this.#animationDuration = animationDuration;
    this.#frameDuration = animationDuration / frameCount;
  }

  // Получить данные для рендер
  getRenderData() {
    return Object.assign( super.getRenderData(), {
      img: this.#img,
      width: this.#frameWidth,
      height: this.#h,
      offsetX: this.#offsetX,
      offsety: 0,
    } );
  }

  // Получить всю информацию о текущем спрайте
  getFullData() {
    return Object.assign( super.getFullData(), {
      img: this.#img,
      isSprite: this.#isSprite,
      frameCount: this.#frameCount,
      frameWidth: this.#frameWidth,
      animationDuration: this.#animationDuration,
      currentAnimationTime: this.#currentAnimationTime,
      currentFrame: this.#currentFrame,
    } );
  }

  // Получить отступ слева до текущего фрейма спрайта
  get #offsetX() {
    return this.#frameWidth * this.#currentFrame;
  }

  reset() {
    this.#currentAnimationTime = 0;
    this.#currentFrameTime = 0;
    this.#currentFrame = 0;
  }

  // Перейти к следующему фрейму
  next() {
    this.#currentFrame++;
    this.#currentFrameTime -= this.#frameDuration;

    if ( this.#currentFrameTime < 0 ) this.#currentFrameTime = 0;
  }

  // Получить следующий фрейм
  update( dt ) {
    this.#currentAnimationTime += dt;
    this.#currentFrameTime += dt;
    if ( this.#currentFrameTime > this.#frameDuration ) this.next();

    if ( this.#currentAnimationTime > this.#animationDuration || this.#currentFrame >= this.#frameCount )
      this.reset();
  }

}
