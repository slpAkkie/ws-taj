class Player {
  sprite = { walk: null, stay: null }
  action = 'stay';

  constructor( character ) {
    this.sprite.walk = new Sprite( resourceData[ character.toLowerCase() + '-walk' ] );
    this.sprite.walk.animationDuration = 800;
    this.sprite.stay = new Sprite( resourceData[ character.toLowerCase() + '-stay' ] );
  }

  actionToggle() {
    if ( this.action === 'stay' ) this.action = 'walk';
    else this.action = 'stay';
  }

  update( dt ) {
    this.sprite[ this.action ].update( dt );
  }
}
