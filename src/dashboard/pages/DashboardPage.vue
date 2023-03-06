<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column login_page mt-3"
  >
    <div class="card shadow mb-3 p-3">
      <div class="title text-center mt-3">
        <h2>Registro de reservaciones</h2>
      </div>
      <div class="container font-14 mt-1 pt-2">
        <FilterOptions
          :totalReservations="reservations ? reservations?.length : 0"
          :onSearchReservationFilter="onSearchReservationFilter"
        />
      </div>
      <div class="container">
        <TableDashBoard />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <ModalRes :show="showModal" @close="onCloseModal">
      <template #header>
        <h3 class="m-0 p-2">Editar reserva</h3>
      </template>
      <template #body>
        <FormReservation :actionType="TActionReservation.EditReservation" />
      </template>
    </ModalRes>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, provide } from "vue";
import { TActionReservation } from "@/interfaces/actionsReservation";
import { useDashboard } from "@/dashboard/composables/useDashboard";
import ModalRes from "@/dashboard/components/ModalReservation.vue";
import FormReservation from "../components/FormReservation.vue";
import TableDashBoard from "../components/TableDashBoard.vue";
import FilterOptions from "../components/FilterOptions.vue";

const {
  dateSearch,
  documentTypeSearch,
  numberSearch,
  onClearReservationFilter,
  onCloseModal,
  onGetReservation,
  onSearchReservationFilter,
  onSetDataForUpdateReservation,
  optionSearch,
  reservations,
  showDateSearch,
  showDocumentType,
  showModal,
  showNumberSearch,
  showStatusSearch,
  showTextSearch,
  showTypeReservation,
  statusSearch,
  textSearch,
  typeReservationSearch
} = useDashboard();

provide("optionSearch", optionSearch);
provide("dateSearch", dateSearch);
provide("documentTypeSearch", documentTypeSearch);
provide("numberSearch", numberSearch);
provide("showDateSearch", showDateSearch);
provide("showDocumentType", showDocumentType);
provide("showNumberSearch", showNumberSearch);
provide("showStatusSearch", showStatusSearch);
provide("showTextSearch", showTextSearch);
provide("showTypeReservation", showTypeReservation);
provide("statusSearch", statusSearch);
provide("textSearch", textSearch);
provide("typeReservationSearch", typeReservationSearch);
provide("reservations", reservations);
provide("onUpdateReservation", onSetDataForUpdateReservation);
provide("onSearchReservationFilter", onSearchReservationFilter);
provide("onClearReservationFilter", onClearReservationFilter);

onMounted(() => {
  onGetReservation();
});
</script>

<style scoped>
.card {
  height: 80vh;
  overflow-y: auto;
  width: 100%;
}

.font-14 {
  font-size: 14px;
}
</style>
