/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export interface Prompt {
  readonly promptId: string;
  text: string;
  weight: number;
  cc: number;
  color: string;
}

export interface ControlChange {
  channel: number;
  cc: number;
  value: number;
}

export type PlaybackState = 'stopped' | 'playing' | 'loading' | 'paused';

export interface GeneratorSettings {
  loopBars: number;
  variation: number; // 0..2 (higher = more phrase/motif/drum variation)
  genreContrast: number; // 0..2 (higher = stronger genre-specific differentiation on changes)
  mix: 'background' | 'balanced' | 'energetic';
}
