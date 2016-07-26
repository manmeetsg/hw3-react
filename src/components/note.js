import React, { Component } from 'react';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';
import Draggable from 'react-draggable';

// Discussed with Alex Beals
// Note component that renders the individual notes
class Note extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      editing: false,
      text: this.props.note.text,
    };
    // Binding statements
    this.inputChange = this.inputChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.drag = this.drag.bind(this);
  }
  deleteClick(event) {
    this.props.delete();
  }

  inputChange(event) {
    // this.setState({ text: event.target.value });
    this.props.updateContent(event.target.value);
  }

  drag(event, ui) {
    this.props.updatePosition(ui.x, ui.y);
  }

  editClick(event) {
    this.props.updateEditing(!this.props.note.editing);
    // this.props.updateContent(this.state.text);
    this.setState({ editing: !this.state.editing });
  }

  editButtonRender() {
    if (this.state.editing) {
      return <i onClick={this.editClick} className="fa fa-check" />;
    } else {
      return <i onClick={this.editClick} className="fa fa-pencil" />;
    }
  }

  contentRender() {
    if (this.state.editing) {
      return (
        <div className="content">
          <Textarea onChange={this.inputChange} value={this.props.note.text} />
        </div>
      );
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) }} />;
    }
  }
  // Modified from code given on website, discussed with Alex Beals
  render() {
    return (
      <Draggable
        handle=".fa-arrows-alt"
        defaultPosition={null}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.drag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div className="navbar">
            <div className="left">
              <span className="title">{this.props.note.title}</span>
              <i onClick={this.deleteClick} className="fa fa-trash-o" />
              {this.editButtonRender()}
            </div>
            <div className="right">
              <i className="fa fa-arrows-alt" />
            </div>
          </div>
          {this.contentRender()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
