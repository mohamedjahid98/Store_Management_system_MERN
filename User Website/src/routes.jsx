import { Home, Profile, SignIn, SignUp } from "@/pages";
import Category from "./pages/category";

    const ID = localStorage.getItem('ID');
export const routes = [
  
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile/:id",    
    href: `/profile/${ID}`,
    element: <Profile />,
  },
  {
    name: "category",
    path: "/category",
    element: <Category />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
