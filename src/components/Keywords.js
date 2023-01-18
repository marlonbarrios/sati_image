
import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Footer from "./Footer";

const {Configuration, OpenAIApi} = require ('openai');



class Keywords extends Component {
    constructor() {
  super();
    this.state = {
        heading: "OpenAI answer will appear here:",
        response: "click on the button to generate ideas",
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


openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Extract keywords from this text: ${formDataObj.ideaName}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.0,
  }).then((Response) => {
    this.setState( {
        heading: `Keywords from: ${formDataObj.ideaName}`,
        response: `${Response.data.choices[0].text}`,
    })
});
}




render() {
    return (
        <div>
            <Container>
                <h1>Generate Keywords from text</h1>
                <br/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Write or paste a text to extract keywords</Form.Label>

                        <Form.Control 
                        type="text" 
                        name="ideaName"
                        placeholder="Prompt" />

                        <Form.Text className="text-muted">
                        from text to keywords
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" size='lg' type="submit">
                    Extract Keywords
                    </Button>
                </Form>
                <br/>
                <br/>

                <Card>
                    <Card.Body>
                    <Card.Title><h4>Keywords</h4></Card.Title>
                    <hr/>
                    <br/>
                        <Card.Text>
                           
                        
                       <p> {this.state.response}</p>
                        
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Footer/>
            </Container>
            <br/>
            <br/>
            <br/>
        </div>
    );
}
}


export default Keywords;
