import { vi, expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import '@testing-library/jest-dom/vitest';


expect.extend(matchers);

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

// Mocking window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mocking window.scrollTo
window.scrollTo = vi.fn();
