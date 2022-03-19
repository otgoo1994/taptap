<template>
	<div style="padding-top: 5%;">
		<a-row :gutter="24">
			<!-- <div align="center" class="mb-0">
				<span style="font-size: 15px; color: black;">Шивэх чадвараа шалгаарай</span>
			</div> -->
			<div align="center" class="mb-30">
				<span style="font-size: 30px; color: black;"><b>Шивэх чадвараа шалгаарай</b></span>
			</div>
			<a-col :span="24" :lg="24" :xl="24" class="mb-24" style="display: flex; justify-content: center;">
				<div style="width: 120px; height: 120px;" align="center">
					<a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center;">
						<span style="font-size: 50px;"><strong>{{time.time_left}}</strong></span>
					</a-card>
					<span style="font-size: 12px;">секунд</span>
				</div>
				<div style="width: 120px; height: 120px;" align="center" class="ml-20">
					<a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center;">
						<span style="font-size: 50px;"><strong>{{ counter.characters }}</strong></span>
					</a-card>
					<span style="font-size: 12px;">үг/мин</span>
				</div>
				<div style="width: 120px; height: 120px;" align="center" class="ml-20">
					<a-card :bordered="false" class="widget-1" style="display: flex; align-items: center; justify-content: center;">
						<span style="font-size: 50px;"><strong>{{ counter.errors }}</strong></span>
					</a-card>
					<span style="font-size: 12px;">алдсан</span>
				</div>
				<div style="width: 120px; height: 120px;" align="left" class="ml-20">
					<a-button type="primary" @click="getText" icon="undo" size="large" style="position: absolute; bottom: 15px;"/>
				</div>
				<div>
					<a-radio-group v-model="status.lang" @change="getText" button-style="solid" style="position: absolute; bottom: 15px;">
						<a-radio-button value="eng">
							Eng
						</a-radio-button>
						<a-radio-button value="mon">
							Mon
						</a-radio-button>
					</a-radio-group>
				</div>
			</a-col>
		</a-row>
		<!-- / Counter Widgets -->

		<!-- Charts -->
		<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;">
			<a-col :span="24" :lg="18" class="mb-24">
				<a-card :bordered="false" class="widget-1" style="padding-right: 30px;">
					<div @click="$refs.testInputDiv.focus()" :style="{'width': '100%', 'height': '90px'}" ref="fingerBack">
						<div style="width:100%; height: 100px; margin: auto; display: flex; flex-wrap: nowrap; position: absolute; bottom: 15px;">
							<div style="width: 50%; text-align: right; line-height: 100px; font-size: 60px; text-align: right; white-space: nowrap; overflow: hidden;">
								<span class="typed-text-content" ref="typedTextContent" v-html="build"></span>
								<div style="display: inline-block; text-align: center; line-height: 100px; font-size: 60px; outline-width: 0; min-width: 10px; color: #6f8fc9; " @keypress.enter.prevent :contenteditable="this.status.contentEdit" @input="this.type" id="testInputDiv" ref="testInputDiv"></div>
							</div>
							
							<div style="width: 50%; line-height: 100px; font-size: 60px; text-align: left; overflow: hidden; white-space: nowrap;" class="main-text-content" ref="mainTextContent">
							<span style="margin-right: 15px;">{{this.spans.span1}}</span>
							<span style="margin-right: 15px;">{{this.spans.span2}}</span>
							<span style="margin-right: 15px;">{{this.spans.span3}}</span>
							<span style="margin-right: 15px;">{{this.spans.span4}}</span>
							<span style="margin-right: 15px;">{{this.spans.span5}}</span>
							<span style="margin-right: 15px;">{{this.spans.span6}}</span>
							<span style="margin-right: 15px;">{{this.spans.span7}}</span>
							<span style="margin-right: 15px;">{{this.spans.span8}}</span>
							<span style="margin-right: 15px;">{{this.spans.span9}}</span>
							<span style="margin-right: 15px;">{{this.spans.span10}}</span>
							<span style="margin-right: 15px;">{{this.spans.span11}}</span>
							<span style="margin-right: 15px;">{{this.spans.span12}}</span>
							<span style="margin-right: 15px;">{{this.spans.span13}}</span>
							<span style="margin-right: 15px;">{{this.spans.span14}}</span>
							<span style="margin-right: 15px;">{{this.spans.span15}}</span>
							</div>
						</div>
					</div>
				</a-card>
			</a-col>
		</a-row>

		<a-row :gutter="24" style="display: flex; align-items: center; justify-content: center;" v-if="token == null">
			<a-col :span="24" :lg="18" class="mb-24">
				<span>Хэрэглэгч та <router-link to="sign-in">нэвтэрч</router-link> орсноор илүү боломжуудыг ашиглах боломжтой болно.</span>
			</a-col>
		</a-row>
	</div>
