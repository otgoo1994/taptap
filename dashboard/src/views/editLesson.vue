﻿<style lang="scss">
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
    background-color: #F7F7F7;
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
				width: 50vw !important;
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

					span {
						font-size: 3vw;
						color: #E2B714;
					}
				}
			}

			.actions {
				// background-color: yellow;
				&-info {
					position: relative;
					font-weight: 700;
					line-height: 180%;
					height: 50px;
					p {
						font-size: 2vw;
						color: #E2B714;
					}

					svg {
						height: 70%;
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
		<a-row :gutter="24" type="flex">
			<a-col :span="24">
				<a-card :bordered="true" class="header-solid h-full" :bodyStyle="{padding: '30px 20px'}">
					<el-form :model="currentLesson" :rules="regx" ref="lessonForm">
						<a-col :span="12" class="mb-24">
							<el-form-item prop="lessonname">
								<el-input placeholder="Хичээлийн нэр" v-model="currentLesson.lessonname" clearable> </el-input>
							</el-form-item>
						</a-col>
						<a-col :span="12" class="mb-24">
							<el-form-item prop="type">
								<el-select v-model="currentLesson.type" clearable placeholder="Гарны төрөл" style="width: 100%">
									<el-option
										v-for="item in options.types"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</a-col>
						<a-col :span="12" class="mb-24">
							<el-form-item prop="groupId">
								<el-select v-model="currentLesson.groupId" clearable placeholder="Хичээлийн бүлэг" style="width: 100%">
									<el-option
										v-for="item in lessonGroup"
										:key="item.id"
										:label="item.groupName"
										:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</a-col>
						<a-col :span="12" class="mb-24">
							<el-form-item prop="lang">
								<el-select v-model="currentLesson.lang" clearable placeholder="Хэл" style="width: 100%">
									<el-option
										v-for="item in options.lang"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</a-col>
						<a-col :span="12" class="mb-24">
							<el-form-item prop="holdword">
								<el-select v-model="currentLesson.holdword" clearable :disabled="currentLesson.type != 'hold'" placeholder="Баруун/Зүүн" style="width: 100%">
									<el-option
										v-for="item in options.holdword"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</a-col>
						<a-col :span="12" class="mb-24">
							<el-form-item prop="lvl">
								<el-input-number placeholder="Level" v-model="currentLesson.lvl" clearable style="width: 100%"> </el-input-number>
							</el-form-item>
						</a-col>
						<a-col :span="24" class="mb-24">
							<el-form-item prop="text">
								<el-input type="textarea" placeholder="Текст" v-model="currentLesson.text" clearable> </el-input>
							</el-form-item>
						</a-col>

						<div class="table-upload-btn">
							<a-button type="dashed" block @click="saveLesson">
								<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
								</svg>
								Хадгалах
							</a-button>
						</div>
					</el-form>
				</a-card>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
	export default ({
		components: {
			CardProjectTable2
		},
		data() {
			return {
        currentId: null,
				lessons: [],
				lessonGroup: [],
				options: {
					types: [{value: 'intro', label: 'Шинэ үсэг'}, {value: 'boxed', label: 'Давтлага үсэг'}, {value: 'review', label: 'Давтлага өгүүлбэр'}, {value: 'hold', label: '1 гарын дадлага'}],
					lang: [{value: 'mon', label: 'Монгол'}, {value: 'eng', label: 'English'}],
					holdword: [{value: 'ө', label: 'Баруун'}, {value: 'р', label: 'Зүүн'}]
				},
				currentLesson: {
					lessonname			: '',
					type						: '',
					groupId					: '',
					lang						: 'mon',
					holdword				: null,
					lvl							: 0,
					text						: ''
				}
			}
		},
		computed: {
			regx() {
					return {
						lessonname			: [{required: true, message: 'Хичээлийн нэр'}],
						type						: [{required: true, message: 'Давтлагын төрөл'}],
						groupId					: [{required: true, message: 'Хичээлийн груп'}],
						lang						: [{required: true, message: 'Хэлээ сонгоно уу'}],
						holdword				: [{required: this.currentLesson.type === 'hold' ? true : false, message: 'Дадлага хийх гар'}],
						lvl							: [{required: true, message: 'Түвшин'}],
						text						: [{required: true, message: 'Дадлага хийх бичвэр'}]
					}
				}
		},
		methods: {
      async getList() {
				const data = await this.$_request('POST', this.$appUrl + '/admin/get-lesson-list');
				if (!data) { return; }

				this.lessons = data.lesson;
				this.lessonGroup = data.lessonGroup;
			},
			async getCurrentLesson() {
				const data = await this.$_request('POST', this.$appUrl + '/admin/get-current-lesson', { id: this.currentId});
				if (!data) { return; }

        if (data.status != 200) {
          this.$router.push('/lessons');
          return;
        }

        this.currentLesson = data.lesson;
        console.log(data, '====');
			},
			saveLesson() {
				this.$refs.lessonForm.validate( async (valid) => {
					if (!valid) {
						return;
					}

					const data = await this.$_request('POST', this.$appUrl + '/admin/update-lesson', {info: this.currentLesson});

					if (!data) { return; }

					if (data.status !== 200) {
						this.$notification['error']({
							message: 'Амжилтгүй',
							description: 'Хичээлийн түвшин аль хэдийн бүртгэгдсэн'
						});
						return;
					}

					this.$notification['success']({
						message: 'Амжилттай',
						description: 'Шинэчлэгдлээ'
					});
				});
			}
		},
		created() {
      this.currentId = this.$route.params.id;
			this.getList();
      this.getCurrentLesson();
		}
	})

</script>

<style lang="scss" scoped>
.wrongLine{
  text-decoration: line-through;
}
</style>