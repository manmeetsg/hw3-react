import Firebase from 'firebase';
// Initialize Firebase, have to do it as a constant despite directions
// saying var, because the linter hates var
const config = {
  apiKey: 'AIzaSyDNmdsNPl7SwkseUei7x_SyZ6wjP3XK0fE',
  authDomain: 'cs52-hw3-49d12.firebaseapp.com',
  databaseURL: 'https://cs52-hw3-49d12.firebaseio.com',
  storageBucket: 'cs52-hw3-49d12.appspot.com',
};

Firebase.initializeApp(config);

// Variable to access our database
const database = Firebase.database();

// Use this syntax to expor the functions we want to export
module.exports = {
  fetchNotes: (callback) => {
    database.ref('notes').on('value', (snapshot) => {
      callback(snapshot);
    });
  },
  addNote: (note) => {
    // Using the info online, the info on the homework, and help from Alex
    // Beals wrote these functions to update the database
    const id = database.ref('notes').push().key;

    database.ref('notes').child(id).set(note);
  },
  updatePosition: (x, y, id) => {
    database.ref('notes').child(id).update({ x, y });
  },
  deleteNote: (id) => {
    database.ref('notes').child(id).remove();
  },
  updateContent: (text, id) => {
    database.ref('notes').child(id).update({ text });
  },
  updateEditing: (editing, id) => {
    database.ref('notes').child(id).update({ editing });
  },

};
