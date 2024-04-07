import Home from "./components/Home";
import Trips from "./components/Trip/Trips";

const AppRoutes = [
	{
		index: true,
		element: <Home />
	},
	{
		path: '/trips',
		element: <Trips />
	}
];

export default AppRoutes;
