<template>
  <th scope="row">{{ props.index + 1 }}</th>
  <td>{{ props.reservation.first_name }}</td>
  <td>{{ props.reservation.last_name }}</td>
  <td>
    {{ dayjs(props.reservation.date).format("DD/MM/YYYY") }}
  </td>
  <td>
    <input
      type="text"
      class="size-input"
      :value="props.reservation.email"
      :title="props.reservation.email"
      readonly
    />
  </td>
  <td class="text-center">
    {{ props.reservation.document_type }}
  </td>
  <td class="text-end">
    {{ props.reservation.document_number }}
  </td>
  <td>{{ props.reservation.type_reservation }}</td>
  <td class="text-end">
    {{ props.reservation.number_people }}
  </td>
  <td class="text-center">
    <span
      :class="[
        'badge',
        'p-2',
        props.reservation.status ? 'text-bg-success' : 'text-bg-danger'
      ]"
      >{{ props.reservation.status ? "Confirmada" : "Pendiente" }}</span
    >
  </td>
  <td class="text-center">
    <button
      class="btn btn-warning font-12 btn-sm"
      @click="
        onSetDataForUpdateReservation(
          props.reservation.id ? props.reservation.id : null
        )
      "
    >
      Editar
    </button>
  </td>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { IReservation } from "@/interfaces";
import dayjs from "dayjs";

interface Props {
  index: number;
  reservation: IReservation;
}

const onSetDataForUpdateReservation = inject("onUpdateReservation") as (
  id: number | null
) => void;
const props = defineProps<Props>();
</script>

<style scoped>
input[class^="size-input"] {
  display: inline-block;
  height: 20px;
  overflow: auto;
  background-color: transparent;
  white-space: nowrap;
  white-space: -moz-nowrap;
  white-space: -nowrap;
  white-space: -o-nowrap;
  border: 0;
  outline: none;
}

.size-title_input {
  width: 80px;
}

.size-input {
  width: 130px;
}

.font-12 {
  font-size: 12px;
}

.font-14 {
  font-size: 14px;
}
</style>
