/* Helpers shared by the sport rule files. Each sport file sets window.SPORT for js/rally.js. */
const RallyRules = {
  other: (s) => (s === "a" ? "b" : "a"),
  // first to `target`, ahead by 2
  winBy2: (score, target) => ["a", "b"].find((s) => score[s] >= target && score[s] - score[s === "a" ? "b" : "a"] >= 2) || null,
  bestText: (n, unit) => (n === 1 ? `1 ${unit}` : `${n} ${unit} ${Math.ceil(n / 2)} 勝`),
  pair: (single) => single ? { a: "選手 A", b: "選手 B" } : { a: "選手 A / 選手 C", b: "選手 B / 選手 D" },
};
