/** Подбираемый предмет */
class CollectableItem extends SimpleObject {

  hillEffect = 10;

  constructor( resourceKey, x = 0, y = window.gameData.baseLine + 100 ) {
    super( resourceKey, x, y );
  }

}
