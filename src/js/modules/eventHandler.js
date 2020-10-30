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
$( '#js-start' ).on( 'click', goToGame );
// Клик по кнопке "Начать заново"
$( '#js-restart' ).on( 'click', () => { state.restart = false; goToGame() } );



/**
 * Фнукции-обработчики
 */

// Проверка и переход на экран игрового меню
function goToGameMenu( { end, key, click } ) {
  if (
    state.screen !== 'prehistory'
    || ( !end && !key && !click )
  ) return;

  ( key || click ) && $( '#prehistory video' ).get( 0 ).pause();

  $( '#prehistory' ).toggleClass( 'hide' );
  $( '#game-menu' ).toggleClass( 'hide' );

  $( '#instruction p' ).each( ( k, v ) => {
    setTimeout( () => {
      $( v ).css( {
        'opacity': '1',
        'margin-left': '0',
      } );
    }, 100 * k );
  } );

  state.screen = 'menu';
  screenChangeLog();
}


// Выбор персонажа
function chooseCharacter() {
  $( this ).hasClass( 'chosen' )
    ? $( this ).removeClass( 'chosen' )
    : $( '.character' ).removeClass( 'chosen' ) && $( this ).addClass( 'chosen' );

  checkStartButton();
}

// Обновление состояния кнопки начала игры
function checkStartButton() {
  $( '#js-start' ).attr( 'disabled',
    !$( '#characters' ).find( '.chosen' ).length
    || !$( '#nickname input' ).val().length
  );
}

// Переход к экрану игры
function goToGame() {
  state.nickname = state.nickname || $( '#nickname input' ).val();
  state.character = state.character || $( $( '.chosen' ).get( 0 ) ).attr( 'data-character' ).toLowerCase();
  state.screen = 'game';
  screenChangeLog();

  $( '#game-menu' ).addClass( 'hide' );
  $( '#score-screen' ).addClass( 'hide' );
  $( '#game-zone' ).removeClass( 'hide' );

  stateLog();
  startGame();
}


// Вывод изменения текущего экрана
function screenChangeLog() {
  console.log( `[state.screen] => ${state.screen}` );
}

// Вывод наименования текущего экрана
function stateLog() {
  console.log( `[state] =>` );
  console.log( state );
}
