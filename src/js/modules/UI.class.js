/**
 * Предоставление доступа к элементам UI
 */



class UI {
  constructor() {
    this.timer = $( '#timer span.data' ).get( 0 ) || null;
    this.hp = $( '#hp span.data' ).get( 0 ) || null;
    this.eatenCheese = $( '#eaten-cheese span.data' ).get( 0 ) || null;
    this.nickname = $( '#player-name span.data' ).get( 0 ) || null;
    this.muteStatus = $( '#mute-status span.data' ).get( 0 ) || null;
  }

  set( k, v ) {
    if ( !this[ k ] || this.get( k ) === String( v ) ) return;

    this[ k ].innerText = v;
  }

  get( k ) {
    if ( !this[ k ] ) return;

    return this[ k ].innerText;
  }
}
