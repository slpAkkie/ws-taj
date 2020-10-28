class Game {

  constructor() {
    this.startTime = Date.now();

    this.GetUI();

    // Устанавливаем имя пользователя
    this.ui.nickname.innerText = playerInfo.nickname;

    // Получаем canvas и 2d контекст
    this.canvas = $( '#TAJ-game' ).get( 0 );
    this.ctx = this.canvas.getContext( '2d' )

    // Запускаем обновление фреймов
    setInterval( ( () => {
      this.update();
    } ).bind( this ), 1000 / 60 );
  }

  GetUI() {
    // Получаем элементы UI
    this.ui = {};
    this.ui.timer = $( '.game-UI .timer span.data' ).get( 0 );
    this.ui.hp = $( '.game-UI .hp span.data' ).get( 0 );
    this.ui.eatenCheese = $( '.game-UI .eaten-cheese span.data' ).get( 0 );
    this.ui.nickname = $( '.game-UI .player-name span.data' ).get( 0 );
    this.ui.muteStatus = $( '.game-UI .mute-status span.data' ).get( 0 );
  }

  // Обновляет таймер (Сколько времени прошло с начала игры)
  updateTimer() {
    let fullSeconds = Math.floor( ( Date.now() - this.startTime ) / 1000 );
    let minutes = String( Math.floor( fullSeconds / 60 ) );
    let seconds = String( fullSeconds - minutes * 60 );

    this.ui.timer.innerText =
      ( minutes.length < 2 ? '0' + minutes : minutes )
      + ':' +
      ( seconds.length < 2 ? '0' + seconds : seconds )
  }

  // Обновление кадров игры
  update() {
    // Очищаем canvas для нового фрейма
    this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.heigth );

    this.updateTimer();
  }

}
