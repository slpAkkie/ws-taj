/** Простой класс игрового объекта, имеющий координаты и картинку */
class SimpleObject {

  constructor( resourceKey ) {
    this.coords = new Coords( 0, 0 );
    this.img = gameResources[ resourceKey ];
  }

}
