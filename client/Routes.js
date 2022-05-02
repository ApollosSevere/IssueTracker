// Components / Pages
import Manage from "./Pages/Manage/Manage.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import Timeline from "./Pages/Timeline/Timeline.jsx";
import MyTickets from "./Pages/MyTickets/MyTickets.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import AddProject from "./Pages/AddProject/AddProject.jsx";
import { Login, Signup } from "./components/AuthForm/AuthForm";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail.jsx";
import DevAssignments from "./Pages/DevAssignments/DevAssignments.jsx";

const routes = (user = {}) => {
  return [
    /* ---- Main ----- */

    // Pages
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "ni ni-chart-bar-32 text-primary",
      component: Dashboard,
      layout: "/main",
      root: "/main",
      display: true,
    },
    (user.roleName === "Master" || user.roleName === "Admin") && {
      path: "/manage",
      name: "Administration",
      icon: "ni ni-badge text-primary",
      component: Manage,
      layout: "/main",
      root: "/main",
      display: true,
    },
    (user.roleName === "Master" || user.roleName === "Developer") && {
      path: "/devAssignments",
      name: "Assignments",
      icon: "ni ni-calendar-grid-58 text-primary",
      component: DevAssignments,
      layout: "/main",
      root: "/main",
      display: true,
    },
    {
      path: "/projects",
      name: "Projects",
      icon: "ni ni-folder-17 text-primary",
      component: Projects,
      layout: "/main",
      root: "/main",
      display: true,
    },
    {
      path: "/myTickets",
      name: "Tickets",
      icon: "ni ni-paper-diploma text-primary",
      component: MyTickets,
      layout: "/main",
      root: "/main",
      display: true,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: "ni ni-single-02 text-primary",
      component: Profile,
      layout: "/main",
      root: "/main",
      display: true,
    },

    // Sub-Routes
    {
      path: "/projectDetail/:projectId/:ticketId",
      name: "ProjectInfo",
      icon: "ni ni-single-copy-04 text-teal",
      component: ProjectDetail,
      layout: "/main",
      root: "/main",
      display: false,
    },
    {
      path: "/projectDetail/:projectId",
      name: "ProjectInfo",
      icon: "ni ni-single-copy-04 text-teal",
      component: ProjectDetail,
      layout: "/main",
      root: "/main",
      display: false,
    },
    {
      path: "/timeline/:projectId/:ticketId",
      name: "Issue Timeline",
      icon: "ni ni-single-copy-04 text-teal",
      component: Timeline,
      layout: "/main",
      root: "/main",
      display: false,
    },
    {
      path: "/addProject/:projectId",
      name: "Add New Project",
      icon: "ni ni-single-copy-04 text-teal",
      component: AddProject,
      layout: "/main",
      root: "/main",
      display: false,
    },
    {
      path: "/addProject",
      name: "Add New Project",
      icon: "ni ni-single-copy-04 text-teal",
      component: AddProject,
      layout: "/main",
      root: "/main",
      display: false,
    },

    /* ---- Auth ----- */
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth",
      root: "/auth",
      display: false,
    },
    {
      path: "/signup",
      name: "Signup",
      icon: "ni ni-circle-08 text-pink",
      component: Signup,
      layout: "/auth",
      root: "/auth",
      display: false,
    },

    // Default
    {
      path: "/",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth",
      root: "/auth",
      display: false,
    },
  ];
};
export default routes;
