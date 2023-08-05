import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  InputGrp,
  Label,
  PrimaryBtn,
  TextArea,
  Title,
} from "../Cashires/FormComponents.styles";
import { APIsConstants } from "../../constants/API.constants";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import axios from "axios";
import ModalContainer from "../../components/Modal";
import SuccessModal from "../../components/Shared/SuccessModal";
import Loader from "../../components/loader";

export function PauseOfferForm({ id, setPauseOffer }) {
  const [reason, setReson] = useState(null);
  const [doneModal, setDoneModal] = useState(false);
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const pauseOffer = () => {
    setLoading(true);
    axios
      .post(
        `${APIsConstants.BASE_URL}/deals/${id}/pause`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setDoneModal(true);
        setPauseOffer(false)
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  const onModalClosed = () => {
    setDoneModal(false);
    nav("/offers")
  };

  return (
    <Form>
       {loading ? <Loader /> : null}
      {doneModal && (
        <ModalContainer setOpen={onModalClosed}>
          <SuccessModal mainText="Your request has been sent Successfully!" />
        </ModalContainer>
      )}

      <Title>Are you sure you want to pause offer?</Title>
      <InputGrp>
        <Label>Tell us the Reason</Label>
        <TextArea onChange={(e) => setReson(e.target.value)} />
      </InputGrp>
      <PrimaryBtn
        disabled={!reason}
        onClick={() => {
          pauseOffer();
        }}
      >
        {" "}
        Pause Offer{" "}
      </PrimaryBtn>
    </Form>
  );
}
