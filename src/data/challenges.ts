import cycling from "../assets/cycling.png";
import planks from "../assets/planks.png";
import running from "../assets/running.png";
import swimming from "../assets/swimming.png";
import weights from "../assets/weights.png";
import yoga from "../assets/yoga.png";
import burpees from "../assets/burpees.png";
import calorie from "../assets/calorie.png";

export type GoalType = "distance" | "time" | "amount" | "objective";

export type DailyGoal = {
  day: number;
  description: string;
};

export type Challenge = {
  title: string;
  description: string;
  image: string;
  goalType: GoalType;
  dailyGoals: DailyGoal[];
  finalObjective: number;
};

export const challenges: Challenge[] = [
  {
    title: "Cycling",
    description: "Ride 50 kilometers this week.",
    finalObjective: 50,
    image: cycling,
    goalType: "distance",
    dailyGoals: [
      { day: 1, description: "Cycle 10km" },
      { day: 2, description: "Cycle 8km" },
      { day: 3, description: "Cycle 7km" },
      { day: 4, description: "Cycle 10km" },
      { day: 5, description: "Cycle 15km" },
    ],
  },
  {
    title: "Planks",
    description: "Hold a plank 5 minutes every day for a total of 70 min.",
    finalObjective: 70,
    image: planks,
    goalType: "time",
    dailyGoals: [
      { day: 1, description: "Plank 5 minutes" },
      { day: 2, description: "Plank 5 minutes" },
      { day: 3, description: "Plank 5 minutes" },
      { day: 4, description: "Plank 5 minutes" },
      { day: 5, description: "Plank 5 minutes" },
      { day: 6, description: "Plank 5 minutes" },
      { day: 7, description: "Plank 5 minutes" },
      { day: 8, description: "Plank 5 minutes" },
      { day: 9, description: "Plank 5 minutes" },
      { day: 10, description: "Plank 5 minutes" },
      { day: 11, description: "Plank 5 minutes" },
      { day: 12, description: "Plank 5 minutes" },
      { day: 13, description: "Plank 5 minutes" },
      { day: 14, description: "Plank 5 minutes" },
    ],
  },
  {
    title: "Running",
    description: "Run a total of 38 kilometers.",
    finalObjective: 38,
    image: running,
    goalType: "distance",
    dailyGoals: [
      { day: 1, description: "Run 4km" },
      { day: 2, description: "Run 5km" },
      { day: 3, description: "Run 4km" },
      { day: 4, description: "Run 7km" },
      { day: 5, description: "Run 6km" },
      { day: 6, description: "Run 4km" },
      { day: 7, description: "Run 5km" },
      { day: 8, description: "Run 3km" },
    ],
  },
  {
    title: "Swimming",
    description: "Swim daily.",
    finalObjective: 2100,
    image: swimming,
    goalType: "distance",
    dailyGoals: [
      { day: 1, description: "Swim 100m" },
      { day: 2, description: "Swim 150m" },
      { day: 3, description: "Swim 200m" },
      { day: 4, description: "Swim 250m" },
      { day: 5, description: "Swim 300m" },
      { day: 6, description: "Swim 350m" },
    ],
  },
  {
    title: "Weight Lifting",
    description: "Complete training sessions.",
    finalObjective: 5,
    image: weights,
    goalType: "objective",
    dailyGoals: [
      { day: 1, description: "Lift upper body" },
      { day: 2, description: "Lift lower body" },
      { day: 3, description: "Lift full body" },
      { day: 4, description: "Lift core focus" },
      { day: 5, description: "Lift arms focus" },
    ],
  },
  {
    title: "Yoga",
    description: "Do 7 yoga sessions each day.",
    finalObjective: 7,
    image: yoga,
    goalType: "objective",
    dailyGoals: [
      { day: 1, description: "Basics" },
      { day: 2, description: "Balancing" },
      { day: 3, description: "Stretching" },
      { day: 4, description: "Breathing" },
      { day: 5, description: "Vinyasa" },
      { day: 6, description: "Meditation" },
      { day: 7, description: "Relaxation" },
    ],
  },
  {
    title: "Burpees",
    description: "Do 100 burpees by the end of the week.",
    finalObjective: 100,
    image: burpees,
    goalType: "amount",
    dailyGoals: [
      { day: 1, description: "Do 10 burpees" },
      { day: 2, description: "Do 15 burpees" },
      { day: 3, description: "Do 20 burpees" },
      { day: 4, description: "Do 20 burpees" },
      { day: 5, description: "Do 25 burpees" },
      { day: 6, description: "Do 10 burpees" },
    ],
  },
  {
    title: "Calorie Burn",
    description: "Burn 5000 calories this week.",
    finalObjective: 5000,
    image: calorie,
    goalType: "amount",
    dailyGoals: [
      { day: 1, description: "Burn 1000 calories" },
      { day: 2, description: "Burn 1000 calories" },
      { day: 3, description: "Burn 1000 calories" },
      { day: 4, description: "Burn 1000 calories" },
      { day: 5, description: "Burn 1000 calories" },
    ],
  },
];
