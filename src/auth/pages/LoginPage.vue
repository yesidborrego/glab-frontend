<template>
  <div class="d-flex justify-content-center align-items-center login_page">
    <div class="card shadow mb-3 p-2">
      <div class="row g-0">
        <div class="col">
          <div class="card-body">
            <h5 class="card-title text-center mb-4">Iniciar sesión</h5>
            <div class="card-text">
              <form @submit.prevent="onSubmit" class="mb-3">
                <div class="mb-3">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Correo electrónico"
                    v-model="email"
                  />
                </div>
                <div class="mb-4">
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Contraseña"
                    v-model="password"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  :disabled="isLoad"
                >
                  <template v-if="isLoad">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </template>
                  <template v-else> Aceptar </template>
                </button>
              </form>
            </div>

            <p class="card-text text-end">
              <small class="text-muted">Reserva tu mesa</small>
              <RouterLink :to="{ name: 'reservations' }">
                <small> aquí</small>
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuth } from "@/auth/composables/useAuth";

const { email, isLoad, onSubmit, password } = useAuth();
</script>

<style scoped>
.card {
  width: 100%;
}
.login_page {
  height: 100vh;
}

@media screen and (min-width: 576px) {
  .card {
    width: 70%;
  }
}

@media screen and (min-width: 768px) {
  .card {
    width: 50%;
  }
}

@media screen and (min-width: 1200px) {
  .card {
    width: 30%;
  }
}
</style>
