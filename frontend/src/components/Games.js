import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./game.css";

class Games extends Component {
    state = {
        games: []
    }

    componentDidMount() {
        fetch("http://localhost:9292/games")
            .then(res => res.json())
            .then((games) => this.setState({ games }))
    }

    handleOnDelete = (id) => {
        fetch(`http://localhost:9292/games/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        //fetch("http://localhost:9292/games")
        //   .then(res => res.json())
          .then(() => {
            this.setState({
                games: this.state.games.filter((game) =>{
                    return game.id !== id
                })
            })
          })
      };

    renderGames = () => {
        console.log(this.state.games)
        return this.state.games.map(game => {
            return (
                <div key={`game-${game.id}`}>
                    <img className ="game_image"src ={game.image_url} alt=""/>
                    <h1>{game.name} <button onClick={() => this.handleOnDelete(game.id)}>x</button></h1>
                    <p>Console: {game.console}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <><Link to="/games/new">New Game</Link><ul>{this.renderGames()}</ul></>
        )
    }
}

export default Games;
