<template>
  <div
    id="imgModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="modalSrc" width="100%" height="100%" alt="File is not an image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageModal',
  props: {
    modalSrc: String
  }
}
</script>
