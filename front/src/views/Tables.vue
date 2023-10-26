<style lang="scss">
.info-bar-container {
	position: relative;
	height: 70px;

	.info-bar {
		&:nth-child(1) {
			// background: #f5f5f5;
			padding: 5px 10px;
			border-radius: 10px;
			position: absolute;
		}
	}
}
</style>
<template>
	<div>
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-12 xxl:col-span-12 grid grid-cols-12 gap-6 pt-10">
				<div class="col-span-12 grid grid-cols-12 gap-6 progress-title" :style="{'padding-left': '15%', 'padding-right': '15%'}">
						<div class="col-span-12 sm:col-span-12 xxl:col-span-12 intro-y info-bar-container">
							<div class="info-bar">
								<span class="progress-title">Гүйцэтгэсэн <span :style="{'color': '#e2b714', 'font-weight': '700'}">{{this.userProcess}}%</span></span><span :style="{'border-left': '1px solid grey', 'padding-left': '10px', 'padding-right': '10px'}"><span :style="{'color': '#e2b714', 'font-weight': '700'}">{{this.userStar}}</span> од</span><span :style="{'border-left': '1px solid grey', 'padding-left': '10px'}"><span :style="{'color': '#e2b714', 'font-weight': '700'}">{{Number(userPoint).toLocaleString()}}</span> оноо</span>
							</div>
						</div>
				</div>
			<a-row :gutter="20">
				<div class="col-span-12 grid grid-cols-12 gap-6 listScroll">
					<div v-for="(title, titleIndex) in lessonGroup" :key="titleIndex" class="col-span-12 grid grid-cols-12 gap-6" :style="{'padding-left': '15%', 'padding-right': '15%'}">
						<a-col :span="24" :lg="24" :xl="24" class="mb-10">
							<span class="lesson-title">{{title.groupName}}</span>
						</a-col>
						<a-col v-for="(less, lessIndex) in selectGroup(title.id)" :key="lessIndex" :span="24" :xl="6" :lg="8" :xxl="4" class="mb-24 less-card" style="cursor: pointer;">
							<a-card :bordered="false" class="widget-1" style="">
								<div class="box zoom-in" :style="{'position': 'relative'}" @click="startLess(less.id)">
									<div class="lesson-index">{{less.lvl}}</div>
									<div class="lesson-lock" v-if="less.lvl > (currentUserLesson + 1)"><a-icon type="lock" /></div>
									<div class="lesson-box">
										<img :src="`${$appUrl}/images/lesson/${less.image}`" :style="{'width': '100%', 'height': 'auto'}">
									</div>
									<div class="rating" :style="{'overflow': 'hidden'}">
										<div class="stars" align="center" :style="{'width': '100%', 'position': 'absolute','bottom': '15px'}">
											<a v-for="(i, l) in checkUserLesson(less.id)" :key="l" class="star rated"></a>
											<a v-for="(i, l) in (5 - checkUserLesson(less.id))" :key="'A'+l" class="star"></a>
										</div>
									</div>
									<div class="lesson-name" :style="{'position': 'absolute','bottom': '0'}">{{less.lessonname}}</div>
								</div>
							</a-card>
						</a-col>             
					</div>
				</div>
			</a-row>
        </div>
    </div>
	</div>
</template>

<script>

	export default ({
		data() {
			return {
				row: {
					index: 0
				},
				lessons: [],
				lessonGroup: [],
				userLesson: [],
				currentUserLesson: 0,
				userStar: 0,
				userProcess: 0,
				userPoint : 0
			}
		},
		mounted() {
			this.getList();
			Event.$emit('navbarname', '');
		},
		methods: {
			startLess(id) {
				var selected;
				this.lessons.forEach(element => {
					if (element.id == id) {
						selected = element;
					}
				});
				if(selected.lvl > this.currentUserLesson + 1) {
					this.$notification['error']({
						message: 'Амжилтгүй',
						description: 'Өмнөх хичээлээ дуусгана уу'
					});
				} else {
					const path = this.$_method.getLessonRoute(selected.type);
					this.$router.push({name: path, params: {id: selected.id}});
				}
			},
			selectGroup(id) {
				var l = [];
				this.lessons.forEach(el => {
					if(id == el.groupId) {
						l.push(el);
					}
				});
				return l;
			},
			checkUserLesson(id) {
				var score = 0;
				let ex = this.userLesson.some(function(field) {
					return field.lessonId === id
				});

				if(!ex) {
					return score;
				} else {
					this.userLesson.forEach(element => {
						if(element.lessonId == id) {
							score = element.score;
						}
					});
					
					if (score > 160) {
						// this.userStar = this.userStar + 5;
						return 5;
					} else if(score > 120) {
						// this.userStar += 4;
						return 4;
					} else if (score > 80) {
						// this.userStar += 3;
						return 3;
					} else if(score > 40) {
						// this.userStar += 2;
						return 2;
					} else if (score > 0) {
						// this.userStar += 1;
						return 1;
					} else {
						return 0;
					}
				}
			},
			async getList() {
				const data = await this.$_request('POST', this.$appUrl +'/lesson/get-lesson-list');
				if (!data) { return; }

				this.lessons = data.lesson;
				this.lessonGroup = data.lessonGroup;
				this.userLesson = data.userlesson;
				this.currentUserLesson = data.user.lesson;
				this.userProcess = parseInt((data.userlesson.length * 100) / data.lesson.length);						
				data.star.forEach(element => {
					var star = parseInt(element.score / 40);
					var sc = element.score % 40;
					if(sc > 0) {
						star = star + 1;
					}
					this.userStar = this.userStar + star;
					this.userPoint = this.userPoint + element.score;
				});
			},
		}
	})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Exo+2&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css?fbclid=IwAR0AavK9LlUCRFV7QuuLBSLzicyCci_l8ryq0mWJgqwhP395fYjgFbEFwyo');

.right {
  float: right;
}

.left {
  float: left;
}

.rating .stars {
    position: absolute;
    text-align: center;
    margin-top: -65px;
}


.rating .stars .star:before {
  font-family: 'FontAwesome';
  content: '\f005';
  color: #d0d2d6;
  font-size: 15px;
}

.rating .stars .center {
    float: none;
    margin-top: 10px;
}

.rating .stars .star.to_rate:before,
.rating .stars .star.rated:before {
  color: orange;
}


.rating {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}


.lesson-name {
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: -35px;
    /* border-top: 1px solid grey; */
    padding-top: 4px;
    font-size: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 8px;
    font-family: 'Exo 2', sans-serif;
		/* color: #fff; */
}
.lesson-box {
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 40px;
}
.lesson-index {
    font-family: 'Exo 2', sans-serif;
    font-size: 15px;
    font-weight: 700;
    position: absolute;
    padding-left: 15px;
    color: grey;
}
.lesson-title {
    font-size: 20px;
    font-weight: 700;
    color: grey;
    font-family: 'Exo 2', sans-serif;
}
.lesson-lock {
    position: absolute;
    right: 15px;
    top: 10px;
    color: #d0d2d6;
}

.progress-title { 
    font-size: 18px;
    color: grey;
    font-family: 'Exo 2', sans-serif;
    padding-right: 10px;
}

.hide-box {
    position: absolute;
}
</style>
