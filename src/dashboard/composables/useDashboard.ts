import { ref, watch, computed } from "vue";
import type { IReservation } from "@/interfaces";
import { useReservationsStore } from "@/stores/reservations";

export const useDashboard = () => {
  const getReservations = computed<IReservation[] | undefined>(() => {
    return store.filterReservations;
  });
  const showModal = ref<boolean>(false);
  const store = useReservationsStore();
  const textSearch = ref<string>();
  const showTextSearch = ref<boolean>(false);
  const numberSearch = ref<number>();
  const showNumberSearch = ref<boolean>(false);
  const dateSearch = ref<Date | string>();
  const showDateSearch = ref<boolean>(false);
  const statusSearch = ref<number | string>("");
  const showStatusSearch = ref<boolean>(false);
  const documentTypeSearch = ref<number | string>("");
  const showDocumentType = ref<boolean>(false);
  const typeReservationSearch = ref<number | string>("");
  const showTypeReservation = ref<boolean>(false);
  const optionSearch = ref<string>("select");

  watch(optionSearch, () => {
    onClearInputsSearch();
    if (
      optionSearch.value === "first_name" ||
      optionSearch.value === "last_name" ||
      optionSearch.value === "email"
    ) {
      showTextSearch.value = true;
    } else if (optionSearch.value === "date") {
      showDateSearch.value = true;
    } else if (optionSearch.value === "status") {
      showStatusSearch.value = true;
    } else if (
      optionSearch.value === "document_number" ||
      optionSearch.value === "number_people"
    ) {
      showNumberSearch.value = true;
    } else if (optionSearch.value === "document_type") {
      showDocumentType.value = true;
    } else if (optionSearch.value === "type_reservation") {
      showTypeReservation.value = true;
    }
  });

  const onClearInputsSearch = () => {
    showTextSearch.value = false;
    showDateSearch.value = false;
    showNumberSearch.value = false;
    showStatusSearch.value = false;
    showDocumentType.value = false;
    showTypeReservation.value = false;
    statusSearch.value = "";
    numberSearch.value = 0;
    dateSearch.value = "";
    textSearch.value = "";
    documentTypeSearch.value = "";
    typeReservationSearch.value = "";
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
    let value: string | number | Date | boolean | undefined = undefined;
    if (showStatusSearch.value) value = statusSearch.value;
    if (showNumberSearch.value) value = numberSearch.value;
    if (showDateSearch.value) value = dateSearch.value;
    if (showTypeReservation.value) value = typeReservationSearch.value;
    if (showDocumentType.value) value = documentTypeSearch.value;
    if (showTextSearch.value)
      value = textSearch.value?.toLocaleLowerCase().trim();
    if (!value) return;
    store.onGetFilterReservation(optionSearch.value, value);
  };

  const onClearReservationFilter = () => {
    store.onRemoveFilterReservations();
    optionSearch.value = "select";
  };

  return {
    dateSearch,
    documentTypeSearch,
    numberSearch,
    onClearReservationFilter,
    onCloseModal,
    onSearchReservationFilter,
    onSetDataForUpdateReservation,
    optionSearch,
    reservations: getReservations,
    showDateSearch,
    showDocumentType,
    showModal,
    showNumberSearch,
    showStatusSearch,
    showTextSearch,
    showTypeReservation,
    statusSearch,
    textSearch,
    typeReservationSearch
  };
};
