import React, { Component } from 'react';
import '../assets/scss/note.scss'

class Note extends Component {
    constructor(props){
        super(props) 

        this.state = {
            isEdit : false
        }
    }
    
    remove = (event) => {
        event.preventDefault();
        this.props.onRemove(this.props.id)
    }

    edit = ( event ) => {
        event.preventDefault();

        this.setState({
            isEdit: true
        })
    }

    renderDisplay(){
        return (
            <div className="note">
                <div className="note__content">
                    {this.props.children}
                </div>
                <div className="note__btns">
                    <button className="btn btn__edit" onClick={this.edit}> Edit</button>
                    <button className="btn btn__remove" onClick={this.remove}> Remove </button>
                </div>
            </div>
        )
    }

    save = ( event ) => {
        event.preventDefault();
        const editedText = this.textarea.value;
        this.props.onEdit( editedText, this.props.id );

        this.setState({
            isEdit: false
        })
    }

    renderForm() {
        return (
            <div className="note note--isedit">
                <textarea className="note__textarea" ref={ ref => this.textarea = ref } defaultValue={this.props.children}/>
                <button className="note_save" onClick={this.save}> Save </button>
            </div>
        )
    }
    render(){
        return this.state.isEdit ? this.renderForm() : this.renderDisplay()
    }
}

export default Note