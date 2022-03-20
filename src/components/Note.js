import {MdDeleteForever, MdEditNote, MdOutlineClear} from 'react-icons/md';
import React, {useState} from 'react';

const HandleEditNote = ({text, editNote, id}) => {
    let [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        editNote(text, searchTag(), id);

    }
    const handleChange = (event) => {
        text = event.target.value;
    };
    let word = '';
    const searchTag = () => {
        let tag = [];
        let reg = /#[a-zA-Z0-9А-Яа-я]+\b/g;
        word = text.match(reg)
        if (word !== null) {
            tag.push(word);
        }
        return tag
    }

    if (text.includes(word)) {
        const sharp = '#'
        let q = text.replace(word, (full, a1) => {
            return `<span>${a1}</span>`
        })
        for (let i = text.indexOf(sharp); i < text.length; i++) {

        }
    }

    return (
        <div>
            {!editMode &&
                <div className='text-note' onClick={activateEditMode}>{text ? text : 'blank note...'}
                </div>
            }

            {editMode && <div>


				<textarea
                    className='edit-area'
                    rows='8'
                    cols='10'
                    placeholder='Type to add a note...'
                    defaultValue={text}
                    onChange={handleChange}
                />

                <MdEditNote
                    className='edit-icon'
                    size='1.3em'
                    onClick={() => deactivateEditMode()}/>
            </div>
            }
        </div>
    )
}

const Note = ({id, text, date, handleDeleteNote, tag, editNote, deleteTag}) => {


    const newTag = [].concat(...tag); // удаляем лишние уровни в массиве
    const noteTag = newTag.map(item => {
        return (item !== '' && <div className='noteTag'>{item}
            <MdOutlineClear
                className='delete-tag'
                onClick={() => {
                    let rExp = new RegExp(item, "g");

                    item = newTag.toString().replace(rExp, '');//удаляем тег из массива тегов

                    text = text.replace(rExp, '').replace(/[,]/g, '');//удаляем тег из массива тегов
                    deleteTag(text, item.split(',').slice(0,-1), id)
                }}
            /></div>)
    })

    return (
        <div className='note'>
            <HandleEditNote editNote={editNote} text={text} id={id}/>
            <div className='tagInput'>{noteTag}</div>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever
                    onClick={() => handleDeleteNote(id)}
                    className='delete-icon'
                    size='1.3em'/>
            </div>
        </div>
    );
};

export default Note;
