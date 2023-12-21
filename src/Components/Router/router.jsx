import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Shared/Home/Home";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registeration/Registration";
import Profile from "../Authentication/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Tasks from "../Tasks/Tasks";
import Projects from "../Projects/Projects";
import Calendar from "../Calendar/Calendar";
import Support from "../Support/Support";
import Dashboard from "./Dashboard";
import CreateNewTasks from "../DashBoard/CreateNewTasks/CreateNewTasks";
import PreviousTask from "../DashBoard/PreviousTask";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            }, {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Registration />,
            },
            {
                path: "/tasks",
                element: <PrivateRoute><Tasks /></PrivateRoute>,
            },
            {
                path: "/projects",
                element: <PrivateRoute><Projects /></PrivateRoute>,
            },
            {
                path: "/support",
                element: <PrivateRoute><Support /></PrivateRoute>,
            },
            {
                path: "/calendar",
                element: <Calendar />,
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
              {
                path: 'createNewTasks',
                element: <PrivateRoute><CreateNewTasks></CreateNewTasks></PrivateRoute>
              },
              {
                path: 'previoustask',
                element: <PrivateRoute><PreviousTask></PreviousTask></PrivateRoute>
              },
            //   {
            //     path: 'myDonationCampaigns',
            //     element: <PrivateRoute><MyDonationCampaigns></MyDonationCampaigns></PrivateRoute>
            //   },
            //   {
            //     path: 'createDonation',
            //     element: <PrivateRoute><CreateDonation></CreateDonation></PrivateRoute>
            //   },
            //   {
            //     path: 'paymenthistroy',
            //     element: <PaymentHistory></PaymentHistory>
            //   },
            //   {
            //     path: 'adoptionrequest',
            //     element: <MyAdoptionRequest></MyAdoptionRequest>
            //   },

            //   // admin routes
            //   {
            //     path: 'allPets',
            //     element: <Adminroute><AllPets></AllPets></Adminroute>
            //   },
            //   {
            //     path: 'allusers',
            //     element: <Adminroute><AllUser></AllUser></Adminroute>
            //   },
            //   {
            //     path: 'alldonationcampaigns',
            //     element: <Adminroute><Alldonationcampaigns></Alldonationcampaigns></Adminroute>
            //   },
            //   {
            //     path: 'updateItems/:id',
            //     element: <PrivateRoute><UpdateItems></UpdateItems></PrivateRoute>,
            //     loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/pet/${params.id}`)
            //   },
            //   {
            //     path: 'updateCampaigns/:id',
            //     element: <PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
            //     loader: ({ params }) => fetch(`https://11-23-2023-pet-adoption-server.vercel.app/campaigns/${params.id}`)
            //   }
        ]
    }
]);