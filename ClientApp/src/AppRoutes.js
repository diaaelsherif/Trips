import Trips from "./components/Trip/Trips";

const AppRoutes = [
	{
		index: true,
		element: <Trips />
	},
	{
		path: '/trips',
		element: <Trips />
	}
];

export default AppRoutes;
