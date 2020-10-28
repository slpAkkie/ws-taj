class Sprite {
  #Image;
  #FrameCount;
  get FrameCount() {
    return this.#FrameCount;
  }

  constructor( path, frameCount ) {
    this.#Image = new Image();
    this.#Image.src = path;

    this.#FrameCount = frameCount;
  }
}
