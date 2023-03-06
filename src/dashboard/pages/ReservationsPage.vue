<template>
  <div
    class="d-flex justify-content-center align-items-center flex-column login_page mt-3"
  >
    <div class="card shadow mb-3 p-3">
      <div class="title text-center mt-3">
        <h2>Bienvenido al sistema de reservas</h2>
        <h6 class="text-muted">
          Por favor ingrese sus datos y realice su reserva, será un placer
          atenderlos
        </h6>
      </div>
      <div class="row g-0 mx-auto">
        <div class="col-12 col-md-12 col-lg-10 col-xl-9 col-xxl-7 mx-auto">
          <div class="card-body p-0">
            <div class="card-text">
              <FormReservation
                :actionType="TActionReservation.AddReservation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormReservation from "../components/FormReservation.vue";
import { TActionReservation } from "../../interfaces/actionsReservation";
</script>

<style scoped>
.card {
  width: 90%;
}
</style>
