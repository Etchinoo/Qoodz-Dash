import { HelperInstance } from "./Helper";
import { APIsConstants } from "../../constants/API.constants";

let token;
if (typeof window !== "undefined") {
  // Perform localStorage action

  if (
    localStorage.getItem("token") == "undefined" ||
    localStorage.getItem("token") == null
  ) {
    localStorage.removeItem("token");
  } else {
    token = JSON.parse(localStorage.getItem("token"));
  }
}

let config = {
  headers: {
    "Content-Type": "application/json",
    apiKey: "63cad87c3207fce093f8c08388e5a805",
    Authorization: `Bearer ${token?.accessToken}`,
  },
};
export const HomeService = {
  getParteners,
};

function getParteners(selectedDate) {
  return HelperInstance.Get(
    `${APIsConstants.BASE_URL}/partners?startDate=${selectedDate.fromDate}&endDate=${selectedDate.toDate}`,
    config
  );
}
