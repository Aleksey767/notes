import React, {useState} from 'react';
import {MdSearch, MdFilterListAlt} from 'react-icons/md';

const Search = ({handleSearchNote, notes, selected, setSelected}) => {

    const [isActive, setIsActive] = useState(false);

    let res = []

    const filterTag = () => {
        notes.map((note) => {    //собираем все теги вместе
            let arr = Object.values([note.tag]) //конкатенация массива
            res.push(...arr)
        })
        res = res.flat().flat()
        const uniqueArray = res.filter(function (item, pos) {
            return res.indexOf(item) === pos;
        })
        let result = uniqueArray.map((key) => {//деструктуризация тегов для вывода на экран
            return typeof (key) === 'object' ?
                key.map((keys) => <div className='dropdown-item'
                                       onClick={e => [setSelected(e.target.textContent),
                                           handleSearchNote(e.target.textContent),
                                           setIsActive(false)]
                                       }>{keys}</div>) :
                <div className='dropdown-item'
                     onClick={e => [setSelected(e.target.textContent),
                         handleSearchNote(e.target.textContent),
                         setIsActive(false)]
                     }>{key}</div>
        });
        let firstElement = result[0];
        if (typeof (firstElement) === 'undefined') {
            return <div className='dropdown-item'>You have no tags</div> //проверка на отстутствие тегов
        } else return result

    }
    return (<div className='search-block'>
        <div className='search'>
            <MdSearch className='search-icons' size='1.3em'/>
            <input
                onChange={(event) => [handleSearchNote(event.target.value),
                    setSelected(event.target.value)]}
                type='text'
                placeholder='type to search...'
                value={selected}
            />
        </div>
        <div className='dropdown'>
            <div className='dropdown-btn'
                 onClick={(e) => setIsActive(!isActive)}>
                <MdFilterListAlt
                    fill={'orange'}
                    size='2.3em'/></div>
            {isActive && <div className='dropdown-content'>
                {filterTag()}
            </div>}
        </div>
    </div>);
};

export default Search;
