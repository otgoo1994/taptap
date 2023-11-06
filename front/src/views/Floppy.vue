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
      <img src="@/assets/images/games/floppy/live5.png" ref="live" alt="live" class="live-img">
      <div class="start-button" :hidden="lesson.startBtn">
        <div @click="startGame" class="start">START</div>
      </div>
      <div v-if="!lesson.start" class="start-cont">{{seconds.start}}</div>

      <div class="start-button" :hidden="!lesson.finish">
        <div v-if="lesson.won">
          You are won
        </div>
        <div v-else>
          You lose!!
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
        live: 5,
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
          characters: 0
      },
      sounds: {
        error: null,
        passed: null,
        die: null,
        going: null
      },
      timer: {
        start: null
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
    finishGame(result) {


      this.paused = true;
      if (result) {
        this.lesson.won = true;
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

        this.sounds.error.play();
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
              this.$refs.bird.style.opacity = '0';

              if (this.bird.live > 1) {
                this.bird.live--;
                this.$refs.bird.src = this.bird.alive;;
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
      if (!data) { this.$router.push('/subjects'); return; }
      this.text.full = data.data.text;
      this.lesson.lvl = data.data.lvl;
      this.split();
    },
    split() {
      this.text.splitted = this.text.full.split('');
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

      setTimeout(() => {
        this.paused = false;
        this.lesson.start = true;
        this.seconds.start = 3;
        clearInterval(this.timer.start);
      }, 1000);
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
  }
}
</script>