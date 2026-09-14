import { defineSound, ensureReady } from "@web-kits/audio";

type Def = Parameters<typeof defineSound>[0];

const SUCCESS_3PE23 = {
  layers: [
    {
      source: { type: "sine", frequency: 880 },
      envelope: { attack: 0.004, decay: 0.09, sustain: 0, release: 0, curve: "ramp" },
      gain: 0.094,
    },
    {
      source: { type: "sine", frequency: 1108.73 },
      envelope: { attack: 0.004, decay: 0.1, sustain: 0, release: 0, curve: "ramp" },
      gain: 0.094,
      delay: 0.104,
    },
    {
      source: { type: "sine", frequency: 1318.51 },
      envelope: { attack: 0.004, decay: 0.18, sustain: 0, release: 0, curve: "ramp" },
      gain: 0.11,
      delay: 0.143,
    },
  ],
} satisfies Def;

const TRANSITION_A3FCY = {
  source: { type: "triangle", frequency: { start: 350, end: 550 } },
  envelope: { attack: 0.008, decay: 0.18, sustain: 0, release: 0.07 },
  gain: 0.114,
  filter: { type: "lowpass", frequency: 1475.1110650952883, Q: 4.749417578888295 },
} satisfies Def;

function makePlayer(def: Def) {
  let fn: ReturnType<typeof defineSound> | null = null;
  let last = 0;
  return () => {
    const now = performance.now();
    if (now - last < 800) return;
    last = now;
    if (!fn) fn = defineSound(def);
    ensureReady()
      .then(() => {
        fn!();
      })
      .catch(() => {});
  };
}

export const playAvatarPop = makePlayer(SUCCESS_3PE23);
export const playViewerOpen = makePlayer(TRANSITION_A3FCY);
