import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transactionValue => transactionValue.value);

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transactionValue => transactionValue.value);

    const incomesValue = incomes.reduce((value1, value2) => value1 + value2, 0);
    const outcomesValue = outcomes.reduce(
      (value1, value2) => value1 + value2,
      0,
    );

    const totalValue = incomesValue - outcomesValue;

    const balance = {
      income: incomesValue,
      outcome: outcomesValue,
      total: totalValue,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
