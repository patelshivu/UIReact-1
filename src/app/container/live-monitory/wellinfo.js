import React from "react";
// import { CommonButton, CommonDropDown } from "../../components/common";
// import LiveMonitoryTable from "../../components/live-monitory/monitiry-table";
// import DefaultImg from "../../assets/images/default-150x150.png";
// import DefaultImg1 from "../../assets/images/default-150x160.png";
// import Chart from "react-apexcharts";
import "./style.css";

import { Link } from "react-router-dom";
// import 'chartjs-plugin-annotation';

function Wellinfo() {
    return (
        <React.Fragment>
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

        </React.Fragment>
    );


}

export default Wellinfo;
