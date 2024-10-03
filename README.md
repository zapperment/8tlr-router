# 8tlr-router

_Routes MIDI messages from Ableton Live to Reason_

## Installation

You should have an up-to-date version of [Node.js](https://nodejs.org/)
installed. Then you can install _8tlr-router_ with npm:

```
npm install -g 8tlr-router@latest
```

You can confirm the installation worked by checking the version:

```
8tlr-router -V
```

## Usage

Run the _8tlr-router_ by executing it on the command line:

```
8tlr-router
```

By default, the _8tlr-router_ does its job very quietly, i.e. it does not write
a lot of output to the terminal it's running in.

If you want verbose output, run it with a `DEBUG` environment variable set, like
so:

```
DEBUG=* 8tlr-router
```

This will log the processing of every incoming MIDI message.
