import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import Data from './data.json'

const App = () => {
    const [selected, setSelected] = useState('');

    const [notes, setNotes] = useState(Data);

    const [searchText, setSearchText] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem('notes-data')
        );

        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'notes-data',
            JSON.stringify(notes)
        );
    }, [notes]);

    const addNote = (text, tag) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
            tag: tag
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };


    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };


    const editNote = (text, tag, id) => {    // редактирование заметки

        const newNotes = notes.map((note) => (
            note.id === id
                ? {...note, text: text, tag: tag}
                : note));
        setNotes(newNotes);
    };

    const deleteTag = (text, tag, id) => {    // удалить тег
        const newNotes = notes.map((note) => (
            note.id === id
                ? {...note, text: text, tag: tag}
                : note));

        setNotes(newNotes);
    };

    return (
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className='container'>
                <Header handleToggleDarkMode={setDarkMode} darkMode={darkMode}/>
                <Search notes={notes} handleSearchNote={setSearchText}
                        setSelected={setSelected} selected={selected}/>
                <NotesList
                    notes={notes.filter((note) =>
                        note.text.toLowerCase().includes(searchText)
                    )}
                    handleAddNote={addNote}
                    handleDeleteNote={deleteNote}
                    editNote={editNote}
                    deleteTag={deleteTag}
                />
            </div>

        </div>
    );
};

export default App;
