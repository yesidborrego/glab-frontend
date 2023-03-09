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
      <template v-if="showInputSearch">
        <input
          :type="refInputSearch"
          v-model="textInputSearch"
          class="form-control form-control-sm"
          rel="refInputSearch"
          @keyup.enter="onSearchReservationFilter"
        />
      </template>
      <template v-if="showSelectInputs">
        <select class="form-select form-select-sm" v-model="textSelectInputs">
          <option value="">Escoge una opción</option>
          <option v-for="item of dataSelectInputs" :key="item" :value="item">
            {{
              optionSearch === "status"
                ? item === "0"
                  ? "Pendiente"
                  : "Confimada"
                : item
            }}
          </option>
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
const optionSearch = inject("optionSearch") as string;
const showInputSearch = inject("showInputSearch") as boolean;
const textInputSearch = inject("textInputSearch") as string | number | Date;
const refInputSearch = inject("refInputSearch") as string;
const dataSelectInputs = inject("dataSelectInputs") as string[];
const showSelectInputs = inject("showSelectInputs") as boolean;
const textSelectInputs = inject("textSelectInputs") as string;
</script>

<style scoped></style>
