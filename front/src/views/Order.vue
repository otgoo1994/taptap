﻿<template>
  <div class="my-order" v-if="current">
    <el-card v-if="current.status == 'PENDING'">
      <div class="container">
        <div class="titles-order">Захиалгын мэдээлэл</div>
        <div class="titles-order countdown">
          <div class="monitor">Төлбөр төлөх хугацаа</div>
          <div class="timer" v-if="endDate"><span>0{{this.endDate.days}}</span> өдөр <span>: {{this.endDate.hours}}</span> цаг <span>: {{this.endDate.minutes}}</span> минут</div>
        </div>
      </div>
      <div class="container description">
        Та доорх qr кодыг ухаалаг банкны аппликэйшнээр уншуулж төлбөрөө төлнө үү.<br>
        <span>Төлбөр төлсөний дараагаар таны эрх сунгагдахыг анхаарна уу.<br><span style="color: #000000;"><span>Санамж:</span> <span style="font-weight: 500; color: #000;">"Төлбөр шалгах"</span> товч дээр дарж төлөгдсөн эсэхээ шалгана уу.</span></span>
      </div>
      <div class="container qrcode">
        <img class="qr-cont" :src="'data:image/png;base64,' + current.qpayqr" alt="">
      </div>
      <div class="container footer">
        <div class="titles-order">
          <el-button>Цуцлах</el-button>
        </div>
        <div class="titles-order countdown">
          <el-button @click="isPaid" type="primary">Төлбөр шалгах</el-button>
        </div>
      </div>
    </el-card>

    <el-card v-else-if="current.status == 'PAID'">
      <div class="container">
        <div class="titles-order">Захиалгын мэдээлэл</div>
        <div class="titles-order countdown">
          <div class="monitor">Төлбөр төлсөн хугацаа</div>
          <div class="timer" v-if="endDate">{{new Date(current.updated_at).toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</div>
        </div>
      </div>
      <div class="container description success">
        Төлбөр төлөгдсөн.
      </div>
      <div class="container footer">
        <div class="titles-order">
          <el-button>Санал хүсэлт</el-button>
        </div>
      </div>
    </el-card>

    <el-card>
      <div class="container">
        <div class="titles-order">
          <div class="monitor grey">Захиалгын дугаар</div>
          <div class="timer">{{invoiceId}}</div>
        </div>
        <div class="titles-order countdown">
          <div class="monitor">Захиалга хийсэн огноо</div>
          <div class="timer">{{new Date(current.created_at).toLocaleDateString('en-us', { hour: "numeric", minute: "numeric", weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</div>
        </div>
      </div>

      <div class="container product">
        <div class="titles-order product">
          <div class="monitor grey">Бүтээгдэхүүн</div>
          <div class="timer">Typing.mn үйлчилгээний эрх ( {{current.type === 1 ? '1' : "3"}} сар )</div>
        </div>
        <div class="titles-order countdown product">{{current.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}}₮
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

      if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
      }
      
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
      
      if (Number.isInteger(data)) { 
          if (data === 402) { this.$router.push('/price'); return; }
          return;
      }

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