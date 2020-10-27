// Предварительная загрузка ресурсов игры (Асинхронно)
( async function () {
  $.each( resourcePath, ( k, v ) => {
    if ( k === 'Character' ) return;

    try {
      gameResources[ k.toLowerCase() ] = new Image();
      gameResources[ k.toLowerCase() ].src = v;
      console.log( `Загрузка ${k} (${v}) завершена` );
    }
    catch ( e ) {
      console.error( `Загрузка ${k} (${v}) не удалась` );
    }
  } );
} )();

function loadCharacter() {
  if ( playerInfo.character === null ) throw Error( 'Персонаж игрока не был задан' );

  gameResources.characterSprite.stay = new Image();
  gameResources.characterSprite.stay.src =
    resourcePath.Character[ playerInfo.character ].stay;

  gameResources.characterSprite.walk = new Image();
  gameResources.characterSprite.walk.src =
    resourcePath.Character[ playerInfo.character ].walk;
}
