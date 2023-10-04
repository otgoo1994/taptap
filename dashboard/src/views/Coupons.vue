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
			<a-col :span="24" class="mb-24">

				<el-table
					:data="current"
					style="width: 100%">
					<el-table-column
						label="Купон код"
						width="200"
						>
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.coupon }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Сунгалтын эрх"
						>
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.month }} хоног</span>
						</template>
					</el-table-column>
          <el-table-column
						label="Ашиглагдсан эсэх"
						>
						<template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.used">Ашиглагдсан</el-tag>
              <el-tag type="success" v-else>Ашиглагдаагүй</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						label="">
						<template slot-scope="scope">
							
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
						:total="coupons.length"
						:page-size="size">
					</el-pagination>
				</div>
				<div class="table-upload-btn">
					<a-button @click="newCouponDialog = true" type="dashed" block>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
            </svg>
            Generate New Coupons
          </a-button>
				</div>
			</a-col>
		</a-row>


    <el-dialog title="Generate coupon" :visible.sync="newCouponDialog">
      <el-form>
        <el-form-item label="Тоо ширхэг" :label-width="'120px'">
          <el-input-number v-model="coupon.count" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="Сунгалтын эрх" :label-width="'120px'">
          <el-select placeholder="Хоногоо сонгоно уу" v-model="coupon.type">
            <el-option label="30 хоног" value="30"></el-option>
            <el-option label="90 хоног" value="90"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newCouponDialog = false">Болих</el-button>
        <el-button type="primary" @click="generateCoupon">Хадгалах</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
	export default ({
		components: {
			CardProjectTable2,
		},
		computed: {
			current() {
				const coupon = this.coupons;
				return coupon.slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size)
			}
		},
		data() {
			return {
        newCouponDialog: false,
				coupons: [],
				size: 20, 
				page: 1,
        coupon: {
          count: 1,
          type: null
        }
			}
		},
		methods: {
      async generateCoupon() {
        this.newCouponDialog = false;
        const data = await this.$_request('POST', this.$appUrl + '/admin/create-coupons', this.coupon);

        if (data) {
          this.getList();
        }
      },
			pageChanged(page) {
				this.page = page;
			},
			async handleDelete(idx, row) {
				await this.$_request('POST', this.$appUrl + '/admin/delete-coupon', { id: row.id });
				this.getList();
			},
			handleEdit(idx, row) {
				console.log(idx, row);
			},
			async getList() {
				const data = await this.$_request('POST', this.$appUrl + '/admin/get-coupons');

				if (!data) { return; }

				this.coupons = data.coupon;
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