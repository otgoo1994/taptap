<style lang="scss">

	@keyframes bounce { 
		0% {
			transform: translateY(0);
		}
		50% {
				transform: translateY(-50%);
		}
		100% {
				transform: translateY(0);
		}
	}

	.el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: #202224; 
		color: #e2b714;
		border-color: #202224;
		box-shadow: -1px 0 0 0 #323437;
	}
	
	.el-radio-button:first-child .el-radio-button__inner {
		border-left: 1px solid #323437;
	}
	.el-radio-button__orig-radio+.el-radio-button__inner {
		background-color: #323437;
		border-color: #323437;

		&:hover {
			color: #e2b714;
		}
	}

	.typing-title {
		position: absolute; 
		top: 20%; 
		left: 0; 
		height: 30px; 
		width: 90px; 
		animation: bounce 1.5s infinite ease-out;
		font-size: 12px;
		line-height: normal;
	}
	
	.words {
		margin-right: 15px;
		color: #646669;
	}

	.typing-title .text-cont {
		background: #e2b714; 
		width: 100%;
		height: 100%;
		border-radius: 5px;
		color: #000;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

.tri-right.btm-left::before{
	content: ' ';
	position: absolute;
	width: 0;
	height: 0;
	left: 0px;
  right: auto;
  top: auto;
	bottom: -8px;
	border: 8px solid;
	border-color: transparent transparent transparent #e2b714;
}

.result-modal {
    background-color: #323437;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;

		&-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			// margin-top: 10%;
			justify-content: center;
			height: 100%;

			canvas {
				height: 30vh !important;
				// width: 50vw !important;
			}

			.stats {
				display: flex;
				flex-direction: column;
				margin-right: 1vw;
				font-weight: 700;
				font-size: 1.5vw;

				.number {
					text-align: right;
					line-height: 150%;
					color: #646669;

					span {
						font-size: 3vw;
						color: #E2B714;
					}
				}
			}

			.actions {
				align-items: center;
    		justify-content: center;
				margin-top: 20px;
				display: flex;
				width: 100%;

				&-info {
					position: relative;
					font-weight: 700;
					line-height: 180%;
					height: 60px;
					color: #646669;
					width: 20%;
					display: flex;
					flex-direction: column;
					justify-content: center;

					p {
						font-size: 2vw;
						color: #E2B714;
						margin: 0;
					}

					svg {
						height: 40%;
						margin-top: 10%;
						fill: #6B6B6B;
						cursor: pointer;
					}
				}
			}
		}
}

