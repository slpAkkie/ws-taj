// Предварительная загрузка ресурсов игры (Асинхронно)
( async function () {
  $.each( resourcePath, ( k, v ) => {
    if ( k === 'Character' ) return;

    let path = v.path || v;
    let frames = v.frames || 1;

    try {
      gameResources[ k ].img = new Image();
      gameResources[ k ].img.src = path;
      gameResources[ k ].frames = frames;
      console.log( `Загрузка ${k} (${path}) завершена` );
    }
    catch ( e ) {
      console.warn( `Загрузка ${k} (${path}) не удалась` );
      console.error( e.message );
    }
  } );
} )();

function loadCharacter() {
  if ( playerInfo.character === null ) throw Error( 'Персонаж игрока не был задан' );

  gameResources.characterSprite.stay.img = new Image();
  gameResources.characterSprite.stay.img.src =
    resourcePath.Character[ playerInfo.character ].stay.path;
  gameResources.characterSprite.stay.frames = resourcePath.Character[ playerInfo.character ].stay.frames;

  gameResources.characterSprite.walk.img = new Image();
  gameResources.characterSprite.walk.img.src =
    resourcePath.Character[ playerInfo.character ].walk.path;
  gameResources.characterSprite.walk.frames = resourcePath.Character[ playerInfo.character ].walk.frames;
}
