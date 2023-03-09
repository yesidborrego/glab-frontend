import { ref, watch, computed } from "vue";
import type { IReservation } from "@/interfaces";
import { useReservationsStore } from "@/stores/reservations";
import {
  typeReservations,
  typeDocument,
  typeStatusReservations
} from "../../utility/dataSelectInputs";

export const useDashboard = () => {
  const getReservations = computed<IReservation[] | undefined>(() => {
    return store.filterReservations;
  });
  const showModal = ref<boolean>(false);
  const store = useReservationsStore();
  const optionSearch = ref<string>("select");

  const showSelectInputs = ref<boolean>(false);
  const textSelectInputs = ref<string>("");
  const dataSelectInputs = ref<string[]>([]);

  const showInputSearch = ref<boolean>(false);
  const textInputSearch = ref<number | string>("");
  const refInputSearch = ref<number | string | null>(null);

  watch(optionSearch, () => {
    onClearInputsSearch();
    if (
      optionSearch.value === "first_name" ||
      optionSearch.value === "last_name" ||
      optionSearch.value === "email"
    ) {
      showInputSearch.value = true;
      refInputSearch.value = "text";
    } else if (optionSearch.value === "date") {
      showInputSearch.value = true;
      refInputSearch.value = "date";
    } else if (
      optionSearch.value === "document_number" ||
      optionSearch.value === "number_people"
    ) {
      showInputSearch.value = true;
      refInputSearch.value = "number";
    } else if (optionSearch.value === "status") {
      showSelectInputs.value = true;
      dataSelectInputs.value = typeStatusReservations;
    } else if (optionSearch.value === "document_type") {
      showSelectInputs.value = true;
      dataSelectInputs.value = typeDocument;
    } else if (optionSearch.value === "type_reservation") {
      showSelectInputs.value = true;
      dataSelectInputs.value = typeReservations;
    }
  });

  const onClearInputsSearch = () => {
    showInputSearch.value = false;
    textInputSearch.value = "";
    refInputSearch.value = null;

    showSelectInputs.value = false;
    textSelectInputs.value = "";
    dataSelectInputs.value = [];
  };

  const onSetDataForUpdateReservation = (id: number | null) => {
    if (!id) return;
    store.onSetReservationToUpdate(id);
    showModal.value = true;
  };

  const onCloseModal = () => {
    showModal.value = false;
    store.onClearReservationSelected();
  };

  const onSearchReservationFilter = () => {
    let textSearch: string | number | Date | undefined = undefined;
    if (showInputSearch.value) {
      textSearch = textInputSearch.value.toString().trim();
    }
    if (showSelectInputs.value) textSearch = textSelectInputs.value;
    if (!textSearch) return;
    store.onGetFilterReservation(optionSearch.value, textSearch);
  };

  const onClearReservationFilter = () => {
    store.onRemoveFilterReservations();
    optionSearch.value = "select";
  };

  return {
    dataSelectInputs,
    onClearReservationFilter,
    onCloseModal,
    onSearchReservationFilter,
    onSetDataForUpdateReservation,
    optionSearch,
    refInputSearch,
    reservations: getReservations,
    showInputSearch,
    showModal,
    showSelectInputs,
    textInputSearch,
    textSelectInputs
  };
};
