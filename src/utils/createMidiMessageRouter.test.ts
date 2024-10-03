import type { MidiMessage, Output } from "midi";
import { createMidiMessageRouter, debug } from "./createMidiMessageRouter";

const outputs: Output[] = new Array(4).fill(null).map(() => ({
  sendMessage: vi.fn(),
  closePort: vi.fn(),
  getPortCount: vi.fn(),
  getPortName: vi.fn(),
  openPort: vi.fn(),
  openVirtualPort: vi.fn(),
  send: vi.fn(),
}));

const NOTE_ON_CH1_C2_V100: MidiMessage = [0x90, 0x30, 0x64];
const NOTE_ON_CH9_C2_V100: MidiMessage = [0x98, 0x30, 0x64];

vi.mock("debug", () => ({ default: () => vi.fn() }));

describe("The router function created by createMidiMessageRouter", () => {
  let midiMessageRouter: MidiMessageRouter;
  beforeEach(() => {
    midiMessageRouter = createMidiMessageRouter(outputs);
  });

  describe("when no sketch switch MIDI message has been received previously", () => {
    describe("and it receives a MIDI message", () => {
      let result: MidiMessageRouterResult | null;
      beforeEach(() => {
        result = midiMessageRouter(NOTE_ON_CH1_C2_V100);
      });

      it("routes incoming MIDI messages to the default output port", () => {
        expect(outputs[0].sendMessage).toHaveBeenCalledWith(
          NOTE_ON_CH1_C2_V100,
        );
      });

      it("returns the correct result", () => {
        expect(result).toMatchInlineSnapshot(`
          {
            "inputChannel": 0,
            "outputChannel": 0,
            "outputPortIndex": 0,
          }
        `);
      });
    });
    describe("and it receives a MIDI message on a channel greater than 8", () => {
      let result: MidiMessageRouterResult | null;
      beforeEach(() => {
        result = midiMessageRouter(NOTE_ON_CH9_C2_V100);
      });

      it("logs an error message", () => {
        expect(debug).toHaveBeenCalledWith(
          "Invalid data - received MIDI message on channel 9",
        );
      });

      it("does not route the message to any port", () => {
        expect(outputs[0].sendMessage).not.toHaveBeenCalled();
      });

      it("returns null", () => {
        expect(result).toBeNull();
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