</style>
<template>
	<div style="padding-top: 5%;">
		<a-row :gutter="24">
			<div align="center" class="mb-30">
				<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;">
				<a-col :span="24" :lg="18" class="mb-24">
					<!-- <a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center;">
						
					</a-card> -->
					<tr class="config-bar">
							<td class="group-end">
								<span @click="changeTestConfig" vonfig="symbol" v-bind:class="{'selected': status.symbol}">ТЭМДЭГТ</span>
								<span @click="changeTestConfig" vonfig="number" v-bind:class="{'selected': status.number}">ТОО</span>
								<span @click="changeTestConfig" vonfig="uppercase" v-bind:class="{'selected': status.uppercase}">ТОМ ҮСЭГ</span>
							</td>
							<td class="group-end">
								<span @click="changeTestType" vtype="time" v-bind:class="{'selected': status.testtype == 'time'}">ХУГАЦАА</span>
								<span @click="changeTestType" vtype="word" v-bind:class="{'selected': status.testtype == 'word'}">ҮГ</span>
							</td>							
							<td>
								<span @click="changeLength" v-bind:class="{'selected': status.length == 15}" >15</span>
								<span @click="changeLength" v-bind:class="{'selected': status.length == 30}">30</span>
								<span @click="changeLength" v-bind:class="{'selected': status.length == 60}">60</span>
							</td>
							<td class="checkbox">
								<div>
									<el-radio-group v-model="status.lang" @change="getText" size="mini">
										<el-radio-button label="Eng"></el-radio-button>
										<el-radio-button label="Mon"></el-radio-button>
									</el-radio-group>
								</div>
							</td>
						</tr>
				</a-col>
				</a-row>
			</div>			
		</a-row>
		<!-- / Counter Widgets -->
		<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;">
			<a-col :span="24" :lg="18" :xl="18" class="mb-24" style="display: flex; justify-content: flex-start;">
				<div v-if="status.testtype === 'time'" style="width: 120px; height: 60px;" align="center">
					<a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center; background: #202224; color: #646669;">
						<span style="font-size: 20px;"><strong>{{time.time_left}}</strong></span>
					</a-card>
					<!-- <span style="font-size: 12px;">секунд</span> -->
				</div>

				<div v-else style="width: 120px; height: 60px;" align="center">
					<a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center; background: #202224;  color: #646669;">
						<span style="font-size: 20px;"><strong>{{counter.typed}} / {{status.length}}</strong></span>
					</a-card>
				</div>
			</a-col>
		</a-row>
		<!-- Charts -->
		<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;">
			<a-col :span="24" :lg="18" class="mb-24">
				<a-card :bordered="false" class="widget-1" style="padding-right: 30px; background: #202224;">
					<div @click="$refs.testInputDiv.focus()" :style="{'width': '100%', 'height': '50px'}" ref="fingerBack">
						<div style="width:100%; height: 100px; margin: auto; display: flex; flex-wrap: nowrap; position: absolute; bottom: 15px;">
							<div style="width: 30%; text-align: right; line-height: 140px; font-weight: 600; font-size: 30px; text-align: right; white-space: nowrap; overflow: hidden;">
								<span class="typed-text-content" ref="typedTextContent" v-html="build"></span>
								<div style="display: inline-block; text-align: center; line-height: 100px; font-size: 30px; outline-width: 0; min-width: 10px; color: #a3a0a0; " @keypress.enter.prevent :contenteditable="this.status.contentEdit" @input="this.type" id="testInputDiv" ref="testInputDiv"></div>
							</div>
							
							<div style="position: relative; width: 70%; line-height: 140px; font-weight: 600; font-size: 30px; text-align: left; overflow: hidden; white-space: nowrap;" class="main-text-content" ref="mainTextContent">
							<div class="typing-title tri-right btm-left" :hidden="!showTitle">
								<div class="text-cont">
									Бичиж эхлэх
								</div>
							</div>
							<span class="words">{{this.spans.span1}}</span>
							<span class="words">{{this.spans.span2}}</span>
							<span class="words">{{this.spans.span3}}</span>
							<span class="words">{{this.spans.span4}}</span>
							<span class="words">{{this.spans.span5}}</span>
							<span class="words">{{this.spans.span6}}</span>
							<span class="words">{{this.spans.span7}}</span>
							<span class="words">{{this.spans.span8}}</span>
							<span class="words">{{this.spans.span9}}</span>
							<span class="words">{{this.spans.span10}}</span>
							<span class="words">{{this.spans.span11}}</span>
							<span class="words">{{this.spans.span12}}</span>
							<span class="words">{{this.spans.span13}}</span>
							<span class="words">{{this.spans.span14}}</span>
							<span class="words">{{this.spans.span15}}</span>
							</div>
						</div>
					</div>
				</a-card>
				<div style="width: 120px; height: 120px; margin-left: 50%; transform: translateX(-50%);" align="left">
					<a-button type="primary" @click="getText" icon="undo" size="large" style="position: absolute; bottom: 15px; background: #202224; border-color:#202224"/>
				</div>
			</a-col>
		</a-row>
		

		<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;" v-if="token == null">
			<a-col :span="24" :lg="18" class="mb-24">
				<span style="color: #646669;">Хэрэглэгч та <router-link to="sign-in" style="color: #e2b714;">нэвтэрч</router-link> орсноор илүү боломжуудыг ашиглах боломжтой болно.</span>
			</a-col>
		</a-row>

		<div class="result-modal" :hidden="!resultmodal">
			<div class="result-modal-container">
				<div class="stats">
					<div class="number">wpm<br><span>{{Math.round((this.counter.characters / 4) / (this.time.time_passed / 60))}}</span></div>
					<div class="number">accuracy<br><span>{{counter.accuracy}}%</span></div>
				</div>
				<div style="width: 50%;">
					<div style="background: #202224; border-radius: 20px; padding: 20px;">
						<canvas ref="resultChart"></canvas>
					</div>

					<div class="actions">
						<div class="actions-info">
							<!-- <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg> -->

							<el-tooltip class="item" effect="dark" content="Дахин оролдох" placement="top-end">
								<svg xmlns="http://www.w3.org/2000/svg" @click="getText" viewBox="0 0 512 512">
								<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
              </el-tooltip>
						</div>
						<div class="actions-info">
								<span>characters</span>
								<p>{{this.counter.characters}}</p>
						</div>
						<div class="actions-info">
							<span>time</span>
							<p>{{this.time.time_passed}}сек</p>
						</div>
						<div class="actions-info">
							<span>high wpm</span>
							<p>{{getHighWpm}}</p>
						</div>
					</div>
				</div>
			</div>
    </div>
	</div>
