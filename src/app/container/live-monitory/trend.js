import React, { useState, useEffect } from "react";
// import { CommonButton, CommonDropDown } from "../../components/common";
// import LiveMonitoryTable from "../../components/live-monitory/monitiry-table";
// import DefaultImg from "../../assets/images/default-150x150.png";
// import DefaultImg1 from "../../assets/images/default-150x160.png";
// import Chart from "react-apexcharts";
import { Container } from "react-bootstrap";
import { Bar, Line } from 'react-chartjs-2';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import "./style.css";
// import { CSVLink } from "react-csv";
import { Button } from 'react-bootstrap';
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
// import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
} from 'chart.js';
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart, registerables } from 'chart.js';
ChartJS.register(annotationPlugin);
Chart.register(...registerables);
// import Chart from "react-apexcharts";



function Trend() {

  const [Sensor_data, setSensor_data] = useState([]);
  const [Data, setData] = useState([]);
  const [Data1, setData1] = useState([]);
  const [entity, setEntity] = useState([]);
  const [currentparameter, setCurrentparameter] = useState('--Select Parameter--')
  const [currentstepsize, setCurrentstepsize] = useState('--Select StepSize--')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [averageTemp, setAverageTemp] = useState([]);
  const [averageTemp1, setAverageTemp1] = useState([]);
  const [date, setDate] = useState([]);
  const [date1, setDate1] = useState([]);


  const changeParam = (newparam) => {
    setCurrentparameter(newparam)
  }

  const changeStepsize = (newparam) => {
    setCurrentstepsize(newparam)
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const toTimestamp = (startDate, endDate) => {
    const dt = Date.parse(startDate, endDate);
    return dt / 1000;
  }
  var start_time = (toTimestamp(startDate));
  var end_time = (toTimestamp(endDate));



  const options = {
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            borderDash: [6, 6],
            borderWidth: 3,
            label: {
              display: true,
              content: "Min : " + Sensor_data.map(o => parseFloat(o.min_value)),
              position: 'end'
            },
            scaleID: 'y',
            value: Sensor_data.map(o => parseFloat(o.min_value)),
            yMin: Sensor_data.map(o => parseFloat(o.min_value)),
            yMax: Sensor_data.map(o => parseFloat(o.min_value)),
            borderColor: 'red',
          },
          line2: {
            type: 'line',
            borderDash: [6, 6],
            borderWidth: 3,
            label: {
              display: true,
              content: "Max : " + Sensor_data.map(o => parseFloat(o.max_value)),
              position: 'start'
            },
            scaleID: 'y',
            value: Sensor_data.map(o => parseFloat(o.max_value)),
            yMin: Sensor_data.map(o => parseFloat(o.max_value)),
            yMax: Sensor_data.map(o => parseFloat(o.max_value)),
            borderColor: 'green',
          },
          line3: {
            type: 'line',
            borderDash: [6, 6],
            label: {
              display: true,
              content: "Average : " + Sensor_data.map(o => parseFloat(o.average_value)),
              position: 'left'
            },
            scaleID: 'y',
            borderWidth: 3,
            value: Sensor_data.map(o => parseFloat(o.average_value)),
            yMin: Sensor_data.map(o => parseFloat(o.average_value)),
            yMax: Sensor_data.map(o => parseFloat(o.average_value)),
            borderColor: 'black',
          },
        }
      }
    }
  };
  // console.log(options)

  const data = {

    labels: Data.map(o => o.Timestamp),
    datasets: [

      {
        label: 'Pressure',
        fill: false,
        lineTension: 0.0,
        animationEnabled: true,
        backgroundColor: [
          'rgb(0, 176, 255)',

        ],
        borderColor: [
          'rgb(0, 176, 255)',
        ],
        borderWidth: 0,
        pointHitRadius: 0,
        data: Data.map(o => parseFloat(o.Pressure))
      },

      {
        label: 'temperature',
        fill: false,
        lineTension: 0.0,
        animationEnabled: true,
        backgroundColor: [
          'rgb(0, 176, 255)',
        ],
        borderColor: [
          'rgb(0, 176, 255)',
        ],
        borderWidth: 0,
        pointHitRadius: 0,
        data: Data.map(o => parseFloat(o.temperature))
      },
    ],
    options
  };

  // const series = [ //data on the y-axis
  //   {
  //     name: "Pressure",
  //     data: averageTemp,
  //   },
  //   // {
  //   //   name:"temperature",
  //   //   data: averageTemp1,
  //   // }
  // ];
  // const options = { //data on the x-axis
  //   xaxis: {
  //     categories: date,
  //   },
  // };

  // const series1 = [ //data on the y-axis
  //   {
  //     name: "temperature",
  //     data: averageTemp1,
  //   },
  // ];
  // const options1 = { //data on the x-axis
  //   chart: { id: 'bar-chart' },
  //   xaxis: {
  //     categories: date1,
  //   },
  // };

  useEffect(() => {
    if (Trend === true) {
      alert("Successfully Getting Response");
      window.location.href = "/charts";
      return;
    }
  }, []);

  async function Submit(e) {
    setIsLoading(true)
    e.preventDefault();
    // setIsLoading(true)
    const response = await fetch(`https://3wd7itxgcc.execute-api.ap-south-1.amazonaws.com/Prod/v1/sdoz/telemetry/sensor/3/agg?start_time=${start_time}&end_time=${end_time}&step_size=${currentstepsize}&param_name=${currentparameter}`);
    const json_data = await response.json();
    console.log(json_data);

    if (response.status === 404) {
      alert("Data Not Found!");
      window.location.href = "/charts";
    } else if (response.status === 502) {
      alert("Bad Gateway!");
      window.location.href = "/charts";
    } else if (response.status === 204) {
      alert("Undefined Content!");
      window.location.href = "/charts";

    } else if (response.status === 504) {
      alert("Endpoint request Timed out");
      window.location.href = "/charts";
    }

    let entity = [{ entity_name: json_data.entity_name, entity_type: json_data.entity_type }];
    let Sensor_data = [{ average_value: json_data.average_value, max_value: json_data.max_value, min_value: json_data.min_value }];

    setData(json_data.Sensor_details);
    setAverageTemp(json_data.Sensor_details?.map((item) => item.Pressure));
    setAverageTemp1(json_data.Sensor_details?.map((item) => item.temperature));
    setDate(json_data.Sensor_details?.map((item) => item.Timestamp));
    setDate1(json_data.Sensor_details?.map((item) => item.Timestamp));
    setEntity(entity)
    setSensor_data(Sensor_data)
    setIsLoading(false)
  }

  async function Enter(e) {
    // setIsLoading(true)
    e.preventDefault();
    // setIsLoading(true)
    const response = await fetch(`https://3wd7itxgcc.execute-api.ap-south-1.amazonaws.com/Prod/fetch_files_s3/3/data?start_time=${start_time}&end_time=${end_time}&step_size=${currentstepsize}&param_name=${currentparameter}`);
    const json = await response.json();

    if (response.status === 200) {
      alert("Download CSV file..!");
      window.location.href = json.bucket_url;
    } else if (response.status === 404) {
      alert("Data Not Found!");
      window.location.href = "/charts";
    } else if (response.status === 502) {
      alert("Bad Gateway!");
      window.location.href = "/charts";
    } else if (response.status === 204) {
      alert("Undefined Content!");
      window.location.href = "/charts";

    } else if (response.status === 504) {
      alert("Endpoint request Timed out");
      window.location.href = "/charts";
    }
    setData1(json);

  }

  console.warn(Data1)

  return (

    <React.Fragment>
      <div className="bg-light1">
        <nav className="navbar navbar-expand-lg navbar-light bg-light1">
          <Link className="navbar-brand" to="/"></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/well-info"><h4><b>wellinfo</b></h4></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trend"><h4><b>Monitory</b></h4></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Container>
        <div className="container-fluid chart page">
          <div className="col-sm-12">
            <h1 className="mt-1 mb-3 fw-bold page" >
              Sensor Data Details
            </h1>
            <form className="row g-3" onSubmit={Submit} >
              <div className="col-md-3">
                <label className="form-label fw-bold">Parameter Name</label>
                <select name="parametername" className="form-select"
                  onChange={(event) => changeParam(event.target.value)}
                  value={currentparameter}   >
                  <option>--Select Parameter--</option>
                  <option value="Pressure">Pressure</option>
                  <option value="temperature">temperature</option>

                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold">Step Size</label>
                <select className="form-select" name="stepsize"
                  onChange={(event) => changeStepsize(event.target.value)}
                  value={currentstepsize}  >
                  <option value="">--Select StepSize--</option>
                  <option>1</option>
                  <option>5</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>

                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold">DateTime</label>
                <DateRangePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  // selectsrange
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="--Select your date range--"
                />
              </div>
              <div className="col-md-3">
                <div className="data_export">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
              {/* <div className="col-md-3">
                            <CSVLink type="submit" className="btn btn-primary"
                                headers={headers}
                                data={data_1}
                                filename="results.csv"
                                target="_blank"
                            >
                                Export Data 
                            </CSVLink>
                        </div> */}
              <div className="col-mt-1">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={Enter}
                  color="transparent"
                  target="_blank"
                  download>Export Data
                </button>
              </div>
            </form>
          </div>
          {
            entity.map((item) =>
              <tr>
                <th> Entity Name: </th>
                <td className="fw-bold" key={item.entity_name}>{item.entity_name}&nbsp;&nbsp;&nbsp;</td>

                <th>Entity Type: </th>
                <td className="fw-bold">{item.entity_type}</td>
              </tr>
            )
          }

          <div className="card">
            <div className="card-header border-0">
              {/* <h3 className="card-title">Bar Chart</h3> */}
              <div className="card-body">
                {isLoading && <h1 className="mt-1 mb-3 fw-bold page"><LoadingSpinner /></h1>}
                <Bar
                  options={options}
                  data={data}
                  type="line"
                />
              </div>
            </div>
          </div>
          {/* <div className="card">
            <div className="card-header border-0">
              <div className="card-body">
                {isLoading && <h1 className="mt-1 mb-3 fw-bold page"><LoadingSpinner /></h1>}
                <Chart
                  options={options1}
                  series={series1}
                  // options1={options1}
                  // series1={series1}
                  type="line"
                />
              </div>
            </div>
          </div> */}
          {/* <Bar data={data} options={options} /> */}
        </div>
      </Container >
    </React.Fragment >
  );
  //   const [selectedAsset, setSelectedAsset] = useState("--ALL--");
  //   const [selectedArea, setSelectedArea] = useState("--ALL--");
  //   const [selectedGGS, setSelectedGGS] = useState("--ALL--");

  //   const renderAssetDropdown = () => {
  //     return (
  //       <div>
  //         <label>Asset</label>
  //         <CommonDropDown
  //           listItem={[
  //             { name: "mumbai", id: "1" },
  //             { name: "gujarat", id: "2" },
  //           ]}
  //           kItemName="name"
  //           kItemId="id"
  //           placeholder="--ALL--"
  //           selectedItem={selectedAsset}
  //           onSelectItem={(e) => setSelectedAsset(e)}
  //         />
  //       </div>
  //     );
  //   };

  //   const renderAreaDropdown = () => {
  //     return (
  //       <div>
  //         <label>Area</label>
  //         <CommonDropDown
  //           listItem={[
  //             { name: "Ahmedabad", id: "1" },
  //             { name: "Gandhinagar", id: "2" },
  //           ]}
  //           kItemName="name"
  //           kItemId="id"
  //           placeholder="--ALL--"
  //           selectedItem={selectedArea}
  //           onSelectItem={(e) => setSelectedArea(e)}
  //         />
  //       </div>
  //     );
  //   };

  //   const renderGGSDropdown = () => {
  //     return (
  //       <div>
  //         <label>GGS</label>
  //         <CommonDropDown
  //           listItem={[
  //             { name: "Kudasan", id: "1" },
  //             { name: "Sargasan", id: "2" },
  //             { name: "Sector-10", id: "3" },
  //           ]}
  //           kItemName="name"
  //           kItemId="id"
  //           placeholder="--ALL--"
  //           selectedItem={selectedGGS}
  //           onSelectItem={(e) => setSelectedGGS(e)}
  //         />
  //       </div>
  //     );
  //   };

  //   const renderLocationDropdown = () => {
  //     return (
  //       <div className="div-dropdown">
  //         {renderAssetDropdown()}
  //         {renderAreaDropdown()}
  //         {renderGGSDropdown()}
  //         <CommonButton title="Go" styles="btn-go" />
  //       </div>
  //     );
  //   };
  //   // return (
  //   //   <div>
  //   //     <h1>Live Monitory</h1>
  //   //     {/* {renderLocationDropdown()} */}
  //   //     {/* <LiveMonitoryTable /> */}
  //   //     <div class="content">
  //   //       <div class="container-fluid">
  //   //         <div class="row">
  //   //           <div class="col-lg-6">
  //   //             <div class="card">
  //   //               <div class="card-header border-0">
  //   //                 <div class="d-flex justify-content-between">
  //   //                   <h3 class="card-title">Online Store Visitors</h3>
  //   //                   <a href="javascript:void(0);">View Report</a>
  //   //                 </div>
  //   //               </div>
  //   //               <div class="card-body">
  //   //                 <div class="d-flex">
  //   //                   <p class="d-flex flex-column">
  //   //                     <span class="text-bold text-lg">820</span>
  //   //                     <span>Visitors Over Time</span>
  //   //                   </p>
  //   //                   <p class="ml-auto d-flex flex-column text-right">
  //   //                     <span class="text-success">
  //   //                       <i class="fas fa-arrow-up"></i> 12.5%
  //   //                     </span>
  //   //                     <span class="text-muted">Since last week</span>
  //   //                   </p>
  //   //                 </div>

  //   //                 <div class="position-relative mb-4">
  //   //                   {/* <canvas id="visitors-chart" height="200"> */}
  //   //                   <img
  //   //                     src={DefaultImg}
  //   //                     alt="Product 1"
  //   //                     // class="img-circle img-size-32 mr-2"
  //   //                     style={{ width: "100%", height: "100%" }}
  //   //                   />
  //   //                   {/* </canvas> */}
  //   //                 </div>

  //   //                 <div class="d-flex flex-row justify-content-end">
  //   //                   <span class="mr-2">
  //   //                     <i class="fas fa-square text-primary"></i> This Week
  //   //                   </span>

  //   //                   <span>
  //   //                     <i class="fas fa-square text-gray"></i> Last Week
  //   //                   </span>
  //   //                 </div>
  //   //               </div>
  //   //             </div>

  //   //             <div class="card">
  //   //               <div class="card-header border-0">
  //   //                 <h3 class="card-title">Products</h3>
  //   //                 <div class="card-tools">
  //   //                   <a href="#" class="btn btn-tool btn-sm">
  //   //                     <i class="fas fa-download"></i>
  //   //                   </a>
  //   //                   <a href="#" class="btn btn-tool btn-sm">
  //   //                     <i class="fas fa-bars"></i>
  //   //                   </a>
  //   //                 </div>
  //   //               </div>
  //   //               <div class="card-body table-responsive p-0">
  //   //                 <table class="table table-striped table-valign-middle">
  //   //                   <thead>
  //   //                     <tr>
  //   //                       <th>Product</th>
  //   //                       <th>Price</th>
  //   //                       <th>Sales</th>
  //   //                       <th>More</th>
  //   //                     </tr>
  //   //                   </thead>
  //   //                   <tbody>
  //   //                     <tr>
  //   //                       <td>
  //   //                         <img
  //   //                           src={""}
  //   //                           alt="Product 1"
  //   //                           style={{ width: "150px", height: "150px" }}
  //   //                         />
  //   //                         Some Product
  //   //                       </td>
  //   //                       <td>$13 USD</td>
  //   //                       <td>
  //   //                         <small class="text-success mr-1">
  //   //                           <i class="fas fa-arrow-up"></i>
  //   //                           12%
  //   //                         </small>
  //   //                         12,000 Sold
  //   //                       </td>
  //   //                       <td>
  //   //                         <a href="#" class="text-muted">
  //   //                           <i class="fas fa-search"></i>
  //   //                         </a>
  //   //                       </td>
  //   //                     </tr>
  //   //                     <tr>
  //   //                       <td>
  //   //                         <img
  //   //                           src={""}
  //   //                           alt="Product 1"
  //   //                           style={{ width: "150px", height: "150px" }}
  //   //                         />
  //   //                         Another Product
  //   //                       </td>
  //   //                       <td>$29 USD</td>
  //   //                       <td>
  //   //                         <small class="text-warning mr-1">
  //   //                           <i class="fas fa-arrow-down"></i>
  //   //                           0.5%
  //   //                         </small>
  //   //                         123,234 Sold
  //   //                       </td>
  //   //                       <td>
  //   //                         <a href="#" class="text-muted">
  //   //                           <i class="fas fa-search"></i>
  //   //                         </a>
  //   //                       </td>
  //   //                     </tr>
  //   //                     <tr>
  //   //                       <td>
  //   //                         <img
  //   //                           src={""}
  //   //                           alt="Product 1"
  //   //                           style={{ width: "150px", height: "150px" }}
  //   //                         />
  //   //                         Amazing Product
  //   //                       </td>
  //   //                       <td>$1,230 USD</td>
  //   //                       <td>
  //   //                         <small class="text-danger mr-1">
  //   //                           <i class="fas fa-arrow-down"></i>
  //   //                           3%
  //   //                         </small>
  //   //                         198 Sold
  //   //                       </td>
  //   //                       <td>
  //   //                         <a href="#" class="text-muted">
  //   //                           <i class="fas fa-search"></i>
  //   //                         </a>
  //   //                       </td>
  //   //                     </tr>
  //   //                     <tr>
  //   //                       <td>
  //   //                         <img
  //   //                           src={""}
  //   //                           alt="Product 1"
  //   //                           // class="img-circle img-size-32 mr-2"
  //   //                           style={{ width: "150px", height: "150px" }}
  //   //                         />
  //   //                         Perfect Item
  //   //                         <span class="badge bg-danger">NEW</span>
  //   //                       </td>
  //   //                       <td>$199 USD</td>
  //   //                       <td>
  //   //                         <small class="text-success mr-1">
  //   //                           <i class="fas fa-arrow-up"></i>
  //   //                           63%
  //   //                         </small>
  //   //                         87 Sold
  //   //                       </td>
  //   //                       <td>
  //   //                         <a href="#" class="text-muted">
  //   //                           <i class="fas fa-search"></i>
  //   //                         </a>
  //   //                       </td>
  //   //                     </tr>
  //   //                   </tbody>
  //   //                 </table>
  //   //               </div>
  //   //             </div>
  //   //           </div>

  //   //           <div class="col-lg-6">
  //   //             <div class="card">
  //   //               <div class="card-header border-0">
  //   //                 <div class="d-flex justify-content-between">
  //   //                   <h3 class="card-title">Sales</h3>
  //   //                   <a href="javascript:void(0);">View Report</a>
  //   //                 </div>
  //   //               </div>
  //   //               <div class="card-body">
  //   //                 <div class="d-flex">
  //   //                   <p class="d-flex flex-column">
  //   //                     <span class="text-bold text-lg">$18,230.00</span>
  //   //                     <span>Sales Over Time</span>
  //   //                   </p>
  //   //                   <p class="ml-auto d-flex flex-column text-right">
  //   //                     <span class="text-success">
  //   //                       <i class="fas fa-arrow-up"></i> 33.1%
  //   //                     </span>
  //   //                     <span class="text-muted">Since last month</span>
  //   //                   </p>
  //   //                 </div>

  //   //                 <div class="position-relative mb-4">
  //   //                   <img
  //   //                     src={DefaultImg1}
  //   //                     alt="Product 1"
  //   //                     // class="img-circle img-size-32 mr-2"
  //   //                     style={{ width: "100%", height: "100%" }}
  //   //                   />
  //   //                 </div>

  //   //                 <div class="d-flex flex-row justify-content-end">
  //   //                   <span class="mr-2">
  //   //                     <i class="fas fa-square text-primary"></i> This year
  //   //                   </span>

  //   //                   <span>
  //   //                     <i class="fas fa-square text-gray"></i> Last year
  //   //                   </span>
  //   //                 </div>
  //   //               </div>
  //   //             </div>

  //   //             <div class="card">
  //   //               <div class="card-header border-0">
  //   //                 <h3 class="card-title">Online Store Overview</h3>
  //   //                 <div class="card-tools">
  //   //                   <a href="#" class="btn btn-sm btn-tool">
  //   //                     <i class="fas fa-download"></i>
  //   //                   </a>
  //   //                   <a href="#" class="btn btn-sm btn-tool">
  //   //                     <i class="fas fa-bars"></i>
  //   //                   </a>
  //   //                 </div>
  //   //               </div>
  //   //               <div class="card-body">
  //   //                 <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
  //   //                   <p class="text-success text-xl">
  //   //                     <i class="ion ion-ios-refresh-empty"></i>
  //   //                   </p>
  //   //                   <p class="d-flex flex-column text-right">
  //   //                     <span class="font-weight-bold">
  //   //                       <i class="ion ion-android-arrow-up text-success"></i>{" "}
  //   //                       12%
  //   //                     </span>
  //   //                     <span class="text-muted">CONVERSION RATE</span>
  //   //                   </p>
  //   //                 </div>

  //   //                 <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
  //   //                   <p class="text-warning text-xl">
  //   //                     <i class="ion ion-ios-cart-outline"></i>
  //   //                   </p>
  //   //                   <p class="d-flex flex-column text-right">
  //   //                     <span class="font-weight-bold">
  //   //                       <i class="ion ion-android-arrow-up text-warning"></i>{" "}
  //   //                       0.8%
  //   //                     </span>
  //   //                     <span class="text-muted">SALES RATE</span>
  //   //                   </p>
  //   //                 </div>

  //   //                 <div class="d-flex justify-content-between align-items-center mb-0">
  //   //                   <p class="text-danger text-xl">
  //   //                     <i class="ion ion-ios-people-outline"></i>
  //   //                   </p>
  //   //                   <p class="d-flex flex-column text-right">
  //   //                     <span class="font-weight-bold">
  //   //                       <i class="ion ion-android-arrow-down text-danger"></i>{" "}
  //   //                       1%
  //   //                     </span>
  //   //                     <span class="text-muted">REGISTRATION RATE</span>
  //   //                   </p>
  //   //                 </div>
  //   //               </div>
  //   //             </div>
  //   //           </div>
  //   //         </div>
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // );
  //   const [state, setState] = useState({
  //     options: {
  //         colors: ["#E91E63", "#FF9800"],
  //         chart: {
  //             id: "basic-bar",
  //         },
  //         xaxis: {
  //             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //         },
  //     },
  //     series: [
  //         {
  //             name: "People Born",
  //             data: [30, 40, 45, 50, 49, 60, 70, 91],
  //         },
  //         {
  //             name: "People Died",
  //             data: [3, 60, 35, 80, 49, 70, 20, 81],
  //         },
  //     ],
  // });
  //   return (
  //     <div className="content page">
  //         <div className="container-fluid page">
  //         <h1>Chart Demo</h1>
  //             <div className="row">
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Bar Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="bar"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Line Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="line"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Area Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="area"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Radar Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="radar"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Heatmap Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="heatmap"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className="col-lg-6">
  //                     <div className="card">
  //                         <div className="card-header border-0">
  //                             <h3 className="card-title">Scatter Chart</h3>
  //                             <div className="card-body">
  //                                 <Chart
  //                                     options={state.options}
  //                                     series={state.series}
  //                                     type="scatter"
  //                                 />
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // );

}

export default Trend;
