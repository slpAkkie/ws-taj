function startGame() {
  console.log( 'Начало игры' );

  state.ui.timer = $( '#timer span.data' ).get( 0 ) || null;
  state.ui.hp = $( '#hp span.data' ).get( 0 ) || null;
  state.ui.eatenCheese = $( '#eaten-cheese span.data' ).get( 0 ) || null;
  state.ui.nickname = $( '#player-name span.data' ).get( 0 ) || null;

  state.ui.nickname.innerText = state.nickname;

  state.canvas = $( '#game-zone canvas' ).get( 0 );
  state.canvas.width = document.body.clientWidth;
  state.canvas.height = document.body.clientHeight;

  state.ctx = state.canvas.getContext( '2d' );
  state.ctx.imageSmoothingQuality = 'high';
  state.ctx.imageSmoothingEnable = false;

  state.game = new Game( state.character );


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
  state.game.update( dt );

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




// =================================
// Настройка на время написания игры
state.screen = 'game';
state.nickname = 'Akkie';
state.character = 'Jerry'.toLowerCase();
startGame();
// ===================================
