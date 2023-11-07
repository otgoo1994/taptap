<template>
  <div style="user-select: none;">
    <div class="interact-container">
      <div class="container">
        <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/background.png')+'\')'}"></div>

        <!-- <div class="start-button" :hidden="hidden.choose">
          <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/thumbnail.png')+'\')'}"></div>
          <div class="start-button-container">
            <div @click="chooseRank('EASY')" class="choose">EASY</div>
            <div @click="chooseRank('MEDIUM')" class="choose">MEDIUM</div>
            <div @click="chooseRank('HARD')" class="choose">HARD</div>
          </div>
        </div> -->

        <div class="start-button" :hidden="hidden.start">
          <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/thumbnail.png')+'\')'}"></div>
          <div @click="startGame" class="start">START</div>
        </div>

        <div class="start-button" :hidden="hidden.gameover">
          <div class="background" :style="{'background-image': 'url(\''+require('@/assets/images/games/tubes/thumbnail.png')+'\')'}"></div>
          <div @click="refershLesson" class="start">TRY AGAIN</div>
        </div>

        <div class="titles">
          <div class="body">
            <img class="titles-img" src="@/assets/images/games/tubes/point.png" alt="point">
            <img class="titles-img" ref="live" :src="getLiveImg" alt="point">
            <img class="titles-img" id="point" src="@/assets/images/games/tubes/totalPoints.png" alt="point">
            <p class="my-point" id="myPoint">{{myScore}}</p>

            <div class="progressbar">
              <div class="progressbar-container">
                <img src="@/assets/images/games/tubes/progressbarTime.png" class="clock" alt="clock">
                <img src="@/assets/images/games/tubes/progressContainer.png" class="wh-background" alt="white-bg">
                <div class="percent" ref="percent"></div>
              </div>
            </div>
          </div>
        </div>

         <div class="mytube">
            <div class="tube-container">
              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube3.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube1.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube2.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube8.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube4.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube5.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube6.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word "></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>

              <div class="tube-box">
                <div class="tube-box-body">
                  <img src="@/assets/images/games/tubes/tube7.png" class="tube" alt="">
                  <div class="character">
                    <div class="body">
                      <div class="word"></div>
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>


        <div class="text-input">
          <div class="input-container">
            <!-- <img src="@/assets/images/games/tubes/input.png" class="input-image" alt="">
            <div class="input" id="input" @keypress="keypress" contenteditable></div>
            <div class="submit" id="submit"></div> -->

            <div class="input-container-body">
              <div class="body-container">
                <div class="input" ref="input" @keypress="keypress" contenteditable></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="result-dialog" :hidden="!resultDialog">
            <div>
                <div class="text right"><span class="title">SCORE </span><br><span class="number">{{chart.score}}</span></div>
                <div class="text right"><span class="title">ACC </span><br><span class="number">{{chart.accuracy}}%</span></div>
            </div>
            <div class="chart-container">
                <canvas ref="resultChart"></canvas>
                <div class="status">
                    <div class="text"><span class="title">CHARACTERS </span><br><span class="number">{{this.counter.characters}}</span></div>
                    <div class="text"><span class="title">WPM </span><br><span class="number">{{Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60))}}</span></div>
                    <div class="text"><span class="title">HIGH WPM </span><br><span class="number">{{getHighWpm}}</span></div>
                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дахин оролдох" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" @click="refershLesson" viewBox="0 0 512 512">
                            <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                        </el-tooltip>
                    </div>

                    <div class="actions-info">
                        <el-tooltip class="item" effect="dark" content="Дараагийн хичээл" placement="top-end">
                            <svg xmlns="http://www.w3.org/2000/svg" @click="getNextLesson" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                        </el-tooltip>
                        
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      resultDialog: false,
      wordList: [],
      currentWords : [],
      findWordLength        : 0,
      currentIdx            : 0,
      play                  : false,
      timer                 : null,
      seconds               : 60,
      live                  : 5,
      myScore               : 0,
      characters            : [
        {
          class: 'character-1',
          url: require('@/assets/images/games/tubes/character1.png')
        },
        {
          class: 'character-2',
          url: require('@/assets/images/games/tubes/character2.png')
        },
        {
          class: 'character-3',
          url: require('@/assets/images/games/tubes/character3.png')
        }],
      selectedIdx           : [],
      hidden                : {
        start               : false,
        choose              : false,
        gameover            : true
      },
      rank: 'EASY',
      timer: {
        seconds             : 60, 
        element             : null
      },
      lesson : {
          id: '',
          lvl: ''
      },
      element: {
        word                : []
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
        counting: null
      }
    }
  },
  computed: {
    getLiveImg() {
      return require('@/assets/images/games/tubes/live' + this.live + '.png');
    },
    getHighWpm() {
      let max = 0;
      this.chart.wpm.forEach(element => {
          max < element ? max = element : null;
      });

      const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
      return max > wpm ? max : wpm;
    }
  },
  methods: {
    showResultDialog() {
        this.updateChart();
        this.resultDialog = true;
        clearInterval(this.timer.element);
    },
    destroyChart() {
        if (this.chart.keyword) {
            this.chart.keyword.destroy();
        }
    },
    updateChart() {
        if (this.chart.keyword) {
            this.chart.keyword.destroy();
        }			
        this.createChart();	
    },
    createChart() {
        const labels = [];
        for (let i = 0; i < this.counter.time_passed; i++) {
            labels.push(i + 1);
        }

        this.chart.data = {
            labels: labels,
            datasets: [
                {
                    label: '',
                    data: this.chart.wpm,
                    borderColor: '#805500',
                    backgroundColor: '#805500',
                }
            ]
        };
        const config = {
            type: 'line',
            data: this.chart.data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                        font: {
                            size: 18
                        }
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                },
                animations: {
                    tension: {
                        duration: 3000,
                        easing: 'linear',
                        from: 0.5,
                        to: 0,
                        loop: true
                    }
                }
            },
        };

        Chart.defaults.font.size = 20;
        this.chart.keyword = new Chart(this.$refs.resultChart, config);
    },
    showGameOver() {
      this.hidden.gameover = false;
      clearInterval(this.timer.element);
    },
    checkLive() {
      if (this.live < 2) {
        this.showGameOver();
        return;
      }

      this.live--;
    },
    changeProgress() {
      if (!this.$refs.percent) { return; }
      const width = this.timer.seconds*85/60;
      this.$refs.percent.style.width = width+'%';
    },
    handleTimer() {
      if (this.timer.seconds < 0) {
        clearInterval(this.timer.element);
        this.finishGame();
        return;
      }

      this.sounds.counting.pause();
      this.sounds.counting.currentTime = 0;
      this.sounds.counting.play();

      this.counter.time_passed++;
      const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
      this.chart.wpm.push(wpm);

      this.timer.seconds -= 1;
      this.changeProgress();
      
    },
    startGame() {
      this.hidden.start = true;
      this.element.word.forEach(element => {
        if (element.innerHTML == '') { return; }

        const container = element.closest('.tube-box-body');
        if (container) {
          container.classList.add('open');
        }
      });

      this.timer.element = setInterval(this.handleTimer, 1000);
      this.$refs.input.focus();
    },
    async generateIndex() {
      while(this.selectedIdx.length < 3) {
        const idx = Math.floor(Math.random() * 7);
        if (!this.selectedIdx.includes(idx)) {
          this.selectedIdx.push(idx);
        }
      }

      return;
    },
    async generateText() {
      let idx = 0;
      this.element.word.forEach((element, index) => {
        if (this.selectedIdx.includes(index)) {
          const container = element.closest('.tube-box-body');
          if (container) {
            const img = container.querySelector('.character img');
            const word = container.querySelector('.word');
            if (img) {
              img.src = this.characters[idx].url;
              img.removeAttribute('class');
              word.removeAttribute('class');
              word.classList.add('word');

              word.classList.add(this.characters[idx].class);
              img.classList.add(this.characters[idx].class);
            }
          }

          element.innerHTML = this.currentWords[idx];
          idx++;
        }
      });
    },
    chooseRank(rank) {
      this.rank = rank;
      this.hidden.choose = true;
    },
    async finishGame() {
        clearInterval(this.timer.element);
        var score = 0; var accuracy= 0; var wpm = 0;
        
        var typed = this.counter.characters + this.counter.errors;
        accuracy = parseInt(typed / ( typed + this.counter.errors )  * 100 );
        wpm = parseInt((this.counter.characters / 5) / (this.counter.time_passed / 60));
        var diff_acc;
        if(accuracy > 80) {
            var diff = accuracy - 80;
            diff_acc = parseInt((diff * 100) / 20);
            
        } else {
            diff_acc = 0;
        }
        

        var wpmPoint = 100;
        
        score = wpmPoint + diff_acc;
        this.chart.accuracy = accuracy;
        this.chart.score = score;
        this.chart.characters = typed;


        const data = await this.$_request('POST', this.$appUrl +'/lesson/update-user-lesson', {lessonId: this.lesson.id, wpm, accuracy, score, level: this.lesson.lvl});
        if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
        } 

        if(data.point > 0) {
            Event.$emit('set-user-point', data.point);
        }
        this.showResultDialog();
    },
    isFinished() {
      let finish = true;
      this.currentWords.forEach(element => {
        element ? finish = false : null;
      });

      if (finish) {
        this.finishGame();
      }
    },
    replaceWord() {
      if (this.wordList.length <= 0) {
        this.currentWords[this.currentIdx] = null;

        this.element.word.forEach(element => {
          if (!this.currentWords.includes(element.innerHTML)) {
            const container = element.closest('.tube-box-body');
            if (container) {
              container.classList.remove('open');
              // container.classList.add('close');
            }
          }
        });

        this.isFinished();
      } else {
        const nextWord = this.wordList[0];
        this.wordList.splice(0, 1);

        this.element.word.forEach((element, index) => {
          if (element.innerHTML === this.currentWords[this.currentIdx]) {
            const container = element.closest('.tube-box-body');
            if (container) {
              container.classList.remove('open');
              container.classList.add('close');
              
              const img = container.querySelector('.character img');
              if (img) {
                this.nextWord(img, element);
              }
            }
          }
        });


        this.currentWords[this.currentIdx] = nextWord;
      }
    },
    async removeOldIndex(image) {
      const element = document.querySelectorAll('.tube-box-body .character img');
      let idx = -1;

      for (let i = 0; i < element.length; i++) {
        if (element[i].src) {
          if (element[i].src === image.src) {
            idx = i;
          }
        }
      }

      while(this.selectedIdx.length < 4) {
        const idx = Math.floor(Math.random() * 7);
        if (!this.selectedIdx.includes(idx)) {
          this.selectedIdx.push(idx);
        }
      }


      for (let index = 0; index < this.selectedIdx.length; index++) {
        this.selectedIdx[index] === idx ? this.selectedIdx.splice(index, 1) : null;
      }
    },
    async nextWord(image, element) {
      setTimeout(async () => {
        element.innerHTML = '';
        await this.removeOldIndex(image);
        
        for (let index = 0; index < this.selectedIdx.length; index++) {

          if (this.element.word[this.selectedIdx[index]]) {
            const container = this.element.word[this.selectedIdx[index]].closest('.tube-box-body');
            if (!container) { return; }

            if (!container.classList.contains('open')) {
              this.element.word[this.selectedIdx[index]].innerHTML = this.currentWords[this.currentIdx];
              container.classList.remove('close');
              container.classList.add('open');

              const img = container.querySelector('.character img');
              img.removeAttribute('class');

              const text = container.querySelector('.word');
              text.removeAttribute('class');
              text.classList.add('word');

              if (img) { 
                img.src = image.src;
                
                for await (let val of image.classList) {
                  img.classList.add(val);
                  text.classList.add(val);
                }

                image.removeAttribute('src');
                image.removeAttribute('class');
              }
            }
          }
        }
      }, 500);
    },
    checkCurrentWord(word) {
      if (!this.hidden.start) { return; }

      let find = false;
      this.currentWords.forEach((element, index) => {
        element == word ? (find = true, this.currentIdx = index) : null;
      });

      if (find) {
        this.sounds.passed.play();
        this.counter.characters += word.length;
        this.myScore+=500;

        if (this.myScore >= 5000) {
          this.finishGame();
        } else {
          this.replaceWord();
        }
      } else {
        this.sounds.error.play();

        this.myScore >= 200 ? this.myScore-=200 : this.myScore = 0;
        this.counter.errors = word.length;
        this.counter.missed_word++;

        this.$refs.live.classList.add('shake-live');
        setTimeout(() => {
          this.$refs.live.classList.remove('shake-live');
        }, 150);

        this.checkLive();
      }

      // methods.clearInput();
    },
    keypress(evt) {
      if (evt.keyCode != 13) {
        return;
      }
      evt.preventDefault();
      this.sounds.error.pause();
      this.sounds.error.currentTime = 0;

      this.sounds.passed.pause();
      this.sounds.passed.currentTime = 0;

      if (evt.currentTarget.innerHTML != '') {
        this.checkCurrentWord(evt.currentTarget.innerHTML);
      }
      evt.currentTarget.innerHTML = '';
      return;
    },
    async gettext() {
      const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson', {id: this.lesson.id});
      if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          this.$router.push('/subjects'); return;
      }
      this.wordList = data.data.text.split(' ');
      this.lesson.lvl = data.data.lvl;

      if (this.wordList.length > 3) {
        this.currentWords = this.wordList.slice(0, 3);
        this.wordList.splice(0, 3);
      }

      await this.generateIndex();
      await this.generateText();
    },
    refershLesson() {
      this.resetParams();
      this.gettext();
    },
    resetParams() {
        this.resultDialog = false;
        this.counter = { current : 0, realWpm: 0, accuracy: 0, wpm: 0, start: false, time_passed : 1, characters: 0, errors: 0 }
        this.chart.wpm = [];
        this.$refs.percent.style.width = '85%';
        this.hidden = { start : false, choose : false, gameover: true };
        this.wordList = [];
        this.currentWords = [];
        this.findWordLength = 0;
        this.currentIdx = 0;
        this.play = false;
        this.timer.element = null;
        this.timer.seconds = 60;
        this.live = 5;
        this.myScore = 0;
    },
    async getNextLesson() {
        const data = await this.$_request('POST', this.$appUrl +'/lesson/next-lesson', {level: this.lesson.lvl + 1});
        if (Number.isInteger(data)) { 
            if (data === 402) { this.$router.push('/price'); return; }
            this.$router.push('/subjects'); return;
        }

        if (data.result == 'fail') { this.$router.push('/subjects'); return; }

        const path = this.$_method.getLessonRoute(data.data.type);
		    this.$router.push({name: path, params: {id: data.data.id}});
    },
  },
  mounted() {
    this.sounds.error = new Audio(require(`@/assets/sound/error.mp3`));
    this.sounds.passed = new Audio(require(`@/assets/sound/pass.mp3`));
    this.sounds.counting = new Audio(require(`@/assets/sound/counting.wav`));
    this.element.word = document.querySelectorAll('.tube-box-body .word');
    this.lesson.id = this.$route.params.id;
    this.gettext();
  }
}
</script>