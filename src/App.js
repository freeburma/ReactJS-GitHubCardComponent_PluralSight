import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';


const Card = (props) => 
{
    return(
      <div style={{margin: '1em', background:'#eeeeee', height:'75px'}}>
        <div style={{background:'#ff0000', width:'75px', height:'75px', float:'left'}}>
          <img width="75px" src={props.avatar_url} />
        </div>
        <div style={{display: 'inline-block', marginLeft: 10}}>
          <div style={{fontSize: '1.25em', fontWeigt: 'bold'}}> {props.name}</div>
          <div> {props.company} </div>
        </div>

      </div>
    ); 
}// end Card ()



// Card List to hold Card 
const CardList = (props) => 
{
  // Using the unique key from GitHub api to eliminate the error and 
  return (
          <div> 
            {props.cards.map(card => <Card key={card.id} {...card} />)}
          </div>
  ); 

}// end CardList()

const OriginalLayout = () => 
{
    
    return (
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
              </div>
              <p className="App-intro">
                Build a GitHub Card Component With Samer Buna from PluralSight Course. 
                The course is using jsComplete playground. This project can be coded with your 
                local computer. 

              </p>

              <p> 
                I was using VisualStudio Code and NodeJS from command line. 
              </p>


              <p> To test GitHub user names: jordwalke, zpao, spicyj </p>
              
            </div>
          ); 
}


// Creating a user form 
class Form extends Component 
{
  state = {userName : ''};

  handleSubmit = (event) => {
    event.preventDefault(); // Allows to remember the last code we wrote. 
    // console.log('Event: Form submit >> ', this.state.userName); 

    // Setting the AJax library 
   
    axios.get(`https://api.github.com/users/${this.state.userName}`)
         .then(resp => {
           this.props.onSubmit(resp.data); 
           console.log(resp.data); 
         }); 
          
  }; 

  render()
  {
    return (
            <form onSubmit={this.handleSubmit} > 
              <input type="text" placeholder="GitHub User Name"  
                value={this.state.userName}  
                onChange={(event) => this.setState({userName: event.target.value})} 
                required />
              <button type="submit"> Add Card </button>
            </form>

    ); 
  }// end render()
}// end Form class

class App extends Component 
{
  /*
    // Test data
    // Creating array of users 
  state = {
       cards : [
              {
                avator_url: "https:avatars.githubusercontent.com/u/8445?v4",
                name:"Paul O'Shannessy", 
                company: "Facebook"
              },
              {
                avator_url: "https:avatars.githubusercontent.com/u/6820?v4",
                name:"Ben Alvert", 
                company: "Facebook"
              },

           ]// end array obj 

    };// end state component
  */

  // Creating array of users 
  state = {
       cards : []// end array obj 

    };// end state component

    addNewCard = (cardInfo) => {
        // Adding the new card to the list 
        this.setState(prevState => ({
          cards: prevState.cards.concat(cardInfo)
        }));
    }; // end addNewCard ()

    render() 
    {
        return (         
                <div>
                  <OriginalLayout />
                  <Form onSubmit={this.addNewCard} />
                  <CardList cards={this.state.cards} />

                </div>
        );// end return()

    }// end render()
}// end class 

export default App;
