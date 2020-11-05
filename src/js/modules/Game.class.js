class Game {

  #BG = [];
  #canvas;
  ctx;
  fullGameWidth;
  collectableItem = [];
  hills = [];
  enemies = [];

  #time = {
    start: performance.now(),
    _gameTime: 0,
    lastUpadate: null,
    dt: null,

    update() {
      this.dt = performance.now() - ( this.lastUpadate || this.start )
      this.lastUpadate = performance.now();

      this._gameTime += this.dt;
    },

    get gameTime() {
      let fullSeconds = Math.floor( this._gameTime / 1000 );
      let minutes = String( Math.floor( fullSeconds / 60 ) );
      let seconds = String( fullSeconds % 60 );

      return ( minutes.length === 1 ? ( '0' + minutes ) : minutes )
        + ':' +
        ( seconds.length === 1 ? ( '0' + seconds ) : seconds );
    }
  };

  state = {
    side: 'left',
    isPause: false,
    isEnd: false,
    isGameover: false,
    isMuted: false,
    globalLeftOffset: 0,
    visibleXCoords: {
      get left() {
        return 0;
      },

      get right() {
        return this.left + this.canvWidth;
      },
    },
  };

  pressedKey = {
    LEFT: false,
    RIGHT: false,
    UP: false,

    get isMoving() {
      return ( this.LEFT || this.RIGHT );
    }
  };

  constructor() {
    this.#getCanvas();
    this.#getUI();
    this.#BG[ 0 ] = new Background();
    this.#setCanvas();
    this.#BG[ 1 ] = new Background( this.canvWidth );
    this.#createAudio();

    this.player = new Player( 0, window.gameData.baseLine );
    this.player.setSprite( gameData.character, 'idle' );
    this.player.setSprite( gameData.character, 'walk' );

    this.#createHills();
    this.#createCollectableItems();
    this.#createEnemies();

    this.#setTime();
    this.#setUI();

    requestAnimationFrame( this.cycle.bind( this ) );
  }

  #getCanvas() {
    this.#canvas = $( '#game-zone canvas' ).get( 0 );
    this.ctx = this.#canvas.getContext( '2d' );
    this.ctx.imageSmoothingQuality = 'high';
  }

  #setCanvas() {
    this.canvWidth = this.#BG[ 0 ].img.width;
    this.canvHeight = this.#BG[ 0 ].img.height;

    let k = document.body.clientWidth / this.canvWidth;
    if ( k * this.canvHeight > document.body.clientHeight ) k = document.body.clientHeight / this.canvHeight;

    $( this.#canvas ).css( { width: k * this.canvWidth, height: k * this.canvHeight } );
    this.#canvas.width = this.canvWidth;
    this.#canvas.height = this.canvHeight;

    this.fullGameWidth = this.canvWidth * 5;
  }

  #getUI() {
    this.UI = new UI();
  }

  #setUI() {
    this.UI.nickname = gameData.nickname;
  }

  #setTime() {

  }

  #createAudio() {
    this.audio = gameResources[ 'audio' ];
  }

  #createCollectableItems() {
    for ( let i = 0; i < 5; i++ )
      this.collectableItem[ i ] = new CollectableItem( 'cheese', this.#randX( this.canvWidth * i + 200, this.canvWidth * ( i + 1 ) - 200 ) );
  }

  #createHills() {
    for ( let i = 0; i < 5; i++ )
      this.hills[ i ] = new Hill( 'hill', this.#randX( this.canvWidth * i + 200, this.canvWidth * ( i + 1 ) - 200 ) );
  }

  #createEnemies() {

  }

  #randX( l, h ) {
    return Math.floor( Math.random() * ( h - l + 1 ) ) + l;
  }

  #jumpK( k ) {
    return k / 80;
  }

  #update() {
    this.#time.update();

    /**
     * Обновляем игрока
     */
    this.player.hp -= 1 * ( this.#time.dt / 1000 );

    if ( this.player.hp === 0 ) {
      this.state.isGameover = true;
      return;
    }

    if ( this.pressedKey.isMoving ) {
      this.player.currentState = 'walk';
      this.player.direction = this.pressedKey.LEFT ? -1 : this.pressedKey.RIGHT ? 1 : this.player.direction;

      let oldX = this.player.coords.x;
      this.player.coords.x += this.player.direction * this.player.speed * ( this.#time.dt / 1000 );

      if ( this.player.coords.x < 0 ) this.player.coords.x = oldX;


      if ( this.state.globalLeftOffset <= -( this.fullGameWidth - this.canvWidth ) ) {
        this.state.globalLeftOffset = -( this.fullGameWidth - this.canvWidth );
        this.state.side = 'right';
      }

      if ( this.state.side === 'left' && this.player.coords.x >= ( this.canvWidth / 2 ) ) {
        this.state.globalLeftOffset -= this.player.coords.x - oldX;
        this.state.side = 'center';
      }
      else if ( this.state.side === 'right' && this.player.coords.x < ( this.canvWidth / 2 ) ) {
        this.state.globalLeftOffset += oldX - this.player.coords.x;
        this.state.side = 'center';
      }
      else if ( this.state.side === 'center' && this.state.globalLeftOffset === 0 ) {
        this.state.globalLeftOffset === 0;
        this.state.side = 'left';
      }
      else if ( this.state.side === 'center' && this.state.globalLeftOffset === -( this.fullGameWidth - this.canvWidth ) ) {
        this.state.side = 'right';
      }
      else if ( this.state.side === 'center' ) {
        this.state.globalLeftOffset -= this.player.coords.x - oldX;
        if ( this.state.globalLeftOffset > 0 )
          this.state.globalLeftOffset = 0;
        if ( this.state.globalLeftOffset <= -( this.fullGameWidth - this.canvWidth ) )
          this.state.globalLeftOffset = -( this.fullGameWidth - this.canvWidth );

        this.player.coords.x = oldX;

        /**
         * Обновляем фон
         */
        for ( let i = 0; i < this.#BG.length; i++ ) {
          this.#BG[ i ].coords.x -= this.player.direction * this.player.speed * ( this.#time.dt / 1000 );
        }
        if ( this.#BG[ 0 ].coords.x < -this.canvWidth ) {
          this.#BG[ 0 ].coords.x = 0;
          this.#BG[ 1 ].coords.x = this.canvWidth;
        } else if ( this.#BG[ 0 ].coords.x > 0 ) {
          this.#BG[ 0 ].coords.x = -this.canvWidth;
          this.#BG[ 1 ].coords.x = 0;
        }
      }
    } else this.player.currentState = 'idle';

    if ( this.pressedKey.UP ) {
      if ( !this.player.jumpState.isJump ) {
        this.player.jumpState.isJump = true;
        this.player.jumpState.jump = true;
      }
    }

    if ( this.player.jumpState.isJump && this.player.jumpState.jump ) {
      if ( this.player.coords.y <= this.player.upperJumpPoint ) {
        this.player.jumpState.jump = false;
        this.player.jumpState.fall = true;
      } else {
        this.player.coords.y -= this.player.jumpSpeed * ( this.#time.dt / 1000 ) * this.#jumpK( this.player.coords.y );
      }
    } else if ( this.player.jumpState.isJump && this.player.jumpState.fall ) {
      if ( this.player.coords.y >= this.player.baseLine ) {
        this.player.jumpState.jump = false;
        this.player.jumpState.fall = false;
        this.player.jumpState.isJump = false;
        this.player.coords.y = this.player.baseLine;
      } else {
        this.player.coords.y += this.player.jumpSpeed * ( this.#time.dt / 1000 ) * this.#jumpK( this.player.coords.y );
      }
    }


    /**
     * Обновляем возвышенности
     */
    this.player.isOnHill = false;
    this.player.isUnderHill = false;
    for ( let i = 0; i < this.hills.length; i++ ) {
      if ( this.player.isAboutHill( this.hills[ i ] ) ) {
        if ( ( this.hills[ i ].surfaceY + 40 ) >= this.player.coords.y ) {
          this.player.baseLine = this.hills[ i ].surfaceY;
          this.player.upperJumpPoint = 100;
          this.player.isOnHill = true;
        }
        else {
          this.player.upperJumpPoint = this.hills[ i ].surfaceY + 50;
          this.player.isUnderHill = true;
        }
        break;
      }
    }

    if ( !this.player.isUnderHill ) {
      this.player.upperJumpPoint = 100;
    }

    if ( !this.player.isOnHill ) {
      if ( this.player.baseLine !== window.gameData.baseLine ) {
        this.player.baseLine = window.gameData.baseLine;
        this.player.jumpState.isJump = true;
        this.player.jumpState.fall = true;
      }
    }


    if ( this.player.coords.x > window.game.canvWidth - this.player.width ) this.state.isEnd = true;

    /**
     * Обновляем врагов
     */


    /**
     * Обновляем собираемые предметы
     */
    for ( let i = 0; i < this.collectableItem.length; i++ ) {
      if ( this.player.checkCollision( this.collectableItem[ i ] ) ) {
        this.#deleteItem( this.collectableItem, i );
        this.player.hp += 20;
        this.player.eatenCheese++;
        break;
      }
    }
  }

  #deleteItem( where, ind ) {
    for ( let i = ind; i < where.length - 1; i++ )
      where[ i ] = where[ i + 1 ];
    where.length--;
  }

  #render() {
    /**
     * Рендерим UI
     */
    this.UI.timer = this.#time.gameTime;
    this.UI.hp = Math.ceil( this.player.hp );
    this.UI.eatenCheese = this.player.eatenCheese;
    this.UI.muteStatus = ( this.state.isMuted ? 'Включить звук - SHIFT' : 'Выключить звук - SHIFT' );

    /**
     * Рендерим графику
     */

    /** Очищаем канвас */
    this.ctx.clearRect( 0, 0, this.canvWidth, this.canvHeight );

    for ( let i = 0; i < this.#BG.length; i++ ) {
      let bgrd = this.#BG[ i ].img.getRenderData();
      this.ctx.drawImage( bgrd.img, this.#BG[ i ].coords.x, 0, this.canvWidth, this.canvHeight );
    }

    for ( let i = 0; i < this.hills.length; i++ ) this.hills[ i ].render();
    for ( let i = 0; i < this.collectableItem.length; i++ ) this.collectableItem[ i ].render();

    this.player.render( this.#time.dt );
  }

  showResults() {
    $( '#score-screen' ).removeClass( 'hide' );
  }

  cycle() {
    if ( this.state.isEnd || this.state.isGameover ) {
      this.showResults();
      return;
    }

    if ( !this.state.isPause ) {
      this.#update();
      this.#render();
    }

    requestAnimationFrame( this.cycle.bind( this ) );
  }

}
