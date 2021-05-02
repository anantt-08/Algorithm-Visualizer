import React, { useState, useEffect } from "react";

import Spinner from "./spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Home.css";
import "./boom.css";

import vid from "./vid/video.mp4";
const Home = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1500);
  }, []);
  return (
    <>
      {show ? (
        <Spinner />
      ) : (
        <div className="mainsection">
          <video autoPlay muted loop id="myVideo">
            <source src={vid} type="video/mp4" />
          </video>
          <h1 id="#yoo">ALGORITHM VISUALIZER</h1>
          <p id="#hmm">
            <i>Pathfinder Visualizer & Sorting Visualizer</i>
          </p>
          <div className="Home1">
            <Link to="/sort">
              <div className="sortingtwo">
                <Card style={{ width: "430px", height: "320px" }}>
                  <Card.Img
                    variant="top"
                    style={{ width: "430px", height: "250px" }}
                    src="https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_600,h_338/https://therohanbhatia.com/wp-content/uploads/2020/08/Sorting-Visualizer.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="textt">
                      <span> SORTING VISUALIZER</span>
                      <span className="righht">-> Jayant Gangwani</span>
                    </Card.Title>
                    <Card.Text></Card.Text>

                    {/* <Button variant="primary">Go to Sorting Visualizer</Button> */}
                  </Card.Body>
                </Card>
              </div>
            </Link>
            <Link to="/path">
              <div className="sorting">
                <Card style={{ width: "430px", height: "320px" }}>
                  <Card.Img
                    variant="top"
                    style={{ width: "430px", height: "250px" }}
                    src="https://miro.medium.com/max/446/1*X0JmdE2g25qt0nRvnztbQw.png"
                  />
                  <Card.Body>
                    <Card.Title className="textt">
                      <span>PATHFINDING VISUALIZER</span>
                      <span className="righht">-> Anant Gupta</span>
                    </Card.Title>
                    <Card.Text></Card.Text>
                    {/* <Button variant="primary">Go to Pathfinding Visualizer</Button> */}
                  </Card.Body>
                </Card>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
