/** Возвышенность на которую можно взобраться */
class Hill extends SimpleObject {

  get surfaceY() {
    return this.coords.y + this.img.h - 280;
  }

}
