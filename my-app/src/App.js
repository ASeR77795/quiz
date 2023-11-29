import { useEffect, useState } from 'react';
import './index.scss';
import Data from './api/Data';
import Game from './Game';

function App() {
	const [step, setStep] = useState(0);
	const [visible, setVisible] = useState(true);

	return (
		<div className='App'>
			{visible ? (
				<div>
					<Data setVisible={setVisible} visible={visible} />
					{/* <Result /> */}
				</div>
			) : (
				<Game />
			)}
		</div>
	);
}

export default App;
