import {
  ActionCard,
  BranchSelector,
  Container,
  GreetingCard,
  GreetingHeader,
  H4,
  Icon,
  P,
} from "./Appbar.styles";
import icon from "../../assets/icon1.png";
import EG_Flag from "../../assets/eg_flag.png";
import Notifcations from "../Notifcations";
import { SSelect } from "../../pages/Cashires/FormComponents.styles";
import { userAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { authActions } from "../../redux/actions/Auth.actions";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
const Appbar = ({ width, filterOptions }) => {
  const dispatch = useDispatch();
  const { setUser } = bindActionCreators(authActions, dispatch);
  const { user } = useSelector((state) => state.auth);

  return (
    <Container width={width}>
      <GreetingCard>
        <GreetingHeader>
          <H4>{user?.fullName}</H4>
          <Icon onClick={() => setUser(null)} src={icon} alt="" />
        </GreetingHeader>
        <P>Welcome back! Start your journey</P>
      </GreetingCard>
      <ActionCard>
        <Notifcations />
        {filterOptions && filterOptions.lenght > 0 ? (
          <SSelect
            style={{ maxWidth: "200px" }}
            className="select-filter"
            classNamePrefix="filter-opt"
            options={filterOptions}
          />
        ) : (
          <BranchSelector style={{ fontFamily: "GilroyRegular" }}>
            <img src={EG_Flag} alt="" />
            <span>
              EG - KFC - <b>15 May branch</b>
            </span>
          </BranchSelector>
        )}
      </ActionCard>
    </Container>
  );
};

export default Appbar;
