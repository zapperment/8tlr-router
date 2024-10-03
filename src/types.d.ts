/// <reference path="midi"/>

interface MidiMessageRouterResult {
  inputChannel: number;
  outputPortIndex: number;
  outputChannel: number;
  outputMidiMessage: MidiMessage;
}

type MidiMessageRouter = (
  midiMessage: MidiMessage,
) => MidiMessageRouterResult | null;

interface ProgramOptions {
  version?: boolean;
  off?: boolean;
}
