import { isValidInput } from 'helpers';

describe('isValidInput helper', () => {
  it.each([
    [false, '<script>alert("XSS")</script>'],
    [false, '<div>Hello</div>'],
    [false, 'Hello $world'],
    [false, 'Hello <world>'],
    [false, 'Hello >world<'],
    [false, 'Hello <script>alert("XSS")</script> world <div>'],
    [true, 'Hello world'],
    [true, 'This is a test'],
    [true, '12345_67890'],
    [true, ''],
  ])('should return %s for input %s', (expected, input) => {
    expect(isValidInput(input)).toBe(expected);
  });
});
