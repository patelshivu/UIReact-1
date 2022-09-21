import React, { useState,useEffect } from 'react';
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import "./style.css";
import "./spinner.css";
import { Container } from "react-bootstrap";
import { Bar, Line } from 'react-chartjs-2';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'react-bootstrap';
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
} from 'chart.js';
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart, registerables } from 'chart.js';
ChartJS.register(annotationPlugin);
Chart.register(...registerables);


function LiveMonitory() {


  const [iconsActive, setIconsActive] = useState('tab1');
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


  const handleIconsClick = (value) => {
    if (value === iconsActive) {
      return;
    }

    setIconsActive(value);
  };



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

  useEffect(() => {
    if (LiveMonitory === true) {
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
    // <React.Fragment>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light1">
    //     <Link className="navbar-brand" to="/"></Link>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" to="/well-info"><h4><b>wellinfo</b></h4></Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/trend"><h4><b>Monitory</b></h4></Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // </React.Fragment>
     <>
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
            <MDBIcon fas icon='chart-pie' className='me-2' /> Well info
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
            <MDBIcon fas icon='chart-line' className='me-2' /> Monitory
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
            <MDBIcon fas icon='cogs' className='me-2' /> Settings
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={iconsActive === 'tab1'}>
        <>
                <div className="col-md-12">
                    <div className="col-sm-12">
                        <div className="padding-10">
                            <div className="col-sm-8">
                                <h5 className="margin-top-0" id="name_head"></h5>
                                <p className="p_address" id="consumerAdd"></p>
                                <h5 className="margin-top-0 det_2">
                                    <i className="fa fa-life-bouy" aria-hidden="true"></i>&nbsp;&nbsp;<b>Well No :</b><span id="lblPnlNo">LNC#50</span>
                                </h5>
                                <h5 className="margin-top-0 det_2">
                                    <i className="fa fa-dot-circle-o "></i>&nbsp;&nbsp;<b>Well Type :</b>
                                    <span id="lblWellType">SRP</span>
                                </h5>
                                <h5 className="margin-top-0 det_2">
                                    <i className="fa fa-cubes"></i>&nbsp;&nbsp;<b>Panel Type :</b>&nbsp;
                                    <span id="lblPanelId">DOL</span>
                                </h5>
                                <h5 className="margin-top-0 det_2">
                                    <i className="fa fa-clock-o"></i>&nbsp;&nbsp;<b>Timer Status :</b>&nbsp;
                                    <span id="lblTimerId">Continuous</span>
                                </h5>
                                <h5>
                                    <i className="fa fa-list-alt " aria-hidden="true"></i>&nbsp;&nbsp;<b>IMEI No :</b><span id="lblImeiNo">867322033682519</span>
                                </h5>
                                <h5>
                                    <i className="fa fa-align-justify"></i>&nbsp;&nbsp;<b>GGS/CTF :</b><span id="lblGGS">Linch GGS</span>
                                </h5>
                                <h5>
                                    <i className="fa fa-align-justify"></i>&nbsp;&nbsp;<b>Location :</b><span id="lblLatLng"><b>23.41165293 , 72.3360625</b></span>
                                </h5>
                                <div className="container-fluid">
                                    <button type="submit" className="btn btn-outline-primary" data-mdb-ripple-color="dark">&nbsp;&nbsp;Asset Mapping&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit" className="btn btn-outline-primary" data-mdb-ripple-color="dark">&nbsp;&nbsp;IMEI Replacement&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="submit" className="btn btn-outline-primary" data-mdb-ripple-color="dark">&nbsp;&nbsp;Set Installation Date&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                        <div className="well padding-10">
                            <div className="container-fluid">
                                <div className="square border border-dark mt-4">
                                    <div className="square border border-3 mt-1">
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>AREA</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblArea">Area V</span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Installation Date</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblYearOfInstallation">2021-08-30</span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Electrical Meter Connection No</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblMtrConNo">20808050532</span>
                                        </h5>
                                    </div>
                                </div>
                                <div className="square border border-dark mt-4">
                                    <div className="square border border-3 mt-1">
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>DISTRICT</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblDistrict">Mahesana</span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>VILLAGE</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblvlg">Modhera</span>
                                        </h5>
                                    </div>
                                </div>
                                <div className="square border border-dark mt-4">
                                    <div className="square border border-3 mt-1">
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Transformer Capacity (kVA)</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblTransformerCap"></span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Feeder</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblFeeder">LINCH SURAJ FEEDER</span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Sub Station</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblSubStation">SURAJSS SUBSTATION</span>
                                        </h5>
                                        <h5 className="margin-top-0 name_head_3">
                                            <b><span>Asset</span>
                                                <label>
                                                    :
                                                </label></b>
                                            <span className="m_span" id="lblAsset">Mehsana</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'tab2'}>
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
              <div className="card-body">
                {isLoading && <h1 className="mt-1 mb-3 fw-bold page"><LoadingSpinner /></h1>}
                <Bar options={options} data={data} />
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
        </MDBTabsPane>
        <MDBTabsPane show={iconsActive === 'tab3'}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
  
};

export default LiveMonitory;
