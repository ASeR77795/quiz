import { useEffect, useState } from 'react';
import './index.scss';
import Data from './api/Data';

function Result() {
	return (
		<div className='result'>
			<img src='https://cdn-icons-png.flaticon.com/512/2278/2278992.png' />
			<h2>Вы отгадали 3 ответа из 10</h2>
			<button>Попробовать снова</button>
		</div>
	);
}

const Game = () => {
	return (
		<>
			<div className='progress'>
				<div style={{ width: '50%' }} className='progress__inner'></div>
			</div>
			<h1>Что такое useState?</h1>
			<ul>
				<li>Это функция для хранения данных компонента</li>
				<li>Это глобальный стейт</li>
				<li>Это когда на ты никому не нужен</li>
			</ul>
		</>
	);
};

function App() {
	const [step, setStep] = useState(0);

	return (
		<div className='App'>
			<Data />
			{/* <Game /> */}
			{/* <Result /> */}
		</div>
	);
}

export default App;
