<template>
  <a-result
    v-if="current"
    :status="this.current.status === 'PAID' ? 'success' : (this.current.status === 'PENDING' ? 'warning' : 'error')"
    :title="getText"
    :sub-title="'Захиалгын дугаар: ' + invoiceId"
  >
    <template v-if="current" #extra>
      <a-card>
        <table>
          <tr>
            <td><strong>Хэрэглэгч</strong></td>
            <td class="left">{{current.name}}</td>
          </tr>
          <tr>
            <td><strong>Огноо</strong></td>
            <td class="left">{{current.created_at}}</td>
          </tr>
          <tr>
            <td><strong>Бүтээгдэхүүн</strong></td>
            <td class="left">{{current.type === 1 ? 'Үйлчилгээний эрх (1 сар)' : 'Үйлчилгээний эрх (3 сар)'}}</td>
          </tr>
          <tr>
            <td></td>
            <td class="left"><strong>₮{{current.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}</strong></td>
          </tr>
        </table>
      </a-card>
      <router-link to="/orders"><a-button key="console" type="primary">Буцах</a-button></router-link>
      <a-button @click="changeStatus" key="buy" v-if="current.status === 'PENDING'">Эрх сунгах</a-button>

      <a-modal v-model="open" title="Санамж" @ok="open = false">
        <p>Эрх сэргээхдээ итгэлтэй байна уу?</p>
      </a-modal>

    </template>
  </a-result>
</template>

<script>
export default {
  data() {
    return {
      invoiceId: null,
      current: null,
      open: false
    }
  },
  computed: {
    getText() {
      if (this.current.status === 'PAID') {
       return 'Төлбөр амжилттай төлөгдсөн';
      }

      if (this.current.status === 'PENDING') {
       return 'Төлбөр хүлээгдэж байна';
      } else {
        return 'Захиалга цуцлагдсан байна';
      }
    }
  },
  mounted() {
    this.invoiceId = this.$route.params.id;
    this.getOrder();
  },
  methods: {
    async reqChangeStat() {
      const data = await this.$_request('POST', this.$appUrl +`/admin/update-order`, {order: this.current});
    },
    changeStatus() {
      this.open = true;
    },
    async getOrder() {
      const data = await this.$_request('POST', this.$appUrl +`/admin/check-order`, {invoiceId: this.invoiceId});
      if (data.status === 200) {
        this.current = data.data;
        return;
      }

      this.$router.push('/orders');
    }
  },
}
</script>

<style lang="scss" scoped>
.ant-result {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ant-card {
  width: 30%;
  margin: auto;
  margin-bottom: 20px;

  table {
    width: 100%;

    td {
      text-align: right;

      &.left {
        text-align: left;
        padding-left: 20px;
      }
    }
  }
}
</style>