<template>
  <form @submit.prevent="onActionReservation" class="mb-3">
    <div
      class="p-3 d-flex justify-content-start align-content-center flex-wrap"
    >
      <div class="p-2 flex-grow-1">
        <input
          :class="[
            'form-control',
            'form-control-sm',
            v$.first_name?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          placeholder="Nombre"
          type="text"
          v-model="formData.first_name"
        />
      </div>
      <div class="p-2 flex-grow-1">
        <input
          :class="[
            'form-control',
            'form-control-sm',
            v$.last_name?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          placeholder="Apellido"
          type="text"
          v-model="formData.last_name"
        />
      </div>
      <div class="p-2 flex-shrink-0 flex-grow-1 flex-md-shrink-1">
        <input
          :class="[
            'form-control',
            'form-control-sm',
            v$.date?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          placeholder="Fecha reserva"
          type="date"
          v-model="formData.date"
        />
      </div>
      <div class="p-2 flex-grow-1">
        <input
          :class="[
            'form-control',
            'form-control-sm',
            v$.email?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          placeholder="Correo electrónico"
          type="email"
          v-model="formData.email"
        />
      </div>
      <div class="p-2 flex-shrink-0 flex-grow-1 flex-md-shrink-1">
        <select
          :class="[
            'form-select',
            'form-select-sm',
            v$.document_type?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          v-model="formData.document_type"
        >
          <option value="">Tipo de documento</option>
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="NIT">NIT</option>
        </select>
      </div>
      <div class="p-2 flex-shrink-0 flex-grow-1 flex-md-shrink-1">
        <input
          type="number"
          maxLength="15"
          :class="[
            'form-control',
            'form-control-sm',
            v$.document_number?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          placeholder="N° Identificación"
          v-model="formData.document_number"
        />
      </div>
      <div class="p-2 flex-shrink-0 flex-grow-1 flex-md-shrink-1">
        <select
          :class="[
            'form-select',
            'form-select-sm',
            v$.type_reservation?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          v-model="formData.type_reservation"
        >
          <option value="">Tipo de reserva</option>
          <option value="Almuerzo">Almuerzo</option>
          <option value="Onces">Onces</option>
          <option value="Cena">Cena</option>
          <option value="Cumpleaños">Cumpleaños</option>
          <option value="Ocasión especial">Ocasión especial</option>
        </select>
      </div>
      <div class="p-2 flex-shrink-0 flex-grow-1 flex-md-shrink-1">
        <input
          type="number"
          :class="[
            'form-control',
            'form-control-sm',
            v$.number_people?.$errors[0]?.$message ? 'is-invalid' : 'valid'
          ]"
          maxLength="6"
          placeholder="N° de personas"
          v-model="formData.number_people"
        />
      </div>
      <div class="p-2 flex-grow-1">
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Observaciones"
          v-model="formData.description"
        />
      </div>
    </div>
    <div
      :class="[
        'col-12',
        'col-sm-10',
        'col-md-6',
        'mx-auto',
        'mt-3',
        props.actionType === TActionReservation.AddReservation
          ? 'col-lg-3'
          : 'col-lg-6'
      ]"
    >
      <template v-if="props.actionType === TActionReservation.AddReservation">
        <button
          type="submit"
          class="btn btn-primary w-100"
          :disabled="v$.$invalid"
        >
          Reservar
        </button>
      </template>
      <template v-else>
        <div class="d-flex justify-content-around">
          <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">
            Actualizar información
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="v$.$invalid"
            @click="onChangeStateReservation"
          >
            Confirmar Reserva
          </button>
        </div>
      </template>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useReservations } from "@/dashboard/composables/useReservations";
import { TActionReservation } from "@/interfaces/actionsReservation";
import { onMounted } from "vue";
interface Props {
  actionType: TActionReservation;
}
const props = defineProps<Props>();
const {
  formData,
  onActionReservation,
  onChangeStateReservation,
  onClearInputs,
  onGetSelectReservation,
  onSetActionType,
  v$
} = useReservations();
onSetActionType(props.actionType);
onMounted(() => {
  if (props.actionType === TActionReservation.EditReservation) {
    onGetSelectReservation();
    return;
  }
  onClearInputs();
});
</script>

<style scoped></style>
