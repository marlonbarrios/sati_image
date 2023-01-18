import React from "react";
import { Component } from "react";

import { Container, Card } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
        <div>
            <Container>
            <Card>
              
                <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                   <p>OpenAI R&D by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/marlon-barrios-solano-98599b205/">Marlon Barrios Solano</a></p>
                </Card.Text>
                </Card.Body>
            </Card>
            </Container>
        </div>
        );
    }
    }

export default Footer;

