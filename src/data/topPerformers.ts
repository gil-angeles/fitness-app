export interface Performer {
  name: string;
  progress: number;
  avatar: string;
}

export interface ChallengeTopPerformers {
  challengeKey: string;
  title: string;
  performers: Performer[];
}

export const topPerformersData: ChallengeTopPerformers[] = [
  {
    challengeKey: "running",
    title: "Run 30k",
    performers: [
      { name: "Tom", progress: 100, avatar: "/avatars/3.png" },
      { name: "Jerry", progress: 95, avatar: "/avatars/1.png" },
      { name: "Scooby", progress: 90, avatar: "/avatars/5.png" },
      { name: "Shaggy", progress: 85, avatar: "/avatars/2.png" },
      { name: "Velma", progress: 80, avatar: "/avatars/4.png" },
    ],
  },
  {
    challengeKey: "burpees",
    title: "Burpees Challenge",
    performers: [
      { name: "Bugs", progress: 100, avatar: "/avatars/4.png" },
      { name: "Daffy", progress: 98, avatar: "/avatars/1.png" },
      { name: "Tweety", progress: 93, avatar: "/avatars/5.png" },
      { name: "Sylvester", progress: 90, avatar: "/avatars/2.png" },
      { name: "Elmer", progress: 88, avatar: "/avatars/3.png" },
    ],
  },
  {
    challengeKey: "cycling",
    title: "Cycle 100 Miles",
    performers: [
      { name: "Mickey", progress: 100, avatar: "/avatars/2.png" },
      { name: "Donald", progress: 97, avatar: "/avatars/5.png" },
      { name: "Goofy", progress: 94, avatar: "/avatars/1.png" },
      { name: "Pluto", progress: 92, avatar: "/avatars/3.png" },
      { name: "Minnie", progress: 89, avatar: "/avatars/4.png" },
    ],
  },
  {
    challengeKey: "weightlifting",
    title: "Weightlifting Challenge",
    performers: [
      { name: "Homer", progress: 100, avatar: "/avatars/5.png" },
      { name: "Bart", progress: 96, avatar: "/avatars/3.png" },
      { name: "Lisa", progress: 91, avatar: "/avatars/2.png" },
      { name: "Marge", progress: 87, avatar: "/avatars/4.png" },
      { name: "Maggie", progress: 85, avatar: "/avatars/1.png" },
    ],
  },
  {
    challengeKey: "planks",
    title: "Plank Every Day",
    performers: [
      { name: "Dexter", progress: 100, avatar: "/avatars/1.png" },
      { name: "Sylvester", progress: 97, avatar: "/avatars/4.png" },
      { name: "Felix", progress: 93, avatar: "/avatars/2.png" },
      { name: "Taz", progress: 90, avatar: "/avatars/5.png" },
      { name: "Woody", progress: 88, avatar: "/avatars/3.png" },
    ],
  },
];
