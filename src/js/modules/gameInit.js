/**
 * Описание функций запуска и контроля игры
 */



// Инициализация необходимых объектов
function startGame() {
  console.log( 'Начало игры' );

  // Инициализируем canvas
  state.canvas = $( '#game-zone canvas' ).get( 0 );
  state.canvas.width = 1599;
  state.canvas.height = 837;

  // Устанавливаем базовую линию
  state.baseLine = state.canvas.height - 200;

  // Настраиваем контекст
  state.ctx = state.canvas.getContext( '2d' );
  state.ctx.imageSmoothingQuality = 'high';
  state.ctx.imageSmoothingEnable = false;

  // Создаем игру
  state.game = new Game( state.character );

  // Инициализируем UI
  state.game.ui = new UI();
  state.game.ui.set( 'nickname', state.nickname );


  // Планируем запуск обновления фреймов
  state.lastUpdate = null;
  requestAnimationFrame( update );
}



// Обновление фреймов
function update( dt ) {
  // Если стоит пауза - ничего не отрисовываем
  if ( state.screen === 'game' && state.game.gameStatus !== 'play' ) {
    switch ( state.game.gameStatus ) {
      case 'gameover':
      case 'end':
        $( '#score-screen' ).removeClass( 'hide' );
        return;
    }

    state.lastUpdate = performance.now();
    requestAnimationFrame( update );

    return;
  }

  // Обновляем состояние игры
  state.game.update( dt );

  // Отрисовываем
  render( dt );

  // Планируем следующий фрейм
  state.lastUpdate = performance.now();
  requestAnimationFrame( update );
}

// Отрисовывает игру
function render( dt ) {
  // Временная зарисовка всего канваса черным
  state.ctx.fillStyle = '#000000';
  state.ctx.fillRect( 0, 0, state.canvas.width, state.canvas.height );

  // Запускаем отрисовку игровых объектов
  state.game.render();
}




// =================================
// Настройка на время написания игры
state.screen = 'game';
state.nickname = 'Akkie';
state.character = 'Jerry'.toLowerCase();
startGame();
// ===================================
