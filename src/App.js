import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import art from "./art.json";
import "./App.css";


class App extends Component {
  state = {
    art,
    clickedart: [],
    score: 0
  };


  imageClick = event => {
    //the alt of the current target, which is the array of image names
    const currentart = event.target.alt;
    //the total number already clicked
    const artAlreadyClicked =
      this.state.clickedart.indexOf(currentart) > -1;


    if (artAlreadyClicked) {
      this.setState({
        art: this.state.art.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedart: [],
        score: 0
      });
        alert("Unfortunately you have chosen an image that you have already clicked. Therefore, you have lost the game. If you would like to try your hand at this challenge, go head.");


    } else {
      this.setState(
        {
          art: this.state.art.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          //add new image to art array
          clickedart: this.state.clickedart.concat(
            currentart
          ),
          score: this.state.score + 1
        },

        () => {
          if (this.state.score === 12) {
            alert("Congratulations, you have won the Click-Filet");
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