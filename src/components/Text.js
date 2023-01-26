import React from "react";
import { Component } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ClipLoader } from "react-spinners";
import { OpenAIApi, Configuration } from "openai";

class Images extends Component {
    constructor() {
        super();
        this.state = {
            heading: "The text will appear here",
            response: "...creating text...",
            size: "large",
            generatedText: "The generated text will appear here",
            isLoading: false
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
      

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY
        });

        const openai = new OpenAIApi(configuration);

        // let size = this.state.size;

              openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Characteristics  of Rothko's paintings include: ${formDataObj.ideaName}`,
                temperature: 0.7,
                max_tokens: 256,
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
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    render() {
     
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
  
  }} >Generate text about in Mark Rothko (1903 – 1970) painting style. The generated image will appear bellow and will become the background of sections of this app.  You may download the generated image. You may select the size and add some prompt words such as colors or any other compositional features.</Form.Label> 
                        <br/>
<Form.Group style={{
    display: "flex",
    justifyContent: "center",
    // boxShadow: "2px 5px 4px #000000"
}} controlId="formSize">
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
       
        <br/>
 
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
