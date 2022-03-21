import {MdCheckCircle, MdDeleteForever, MdOutlineClear, MdOutlinePlusOne} from 'react-icons/md';
import React, {useState} from 'react';
import HandleEditNote from "./HandleEditNote";

const Note = ({id, text, date, handleDeleteNote, tag, editNote, deleteTag}) => {

    let [editMode, setEditMode] = useState(false);
    let [inputData, setInputData] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = (tags) => { // при закрытии режима редактирования перерисовываем заметку
        if (tags !== undefined) {
            setEditMode(false);
            tag.push(tags)
            text = text + ' ' + tags.toString().replace(/[,]/g, '')
            editNote(text, tag, id)
            setInputData('')
        }
    }
    const newTag = [].concat(...tag); // удаляем лишние уровни в массиве тегов

    const noteTag = newTag.map(tag => {    //сохраняем в переменную теги готовые к выводу на экран

        return (
            <div className='noteTag'>{tag}
                <MdOutlineClear
                    className='delete-tag'
                    onClick={() => {
                        let rExp = new RegExp(tag, "g");

                        let cloneNewTag = newTag.slice()
                        cloneNewTag.splice(newTag.indexOf(tag), 1);//удаляем тег из массива всех тегов

                        const uniqueArray = cloneNewTag.filter(function (elem) { //проверяем на дубликаты
                            return elem !== tag;
                        });

                        text = text.replace(rExp, '').replace(/[,]/g, '').trim();//приводим текст к красивому виду

                        deleteTag(text, uniqueArray, id) //пушим изменения в стейт
                    }}/></div>)
    })
    let searchTag = () => {                   //поиск тегов в введнном слове
        let reg = /#[a-zA-Z0-9А-Яа-я]+/g;
        let result = inputData.match(reg)
        if (result === null) {
            setEditMode(false)
        } else {
            setEditMode(false)
            return result
        }
    }
    return (
        <div className='note'>
            <HandleEditNote editNote={editNote} text={text} id={id}/>
            {editMode ?
                <div className='input-tag-block'>
                    <input type={text} placeholder={'enter tag for example #me'}
                           className='input-tag'
                           onChange={(event) => setInputData(event.target.value)}/>
                    <MdCheckCircle
                        size='1.3em'
                        onClick={() => {
                            const tags = searchTag()
                            deactivateEditMode(tags)
                        }}/>
                </div>
                : <div className='tag-block'>
                    <div className='tag-input'>{noteTag}</div>

                    <MdOutlinePlusOne
                        className='tag-confirm'
                        onClick={activateEditMode}
                        size='1.3em'
                    />
                </div>
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
