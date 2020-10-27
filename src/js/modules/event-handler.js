$( document ).ready( () => {

  // Сделаем звук ролика потише
  $( 'video#TAJ-history' ).get( 0 ).volume = 0.5;

  // По окончанию ролика переходим на первый экран
  $( 'video#TAJ-history' ).on( 'ended', () => {
    $( '#pre-history' ).toggleClass( 'hide' );
    $( '.first-screen' ).toggleClass( 'hide' );
  } );

  // Следим за пробелом на первом экране, что бы пропустить видео
  $( document ).keydown( ( e ) => {
    if ( $( '#pre-history' ).hasClass( 'hide' ) ) return;

    if ( e.keyCode == 32 ) {
      $( 'video#TAJ-history' ).get( 0 ).pause();
      $( '#pre-history' ).toggleClass( 'hide' );
      $( '.first-screen' ).toggleClass( 'hide' );
    }
  } );

  // Следим за нажатием на подсказке о пропуске ролика, чтобы завершить видео
  $( '.skip' ).click( () => {
    $( 'video#TAJ-history' ).get( 0 ).pause();
    $( '#pre-history' ).toggleClass( 'hide' );
    $( '.first-screen' ).toggleClass( 'hide' );
  } );

  // Следим за выбором мышей и переключаем классы и активность кнопки выбора
  $( '.mouse' ).click( function () {
    $( this ).hasClass( 'picked' )
      ? $( this ).toggleClass( 'picked' )
      : $( '.mouse' ).removeClass( 'picked' ) && $( this ).toggleClass( 'picked' );

    $( '.mouses' ).find( '.picked' ).length
      ? $( '#js-pick' ).removeAttr( 'disabled' )
      : $( '#js-pick' ).attr( 'disabled', true );
  } );

  // Следим за кликом по кнопке выбора для перехода к следующему окну
  $( '#js-pick' ).click( function () {
    if ( $( this ).attr( 'disabled' ) ) return;

    $( '.first-screen' ).toggleClass( 'hide' );

    playerInfo.character = $( '.mouse.picked img' ).attr( 'data-character' );
    loadCharacter();

    $( '.second-screen' ).toggleClass( 'hide' );
  } );

  // Следим за вводом никнейма и активируем кнопку если ник больше 3 символов
  $( '#js-nickname' ).keyup( function () {
    ( $( this ).val().length >= 3 )
      ? $( '#js-start' ).removeAttr( 'disabled' )
      : $( '#js-start' ).attr( 'disabled', true );
  } );

  // Следим за кнопкой начала игры
  $( '#js-start' ).click( function () {
    if ( $( this ).attr( 'disabled' ) ) return;

    $( '.second-screen' ).toggleClass( 'hide' );

    playerInfo.nickname = $( '#js-nickname' ).val();
    window.taj_game = new Game();

    $( '.game-zone' ).toggleClass( 'hide' );
  } );

} );
