import React, { Component } from "react";

class NewGameForm extends Component {
  state = {
    name: "",
    console_id: null,
    consoles: [],
    image_url: "",
  };

  componentDidMount() {
    fetch("http://localhost:9292/consoles")
      .then((res) => res.json())
      .then((consoles) => this.setState({ consoles }));
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({name: this.state.name, console_id: this.state.console_id, image_url: this.state.image_url}),
    };
    fetch("http://localhost:9292/games", config)
      .then(res => res.json())
      .then(data => this.props.history.push("/games"))
  };

  renderConsoles = () => {
    return this.state.consoles.map((console) => {
      return <option value={console.id}>{console.name}</option>;
    });
  };

  render() {
    return (
      <form action="" onSubmit={this.handleOnSubmit}>
        <input
          onChange={this.handleOnChange}
          type="text"
          name="name"
          value={this.props.name}
          id="text"
        />
        <select onChange={this.handleOnChange} name="console_id" id="">
          {this.renderConsoles()}
        </select>
        <input
          onChange={this.handleOnChange}
          type="text"
          name="image_url"
          value={this.props.image_url}
          id="text"
        />
        <button>Submit</button>
      </form>
    );
  }
}
export default NewGameForm;
