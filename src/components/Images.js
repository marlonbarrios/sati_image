
import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Footer from "./Footer";
const {Configuration, OpenAIApi } = require ('openai');





class Images extends Component {
    constructor() {
  super();
    this.state = {
        heading: "The image will appear here",
        response: "...creating image",
    }
}


onFormSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries());


const configuration = new Configuration({
 
    apiKey: process.env.REACT_APP_OPENAI_API_KEY

      });

const openai= new OpenAIApi(configuration)

openai.createImage({
    prompt: `${formDataObj.ideaName}`,
    n: 1,
    size: "1024x1024",
  }).then((response) => {
    this.setState( {
      heading: `${formDataObj.ideaName}`,
        response: `${response.data.data[0].url}`,
    })
});
}


render() {
    return (
        <div>
            <Container>
                <h1>Generate Images from Text</h1>
                <br/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Write a prompt with the characteristics of the image</Form.Label>

                        <Form.Control 
                        type="text" 
                        name="ideaName"
                        placeholder="Promt for image" />

                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" size='lg' type="submit">
                     OpenAI AI Generate Image
                    </Button>
                </Form>
                <br/>
                <br/>

                <Card>
                    <Card.Body>
                    <Card.Title><h4>{this.state.heading}</h4></Card.Title>
                    <hr/>
                    <br/>
                        <Card.Text>
                        <p><a href={this.state.response} target="_blank ">{this.state.response} </a></p>
                        <br/>
                            <img  width='300' src={this.state.response} alt =""/>

                        
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Footer />
            </Container>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
}


export default Images;
