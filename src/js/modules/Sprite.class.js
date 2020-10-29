class Sprite {

  constructor( { path, frames, width, height }, x = 0, y = state.baseLine ) {
    if ( !path || !frames || !width || !height ) return false;

    this.img = new Image();
    this.img.src = path;

    this.frames = frames;
    this.frameIndex = 0;

    this.w = width;
    this.h = height;

    this.x = x;
    this.y = y;
  }

  set animationDuration( v ) {
    this.duration = v;

    this.frameDuration = this.duration / this.frames;
    this.currentAnimationTime = 0;
  }

  get isAnimation() {
    if ( !this.duration ) return false;
    return true;
  }

  get frame() {
    return this.frameIndex * this.w;
  }

  update( dt ) {
    state.ctx.drawImage(
      this.img, this.frame, 0,
      this.w, this.h,
      this.x, this.y,
      this.w, this.h,
    )

    if ( !this.isAnimation ) return;

    this.currentAnimationTime += ( dt - state.lastUpdate );
    this.frameIndex = Math.floor( this.currentAnimationTime / this.frameDuration );

    ( this.currentAnimationTime > this.duration ) && ( this.currentAnimationTime = 0 );
    ( this.frameIndex >= this.frames ) && ( this.frameIndex = 0 );
  }

}
