import BitrateListener from "../../src/listener/BitrateListener";

let realBitrate = { value: "1.0 Mbps" };
let realBitrate2 = { value: "         150 MBps   " };
let realBitrate3 = { value: " 1.5   bps " };
let fakeBitrate = { value: "1.0 gabps" };
let fakeBitrate2 = { value: "1.zgfa0 bps" };
let fakeBitrate3 = { value: "1.0 " };

describe("Test BitrateListener", () => {
   test("parseBitrate", () => {
      expect(BitrateListener.checkBitrate(realBitrate)).toBe(true);
   });
   test("parseBitrate2", () => {
      expect(BitrateListener.checkBitrate(realBitrate2)).toBe(true);
   });
   test("parseBitrate3", () => {
      expect(BitrateListener.checkBitrate(realBitrate3)).toBe(true);
   });
   test("parseBitrate4", () => {
      expect(BitrateListener.checkBitrate(fakeBitrate)).toBe(false);
   });
   test("parseBitrate5", () => {
      expect(BitrateListener.checkBitrate(fakeBitrate2)).toBe(false);
   });
   test("parseBitrate6", () => {
      expect(BitrateListener.checkBitrate(fakeBitrate3)).toBe(false);
   });
});
