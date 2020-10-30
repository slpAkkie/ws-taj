/**
 * Глобальный объект для хранения состояния игры
 */

window.state = {
  screen: 'prehistory',     // Активный экран
  restart: false,
  nickname: null,           // Никнейм игрока
  character: null,          // Выбранный персонаж
  ui: {},                   // Ссылки на UI элементы
  baseLine: null,           // Базовая y координата для спавна
  pressedKey: {
    LEFT: false,
    RIGHT: false,
  },

  dt( dt ) {
    return dt - ( this.lastUpdate || dt )
  }
}
