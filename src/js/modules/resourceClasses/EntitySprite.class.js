/** Спрайт для игрового объекта */
class EntitySprite extends EntityImage {

  #path;
  #w;
  #h;

  isSprite = true;
  #frameCount;
  #frameWidth;
  #animationDuration;
  #frameDuration;

  #currentAnimationTime = 0;
  #currentFrameTime = 0;
  #currentFrame = 0;

  constructor( { path, width, height, frameCount, animationDuration, scale } ) {
    super( { path, width, height, scale } );

    if ( !frameCount || !animationDuration ) throw new Error( 'Спрайт создан не верно' );

    this.#frameCount = frameCount;
    this.#frameWidth = width;
    this.#animationDuration = animationDuration;
    this.#frameDuration = animationDuration / frameCount;
  }

  // Получить данные для рендер
  getRenderData() {
    return Object.assign( super.getRenderData(), {
      sx: this.#offsetX,
      sy: 0,
      sw: super.w,
    } );
  }

  // Получить всю информацию о текущем спрайте
  getFullData() {
    return Object.assign( super.getFullData(), {
      isSprite: this.isSprite,
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
