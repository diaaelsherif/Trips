import Home from "./components/Home";
import Create from "./components/Trip/Create";
import Trips from "./components/Trip/Trips";

const AppRoutes = [
	{
		index: true,
		element: <Home />
	},
	{
		path: '/trips',
		element: <Trips />
	},
	{
		path: '/create',
		element: <Create />
	}
];

export default AppRoutes;
