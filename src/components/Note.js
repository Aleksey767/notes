import {MdDeleteForever, MdEditNote, MdOutlineClear, MdOutlinePlusOne, MdCheckCircle} from 'react-icons/md';
import React, {useState} from 'react';

const HandleEditNote = ({text, editNote, id}) => {           //редактирование заметки

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

    const searchTag = () => {                   //поиск тегов в поле редактора
        let tag = [];
        let reg = /#[a-zA-Z0-9А-Яа-я]+\b/g;
        word = text.match(reg)
        if (word !== null) {
            tag.push(word);
        }
        return tag
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

    let [editMode, setEditMode] = useState(false);
    let [inputData, setInputData] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = (text,e,id) => {
        setEditMode(false);
        tag.push(e)
        text=text+''+e
        editNote(text, tag, id)
        debugger
    }
    const newTag = [].concat(...tag); // удаляем лишние уровни в массиве

    const noteTag = newTag.map(tag => {

        return (<div className='noteTag'>{tag}
            <MdOutlineClear
                className='delete-tag'
                onClick={() => {
                    let rExp = new RegExp(tag, "g");

                    let cloneNewTag = newTag.slice()
                    cloneNewTag.splice(newTag.indexOf(tag), 1);//удаляем тег из массива всех тегов

                    text = text.replace(rExp, '').replace(/[,]/g, '').trim();//приводим текст к красивому виду

                    deleteTag(text, cloneNewTag, id) //пушим изменения в стейт

                }}
            /></div>)

    })
    return (
        <div className='note'>
            <HandleEditNote editNote={editNote} text={text} id={id}/>

            {editMode ?
                <div>
                    <input type={text} placeholder={'enter your tag...'}
                           className='input-tag'
                           onChange={(event) => setInputData(event.target.value)}/>
                    <MdCheckCircle
                        size='1.3em'
                        onClick={() =>{deactivateEditMode(text,inputData,id) }}/>
                </div>
                : <div className='tag-block'>
                    <div className='tagInput'>{noteTag}</div>
                    <MdOutlinePlusOne
                        onClick={activateEditMode}
                        size='1.3em'
                    /></div>
            }


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
