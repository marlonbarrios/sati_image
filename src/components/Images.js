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
            generatedText: "Text and image will appear here in seconds...",
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

        openai.createCompletion({
            model: "text-davinci-003",
            prompt:  `Create a prompt as a teaching poem  and allways start expressing that This poem is a gift for you: use BUDDHIST TEACHINGS; you may use  Pali, translate to english,  max 200  words, USE Prose format and  use  any of the following words: Anicca, Dukkha, Anatta, Impermanence, Suffering, Non-self,`,
            
            temperature: 0.2,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }).then((response) => {
            this.setState({
                generatedText: `${response.data.choices[0].text}`,
                isLoading: false,
            }, () => {   openai.createImage({
                prompt: `black and white, minimalist, pure light, abstract, white background ${response.data.choices[0].text}`,
                n: 1,
                size: size === "large" ? "1024x1024" : size === "medium" ? "512x512" : "256x256",
            }).then((response) => {
                this.setState({
                    heading: ` ${formDataObj.ideaName}`,
                    response: `${response.data.data[0].url}`,
                    isLoading: false
              
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
          
            <Container style={ {
            backgroundImage: `url(${this.state.response})`, 
            backgroundRepeat: "repeat", 
            backgroundSize: "cover", 
            backgroundPosition: "center"}}>
               
    <h2 style={{
    color: "#ded5d5",
    fontFamily: "Helvetica",
    fontSize: "40px",
    textShadow: "2px 5px 4px #000000",
    textAlign: "center",
    marginBottom: "30px",
    marginTop: "20px",
    borderRadius: "10px",

  }}>SATI: Remember This </h2>
                {/* <img src="molecules.png" alt="logo" style={{ width: "200px", height: "80px", margin: "auto", marginTop: "5px", display: "block" }} /> */}
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

<p>Remeber This. Named after the Buddhist term for 'mindfulness' or 'remembering', Sati is an application powered by AI. It combines advanced text and image generation technologies to help users recall and reflect upon the Three Marks of Existence in Buddhist philosophy: Anicca (Impermanence), Dukkha (Suffering), and Anatta (Non-self). The app creates vivid AI-generated visuals paired with enlightening narratives to symbolize these profound truths, encouraging contemplation and internalization. Interestingly, both the image and text presented by Sati are ephemeral, mirroring the teaching of Anicca and reinforcing the impermanent nature of all phenomena. This unique feature enhances mindful engagement, making the exploration of ancient Buddhist wisdom a dynamic aesthetic experience in the AI age.</p>
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
                  Remember
                    </Button>
                    {/* <Form.Control style={{
                boxShadow:    "2px 5px 4px #000000",
                textAlign: "center",
                margin: "15px"
                }}
                        type="text" 
                        name="ideaName"
                        placeholder="you may or not... input an artist name here...made-up, dead or alive" ></Form.Control>
                        <Form.Text className="text-muted">
                        </Form.Text> */}
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
    {this.state.isLoading ? <ClipLoader /> :<p>{this.state.generatedText}</p>}
    <Card.Text>

        {/* <p>{this.state.heading} </p> */}

        {this.state.isLoading ? <ClipLoader /> :  <a style={{margin: "auto" , width:'300'}} download="artaifact" rel="noreferrer" href={this.state.response} target="_blank">
        <img style={{width: "90%"}} src={this.state.response} alt=''/>
    </a>}

    </Card.Text>

    </Card.Text>
   
  </Card.Body> 
                </Card>
            </Container>
            </div>
    );
}
}
export default Images;



