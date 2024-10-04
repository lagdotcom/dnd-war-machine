type FatigueResult = "N" | "M" | "S" | "Rout";
type LocationResult =
  | "F"
  | "R"
  | "R+1"
  | "R+2"
  | "R+3"
  | "F+1"
  | "F+3"
  | "F+5"
  | "Rout";

type AttackResult = [
  winnerCasualties: number,
  loserCasualties: number,
  winnerFatigue: FatigueResult,
  loserFatigue: FatigueResult,
  winnerLocation: LocationResult,
  loserLocation: LocationResult,
];

export function getAttackResults(diff: number): AttackResult {
  if (diff < 9) return [0, 10, "N", "N", "F", "R"];
  if (diff < 16) return [0, 20, "N", "N", "F", "R"];
  if (diff < 25) return [10, 20, "N", "M", "F", "R"];
  if (diff < 31) return [10, 30, "N", "M", "F", "R+1"];
  if (diff < 39) return [20, 40, "M", "S", "R", "R"];
  if (diff < 51) return [0, 30, "N", "S", "F", "R+2"];
  if (diff < 64) return [20, 50, "M", "S", "F+1", "R+3"];
  if (diff < 81) return [30, 60, "M", "S", "F+1", "R+3"];
  if (diff < 91) return [10, 50, "N", "S", "F+3", "R+2"];
  if (diff < 101) return [0, 30, "N", "Rout", "F+3", "Rout"];
  if (diff < 121) return [20, 70, "N", "Rout", "F+3", "Rout"];
  if (diff < 151) return [10, 70, "N", "Rout", "F+3", "Rout"];
  return [10, 100, "N", "Rout", "F+5", "Rout"];
}

export enum Tactics {
  Overrun = 1,
  Attack,
  Envelop,
  Trap,
  Hold,
  Withdraw,
}
export const TacticsNames: (keyof typeof Tactics)[] = [
  "Overrun",
  "Attack",
  "Envelop",
  "Trap",
  "Hold",
  "Withdraw",
];

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
): [casualtiesMod: number, brMod: number] {
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
