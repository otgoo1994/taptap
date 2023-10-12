<template>
  <div class="my-order" v-if="current">
    <el-card v-if="current.status == 'PENDING'">
      <div class="container">
        <div class="titles">Захиалгын мэдээлэл</div>
        <div class="titles countdown">
          <div class="monitor">Төлбөр төлөх хугацаа</div>
          <div class="timer" v-if="endDate"><span>0{{this.endDate.days}}</span> өдөр <span>: {{this.endDate.hours}}</span> цаг <span>: {{this.endDate.minutes}}</span> минут</div>
        </div>
      </div>
      <div class="container description">
        Та доорх qr кодыг ухаалаг банкны аппликэйшнээр уншуулж төлбөрөө төлнө үү.<br>
        <span>Төлбөр төлсөний дараагаар таны эрх сунгагдахыг анхаарна уу.<br><span style="color: #000000;"><span>Санамж:</span> <span style="font-weight: 500; color: #000;">"Төлбөр шалгах"</span> товч дээр дарж төлөгдсөн эсэхээ шалгана уу.</span></span>
      </div>
      <div class="container qrcode">
        <qr-code class="qr-cont" :text="current.qpayqr"></qr-code>
      </div>
      <div class="container footer">
        <div class="titles">
          <el-button>Цуцлах</el-button>
        </div>
        <div class="titles countdown">
          <el-button @click="isPaid" type="primary">Төлбөр шалгах</el-button>
        </div>
      </div>
    </el-card>

    <el-card v-else-if="current.status == 'PAID'">
      <div class="container">
        <div class="titles">Захиалгын мэдээлэл</div>
        <div class="titles countdown">
          <div class="monitor">Төлбөр төлсөн хугацаа</div>
          <div class="timer" v-if="endDate">{{new Date(current.updated_at).toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</div>
        </div>
      </div>
      <div class="container description success">
        Төлбөр төлөгдсөн.
      </div>
      <div class="container footer">
        <div class="titles">
          <el-button>Санал хүсэлт</el-button>
        </div>
      </div>
    </el-card>

    <el-card>
      <div class="container">
        <div class="titles">
          <div class="monitor grey">Захиалгын дугаар</div>
          <div class="timer">{{invoiceId}}</div>
        </div>
        <div class="titles countdown">
          <div class="monitor">Захиалга хийсэн огноо</div>
          <div class="timer">{{new Date(current.created_at).toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</div>
        </div>
      </div>

      <div class="container product">
        <div class="titles product">
          <div class="monitor grey">Бүтээгдэхүүн</div>
          <div class="timer">Typing.mn үйлчилгээний эрх ( {{current.type === 1 ? '1' : "3"}} сар )</div>
        </div>
        <div class="titles countdown product">{{current.type === 1 ? '3,900₮' : "9,900₮"}}
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
// import QrcodeVue from 'qrcode.vue'
export default {
  data() { 
    return {
      invoiceId: null,
      current: null,
      timer: null,
      endDate: null
    }
  },
  mounted() {
    this.invoiceId = this.$route.params.invoiceId;
    this.getOrder();
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer);
    next();
  },
  methods: {
    countDown() {
      this.endDate = this.$_method.dateDistance(this.current.end_at);
    },
    async isPaid() {
      const data = await this.$_request('POST', this.$appUrl +`/purchase/check-qpay-bill`, {invoiceId: this.invoiceId});
      
      if (data.result === 'fail') {
        this.$notification['error']({
          message: 'Амжилтгүй',
          description: 'Төлөгдөөгүй байна'
        });

        return;
      }

      this.$notification['success']({
        message: 'Амжилттай',
        description: 'Төлөгдсөн'
      });
      this.current.status = 'PAID';
      this.current.updated_at = data.data.updated_at;

      Event.$emit('changeUserProperty', data.user);
    },
    async getOrder() {
      const data = await this.$_request('POST', this.$appUrl +`/purchase/check-order`, {invoiceId: this.invoiceId});
      if (data.status === 200) {
        this.current = data.data;
        this.endDate = this.$_method.dateDistance(this.current.end_at);
        this.timer = setInterval(this.countDown, 5000);
        return;
      }

      this.$router.push('/order');
    }
  },
}
</script>