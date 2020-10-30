/**
 * Основной функционал игры
 */



class Game {

  eatenCheese = 0;
  gameStatus = 'play';

  constructor( character ) {
    this.startAt = performance.now();
    this.time = 0;

    // Создаем персонажа
    this.player = new Player( character );

    this.bg = new Sprite( resourceData[ 'bg' ] );

    // Слежка за нажатием и отжатием клавиш
    !state.restart && $( document ).on( 'keydown keyup', this.keypress.bind( this ) )
  }

  keypress( e ) {
    // Если кнопка зажата, то выходим
    if ( e.originalEvent.repeat ) return;

    // Если кнопки передвижения, то переключаем действие игрока
    if ( e.type === 'keydown' )
      switch ( e.code ) {
        case 'KeyA':
          state.pressedKey.LEFT = true;
          break;
        case 'KeyD':
          state.pressedKey.RIGHT = true;
          break;
        case 'Escape':
          this.gameStatus = this.gameStatus === 'play' ? 'pause' : 'play';
          $( '#pause-screen' ).toggleClass( 'hide' );
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.ui.set( 'muteStatus',
            this.ui.get( 'muteStatus' ) === 'Включить звук - SHIFT'
              ? 'Выключить звук - SHIFT'
              : 'Включить звук - SHIFT' );
          // this.muteToggle();
          break;
      }
    else
      switch ( e.code ) {
        case 'KeyA':
          state.pressedKey.LEFT = false;
          break;
        case 'KeyD':
          state.pressedKey.RIGHT = false;
          break;
      }
  }

  // Обновление игровых объектов
  update( dt ) {
    this.updateTimer( dt );
    this.player._hp -= state.dt( dt ) / 1000;
    this.ui.set( 'hp', this.player.hp );
    this.ui.set( 'eatenCheese', this.eatenCheese );
    this.player.update( dt );

    ( this.player.hp <= 0 ) && ( this.gameStatus = 'gameover' );
  }

  // Обновление значения таймера
  updateTimer( dt ) {
    this.time += state.dt( dt );

    let fullSeconds = Math.floor( this.time / 1000 );
    let minutes = String( Math.floor( fullSeconds / 60 ) );
    let seconds = String( fullSeconds % 60 );

    this.ui.set( 'timer',
      ( minutes.length === 1 ? ( '0' + minutes ) : minutes )
      + ':' +
      ( seconds.length === 1 ? ( '0' + seconds ) : seconds )
    );
  }

  // Отрисовываем игровые объекты
  render( dt ) {
    this.player.render( dt );
  }

}
