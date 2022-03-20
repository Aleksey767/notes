import React, {useState} from 'react';
import {MdSearch, MdFilterListAlt} from 'react-icons/md';

const Search = ({handleSearchNote, notes, setNotes, selected, setSelected, deleteTag}) => {
    const [isActive, setIsActive] = useState(false);

    let res = []
    const uber = () => {
        notes.map((note) => {    //собираем все теги вместе

            let k = Object.values([note.tag])
            console.log('k')
            console.log(k)
            res.push(...k)
            console.log(res)

        })
        let i = res.map((note) => {
            return [note.map((key) => typeof (key) === 'object' ?
                key.map((keys) => <div className='dropdown-item'>{keys}</div>):
            <div className='dropdown-item'>{key}</div>)]
        });
        return i
    }
    return (<div className='search-block'>
            <div className='search'>
                <MdSearch className='search-icons' size='1.3em'/>
                <input
                    onChange={(event) => handleSearchNote(event.target.value)}
                    type='text'
                    placeholder='type to search...'
                />
            </div>
            <div className='dropdown'>
                <div className='dropdown-btn'
                     onClick={(e) => setIsActive(!isActive)}>
                    <MdFilterListAlt
                        size='2em'/></div>
                {isActive && <div className='dropdown-content'>
                    {uber()}
                </div>}
            </div>
        </div>);
};

export default Search;
