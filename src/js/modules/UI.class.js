/** Хранит и управляет содержимым UI игры */
class UI {

  #timer;
  #hp;
  #eatenCheese;
  #nickname;
  #muteStatus;

  constructor() {
    try {
      this.#timer = $( '#timer span.data' ).get( 0 ) || this.#notFound( 'Поле: Таймер' );
      this.#hp = $( '#hp span.data' ).get( 0 ) || this.#notFound( 'Поле: HP' );
      this.#eatenCheese = $( '#eaten-cheese span.data' ).get( 0 ) || this.#notFound( 'Поле: Количество съеденного сыра' );
      this.#nickname = $( '#player-name span.data' ).get( 0 ) || this.#notFound( 'Поле: Никнейм' );
      this.#muteStatus = $( '#mute-status span.data' ).get( 0 ) || this.#notFound( 'Поле: Статус аудио' );
    } catch ( TypeError ) {
      throw Error( 'Объектов с такими id нет' );
    }
  }

  #notFound( o ) {
    throw Error( `Объект не был найден. ${o}` );
  }

  get timer() {
    return this.#timer.innerText;
  }
  set timer( v ) {
    if ( String( v ) === this.#timer ) return;

    this.#timer.innerText = String( v );
  }

  get hp() {
    return this.#hp.innerText;
  }
  set hp( v ) {
    if ( String( v ) === this.#hp ) return;

    this.#hp.innerText = String( v );
  }

  get eatenCheese() {
    return this.#eatenCheese.innerText;
  }
  set eatenCheese( v ) {
    if ( String( v ) === this.#eatenCheese ) return;

    this.#eatenCheese.innerText = String( v );
  }

  get nickname() {
    return this.#nickname.innerText;
  }
  set nickname( v ) {
    if ( String( v ) === this.#nickname ) return;

    this.#nickname.innerText = String( v );
  }

  get muteStatus() {
    return this.#muteStatus.innerText;
  }
  set muteStatus( v ) {
    if ( String( v ) === this.#muteStatus ) return;

    this.#muteStatus.innerText = String( v );
  }

}
