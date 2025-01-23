// This is sample data.

import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareActivity,
  SquareTerminal,
  Users,
} from "lucide-react";

export const data = {
  user: {
    name: "Monitech",
    email: "m@example.com",
    avatar: "",
  },
  overview: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: SquareActivity,
    },
    {
      title: "Customers",
      url: "/dashboard/customer",
      icon: Users,
    },
  ],
  teams: [
    {
      name: "ASafeDigital",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",

      plan: "Startup",
    },
    {
      name: "Aws Corp.",

      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Cases",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Closed Case",
          url: "#",
        },
        {
          title: "Open Case",
          url: "#",
        },
        {
          title: "Blocked Case",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Complaints",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

// For the graphs
export const percentageSections = [
  { color: "#71CC98", percentage: (61 / 87) * 100 },
  { color: "#FDD757", percentage: (14 / 87) * 100 },
  { color: "#E3595D", percentage: (12 / 87) * 100 },
];

export const nipPercentageSections = {
  nip_inward: [{ color: "#71CC98", percentage: 0.997 * 100 }],
  new_nip_outward: [{ color: "#E3595D", percentage: 0.98 * 100 }],
  new_nip_outward_2: [{ color: "#009CBD", percentage: 0.99 * 100 }],
  naps: [{ color: "#E3595D", percentage: 0.96 * 100 }],
};

export const topCaseSourcesPercentage = {
  kiki: [{ color: "#FF9500", percentage: (246 / 801) * 100 }],
  social_media: [{ color: "#71CC98", percentage: (55 / 801) * 100 }],
  inbound_calls: [{ color: "#004EEB", percentage: (424 / 801) * 100 }],
  email: [{ color: "#E3595D", percentage: (76 / 801) * 100 }],
};

// Dashboard doughnut chart
export const chartData = {
  labels: ["Kiki", "Social Media", "Inbound Calls", "Email"],
  datasets: [
    {
      label: "Top Case Sources",
      data: [246, 55, 424, 76],
      backgroundColor: ["#FF9500", "#71CC98", "#004EEB", "#E3595D"],
    },
  ],
};

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || "";
          const value = context.raw || "";
          return `${label}: ${value}`;
        },
      },
    },
  },
  cutout: "70%",
  maintainAspectRatio: false,
};
