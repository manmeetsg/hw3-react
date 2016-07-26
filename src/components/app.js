import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import AddBar from './addbar';
import firebasedb from './firebase';

// Discussed with Alex Beals
// App component that holds the map of notes and passes down props to render
// them, now with added firebase capability
class App extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      notes: Immutable.Map(),
      zIndex: 0,
    };
  }

  // Fetch the notes and initialize our board
  componentDidMount() {
    firebasedb.fetchNotes((snapshot) => {
      if (this.state.notes.size === 0 && snapshot.val()) {
        this.setState({
          notes: Immutable.Map(snapshot.val()),
          zIndex: Object.keys(snapshot.val()).length,
        });
      } else {
        this.setState({
          notes: Immutable.Map(snapshot.val()),
        });
      }
    });
  }

  createNote(title) {
    // Create a note and add it to the firebase database
    firebasedb.addNote({
      title,
      text: 'text',
      x: 0,
      y: 0,
      zIndex: this.state.zIndex + 1,
      editing: false,
    });
    this.setState({
      zIndex: this.state.zIndex + 1,
    });
  }

  deleteNote(id) {
    firebasedb.deleteNote(id);
  }
  updatePosition(x, y, id) {
    firebasedb.updatePosition(x, y, id);
  }

  updateContent(text, id) {
    firebasedb.updateContent(text, id);
  }

  updateEditing(editing, id) {
    firebasedb.updateEditing(editing, id);
  }

  totalNotes() {
    return this.state.notes.map((note, id) => {
      return (<Note
        note={note}
        delete={() => this.deleteNote(id)}
        updateEditing={(editing) => this.updateEditing(editing, id)}
        updatePosition={(x, y) => this.updatePosition(x, y, id)}
        updateContent={(text) => this.updateContent(text, id)}
      />);
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
