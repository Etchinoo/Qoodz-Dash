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
import {
  userAtom,
  homeBranchSelctorAtom,
  userTokenAtom,
} from "../../store/Atoms";
import { useAtom } from "jotai";
import { authActions } from "../../redux/actions/Auth.actions";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { APIsConstants } from "../../constants/API.constants";

const Appbar = ({ width, filterOptions }) => {
  const dispatch = useDispatch();
  const { setUser } = bindActionCreators(authActions, dispatch);
  const [selectedBranch, setSelectedBranch] = useAtom(homeBranchSelctorAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [branches, setBranches] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const GetBranches = () => {
    axios
      .get(`${APIsConstants.BASE_URL}/branches`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setSelectedBranch({ value: res.data[0].id, label: res.data[0].name });
        setBranches(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        );
      })
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  const onBranchChange = (e) => {
    setSelectedBranch(e);
  };

  useEffect(() => {
    GetBranches();
  }, []);

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
        {branches && branches.length > 0 ? (
          <>
            <BranchSelector style={{ fontFamily: "GilroyRegular" }}>
              <img src={EG_Flag} alt="" />
              <span>
                <b>{selectedBranch?.name}</b>
              </span>
            </BranchSelector>
            <SSelect
              style={{ maxWidth: "200px" }}
              className="select-filter"
              classNamePrefix="filter-label"
              options={branches}
              onChange={(e) => onBranchChange(e)}
              defaultValue={selectedBranch}
            />
          </>
        ) : null}
      </ActionCard>
    </Container>
  );
};

export default Appbar;
