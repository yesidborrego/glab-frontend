<template>
  <div class="row g-0 mx-auto">
    <div class="col-12 mx-auto">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table">
            <TableDashboardHeader />
            <template v-if="reservations">
              <TableDashboardBody :reservations="reservations" />
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import TableDashboardBody from "./TableDashboardBody.vue";
import TableDashboardHeader from "./TableDashboardHeader.vue";
import type { IReservation } from "../../interfaces/reservations";

const reservations = inject("reservations") as IReservation[] | undefined;
</script>

<style scoped>
table {
  font-size: 0.8rem;
}

table tr:hover {
  background-color: #ccc;
}

.card-body {
  height: 400px;
  overflow-y: auto;
}
</style>