</template>

<script>
let timer = null;
import Chart from 'chart.js/auto';
	export default ({
		components: {},
		data() {
			return {
				chart: {
					data: null,
					keyword: null,
					wpm: []
				},
				showTitle: true,
				resultmodal: true,
				token: null,
				texts: {
					original: '',
					typed : '',
					now: '',
					splitted: '',
					splittedOneWord: [],
					currentWord: ''
				},
				counter: {
					space: 0,
					typed: 0,
					errors: 0,
					accuracy: 0,
					characters: 0
				},
				spans: { span1: '', span2: '', span3: '', span4: '', span5: '', span6: '', span7: '', span8: '', span9: '', span10: '', span11: '', span12: '', span13: '', span14: '', span15: '' },
				time: {
					time_left: 30,
					time_passed: 0,
					start: false
				},
				status: {
					testtype: 'time',
					length: 30,
					contentEdit: true,
					lang: 'Mon',
					finger : true,
					inviteConrfirm: false,
					uppercase	: false,
					symbol		: false,
					number		: false
				},
			}
		},
		computed: {
			build: function() {
				return this.texts.typed;
			},
			getHighWpm() {
            let max = 0;
            this.chart.wpm.forEach(element => {
                max < element ? max = element : null;
            });

            const wpm = Math.round((this.counter.characters / 4) / (this.time.time_passed / 60));
            return max > wpm ? max : wpm;
        }
		},
		methods: {
			changeTestConfig(evt) {
				const conf = evt.currentTarget.getAttribute('vonfig');
				if (!conf) {
					return;
				}

				if (this.status[conf]) {
					this.status[conf] = false;
				} else {
					this.status[conf] = true;
				}

				this.setConfig();
				this.getText();
			},
			changeTestType(evt) {
				const type = evt.currentTarget.getAttribute('vtype');
				if (!type) {
					return;
				}
				
				this.status.testtype = type;

				this.setConfig();
				this.getText();
			},
			changeLength(evt) {
				const time = Number(evt.currentTarget.innerHTML);
				this.time.time_left = time;
				this.status.length = time;

				this.setConfig();
				this.getText();
			},
			async getText() {
				clearInterval(timer);
				this.counter.typed = 0;
				this.counter.space = 0;
				this.showTitle = true;
				this.counter.errors = 0;
				this.counter.accuracy = 0;
				this.counter.characters = 0;
				this.status.contentEdit = true;
				this.time.time_left = this.status.length;
				this.time.time_passed = 0;
				this.time.start = false;
				this.texts.typed = '';
				this.$refs.testInputDiv.innerHTML = '';
				this.resultmodal = false,
				this.chart.wpm = [];
				this.destroyChart();
				const data = await this.$_request('POST', this.$appUrl +`/text/get-practice`, {config: this.status});
				
				if (!data) { return; }

				let word = data.data;
				if (this.status.testtype === 'word') {
					word = this.getWordStr(word)
				}

				if (this.status.uppercase) {
					this.texts.original = word;
				} else {
					this.texts.original = word.toLowerCase()
				}

				this.makeSpanText();
			},
			makeSpanText() {
				this.texts.splitted = this.texts.original.split(' ');
				this.giveSpanText();
			},
			getWordStr(str) {
				return str.split(/\s+/).slice(0, this.status.length).join(" ");
			},
			giveSpanText(){
				for (let index = 1; index < 16; index++) {
					this.spans['span'+index] = '';
				}
				

				if(this.counter.space < this.texts.splitted.length) {
					for(let i=this.counter.space; i < this.texts.splitted.length; i++){
						switch(i) {
							case this.counter.space : this.spans.span1 = this.texts.splitted[i]; break;
							case this.counter.space + 1 : this.spans.span2 = this.texts.splitted[i]; break;
							case this.counter.space + 2: this.spans.span3 = this.texts.splitted[i]; break;
							case this.counter.space + 3: this.spans.span4 = this.texts.splitted[i]; break;
							case this.counter.space + 4: this.spans.span5 = this.texts.splitted[i]; break;
							case this.counter.space + 5: this.spans.span6 = this.texts.splitted[i]; break;
							case this.counter.space + 6: this.spans.span7 = this.texts.splitted[i]; break;
							case this.counter.space + 7: this.spans.span8 = this.texts.splitted[i]; break;
							case this.counter.space + 8: this.spans.span9 = this.texts.splitted[i]; break;
							case this.counter.space + 9: this.spans.span10 = this.texts.splitted[i]; break;
							case this.counter.space + 10: this.spans.span11 = this.texts.splitted[i]; break;
							case this.counter.space + 11: this.spans.span12 = this.texts.splitted[i]; break;
							case this.counter.space + 12: this.spans.span13 = this.texts.splitted[i]; break;
							case this.counter.space + 13: this.spans.span14 = this.texts.splitted[i]; break;
							case this.counter.space + 14: this.spans.span15 = this.texts.splitted[i]; break;
							default: break;
						}
					}
					this.splitWord();
				} else {
					this.finishGame();
				}
			},
			splitWord() {
				this.texts.splittedOneWord = this.texts.splitted[this.counter.space].split('');
      	this.texts.currentWord =  this.texts.splittedOneWord[0];
			},
			finishGame() {
				clearInterval(timer);
				this.time.start = false;
				this.status.contentEdit = false;
				this.showResultDialog();
			},
			showResultDialog() {
				this.updateChart();
				this.resultmodal = true;
			},
			buildHTML(input, result) {
				if (!result) {
					this.texts.typed = this.texts.typed +  '<span style="text-decoration: line-through; margin-right: 15px; color: #ca4754;">'+ input.replace('&nbsp;','') + '</span>';
					this.counter.errors++;
				} else {
					this.texts.typed = this.texts.typed +  '<span style="margin-right: 15px; color: #fff;">'+ input.replace('&nbsp;','') + '</span>';
					this.counter.typed++;
				}

				this.$refs.testInputDiv.innerHTML = '';
				this.counter.space++;

				this.counter.accuracy = parseInt(this.counter.typed / ( this.counter.typed + this.counter.errors )  * 100 );
				this.giveSpanText();
			},
			type(){
				if(this.time.start == false) {
					this.startGame();
				}
				var text = this.texts.splitted[this.counter.space];
				var input = this.$refs.testInputDiv.innerHTML.replace('&nbsp;','').replace('&amp;','&');
				
				var space = this.$refs.testInputDiv.innerHTML.substr(this.$refs.testInputDiv.innerHTML.length - 6, this.$refs.testInputDiv.innerHTML.length);

				var input_array = input.split('');
				var permission = true;
				

				for(let i=-1; i < input_array.length; i++) {
					if(input_array[i] != this.texts.splittedOneWord[i]) {
					permission = false; break;
					}
					this.texts.currentWord = this.texts.splittedOneWord[i + 1];
				}

				if(permission) {
					if(space === '&nbsp;') {
						if(input != '') {
							if(text === input.replace('&nbsp;','')) {
								this.counter.characters += text.length;
								this.buildHTML(input, true);
							} else {
								this.buildHTML(input, false);
							}							
						} else {
							this.$refs.testInputDiv.innerHTML = '';
						} 
					} else {
						if (this.counter.space+1 === this.texts.splitted.length) {
							if (text === input.replace('&nbsp;','')) {
								this.counter.characters += text.length;
								this.buildHTML(input, true);						
							}
						}

						this.$refs.testInputDiv.classList.remove('wrongLine');
						this.spans.span1 = text.substr(input.length, text.length);
					}

				} else {
					if(space === '&nbsp;') {
						if(input != '') {
							this.buildHTML(input, false);
						} else {
							this.$refs.testInputDiv.innerHTML = '';
						}
					} else {
							this.$refs.testInputDiv.classList.add('wrongLine');
					}
					
				}
			},
			startGame() {
					clearInterval(timer);
					this.time.start = true;
					this.showTitle = false;
					timer = setInterval(this.updateTimer, 1000);
				}, 
				updateTimer() {
					if (this.status.testtype === 'time') {
						if (this.time.time_left > 0) {
							this.time.time_left--;
							this.time.time_passed++;
						}
						else {
							this.finishGame();
						}
					} else {
						this.time.time_passed++;
					}

					// const wpm = parseInt((this.counter.characters / 5) / (this.time.time_passed / 60));
					const wpm = Math.round((this.counter.characters / 4) / (this.time.time_passed / 60));
					this.chart.wpm.push(wpm);
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
					for (let i = 0; i < this.time.time_passed; i++) {
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
									display: false,
									position: 'top',
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
				getConfig() {
					const conf = JSON.parse(localStorage.getItem('test-config'));
					if (!conf) {
						return;
					}

					this.status = conf;
				},
				setConfig() {
					localStorage.setItem('test-config', JSON.stringify(this.status));
				}
		},
		mounted() {
			this.getConfig();
			Event.$emit('navbarname', '');
			this.token = localStorage.getItem('token');
			this.getText();
		}
	})

</script>

<style lang="scss" scoped>
.wrongLine{
  text-decoration: line-through;
}
</style>