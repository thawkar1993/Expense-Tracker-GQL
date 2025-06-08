import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from 'react-hot-toast';
import { useMutation, useQuery } from "@apollo/client";

import Cards from "../components/ui/molecules/Cards";
import TransactionForm from "../components/ui/TransactionForm";

import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query"
import { useEffect, useState } from "react";


// const chartData = {
// 	labels: ["Saving", "Expense", "Investment"],
// 	datasets: [
// 		{
// 			label: "%",
// 			data: [13, 8, 3],
// 			backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
// 			borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
// 			borderWidth: 1,
// 			borderRadius: 30,
// 			spacing: 10,
// 			cutout: 130,
// 		},
// 	],
// };

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

	const [ logout , { loading, client }] = useMutation( LOGOUT, { refetchQueries: ['GetAuthenticatedUser']});

	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
			{
				label: "$",
				data: [],
				backgroundColor: [],
				borderColor: [],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	});
	
	useEffect(()=>{
		if(data?.categoryStatistics){
			const categories = data?.categoryStatistics.map((stat)=> stat.category); //["expense", "saving"]
			const totalAmounts = data?.categoryStatistics.map((stat)=> stat.totalAmount);//[1000, 2000]

			const backgroundColor = []
			const borderColor = []

			categories.forEach(category => {
				if(category === "saving"){
					backgroundColor.push("rgba(75, 192, 192)");
					borderColor.push("rgba(75, 192, 192)")
				}else if(category === "expense"){
					backgroundColor.push("rgba(255, 99, 132)");
					borderColor.push("rgba(255, 99, 132)")
				}else if(category === "investment"){
					backgroundColor.push("rgba(54, 162, 235)");
					borderColor.push("rgba(54, 162, 235)")
				}
			})

			setChartData(prev => ({
				labels: categories,
				datasets: [
					{
						...prev.datasets[0],
						data: totalAmounts,
						backgroundColor: backgroundColor,
						borderColor: borderColor,
					}
				]
			}))
		}

	}, [data])
	const handleLogout = async () => {
		console.log("Logging out...");
		try{
			await logout();
			/*	Clear the Apollo Client Cache FROM THE DOCS */
			client.resetStore();
		}catch(error){
			console.error("Error",error.message);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track wisely
					</p>
					<img
						src={authUserData?.authUser?.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer text-gray-100' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					{data?.categoryStatistics.length > 0 && (
						<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
							<Doughnut data={chartData} />
						</div>
					)}
					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;