import type {
  IAxiosResponseLogin,
  ILoginRequest,
  IReservation
} from "@/interfaces";
import { apiReservation } from "../configApi";
import { LocalStorageEncrypt, isBrowser } from "@/utility/";

export const apiSetLogin = async ({ email, password }: ILoginRequest) => {
  try {
    const { data }: IAxiosResponseLogin = await apiReservation.post(
      "/auth/login",
      {
        email,
        password
      }
    );
    if (data.status === 200) {
      if (isBrowser()) {
        LocalStorageEncrypt.encrypt("token", data.token);
        LocalStorageEncrypt.encrypt("user", data.user);
      }
    }
    return {
      status: 200,
      user: data.user,
      token: data.token,
      message: null
    };
  } catch (error: any) {
    const message = error?.response.data.errors
      ? error?.response.data.errors
      : error?.response.data.message;
    return {
      status: 400,
      message,
      user: null,
      token: null
    };
  }
};

export const apiCreateReservation = async (formData: IReservation) => {
  try {
    const { data } = await apiReservation.post("/reservations", formData);
    return {
      status: 200,
      message: data.message,
      reservations: null
    };
  } catch (error: any) {
    const message = error?.response.data.errors
      ? error?.response.data.errors
      : error?.response.data.message;
    return {
      status: 400,
      message,
      reservations: null
    };
  }
};

export const apiGetReservations = async () => {
  try {
    const { data } = await apiReservation.get("/reservations", {
      headers: {
        "x-auth-token": isBrowser()
          ? LocalStorageEncrypt.decrypt("token")
          : null
      }
    });
    return {
      status: 200,
      message: data.message,
      reservations: data.reservations
    };
  } catch (error: any) {
    const message = error?.response.data.errors
      ? error?.response.data.errors
      : error?.response.data.message;
    return {
      status: 400,
      message,
      reservations: null
    };
  }
};

export const apiChangeStateReservation = async (
  id: number,
  status: boolean
) => {
  try {
    const { data } = await apiReservation.put(
      "/reservations/change-state",
      { id, status },
      {
        headers: {
          "x-auth-token": isBrowser()
            ? LocalStorageEncrypt.decrypt("token")
            : null
        }
      }
    );
    return {
      status: 200,
      message: data.message,
      reservations: data.reservations
    };
  } catch (error: any) {
    const message = error?.response.data.errors
      ? error?.response.data.errors
      : error?.response.data.message;
    return {
      status: 400,
      message,
      reservations: null
    };
  }
};

export const apiUpdateReservation = async (formData: IReservation) => {
  try {
    const { data } = await apiReservation.put("/reservations", formData, {
      headers: {
        "x-auth-token": isBrowser()
          ? LocalStorageEncrypt.decrypt("token")
          : null
      }
    });
    return {
      status: 200,
      message: data.message,
      reservations: data.reservations
    };
  } catch (error: any) {
    const message = error?.response.data.errors
      ? error?.response.data.errors
      : error?.response.data.message;
    return {
      status: 400,
      message,
      reservations: null
    };
  }
};
