import React, { useState, useEffect } from "react";

import { Row } from "../../components/Shared";
import {
  DeleteBtn,
  Form,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  Title,
  SSelect,
} from "../Cashires/FormComponents.styles";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { APIsConstants } from "../../constants/API.constants";

import DeleteConfirmationMessage from "../../components/Shared/DeleteConfirmationMessage";
import SuccessModal from "../../components/Shared/SuccessModal";
import axios from "axios";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

export default function EditBranchForm({ onCancel, locations, selectedRow }) {
  const [stage, setStage] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState(null);

  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const GetAreas = async () => {
    setLoading(true);
    axios
      .get(
        `${APIsConstants.BASE_URL}/locations/areas?location=${location.value}`,
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
        setAreas(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  const UpdateBranch = () => {
    setLoading(true);
    let data = {
      phoneNumber: phone,
      name: name,
      location: location?.value,
      area: area?.value,
    };
    axios
      .put(`${APIsConstants.BASE_URL}/branches/${selectedRow.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setStage(2);
        setError("");
        nav("/branches");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          // setToken(null);
          // setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const deleteBranch = () => {
    setLoading(true);
    let data = {};
    axios
      .delete(`${APIsConstants.BASE_URL}/branches/${selectedRow.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setStage(4);
        setError("");
        nav("/branches");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          // setToken(null);
          // setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    if (location) {
      GetAreas();
    }
  }, [location]);

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.name);
      selectedRow.phoneNumber & setPhone(selectedRow.phoneNumber);
      setArea({ label: selectedRow.area.name, value: selectedRow.area.id });
      setLocation({
        label: selectedRow.location.name,
        value: selectedRow.location.id,
      });
    }
  }, [selectedRow]);

  const onSubmit = () => {
    UpdateBranch()
  };
  if (stage === 4)
    return <SuccessModal mainText={"Branch Successfully Deleted!"} />;
  if (stage === 3)
    return (
      <DeleteConfirmationMessage
        mainText={"Are you sure you want to Delete Branch?"}
        onConfirm={() => deleteBranch()}
        onCancel={onCancel}
      />
    );
  if (stage === 2)
    return <SuccessModal mainText={"Branch Successfully Updated!"} />;
  if (stage === 1)
    return (
      <Form>
        {loading ? <Loader /> : null}
        <Title>Edit Branch</Title>
        <Row gap={"2rem"}>
          <InputGrp>
            <Label>Branch Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGrp>
          <InputGrp>
            <Label>Phone Number</Label>
            <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
          </InputGrp>
        </Row>
        <InputGrp>
          <Label>Branch Location</Label>
          <SSelect
            className="select-filter"
            classNamePrefix="filter-opt"
            isClearable={true}
            isSearchable={true}
            placeholder="Select Location"
            options={locations}
            onChange={(e) => setLocation(e)}
            value={location}
          />
        </InputGrp>
        {location && (
          <InputGrp>
            <Label>Branch Area</Label>
            <SSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              isClearable={true}
              isSearchable={true}
              placeholder="Select Area"
              options={areas}
              onChange={(e) => setArea(e)}
              value={area}
            />
          </InputGrp>
        )}

        <PrimaryBtn onClick={() => onSubmit()}>Save</PrimaryBtn>
        <DeleteBtn onClick={() => setStage(3)}>Delete Branch</DeleteBtn>
      </Form>
    );
}
