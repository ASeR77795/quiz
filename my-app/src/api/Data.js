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

const Data = ({ visible, setVisible }) => {
	const [questions, setQuestions] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [number, setNumber] = useState(1);
	const [hard, setHard] = useState('');
	const [type, setType] = useState('');

	useEffect(() => {
		fetch('https://opentdb.com/api_category.php')
			.then(res => res.json())
			.then(data => {
				if (data.trivia_categories) {
					setCategory(data.trivia_categories);
					console.log(data.trivia_categories);
				} else {
					console.error('No trivia categories found in the response.');
				}
			})
			.catch(err => console.error('category err', err));
	}, []);

	const handleRequest = async () => {
		const selectedCategoryObj = category.find(
			item => item.id === selectedCategory
		);
		const selectedCategoryId = selectedCategoryObj
			? selectedCategoryObj.id
			: '';
		console.log(selectedCategoryId);

		try {
			const response = await fetch(
				`https://opentdb.com/api.php?amount=${number}${
					selectedCategoryId !== '' ? '' : `&category=${selectedCategoryId}`
				}${hard !== 'any' ? '' : `&difficulty=${hard}`}${
					type !== 'any' ? '' : `&type=${type}`
				}`
			);

			const data = await response.json();
			setQuestions(data.results);
			console.log(data.results);
		} catch (error) {
			console.error('Request error', error);
		}

		setVisible(prevState => !prevState);
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
