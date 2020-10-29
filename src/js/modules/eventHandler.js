/** Настройка */

// Делаем звук ролика тише
$( '#prehistory video' ).get( 0 ).volume = 0.5;
console.log( `Громкость плеера установленна на ${$( '#prehistory video' ).get( 0 ).volume}` );

// =================================
// Настройка на время написания игры
state.screen = 'game';
state.nickname = 'Akkie';
state.character = 'Jerry'.toLowerCase();
startGame();
// ===================================



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

function goToGame() {
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



function startGame() {
  console.log( 'Начало игры' );

  state.ui.timer = $( '#timer span.data' ).get( 0 ) || null;
  state.ui.hp = $( '#hp span.data' ).get( 0 ) || null;
  state.ui.eatenCheese = $( '#eaten-cheese span.data' ).get( 0 ) || null;
  state.ui.nickname = $( '#nickname span.data' ).get( 0 ) || null;

  state.canvas = $( '#game-zone canvas' ).get( 0 );
  state.ctx = state.canvas.getContext( '2d' );

  state.canvas.width = Math.floor( $( document.body ).width() ) - 1;
  state.canvas.height = Math.floor( $( document.body ).height() ) - 1;


  state.startTime = performance.now();
  state.lastUpdate = null;

  requestAnimationFrame( update );
}



function update( dt ) {
  if ( state.screen === 'game' && state.gameStatus === 'pause' ) {
    state.lastUpdate = performance.now();
    requestAnimationFrame( update );

    return;
  }

  updateTimer( dt );

  state.ctx.fillStyle = '#000000';
  state.ctx.fillRect( 0, 0, state.canvas.width, state.canvas.height );
  gameUpdate( dt );

  state.lastUpdate = performance.now();
  requestAnimationFrame( update );
}

function updateTimer( dt ) {
  let fullSeconds = Math.floor( ( dt - state.startTime ) / 1000 );
  let minutes = String( Math.floor( fullSeconds / 60 ) );
  let seconds = String( fullSeconds % 60 );

  state.ui.timer.innerText =
    ( minutes.length === 1 ? ( '0' + minutes ) : minutes )
    + ':' +
    ( seconds.length === 1 ? ( '0' + seconds ) : seconds );
}

function gameUpdate( dt ) {

}
