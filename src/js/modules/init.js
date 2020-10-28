// Предварительная загрузка ресурсов игры (Асинхронно)
( async function () {
  $.each( resourcePath, ( k, v ) => {
    if ( k === 'Character' ) return;

    let path = v.path || v;
    let frames = v.frames || 1;

    try {
      gameResources[ k ] = new Sprite( path, frames );
      console.log( `Загрузка ${k} (${path}) завершена` );
    }
    catch ( e ) {
      console.warn( `Загрузка ${k} (${path}) не удалась` );
      console.error( e.message );
    }
  } );
} )();

async function loadCharacter() {
  if ( playerInfo.character === null ) throw Error( 'Персонаж игрока не был задан' );

  gameResources.CharacterSprite.stay = new Sprite(
    resourcePath.Character[ playerInfo.character ].stay.path,
    resourcePath.Character[ playerInfo.character ].stay.frames
  )

  gameResources.CharacterSprite.walk = new Sprite(
    resourcePath.Character[ playerInfo.character ].walk.path,
    resourcePath.Character[ playerInfo.character ].walk.frames
  )

  // gameResources.CharacterSprite.stay.img = new Image();
  // gameResources.CharacterSprite.stay.img.src =
  //   resourcePath.Character[ playerInfo.character ].stay.path;
  // gameResources.CharacterSprite.stay.frames = resourcePath.Character[ playerInfo.character ].stay.frames;

  // gameResources.CharacterSprite.walk.img = new Image();
  // gameResources.CharacterSprite.walk.img.src =
  //   resourcePath.Character[ playerInfo.character ].walk.path;
  // gameResources.CharacterSprite.walk.frames = resourcePath.Character[ playerInfo.character ].walk.frames;
}
