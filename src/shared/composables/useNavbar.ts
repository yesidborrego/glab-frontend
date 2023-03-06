import { useRouter } from "vue-router";
import { useReservationsStore } from "../../stores/reservations";
import { storeToRefs } from "pinia";

export const useNavbar = () => {
  const router = useRouter();
  const store = useReservationsStore();
  const { isAuthenticated } = storeToRefs(store);

  const logout = () => {
    store.onLogout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push({ path: "reservations" });
  };

  return {
    isAuth: isAuthenticated,
    logout
  };
};
