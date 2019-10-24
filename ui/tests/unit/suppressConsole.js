global.console = {
  ...global.console, // get the default values first and overwrite the ones that we want:
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
}
