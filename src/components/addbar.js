import React, { Component } from 'react';
// Class for the addbar that adds a new note when a title is submitted
// Modified from the youtube short assignment
// Discussed with Alex Beals

class AddBar extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }
  onInputChange(event) {
    this.setState({ title: event.target.value });
  }
  addNote(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.create(this.state.title);
    this.setState({ title: '' });
  }
  render() {
    return (
      <form id="add-bar" onSubmit={this.addNote}>
        <input placeholder="add note title here" onChange={this.onInputChange} value={this.state.title} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddBar;
