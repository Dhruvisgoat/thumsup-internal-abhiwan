import "./ClickableMap.css";
import React, { useEffect } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CityLevelHeader from "../../components/CityLevelHeader/CityLevelHeader";

FusionCharts.addDep(Charts);
FusionCharts.addDep(FusionTheme);

const ClickableMap = ({ onStateClick }) => {
  const navigate = useNavigate();
  const stateNameMap = {
    "001": "Andaman and Nicobar Islands",
    "002": "Andhra Pradesh",
    "003": "Arunachal Pradesh",
    "004": "Assam",
    "005": "Bihar",
    "006": "Chandigarh",
    "007": "Chhattisgarh",
    "008": "Dadra and Nagar Haveli",
    "009": "Daman and Diu",
    "010": "Delhi",
    "011": "Goa",
    "012": "Gujarat",
    "013": "Haryana",
    "014": "Himachal Pradesh",
    "015": "Jammu and Kashmir",
    "016": "Jharkhand",
    "017": "Karnataka",
    "018": "Kerala",
    "019": "Lakshadweep",
    "020": "Madhya Pradesh",
    "021": "Maharashtra",
    "022": "Manipur",
    "023": "Meghalaya",
    "024": "Mizoram",
    "025": "Nagaland",
    "026": "Odisha",
    "027": "Puducherry",
    "028": "Punjab",
    "029": "Rajasthan",
    "030": "Sikkim",
    "031": "Tamil Nadu",
    "032": "Telangana",
    "033": "Tripura",
    "034": "Uttar Pradesh",
    "035": "Uttarakhand",
    "036": "West Bengal",
  };

  const handleStateClick = (event) => {
    console.log(event);
    const selectedStateId = event.data.id;
    const selectedStateName = stateNameMap[selectedStateId] || "Unknown State";
    console.log(`You clicked on state: ${selectedStateName}`);
    onStateClick(selectedStateName);
  };

  useEffect(() => {
    const demoMap = new FusionCharts({
      type: "maps/india",
      renderAt: "indian-map",
      height: "90%",
      width: "100%",
      dataFormat: "json",
      dataSource: {
        chart: {
          captionFontSize: "25",
          captionFontBold: "0",
          subCaptionFontSize: "18",
          subCaptionFontBold: "0",
          canvasPadding: "30",
          showBorder: "0",
          showCanvasBorder: "0",
          legendBorderAlpha: "0",
          showLegend: "0",
          toolTipPadding: "9",
          toolTipColor: "#FFFFFF",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "70",
          toolTipBorderThickness: "1",
          tooltipBorderRadius: "3",
          toolTipBorderColor: "#FFFFFF",
          toolTipBorderAlpha: "80",
          showToolTipShadow: "0",
          baseFont: "Lato",
          clickURL: "",
        },
        colorrange: {
          minvalue: "300",
          startlabel: "Low",
          endlabel: "High",
          code: "#efedf5",
          gradient: "1",
          color: [
            {
              maxvalue: "220000",
              displayvalue: "Avg.",
              code: "#bcbddc",
            },
            {
              maxvalue: "1400000",
              code: "#756bb1",
            },
          ],
        },
        data: [
          { id: "015", value: "58438" },
          { id: "014", value: "41344" },
          { id: "028", value: "292124" },
          { id: "006", value: "44191" },
          { id: "034", value: "63906" },
          { id: "013", value: "250052" },
          { id: "010", value: "587935" },
          { id: "029", value: "226463" },
          { id: "033", value: "625561" },
          { id: "005", value: "170466" },
          { id: "030", value: "4228" },
          { id: "003", value: "5232" },
          { id: "025", value: "6799" },
          { id: "022", value: "10650" },
          { id: "024", value: "5527" },
          { id: "032", value: "8428" },
          { id: "023", value: "8074" },
          { id: "004", value: "101877" },
          { id: "035", value: "441481" },
          { id: "016", value: "92724" },
          { id: "026", value: "135255" },
          { id: "007", value: "67474" },
          { id: "020", value: "209546" },
          { id: "012", value: "377633" },
          { id: "009", value: "1691" },
          { id: "008", value: "2046" },
          { id: "021", value: "1382174" },
          { id: "002", value: "546638" },
          { id: "017", value: "632636" },
          { id: "011", value: "40997" },
          { id: "019", value: "332" },
          { id: "018", value: "486131" },
          { id: "031", value: "776706" },
          { id: "027", value: "18077" },
          { id: "001", value: "3268" },
          { id: "036", value: "546638" },
        ],
      },
      events: {
        entityclick: function (ev) {
          handleStateClick(ev);
        },
        dataplotRollOver: function (event) {
          console.log("Roll over:", event.data.id);
        },
        dataplotRollOut: function (event) {
          console.log("Roll out:", event.data.id);
        },
      },
    }).render();

    return () => {
      demoMap.dispose();
    };
  }, []);
  const handleBackClick = () => {
    navigate("/menu"); // Redirect to the home/menu route
  };

  return (

    <>
      <div>
        <div className="">
          <CityLevelHeader />
        </div>
        <div id="indian-map" />
      </div>
    </>

  );
};
export default ClickableMap;
