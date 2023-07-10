import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import { Col, Header, Row } from "../../components/Shared";

import Layout from "../../components/Layout";
import { BsChevronLeft, BsCamera } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import offerImage from "../../assets/offerImage.png";
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
import DateRangePickerV2 from "../../components/DateRangePickerV2";
import moment from "moment";
import { APIsConstants } from "../../constants/API.constants";

const offerTypes = [
  {
    value: "discount",
    label: "Discount",
  },
  {
    value: "gift",
    label: "Gift",
  },
  {
    value: "giftCard",
    label: "Gift Card",
  },
];

const DiscountTypes = [
  {
    value: "percent",
    label: "Percentage",
  },
  {
    value: "flat",
    label: "Flat",
  },
];

export default function EditOffer() {
  // const [offerType, setOfferType] = useState(offerTypes[0]);
  const [offerData, setOfferData] = useState(null);
  const [doneModal, setDoneModal] = useState(false);
  const nav = useNavigate();
  const [branches, setBranches] = useState([]);
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const [selectedImages, setSelectedImages] = useState();
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [name, setName] = useState(offerData?.name);
  const [offerCap, setOfferCap] = useState(null);
  const [discountValue, setDiscountValue] = useState(null);
  const [discountType, setDiscountType] = useState(DiscountTypes[0]);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [offerType, setOfferType] = useState(offerTypes[0]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [description, setDescription] = useState(null);
  const [applicability, setApplicability] = useState(false);
  ///
  const [mainProductName, setMainProductName] = useState(null);
  const [selectedGiftValue, setSelectedGiftValue] = useState(null);
  const [giftCardValue, setGiftCardValue] = useState(null);

  const [stage, setStage] = useState(1);
  const { id } = useParams();
  const [error, setError] = useState("");

  const inputRef = useRef();

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    setSelectedImages(URL.createObjectURL(selectedFiles[0]));
    event.target.value = "";
  };

  function deleteHandler() {
    URL.revokeObjectURL(selectedImages);
    setSelectedImages(null);
  }

  const EditOffer = () => {
    let data = {
      name: name,
      offerType: offerType.value,
      description: description,
      applicability: applicability,
      discountType: discountType.value,
      discountValue: 15,
      originalPrice: originalPrice,
      offerCap: offerCap,
      redeemDuration: 30,
      offerImage: offerImage,
      applicableBranches: [selectedBranch.value],
      startDate: selectedDate.fromDate,
      endDate: selectedDate.toDate,
    };
    if (offerType.value === "gift") {
      data = {
        name: name,
        offerType: offerType,
        description: description,
        applicability: applicability,
        mainProductName: mainProductName,
        giftValue: giftValue,
        offerImage: offerImage,
        redeemDuration: 30,
        applicableBranches: [selectedBranch.value],
        startDate: "2023-05-23T23:00:00",
        endDate: "2023-05-30T23:00:00",
      };
    }

    axios
      .post(`${APIsConstants.BASE_URL}/deals`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setDoneModal(true);
        setError("");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };

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

  const getOfferDetails = () => {
    axios
      .get(`${APIsConstants.BASE_URL}/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setOfferData(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
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

  useEffect(() => {
    if (offerData) {
      setSelectedDate({
        toDate: offerData.endDate,
        fromDate: offerData.startDate,
      });
    }
  }, [offerData]);

  const onSubmit = () => {
    EditOffer();
  };

  const onModalClosed = () => {
    setDoneModal(false);
    nav(-1);
  };
  const isDisabled = () => {
    if (offerType.value === "discount") {
      if (
        name &&
        offerCap &&
        // discountValue &&
        discountType &&
        originalPrice &&
        offerType &&
        selectedBranch &&
        description &&
        applicability &&
        selectedDate
      ) {
        return false;
      } else {
        return true;
      }
    } else if (offerType.value === "gift") {
      if (
        name &&
        selectedImages &&
        discountType &&
        description &&
        mainProductName &&
        selectedDate &&
        offerType &&
        applicability
      ) {
        return false;
      } else {
        return true;
      }
    } else if (offerType.value === "giftCard") {
      if (name && selectedImages && giftCardValue) {
        return false;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    getOfferDetails();
  }, []);

  const renderGiftCardForm = () => {
    return (
      <Form style={{ padding: "16px", maxWidth: "520px" }}>
        <Col gap="22px">
          <Label>Offer Image</Label>
          {!selectedImages && (
            <>
              <UploadOfferImage>
                <UploadImageBadege>
                  <img src={offerData.offerImage} width={110} height={110} />
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
            <Input
              type={"text"}
              onChange={(e) => setName(e.target.value)}
              value={name == null ? offerData.name : name}
            />
          </InputGrp>
          <InputGrp>
            <Label>Offer Type</Label>
            <SSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              options={offerTypes}
              defaultValue={
                offerTypes.filter(
                  (type) => type.value == offerData.offerType
                )[0]
              }
              onChange={(value) => setOfferType(value)}
            />
          </InputGrp>
        </Row>

        <InputGrp>
          <Label>Gift Card Value</Label>
          <Input
            type={"number"}
            onChange={(e) => setGiftCardValue(e.target.value)}
            value={
              giftCardValue == null ? offerData.giftCardValue : giftCardValue
            }
          />
        </InputGrp>

        {error && <Error>{error}</Error>}

        <PrimaryBtn disabled={isDisabled()} onClick={() => onSubmit()}>
          Request Offer
        </PrimaryBtn>
      </Form>
    );
  };
  return (
    <Layout>
      {doneModal && (
        <ModalContainer setOpen={onModalClosed}>
          <SuccessModal mainText="Your request has been sent Successfully!" />
        </ModalContainer>
      )}
      {offerData && (
        <Col master paddingHorz={"30px"} paddingVert={".2rem"} gap={"32px"}>
          <Header
            style={{ fontFamily: "GilroyBold" }}
            marginVert={"18px"}
            onClick={() => nav(-1)}
          >
            <BsChevronLeft /> Offers
          </Header>
          {offerType.value == "giftCard" ? (
            renderGiftCardForm()
          ) : (
            <Form style={{ padding: "16px", maxWidth: "520px" }}>
              <Col gap="22px">
                <Label>Offer Image</Label>
                {!selectedImages && (
                  <>
                    <UploadOfferImage>
                      <UploadImageBadege>
                        <img
                          src={offerData.offerImage}
                          width={110}
                          height={110}
                        />
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
                      <OfferImg
                        src={selectedImages}
                        height="200"
                        alt="upload"
                      />
                    </OfferImgContainer>
                    <DetleteBtn
                      style={{}}
                      skelaton
                      onClick={() => deleteHandler()}
                    >
                      Delete
                    </DetleteBtn>
                  </CurrentImageContainer>
                )}
              </Col>
              <Row style={{ justifyContent: "flex-start" }} gap="16px">
                <InputGrp>
                  <Label>Offer Name</Label>
                  <Input
                    type={"text"}
                    onChange={(e) => setName(e.target.value)}
                    value={name == null ? offerData.name : name}
                  />
                </InputGrp>
                <InputGrp>
                  <Label>Offer Type</Label>
                  <SSelect
                    className="select-filter"
                    classNamePrefix="filter-opt"
                    options={offerTypes}
                    defaultValue={
                      offerTypes.filter(
                        (type) => type.value == offerData.offerType
                      )[0]
                    }
                    onChange={(value) => setOfferType(value)}
                  />
                </InputGrp>
              </Row>
              <InputGrp>
                <Label>Description</Label>
                <TextArea
                  onChange={(e) => setDescription(e.target.value)}
                  value={
                    description == null ? offerData.description : description
                  }
                />
              </InputGrp>
              <Row gap="38px">
                <CheckBoxInputGrp>
                  <Checkbox
                    type="checkbox"
                    onChange={(e) => setApplicability("for_you")}
                  />
                  <Label>For you</Label>
                </CheckBoxInputGrp>
                <CheckBoxInputGrp>
                  <Checkbox
                    type="checkbox"
                    onChange={(e) => setApplicability("for_partner")}
                    checked={
                      applicability == false
                        ? offerData.applicability == "for_partnership"
                          ? true
                          : applicability
                        : false
                    }
                  />
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
                      onChange={(value) => setSelectedBranch(value)}
                      defaultValue={
                        offerData.applicableBranches &&
                        branches.filter(
                          (branch) =>
                            branch.value == offerData.applicableBranches[0]
                        )[0]
                      }
                    />
                  </InputGrp>
                  <InputGrp>
                    <Label>Discount Type</Label>
                    <SSelect
                      fullWidth
                      className="select-filter"
                      classNamePrefix="filter-opt"
                      placeholder="Select Discount Type"
                      options={DiscountTypes}
                      onChange={(value) => setDiscountType(value)}
                      defaultValue={
                        DiscountTypes.filter(
                          (discountType) =>
                            discountType.value.toLowerCase() ==
                            offerData.discountType.toLowerCase()
                        )[0]
                      }
                    />
                  </InputGrp>
                  <InputGrp>
                    <Label>Discount Value</Label>
                    <Input
                      type={"number"}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      value={
                        discountValue == null
                          ? offerData.discountValue
                          : discountValue
                      }
                    />
                  </InputGrp>
                  <Row gap="38px">
                    <InputGrp>
                      <Label>Original Price</Label>
                      <Input
                        type={"number"}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        value={
                          originalPrice == null
                            ? offerData.originalPrice
                            : originalPrice
                        }
                      />
                    </InputGrp>
                    <InputGrp>
                      <Label>Offer cap</Label>
                      <Input
                        disabled={discountType.value === "value" ? true : false}
                        onChange={(e) => setOfferCap(e.target.value)}
                        type={"number"}
                        value={
                          discountValue == null
                            ? offerData.discountValue
                            : discountValue
                        }
                      />
                    </InputGrp>
                  </Row>

                  <InputGrp>
                    <Label>Redeem Duration</Label>
                    <DateRangePickerV2
                      setSelectedDate={setSelectedDate}
                      selectedDate={selectedDate}
                    />
                  </InputGrp>
                </>
              ) : null}
              {offerType.value === "gift" ? (
                <>
                  <InputGrp>
                    <Label>Main Produt Name</Label>
                    <Input
                      onChange={(e) => setMainProductName(e.target.value)}
                      value={
                        mainProductName == null
                          ? offerData.mainProductName
                          : mainProductName
                      }
                    />
                  </InputGrp>
                  <InputGrp>
                    <Label>Gift Value</Label>
                    <Input
                      // fullWidth
                      // className="select-filter"
                      // classNamePrefix="filter-opt"
                      onChange={(e) => setSelectedGiftValue(e.target.value)}
                    />
                  </InputGrp>
                  <InputGrp>
                    <Label>Offer Duration</Label>
                    `${DSF(selectedDate.fromDate)} - ${DSF(selectedDate.toDate)}
                    `
                    <DateRangePickerV2
                      setSelectedDate={setSelectedDate}
                      selectedDate={selectedDate}
                    />
                  </InputGrp>
                </>
              ) : null}
              {error && <Error>{error}</Error>}

              <PrimaryBtn disabled={isDisabled()} onClick={() => onSubmit()}>
                Request Offer
              </PrimaryBtn>
            </Form>
          )}
        </Col>
      )}
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
  background: #0d9aff55;
`;

const Error = styled.div`
  width: 100%;
  text-align: center;
  color: red;
  font-size: 16px;
  font-family: "GilroyBold";
`;