</template>

<script>
let timer = null;
	export default ({
		components: {},
		data() {
			return {
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
					time_left: 60,
					time_passed: 0,
					start: false
				},
				status: {
					contentEdit: true,
					lang: 'mon',
					finger : true,
					inviteConrfirm: false,
					type: {
						label: 'Жижиг үсэг',
						value: 'begintext'
					}
				},
			}
		},
		computed: {
			build: function() {
				return this.texts.typed;
			},
		},
		methods: {
			getText() {
				clearInterval(timer);
				this.counter.typed = 0;
				this.counter.space = 0;
				this.counter.errors = 0;
				this.counter.accuracy = 0;
				this.counter.characters = 0;
				this.status.contentEdit = true;
				this.time.time_left = 60;
				this.time.time_passed = 0;
				this.time.start = false;
				this.texts.typed = '';
				this.$refs.testInputDiv.innerHTML = '';
				var dep = this;
				this.$axios({
					method: 'post',
					url: this.$appUrl +`/text/get-practice`,
					data: {
						lang: this.status.lang
					}
				}).then(data => {
					if(data.data.result == 200) {
						dep.texts.original = data.data.data;
						dep.makeSpanText();
					} else {
						console.log(data);
					}
				});
			},
			makeSpanText() {
				this.texts.splitted = this.texts.original.split(' ');
				this.giveSpanText();
			},
			giveSpanText(){
				this.spans.span1 = '';
				this.spans.span2 = '';
				this.spans.span3 = '';
				this.spans.span4 = '';
				this.spans.span5 = '';
				this.spans.span6 = '';
				this.spans.span7 = '';
				this.spans.span8 = '';
				this.spans.span9 = '';
				this.spans.span10 = '';
				this.spans.span11 = '';
				this.spans.span12 = '';
				this.spans.span13 = '';
				this.spans.span14 = '';
				this.spans.span15 = '';
				

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
				var dep = this;
				this.time.start = false;
				this.status.contentEdit = false;
				this.$success({
					title: 'Амжилттай',
					// JSX support
					content: (
						<div style="margin-top: 30px;">
							<div class="text-gray-600 mt-2"> Та <span style="font-weight: 700;">{parseInt((this.counter.characters / 5) / (this.time.time_passed / 60))} WPM ({this.counter.characters} CPM)</span> бичсэн байна. Таны чанарын үзүүлэлт <span style="font-weight: 700;">{ this.counter.accuracy }%</span> байна. Амжилт хүсье!.</div>
						</div>
					),
					onOk() { 
						dep.getText();
					},
				});
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
					
						if(space === '&nbsp;'){

						if(input != '') {
							if(text === input.replace('&nbsp;','')) {
							this.texts.typed = this.texts.typed +  '<span style="margin-right: 15px; color: #a3a0a0;">'+ input.replace('&nbsp;','') + '</span>';
							this.counter.characters += text.length;
							this.counter.typed++;
							} else {
							this.texts.typed = this.texts.typed +  '<span style="text-decoration: line-through; margin-right: 15px; color: #a3a0a0;">'+ input.replace('&nbsp;','') + '</span>';
							this.counter.errors++;
							}
							
							this.$refs.testInputDiv.innerHTML = '';
							this.counter.space++;

							this.counter.accuracy = parseInt(this.counter.typed / ( this.counter.typed + this.counter.errors )  * 100 );

							this.giveSpanText();
						} else {
							this.$refs.testInputDiv.innerHTML = '';
						} 
						}
						else {
						this.$refs.testInputDiv.classList.remove('wrongLine');
						this.spans.span1 = text.substr(input.length, text.length);
						}

					} else {
						if(space === '&nbsp;') {
							if(input != '') {
							this.texts.typed = this.texts.typed +  '<span style="text-decoration: line-through; margin-right: 15px; color: #a3a0a0;">'+ input.replace('&nbsp;','') + '</span>';
							this.counter.errors++;
							
							this.$refs.testInputDiv.innerHTML = '';
							this.counter.space++;
							this.counter.accuracy = parseInt(this.counter.typed / ( this.counter.typed + this.counter.errors )  * 100 );
							this.giveSpanText();
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
					timer = setInterval(this.updateTimer, 1000);
				}, 
				updateTimer() {
					if (this.time.time_left > 0) {
						this.time.time_left--;
						this.time.time_passed++;
					}
					else {
						this.finishGame();
					}
				},
		},
		mounted() {
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