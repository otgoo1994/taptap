<template>
  <div class="terms">
    <div class="container">
      <button class="accordion" @click="click" id="1">1. Ерөнхий
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </button>
      <div class="panel" :hidden="index != 1">
        <p>1. <b>"typing.mn"</b> нь арван хуруугаар бичих дадлыг зөв, хүртээмжтэй байдлаар боловсруулсан сургалтын цогц систем юм.</p>
        <p>2. Үйлчилгээний нөхцөлд дурдагдсан нэр томьёог дараах утгаар ойлгоно. Үүнд: </p>
        <ul>
          <li>"Сургалтын систем" гэж арван хуруугаар бичих дасгал хичээлийг боловсруулан, тухайн үйлчилгээг хэрэглэгчдэд санал болгох үйлчилгээг бүрдүүлсэн цахим вэб хуудас (цаашид <b>Typing</b> гэх)</li>
          <li>"Хэрэглэгч" гэж үйлчилгээний нөхцөлийг хүлээн зөвшөөрч, "Typing"-г хэрэглэж буй иргэний эрх зүйн чадамжтай иргэн, хуулийн этгээдийг тус тус ойлгоно.</li>
        </ul>
        <p>3. Хэрэглэгч нь "Typing"-д нэвтэрч, бүртгүүлэхээс өмнө үйлчилгээний нөхцөлтэй бүрэн танилцах үүрэгтэй. Үйлчилгээний нөхцөлтэй бүрэн танилцаж, эдгээр нөхцлүүдийг хүлээн зөвшөөрсөн тохиолдолд “Би хүлээн зөвшөөрч байна.” гэсэн товчийг идэвхжүүлснээр Хэрэглэгчийг зөвшөөрсөнд тооцно. </p>
        <p>4. Үйлчилгээний нөхцөлийг хэрэгжилтэд "Typing" болон Хэрэглэгч нар нь хамтран хяналт тавина.</p>
      </div>

      <button class="accordion" @click="click" id="2">2. Хэрэглэгч болон бүртгүүлэх
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </button>
      <div class="panel" :hidden="index != 2">
        <p>1. Хэрэглэгч бүртгүүлэх болон нэвтрэхдээ "Нэвтрэх" хэсгийн "Facebook-ээр нэвтрэх" гэсэн товчийг дарж нэвтрэх эсвэл бүртгүүлнэ. </p>
        <p>2. Хэрэглэгчийн фэйсбүүкийн нууц үг болон нэвтрэх нэр зэрэг мэдээлэлд "Typing" нь хандах боломжгүй.</p>
        <p>3. Хэрэглэгч нь өөрийн мэдээллийн үнэн зөв, бодит байдалд бүрэн хариуцлага хүлээнэ.</p>
        <p>3. Хэрэглэгч нь өөрийн бүртгэлээ бусдад хуваалцахгүй байх үүрэг хүлээнэ.</p>
      </div>

      <button class="accordion" @click="click" id="3">3. Төлбөр тооцоо
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </button>
      <div class="panel" :hidden="index != 3">
        <p>1. "Typing.mn" нь 1 сар 2900₮, 3 сар нь 8,900₮ гэсэн төлбөртэй байна.</p>
        <p>2. Үйлчилгээний хугацаа дууссан бол сайт ашиглахад зарим хязгаарлалт хийгдэнэ. Үйлчилгээний төлбөр төлөгдөхөд үйлчилгээний хугацаа сунгагдаж, хязгаарлалт цуцлагдана. </p>
        <p>3. Хэрэглэгчийн зүгээс сэтгэл ханамжгүй байгаа нь төлбөр буцаах үндэслэл болохгүй</p>
      </div>

      <button class="accordion" @click="click" id="4">4. Хэрэглэгчийн гомдол, маргаан шийдвэрлэх
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </button>
      <div class="panel" :hidden="index != 4">
        <p>1. Хэрэглэгч "Typing"-н үйл ажиллагаанд холбогдуулж санал хүсэлт, гомдол гаргах эрхтэй бөгөөд санал хүсэлт, гомдлыг цахим хэлбэрээр (https://www.instagram.com/typing.mn) болон фэйсбүүкээр авна. </p>
        <p>2. Хэрэглэгч нь Үйлчилгээний нөхцлөөр хүлээсэн үүргээ зөрчсөн, Үйлчилгээг хууль бусаар ашигласан, Үйлчилгээ үзүүлэгчийн үйл ажиллагаанд болон бусад Хэрэглэгчдэд хохирол учруулсан нь батлагдвал Хэрэглэгчийн нэвтрэх эрхийг цуцлана.</p>
        <p>3. Үйлчилгээтэй холбоотой санал, гомдол, асуудал, маргааныг Талууд эв, зүйгээр харилцан зөвшилцөх замаар шийдвэрлэнэ. "Typing"-н өгсөн хариу болон авсан арга хэмжээнд сэтгэл хангалуун бус байгаа бол Монгол Улсын хууль, тогтоомжид заасны дагуу шийдвэрлүүлнэ.</p>
        <p>4. Үйлчилгээний тасалдал нь байгалийн давагдашгүй хүчин зүйл (гал, үер, газар хөдлөлт, аянга болон тэсрэлт) эсвэл төрийн эрх бүхий байгууллагаас гаргасан хуулийн зохицуулалт, журам, хэрэгжүүлсэн үйл ажиллагаа, ажил хаялт, дайн, террорист халдлага, гоц халдварт өвчин зэрэгтэй холбоотой бол Үйлчилгээг тасалдсанд тооцохгүй бөгөөд Үйлчилгээ үзүүлэгч хариуцлага хүлээх үндэслэл болохгүй.</p>
      </div>
    </div>


    <div style="width: 100%; position: fixed; bottom: 0;">
			<a-layout-footer>
				<a-row type="flex">
					<a-col :span="24" :md="12">

						<!-- Footer Copyright Notice -->
						<p class="copyright">
							© {{year}},
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
							</svg> -аар бүтээв.
						</p>
						<!-- / Footer Copyright Notice -->

					</a-col>
					<a-col :span="24" :md="12" class="footer-control pr-20" align="right" style="color: #fff;">
						Typing.mn
					</a-col>
				</a-row>
			</a-layout-footer>
		</div>
  </div>
</template>

<style lang="scss" scoped>
.terms {
  width: 100%;
  justify-content: center;
  display: flex;

  .container {
    width: 70%;


    .accordion {
      background-color: #FFFFFF;
      margin: 10px 0px 0px 0px;
      color: #666666;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 14px;
      border-radius: 10px;
      font-weight: 600;
      position: relative;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      &.active {
        svg {
          transform: rotate(180deg);
        }
      }

      svg {
        position: absolute;
        right: 2%;
        fill: #fff;
        transition: 0.4s;
      }
    }

    .panel {
      padding: 0 18px;
      color: #666666;
      background-color: #f5f5f5;
      // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      width: 100%;
      overflow: hidden;
      margin-top: -10px;
      padding-top: 20px;
      p {
        font-size: 13px;
      }
      ul {
        font-size: 13px;
      }
    }

  }
}
</style>
<script>
const year = new Date().getFullYear();
  export default {
    data() {
      return {
        index: 1,
        year
      };
    },
    methods: {
      click(evt) {
        const id = parseInt(evt.currentTarget.getAttribute('id'));
        this.index = id;

        const accordion = document.querySelectorAll('.accordion');
        accordion.forEach(element => {
          element.classList.remove('active');
        });

        evt.currentTarget.classList.add('active');
      }
    },
  }
</script>