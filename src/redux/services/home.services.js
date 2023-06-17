import { HelperInstance } from "./Helper";
import { APIsConstants } from "../../constants/API.constants";



let config = {
  headers: {
    "Content-Type": "application/json",
    apiKey: "63cad87c3207fce093f8c08388e5a805",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))?.accessToken}`,
  },
};
export const HomeService = {
  getParteners,
};

function getParteners(selectedDate) {
  console.log(">>>> token ",token)
  return HelperInstance.Get(
    `${APIsConstants.BASE_URL}/partners?startDate=${selectedDate.fromDate}&endDate=${selectedDate.toDate}`,
    config
  );
}
