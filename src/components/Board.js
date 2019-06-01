import React, { Component } from 'react';
import Note from './Note';
import '../assets/scss/board.scss'

class Board extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            notes: []
        }

    }

    nextId(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++;
    }

    removeItem = (id) => {
        this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
    }

    update = ( newText, id ) => {
        this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id !== id) ? note : {...note, note: newText}
			)
		}))
    }


    renderNotes(note, i ){
        return (
            <Note key={note.id} id={note.id} onRemove={this.removeItem} onEdit={this.update}>
                {note.note}
            </Note>
        )
    }

    addItem = (event) =>  {
        event.preventDefault();
        const newText = this.textArea.value;

        // Reset the text area value after adding the items
        this.textArea.value = '';

        this.setState( prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: newText
                }
            ]
        }))
    }

    render() {
        return (
            <div className="board">
                <h1 className="board__title">Note Management Web Application</h1>
                <textarea className="board__input" ref={ ref => this.textArea = ref } defaultValue="Please Insert Your Note ..."/>
                <button className="board__submit" onClick={this.addItem}>Add</button>
                <div className="board__noteWrapper">
                    {this.state.notes.map(this.renderNotes.bind(this))}
                </div>
            </div>
        )
    }
}

export default Board;