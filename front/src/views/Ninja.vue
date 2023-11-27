<template>
  <div>
    <div class="word-ninja">
      <div class="close-btn" v-if="game.start">
          <router-link to="/subjects">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                  <path fill="#FFFFFF" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
          </router-link>
      </div>

      <div class="status-bar" v-if="game.start">
        <div class="stat">
          <div class="stat-cont">Score: {{game.score}}</div>
          <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
        </div>
        <div class="stat">
          <div class="stat-cont">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ff4800" height="1em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
            {{game.live}}
          </div>
          <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
        </div>
      </div>

      <div class="time" v-if="game.start">{{ timeDisplay }}</div>
      <div class="combo" v-bind:style="{'opacity': modals.combo}">Combo {{game.combo}}+</div>
      <img v-if="!game.start" src="@/assets/images/games/fruit/bg.jpg" alt="" class="background-img">
      <div class="start-button" v-if="!game.start">
        <div v-if="game.startCounting">{{counter.start}}</div>
        
        
        <div v-if="!game.startCounting" @click="startCounter">
          <p class="txt">START</p>
          <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
        </div>
        <router-link to="/subjects" v-if="!game.startCounting">
          <div>
            <p class="txt">Exit</p>
            <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
          </div>
        </router-link>
      </div>

      <div class="fruit-container">
        <div class="fruit-container-body">
          <!-- <div class="fruit">hello</div> -->
          <div ref="canvas" id="vue-canvas" class="fruit-canvas"></div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modals: {
        combo: 0
      },
      lesson: {
        id: null,
        lvl: null,
        wpm: 0
      },
      text: {
        full: '',
        list: [],
        current: []
      },
      game: {
        start: false,
        startCounting: false,
        finish: false,
        score: 0,
        live: 5,
        combo: 0,
        seconds: 60
      },
      sound: {
        combo: null,
        splash: null,
        error: null,
        die: null
      } ,
      timer: {
        combo: null,
        start: null,
        game: null
      },
      counter: {
          current : 0,
          realWpm: 0,
          accuracy: 0,
          wpm: 0,
          start: 3,
          time_passed : 1,
          characters: 0,
          errors: 0,
          combo: 3000
      },
    }
  },
  computed: {
    timeDisplay() {
      if (this.game.seconds > 59) {
        return '1:00';
      } else {
        return this.game.seconds > 9 ? '0:' + this.game.seconds : '0:0' + this.game.seconds;
      }
    }
  },
  methods: {
    async split() {
      this.text.list = this.text.full.split('');
    },
    liveCounter(drop = false) {
      this.sound.die.pause();
      this.sound.die.currentTime = 0;

      this.sound.error.pause();
      this.sound.error.currentTime = 0;

      if (this.game.live > 1) {
        this.game.live--;
        this.game.combo = 0;
        if (this.game.score > 0)
          this.game.score -= 50;

        if (this.game.score < 0)
          this.game.score = 0;

      } else {
        this.gameOver();
      }

      if (!drop) {
        this.sound.error.play();
        return;
      }

      this.sound.die.play();
    },
    finishGame() {
      this.game.finish= true;
      alert('finish')
    },
    gameOver() {
      this.game.start = false;
      this.game.finish = true;
    },
    async gettext() {
      const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson', {id: this.lesson.id});
      if (Number.isInteger(data)) { 
        if (data === 402) { this.$router.push('/price'); return; }
        this.$router.push('/subjects'); return;
      }

      this.lesson.wpm = data.data.wpm;
      this.text.full = data.data.text;
      this.lesson.lvl = data.data.lvl;
      await this.split();
    },
    comboTimerCounter() {
      if (this.counter.combo>0) 
        this.counter.combo-=100;
    },
    gameTimeCounter() {
      if (this.game.seconds > 0) {
        this.game.seconds--;
      } else {
        clearInterval(this.timer.game);
        this.gameOver();
      }
    },
    keyPress(evt) {
      if (!this.game.start) 
        return;
      
      let pressed = false, find = false;

      this.sound.splash.pause();
      this.sound.splash.currentTime = 0;

      this.sound.combo.pause();
      this.sound.combo.currentTime = 0;

      this.text.current.forEach(element => {
        if (pressed) { return; }
        if (element.current) {
          if (element.find) {
            return;
          }

          if (element.word === evt.key) {
            pressed = true;
            find = true;
            element.find = true;
            element.updateIndex();
            element.c.setAlpha(0);
            return;
          }
        }
      });

      if (!find) {
        this.liveCounter();
        this.counter.errors++;
      } else {
        this.game.combo++;
        if (this.game.combo > 4) {
          if (this.counter.combo > 0) {
            this.counter.combo = 3000;
            this.modals.combo = 1;
            this.sound.combo.play();
            setTimeout(() => {
              this.modals.combo = 0;
            }, 500);
            this.game.score += 220; 
          } else {
            this.counter.combo = 3000;
            this.sound.splash.play();
            this.game.score += 200;
            this.game.combo = 0;
          }
        } else {
          this.sound.splash.play();
          this.game.score += 200;
        }

        this.counter.characters++;
      }
    },
    startCounter() {
      this.game.startCounting = true;
      this.timer.start = setInterval(() => {
        if (this.counter.start > 1) {
          this.counter.start--;
        } else {
          clearInterval(this.timer.start);
          this.startGame();
        }
      }, 1000);
    },
    makeAnimateWords() {
      const root = this;
      this.text.current = [];
      const script = function(p5) {

        let bg;
        p5.setup = _ => {
          const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
          canvas.parent("vue-canvas");
          bg = p5.loadImage(require('@/assets/images/games/fruit/bg.jpg'));
          const colors =[[189, 66, 59], [137, 176, 29], [209, 146, 30], [204, 103, 15]];
          p5.frameRate(60);
          for (let i = 0; i < root.text.list.length; i++) {
            root.text.current.push(new root.$_fruit(Math.random() * window.innerWidth * 0.9, window.innerHeight, 80, p5.color(colors[Math.floor(Math.random() * 3)]), 5, p5, root.text.list[i], i, root.finishGame, root.liveCounter));
          }
        };

        
        
        p5.draw = _ => {
          p5.clear();
          p5.background(bg);
          for (let i = 0; i < root.text.current.length; i++) {
            if (!root.game.finish) {
              root.text.current[i].update();
              root.text.current[i].draw();
            }
          }
        };
      };
      
      const P5 = require("p5");
      new P5(script);
    },
    startGame() {
      // this.game.start = true;
      this.game.start = true;
      this.makeAnimateWords();

      this.timer.game = setInterval(this.gameTimeCounter, 1000);
    }
  },
  async mounted() {
    this.lesson.id = this.$route.params.id;
    await this.gettext();

    this.sound.combo = new Audio(require(`@/assets/sound/combo.mp3`));
    this.sound.splash = new Audio(require(`@/assets/sound/splash.mp3`));
    this.sound.error = new Audio(require(`@/assets/sound/error.mp3`));
    this.sound.die = new Audio(require(`@/assets/sound/die.wav`));
    this.timer.combo = setInterval(this.comboTimerCounter, 100);
    document.addEventListener('keypress', this.keyPress);
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.comboTimerCounter);
    document.removeEventListener('keypress', this.keyPress);
    next();
  }
}
</script>