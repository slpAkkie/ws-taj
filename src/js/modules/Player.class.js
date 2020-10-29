class Player {
  sprite = { walk: null, stay: null }
  action = 'walk';

  constructor( character ) {
    this.sprite.walk = new Sprite( resourceData[ character.toLowerCase() + '-walk' ] );
    this.sprite.walk.animationDuration = 1000;
    this.sprite.stay = new Sprite( resourceData[ character.toLowerCase() + '-stay' ] );
  }

  update( dt ) {
    this.sprite[ this.action ].update( dt );
  }
}
