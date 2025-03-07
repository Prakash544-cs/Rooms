// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

// Assign global TextEncoder
global.TextEncoder = TextEncoder as typeof global.TextEncoder;

// Assign global TextDecoder safely
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = NodeTextDecoder as unknown as typeof global.TextDecoder;
}

