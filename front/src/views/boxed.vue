<style lang="scss">
.result-modal {
    background-color: #F7F7F7;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
}
</style>
<template>
    <div>
        <div class="intro-x">
            <div :style="{'padding-top': '50px', position: 'relative'}" align="center" @click="setFocus">
                <div class="close-btn">
                    <router-link to="/subjects">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                            <path fill="#394554" d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    </router-link>
                </div>

                <div align="left" class="intro-text mt-5 no-text">
                    <div :contenteditable="this.status.contentEdit" @input="type" :style="{'opacity': '0'}" ref="inputDiv" id="inputDiv"></div>
                    <div v-for="(main, cc) in text.splitted.length" :key="cc" :ref="'parent-div-' + cc">
                        <div v-if="text.count == cc" :style="{'position': 'relative'}" align="center">
                            <span v-for="(text, index) in text.splitted[cc]" :key="index" :hidden="false" class="text-span ml-10 mr-10 span-normal" :ref="'main-span-' + index">
                                <div v-if="text != ' '" class="intro-y text-span-second" :ref="'span-' + index">
                                    <span :ref="'child-span-' + index">{{ text }}</span>
                                </div>
                                <div v-else class="intro-y text-span-second" :ref="'span-' + index">
                                    <span :ref="'child-span-' + index" :style="{'opacity': '0'}">a</span>
                                </div>
                                <div :ref="'span-error-word-' + index" class="span-error-text"></div>
                                <!-- <div :ref="'boxed-' + index" class="intro-x" v-bind:class="{'current-span': index == counter.current}">&nbsp;</div> -->
                                <div :ref="'boxed-' + index" class="-lesson-intro-x current-span" v-bind:class="{'active' : index == counter.current, 'remove' : index < counter.current}">&nbsp;</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="mt-5" style="display: flex; justify-content: center; padding-left: 14%;">
                    <div style="width: 100%; padding-top: 60px;" align="center">
                        <keyboard :selector="selectedKey" :hand="keyboardImage"/>
                    </div>
                </div>
                <!-- <div class="progress" style="margin-top: 20px; width: 30%;" align="left">
                    <el-progress :percentage="progress" :show-text="false" :color="'#5787E4'" :stroke-width="7"></el-progress>
                </div> -->
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
import keyboard from '../components/keyboard/Keyboard.vue';
let timer = null;
let correctSound;
let errorSound;
export default {
    components: {
        keyboard
    },
    data() {
        return {
            selectedKey: null,
            resultDialog: false,
            chart: {
                data: null,
                keyword: null,
                wpm: [],
                score: 0,
                accuracy: 0,
                characters: 0
            },
            lesson : {
                id: '',
                lvl: '',
                isFinish: false
            },
            progress: 0,
            keyboardImage: '',
            fingerText: '',
            text: {
                original : '',
                splitted: [],
                count: 0
            },
            counter: {
                current : 0,
                realWpm: 0,
                accuracy: 0,
                wpm: 0,
                start: false,
                time_passed : 1,
                characters: 0,
                errors: 0
            },
            status: {
                contentEdit: true,
                lessonname: '',
                groupname: ''
            },
            lastword: null,
            caps: false
        }
    }, 
    mounted() {
        this.lesson.id = this.$route.params.id;
        clearInterval(timer);
        correctSound = new Audio(require(`@/assets/sound/pass.mp3`));
        errorSound = new Audio(require(`@/assets/sound/error.mp3`));
        this.gettext();
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
    async beforeRouteUpdate(to, from, next) {
        this.lesson.id = to.params.id;
        clearInterval(timer);
        this.resetParams();
        this.gettext();
        next()
    },
    methods: {
        async getNextLesson() {

            const data = await this.$_request('POST', this.$appUrl +'/lesson/next-lesson', {level: this.lesson.lvl + 1});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }

            const path = this.$_method.getLessonRoute(data.data.type);
		    this.$router.push({name: path, params: {id: data.data.id}});
        },
        showResultDialog() {
            this.updateChart();
            this.resultDialog = true;
            clearInterval(timer);
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
            this.progress = 0;
        },
        async gettext() {

            const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson', {id: this.lesson.id});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }


            this.counter.realWpm = data.group.wpm;
            this.status.lessonname = data.data.lessonname;
            Event.$emit('navbarname', 'Хичээл ' + data.data.lvl + ': ' +data.data.lessonname);
            this.status.groupname = data.group.groupName;
            if(data.data.type != 'boxed') {
                this.$router.push('/subjects');
            } else {
                this.lesson.lvl = data.data.lvl;
                this.text.original = data.data.text;
                this.splitText();
            }

            this.setFocus();
            this.lesson.isFinish = false;
        },
        splitText() {
            let txt = this.text.original;
            this.text.splitted = txt.match(/.{1,10}/g);
            this.mon_finger();
        },
        setFocus() {
            this.$refs.inputDiv.focus();
        },
        startGame() {
            clearInterval(timer);
            this.counter.start = true;
            timer = setInterval(this.updateTimer, 1000);
        },
        updateTimer() {
            this.counter.time_passed++;
            const wpm = Math.round((this.counter.characters / 4) / (this.counter.time_passed / 60));
            this.chart.wpm.push(wpm);
        },
        type() {
            if (this.lesson.isFinish) { return; }
            correctSound.pause();
            errorSound.pause();
            if(this.counter.start == false) {
                this.startGame();
            }
            var input = this.$refs.inputDiv.innerHTML.replace('&amp;','&');
            if(input == '&nbsp;')
                input = ' ';

            var current = this.text.splitted[this.text.count][this.counter.current]
            this.$refs.inputDiv.innerHTML = '';
            

            if(input == current) {
                correctSound.currentTime = 0;
                correctSound.play();
                this.counter.characters++;
                this.progress = parseInt(this.counter.characters * 100 / this.text.original.length);
                this.$refs['main-span-' + this.counter.current][0].classList.remove('span-error');
                this.$refs['span-error-word-' + this.counter.current][0].innerHTML = '';
                this.$refs['main-span-' + this.counter.current][0].classList.remove('shake-span');
                this.$refs['child-span-' + this.counter.current][0].classList.remove('span-opacity-0');
                this.$refs['main-span-' + this.counter.current][0].classList.add('span-correct');
                if(this.text.count < this.text.splitted.length) {
                    if(this.counter.current == this.text.splitted[this.text.count].length - 1) {
                        this.counter.current = 0;
                        this.text.count++;
                    } else {
                        this.counter.current++;
                    }
                }

                if(this.text.count >= this.text.splitted.length) {
                    this.finishGame();
                    // this.$router.push({name: 'top-menu-success-lesson', params: {prev: 3, next: 4}});
                } else {
                    this.mon_finger();
                }
                
                
            } else {
                
                errorSound.currentTime = 0;
                errorSound.play();
                this.counter.errors++;
                this.$refs['span-error-word-' + this.counter.current][0].innerHTML = input;
                this.$refs['child-span-' + this.counter.current][0].classList.add('span-opacity-0');
                this.$refs['main-span-' + this.counter.current][0].classList.add('span-error');
                this.$refs['main-span-' + this.counter.current][0].classList.add('shake-span');
                setTimeout(() => {
                    this.$refs['span-error-word-' + this.counter.current][0].innerHTML = '';
                    this.$refs['child-span-' + this.counter.current][0].classList.remove('span-opacity-0');
                    this.$refs['main-span-' + this.counter.current][0].classList.remove('span-error');
                    this.$refs['main-span-' + this.counter.current][0].classList.remove('shake-span');
                }, 300);
            }
        },
        async finishGame() {
            this.lesson.isFinish = true;
            clearInterval(timer);
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


            // console.log(typed, accuracy, wpm, diff_acc, score);
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
        async mon_finger() {
            var current = this.text.splitted[this.text.count][this.counter.current]
            var elems = document.querySelectorAll(".selected-key");

            if (!this.lastword) {
                this.lastword = current;
            } else {

                if (this.lastword == current) {
                    return;
                } 

                [].forEach.call(elems, function(el) {
                    el.classList.remove("selected-key");
                });
                this.lastword = current;
            }
            
                
            const data = await this.$_keyboards.mon(current);

            data.key ? this.selectedKey = data.key : null;
            data.image ? this.keyboardImage = data.image : null;
            data.caps ? this.caps = data.caps : null;
            data.text ? this.fingerText = data.text : null;
            
        }
    }
}
</script>