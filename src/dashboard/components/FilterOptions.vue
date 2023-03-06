<template>
  <div class="row d-flex mb-2">
    <div class="col-12 col-md-6 col-lg-3">
      <p class="text-muted">
        <strong
          >N° de reservas registradas: {{ props.totalReservations }}</strong
        >
      </p>
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <div class="d-flex justify-content-end">
        <div class="col-3">
          <label>Filtar por</label>
        </div>
        <div class="col-8">
          <select class="form-select form-select-sm" v-model="optionSearch">
            <option value="select" selected>Selecciona...</option>
            <option value="first_name">Nombre</option>
            <option value="last_name">Apellido</option>
            <option value="date">Fecha</option>
            <option value="email">Correo Electrónico</option>
            <option value="document_type">Tipo de documento</option>
            <option value="document_number">N° de identificación</option>
            <option value="type_reservation">Tipo de reserva</option>
            <option value="number_people">N° de personas</option>
            <option value="status">Estado de la reserva</option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <template v-if="showTextSearch">
        <input
          type="text"
          v-model="textSearch"
          class="form-control form-control-sm"
          @keyup.enter="onSearchReservationFilter"
        />
      </template>
      <template v-if="showNumberSearch">
        <input
          type="number"
          v-model="numberSearch"
          class="form-control form-control-sm"
          @keyup.enter="onSearchReservationFilter"
        />
      </template>
      <template v-if="showDateSearch">
        <input
          type="date"
          v-model="dateSearch"
          class="form-control form-control-sm"
        />
      </template>
      <template v-if="showStatusSearch">
        <select class="form-select form-select-sm" v-model="statusSearch">
          <option value="" selected>Estado de la reserva</option>
          <option value="0">Pendiente</option>
          <option value="1">Confirmada</option>
        </select>
      </template>
      <template v-if="showDocumentType">
        <select class="form-select form-select-sm" v-model="documentTypeSearch">
          <option value="">Tipo de documento</option>
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="NIT">NIT</option>
        </select>
      </template>
      <template v-if="showTypeReservation">
        <select
          class="form-select form-select-sm"
          v-model="typeReservationSearch"
        >
          <option value="">Tipo de reserva</option>
          <option value="Almuerzo">Almuerzo</option>
          <option value="Onces">Onces</option>
          <option value="Cena">Cena</option>
          <option value="Cumpleaños">Cumpleaños</option>
          <option value="Ocasión especial">Ocasión especial</option>
        </select>
      </template>
    </div>
    <FilterButtons />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import FilterButtons from "../components/FilterButtons.vue";

interface Props {
  totalReservations: number | undefined;
  onSearchReservationFilter: () => void;
}
const props = defineProps<Props>();
const optionSearch = inject("optionSearch");
const showTextSearch = inject("showTextSearch");
const textSearch = inject("textSearch");
const showNumberSearch = inject("showNumberSearch");
const numberSearch = inject("numberSearch");
const showDateSearch = inject("showDateSearch");
const dateSearch = inject("dateSearch");
const showStatusSearch = inject("showStatusSearch");
const statusSearch = inject("statusSearch");
const showDocumentType = inject("showDocumentType");
const documentTypeSearch = inject("documentTypeSearch");
const showTypeReservation = inject("showTypeReservation");
const typeReservationSearch = inject("typeReservationSearch");
</script>

<style scoped></style>
