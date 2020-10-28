/** Настройка */

// Делаем звук ролика тише
$( '#prehistory video' ).get( 0 ).volume = 0.5;
console.log( `Громкость плеера установленна на ${$( '#prehistory video' ).get( 0 ).volume}` );



/**
 * Устанавливаем обработчики
 */

/** Обработчики экрана истории */

// По окончанию ролика
$( '#prehistory video' ).on( 'ended', () => goToGameMenu( { end: true } ) );
// По Нажатию пробела
$( document ).on( 'keydown', ( e ) => goToGameMenu( { key: e.code === 'Space' } ) );
// По нажатию на подсказку
$( '.skip' ).on( 'click', () => goToGameMenu( { click: true } ) );


/** Обработчики игрового меню */

// Выбор персонажа
$( '.character' ).on( 'click', chooseCharacter );
// Ввод никнейма
$( '#nickname input' ).on( 'keyup', checkStartButton );
// Клик по кнопке "Начать игру"
$( '#js-start' ).on( 'click', startGame );



/**
 * Фнукции-обработчики
 */

function goToGameMenu( { end, key, click } ) {
  if (
    state.screen !== 'prehistory'
    || ( !end && !key && !click )
  ) return;

  ( key || click ) && $( '#prehistory video' ).get( 0 ).pause();

  $( '#prehistory' ).toggleClass( 'hide' );
  $( '#game-menu' ).toggleClass( 'hide' );
  state.screen = 'menu';
  screenChangeLog();
}


function chooseCharacter() {
  $( this ).hasClass( 'chosen' )
    ? $( this ).removeClass( 'chosen' )
    : $( '.character' ).removeClass( 'chosen' ) && $( this ).addClass( 'chosen' );

  checkStartButton();
}

function checkStartButton() {
  $( '#js-start' ).attr( 'disabled',
    !$( '#characters' ).find( '.chosen' ).length
    || !$( '#nickname input' ).val().length
  );
}

function startGame() {
  state.nickname = $( '#nickname input' ).val();
  state.character = $( $( '.chosen' ).get( 0 ) ).attr( 'data-character' );
  state.screen = 'game';
  screenChangeLog();

  $( '#game-menu' ).addClass( 'hide' );
  $( '#game-zone' ).removeClass( 'hide' );

  stateLog();
  // Начало игры
}


function screenChangeLog() {
  console.log( `[state.screen] => ${state.screen}` );
}

function stateLog() {
  console.log( `[state] =>` );
  console.log( state );
}
