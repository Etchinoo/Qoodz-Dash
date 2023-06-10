import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Col, Header, Row } from "../../components/Shared";
import Select from "react-select";
import PrimButton from "../../components/PrimButton";
// import PhoneInput from "react-phone-number-input";
import checkmark from "../../assets/checkmark.png";
import Layout from "../../components/Layout";
import { BsChevronLeft, BsCamera } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import offerImage from "../../assets/offerImage.png";
import CheckBoxWithLabel from "../../components/CheckBoxWithLabel";
import ModalContainer from "../../components/Modal";
import {
  Form,
  Input,
  InputGrp,
  Label,
  SSelect,
  PrimaryBtn,
  TextArea,
} from "../../components/FormComponents";
import SuccessModal from "../../components/Shared/SuccessModal";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import axios from "axios";
// import checkmark from "../../assets/checkmark.png";

const offerTypes = [
  {
    value: "discount",
    label: "Discount",
  },
  {
    value: "gift",
    label: "Gift",
  },
];

const DiscountTypes = [
  {
    value: "percentage",
    label: "Percentage",
  },
  {
    value: "value",
    label: "Value",
  },
];

export default function RequestNewOfferForm() {
  // const [offerType, setOfferType] = useState(offerTypes[0]);
  const [doneModal, setDoneModal] = useState(false);
  const nav = useNavigate();
  const [branches, setBranches] = useState([]);
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  // const [selectedBranch, setSelectedBranch] = useAtom(homeBranchSelctorAtom);
  const [offerType, setOfferType] = useState(offerTypes[0]);
  const [discountType, setDiscountType] = useState(DiscountTypes[0]);
  const [selectedImages, setSelectedImages] = useState();

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles[0]);
    console.log(URL.createObjectURL(selectedFiles[0]));
    setSelectedImages(URL.createObjectURL(selectedFiles[0]));
    event.target.value = "";
  };

  function deleteHandler() {
    URL.revokeObjectURL(selectedImages);
    setSelectedImages(null);
  }

  const getBranches = async () => {
    try {
      const res = await axios.get(
        "https://qoodz-api.herokuapp.com/api/branches",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      console.log("res: ", res.data);
      return res.data;
    } catch (error) {
      console.log("error: ", error.response.status);
      if (error.response.status === 401) {
        setToken(null);
        setUser(null);
      }
    }
  };

  //A function that creates dropdown options from the branches label is the name and id is the value
  const createOptions = (branches) => {
    const options = branches.map((branch) => {
      return { label: branch.name, value: branch.id };
    });
    return options;
  };

  const onBranchChange = (e) => {
    console.log("e: ", e);
    setSelectedBranch(e);
  };

  useEffect(() => {
    getBranches().then((res) => {
      setBranches(createOptions(res));
    });
  }, []);

  const onSubmit = () => {
    // e.preventDefault();
    console.log("Done");
    setDoneModal(true);
    // setStage(2);
  };

  const onModalClosed = () => {
    setDoneModal(false);
    nav(-1);
  };

  return (
    <Layout>
      {doneModal && (
        <ModalContainer setOpen={onModalClosed}>
          <SuccessModal mainText="Your request has been sent Successfully!" />
        </ModalContainer>
      )}

      <Col master paddingHorz={"42px"} paddingVert={"1rem"} gap={"32px"}>
        <Header
          style={{ fontFamily: "GilroyBold" }}
          marginVert={"18px"}
          onClick={() => nav(-1)}
        >
          <BsChevronLeft /> Offer Details
        </Header>
        <Form style={{ padding: "16px", maxWidth: "720px" }}>
          <Col gap="28px">
            <Label>Offer Image</Label>
            {!selectedImages && (
              <>
                <UploadOfferImage>
                  <UploadImageBadege>
                    <BsCamera />
                  </UploadImageBadege>
                  <input
                    type="file"
                    name="images"
                    id="actual-btn"
                    onChange={onSelectFile}
                    accept="image/png , image/jpeg, image/webp"
                  />
                  <label for="actual-btn">Choose File</label>
                </UploadOfferImage>
              </>
            )}
            {selectedImages && (
              <CurrentImageContainer>
                <OfferImgContainer onClick={() => deleteHandler()}>
                  <OfferImg src={selectedImages} height="200" alt="upload" />
                </OfferImgContainer>
                <DetleteBtn style={{}} skelaton onClick={() => deleteHandler()}>
                  Delete
                </DetleteBtn>
              </CurrentImageContainer>
            )}
          </Col>
          <Row style={{ justifyContent: "flex-start" }} gap="16px">
            <InputGrp>
              <Label>Offer Name</Label>
              <Input />
            </InputGrp>
            <InputGrp>
              <Label>Offer Type</Label>
              <SSelect
                className="select-filter"
                classNamePrefix="filter-opt"
                options={offerTypes}
                defaultValue={offerTypes[0]}
                onChange={(value) => setOfferType(value)}
              />
            </InputGrp>
          </Row>
          <InputGrp>
            <Label>Description</Label>
            <TextArea />
          </InputGrp>
          <Row gap="38px">
            <CheckBoxInputGrp>
              <Checkbox type="checkbox" />
              <Label>For you</Label>
            </CheckBoxInputGrp>
            <CheckBoxInputGrp>
              <Checkbox type="checkbox" />
              <Label>For Others</Label>
            </CheckBoxInputGrp>
          </Row>
          {offerType.value === "discount" ? (
            <>
              <InputGrp>
                <Label>Applicable branches</Label>
                <SSelect
                  fullWidth
                  className="select-filter"
                  classNamePrefix="filter-opt"
                  placeholder="Select Branches"
                  options={branches}
                />
              </InputGrp>
              <Row gap="38px">
                <InputGrp>
                  <Label>Discount Type</Label>
                  <SSelect
                    className="select-filter"
                    classNamePrefix="filter-opt"
                    options={DiscountTypes}
                    onChange={(value) => setDiscountType(value)}
                  />
                </InputGrp>
                <InputGrp>
                  <Label>Discount Value</Label>
                  <Input type={"number"} />
                </InputGrp>
              </Row>
              <Row gap="38px">
                <InputGrp>
                  <Label>Original Price</Label>
                  <Input type={"number"} />
                </InputGrp>
                <InputGrp>
                  <Label>Offer cap</Label>
                  <Input
                    disabled={discountType.value === "value" ? true : false}
                    type={"number"}
                  />
                </InputGrp>
              </Row>
              <InputGrp>
                <Label>Redeem Duration</Label>
                <Input type={"date"} />
              </InputGrp>
            </>
          ) : null}
          {offerType.value === "gift" ? (
            <>
              <InputGrp>
                <Label>Main Produt Name</Label>
                <Input />
              </InputGrp>
              <InputGrp>
                <Label>Gift Value</Label>
                <SSelect
                  fullWidth
                  className="select-filter"
                  classNamePrefix="filter-opt"
                />
              </InputGrp>
              <InputGrp>
                <Label>Offer Duration</Label>
                <SSelect
                  fullWidth
                  className="select-filter"
                  classNamePrefix="filter-opt"
                />
              </InputGrp>
            </>
          ) : null}
          <PrimaryBtn onClick={() => onClick()}>Request Offer</PrimaryBtn>
        </Form>
      </Col>
    </Layout>
  );
}

const CurrentImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 160px;
`;

const DetleteBtn = styled.button`
  padding: 16px 32px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  background: #ffffff;
  border: 1px solid #939baf;
  border-radius: 15px;
  font-family: GilroyMedium;
  width: 100%;
`;

const UploadOfferImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 160px;

  input {
    display: none;
  }
  label {
    background-color: rgb(236, 232, 86);
    font-family: GilroyBold, sans-serif;
    padding: 16px 32px;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
  }
  #file-chosen {
    margin-left: 0.3rem;
  }
`;
const OfferImgContainer = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
`;

const OfferImg = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
`;

const CheckBoxInputGrp = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 21px;
  box-sizing: border-box;
`;

const Checkbox = styled.input`
  width: 28px;
  height: 28px;
  border: solid 1px black;
  border-radius: 10px;
`;

const UploadImageBadege = styled.div`
  width: 110px;
  height: 110px;
  /* border: solid 1px black; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #fff;
  background: #0d9aff55; ;
`;
