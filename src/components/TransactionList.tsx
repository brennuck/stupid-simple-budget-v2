import React from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { Transaction } from "../types";
import { formatCurrency } from "./utils";

interface TransactionListProps {
    transactions: Transaction[];
    selectedAccountId: string;
}

export default function TransactionList({ transactions, selectedAccountId }: TransactionListProps) {
    const filteredTransactions = transactions.filter(
        (t) =>
            t.account_id === selectedAccountId ||
            t.from_account_id === selectedAccountId ||
            t.to_account_id === selectedAccountId
    );

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flow-root">
                {filteredTransactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No transactions yet</p>
                ) : (
                    <ul role="list" className="divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                            <li key={transaction.id} className="px-6 py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        {transaction.type === "expense" || transaction.from_account_id !== null ? (
                                            <ArrowDownCircle className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <ArrowUpCircle className="h-6 w-6 text-green-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {transaction.description}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {new Date(transaction.date).toLocaleDateString("en-US")}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                transaction.type === "expense" || transaction.from_account_id !== null
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {formatCurrency(transaction.amount || 0)}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}