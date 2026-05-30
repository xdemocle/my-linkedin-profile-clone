import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.location
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    href: "http://localhost:3000/",
    pathname: "/",
    search: "",
    hash: "",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
});

// Mock ResizeObserver / IntersectionObserver (jsdom doesn't implement them).
// Use a constructable class so libraries that call `new ResizeObserver()`
// (e.g. embla-carousel) work under vitest 4's spy.
class MockObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}
vi.stubGlobal("ResizeObserver", MockObserver);
vi.stubGlobal("IntersectionObserver", MockObserver);

beforeAll(() => {
  // Reset all mocks before each test suite
  vi.clearAllMocks();
});
