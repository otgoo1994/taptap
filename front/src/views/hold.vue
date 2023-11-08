<template>
    <div>
        <div class="intro-x">
            <div :style="{'padding-top': '50px'}" align="center" @click="setFocus">
                <div align="center" class="intro-text mt-5 no-text">
                    <input @input="this.type" :disabled="inputDisabled" :style="{'position': 'absolute', 'opacity': '0'}" ref="inputDiv" id="inputDiv" autocomplete="off"/>
                    <div class="parent-box" align="left">
                        <span v-for="(item, index) in text.splitted" :key="index" class="parent-span" :ref="'parent-span-' + index" v-bind:class="{'active-span': counter.count == index}">
                            <span v-for="(word, i) in item" :key="i" class="child-span" :ref="'child-span-' + index + i" v-bind:class="{'active-child-span': text.current == i && counter.count == index, 'error-span': errorSpans.includes(index + '-' + i), 'correct-span': correctSpans.includes(index + '-' + i), 'warning-span': warningSpans.includes(index + '-' + i) && correctSpans.includes(index + '-' + i)}">{{word}}</span>
                        </span>

                        <div class="progress">
                            <el-progress :percentage="progress" :show-text="false" :color="'#e2b714'" :stroke-width="3"></el-progress>
                        </div>
                    </div>
                </div>
                <div class="mt-5" style="display: flex; justify-content: center; padding-left: 14%;">
                    <div style="width: 100%; padding-top: 60px;" align="center">
                        <keyboard :selector="selectedKey" :hand="keyboardImage"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="bottom-box z-50">
            <div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6">
                <div class="col-span-4 sm:col-span-4 xxl:col-span-4" align="center"></div>
                <div class="col-span-4 sm:col-span-4 xxl:col-span-4" align="center">
                    <el-progress :text-inside="false" :color="'#91C715'" :stroke-width="10" :show-text="false" :percentage="progress" :style="{'width': '100%', 'margin-top': '22px'}" status="success"></el-progress>
                </div>
                <div class="col-span-4 sm:col-span-4 xxl:col-span-4" align="center"></div>
            </div>
        </div> -->
        <div id="hold-modal" class="hold-modal z-50" :style="{'display': `${disabledModal}`}" align="center">
            <div align="center">
                <div style="position: absolute; top: 10px; right: 10px; width: 50px; height: 50px;">
                    <router-link to="/subjects">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                        </svg>
                    </router-link>
                </div>
                <div class="hold-background-text" style="display: flex;"> <p class="box hold-word-box">{{holdWord.toUpperCase()}}</p> үсгэн дээр удаан дарж текстээ бичнэ үү. </div>   
            </div>
            <img class="hold-background-img" :src="require(`@/assets/images/${holdImage}`)" >
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
                time_passed : 1,
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
            holdImage: 'righthand.png',
            holdWord: '',
            disabledModal: 'block',
            inputDisabled: true,
            lastword: null
        }
    }, 
    created() {
        document.addEventListener('keyup', this.onKeyup);
        document.addEventListener('keydown', this.onKeydown);
    },
    mounted() {
        this.lesson.id = this.$route.params.id;
        clearInterval(timer);
        correctSound = new Audio(require(`@/assets/sound/pass.mp3`));
        errorSound = new Audio(require(`@/assets/sound/error.mp3`));
        this.gettext();
        this.setFocus();
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
    beforeRouteLeave (to, from, next) {
        document.removeEventListener('keyup', this.onKeyup);
        document.removeEventListener('keydown', this.onKeydown);
        next();
    },
    methods: {
        onKeydown(e) {
            let evt = e.key;
            if (evt == this.holdWord) {
                this.$refs.inputDiv.focus();
                if(this.disabledModal == 'block') {
                    this.disabledModal = 'none';
                    this.inputDisabled = false;
                }
            }
        },
        onKeyup(e) {
            let evt = e.key;
            if(evt == this.holdWord) {
                if(this.disabledModal == 'none') {
                    this.disabledModal = 'block';
                    this.inputDisabled = true;
                }
            }
        },
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
            this.setFocus();
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
            const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson', {id: this.lesson.id});
            if (Number.isInteger(data)) { 
                if (data === 402) { this.$router.push('/price'); return; }
                this.$router.push('/subjects'); return;
            }

            this.counter.realWpm = data.group.wpm;
            Event.$emit('navbarname', 'Хичээл ' + data.data.lvl + ': ' +data.data.lessonname);
            if(data.data.type != 'hold') {
                this.$router.push('/subjects');
            } else {
                this.holdImage = data.data.url;
                this.holdWord = data.data.holdword;
                this.lesson.lvl = data.data.lvl;
                this.text.original = data.data.text;
                this.status.lessonname = data.data.lessonname;
                this.status.groupname = data.group.groupName;
                this.text.errorLimit = parseInt(data.data.text.length / 2);
                this.splitText();
            }
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
            var wpm = parseInt((this.correctSpans.length / 4) / (this.counter.time_passed / 60));
            this.chart.wpm.push(wpm);
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
        type() {
            if (this.lesson.isFinish) { return; }
            correctSound.pause();
            errorSound.pause();
            var t = new RegExp(this.holdWord, 'i');
            this.$refs.inputDiv.value = this.$refs.inputDiv.value.replace(/&amp;/g,'&').replace(t, '');
            var input = this.$refs.inputDiv.value;
            // console.log(input.length);
            if(input.length > 0) {
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
                            correctSound.play();
                        } else {
                            errorSound.currentTime = 0;
                            errorSound.play();
                        }

                        if (this.text.splitted[index][i] == element[i]) {
                            this.correctSpans.push(index + '-' + i);
                        } else {
                            this.errorSpans.push(index + '-' + i);
                            this.warningSpans.push(index + '-' + i);
                        }
                    }
                });

                if(this.text.errorLimit < this.errorSpans.length) {
                    this.$confirm('Уучлаарай. Та хэтэрхий их алдаатай бичиж байна.', 'Санамж', {
                        confirmButtonText: 'Дахиж оролдох',
                        cancelButtonText: 'Болих',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.counter.characters = 0;
                        this.counter.count = 0;
                        this.text.current = 0;
                        this.$refs.inputDiv.value = '';
                        clearInterval(timer);
                        this.counter.time_passed = 1;
                        this.counter.accuracy = 0;
                        this.counter.wpm = 0;
                        this.counter.start = false;
                        this.errorSpans = [];
                        this.warningSpans = [];
                        this.correctSpans = [];
                        this.getText();
                    }).catch(() => {
                        this.$router.push('/lesson');
                    });
                }

                this.counter.wpm = parseInt((this.correctSpans.length / 5) / (this.counter.time_passed / 60));
                this.counter.accuracy = parseInt((input.length - this.errorSpans.length) * 100 / input.length);
                
                if(input.length == this.text.original.length) {
                    this.counter.characters = input.length;
                    return this.finishGame();
                } else {
                    this.mon_finger();
                }

            }
        },
        async finishGame() {
            this.lesson.isFinish = true;
            clearInterval(timer);
        
            var wpm = parseInt((this.correctSpans.length / 5) / (this.counter.time_passed / 60));
            var accuracy = parseInt((this.counter.characters - this.errorSpans.length) * 100 / this.counter.characters);
            var diff_acc;
            if(accuracy > 80) {
                var diff = accuracy - 80;
                diff_acc = parseInt((diff * 100) / 20);
                
            } else {
                diff_acc = 0;
            }

            var bottomPoint = this.counter.realWpm - 18;
            var wpmPoint = 0;
            if(wpm > bottomPoint) {
                var diff_wpm = wpm - bottomPoint;
                wpmPoint = parseInt((diff_wpm * 100) / 18);
                if(wpmPoint > 100) {
                    wpmPoint = 100;
                }
            }
            
            if(wpmPoint == 0) {
                var dep = this;
                this.$error({
					title: 'Амжилтгүй',
					// JSX support
					content: (
						<div style="margin-top: 30px;">
							<div class="text-gray-600 mt-2"> Уучлаарай та хэтэрхий удаан бичиж байна.</div>
						</div>
					),
					onOk() { 
						dep.counter.characters = 0;
                        dep.counter.count = 0;
                        dep.text.current = 0;
                        dep.$refs.inputDiv.value = '';
                        clearInterval(timer);
                        dep.counter.time_passed = 1;
                        dep.counter.accuracy = 0;
                        dep.counter.wpm = 0;
                        dep.counter.start = false;
                        dep.errorSpans = [];
                        dep.warningSpans = [];
                        dep.correctSpans = [];
                        dep.getText();
					},
				});
            } else if(diff_acc == 0) {
                var dep = this;
                this.$error({
					title: 'Амжилтгүй',
					// JSX support
					content: (
						<div style="margin-top: 30px;">
							<div class="text-gray-600 mt-2"> Уучлаарай та хэтэрхий их алдаатай бичиж байна.</div>
						</div>
					),
					onOk() { 
						dep.counter.characters = 0;
                        dep.counter.count = 0;
                        dep.text.current = 0;
                        dep.$refs.inputDiv.value = '';
                        clearInterval(timer);
                        dep.counter.time_passed = 1;
                        dep.counter.accuracy = 0;
                        dep.counter.wpm = 0;
                        dep.counter.start = false;
                        dep.errorSpans = [];
                        dep.warningSpans = [];
                        dep.correctSpans = [];
                        dep.getText();
					},
				});
            } else {
                var score = wpmPoint + diff_acc;
                this.chart.accuracy = accuracy;
                this.chart.score = score;

                const data = await this.$_request('POST', this.$appUrl + '/lesson/update-user-lesson', {lessonId: this.lesson.id, wpm, accuracy, score, level: this.lesson.lvl});
                if (Number.isInteger(data)) { 
                    if (data === 402) { this.$router.push('/price'); return; }
                    this.$router.push('/subjects'); return;
                }
                
                if(data.point > 0) {
                    Event.$emit('set-user-point', data.point);
                }

                this.showResultDialog();
            }
        },
        async mon_finger() {
            
            var ind = this.$refs.inputDiv.value.replace('&amp;','&');
            var current = this.text.original[ind.length]
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Exo+2&display=swap');

.st0 {
    fill: #c9c9c9;
}
.selected-key {
    fill: #0383F2;
    color: #fff;
}

.parent-box {
    width: 45%;
    position: relative; 
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
</style>