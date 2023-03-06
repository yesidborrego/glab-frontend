import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, maxLength } from "@vuelidate/validators";
import Swal, { type SweetAlertIcon } from "sweetalert2";
import { useReservationsStore } from "@/stores/reservations";
import {
  apiCreateReservation,
  apiChangeStateReservation,
  apiUpdateReservation
} from "../../services/api/index";
import { TActionReservation } from "../../interfaces/actionsReservation";
import type { IReservation } from "@/interfaces";

const initialState: IReservation = {
  id: undefined,
  first_name: "",
  last_name: "",
  date: new Date().toISOString().slice(0, 10),
  email: "",
  document_type: "",
  document_number: null,
  type_reservation: "",
  number_people: null,
  description: "No",
  status: false
};

const rules = {
  first_name: { required, maxLengthValue: maxLength(30) },
  last_name: { required, maxLengthValue: maxLength(30) },
  date: { required, Date },
  email: { required, email, maxLengthValue: maxLength(50) },
  document_type: { required },
  document_number: { required, maxLengthValue: maxLength(15) },
  type_reservation: { required },
  number_people: { required, maxLengthValue: maxLength(6) },
  description: {}
};

export const useReservations = () => {
  const store = useReservationsStore();
  const storeBooking = store.selectReservation;
  const formData: IReservation = reactive(initialState);
  const v$ = useVuelidate(rules, formData);
  const typeAction = ref<TActionReservation | null>(null);

  const onActionReservation = () => {
    if (typeAction.value === TActionReservation.AddReservation) {
      onSubmit();
      return;
    }
    onUpdateReservation();
  };
  const onSubmit = async () => {
    const result = await v$.value.$validate();
    if (!result) {
      Swal.fire({
        icon: "warning",
        title: "Faltan datos por llenar en el formulario",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: "top-right"
      });
    } else {
      const { status, message } = await apiCreateReservation(formData);
      if (status !== 200) {
        onShowMsgSuccessError("warning", message);
        return;
      }
      onShowMsgSuccessError("success", message);
      v$.value.$reset();
      store.onGetReservations();
      onClearInputs();
    }
  };

  const onSetActionType = (action: TActionReservation) => {
    typeAction.value =
      action === TActionReservation.AddReservation
        ? TActionReservation.AddReservation
        : TActionReservation.EditReservation;
  };

  const onGetSelectReservation = () => {
    formData.id = storeBooking.id;
    formData.first_name = storeBooking.first_name;
    formData.last_name = storeBooking.last_name;
    formData.date = storeBooking.date;
    formData.email = storeBooking.email;
    formData.document_type = storeBooking.document_type;
    formData.document_number = storeBooking.document_number;
    formData.type_reservation = storeBooking.type_reservation;
    formData.number_people = storeBooking.number_people;
    formData.description = storeBooking.description;
  };

  const onUpdateReservation = async () => {
    const result = await v$.value.$validate();
    if (!result) {
      onShowMsgSuccessError(
        "warning",
        "Faltan datos por llenar en el formulario"
      );
    } else {
      if (formData.id) {
        const { status, message } = await apiUpdateReservation(formData);
        if (status !== 200) {
          onShowMsgSuccessError("warning", message);
          return;
        }
        onShowMsgSuccessError("success", message);
        v$.value.$reset();
        store.onGetReservations();
        onClearInputs();
      }
    }
  };

  const onChangeStateReservation = async () => {
    const result = await v$.value.$validate();
    if (!result) {
      onShowMsgSuccessError(
        "warning",
        "Faltan datos por llenar en el formulario"
      );
    } else {
      if (formData.id) {
        const { status, message } = await apiChangeStateReservation(
          formData.id,
          !formData.status
        );
        if (status !== 200) {
          onShowMsgSuccessError("warning", message);
          return;
        }
        onShowMsgSuccessError("success", message);
        v$.value.$reset();
        store.onGetReservations();
        onClearInputs();
      }
    }
  };

  const onShowMsgSuccessError = (typeMsg: string, message: string) => {
    Swal.fire({
      icon: typeMsg as SweetAlertIcon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top-right"
    });
  };

  const onClearInputs = () => {
    formData.id = undefined;
    formData.first_name = "";
    formData.last_name = "";
    formData.date = new Date().toISOString().slice(0, 10);
    formData.email = "";
    formData.document_type = "";
    formData.document_number = null;
    formData.type_reservation = "";
    formData.number_people = null;
    formData.description = "No";
    formData.status = false;
    store.onClearReservationSelected();
  };

  return {
    formData,
    onActionReservation,
    onChangeStateReservation,
    onClearInputs,
    onGetSelectReservation,
    onSetActionType,
    typeAction,
    v$
  };
};
