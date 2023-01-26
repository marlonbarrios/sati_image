import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClipLoader } from "react-spinners";
const { Configuration, OpenAIApi } = require('openai');

class Images extends Component {
    constructor() {
        super();
        this.state = {
            heading: "The image will appear here",
            response: "...creating image...",
            size: "large",
            generatedText: "The generated text will appear here",
            isLoading: false
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY
        });

        const openai = new OpenAIApi(configuration);

        this.setState({ isLoading: true });
        let size = this.state.size;

        this.setState({ isLoading: true });

        openai.createImage({
            prompt: `rothko art style image background  performances films murals art  ${formDataObj.ideaName}`,
            n: 1,
            size: size === "large" ? "1024x1024" : size === "medium" ? "512x512" : "256x256",
        }).then((response) => {
            this.setState({
                heading: `${formDataObj.ideaName}`,
                response: `${response.data.data[0].url}`,
                isLoading: false
            }, () => {
              openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Include Marks Rothko's relevant biography, art style,art pieces and a quote about his art from  the artistt, criticss , art historians or art lovers. ",
                temperature: 0.7,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
              }).then((response) => {
                this.setState({
                    generatedText: `${response.data.choices[0].text}`,
                    isLoading: false,
                }).catch((error) => {
                    console.log(error);
                });
                });
            });
        }).catch((error) => {
            console.log(error);
        });
    }

 
    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

render() {
    const sizeOptions = ['large', 'medium', 'small'];
    return (
        <div style={{
           
            backgroundImage: `url(${this.state.response})`, backgroundRepeat: "repeat", marginTop: "10px" 
        }}>
            <Container  >
          
            
                <h2 style={{
    color: "white",
    fontFamily: "Helvetica",
    fontSize: "60px",
    textShadow: "2px 5px 4px #000000",
    textAlign: "center",
    margin: "auto",
    paddingTop: "15px",
   
    
  }}>infinite rothko</h2>
                <br/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{
                        
    color: "white",
    fontFamily: "Helvetica",
    fontSize: "18px",
    textShadow: "2px 1px 4px #000000",
  
  }} >Generate images in Mark Rothko (1903 – 1970) painting style. The generated image will appear bellow and will become the background of sections of this app.  You may download the generated image. You may select the size and add some prompt words such as colors or any other compositional features.</Form.Label> 
                        <br/>
<Form.Group style={{
    display: "flex",
    justifyContent: "center",
    // boxShadow: "2px 5px 4px #000000"
}} controlId="formSize">
    <Form.Control style={{ width: 100, textAlign: "center",   paddingTop: "8px",}} as="select" onChange={this.handleSizeChange}>
        {sizeOptions.map((option, index) => (
            <option key={index}>{option}</option>
        ))}
    </Form.Control>
</Form.Group>
 <Button variant="primary" size='lg' type="submit" style={{  textShadow: "2px 5px 4px #000000",
                boxShadow:    "2px 5px 4px #000000" ,   marginTop: "10px", backgroundColor: 'grey', borderColor: 'white'   }}>
                     Generate OpenAI Mark Rothko Image
                    </Button>
                    <Form.Control style={{
                boxShadow:    "2px 5px 4px #000000",
                textAlign: "center",
                margin: "15px"
                }}
                        type="text" 
                        name="ideaName"
                        placeholder="Prompt to tweak the AI style" ></Form.Control>

                        
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>
                  
                </Form>
                <br/>
                <br/>
                <Card  >
                <Card.Body>
    <Card.Title><h4> {this.state.heading}</h4></Card.Title>
 
    <hr/>
    <br/>
    <Card.Text>

        <p>This is your image in Mark Rothko style + {this.state.heading} </p>
        {this.state.isLoading ? <ClipLoader /> :    <a style={{margin: "auto" , width:'300'}} download="bauhaus-image" rel="noreferrer" href={this.state.response} target="_blank">
        <img style={{width: "60%"}} src={this.state.response} alt=''/>
    </a>}
  <p>{this.state.generatedText}</p>
  
        <br/>
       
       
    </Card.Text>
  </Card.Body>
                
                </Card>
               
            </Container>
        
            </div>
    );
}
}

export default Images;
