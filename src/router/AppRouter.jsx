import { Route, Routes } from "react-router-dom";
import Customers from "../pages/Customers";
import Home from "../pages/Home";
import Branches from "../pages/Branches";
import Cashires from "../pages/Cashires";
import Offers from "../pages/Offers";
import Campaignes from "../pages/Campaignes";
import Partnerships from "../pages/Partnerships";
import Settings from "../pages/Settings";
import Signin from "../pages/Auth/Signin";
import CustomerDetails from "../pages/Customers/CustomerDetails";
import BranchDetails from "../pages/Branches/BranchDetails";
import OfferDetails from "../pages/Offers/OfferDetails";
import RequestNewOfferForm from "../pages/Offers/RequestNewOfferForm";
import LanguageSelect from "../pages/Settings/LanguageSelect";
import EditInfo from "../pages/Settings/EditInfo";
import PeoplePage from "../pages/Settings/PeoplePage";
import RequestNewCampaigneForm from "../pages/Campaignes/RequestNewCampaigneForm";
import ChangPassword from "../pages/Settings/ChangePassword";
import RequireAuth from "../components/RequireAuth";
import EditOffer from "../pages/Offers/EditOffer";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<Signin />} />
      <Route path="" element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/customers">
          <Route path="" element={<Customers />} />
          <Route path=":id" element={<CustomerDetails />} />
        </Route>
        <Route path="/cashires" element={<Cashires />} />
        <Route path="/branches">
          <Route path="" element={<Branches />} />
          <Route path=":id" element={<BranchDetails />} />
        </Route>
        <Route path="/offers">
          <Route path="" element={<Offers />} />
          <Route path=":id" element={<OfferDetails />} />
          <Route path="new" element={<RequestNewOfferForm />} />
          <Route path="edit/:id" element={<EditOffer />} />
        </Route>
        <Route path="/campaignes">
          <Route path="" element={<Campaignes />} />
          <Route path="new" element={<RequestNewCampaigneForm />} />
        </Route>
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/settings">
          <Route path="" element={<Settings />} />
          <Route path="language" element={<LanguageSelect />} />
          <Route path="editinfo" element={<EditInfo />} />
          <Route path="changePassword" element={<ChangPassword />} />
          <Route path="people" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
