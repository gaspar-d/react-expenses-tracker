import React, { useContext, useEffect } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
	const { transactions, getTransactions } = useContext(GlobalContext);

	console.log(transactions);
	useEffect(() => {
		getTransactions();
		// to cancel the waring in console
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(transactions);
	return (
		<>
			<h3>History</h3>
			<ul className="list">
				{transactions.map((transaction) => (
					<Transaction
						transaction={transaction}
						key={transaction._id}
					/>
				))}
			</ul>
		</>
	);
};

export default TransactionList;
