import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiSetLogin } from "@/services/api";
import { useReservationsStore } from "../../stores/reservations";

export const useAuth = () => {
  const router = useRouter();
  const email = ref<string>("admin@test.com");
  const password = ref<string>("admin_glab");
  const isLoad = ref<boolean>(false);
  const errorMsg = ref<string | null>(null);
  const store = useReservationsStore();
  const { onSetUserLogin } = store;

  const onSubmit = async () => {
    try {
      isLoad.value = true;
      const { status, user, message } = await apiSetLogin({
        email: email.value,
        password: password.value
      });
      errorMsg.value = message;
      if (status === 200) {
        if (user) onSetUserLogin(user);
        router.push({ path: "dashboard" });
      }
      isLoad.value = false;
    } catch (error) {
      console.error;
    }
  };

  return {
    email,
    isLoad,
    errorMsg,
    onSubmit,
    password
  };
};
