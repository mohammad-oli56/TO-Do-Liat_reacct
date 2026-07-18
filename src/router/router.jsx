import { createBrowserRouter } from "react-router-dom";
import Rootlayout from "../Rootlayout/Rootlayout";
import Task from "../Component/Task";
import Important from "../Component/Importent";
import Completed from "../Component/Complete";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout  />,
    children: [ 
      {
        index: true, 
        element: <Task />
      },
      { 
        path: "important",
        element: <Important />
      },
      { 
        path: "completed",
        element: <Completed />
      }
    ]
  }
]);
