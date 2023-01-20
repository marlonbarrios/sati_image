
import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const {Configuration, OpenAIApi } = require ('openai');


class Images extends Component {
    constructor() {
  super();
    this.state = {
        heading: "The image will appear here",
        response: "...creating image...",
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
    prompt: `bauhaus style image background design textiles architecture objects 2D 3D shapes colors art sets ${formDataObj.ideaName}`,
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
            
                <h1 style={{
    color: "white",
    fontFamily: "Helvetica",
    fontSize: "60px",
    textShadow: "2px 5px 4px #000000",
    marginTop: "20px",
  }}>INFINITE BAUHAUS</h1>
                <br/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{
    color: "white",
    fontFamily: "Helvetica",
    fontSize: "20px",
    textShadow: "2px 5px 4px #000000",
  
  }} >Generate images based on what OpenAI 'thinks' is Bauhaus style. You may add some prompt words such as colors or any other compositional feature...</Form.Label> 

                        <Form.Control 
                        type="text" 
                        name="ideaName"
                        placeholder="Prompt to tweak the AI style" />

                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" size='lg' type="submit" style={{  textShadow: "2px 5px 4px #000000",
                boxShadow:    "2px 5px 4px #000000"   }}>
                     Generate OpenAI Bauhaus Image
                    </Button>
                </Form>
                <br/>
                <br/>

                <Card>
                    <Card.Body>
                    <Card.Title><h4>Bauhaus style + {this.state.heading}</h4></Card.Title>
                    <hr/>
                    <br/>
                        <Card.Text>
                        <a href={this.state.response} target="_blank ">{this.state.response} </a>
                        <br/>
                            <img  width='300' src={this.state.response} alt =""/>

                        </Card.Text>
                    </Card.Body>
                </Card>
               
            </Container>
           
            <br/>
            <br/>
            <br/>
            </div>
    );
}
}


export default Images;
