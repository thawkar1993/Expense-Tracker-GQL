import { useQuery } from "@apollo/client";
import Card from "../atoms/Card";
import { GET_TRANSACTIONS } from "../../../graphql/queries/transaction.query";
import { GET_USER_AND_TRANSACTIONS, GET_AUTHENTICATED_USER } from "../../../graphql/queries/user.query";

const Cards = () => {

	const { data, loading, error } = useQuery(GET_TRANSACTIONS);
	const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

	const { data: getUserAndTransactionsData } = useQuery(GET_USER_AND_TRANSACTIONS, { variables: { userId: authUser?.authUser?._id}});
	console.log("data", getUserAndTransactionsData)


	if(error) return <p>Error: {error.message}</p>
	if(loading) return <p>Loading...</p>
	
	
	//TODO => ADD RELATIONSHIPS
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10 text-gray-100'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{
					!loading && data.transactions.map((transaction) => (
						<Card key={transaction._id} transaction={transaction} authUser={authUser?.authUser} />
					))
				}
			</div>
			{
				!loading && data?.transactions?.length === 0 && (
					<p className="text-2xl font-bold text-center w-full text-gray-100">No transaction history found!</p>
				)
			}
		</div>
	);
};
export default Cards;