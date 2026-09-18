export const dashboardMock = {
    user: {
        name: "Carlos",
    },

    month: {
        name: "May",
        year: 2025,
    },

    metrics: {
        balance: {
            label: "Total balance",
            value: 12540.0,
        },

        income: {
            label: "Income",
            value: 8750.0,
            variation: 12.5,
        },

        expenses: {
            label: "Expenses",
            value: 4320.0,
            variation: -8.3,
        },

        savings: {
            label: "Savings",
            value: 8220.0,
        },
    },

    spending: {
        total: 4320.0,

        categories: [
            {
                name: "Housing",
                value: 850.0,
                percentage: 2.8,
            },
            {
                name: "Food",
                value: 980.0,
                percentage: 22.7,
            },
            {
                name: "Transport",
                value: 720.0,
                percentage: 16.7,
            },
            {
                name: "Health",
                value: 460.0,
                percentage: 10.7,
            },
            {
                name: "Others",
                value: 360.0,
                percentage: 8.2,
            },
        ],
    },

    transactions: [
        {
            id: 1,
            description: "Salary",
            category: "Income",
            amount: 3250.0,
            date: "May 23",
            type: "income",
        },
        {
            id: 2,
            description: "Grocery store",
            category: "Food",
            amount: -85.4,
            date: "May 22",
            type: "expense",
        },
        {
            id: 3,
            description: "Rent",
            category: "Housing",
            amount: -1200.0,
            date: "May 20",
            type: "expense",
        },
        {
            id: 4,
            description: "Gas station",
            category: "Transport",
            amount: -60.0,
            date: "May 19",
            type: "expense",
        },
        {
            id: 5,
            description: "Gym",
            category: "Health",
            amount: -45.0,
            date: "May 18",
            type: "expense",
        },
    ],

    monthlyProgress: {
        spent: 2320.0,
        budget: 4500.0,
        remaining: 1180.0,
    },

    accounts: [
        {
            id: 1,
            name: "Nubank",
            type: "Checking",
            balance: 8240.0,
        },
        {
            id: 2,
            name: "Savings",
            type: "Savings",
            balance: 4300.0,
        },
    ],
};
