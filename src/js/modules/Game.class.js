class Game {

  constructor() {
    this.b = 0;
  }

  update( dt ) {
    let a = new Image();
    a.src = resourceData[ 'jerry-walk' ].path;

    state.ctx.drawImage(
      a,
      this.b * resourceData[ 'jerry-walk' ].width,
      0,
      resourceData[ 'jerry-walk' ].width,
      resourceData[ 'jerry-walk' ].height,
      200,
      50,
      resourceData[ 'jerry-walk' ].width,
      resourceData[ 'jerry-walk' ].height
    )

    this.b++;
    if ( this.b > resourceData[ 'jerry-walk' ].frames ) this.b = 1;
  }

}
