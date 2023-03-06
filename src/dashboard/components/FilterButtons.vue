<template>
  <div
    class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center justify-content-md-start my-2 my-md-0"
  >
    <button
      class="btn btn-outline-primary btn-sm me-2 font-12"
      v-if="optionSearch !== 'select'"
      @click="onSearchReservationFilter"
    >
      Buscar
    </button>
    <button
      class="btn btn-outline-secondary btn-sm font-12"
      v-if="optionSearch !== 'select'"
      @click="onClearReservationFilter"
    >
      Quitar filtro
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const optionSearch = inject("optionSearch");
const onSearchReservationFilter = inject(
  "onSearchReservationFilter"
) as () => void;
const onClearReservationFilter = inject(
  "onClearReservationFilter"
) as () => void;
</script>

<style scoped>
.font-12 {
  font-size: 12px;
}
</style>
