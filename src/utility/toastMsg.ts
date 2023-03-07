import Swal, { type SweetAlertIcon } from "sweetalert2";

export const onShowMsgSuccessError = (typeMsg: string, message: string) => {
  Swal.fire({
    icon: typeMsg as SweetAlertIcon,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    toast: true,
    position: "top-right"
  });
};
