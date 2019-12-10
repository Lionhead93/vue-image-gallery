<template>
  <div class="image-gallery">
    <span
      class="btn btn-primary btn-lg btn-block"
      @click="$refs.fileInput.click()"
    >Image Registration</span>
    <form ref="fileForm" method="post" enctype="mutipart/form-data">
      <input
        ref="fileInput"
        type="file"
        name="file"
        @change="regImage"
        accept="image/gif, image/jpeg, image/png, application/pdf"
        hidden
      />
    </form>
    <ImageLayer :urlList="urlListFromServer" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import loadImage from 'blueimp-load-image'
import ImageLayer from '@/components/ImageLayer'
import Constants from '@/my-constants'
import Common from '@/my-common'

export default {
  name: 'gallery',
  components: {
    ImageLayer
  },
  data() {
    return {
      urlListFromServer: []
    }
  },
  created() {
    this.fetchGallery()
  },
  methods: {
    fetchGallery() {
      return axios({
        method: 'get',
        url: Constants.SERVER_URL + '/bgImageList',
        headers: {
          'x-hps-session': 'testest',
          'memberSeq': '2'
        }
      })
        .then(res => {
          console.log(res)
          this.urlListFromServer = res.data
          console.log(this.urlListFromServer)
        })
        .catch(e => {
          console.log('error:', e)
        })
    },
    regImage(e) {
      let formData = new FormData()
      let uploadFile = e.target.files[0]
      let type = uploadFile.type
      let vm = this
      function request() {
        axios({
          method: 'post',
          enctype: 'multipart/form-data',
          headers: {
            'memberSeq': 2,
            'x-hps-session': 'testest'
          },
          url: Constants.SERVER_URL + '/regImage',
          data: formData,
          processData: false,
          contentType: false,
          cache: false
        })
          .then(res => {
            if (res.data.code === '0000') vm.fetchGallery()
            else alert(res.data.message)
          })
          .catch(e => {
            console.log('error:', e)
          })
      }

      if (type === 'application/pdf') {
        formData = new FormData(vm.$refs.fileForm)
        request()
      } else {
        loadImage(
          uploadFile,
          function(img) {
            let dataUrl = img.toDataURL('image/jpeg')

            let imgtype = dataUrl.split(';')
            let contentType = imgtype[0].split(':')[1]

            let blob = Common.dataURItoBlob(dataUrl)

            formData.append('file', blob, uploadFile.name)
            formData.append('Type', contentType)
            request()
          },
          { orientation: true }
        )
      }
    }
  }
}
</script>

<style scoped>
.btn-primary {
  margin-top: 10px;
}
.image-gallery {
  padding: 10px;
}
</style>
