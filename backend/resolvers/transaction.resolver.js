import Transaction from '../models/transaction.model.js'

const transactionResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try{
                if(!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ userId: userId})
                return transactions;

            }catch(err){
                console.error("Error in getting transactions: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        transaction: async (_,{transactionId}, ) => {
            try{
                const transaction = await Transaction.findById(transactionId);
                return transaction;

            }catch(err){
                console.error("Error in getting an transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        //TODO => Add CategoryStatistics Query
        categoryStatistics: async (_, __, context ) => {
            if(!context.getUser()) throw new Error("Unauthorised!");
            const userId = context.getUser()._id;
            const transactions = await Transaction.find({ userId });
            const categoryMap = {};

            transactions?.forEach((transaction) => {
                if(!categoryMap[transaction.category]){
                    categoryMap[transaction.category] = 0;
                }
                categoryMap[transaction.category] += transaction.amount;
            })

            return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }))
        }
    },
    Mutation: {
        createTransaction: async(_, {input}, context) => {
            try{
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                })
                await newTransaction.save();
                return newTransaction;

            }catch(err){
                console.error("Error in creating transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        updateTransaction: async(_, {input}) => {
            try{
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
                return updatedTransaction;

            }catch(err){
                console.error("Error in updating transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        deleteTransaction: async(_, { transactionId }) => {
            try{
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;

            }catch(err){
                console.error("Error in deleting transaction: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

        //TODO => Add Transaction/User Relationship - later

    }
};

export default transactionResolver;

