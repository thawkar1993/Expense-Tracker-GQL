const users = [
    {
        _id: "1",
        username: "user1",
        name: "User one",
        password: "password1",
        profilePicture: "profile1.jpg",
        gender: "male",
    },
    {
        _id: "2",
        username: "user2",
        name: "User Two",
        password: "password2",
        profilePicture: "profile2.jpg",
        gender: "female",
    },
    {
        _id: "3",
        username: "user3",
        name: "User three",
        password: "password3",
        profilePicture: "profile3.jpg",
        gender: "male",
    },
    {
        _id: "4",
        username: "user4",
        name: "User four",
        password: "password4",
        profilePicture: "profile4.jpg",
        gender: "female",
    },
    {
        _id: "5",
        username: "user5",
        name: "User Five",
        password: "password5",
        profilePicture: "profile5.jpg",
        gender: "male",
    },
]

const transactions = [
    {
        _id: "1",
        userId: "1",
        description: "Transaction One",
        paymentType: "CASH",
        category: "Category One",
        amount: 100.0,
        location: "Location one",
        data: "2024-01-01"
    },
    {
        _id: "2",
        userId: "2",
        description: "Transaction Two",
        paymentType: "CARD",
        category: "Category Two",
        amount: 200.0,
        location: "Location Two",
        data: "2024-01-02"
    },
    {
        _id: "3",
        userId: "3",
        description: "Transaction Three",
        paymentType: "CASH",
        category: "Category Three",
        amount: 300.0,
        location: "Location Three",
        data: "2024-01-03"
    },
    {
        _id: "4",
        userId: "4",
        description: "Transaction Four",
        paymentType: "CARD",
        category: "Category Four",
        amount: 400.0,
        location: "Location Four",
        data: "2024-01-01"
    },
    {
        _id: "5",
        userId: "5",
        description: "Transaction Five",
        paymentType: "CASH",
        category: "Category Five",
        amount: 500.0,
        location: "Location Five",
        data: "2024-01-05"
    },

]

export { users, transactions};