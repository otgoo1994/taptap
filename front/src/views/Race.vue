<template>
    <div>
        <div class="intro-x">
            <div :style="{'padding-top': '50px', position: 'relative'}" align="center" @click="setFocus">
                <div class="close-btn">
                    <router-link to="/games">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                            <path fill="#394554" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    </router-link>
                </div>
                <div align="center" class="intro-text mt-5 no-text">
                    <input @keydown="this.keydown" @input="this.type" :style="{'position': 'absolute', 'opacity': '0'}" ref="inputDiv" id="inputDiv" autocomplete="off"/>
                    <div class="parent-box" align="left">
                        <div class="parent-box-container" ref="scroller">
                            <span v-for="(item, index) in text.splitted" :key="index" class="parent-span" :ref="'parent-span-' + index" v-bind:class="{'active-span': counter.count == index}">
                                <span v-for="(word, i) in item" :key="i" class="child-span" :ref="'child-span-' + index + i" v-bind:class="{'active-child-span': text.current == i && counter.count == index, 'error-span': errorSpans.includes(index + '-' + i), 'correct-span': correctSpans.includes(index + '-' + i), 'warning-span': warningSpans.includes(index + '-' + i) && correctSpans.includes(index + '-' + i)}">{{word}}</span>
                            </span>
                        </div>

                        <div class="progress">
                            <el-progress :percentage="progress" :show-text="false" :color="'#e2b714'" :stroke-width="3"></el-progress>
                        </div>
                    </div>
                </div>
                <div class="mt-5" style="display: flex; justify-content: center; padding-left: 0%;">
                    <div style="width: 100%; margin-top: 60px; position: relative;" align="center">
                        <keyboard :selector="selectedKey" :hand="keyboardImage" :isShow="false"/>
                        <div class="current-stat">
                            <div><p>Speed</p><p class="num">{{current.wpm}}<span>WPM</span></p></div>
                            <div><p>Accuracy</p><p class="num" v-if="current.characters">{{current.accuracy}}%</p><p class="num" v-else>100%</p></div>
                            <div><p>Left time</p><p class="num">{{60 - counter.time_passed > 9 ? 60 - counter.time_passed : '0' + (60 - counter.time_passed)}} сек</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-dialog" :hidden="!resultDialog">
            <div>
                <!-- <div class="text right"><span class="title">SCORE </span><br><span class="number">{{chart.score}}</span></div>
                <div class="text right"><span class="title">ACC </span><br><span class="number">{{chart.accuracy}}%</span></div> -->
                <div class="close-btn">
                    <router-link to="/games">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                            <path fill="#394554" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    </router-link>
                </div>
            </div>
            <div class="chart-container">
                <canvas ref="resultChart"></canvas>
                <div class="status">
                    <div class="text"><span class="title">CHARACTERS </span><br><span class="number">{{current.characters}}</span></div>
                    <div class="text"><span class="title">WPM </span><br><span class="number">{{current.wpm}}</span></div>
                    <div class="text"><span class="title">ERRORS </span><br><span class="number">{{errorSpans.length}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let timer = null, correctSound, errorSound;
import keyboard from '../components/keyboard/Keyboard.vue';
import Chart from 'chart.js/auto';
export default {
    components: {
        keyboard
    },
    data() {
        return {
            selectedKey: null,
            resultDialog: false,
            keyboardImage: '',
            progress: 0,
            chart: {
                data: null,
                keyword: null,
                wpm: [],
                score: 0,
                accuracy: 0,
                characters: 0
            },
            current: {
                wpm: 0,
                accuracy: 0,
                characters: 0
            },
            text: {
                original: '',
                splitted: '',
                current: 0,
                errorLimit: 0
            },
            status: {
                contentEdit: true,
                lessonname: '',
                groupname: ''
            },
            counter: {
                count: 0,
                start: false,
                time_passed : 0,
                characters: 0,
                accuracy: 0,
                wpm: 0
            },
            correctSpans: [],
            errorSpans: [],
            warningSpans: [],
            lesson : {
                id: '',
                lvl: '',
                isFinish: false
            },
            caps: false,
            lastword: null,
            username: ''
        }
    }, 
    computed: {
        getHighWpm() {
            let max = 0;
            this.chart.wpm.forEach(element => {
                max < element ? max = element : null;
            });
            const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
            return max > wpm ? max : wpm;
        }
    },
    async beforeRouteLeave (to, from, next) {
        window.removeEventListener('keyup', this.keyUpAllKeys);
        next();
    },
    async beforeRouteUpdate(to, from, next) {
        this.lesson.id = to.params.id;
        clearInterval(timer);
        this.resetParams();
        this.gettext();
        next()
    },
    methods: {
        showResultDialog() {
            this.updateChart();
            this.resultDialog = true;
            clearInterval(timer);
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
        refershLesson() {
            this.lesson.isFinish = false;
            this.resetParams();
            this.gettext();
        },
        resetParams() {
            this.resultDialog = false;
            this.counter = { current : 0, realWpm: 0, accuracy: 0, wpm: 0, start: false, time_passed : 1, characters: 0, errors: 0 }
            this.chart.wpm = [];
            this.text = { original : '', splitted: [], count: 0 }
            this.$refs.inputDiv.value = '';
            this.correctSpans = [];
            this.warningSpans = []; 
            this.errorSpans = [];
            this.progress = 0;
        },
        async gettext() {

            const data = await this.$_request('POST', this.$appUrl +'/text/get-race-text', {raceId: this.lesson.id});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }
            this.text.original = data.data.race_text;
            this.splitText();

            this.setFocus();
            this.lesson.isFinish = false;
        },
        splitText() {
            let txt = this.text.original;
            this.text.splitted = txt.match(/.{1,10}/g);
        },
        setFocus() {
            if (!this.$refs.inputDiv) {
                return;
            }
            this.$refs.inputDiv.focus();
        },
        startGame() {
            clearInterval(timer);
            this.counter.start = true;
            timer = setInterval(this.updateTimer, 1000);
        },
        updateTimer() {
            this.counter.time_passed++;
            var wpm = parseInt((this.correctSpans.length / 4) / (this.counter.time_passed / 60));
            this.chart.wpm.push(wpm);

            this.current.wpm = Math.round((this.current.characters / 4) / (this.counter.time_passed / 60));
            var acc = Math.round((this.current.characters - (this.errorSpans.length + (this.warningSpans.length/2))) * 100 / this.current.characters);
            this.current.accuracy = acc > 0 ? acc : 0;

            if (this.counter.time_passed >= 60) {
                return this.finishGame();
            }
        },
        async getNextLesson() {

            const data = await this.$_request('POST', this.$appUrl +'/lesson/next-lesson', {level: this.lesson.lvl + 1});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }

            const path = this.$_method.getLessonRoute(data.data.type);
		    this.$router.push({name: path, params: {id: data.data.id}});
        },
        checkScroll(index) {
            const el = document.querySelectorAll('.child-span');
            if (!el[index]) { return; }

            const scroll = el[index].offsetTop;
            const mid = this.$refs.scroller.clientHeight / 2;

            if (scroll > mid) {
                this.$refs.scroller.scrollTop = scroll - mid;
            } else {
                this.$refs.scroller.scrollTop = 0;
            }
        },
        type(evt) {
            evt.preventDefault();
            
            if (this.lesson.isFinish) { return; }
            correctSound.pause();
            errorSound.pause();
            var input = this.$refs.inputDiv.value.replace('&amp;','&');
            this.current.characters = input.length;
            this.checkScroll(input.length);
            
            if(this.counter.start == false) {
                this.startGame();
            }
            this.errorSpans = [];
            this.correctSpans = [];
            var ss = [];
            var txt = input;

            this.progress = parseInt(input.length * 100 / this.text.original.length);
            

            for (let y = 0; y < this.text.splitted.length; y++) {
                var curr_txt = ''; var last_txt = '';
                if(txt.length >= this.text.splitted[y].length) {
                    for (let index = 0; index < this.text.splitted[y].length; index++) {
                        curr_txt += txt[index];
                    }
                    ss.push(curr_txt);
                    for (let index = this.text.splitted[y].length; index < txt.length; index++) {
                        last_txt += txt[index];
                    }
                    txt = last_txt;
                }else {
                    ss.push(txt);  break;
                }
            }
            
            ss.forEach((element, index) => {
                
                this.counter.count = index;
                this.text.current = element.length;
                for (let i = 0; i < element.length; i++) {

                    if (input[input.length - 1] == this.text.original[input.length - 1]) {
                        correctSound.currentTime = 0;
                        // correctSound.play();
                    } else {
                        errorSound.currentTime = 0;
                        // errorSound.play();
                    }
                    
                    if (this.text.splitted[index][i] == element[i]) {
                        this.correctSpans.push(index + '-' + i);
                    } else {
                        this.errorSpans.push(index + '-' + i);
                        this.warningSpans.push(index + '-' + i);
                    }
                }
                
            });

            this.counter.wpm = parseInt((this.correctSpans.length / 5) / (this.counter.time_passed / 60));
            this.counter.accuracy = parseInt((input.length - this.errorSpans.length) * 100 / input.length);
            
            if(input.length == this.text.original.length) {
                this.counter.characters = input.length;
                return this.finishGame();
            }
        },
        async finishGame() {
            this.lesson.isFinish = true;
            clearInterval(timer);
        
            var wpm = parseInt((this.correctSpans.length / 5) / (this.counter.time_passed / 60));
            var accuracy = parseInt((this.counter.characters - this.errorSpans.length) * 100 / this.counter.characters);

            const data = await this.$_request('POST', this.$appUrl +'/text/register-race-user', {raceId: this.lesson.id, wpm: this.current.wpm, accuracy: this.current.accuracy, name: this.username});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }

            this.showResultDialog();
        },
        keydown(e) {
            if (e.keyCode === 8 || e.keyCode === 25 || e.keyCode === 17 || (e.ctrlKey && e.keyCode === 65)) {
                e.preventDefault();
            }
        },
    },
    mounted() {
        this.lesson.id = this.$route.params.id;
        this.username = this.$route.params.name;
        clearInterval(timer);
        correctSound = new Audio(require(`@/assets/sound/pass.mp3`));
        errorSound = new Audio(require(`@/assets/sound/error.mp3`));
        this.gettext();
    }
}
</script>
<style lang="scss" scoped>
.st0 {
    fill: #c9c9c9;
}
.selected-key {
    fill: #0383F2;
    color: #fff;
}

.active-child-span {
    border-bottom: 3px solid #e2b714;
}

.child-span {
    white-space: pre-wrap;
}


.correct-span {
    background: #E7FBD3;
    color: #0E634D;
}

.error-span {
    background : #FFC0CB;
    color: #8B0000;
}

.warning-span {
    background: #FFE9B2;
    color: #0E634D;
}

.current-stat {
	position: absolute;
	top: 5%;
	left: 75%;
}
</style>