import React, {useState} from "react";
import {MdEditNote} from "react-icons/md";

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

        const textarea = document.querySelector('textarea');
        const pre = document.querySelector('pre');

        textarea.addEventListener('input', function(e) {
            let string = this.value;
            let array = string.split(/(\s+)/);

            for (let i = 0; i < array.length; i++) {
                if (array[i].includes('#')) {
                    array[i] = "<span class='highlight'>" + array[i] + "</span>";
                }
            }
            string = array.join('');

            pre.innerHTML = string;
        });
    };

    let word = '';

    const searchTag = () => {                   //поиск тегов в поле редактора
        let tag = [];
        let reg = /#[a-zA-Z0-9А-Яа-я]+/g;
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
                <div className='textarea'>
                    <textarea
                        rows='8'
                        cols='10'
                        placeholder='Type to add a note...'
                        defaultValue={text}
                        onChange={handleChange}
                    />
                   <pre></pre>
                </div>


                <MdEditNote
                    className='edit-icon'
                    size='1.3em'
                    onClick={() => deactivateEditMode()}/>
            </div>
            }
        </div>
    )
}
export default HandleEditNote;