// This is a component that renders a line chart using Recharts library. It is used in the Home page.

import { useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "../../components/Shared";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  Legend,
} from "recharts";
import Select from "react-select";
import { useState } from "react";
const data = [
  { name: "AUG", male: 300 },
  { name: "SEP", male: 600 },
  { name: "OCT", male: 600 },
  { name: "NOV", male: 600 },
];


const barChart2Data = [
  { name: "EG", x: 30 },
  { name: "SA", x: 12 },
  { name: "AE", x: 15 },
  { name: "TU", x: 35 },
];

export default function Charts({ analyticsData }) {
  const [selectedOption, setSelectedOptions] = useState({
    label: "Scans",
    value: 1,
  });
  useEffect(() => {}, []);
  return (
    <Row gap="19px" width="95%">
      <Col>
        <ScansContainer>
          <div height={300} className={"chartContainer"}>
            <div className="charthead">
              <Select
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                    // This line disable the blue border
                    boxShadow: "none",
                  }),
                }}
                components={{ IndicatorSeparator: () => null }}
                value={selectedOption}
                defaultValue={{ label: "Scans", value: 1 }}
                options={[
                  { label: "Scans", value: 1 },
                  { label: "Redeems", value: 2 },
                ]}
                onChange={(e) => setSelectedOptions(e)}
              />
              <SubTitle>Dominating areas</SubTitle>
            </div>
            <BarChart
              width={300}
              height={300}
              data={
                selectedOption.value == 1
                  ? analyticsData?.analytics?.scans_dominating_areas
                  : analyticsData?.analytics?.redeems_dominating_areas
              }
            >
              <XAxis
                dataKey="area"
                axisLine={false}
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
              <YAxis
                width={35}
                axisLine={false}
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
              <Bar dataKey="counts" stackId="a" fill="#9747FF" barSize={25} />
            </BarChart>
          </div>
        </ScansContainer>
      </Col>

      <Col>
        <NationalitiesChart>
          <div height={300} className={"chartContainer"}>
            <div className="charthead">
              <div></div>
              <SubTitle>Nationalities</SubTitle>
            </div>
            <BarChart width={300} height={300} data={barChart2Data}>
              <XAxis
                dataKey="name"
                axisLine={false}
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
              <YAxis
                width={20}
                axisLine={false}
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
              {/* <Tooltip />
              <Legend /> */}
              <Bar dataKey="x" stackId="a" fill="#F6F4AB" barSize={25} />
            </BarChart>
          </div>
        </NationalitiesChart>
      </Col>

      <Col>
        <BrandChart>
          <div height={300} className={"chartContainer"}>
            <div className="charthead">
              <div></div>
              <SubTitle>Brand Performance</SubTitle>
            </div>
            <LineChart width={300} height={300} data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="linear" dataKey="male" stroke="#14AE5C" />
              <XAxis
                dataKey="name"
                type="category"
                axisLine={false}
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
              <YAxis
                width={35}
                axisLine={false}
                type="number"
                style={{
                  fontFamily: "GilroyRegular",
                  color: "#282A37",
                }}
              />
            </LineChart>
          </div>
        </BrandChart>
      </Col>
    </Row>
  );
}

const ScansContainer = styled.div`
  background: rgba(178, 178, 255, 0.32);
  border-radius: 25px;
  padding: 20px 20px;
`;

const NationalitiesChart = styled.div`
  background: #f9f7c9;
  border-radius: 25px;
  padding: 20px 20px;
`;

const BrandChart = styled.div`
  background: rgba(20, 174, 92, 0.32);
  border-radius: 25px;
  padding: 20px 20px;
`;

const SubTitle = styled.div`
  font-family: "GilroyRegular";
  font-size: 20px;
  line-height: 28px;
  text-align: right;
  color: #282a37;
`;
