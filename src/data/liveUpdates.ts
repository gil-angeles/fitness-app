export interface LiveUpdate {
  id: number;
  avatar: string;
  status: string;
  name: string;
  timestamp: string;
}

export const liveUpdates: LiveUpdate[] = [
  {
    id: 1,
    avatar: "/avatars/3.png",
    status: "Completed my 5k run today!",
    name: "Peter Parker",
    timestamp: "2025-05-30 09:12 AM",
  },
  {
    id: 2,
    avatar: "/avatars/2.png",
    status: "Feeling great after a long plank session.",
    name: "Clark Kent",
    timestamp: "2025-05-30 08:45 AM",
  },
  {
    id: 3,
    avatar: "/avatars/1.png",
    status: "Burpees are brutal but worth it!",
    name: "Diana Prince",
    timestamp: "2025-05-29 06:23 PM",
  },
  {
    id: 4,
    avatar: "/avatars/5.png",
    status: "Cycling 10 miles done. Let's go!",
    name: "Bruce Wayne",
    timestamp: "2025-05-29 05:30 PM",
  },
  {
    id: 5,
    avatar: "/avatars/4.png",
    status: "Rest day today. Hydration and stretching.",
    name: "Natasha Romanoff",
    timestamp: "2025-05-29 02:14 PM",
  },
];
