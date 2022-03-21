import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	editNote, deleteTag
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					id={note.id}
					text={note.text}
					date={note.date}
					handleDeleteNote={handleDeleteNote}
					tag={note.tag}
					handleAddNote={handleAddNote}
					editNote={editNote}
					deleteTag={deleteTag}
				/>
			))}
			<AddNote handleAddNote={handleAddNote}/>
		</div>
	);
};

export default NotesList;
