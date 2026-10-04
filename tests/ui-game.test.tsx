// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '@/app/page';
import BotPage from '@/app/bot/page';
import LocalPage from '@/app/local/page';
import SettingsPage from '@/app/settings/page';
import { SettingsProvider } from '@/components/settings/SettingsProvider';

function renderWithProviders(ui: React.ReactNode) {
  return render(<SettingsProvider>{ui}</SettingsProvider>);
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Neon Poker Homepage', () => {
  it('renders hero title and mode selection cards', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText('POKER CLUB')).toBeInTheDocument();
    expect(screen.getByText('PLAY YOUR HAND. READ THE TABLE.')).toBeInTheDocument();
    expect(screen.getByText('Practice vs AI')).toBeInTheDocument();
    expect(screen.getByText('Local Table')).toBeInTheDocument();
    expect(screen.getByText('Private Online Room')).toBeInTheDocument();
  });
});

describe('Bot & Practice Setup', () => {
  it('renders setup form for practice vs AI', () => {
    renderWithProviders(<BotPage />);
    expect(screen.getByText('Practice Table vs AI')).toBeInTheDocument();
    expect(screen.getByText('Deal Cards & Start Match ➔')).toBeInTheDocument();
  });

  it('renders local setup table', () => {
    renderWithProviders(<LocalPage />);
    expect(screen.getByText('Local Table')).toBeInTheDocument();
  });
});

describe('Settings Page', () => {
  it('renders player profile and toggle switches', () => {
    renderWithProviders(<SettingsPage />);
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
    expect(screen.getByText('Player Profile')).toBeInTheDocument();
    expect(screen.getByText('Sound Effects')).toBeInTheDocument();
    expect(screen.getByText('4-Color Deck Mode')).toBeInTheDocument();
  });
});
