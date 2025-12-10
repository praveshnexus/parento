import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ✅ mock matchMedia (needed for react-hot-toast / MUI / responsive code)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ✅ mock Firestore completely (prevents permission-denied errors)
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),

  getDoc: vi.fn(() =>
    Promise.resolve({
      exists: () => true,
      data: () => ({ name: 'Test User' }),
    })
  ),

  getDocs: vi.fn(() =>
    Promise.resolve({
      docs: [],
    })
  ),

  addDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
  deleteDoc: vi.fn(() => Promise.resolve()),

  onSnapshot: vi.fn(() => vi.fn()),

  serverTimestamp: vi.fn(),

  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() })),
  },
}));
