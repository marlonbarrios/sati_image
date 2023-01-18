
import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Footer from "./Footer";

const {Configuration, OpenAIApi } = require ('openai');
const configuration = new Configuration({
    apiKey:process.env.REACT_APP_OPENAI_API_KEY
          });

const openai= new OpenAIApi(configuration)

class Text extends Component {
    constructor() {
  super();
    this.state = {
        heading: "OpenAI answers will appear here:",
        responset: "click on the button to generate ideas",
    }
}


onFormSubmit = (e) => {

    e.preventDefault();

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries());

   openai.createCompletion({
        model: "text-davinci-003",
       // prompt: `${formDataObj.ideaName}`,
         prompt: `Generate the  best  idea  and explain it in detail on how Open AI can be applied on innovative ways in the following field or to solve problems in that area:   ${formDataObj.ideaName}`,
        temperature: 0.8,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((Responset) => {
    this.setState( {
        heading: `AI Ideas about: ${formDataObj.ideaName}`,
        responset: `${Responset.data.choices[0].text}`,
    })
});
}

render() {
    return (
        <div>
            <Container>
                <h1>Generate Text About AI</h1>
                <br/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Write a prompt asking about the uses of AI  to solve very complex problems</Form.Label>

                        <Form.Control 
                        type="text" 
                        name="ideaName"
                        placeholder="Prompt" />

                        <Form.Text className="text-muted">
                           You can write an specific problem or a very complex problem that you want to solve using AI
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" size='lg' type="submit">
                     Consult to OpenAI
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
                       <p> {this.state.responset}</p>
                        
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
export default Text;
