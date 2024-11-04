import { GoGoal } from "react-icons/go";
import { GrCloud } from "react-icons/gr";

import {
  IoIosStats,
  IoIosSettings,
  IoIosPerson,
  IoIosPersonAdd,
  IoIosEyeOff,
  IoIosLogIn,
  IoIosLogOut,
} from "react-icons/io";
import { FaChartBar, FaCalendarAlt, FaUsersCog } from "react-icons/fa";

import image1 from "../assets/image1.jpg";

export const links = [
  {
    href: "/",
    icon: IoIosLogOut,
    text: "Sign Up",
  },
];

export const employeesData = [
  {
    title: "Total Employees",
    icon: IoIosPerson,
    count: 200,
    bgColor: "bg-blue-100",
  },

  {
    title: "One Leave",
    icon: IoIosEyeOff,
    count: 15,
    bgColor: "bg-blue-100",
  },

  {
    title: "New Joinee",
    icon: IoIosPersonAdd,
    count: 25,
    bgColor: "bg-yellow-100",
  },
];

export const shortcutLink = [
  {
    title: "Goals",
    icon: GoGoal,
  },

  {
    title: "Plan",
    icon: GrCloud,
  },

  {
    title: "Stats",
    icon: IoIosStats,
  },

  {
    title: "Setting",
    icon: IoIosSettings,
  },
];

export const users = [
  {
    name: "Robert Fox",
    country: "USA",
    role: "python Developer",
    image: image1,
    bgColor: "bg-yellow-100",
  },
];
