import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const difficultArr = [
	{ id: 'any', name: 'Any' },
	{ id: 'easy', name: 'Easy' },
	{ id: 'medium', name: 'Medium' },
	{ id: 'hard', name: 'Hard' },
];
const typeArr = [
	{ id: 'any', name: 'Any' },
	{ id: 'multiple', name: 'Multiple Choice' },
	{ id: 'boolean', name: 'True/False' },
];
const Data = () => {
	const [questions, setQuestions] = useState([]);
	const [category, setCategory] = useState([{ id: 'any', name: 'Any' }]);
	const [selectedCategory, setSelectedCategory] = useState('any');
	const [number, setNumber] = useState(1);
	const [hard, setHard] = useState('');
	const [type, setType] = useState('');

	useEffect(() => {
		fetch('https://opentdb.com/api_category.php')
			.then(res => res.json())
			.then(data => {
				setCategory(prevCategory => [
					...prevCategory,
					...data.trivia_categories,
				]);
			})
			.catch(err => console.error('category err', err));
	}, []);

	const handleRequest = () => {
		const selectedCategoryId =
			selectedCategory !== 'any'
				? category.find(el => {
						if (el.name === selectedCategory) {
							return el.id;
						}
				  })
				: '';

		fetch(
			`https://opentdb.com/api.php?amount=${number}${
				selectedCategoryId !== '' ? `&category=${selectedCategoryId}` : ''
			}${hard !== 'any' ? `&difficulty=${hard}` : ''}${
				type !== 'any' ? `&type=${type}` : ''
			}`
		)
			.then(response => response.json())
			.then(data => {})
			.catch(error => {
				console.error('Request error', error);
			});
	};

	return (
		<div className='container'>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					flexDirection: 'column',
				}}
			>
				<div>
					<label style={{ display: 'flex', flexDirection: 'column' }}>
						Number of questions
						<input
							className='form-control'
							type='number'
							min='1'
							max='50'
							value={number}
							onChange={e => {
								setNumber(e.target.value);
							}}
						/>
					</label>
				</div>
				<div>
					<p className='mb-0'>Select Category</p>
					<select
						className='form-select'
						aria-label='Default select example'
						onChange={e => setSelectedCategory(e.target.value)}
					>
						{category
							? category.map((el, index) => (
									<option key={index} value={el.id}>
										{el.name}
									</option>
							  ))
							: ''}
					</select>
				</div>
				<div>
					<p className='mb-0'>Select Difficulty</p>
					<select
						className='form-select'
						aria-label='Default select example'
						onChange={e => setHard(e.target.value)}
					>
						{difficultArr.map((el, index) => {
							return (
								<option key={index} value={el.id}>
									{el.name}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<p className='mb-0'>Select Type:</p>
					<select
						className='form-select'
						aria-label='Default select example'
						onChange={e => setType(e.target.value)}
					>
						{typeArr.map((el, index) => {
							return (
								<option key={index} value={el.id}>
									{el.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div>
				<button
					className='btn btn-primary btn-lg w-100 mt-2'
					type='button'
					onClick={handleRequest}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Data;
