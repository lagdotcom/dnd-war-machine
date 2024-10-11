import { Percentage } from "./flavours";
import { Fatigue } from "./types";

export type FatigueResult = Fatigue | "Rout";
export type LocationResult =
  | { type: "forward"; bonus: number }
  | { type: "retreat"; bonus: number }
  | { type: "rout" };

type AttackResult = [
  winnerCasualties: Percentage,
  loserCasualties: Percentage,
  winnerFatigue: FatigueResult,
  loserFatigue: FatigueResult,
  winnerLocation: LocationResult,
  loserLocation: LocationResult,
];

export function getAttackResults(diff: number): AttackResult {
  if (diff < 9)
    return [
      0,
      10,
      Fatigue.None,
      Fatigue.None,
      { type: "forward", bonus: 0 },
      { type: "retreat", bonus: 0 },
    ];
  if (diff < 16)
    return [
      0,
      20,
      Fatigue.None,
      Fatigue.None,
      { type: "forward", bonus: 0 },
      { type: "retreat", bonus: 0 },
    ];
  if (diff < 25)
    return [
      10,
      20,
      Fatigue.None,
      Fatigue.Moderate,
      { type: "forward", bonus: 0 },
      { type: "retreat", bonus: 0 },
    ];
  if (diff < 31)
    return [
      10,
      30,
      Fatigue.None,
      Fatigue.Moderate,
      { type: "forward", bonus: 0 },
      { type: "retreat", bonus: 1 },
    ];
  if (diff < 39)
    return [
      20,
      40,
      Fatigue.Moderate,
      Fatigue.Serious,
      { type: "retreat", bonus: 0 },
      { type: "retreat", bonus: 0 },
    ];
  if (diff < 51)
    return [
      0,
      30,
      Fatigue.None,
      Fatigue.Serious,
      { type: "forward", bonus: 0 },
      { type: "retreat", bonus: 2 },
    ];
  if (diff < 64)
    return [
      20,
      50,
      Fatigue.Moderate,
      Fatigue.Serious,
      { type: "forward", bonus: 1 },
      { type: "retreat", bonus: 3 },
    ];
  if (diff < 81)
    return [
      30,
      60,
      Fatigue.Moderate,
      Fatigue.Serious,
      { type: "forward", bonus: 1 },
      { type: "retreat", bonus: 3 },
    ];
  if (diff < 91)
    return [
      10,
      50,
      Fatigue.None,
      Fatigue.Serious,
      { type: "forward", bonus: 3 },
      { type: "retreat", bonus: 2 },
    ];
  if (diff < 101)
    return [
      0,
      30,
      Fatigue.None,
      "Rout",
      { type: "forward", bonus: 3 },
      { type: "rout" },
    ];
  if (diff < 121)
    return [
      20,
      70,
      Fatigue.None,
      "Rout",
      { type: "forward", bonus: 3 },
      { type: "rout" },
    ];
  if (diff < 151)
    return [
      10,
      70,
      Fatigue.None,
      "Rout",
      { type: "forward", bonus: 3 },
      { type: "rout" },
    ];
  return [
    10,
    100,
    Fatigue.None,
    "Rout",
    { type: "forward", bonus: 5 },
    { type: "rout" },
  ];
}

export enum Tactics {
  Overrun = 1,
  Attack,
  Envelop,
  Trap,
  Hold,
  Withdraw,
}

type TacticResult =
  | "--"
  | "C1"
  | "C2"
  | "C3"
  | "C-1"
  | "-10"
  | "-20"
  | "-25"
  | "+10"
  | "+20";

export const TacticsResults: ("NC" | TacticResult[])[][] = [
  [
    ["C2", "C2"],
    ["-20", "C2"],
    ["C1", "+10"],
    ["+20", "C2"],
    ["-25", "C2"],
    ["C3", "+20"],
  ],
  [
    ["C2", "-20"],
    ["C1", "C1"],
    ["-10", "C1"],
    ["+10", "C1"],
    ["C-1", "--"],
    ["C2", "+10"],
  ],
  [
    ["+10", "C1"],
    ["C1", "-10"],
    ["--", "--"],
    ["-20", "C-1"],
    ["C2", "+20"],
    ["C-1", "+10"],
  ],
  [
    ["C2", "+20"],
    ["C1", "+10"],
    ["C-1", "-20"],
    ["--", "--"],
    ["C-1", "-20"],
    ["C-1", "C-1"],
  ],
  [["C2", "-25"], ["--", "C-1"], ["+20", "C2"], ["-20", "C-1"], "NC", "NC"],
  [["+20", "C3"], ["+10", "C2"], ["+10", "C-1"], ["C-1", "C-1"], "NC", "NC"],
] as const;

export function getAttackEffects(
  r: TacticResult,
): [casualtiesMod: Percentage, brMod: number] {
  switch (r) {
    case "--":
      return [0, 0];

    case "C-1":
      return [-10, 0];
    case "C1":
      return [10, 0];
    case "C2":
      return [20, 0];
    case "C3":
      return [30, 0];

    case "-25":
      return [0, -25];
    case "-20":
      return [0, -20];
    case "-10":
      return [0, -10];
    case "+10":
      return [0, 10];
    case "+20":
      return [0, 20];
  }
}
