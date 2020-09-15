import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
	const [text, setText] = useState("");
	const [amount, setAmount] = useState("");

	const { addTransaction } = useContext(GlobalContext);

	const onSubmit = (event) => {
		event.preventDefault();

		const newTransaction = {
			id: Math.floor(Math.random() * 10000000000),
			text,
			amount: +amount,
		};

		text === "" || amount === 0
			? alert("please fill all the fields")
			: addTransaction(newTransaction);

		setText("");
		setAmount("");
	};

	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className="form-control">
					<label htmlFor="text">Text</label>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
						title="Describe your expenses/incomes"
						required
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter value..."
						required
					/>
				</div>
				<button className="btn">Add transaction</button>
			</form>
		</>
	);
};

export default AddTransaction;