import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { IUserDataResponse, IReservation } from "@/interfaces/";
import { apiGetReservations } from "@/services/api";
import dayjs from "dayjs";

const initialState: IReservation = {
  id: undefined,
  first_name: "",
  last_name: "",
  date: dayjs().format("YYYY/MM/DD"),
  email: "",
  document_type: "",
  document_number: null,
  type_reservation: "",
  number_people: null,
  description: "No",
  status: false
};

const columns = [
  "first_name",
  "last_name",
  "date",
  "email",
  "document_type",
  "document_number",
  "type_reservation",
  "number_people",
  "description",
  "status"
];

export const useReservationsStore = defineStore("reservations", () => {
  //* Login
  const user = ref<IUserDataResponse | null>(null);
  const isAuthenticated = ref<boolean>(false);
  //* Reservations
  const allReservations: IReservation[] = reactive([initialState]);
  const filterReservations = ref<IReservation[]>();
  const selectReservation: IReservation = reactive(initialState);

  function onSetUserLogin(data: IUserDataResponse) {
    user.value = { ...data };
    isAuthenticated.value = true;
    onGetReservations();
  }

  function onLogout() {
    user.value = null;
    isAuthenticated.value = false;
  }

  const onGetReservations = async () => {
    const { reservations } = await apiGetReservations();
    Object.assign(allReservations, reservations);
    filterReservations.value = reservations;
  };

  const onGetReservationSelected = computed(() => {
    return selectReservation;
  });

  const onClearReservationSelected = () => {
    selectReservation.id = undefined;
    selectReservation.first_name = "";
    selectReservation.last_name = "";
    selectReservation.date = new Date().toISOString().slice(0, 10);
    selectReservation.email = "";
    selectReservation.document_type = "";
    selectReservation.document_number = null;
    selectReservation.type_reservation = "";
    selectReservation.number_people = null;
    selectReservation.description = "No";
    selectReservation.status = false;
  };

  const onSetReservationToUpdate = (id: number) => {
    const [reservation] = allReservations.filter((item) => item.id === id);
    selectReservation.id = reservation.id;
    selectReservation.first_name = reservation.first_name;
    selectReservation.last_name = reservation.last_name;
    selectReservation.date = reservation.date;
    selectReservation.email = reservation.email;
    selectReservation.document_type = reservation.document_type;
    selectReservation.document_number = reservation.document_number;
    selectReservation.type_reservation = reservation.type_reservation;
    selectReservation.number_people = reservation.number_people;
    selectReservation.description = reservation.description;
    selectReservation.status = reservation.status;
  };

  const onGetFilterReservation = (
    column: string = "",
    value: string | number | Date | boolean = ""
  ) => {
    if (column) {
      if (columns.indexOf(column) >= 0 && value) {
        const response = allReservations.filter((item) => {
          switch (column) {
            case "status":
              return Number(item.status) === Number(value);
            case "document_type":
              return item.document_type === value;
            case "type_reservation":
              return item.type_reservation === value;
            case "number_people":
            case "document_number":
              //@ts-ignore
              return item[column]?.toString().includes(value.toString());
            case "date":
              return dayjs(item.date).isSame(
                //@ts-ignore
                dayjs(value).format("YYYY-MM-DD")
              );
            default:
              // @ts-ignore
              return item[column].toLowerCase().includes(value);
          }
        });
        filterReservations.value = response;
      }
    }
  };

  const onRemoveFilterReservations = () => {
    filterReservations.value = allReservations;
  };

  return {
    filterReservations,
    isAuthenticated,
    onClearReservationSelected,
    onGetFilterReservation,
    onGetReservations,
    onGetReservationSelected,
    onLogout,
    onRemoveFilterReservations,
    onSetUserLogin,
    onSetReservationToUpdate,
    selectReservation,
    user
  };
});
