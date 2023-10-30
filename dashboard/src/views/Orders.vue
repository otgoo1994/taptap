<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Counter Widgets -->
		<a-row :gutter="24">

      <!-- :prefix="stat.prefix"
					:suffix="stat.suffix" -->
			<a-col :span="24" :lg="12" :xl="6" class="mb-24" >
				<WidgetCounter
					title="ТӨЛӨГДСӨН"
					:value="getStatus('PAID')"
          prefix="+"
					:icon="icons[3]"
					status="danger"
				></WidgetCounter>
			</a-col>
      <a-col :span="24" :lg="12" :xl="6" class="mb-24" >
				<WidgetCounter
					title="ХҮЛЭЭГДЭЖ БАЙГАА"
					:value="getStatus('PENDING')"
          prefix="+"
					:icon="icons[1]"
					status="danger"
				></WidgetCounter>
			</a-col>
      <a-col :span="24" :lg="12" :xl="6" class="mb-24" >
				<WidgetCounter
					title="ЦУЦЛАГДСАН"
					:value="getStatus('DECLINED')"
          prefix="+"
					:icon="icons[2]"
					status="danger"
				></WidgetCounter>
			</a-col>
      <a-col :span="24" :lg="12" :xl="6" class="mb-24" >
				<WidgetCounter
					title="НИЙТ"
					:value="getStatus('TOTAL')"
          prefix="₮"
					:icon="icons[0]"
					status="danger"
				></WidgetCounter>
			</a-col>
		</a-row>
		<!-- / Counter Widgets -->

		<!-- <a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="10" class="mb-24">
				<CardBarChart></CardBarChart>

			</a-col>
			<a-col :span="24" :lg="14" class="mb-24">
				<CardLineChart></CardLineChart>

			</a-col>
		</a-row> -->

		<!-- Table & Timeline -->
		<a-row :gutter="24" type="flex" align="stretch">
			<!-- Table -->
			<a-col :span="24" :lg="24" class="mb-24">
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="12">
                <h6>Эрх сунгалтууд</h6>
              </a-col>
              <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
                <a-range-picker style="margin-right: 10px;" @change="dateChanged" v-model="daterange" />
              </a-col>
            </a-row>
          </template>
          <el-table
            :data="orders"
            style="width: 100%">
            <el-table-column
              label="INVOICE ID"
              width="200"
              >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.invoice_id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="MEMBER"
              >
              <template slot-scope="scope">
                <a-avatar shape="square" size="small">
                  <template v-if="!scope.row.image" #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="grey"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                  </template>
                  <template v-else #icon>
                    <img :src="scope.row.image" @error="onLoadError" alt="">
                  </template>
                </a-avatar>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="STATUS"
              >
              <template slot-scope="scope">
                <span style="margin-left: 10px">
                  <a-tag :color="scope.row.status === 'PAID' ? 'green' : (scope.row.status === 'PENDING' ? 'orange' : 'red' )">{{ scope.row.status }}</a-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="CREATED"
              >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ new Date(scope.row.created_at).toLocaleDateString() }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="PAID OR RETURNED"
              >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.status === 'PAID' ? new Date(scope.row.updated_at).toLocaleDateString() : '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="ACTIONS">
              <template slot-scope="scope">

                <el-tooltip class="item" effect="dark" content="Засварлах" placement="right">
                  <router-link :to="'/edit/' + scope.row.invoice_id">
                    <a-button @click="handleEdit(scope.$index, scope.row)" type="dashed" size="small">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                    </a-button>
                  </router-link>
                </el-tooltip>
                
                  <!-- <el-popconfirm
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
                  </el-popconfirm> -->
              </template>
            </el-table-column>
          </el-table>
        </a-card>
			</a-col>
		</a-row>
		<!-- / Table & Timeline -->
	</div>
</template>

<script>
	import CardBarChart from '../components/Cards/CardBarChart' ;
	import CardLineChart from '../components/Cards/CardLineChart' ;
	import WidgetCounter from '../components/Widgets/WidgetCounter' ;
	import CardOrderHistory from '../components/Cards/CardOrderHistory' ;

	// "Projects" table list of columns and their properties.
	const tableColumns = [
		{
			title: 'INVOICE ID',
			dataIndex: 'invoice_id',
      key: 'id',
			scopedSlots: { customRender: 'company' },
			width: 300,
		},
		{
			title: 'MEMBER',
			dataIndex: 'name',
      key: 'member',
			scopedSlots: { customRender: 'members' },
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
      key: 'status',
			class: 'font-bold text-muted text-sm',
		},
    {
			title: 'CREATED',
			dataIndex: 'created_at',
      key: 'created',
			class: 'font-bold text-muted text-sm',
		},
    {
			title: 'PAID',
			dataIndex: 'updated_at',
      key: 'updated',
			class: 'font-bold text-muted text-sm',
		},
	];

	export default ({
		components: {
			CardBarChart,
			CardLineChart,
			WidgetCounter,
			CardOrderHistory,
		},
		data() {
			return {
				tableColumns,
        daterange: null,
        orders: [],
        icons: [
          `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"/></svg>`,
          `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z"/></svg>`,
          `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"/></svg>`,
          `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>`
        ]
			}
		},
    computed: {},
    methods: {
      dateChanged(date) {
        if (!date.length) {
          this.daterange = null;
          return;
        }

        this.getOrders();
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      onLoadError(evt) {
        // evt.currentTarget.src = 'https://icons8.com/icon/fJ30aGwJzPH7/customer';
      },
      getStatus(status) {

        if (status === 'TOTAL') {
          let sum = 0;
          this.orders.forEach(element => {
            if (element.status === 'PAID') {
              sum += element.amount;
            }
          });

          return sum;
        }
        let count = 0;
        this.orders.forEach(element => {
          if (element.status === status) {
            count++;
          }
        });

        return count;
      },
      async getOrders() {
        const data = await this.$_request('POST', this.$appUrl + '/admin/get-orders', { date: this.daterange });
        if (data.status == 200) {
          this.orders = data.data;
          console.log(this.orders);
        }
      }
    },
    mounted() {
      this.getOrders();
    },
	})

</script>

<style lang="scss">
</style>