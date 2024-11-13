import { Main } from './layout/Main';
import { Discussion } from './layout/Discussion';
import { Search } from './pages/Search';
import { Pins } from './organisms/Pins';
import { redirect } from 'react-router-dom';
import { client } from '../core'

import {
  createHashRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";


const router = createHashRouter([
  { 
    element: <Main><Outlet /></Main>,
    children: [
      {
        path: "/:channelId",
        loader: async ({ params }) => {
          const {channelId} = params;
          if(!channelId) throw new Error('Page not found');
          const channel = await client.api.getChannelById(channelId);
          if (!channel) throw new Error('Page not found');
          return null;
        },
        element: <Discussion />,
        errorElement: <div>Page not found</div>
      },
      {
        path: "/:channelId/search",
        element: <Discussion><Search /></Discussion>,
      },
      {
        path: "/:channelId/pins",
        element: <Discussion><Pins /></Discussion>,
      },
      {
        path: "/:channelId/t/:parentId",
        element: <Discussion/>,
      },
    ]
  },
  {
    path: "/*",
    loader: async () => {
      const {mainChannelId} = await client.api.getUserConfig()
      return redirect(`/${mainChannelId}`);
    },
  },
]);

export const Router= () => {
  return (
    <RouterProvider router={router} />
  );
};

