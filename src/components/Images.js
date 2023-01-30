//created as R&D for AIDA project


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
            generatedText: "The generated text will appear here in seconds after you click...",
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
            prompt: `${formDataObj.ideaName}  art style image works background performances films music murals sculpture architecture ideas drawings sculptures paintings  photography dances 2d 3d realist or surreal`,
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
                prompt: `Generate a text in first person about ${formDataObj.ideaName} with the following topics: My name is... and Name of generated piece based in his naming style; create your own name 2.-Relevant biography, dates, art style, most famous work pieces.
                3.-Real quotes about ${formDataObj.ideaName} art from  the artist, critics , art historians,  art lovers. 4.-Generate  5 keywords about ${formDataObj.ideaName}  pieces. Separate the keywords with a comma. Write the text sepated by topics named: This new piece is called , write the bio without tittling it, it has been writen and said about my workeven if they are not possitive (for the quotes). Write in first person as if you were the artist's voice. If the artist is still alive, write in first person as if you were the artist and reveal that you are still alive. Include polemic... invent a name if you dont know, have fun. Are you alive, are you dead?`,
                temperature: 0.7,
                max_tokens: 700,
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
        <div >
          
            <Container  >
               
    <h2 style={{
    color: "#ded5d5",
    fontFamily: "Helvetica",
    fontSize: "40px",
    textShadow: "2px 5px 4px #000000",
    textAlign: "center",
    marginBottom: "30px",
    marginTop: "20px",
    borderRadius: "10px",
    backgroundImage: `url(${this.state.response})`, backgroundRepeat: "repeat", backgroundSize: "cover", backgroundPosition: "center"
  }}>art_AI_fact</h2>
                <img src="molecules.png" alt="logo" style={{ width: "200px", height: "80px", margin: "auto", marginTop: "5px", display: "block" }} />
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{
    color: "#454343",
    fontFamily: "Helvetica",
    fontSize: "18px",
    borderRadius: "10px",
    marginTop: "35px",
    textShadow: '1px 2px 2px white, 0 2px 1em white, 0 0 0.2em white',
    backgroundImage: `url(${this.state.response})`, backgroundRepeat: "repeat", backgroundSize: "cover", backgroundPosition: "center"
  }} >
    <p>art_AI_fact allows you to generate synthetic 'artists’, their work and trajectory. Input a name of a real well known artist dead or alive and art_AI_fact will extend their work, legacy and 'voice' with a new ‘synthetic’ work and text deployed in 1st person as an augmented artist bio. If you leave the input box empty, a totally ’synth’ artist will be generated: an artist that never existed: an art_AI_fact.</p>
  <br/>
 </Form.Label>
<Form.Group style={{
    display: "flex",
    justifyContent: "center",
    // boxShadow: "2px 5px 4px #000000"
}} controlId="formSize">
    <Form.Control style={{ width: 100, textAlign: "center", paddingTop: "8px",}} as="select" onChange={this.handleSizeChange}>
        {sizeOptions.map((option, index) => (
            <option key={index}>{option}</option>
        ))}
    </Form.Control>
</Form.Group>
 <Button variant="primary" size='lg' type="submit" style={{  textShadow: "2px 5px 4px #000000",
                boxShadow:    "2px 5px 4px #000000" ,   marginTop: "5px", backgroundColor: 'grey', borderColor: 'white'   }}>
                     generate art_AI_fact
                    </Button>
                    <Form.Control style={{
                boxShadow:    "2px 5px 4px #000000",
                textAlign: "center",
                margin: "15px"
                }}
                        type="text" 
                        name="ideaName"
                        placeholder="you may or not... input an artist name here...made-up, dead or alive" ></Form.Control>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                </Form>
                <br/>
                <br/>
                <Card  >
                <Card.Body>
    {/* <Card.Title><h4> {this.state.heading}</h4></Card.Title> */}
    <hr/>
    <br/>
    <Card.Text>
        <p>{this.state.heading} </p>
        {this.state.isLoading ? <ClipLoader /> :  <a style={{margin: "auto" , width:'300'}} download="artaifact" rel="noreferrer" href={this.state.response} target="_blank">
        <img style={{width: "98%"}} src={this.state.response} alt=''/>
    </a>}

  


    </Card.Text>
    <Card.Text>
    {this.state.isLoading ? <ClipLoader /> :<p>{this.state.generatedText}</p>}
    </Card.Text>
  </Card.Body> 
                </Card>
            </Container>
            </div>
    );
}
}
export default Images;



