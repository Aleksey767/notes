import React, {useState} from 'react';

const AddNote = ({handleAddNote}) => {

    const [noteText, setNoteText] = useState('');

    const characterLimit = 200;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {  //счетчик кол-ва введенных символов
            setNoteText(event.target.value);
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {       //удаляем лишнее пробелы в тексте
            handleAddNote(noteText, searchTag());
            setNoteText('');
        }
    };
    const searchTag = () => {              //поиск тега в введенном тексте
        let tag = [];
        let reg = /#[a-zA-Z0-9А-Яа-я]+\b/g;
        const word = noteText.match(reg)

        if (word !== null) {
            tag.push(word);
        }
        return tag
    }
    const newTag = [].concat(...searchTag());   //найденные теги складываем в массив

    const noteTag = newTag.map(item => {  		//рисуем теги по одиночке
        return <div className='noteTag'>{item}</div>
    })
    return (
        <div className='note new'>
			<textarea
                rows='8'
                cols='10'
                placeholder='Type to add a note...'
                value={noteText}
                onChange={handleChange}
            />
            <div className='tagInput'>{noteTag}</div>
            <div className='note-footer'>
                <small>
                    {characterLimit - noteText.length} Remaining
                </small>
                <button className='save' onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddNote;
