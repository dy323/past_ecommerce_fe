import React from "react";
import { Container, Button } from "react-bootstrap";
import "../styles/error404.scss";
import errorImage from "../assets/images/components/404-error-web.jpg";
import { useNavigate } from "react-router-dom";

export default function Unavailable() {
  const navigate = useNavigate();
  const backToHome = () => navigate('/');

  return (
    <div>
      <Container className="home-cover" fluid>
        <div className="error404">
          <div className="error404-content">
            <img alt="error" src={errorImage} />
            <h3>The Page Cannot Be Found</h3>
            <p>Looks like the page you are trying to visit doesn't exists.</p>
            <p>Please check the URL and try again</p>
            <Button onClick={backToHome} className="error404-button">
              Back to home page
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
