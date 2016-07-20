import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import AddBar from './addbar';
// Discussed with Alex Beals
// App component that holds the map of notes and passes down props to render
// them
class App extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      notes: Immutable.Map({
        0: {
          title: 'Title',
          text: '### __Put your text here!__',
          x: 0,
          y: 0,
          zIndex: 0,
        },
        1: {
          title: 'Welcome to your note board!',
          text: '![](https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif)',
          x: 80,
          y: 60,
          zIndex: 1,
        },
      }),
      id: 2,
    };
  }

  createNote(title) {
    // Create a note and add it to the map initialized in the constructor
    this.setState({
      notes: this.state.notes.set(this.state.id, {
        title,
        text: 'text',
        x: 0,
        y: 0,
        zIndex: 0,
      }),
      // Increment the id number after we make the note
      id: this.state.id + 1,
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }
  updatePosition(x, y, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    });
  }

  updateContent(text, id) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text }); }),
    });
  }

  totalNotes() {
    return this.state.notes.map((key, value) => {
      return <Note note={key} delete={() => this.deleteNote(value)} updatePosition={(x, y) => this.updatePosition(x, y, value)} updateContent={(text) => this.updateContent(text, value)} />;
    });
  }

  render() {
    return (
      <div>
        <AddBar create={(title) => this.createNote(title)} />
        {this.totalNotes()}
      </div>
      );
  }
  }

export default App;
