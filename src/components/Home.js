import React from "react";
import { Component } from "react";
import Display from "./Display";
import { Col, Row, Container } from "react-bootstrap";
import Footer from "./Footer";

class Home extends Component {
    render() {
        return (
            <div>
                <Container>

                <h1>Exploring OpenAI</h1>
                <p>Start by playing  with any of the use-cases below to Generate AI Content</p>
                <p>Input a problem to generate a paragraph ot text with an AI solution</p>
                <p>Extract Keywords</p>
                <p>Generate Images based on those keywords</p>
              <br/>
              <br/>
                <Row>
                <Col>
                <Display
                header="Creating Text"
                title="Generate Text"
                text="Start generating text using AI for your campaigns"
                theLink="/Text" />
                </Col> 
                <Col>
                <Display
                header="Keywords"
                title="Generate Keywords from a text"
                text="Generate keywords using AI"
                theLink="/Keywords" />
                </Col>

                <Col>
                <Display 
                header="Text to Image Generation"
                title="Generate Images"
                text="Generate images using AI"
                theLink="/Images" />
                </Col>
            
                </Row>
        <Footer/>
            </Container>
            </div>
        );
    }
}

export default Home;
