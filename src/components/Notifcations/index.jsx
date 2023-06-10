import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import icon from "../../assets/NotifcationsIcon.svg";
import KfcNoti from "../../assets/KFCNoti.png";
import { Col, Row } from "../Shared";
import { useAtom } from "jotai";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";

const Notifcations = () => {
  const [showMenue, setShowMenue] = useState(false);
  const menuRef = useRef();

  // useEffect(() => {
  //   const closeDropDown = (e) => {
  //     if (e.path[0] !== menuRef.current) {
  //       setShowMenue(false);
  //     }
  //   };

  //   document.body.addEventListener("click", closeDropDown);
  //   return () => document.body.removeEventListener("click", closeDropDown);
  // }, []);

  return (
    <NotifcationDIV ref={menuRef} onClick={() => setShowMenue(!showMenue)}>
      <NotifcationBell src={icon} alt=""></NotifcationBell>
      <NotifcationBadge>1</NotifcationBadge>
      <Dropdown show={showMenue} />
    </NotifcationDIV>
  );
};

export default Notifcations;

const NotifcationDIV = styled.div`
  color: white;
  text-decoration: none;
  padding: 15px 26px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  cursor: pointer;
`;

const NotifcationBadge = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 15px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ff754c;
  font-family: "GilroyRegular";
  /* color: white; */
`;

const NotifcationBell = styled.img`
  height: 28px;
  width: 28px;
  /* background-color: bisque; */
  /* font-size: 38px; */
  /* color: #2d264b; */
  /* transform: rotate(15deg); */
  cursor: pointer;

  :hover {
    color: gray;
  }
`;

const _Dropdown = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  transform: translateX(-45%);
  color: blue;
  /* background-color: #c1c1c1; */
  /* border: var(--border); */
  border-radius: 20px;
  padding: 1rem;
  /* overflow: hidden; */
  background: #ffffff;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  /* transition: height var(--speed) ease; */
`;

function Dropdown({ show }) {
  const [token, setToken] = useAtom(userTokenAtom);
  const [unSeenNotification, setunSeenNotification] = useState([]);

  const getUnseenNotification = () => {
    axios
      .get("https://qoodz-api.herokuapp.com/api/notifications?status=unseen", {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => setunSeenNotification(res.data))
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  useEffect(() => {
    getUnseenNotification();
  }, []);

  return (
    <Container show={show}>
      {unSeenNotification.length > 0 ? (
        unSeenNotification.map((notifiaction) => (
          <Row gap={"33px"}>
            <SnederArea>
              <SenderImage src={KfcNoti} alt="image of SenderImage" />
              <Badge>
                <Icon xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="white"
                    d="M20.2189 5.45757C20.83 2.27097 18.0324 -0.526646 14.8458 0.0844921L5.69673 1.83914C3.70789 2.22056 2.11735 3.72601 1.61202 5.68218C0.603112 9.58776 4.22515 13.1572 8.11424 12.0135C8.22164 11.9819 8.32143 12.0817 8.28984 12.1891C7.14617 16.0782 10.7156 19.7003 14.6212 18.6914C16.5774 18.186 18.0828 16.5955 18.4642 14.6066L20.2189 5.45757ZM15.1283 1.55764C17.2737 1.1462 19.1572 3.02968 18.7457 5.17504L16.9911 14.3241C16.7197 15.739 15.6455 16.8775 14.246 17.239C11.4489 17.9616 8.91949 15.3647 9.72891 12.6123C10.0954 11.3659 8.93743 10.2079 7.69105 10.5744C4.93864 11.3839 2.34178 8.85447 3.06435 6.05735C3.42585 4.65792 4.56437 3.58364 5.97926 3.31229L15.1283 1.55764Z"
                  />
                </Icon>
              </Badge>
            </SnederArea>
            <Col>
              <Title>KFC - 15 May branch</Title>
              <Message>Accepted your partnership request</Message>
            </Col>
          </Row>
        ))
      ) : (
        <Row gap={"33px"}>
          <SnederArea>
            <SenderImage src={KfcNoti} alt="image of SenderImage" />
            <Badge>
              <Icon xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="white"
                  d="M20.2189 5.45757C20.83 2.27097 18.0324 -0.526646 14.8458 0.0844921L5.69673 1.83914C3.70789 2.22056 2.11735 3.72601 1.61202 5.68218C0.603112 9.58776 4.22515 13.1572 8.11424 12.0135C8.22164 11.9819 8.32143 12.0817 8.28984 12.1891C7.14617 16.0782 10.7156 19.7003 14.6212 18.6914C16.5774 18.186 18.0828 16.5955 18.4642 14.6066L20.2189 5.45757ZM15.1283 1.55764C17.2737 1.1462 19.1572 3.02968 18.7457 5.17504L16.9911 14.3241C16.7197 15.739 15.6455 16.8775 14.246 17.239C11.4489 17.9616 8.91949 15.3647 9.72891 12.6123C10.0954 11.3659 8.93743 10.2079 7.69105 10.5744C4.93864 11.3839 2.34178 8.85447 3.06435 6.05735C3.42585 4.65792 4.56437 3.58364 5.97926 3.31229L15.1283 1.55764Z"
                />
              </Icon>
            </Badge>
          </SnederArea>
          <Col>
            <Title>KFC - 15 May branch</Title>
            <Message>Accepted your partnership request</Message>
          </Col>
        </Row>
      )}

      <Devider />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: -450px;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  /* min-height: 100vh; */
  background-color: white;
  box-sizing: border-box;
  padding: 47px 31px;
  z-index: 999;
`;

const SnederArea = styled.div`
  width: 122px;
  position: relative;
`;

const SenderImage = styled.img`
  width: 81px;
  height: 74px;
  /* object-fit: cover; */
`;

const Badge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: absolute;
  left: 60px;
  top: 52px;
  background-color: rgb(46, 196, 182);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;

const Title = styled.span`
  color: rgb(40, 42, 55);
  font-size: 22px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
`;

const Message = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: Gilroy-Regular, sans-serif;
`;

const Devider = styled.div`
  width: 400px;
  height: 0px;
  border-top: solid 1px rgb(228, 228, 228);
`;
