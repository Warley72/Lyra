import styles from './overview.module.scss';

import { Expenses } from './Expenses/Expenses';
import { Income } from './Income/Income';
import { Savings } from './Savings/Savings';
import { TotalBalance } from './TotalBalance/TotalBalance';

const overviewMock = {
    totalBalance: {
        title: 'Total balance',
        value: '$ 15,540.00',
    },

    income: {
        title: 'Income',
        value: '$ 8,750.00',
        variation: '+ 12.5%',
    },

    expenses: {
        title: 'Expenses',
        value: '$ 4,320.00',
        variation: '- 8.3%',
    },

    savings: {
        title: 'Savings',
        value: '$ 8,220.00',
    },
};

export default function Overview() {
    return (
        <section className={styles.overview}>
            <h2>Overview</h2>

            <div className={styles.cards}>
                <TotalBalance {...overviewMock.totalBalance} />

                <Income {...overviewMock.income} />

                <Expenses {...overviewMock.expenses} />

                <Savings {...overviewMock.savings} />
            </div>
        </section>
    );
}
