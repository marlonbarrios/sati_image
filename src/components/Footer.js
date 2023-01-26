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
            <Card.Title>infinite rothko</Card.Title>
            <Card.Text>
                <p>Concept and programming by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/marlon-barrios-solano-98599b205/">Marlon Barrios Solano</a></p>
                <p>Powered by <a target="_blank" rel="noreferrer" href=" https://beta.openai.com/overview">OpenAI</a></p>
                <p>Inspired by <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Mark_Rothko">Mark Rothko</a> paintings</p>
                <p>Copyright &copy; 2022</p>
            </Card.Text>
        </Card.Body>
    </Card>
</Container>
        </div>
        );
    }
    }

export default Footer;

