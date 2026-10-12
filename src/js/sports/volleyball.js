/* Volleyball (FIVB 2025–2028 rules). Rally scoring: every rally is a point and the winner serves next.
   Indoor: sets to 25, deciding 5th set to 15, win by 2, no cap; 2 timeouts of 30 s per set; 3 min between sets;
   change courts after each set and in the deciding set when the leading team reaches 8.
   Beach: sets to 21, 3rd set to 15; change sides every 7 points (every 5 in the 3rd set); 1 timeout per set; 1 min between sets. */
window.SPORT = (() => {
  const { other, winBy2, bestText } = RallyRules;
  const PRE = { indoor: { type: "indoor", best: 5, pts: 25, dec: 15, rests: true }, beach: { type: "beach", best: 3, pts: 21, dec: 15, rests: true } };
  const target = (S, x) => (x.deciding && S.cfg.best > 1 ? S.cfg.dec : S.cfg.pts);
  return {
    id: "volleyball", title: "排球記分板", unit: "局", unitShort: "S", maxPts: 99, pads: "volleyball",
    defaults: { ...PRE.indoor },
    types: [["indoor", "室內"], ["beach", "沙灘"]],
    preset: (t) => ({ ...PRE[t] }),
    presetNote: (c) => `${bestText(c.best, "局")}、每局 ${c.pts} 分、決勝局 ${c.dec} 分`,
    names: (t) => (t === "beach" ? { a: "隊伍 A", b: "隊伍 B" } : { a: "主隊", b: "客隊" }),
    settings: [
      { key: "type", kind: "seg", label: "室內 / 沙灘", help: "切換時會套用該賽制的預設分數", options: [["indoor", "室內 6 人"], ["beach", "沙灘 2 人"]] },
      { key: "best", kind: "seg", label: "局數", help: "先贏過半的隊伍獲勝", options: [[1, "1 局"], [3, "3 局 2 勝"], [5, "5 局 3 勝"]] },
      { key: "pts", kind: "num", label: "每局分數", help: "到這個分數且領先 2 分就贏，沒有封頂", min: 5, max: 50, suffix: "分" },
      { key: "dec", kind: "num", label: "決勝局分數", help: "室內第 5 局、沙灘第 3 局", min: 5, max: 50, suffix: "分", when: (c) => c.best > 1 },
      { key: "rests", kind: "switch", label: "局間休息計時", help: "室內 3 分鐘、沙灘 1 分鐘" },
    ],
    rule: (c) => `${bestText(c.best, "局")} · ${c.pts} 分${c.best > 1 ? ` · 決勝 ${c.dec}` : ""}`,
    best: (c) => c.best,
    startUnit(S, first, w, x, reset) {
      S.score = { a: 0, b: 0 }; S.x.mid = false;
      if (reset) return;
      S.x.first = first ? "a" : other(S.x.first); // the other team serves first in the next set
      S.server = S.x.first;
    },
    rally(S, s) { S.score[s] += 1; S.server = s; },
    toggleServe(S) { S.server = other(S.server); if (S.score.a + S.score.b === 0) S.x.first = S.server; },
    settle(S, s, x) {
      const sum = S.score.a + S.score.b;
      if (S.cfg.type === "beach") {
        const step = x.deciding && S.cfg.best > 1 ? 5 : 7;
        return sum > 0 && sum % step === 0 ? [{ type: "swap", text: `換場：每 ${step} 分交換場地` }] : [];
      }
      const half = Math.ceil(S.cfg.dec / 2);
      if (x.deciding && S.cfg.best > 1 && !S.x.mid && Math.max(S.score.a, S.score.b) >= half) { S.x.mid = true; return [{ type: "swap", text: `換場：決勝局領先隊伍先到 ${half} 分` }]; }
      return [];
    },
    unitWinner: (S, x) => winBy2(S.score, target(S, x)),
    unitResult: (S, w) => ({ a: S.score.a, b: S.score.b, w }),
    unitLabel: (u) => `${u.a}-${u.b}`,
    fmt: (S, s, v) => String(v),
    betweenUnits(S, w, x) {
      const sec = S.cfg.type === "beach" ? 60 : 180;
      return [{ type: "swap" }, { type: "rest", sec, tag: `第 ${x.idx} 局結束`, title: `${S.names[w]} 拿下這局`, detail: `局間休息 ${sec / 60} 分鐘，雙方換場。第 ${x.idx + 1} 局由 ${S.names[S.server]} 先發球。` }];
    },
    timeouts: (c) => ({ n: c.type === "beach" ? 1 : 2, sec: 30, per: "unit" }),
    serve: (S) => ({ side: S.server, text: "" }),
    restButton: (S) => (S.score.a + S.score.b === 0 && S.units.length ? { sec: S.cfg.type === "beach" ? 60 : 180, tag: "局間休息" } : { sec: 30, tag: "暫停", title: "暫停 30 秒" }),
    help: [
      "每一球按贏球那一邊的「+1 得分」（或點一下比分大數字），發球權會自動交給得分的隊伍。換發球時記得輪轉。按錯就按「復原」。",
      "室內排球：每局 25 分、決勝局 15 分，都要領先 2 分才贏，沒有封頂。每隊每局 2 次暫停各 30 秒，點名字下方的圓點就會開始計時。每局結束換場，決勝局領先隊伍先到 8 分時也換場。",
      "沙灘排球：每局 21 分、第 3 局 15 分。兩隊分數加起來每 7 分換邊（第 3 局每 5 分），每局 1 次暫停。",
    ],
  };
})();
