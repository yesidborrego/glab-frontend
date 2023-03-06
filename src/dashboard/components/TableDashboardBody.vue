<template>
  <tbody>
    <template v-if="reservations">
      <tr
        v-for="(reservation, index) of props.reservations"
        :key="reservation?.id"
      >
        <TableItem :index="index" :reservation="reservation" />
      </tr>
    </template>
  </tbody>
</template>

<script setup lang="ts">
import type { IReservation } from "@/interfaces";
import TableItem from "./TableItem.vue";

interface Props {
  reservations: IReservation[] | undefined;
}
const props = defineProps<Props>();
</script>

<style scoped></style>
