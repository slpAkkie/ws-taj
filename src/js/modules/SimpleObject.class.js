/** Простой класс игрового объекта, имеющий координаты и картинку */
class SimpleObject {

  constructor( resourceKey, x = 0, y = window.gameData.baseLine ) {
    this.coords = new Coords( x, y );
    this.img = gameResources[ resourceKey ];
  }

  render() {
    let rd = this.img.getRenderData();
    window.game.ctx.drawImage( rd.img, rd.sx || 0, rd.sy || 0, rd.sw, rd.sh, this.coords.x + window.game.state.globalLeftOffset, this.coords.y - rd.dh, rd.dw, rd.dh );
  }

}
