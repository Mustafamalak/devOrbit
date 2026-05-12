import {
  Activity,
  BarChart3,
  Boxes,
  LayoutDashboard,
  Orbit,
  Target,
} from "lucide-react";

export const commandNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Mission control overview",
  },
  {
    label: "Orbit Map",
    href: "/orbit",
    icon: Orbit,
    description: "Interactive 3D project universe",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Boxes,
    description: "Project fleet health and progress",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: Target,
    description: "Animated sprint Kanban radar",
  },
  {
    label: "Activity",
    href: "/activity",
    icon: Activity,
    description: "Engineering timeline and deployments",
  },
  {
    label: "Insights",
    href: "/insights",
    icon: BarChart3,
    description: "Productivity analytics cockpit",
  },
];