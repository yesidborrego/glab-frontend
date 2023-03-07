import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiSetLogin } from "@/services/api";
import { useReservationsStore } from "../../stores/reservations";
import { onShowMsgSuccessError } from "@/utility/toastMsg";

export const useAuth = () => {
  const router = useRouter();
  const email = ref<string>("");
  const password = ref<string>("");
  const isLoad = ref<boolean>(false);
  const store = useReservationsStore();
  const { onSetUserLogin } = store;

  const onSubmit = async () => {
    try {
      isLoad.value = true;
      const { status, user, message } = await apiSetLogin({
        email: email.value,
        password: password.value
      });
      isLoad.value = false;
      if (status !== 200) {
        const msg = typeof message === "string" ? message : message[0].msg;
        onShowMsgSuccessError("warning", msg);
        return;
      }
      console.log({ user });
      if (user) onSetUserLogin(user);
      router.push({ name: "dashboard" });
    } catch (error) {
      console.error(error);
      onShowMsgSuccessError("warning", error as string);
    }
  };

  return {
    email,
    isLoad,
    onSubmit,
    password
  };
};
