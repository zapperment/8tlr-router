/// <reference path="midi"/>

interface MidiMessageRouterResult {
  inputChannel: number;
  outputPortIndex: number;
  outputChannel: number;
}

type MidiMessageRouter = (
  midiMessage: MidiMessage,
) => MidiMessageRouterResult | null;
