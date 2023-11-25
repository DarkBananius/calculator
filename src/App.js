import { useState } from 'react';
import styles from './App.module.css'


const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['C', '+', '-', '='];

export const App = () => {
	const [entered, setEntered] = useState(0);
	const [answer, setAnswer] = useState(false);

	const checkExpression = (inputValue, currentValue) => {
		if (currentValue === 0) {
			if (Number(inputValue) === 0) {
				setEntered(currentValue);
			} else if (isNaN(inputValue)) {
				setEntered(currentValue + inputValue);
			} else {
				setEntered(inputValue);
			}
		} else if (Number(inputValue) === 0 && isNaN(String(currentValue).at(-1))) {
			setEntered(currentValue);
		} else if (isNaN(currentValue) && isNaN(inputValue)) {
			setEntered(currentValue);
		} else {
			setEntered(currentValue + inputValue);
		}
	};

	const onClick = (e) => {
		const { target } = e;
		const btnCal = target.closest(`.${styles.calBtn}`);
		if (btnCal) {
			setAnswer(false);
			switch (btnCal.textContent) {
				case '=':
					const result = new Function(`return ${entered}`);
					setAnswer(true);
					setEntered(result);
					break;
				case 'C':
					setEntered(0);
					break;
				default:
					checkExpression(btnCal.textContent, entered);
					break;
			}
		}
	};

	return (
		<div className={styles.cal}>
			<div className={styles.calDisplay}>
				<span
					className={
						answer ? styles.calDisplayColor : styles.calDisplayNotColor
					}
				>
					{entered}
				</span>
			</div>
			<div className={styles.calPanel} onClick={onClick}>
				<div className={styles.calNumbers}>
					{numbers.map((number) => (
						<span key={number} className={styles.calBtn}>
							{number}
						</span>
					))}
				</div>
				<div className={styles.calPanelOperators}>
					{operators.map((operator) => (
						<span key={operator} className={styles.calBtn}>
							{operator}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
