/** Возвышенность на которую можно взобраться */
class Hill extends SimpleObject {

  get surfaceY() {
    return this.coords.y + this.img.height - 0;
  }

}
