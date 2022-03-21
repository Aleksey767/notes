import React from 'react';

const DarkMode = ({ handleToggleDarkMode,darkMode }) => {
	return (
		<div className='header'>
			<h1>Notes</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				{darkMode?<div>Light Mode</div>:<div>Dark Mode</div>}
			</button>
		</div>
	);
};

export default DarkMode;
