import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Form, Row, Col, Button, Container, Image } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import star from "./images/star.png";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={PostAuctionPage} />
            <Route path="/AuctionList" exact component={AuctionListPage} />
            <Route component={ErrorComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

class PostAuctionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      picture: "",
    };
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      var temp = { file: file, imagePreviewUrl: reader.result };
      this.setState({
        picture: temp.imagePreviewUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  componentDidMount() {}

  handleFormSubmit = async (event) => {
    event.preventDefault();

    var user = this.state;

    axios
      .post(`/auction`, this.state)
      .then((response) => {
        console.log("fuck up");
        console.log(response);
        console.log(response.data);
        this.props.history.push("./AuctionList");
      })
      .catch((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  render() {
    return (
      <>
        <div
          className="d-flex flex-row justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "" }}
        >
          <div>
            <Container
              className="p-5"
              style={{
                borderRadius: "15px",
                boxShadow: "6px 0px 19px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Form>
                <Form.Group
                  controlId="title"
                  onChange={(event) => this.myChangeHandler(event)}
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group
                      controlId="startDate"
                      onChange={(event) => this.myChangeHandler(event)}
                    >
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="startTime"
                      onChange={(event) => this.myChangeHandler(event)}
                    >
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group
                      controlId="endDate"
                      onChange={(event) => this.myChangeHandler(event)}
                    >
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="endTime"
                      onChange={(event) => this.myChangeHandler(event)}
                    >
                      <Form.Label>End Time</Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.File
                  className="mt-4"
                  id="pictureFile"
                  label=""
                  onChange={this.handleImageChange}
                  custom
                />

                <Button
                  variant="primary"
                  className="my-4 float-right"
                  onClick={this.handleFormSubmit}
                >
                  Post Auction
                </Button>
              </Form>
              <Link to="/AuctionList">
                <Button variant="dark" className="btn-block">
                  View Auctions {">>"}{" "}
                </Button>
              </Link>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

class AuctionListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auctions: [
        {
          picture:
            "https://cdn.pixabay.com/photo/2021/01/05/07/02/torii-5889982__340.jpg",
          title: "2GB 1TB Hard Disk",
          startDate: "Jan 29, 2021",
          startTime: "08:00 AM",
          endDate: "Jan 31, 2021",
          endTime: "11:00 AM",
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get("https://damp-brushlands-44346.herokuapp.com/auction")
      .then((response) => {
        this.setState({ auctions: response.data });
      });
  }

  render() {
    return (
      <>
        <div
          className=""
          style={{
            background: "#F3F1F1",
            fontFamily: "Roboto",
            color: "#000000",
            backgroundAttachment: "fixed",
            minWidth: "360px",
          }}
        >
          <div style={{ backgroundColor: "#FEFEFE", height: "3vh" }}></div>
          <div style={{ backgroundColor: "#F9F6F6", height: "5vh" }}></div>

          <Link to="/">
            <Button variant="dark" className="float-left ml-5">
              {"<<"} Add Auctions{" "}
            </Button>
          </Link>
          <Container className="">
            <p
              className="text-center fw-normal ml-5 mt-3"
              style={{ fontSize: "15px" }}
            >
              <Image className="mr-1" src={star} />
              Auctions
            </p>
            <Row xs={1} md={2} className="">
              {this.state.auctions.map((auction) => (
                <Col key={auction._id}>
                  <ItemComponent
                    picture={auction.picture}
                    title={auction.title}
                    startDate={auction.startDate}
                    startTime={auction.startTime}
                    endDate={auction.endDate}
                    endTime={auction.endTime}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

class ItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: this.props.picture,
      // timeLeft : "Auction Closed",
      title: this.props.title,
      startDate: moment(this.props.startDate).format("LL"),
      startTime: moment(this.props.startTime, "hh:mm:ss").format("LT"),
      endDate: moment(this.props.endDate).format("LL"),
      endTime: moment(this.props.endTime, "hh:mm:ss").format("LT"),
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  async componentDidMount() {
    var thenDate = moment(this.props.startDate).format("DD/MM/YYYY");
    var theTime = moment(this.props.startTime, "hh:mm:ss").format("HH:mm:ss");
    var then = thenDate + " " + theTime;

    var now = moment().format("DD/MM/YYYY HH:mm:ss");
    var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(
      moment(then, "DD/MM/YYYY HH:mm:ss")
    );
    ms = ms * -1;
    // console.log(ms);
    if (ms > 0) {
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
      // console.log(s);
      var sArray = s.split(":");
      // console.log(sArray);
      // this.setState({timeLeft: sArray[0]+"Hrs: "+sArray[1]+"Min: "+sArray[2]+"secs left "})
      await this.setState({
        hours: parseInt(sArray[0]),
        minutes: parseInt(sArray[1]),
        seconds: parseInt(sArray[2]),
      });
      // console.log(this.state);
    }
  }

  render() {
    // {console.log(this.state.hours)};
    return (
      <>
        <div
          className="m-4 py-3 px-4 "
          style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
        >
          <Row>
            <Col
              xs={{ span: "6", order: "last" }}
              md={{ span: "6", order: "first" }}
              className="d-flex flex-column"
              style={{ backgroundColor: "", fontSize: "12px" }}
            >
              <Image
                src={this.state.picture}
                className="mx-2"
                style={{ borderRadius: "20px", width: "80px", height: "80px" }}
                fluid
              />
              <p className="fw-bolder m-0 mt-2">
                <Timer
                  hours={this.state.hours}
                  minutes={this.state.minutes}
                  seconds={this.state.seconds}
                />
              </p>
            </Col>
            <Col
              className="fw-normal d-flex justify-content-center align-items-center py-1"
              style={{ backgroundColor: "", fontSize: "10px" }}
            >
              <div className="text-end">
                <div>
                  <p>Title: {this.state.title}</p>
                </div>
                <div className="">
                  <p className="m-0">Start Time: {this.state.startDate}</p>
                  <p className="">{this.state.startTime}</p>
                </div>
                <div className="">
                  <p className="m-0">End Time: {this.state.endDate} </p>
                  <p className="m-0">{this.state.endTime}</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: props.hours,
      minutes: props.minutes,
      seconds: props.seconds,
      start: true,
    };
  }

  async componentDidMount() {
    if (this.state.start) {
      if (
        this.state.seconds === 0 &&
        this.state.minutes === 0 &&
        this.state.hours === 0
      ) {
        await this.setState({ start: false });
      } else if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          setTimeout(() => {
            this.setState({
              seconds: 59,
              minutes: 59,
              hours: this.state.hours - 1,
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
          }, 1000);
        }
      } else {
        setTimeout(() => {
          this.setState({ seconds: this.state.seconds - 1 });
        }, 1000);
      }
    }
  }

  render() {
    return (
      <>
        <div>
          {this.state.start && (
            <p>
              {this.state.hours} Hrs: {this.state.minutes} Min:{" "}
              {this.state.seconds} secs left
            </p>
          )}
          {!this.state.start && <p>Auction Closed</p>}
        </div>
      </>
    );
  }
}

function ErrorComponent() {
  return <div>Contact Support</div>;
}
