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


      <div class="result-dialog" :hidden="!game.finish" :style="{'background-image': 'url('+require('@/assets/images/games/fruit/bg.jpg')+')'}">
        <div v-if="lesson.won" class="won">
          YOU WON!
          <div class="stat">
            <table>
              <tr>
                <td>{{chart.currWpm}}WPM</td>
                <td>{{chart.accuracy}}% ACC</td>
                <td>{{chart.score}}PT</td>
              </tr>
              <tr>
                <td colspan="3" align="center">
                  <div class="status">
                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дахин оролдох" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" @click="restartGame" viewBox="0 0 512 512">
                            <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                        </el-tooltip>
                    </div>

                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дараагийн хичээл" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" @click="getNextLesson" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                        </el-tooltip>
                        
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div v-else class="lose">
          YOU LOSE!
          <div class="stat">
            <table>
              <tr>
                <td>{{chart.currWpm}}WPM</td>
                <td>{{chart.accuracy}}% ACC</td>
                <td>{{chart.score}}PT</td>
              </tr>
              <tr>
                <td colspan="3" align="center">
                  <!-- <div class="start">try again</div> -->
                  <div @click="restartGame">
                    <p class="txt">TRY AGAIN</p>
                    <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
                  </div>
                  <router-link to="/subjects">
                    <div>
                      <p class="txt">Exit</p>
                      <img src="@/assets/images/games/fruit/statBg.jpg" alt="">
                    </div>
                  </router-link>
                </td>
              </tr>
            </table>
          </div>
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
        wpm: 0,
        won: false
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
      chart: {
        currWpm: 0,
        score: 0,
        accuracy: 0
      },
      canvas: false
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
    async getNextLesson() {
        const data = await this.$_request('POST', this.$appUrl +'/lesson/next-lesson', {level: this.lesson.lvl + 1});
        if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
        }

        if (data.result == 'fail') { this.$router.push('/subjects'); return; }

        const path = this.$_method.getLessonRoute(data.data.type);
		    this.$router.push({name: path, params: {id: data.data.id}});
    },
    async split() {
      this.text.list = this.text.full.split('');
    },
    resetParams() {
        this.text.current.forEach(element => {
          element.reset();
        });

        this.counter = { current : 0, realWpm: 0, accuracy: 0, wpm: 0, start: 3, time_passed : 1, characters: 0, errors: 0, combo: 0 };
        this.chart = { score: 0, accuracy: 0, currWpm: 0 };
        this.timer = { combo: null, start: null, game: null };
        this.game = { start: false, startCounting: false, finish: false, score: 0, live: 5, combo: 0, seconds: 60 };
        this.lesson.won = false;
        this.modals.combo = 0;
    },
    restartGame() {
      // this.resetParams();
      // this.startCounter();

      location.reload();
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
      var wpm = parseInt((this.counter.characters / 5) / (this.counter.time_passed / 60));
      var typed = this.counter.characters + this.counter.errors;
      var accuracy = parseInt(typed / ( typed + this.counter.errors )  * 100 );
      this.lesson.won = true;
      const livePoint = this.game.live * 30;
      var wpmPoint = wpm * 50 / this.lesson.wpm;
      if (wpmPoint > 50) {
        wpmPoint = 50;
      }


      this.chart.accuracy = accuracy;
      this.chart.currWpm = wpm;
      this.chart.score = wpmPoint + livePoint;

      clearInterval(this.timer.combo);
      clearInterval(this.timer.game);
    },
    gameOver() {
      this.game.start = false;
      this.game.finish = true;
      this.lesson.won = false;

      clearInterval(this.timer.combo);
      clearInterval(this.timer.game);
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
        this.counter.time_passed++;
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
          if (!root.cavvas) {
            root.cavvas = p5.createCanvas(window.innerWidth, window.innerHeight);
            root.cavvas.parent("vue-canvas");
          }

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
      this.game.start = true;
      if (!this.canvas) {
        this.makeAnimateWords();
      }

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
    clearInterval(this.timer.combo);
    clearInterval(this.timer.game);
    document.removeEventListener('keypress', this.keyPress);
    next();
  }
}
</script>