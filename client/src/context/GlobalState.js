import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial State
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Actions

	async function getTransactions() {
		try {
			const result = await axios.get("/api/v1/transactions");

			console.log(result.data.data);

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: result.data.data,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.result.data.error,
			});
		}
	}

	const deleteTransaction = async (id) => {
		try {
			await axios.delete(`api/v1/transactions/${id}`);

			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.result.data.error,
			});
		}
	};

	const addTransaction = async (transaction) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const result = await axios.post(
				`api/v1/transactions`,
				transaction,
				config
			);

			dispatch({
				type: "ADD_TRANSACTION",
				payload: result.data.data,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: error.result.data.error,
			});
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
