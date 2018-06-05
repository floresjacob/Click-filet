//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import art from "./art.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    art,
    clickedart: [],
    score: 0
  };

//when you click on a card ... the art is taken out of the array
  imageClick = event => {
    const currentart = event.target.alt;
    const artAlreadyClicked =
      this.state.clickedart.indexOf(currentart) > -1;

//if you click on a art that has already been selected, the game is reset and cards reordered
    if (artAlreadyClicked) {
      this.setState({
        art: this.state.art.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedart: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available art, your score is increased and cards reordered
    } else {
      this.setState(
        {
          art: this.state.art.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedart: this.state.clickedart.concat(
            currentart
          ),
          score: this.state.score + 1
        },
//if you get all 12 art corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              art: this.state.art.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedart: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.art.map(art => (
            <FriendCard
              imageClick={this.imageClick}
              id={art.id}
              key={art.id}
              image={art.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;