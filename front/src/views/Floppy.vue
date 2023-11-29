<template>
  <div>
    <div class="floppy" ref="container">

      <div class="close-btn">
          <router-link to="/subjects">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                  <path fill="#FFFFFF" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
          </router-link>
      </div>
      <img src="@/assets/images/games/floppy/bg.jpg" alt="bg-image" ref="background" class="background-img">
      <img src="@/assets/images/games/floppy/bird.png" ref="bird" alt="bird-iamge" class="bird-img">
      <img src="@/assets/images/games/floppy/live3.png" ref="live" alt="live" class="live-img">
      <div class="start-button" :hidden="lesson.startBtn">
        <div @click="startGame" class="start">START</div>
      </div>
      <div v-if="!lesson.start" class="start-cont">{{seconds.start}}</div>

      <div class="start-button" :hidden="!lesson.finish">
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
                  <div @click="restartGame" class="start">try again</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="text-container">
        <div class="dimmed"></div>
        <div class="body">
          <div class="current" ref="current">
            <div class="item" v-bind:class="{'active' : text.current === index}" v-for="(item, index) in strings" :key="index">
              <div class="pointer"></div>
              <div class="line"></div>
              <div class="txt">{{item}}</div>
              <div class="wrong"></div>
            </div>
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
      bird: {
        alive: require('@/assets/images/games/floppy/bird.png'),
        die: require('@/assets/images/games/floppy/birdDie.png'),
        live: 3,
        originalY: 0
      },
      scrolled: 0,
      paused: true,
      gravityY: 1,
      gravityX: 2,
      birdY: 0,
      jumpStep: 50,
      lesson: {
        id: null,
        lvl: null,
        wpm: 0,
        start: false,
        startBtn: false,
        finish: false,
        won: false
      },
      text: {
        full: '',
        splitted: [],
        current: 0,
        step: 0,
        length: 0
      },
      counter: {
          current : 0,
          realWpm: 0,
          accuracy: 0,
          wpm: 0,
          start: false,
          time_passed : 1,
          characters: 0,
          errors: 0,
          missed_word: 0
      },
      chart: {
          data: null,
          keyword: null,
          wpm: [],
          score: 0,
          accuracy: 0,
          characters: 0,
          currWpm: 0
      },
      sounds: {
        error: null,
        passed: null,
        die: null,
        going: null
      },
      timer: {
        start: null,
        handler: null
      },
      seconds: {
        start: 3
      }
    }
  },
  computed: {
    strings() {
      const arr = [];
      this.text.splitted.forEach((element, index) => {
        if (index >= this.text.step * 10 && index < (this.text.step + 1) * 10) {
          arr.push(element);
        }
      });
      this.text.length = arr.length;
      return arr;
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
    async finishGame(result) {
      clearInterval(this.timer.handler);

      this.paused = true;
      if (result) {
        var score = 0; var accuracy= 0; var wpm = 0, diff_acc = 0;
        var typed = this.counter.characters + this.counter.errors;
        accuracy = parseInt(typed / ( typed + this.counter.errors )  * 100 );
        wpm = parseInt((this.counter.characters / 5) / (this.counter.time_passed / 60));

        if (wpm < this.lesson.wpm) {
          this.lesson.won = false;
        } else {
          this.lesson.won = true;
          if(accuracy > 80) {
            var diff = accuracy - 80;
            diff_acc = parseInt((diff * 80) / 20);
              
          } else {
              diff_acc = 0;
          }
        }
      }

      var wpmPoint = 60;
      var livePoint = this.bird.live * 20;
      score = wpmPoint + diff_acc + livePoint;

      this.chart.currWpm = wpm;
      this.chart.accuracy = accuracy;
      this.chart.score = score;

      if (this.lesson.won) {
        const data = await this.$_request('POST', this.$appUrl +'/lesson/update-user-lesson', {lessonId: this.lesson.id, wpm, accuracy, score, level: this.lesson.lvl});
        if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
        }

        if(data.point > 0) {
            Event.$emit('set-user-point', data.point);
        }
      }

      this.lesson.finish = true;
    },
    addResult() {
      this.sounds.passed.pause();
      this.sounds.passed.currentTime = 0;

      this.text.current+=1;

      if (this.text.step * 10 + this.text.current === this.text.splitted.length) {
        this.finishGame(true);
      }

      if (this.text.current >= this.text.length) {
        this.text.current = 0;
        this.text.step += 1;
      }
      this.birdY -= this.jumpStep;
      this.sounds.passed.play();
      this.counter.characters++;
      
    },
    keyPress(evt) {
      if (this.paused) {
        return;
      }

      this.sounds.error.pause();
      this.sounds.error.currentTime = 0;

      const match = evt.key === this.text.splitted[this.text.step * 10 + this.text.current];
      if (!match) { 
        const item = this.$refs.current.querySelectorAll('.item')[this.text.current];
        if (!item) {
          return;
        }

        const err = item.querySelector('.wrong');
        if (!err) {
          return;
        }

        this.birdY += this.jumpStep;

        this.sounds.error.play();
        this.counter.errors++;
        err.innerHTML = evt.key;
        item.classList.add('error');
        setTimeout(() => {
          item.classList.remove('error');
          err.innerHTML = '';
        }, 300);
        return; 
      }

      this.addResult();
    },
    bgPosition() {
      if (this.paused) { 
        requestAnimationFrame(this.bgPosition);
        return; 
      }

      const distance = this.$refs.background.clientWidth*0.95 - this.$refs.container.clientWidth;
      this.scrolled < distance ? 
      this.scrolled+=this.gravityX
      : null;
      this.$refs.background.style.transform = 'translateX(-'+this.scrolled+'px)';
      requestAnimationFrame(this.bgPosition);
    },
    jumpBird() {
      if (this.paused) {
        requestAnimationFrame(this.jumpBird);
        return;
      }

      const h = this.$refs.container.clientHeight;
			this.birdY += this.gravityY*h/1080;
      
      if (this.birdY < 0) {
				this.birdY = 0;
			}

      if (this.birdY > (this.$refs.container.clientHeight*0.8 - this.$refs.bird.clientHeight)) {
				this.birdY = this.$refs.container.clientHeight*0.8 - this.$refs.bird.clientHeight;
        this.paused = true;
        this.diedBird();
			}

			this.$refs.bird.style.top = this.birdY + 'px';
      requestAnimationFrame(this.jumpBird);
    },
    diedBird() {
      
      if (!this.paused) { return; }

      this.sounds.die.pause();
      this.sounds.die.currentTime = 0;
      this.sounds.die.play();


      setTimeout(() => {
        this.$refs.bird.src = this.bird.die;
        this.$refs.bird.style.top = (this.birdY-50) + 'px';
        let timer = null, counter = this.$refs.bird.offsetTop;

        const distance = this.$refs.container.clientHeight;
        setTimeout(() => {
          timer = setInterval(() => {
            if (counter < distance) {
              counter += 15*this.$refs.container.clientHeight/630;
              this.$refs.bird.style.top = counter+'px'
            } else {
              clearInterval(timer);
              if (this.bird.live > 1) {
                this.$refs.bird.style.opacity = '0';
                this.bird.live--;
                this.$refs.bird.src = this.bird.alive;
                this.$refs.live.src = require('@/assets/images/games/floppy/live'+this.bird.live+'.png');
                this.reBornBird();
              } else {
                this.finishGame(false);
              }
            }
          }, 20);
        }, 500);
      }, 20);
    },
    reBornBird() {
      this.$refs.bird.style.top = this.bird.originalY + 'px';
      this.birdY = this.bird.originalY;
      setTimeout(() => {
        this.$refs.bird.style.opacity = 1;
        this.$refs.bird.classList.add('blink');

        setTimeout(() => {
          this.$refs.bird.classList.remove('blink');
          this.paused = false;
        }, 2000);
      }, 1000);
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
      this.split();
    },
    split() {
      this.text.splitted = this.text.full.split('');
    },
    resetParams() {
        this.counter = { current : 0, realWpm: 0, accuracy: 0, wpm: 0, start: false, time_passed : 1, characters: 0, errors: 0, missed_word: 0 };
        this.chart = { data: null, keyword: null, wpm: [], score: 0, accuracy: 0, characters: 0, currWpm: 0 };
        this.scrolled = 0;
        this.bird.live = 3;
        this.seconds.start = 3;
        this.text.current = 0;
        this.text.step = 0;
        this.text.length = 10;
        this.lesson.start = false;
        this.lesson.startBtn = false;
        this.lesson.finish = false;
        this.lesson.won = false;
        this.$refs.bird.style.opacity = '1';
        this.birdY = this.bird.originalY;
        this.$refs.bird.style.top = this.bird.originalY + 'px';
        this.$refs.bird.src = this.bird.alive;
        this.$refs.live.src = require('@/assets/images/games/floppy/live3.png');
    },
    restartGame() {
      this.resetParams();
      this.startGame();
    },
    startGame() {
      this.lesson.startBtn = true;
      this.timer.start = setInterval(this.starter, 1000);
      this.sounds.going.pause();
      this.sounds.going.currentTime = 0;
      this.sounds.going.play();
    },
    starter() {
      if (this.seconds.start > 1) {
        this.seconds.start--;
        return;
      }

      this.seconds.start = 'GOO!!';
      clearInterval(this.timer.start);

      setTimeout(() => {
        this.paused = false;
        this.lesson.start = true;
        this.seconds.start = 3;
        this.timer.handler = setInterval(this.handleTimer, 1000);
      }, 1000);
    },
    handleTimer() {
      this.counter.time_passed++;

      console.log(this.counter.time_passed, '=====');
      const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
      this.chart.wpm.push(wpm);
    }
  },
  mounted() {
    this.lesson.id = this.$route.params.id;
    this.birdY = this.$refs.bird.offsetTop;
    this.bird.originalY = this.birdY;
    this.sounds.error = new Audio(require(`@/assets/sound/error.mp3`));
    this.sounds.passed = new Audio(require(`@/assets/sound/pass.mp3`));
    this.sounds.die = new Audio(require(`@/assets/sound/die.wav`));
    this.sounds.going = new Audio(require(`@/assets/sound/going.mp3`));
    this.gettext();
    requestAnimationFrame(this.bgPosition);
    requestAnimationFrame(this.jumpBird);
    document.addEventListener('keypress', this.keyPress);
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer.start);
    clearInterval(this.timer.handler);
    document.removeEventListener('keypress', this.keyPress);
    next();
  }
}
</script>