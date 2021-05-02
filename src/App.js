import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="container">
            <div className="py-3 mr-1 row">
                <div className="col-6">
                    <h2>Planning Board</h2>

                </div>
                <div className="col-5"></div>
                <div className="col-1">
                    <span >
                        <img _ngcontent-weu-c112="" src="https://icon-library.net/images/profiles-icon/profiles-icon-0.jpg" width="43%" alt="Header Avatar" class="rounded-circle header-profile-user" />
                    </span>
                </div>

                <hr />
            </div>
            <div className="row">
                <h5><u className="text-muted unline"><span className="text-dark"> Orders</span></u></h5>
            </div>
            <div className="row pt-5">
                
                <div id="demo" className="carousel slide" data-ride="carousel">

                    <div className="container carousel-inner no-padding">
                        <div className="carousel-item active">
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-danger text-white border border-danger py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-secondary text-white border border-secondary py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-success text-white border border-success py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-primary text-white border border-primary py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-info text-white border border-info py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-warning text-white border border-warning py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-danger text-white border border-danger py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3">
                                <div className="card bg-secondary text-white border border-secondary py-3 px-5 my-col ">
                                    <h6 className="font-weight-400"> <span className="mr-5 size">Order ID</span> : 10001</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">P.N</span> : Jockey Value</h6>
                                    <h6 className="font-weight-400"><span className="mr-5 size">Quantity</span> : 10000 </h6>
                                </div>
                            </div>
                        </div>

                    </div>

                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
            <div className="pt-5">
                <h5><u className="text-muted"><span className="text-dark">Prodlines By Orders</span></u></h5>
            </div>
            <div className="row py-2 mx-2 text-center">
                <div className="col-1 pt-2 border border-dark">
                    <h6>Country</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Jan</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Feb</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>March</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>April</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>May</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>June</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>July</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Aug</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Sep</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Oct</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6 >Nov</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark test">
                            <h6>Dec</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2 mx-2">
                <div className="col-1 border">
                    <h6>India</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 border height bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row py-2 mx-2">
                <div className="col-1 border">
                    <h6>Srilanka</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 border height bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                        <div className="col-1 border  bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row py-2 mx-2">
                <div className="col-1 border">
                    <h6>China</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 border height bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="pt-5">
                <h5><u className="text-muted unline"><span className="text-dark"> By Selected Order</span></u></h5>
            </div>
            <div className="row py-2 mx-2 text-center">
                <div className="col-1 pt-2 border border-dark">
                    <h6>Place</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Jan</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Feb</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>March</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>April</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>May</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>June</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>July</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Aug</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Sep</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6>Oct</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark">
                            <h6 >Nov</h6>
                        </div>
                        <div className="col-1 pt-2 border border-dark test">
                            <h6>Dec</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2 mx-2 text-center">
                <div className="col-1 border align-middle">
                    <h6>Chennai</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 border height  bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row py-2 mx-2">
                <div className="col-1 border">
                    <h6>Bangalore</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 height border  bg-primary text-white" >
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                        <div className="col-1 border  bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row py-3 mx-2">
                <div className="col-1 border">
                    <h6>Mumbai</h6>
                </div>
                <div className="col-11">
                    <div className="row ">
                        <div className="col-1 border height bg-danger text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-dark text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-warning text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-secondary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-info text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-primary text-white">
                            <h6></h6>
                        </div>
                        <div className="col-1 border  bg-success text-white">
                            <h6></h6>
                        </div>

                    </div>
                </div>
            </div>
            <hr />
        </div>

    );
}

export default App;
