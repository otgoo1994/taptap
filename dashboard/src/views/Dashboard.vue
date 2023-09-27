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
    background-color: #ffffff;
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
			<a-col :span="24" class="mb-24">
				<!-- <CardProjectTable2
					:title="''"
					:edit="false"
					:delete="false"
					:data="lessons"
					:columns="table1Columns"
				></CardProjectTable2> -->

				<el-table
					:data="currentLesson"
					style="width: 100%">
					<el-table-column
						label="Дадлагын түвшин"
						width="200"
						>
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.lvl }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Хичээлийн нэр"
						>
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.lessonname }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Дадлагын төрөл"
						>
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.type }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Operations">
						<template slot-scope="scope">
							<el-button
								size="mini"
								@click="handleEdit(scope.$index, scope.row)">Засварлах</el-button>
							
								<el-popconfirm
									title="Устгахдаа итгэлтэй байна уу?"
									style="margin-left: 10px;"
									confirm-button-text='Тийм'
  								cancel-button-text='Үгүй'
									@confirm="handleDelete(scope.$index, scope.row)"
								>
									<el-button
									size="mini"
									slot="reference"
									type="danger"
									>Устгах</el-button>
								</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
				<div style="margin: 10px 0px;">
					<el-pagination
						background
						@current-change="pageChanged"
						layout="prev, pager, next"
						:total="lessons.length"
						:page-size="size">
					</el-pagination>
				</div>
				<div class="table-upload-btn">
					<router-link to="/add-lesson">
						<a-button type="dashed" block>
							<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
							</svg>
							Upload New Project
						</a-button>
					</router-link>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
	export default ({
		components: {
			CardProjectTable2,
		},
		computed: {
			currentLesson() {
				const less = this.lessons;
				return less.slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size)
			}
		},
		data() {
			return {
				lessons: [],
				size: 20, 
				page: 1,
				lessonGroup: [],
				table1Data: [],
				table1Columns: [
					{
						title: 'Нэр',
						dataIndex: 'lessonname',
					},
					{
						title: 'Төрөл',
						dataIndex: 'type',
					},
					{
						title: 'Түвшин',
						dataIndex: 'lvl',
					},
					{
						title: 'Зураг',
						dataIndex: 'image',
					}
				]
			}
		},
		methods: {
			pageChanged(page) {
				this.page = page;
			},
			async handleDelete(idx, row) {
				await this.$_request('POST', this.$appUrl + '/admin/delete-lesson', { id: row.id });
				this.getList();
			},
			handleEdit(idx, row) {
				console.log(idx, row);
			},
			async getList() {
				const data = await this.$_request('POST', this.$appUrl + '/admin/get-lesson-list');

				if (!data) { return; }

				this.lessons = data.lesson;
				this.lessonGroup = data.lessonGroup;
			}
		},
		mounted() {
			this.getList();
		}
	})

</script>

<style lang="scss" scoped>
.wrongLine{
  text-decoration: line-through;
}
</style>