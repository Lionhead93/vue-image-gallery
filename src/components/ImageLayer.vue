<template>
  <div class="row">
    <div v-for="imgSeq in urlList" :key="imgSeq" class="col-4 text-center han-card-wrap">
      <div class="card border-light">
        <div class="text-right">
          <span class="btn delete-button" @click="deleteImage(imgSeq)">
            <small>
              <i class="fas fa-times-circle"></i>
            </small>
          </span>
        </div>
        <img
          :src="makeGetUrl(imgSeq)"
          @error="pdfHandle"
          @click="modalCall(imgSeq)"
          class="card-img-top han-mem-img"
          alt="File is not an image"
          data-target="#imgModal"
          data-toggle="modal"
        />
      </div>
    </div>
    <ImageModal :modalSrc="toModal" />
  </div>
</template>

<script>
import Constants from '@/my-constants'
import ImageModal from '@/components/ImageModal'
import axios from 'axios'

export default {
  name: 'ImageLayer',
  components: { ImageModal },
  data() {
    return {
      toModal: ''
    }
  },
  props: {
    urlList: Array
  },
  methods: {
    makeGetUrl(imgSeq) {
      return Constants.SERVER_URL + '/getImage/' + imgSeq
    },
    deleteImage(imgSeq) {
      let start = this.urlList.indexOf(imgSeq)
      let vm = this
      axios({
        method: 'delete',
        url: Constants.SERVER_URL + '/deleteImage/' + imgSeq,
        headers: {
          'x-hps-session': 'testest'
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.code === '0000') {
            vm.urlList.splice(start, 1)
          } else {
            alert(res.data.message)
          }
        })
        .catch(e => {
          console.log('error:', e)
        })
    },
    pdfHandle(e) {
      let pdfUrl = e.target.src
      console.log(pdfUrl)
      e.target.src = Constants.SERVER_URL + '/image/pdf-icon.png'
    },
    modalCall(imgSeq) {
      this.toModal = Constants.SERVER_URL + '/getImage/' + imgSeq
    }
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
}
.han-mem-img:hover {
  cursor: pointer;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
}
</style>
