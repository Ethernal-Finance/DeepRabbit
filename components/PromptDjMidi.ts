/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { throttle } from '../utils/throttle';

import './PromptController';
import './PlayPauseButton';
import './TimelineRuler';
import type { PlaybackState, Prompt, ControlChange } from '../types';
import './HelpPanel';
import './OnboardingTutorial';
import { MidiDispatcher } from '../utils/MidiDispatcher';
import { SessionRecorder } from '../utils/SessionRecorder';
import './RequirePro';
import './AuthModal';
import './UserProfile';
import { authService, type User } from '../utils/AuthService.js';

/** The grid of prompt inputs. */
@customElement('prompt-dj-midi')
export class PromptDjMidi extends LitElement {
  static override styles = css`
    :host {
      height: 100vh;
      height: 100dvh; /* mobile-safe */
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      color: #e0e0e0;
      overflow: hidden;
      user-select: none;
      position: relative;
    }

    :host::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(41, 242, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 242, 198, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }
    
    /* Professional DAW Header */
    .daw-header {
      height: 70px;
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      position: relative;
    }
    
    .daw-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.8;
    }
    
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    
    .app-title {
      color: #29F2C6;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 20px rgba(41, 242, 198, 0.5);
      position: relative;
    }
    
    
    .transport-controls {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      padding: 12px 20px;
      border-radius: 12px;
      border: 1px solid rgba(41, 242, 198, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #aaa;
      font-weight: 500;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #555;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .status-dot.playing {
      background: #29F2C6;
      box-shadow: 0 0 15px rgba(41, 242, 198, 0.8);
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .toolbar-btn {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .toolbar-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }
    
    .toolbar-btn:hover::before {
      left: 100%;
    }
    
    .toolbar-btn:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    
    .toolbar-btn.active {
      background: linear-gradient(135deg, rgba(41, 242, 198, 0.8) 0%, rgba(15, 201, 167, 0.8) 100%);
      color: #000;
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 20px rgba(41, 242, 198, 0.4);
    }
    
    .midi-select {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      outline: none;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .midi-select:focus {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
    }

    /* Panel Toggle Styles */
    .panel-toggle {
      display: flex;
      background: rgba(26, 26, 46, 0.4);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 4px;
      border: 1px solid rgba(41, 242, 198, 0.2);
      margin-bottom: 15px;
    }

    .toggle-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: rgba(224, 224, 224, 0.7);
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .toggle-btn:hover {
      color: rgba(41, 242, 198, 0.8);
      background: rgba(41, 242, 198, 0.1);
    }

    .toggle-btn.active {
      background: rgba(41, 242, 198, 0.8);
      color: #000;
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }

    .active-count {
      background: rgba(41, 242, 198, 0.9);
      color: #000;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 6px;
      min-width: 16px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }

    /* Filter Controls */
    .filter-controls {
      margin-bottom: 12px;
      display: flex;
      gap: 8px;
    }

    .filter-btn {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: rgba(224, 224, 224, 0.8);
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .filter-btn:hover {
      background: rgba(26, 26, 46, 0.8);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .filter-btn.active {
      background: rgba(41, 242, 198, 0.8);
      border-color: rgba(41, 242, 198, 0.6);
      color: #000;
      box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2), 0 2px 8px rgba(41, 242, 198, 0.3);
    }

    /* Search Container Styles */
    .search-container {
      width: 100%;
    }

    .search-input-wrapper {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 10px 40px 10px 12px;
      border-radius: 8px;
      font-size: 12px;
      outline: none;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .search-input:focus {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
    }

    .search-input::placeholder {
      color: rgba(224, 224, 224, 0.5);
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(41, 242, 198, 0.6);
      font-size: 14px;
      pointer-events: none;
    }
    
    /* Main DAW Layout */
    .daw-layout {
      display: flex;
      flex: 1;
      height: calc(100vh - 70px);
      height: calc(100dvh - 70px); /* mobile-safe */
      min-height: 0; /* allow children to shrink and enable inner scroll areas */
      align-items: stretch; /* ensure children fill height */
      overflow: hidden;
      background: #0f0f0f;
    }
    
    /* Left Panel - Style List */
    .style-panel {
      width: 300px;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(41, 242, 198, 0.2);
      display: flex;
      flex-direction: column;
      min-height: 0; /* critical for nested flex scroll */
      height: 100%; /* take full height of layout */
      flex: 0 0 300px; /* fix width in flex row */
      overflow: hidden;
      position: relative;
      box-shadow: 4px 0 16px rgba(0, 0, 0, 0.2);
    }
    
    .style-panel::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.5;
    }
    
    .panel-header {
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(15px);
      padding: 18px 25px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      position: relative;
      flex-shrink: 0; /* prevent header from stealing space */
    }
    
    .panel-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.6;
    }
    
    .panel-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .style-list {
      flex: 1 1 0;
      min-height: 0; /* ensure list can become scroll container */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      padding: 15px 0;
      scroll-snap-type: y mandatory;
    }
    
    .style-item {
      display: flex;
      align-items: center;
      padding: 15px 25px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      scroll-snap-align: start;
      background: rgba(26, 26, 46, 0.3);
      backdrop-filter: blur(10px);
      margin: 4px 8px;
      border-radius: 8px;
      border: 1px solid rgba(41, 242, 198, 0.1);
    }
    
    .style-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: transparent;
      transition: all 0.3s ease;
      border-radius: 8px 0 0 8px;
    }
    
    .style-item:hover {
      background: rgba(41, 242, 198, 0.1);
      border-color: rgba(41, 242, 198, 0.3);
      transform: translateX(4px);
      box-shadow: 0 4px 16px rgba(41, 242, 198, 0.2);
    }
    
    .style-item:hover::before {
      background: rgba(41, 242, 198, 0.8);
      box-shadow: 0 0 10px rgba(41, 242, 198, 0.5);
    }
    
    .style-item.filtered {
      opacity: 0.4;
      background: rgba(255, 68, 68, 0.1);
      border-color: rgba(255, 68, 68, 0.3);
    }
    
    .style-item.active {
      background: rgba(41, 242, 198, 0.15);
      border-color: rgba(41, 242, 198, 0.4);
      box-shadow: 0 4px 16px rgba(41, 242, 198, 0.3);
    }
    
    .style-color {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin-right: 15px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .style-name {
      flex: 1;
      font-size: 12px;
      font-weight: 600;
      color: #e0e0e0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .style-mute {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      font-size: 12px;
      color: rgba(41, 242, 198, 0.8);
    }
    
    .style-mute:hover {
      background: rgba(41, 242, 198, 0.2);
      border-color: rgba(41, 242, 198, 0.4);
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    /* Center Workspace */
    .workspace {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: rgba(26, 26, 46, 0.3);
      backdrop-filter: blur(10px);
      min-height: 0; /* enable inner scroll */
      overflow: hidden;
      position: relative;
    }
    
    .workspace::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(41, 242, 198, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 242, 198, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .timeline-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0; /* enable grid-container to scroll */
      overflow: hidden;
    }
    
    .timeline-header {
      background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
      padding: 18px 25px;
      border-bottom: 2px solid #333;
      position: relative;
    }
    
    .timeline-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .timeline-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .grid-container {
      flex: 1;
      padding: 25px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 25px;
      align-content: start;
    }
    
    .slider-row {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      border-radius: 12px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      transition: all 0.3s ease;
      position: relative;
      overflow: visible;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    .slider-row.blending {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 8px 32px rgba(41, 242, 198, 0.3);
    }

    .slot-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid rgba(41, 242, 198, 0.3);
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(10px);
      color: rgba(224, 224, 224, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .slot-close:hover {
      background: rgba(41, 242, 198, 0.2);
      color: rgba(41, 242, 198, 1);
      border-color: rgba(41, 242, 198, 0.6);
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    .slider-row::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.8) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px 12px 0 0;
    }
    
    .slider-row:hover {
      border-color: rgba(41, 242, 198, 0.4);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(41, 242, 198, 0.2);
      transform: translateY(-4px);
    }
    
    .slider-row:hover::before {
      opacity: 1;
    }
    
    .slider-label {
      color: #e0e0e0;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .slider-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      /* Provide space for slider overlays (labels/visualizer) */
      padding-bottom: 40px;
    }
    
    weight-slider {
      width: 100%;
      max-width: 200px;
    }
    
    .midi-info {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 11px;
      color: rgba(224, 224, 224, 0.8);
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      min-width: 90px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .midi-info:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .midi-info.active {
      background: rgba(41, 242, 198, 0.2);
      border-color: rgba(41, 242, 198, 0.6);
      color: rgba(41, 242, 198, 1);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2), 0 0 20px rgba(41, 242, 198, 0.2);
    }
    
    /* EVOLVE Submenu Styles */
    .evolve-submenu {
      position: absolute;
      right: 0;
      top: 100%;
      background: rgba(26, 26, 46, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(41, 242, 198, 0.3);
      border-radius: 12px;
      padding: 20px;
      margin-top: 8px;
      min-width: 280px;
      z-index: 1002;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }
    
    .evolve-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
    }
    
    .evolve-header h4 {
      margin: 0;
      color: #29F2C6;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .evolve-toggle {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .evolve-toggle:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .evolve-toggle.active {
      background: rgba(41, 242, 198, 0.8);
      border-color: rgba(41, 242, 198, 0.6);
      color: #000;
      box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2), 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    .evolve-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .control-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: center;
    }
    
    .control-row label {
      color: #e0e0e0;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 50px;
    }
    
    /* Right Panel - Mixer */
    
    .instruments-list {
      border-top: 2px solid #333;
      padding: 15px 0;
    }
    
    .instrument-slider {
      padding: 18px 25px;
      border-bottom: 1px solid #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      transition: all 0.2s ease;
    }
    
    .instrument-slider:hover {
      background: rgba(41, 242, 198, 0.05);
    }
    
    .instrument-slider.filtered {
      opacity: 0.4;
      background: rgba(255, 0, 0, 0.1);
    }
    .instrument-slider.active {
      background: linear-gradient(90deg, rgba(41, 242, 198, 0.08) 0%, transparent 100%);
      border-left: 3px solid #29F2C6;
    }
    
    .instrument-label {
      font-size: 12px;
      color: #e0e0e0;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    /* Professional Scrollbars */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #0f0f0f;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #333 0%, #222 100%);
      border-radius: 5px;
      border: 1px solid #444;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #444 0%, #333 100%);
    }
    
    ::-webkit-scrollbar-corner {
      background: #0f0f0f;
    }
    
    /* Responsive Design */
    @media (max-width: 1400px) {
      .style-panel {
        width: 260px;
      }
      
      .mixer-panel {
        width: 300px;
      }
      
      .grid-container {
        grid-template-columns: repeat(4, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
      }
    }
    
    @media (max-width: 768px) {
      :host {
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
      }
      
      /* Prevent mobile zoom on input focus */
      input, select, textarea {
        font-size: 16px !important;
        transform: scale(1) !important;
      }
      
      /* Prevent zoom on focus */
      * {
        -webkit-text-size-adjust: 100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Allow text selection in inputs */
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      .daw-header.mobile-hidden {
        display: none;
      }
      
      .daw-layout {
        flex-direction: column;
        height: calc(100vh - 70px);
        height: calc(100dvh - 70px);
        overflow: hidden;
        padding-bottom: 80px; /* Space for bottom nav */
      }
      
      .daw-layout.mobile-full,
      .workspace.mobile-full {
        height: 100vh;
        height: 100dvh;
      }
      
      .slot-close { 
        width: 32px; 
        height: 32px; 
        font-size: 14px;
        top: 6px;
        right: 6px;
      }
      
      .toolbar-right { 
        display: flex; 
        align-items: center;
        gap: 20px;
      }
      
      /* Mobile Menu Header */
      .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      }
      
      .mobile-menu-header h3 {
        margin: 0;
        color: #29F2C6;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .close-btn {
        background: rgba(41, 242, 198, 0.8);
        border: none;
        color: #000;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
      }
      
      .close-btn:hover {
        background: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      /* Mobile Button Groups */
      .mobile-btn-group {
        background: rgba(26, 26, 46, 0.6);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .mobile-controls {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 8px;
        align-items: center;
        margin-top: 10px;
      }
      
      .mobile-controls label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Mobile Submenu Styles */
      .mobile-submenu {
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(41, 242, 198, 0.3);
        border-radius: 8px;
        padding: 12px;
        margin-top: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }
      
      .submenu-btn {
        display: block;
        width: 100%;
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-bottom: 6px;
        text-align: left;
      }
      
      .submenu-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .submenu-btn:last-child {
        margin-bottom: 0;
      }
      
      /* Settings Submenu */
      .settings-submenu {
        min-width: 280px;
      }
      
      .settings-grid {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: center;
      }
      
      .settings-grid label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Scenes Submenu */
      .scenes-submenu {
        min-width: 250px;
      }
      
      .scene-controls {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        align-items: center;
      }
      
      .scenes-list {
        max-height: 200px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      .scene-item {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
      }
      
      .scene-btn {
        flex: 1;
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-align: left;
      }
      
      .scene-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .scene-action-btn {
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.3s ease;
      }
      
      .scene-action-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .no-scenes {
        color: rgba(224, 224, 224, 0.6);
        font-size: 11px;
        padding: 8px;
        text-align: center;
        font-style: italic;
      }
      
      /* Evolve Controls */
      .evolve-controls {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 8px;
        align-items: center;
        margin-top: 10px;
      }
      
      .evolve-controls label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Bottom Navigation Bar */
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(20px);
        border-top: 2px solid rgba(41, 242, 198, 0.3);
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 12px 0;
        z-index: 1002;
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
        min-height: 80px;
      }
      
      /* Bottom Sheet Menu System */
      .bottom-sheet {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.98);
        backdrop-filter: blur(20px);
        border-top: 2px solid rgba(41, 242, 198, 0.4);
        border-radius: 20px 20px 0 0;
        z-index: 1003;
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5);
      }
      
      .bottom-sheet.open {
        transform: translateY(0);
      }
      
      .bottom-sheet-handle {
        width: 40px;
        height: 4px;
        background: rgba(41, 242, 198, 0.6);
        border-radius: 2px;
        margin: 12px auto 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .bottom-sheet-handle:hover {
        background: rgba(41, 242, 198, 0.8);
        transform: scaleX(1.2);
      }
      
      .bottom-sheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 16px;
        border-bottom: 1px solid rgba(41, 242, 198, 0.2);
        margin-bottom: 20px;
      }
      
      .bottom-sheet-header h3 {
        margin: 0;
        color: #29F2C6;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
      }
      
      .bottom-sheet-close {
        background: rgba(41, 242, 198, 0.8);
        border: none;
        color: #000;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .bottom-sheet-close:hover {
        background: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      .bottom-sheet-content {
        padding: 0 20px 20px;
        max-height: calc(80vh - 120px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      .sheet-section {
        margin-bottom: 24px;
      }
      
      .sheet-section:last-child {
        margin-bottom: 0;
      }
      
      .sheet-section h4 {
        margin: 0 0 12px 0;
        color: #29F2C6;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding-left: 4px;
      }
      
      .sheet-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      
      .sheet-btn {
        background: rgba(26, 26, 46, 0.8);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 12px;
        color: #e0e0e0;
        padding: 16px 12px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-height: 80px;
        justify-content: center;
        touch-action: manipulation;
        position: relative;
        overflow: hidden;
      }
      
      .sheet-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
      }
      
      .sheet-btn:hover::before {
        left: 100%;
      }
      
      .sheet-btn:hover {
        background: rgba(26, 26, 46, 0.9);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(41, 242, 198, 0.2);
      }
      
      .sheet-btn.active {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.6);
        color: rgba(41, 242, 198, 1);
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2);
      }
      
      .sheet-btn-icon {
        font-size: 20px;
        line-height: 1;
      }
      
      .sheet-btn-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2;
      }
      
      /* Control Rows for Settings */
      .control-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(41, 242, 198, 0.1);
      }
      
      .control-row:last-child {
        border-bottom: none;
      }
      
      .control-label {
        color: #e0e0e0;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        min-width: 80px;
        flex-shrink: 0;
      }
      
      .control-input {
        flex: 1;
        background: rgba(26, 26, 46, 0.8);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 8px;
        color: #e0e0e0;
        padding: 8px 12px;
        font-size: 12px;
        transition: all 0.3s ease;
        min-height: 44px;
      }
      
      .control-input:focus {
        border-color: rgba(41, 242, 198, 0.5);
        outline: none;
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.1);
      }
      
      .control-range {
        flex: 1;
        height: 8px;
        background: linear-gradient(to right, rgba(41, 242, 198, 0.3) 0%, rgba(41, 242, 198, 0.3) 50%, rgba(26, 26, 46, 0.8) 50%, rgba(26, 26, 46, 0.8) 100%);
        border-radius: 4px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        border: 1px solid rgba(41, 242, 198, 0.4);
      }
      
      .control-range::-webkit-slider-track {
        height: 8px;
        background: transparent;
        border-radius: 4px;
        border: none;
        -webkit-appearance: none;
      }
      
      .control-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        background: #29F2C6;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.4);
        transition: all 0.3s ease;
        border: 3px solid rgba(26, 26, 46, 0.9);
        margin-top: -8px;
      }
      
      .control-range::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(41, 242, 198, 0.6);
      }
      
      .control-range::-moz-range-track {
        height: 8px;
        background: rgba(26, 26, 46, 0.8);
        border-radius: 4px;
        border: 1px solid rgba(41, 242, 198, 0.4);
      }
      
      .control-range::-moz-range-thumb {
        width: 24px;
        height: 24px;
        background: #29F2C6;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid rgba(26, 26, 46, 0.9);
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.4);
      }
      
      /* Scene List */
      .scenes-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }
      
      .scene-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(26, 26, 46, 0.6);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 8px;
        padding: 12px;
        transition: all 0.3s ease;
      }
      
      .scene-item:hover {
        background: rgba(26, 26, 46, 0.8);
        border-color: rgba(41, 242, 198, 0.4);
        transform: translateX(4px);
      }
      
      .scene-btn {
        flex: 1;
        background: none;
        border: none;
        color: #e0e0e0;
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        padding: 4px 0;
        transition: color 0.3s ease;
      }
      
      .scene-btn:hover {
        color: rgba(41, 242, 198, 1);
      }
      
      .scene-actions {
        display: flex;
        gap: 6px;
      }
      
      .scene-action-btn {
        background: rgba(26, 26, 46, 0.8);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 6px;
        color: #e0e0e0;
        padding: 6px 8px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.3s ease;
        min-width: 32px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .scene-action-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      .no-scenes {
        text-align: center;
        color: rgba(224, 224, 224, 0.6);
        font-size: 12px;
        font-style: italic;
        padding: 20px;
        background: rgba(26, 26, 46, 0.3);
        border-radius: 8px;
        border: 1px dashed rgba(41, 242, 198, 0.2);
      }
      
      .nav-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      
      .nav-item.nav-center {
        flex: 0 0 auto;
        margin: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      
      .nav-btn {
        background: transparent;
        border: none;
        color: #e0e0e0;
        padding: 12px 16px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        min-width: 70px;
        min-height: 70px;
        justify-content: center;
        touch-action: manipulation;
        position: relative;
        overflow: hidden;
      }
      
      .nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
      }
      
      .nav-btn:hover::before {
        left: 100%;
      }
      
      .nav-btn:hover {
        background: rgba(41, 242, 198, 0.1);
        color: rgba(41, 242, 198, 1);
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(41, 242, 198, 0.2);
      }
      
      .nav-btn.active {
        background: rgba(41, 242, 198, 0.2);
        color: rgba(41, 242, 198, 1);
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2);
      }
      
      .nav-play {
        background: rgba(41, 242, 198, 0.8);
        color: #000;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        min-width: 70px;
        min-height: 70px;
        box-shadow: 0 6px 20px rgba(41, 242, 198, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -15px 0; /* Extend above and below nav bar */
      }
      
      .nav-play:hover {
        background: rgba(41, 242, 198, 1);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(41, 242, 198, 0.5);
      }
      
      .nav-play.playing {
        background: rgba(255, 107, 107, 0.8);
        box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
      }
      
      .nav-play.playing:hover {
        background: rgba(255, 107, 107, 1);
        box-shadow: 0 8px 24px rgba(255, 107, 107, 0.5);
      }
      
      .nav-play .nav-icon {
        font-size: 28px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-label {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .nav-play .nav-label {
        display: none;
      }
      
      
      /* Responsive adjustments for bottom sheet */
      @media (max-width: 480px) {
        .nav-play {
          width: 65px;
          height: 65px;
          min-width: 65px;
          min-height: 65px;
          margin: -12px 0;
        }
        
        .nav-play .nav-icon {
          font-size: 26px;
        }
        
        .nav-item.nav-center {
          margin: 0 20px;
        }
        
        .nav-btn {
          min-width: 60px;
          min-height: 60px;
          padding: 10px 12px;
        }
        
        .bottom-sheet-content {
          padding: 0 16px 16px;
        }
        
        .sheet-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
        }
        
        .sheet-btn {
          min-height: 70px;
          padding: 12px 8px;
        }
      }
      
      @media (max-width: 360px) {
        .nav-btn {
          min-width: 55px;
          min-height: 55px;
          padding: 8px 10px;
        }
        
        .nav-item.nav-center {
          margin: 0 15px;
        }
        
        .sheet-grid {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 8px;
        }
        
        .sheet-btn {
          min-height: 65px;
          padding: 10px 6px;
        }
        
        .sheet-btn-icon {
          font-size: 18px;
        }
        
        .sheet-btn-label {
          font-size: 10px;
        }
      }
      
      .transport-controls.compact { 
        padding: 8px 12px; 
        gap: 12px; 
        min-width: auto;
      }
      
      .slider-row { 
        padding: 15px; 
        gap: 15px; 
        min-height: 120px;
      }
      
      .slider-label { 
        font-size: 13px; 
        margin-bottom: 8px;
      }
      
      weight-slider { 
        max-width: 200px; 
        height: 100px;
      }
      
      .style-panel {
        width: 100%;
        height: auto;
        max-height: 50vh;
        overflow: hidden;
        border-right: none;
        border-bottom: 2px solid var(--border);
        flex-shrink: 0;
      }
      
      .style-list {
        max-height: calc(50vh - 80px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
        padding: 12px;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        flex: 1;
        overflow-y: auto;
      }
      
      .daw-header {
        height: auto;
        min-height: 70px;
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
        flex-shrink: 0;
      }
      
      .toolbar-left {
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      
      .app-title {
        font-size: 16px;
        letter-spacing: 1px;
      }
      
      .toolbar-btn {
        padding: 10px 14px;
        font-size: 11px;
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
      
      .midi-select {
        padding: 10px 12px;
        font-size: 11px;
        min-height: 44px;
        touch-action: manipulation;
      }
      
      /* Mobile menu button */
      .mobile-menu-btn {
        display: block;
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        border: 1px solid #444;
        color: #e0e0e0;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        touch-action: manipulation;
      }
      
      .mobile-menu-btn:hover {
        background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
        border-color: #555;
        transform: translateY(-1px);
      }
    }

    @media (max-width: 480px) {
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 8px;
        padding: 8px;
      }

      .style-panel {
        max-height: 45vh;
      }
      
      .style-list {
        max-height: calc(45vh - 80px);
      }

      .slider-row { 
        padding: 12px; 
        gap: 12px; 
        min-height: 100px;
      }
      
      .slider-label { 
        font-size: 12px; 
        margin-bottom: 6px;
      }
      
      weight-slider { 
        max-width: 160px; 
        height: 80px;
      }
      
      .toolbar-btn, .midi-select {
        padding: 8px 10px;
        font-size: 10px;
        min-height: 40px;
        min-width: 40px;
      }
      
      .daw-header {
        padding: 12px 15px;
        gap: 12px;
      }
      
      .app-title {
        font-size: 14px;
      }
      
      .transport-controls.compact {
        padding: 6px 10px;
        gap: 8px;
      }
      
      .slot-close {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }
    }
    
    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
      .style-panel {
        max-height: 40vh;
      }
      
      .style-list {
        max-height: calc(40vh - 80px);
      }
      
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
        padding: 10px;
      }
    }
    
    /* Ambient Animations */
    @keyframes ambientGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(41, 242, 198, 0.1),
                    0 0 40px rgba(41, 242, 198, 0.05);
      }
      50% { 
        box-shadow: 0 0 30px rgba(41, 242, 198, 0.15),
                    0 0 60px rgba(41, 242, 198, 0.08);
      }
    }
    
    @keyframes ambientFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    
    @keyframes ambientPulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
    
    @keyframes ambientShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes ambientBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    
    /* Apply ambient animations */
    .toolbar-btn:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    /* Nav button ambient effects - REMOVED */
    /* .nav-btn:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    } */
    
    .play-pause-button:hover {
      animation: ambientBreath 3s ease-in-out infinite;
    }
    
    /* Nav play ambient effects - REMOVED */
    /* .nav-play:hover {
      animation: ambientGlow 2s ease-in-out infinite, ambientBreath 3s ease-in-out infinite;
    } */
    
    .active-count {
      animation: ambientPulse 2s ease-in-out infinite;
    }
    
    .status-dot.playing {
      animation: ambientPulse 1.5s ease-in-out infinite;
    }
    
    /* Subtle background animations */
    .daw-header {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.95) 0%, 
        rgba(26, 26, 46, 0.98) 50%, 
        rgba(26, 26, 46, 0.95) 100%);
      background-size: 200% 200%;
      animation: ambientShimmer 8s ease-in-out infinite;
    }
    
    .bottom-nav {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.95) 0%, 
        rgba(26, 26, 46, 0.98) 50%, 
        rgba(26, 26, 46, 0.95) 100%);
      background-size: 200% 200%;
      animation: ambientShimmer 10s ease-in-out infinite;
    }
    
    /* Grid item ambient effects */
    .grid-item:hover {
      animation: ambientFloat 1.5s ease-in-out infinite;
    }
    
    .grid-item.active {
      animation: ambientGlow 3s ease-in-out infinite;
    }
    
    /* Panel ambient effects */
    .style-panel, .instruments-panel {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.8) 0%, 
        rgba(26, 26, 46, 0.9) 50%, 
        rgba(26, 26, 46, 0.8) 100%);
      background-size: 300% 300%;
      animation: ambientShimmer 12s ease-in-out infinite;
    }
    
    /* Popup ambient effects - REMOVED */
    /* .evolve-popup, .menu-popup, .settings-popup, .record-popup {
      animation: ambientFloat 0.3s ease-out;
    } */
    
    /* Slider ambient effects */
    weight-slider:hover {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Scene ambient effects */
    .scene-btn:hover {
      animation: ambientFloat 1s ease-in-out infinite;
    }
    
    /* Menu button ambient effects */
    .menu-btn:hover {
      animation: ambientFloat 1.2s ease-in-out infinite;
    }
    
    /* Search input ambient effects */
    .search-input:focus {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Toggle button ambient effects */
    .toggle-btn:hover {
      animation: ambientFloat 1.5s ease-in-out infinite;
    }
    
    .toggle-btn.active {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Filter button ambient effects */
    .filter-btn:hover {
      animation: ambientFloat 1.3s ease-in-out infinite;
    }
    
    .filter-btn.active {
      animation: ambientGlow 2.5s ease-in-out infinite;
    }
    
    /* Instrument/Style item ambient effects */
    .style-item:hover, .instrument-item:hover {
      animation: ambientFloat 1.2s ease-in-out infinite;
    }
    
    .style-item.selected, .instrument-item.selected {
      animation: ambientGlow 3s ease-in-out infinite;
    }
    
    /* Nav icon ambient effects - REMOVED */
    /* .nav-icon {
      animation: ambientFloat 3s ease-in-out infinite;
    } */
    
    /* Nav label ambient effects - REMOVED */
    /* .nav-label {
      animation: ambientFloat 3.5s ease-in-out infinite;
    } */
    
    /* Nav item ambient effects - REMOVED */
    /* .nav-item {
      animation: ambientFloat 4s ease-in-out infinite;
    }
    
    .nav-item:nth-child(1) {
      animation-delay: 0s;
    }
    
    .nav-item:nth-child(2) {
      animation-delay: 0.5s;
    }
    
    .nav-item:nth-child(3) {
      animation-delay: 1s;
    }
    
    .nav-item:nth-child(4) {
      animation-delay: 1.5s;
    }
    
    .nav-item:nth-child(5) {
      animation-delay: 2s;
    } */
    
    /* Hamburger ambient effects */
    .hamburger span {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    .hamburger span:nth-child(1) {
      animation-delay: 0s;
    }
    
    .hamburger span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .hamburger span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    /* Brand ambient effects */
    gf-brand {
      animation: ambientFloat 4s ease-in-out infinite;
    }
    
    /* Status indicator ambient effects */
    .status-indicator:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    /* Transport controls ambient effects */
    .transport-controls:hover {
      animation: ambientFloat 2.5s ease-in-out infinite;
    }
    
    /* MIDI info ambient effects */
    .midi-info:hover {
      animation: ambientFloat 1.8s ease-in-out infinite;
    }
    
    .midi-info.active {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Handle ambient effects */
    .bottom-sheet-handle {
      animation: ambientPulse 3s ease-in-out infinite;
    }
    
    /* Backdrop ambient effects - REMOVED */
    /* .popup-backdrop {
      animation: ambientPulse 4s ease-in-out infinite;
    } */
    
    /* Content ambient effects - REMOVED */
    /* .popup-content {
      animation: ambientFloat 0.5s ease-out;
    } */
    
    /* Header ambient effects - REMOVED */
    /* .popup-header {
      animation: ambientFloat 0.3s ease-out;
    } */
    
    /* Section ambient effects - REMOVED */
    /* .menu-section {
      animation: ambientFloat 0.4s ease-out;
    }
    
    .menu-section:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .menu-section:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Button group ambient effects - REMOVED */
    /* .menu-buttons {
      animation: ambientFloat 0.6s ease-out;
    } */
    
    /* Settings grid ambient effects - REMOVED */
    /* .settings-grid {
      animation: ambientFloat 0.7s ease-out;
    } */
    
    /* Setting row ambient effects - REMOVED */
    /* .setting-row {
      animation: ambientFloat 0.8s ease-out;
    }
    
    .setting-row:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .setting-row:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Scenes list ambient effects - REMOVED */
    /* .scenes-list {
      animation: ambientFloat 0.9s ease-out;
    } */
    
    /* Scene item ambient effects - REMOVED */
    /* .scene-item {
      animation: ambientFloat 1s ease-out;
    }
    
    .scene-item:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .scene-item:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Control row ambient effects - REMOVED */
    /* .control-row {
      animation: ambientFloat 1.1s ease-out;
    }
    
    .control-row:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .control-row:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Popup controls ambient effects - REMOVED */
    /* .popup-controls {
      animation: ambientFloat 1.2s ease-out;
    } */
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  private prompts: Map<string, Prompt>;
  private instruments: Map<string, Prompt>;
  private midiDispatcher: MidiDispatcher;
  @state() private maxSelectedPrompts = 8;
  private recorder: SessionRecorder | null = null;
  @state() private showExportMenu = false;
  @property({ type: String }) userId = '';
  @property({ type: String }) userEmail = '';
  @property({ type: Object }) currentUser: User | null = null;
  @state() private showAuthModal = false;
  @state() private showTutorial = false;
  @state() private isRecording = false;
  @state() private autoEvolveEnabled = false;
  @state() private autoEvolveRateSec = 16; // how often to evolve
  @state() private autoEvolveDepth = 0.15; // 0..1 range scales the delta
  private evolveTimer: number | null = null;
  @state() private styleSearchQuery: string = '';
  @state() private selectedOrder: string[] = [];
  @state() private showAllPrompts: boolean = false;
  @state() private isMobile: boolean = false;
  @state() private showMobileMenu: boolean = false;
  @state() private showEvolveMenu: boolean = false;
  @state() private showSettingsMenu: boolean = false;
  @state() private showRecordMenu: boolean = false;
  @state() private leftPanelMode: 'styles' | 'instruments' = 'styles';
  @state() private showActiveOnly: boolean = false;
  private readonly SELECTED_ORDER_STORAGE_KEY = 'pdjmidi_selected_order';
  private readonly PROMPT_WEIGHTS_STORAGE_KEY = 'pdjmidi_prompt_weights';
  private readonly STYLE_COUNT_STORAGE_KEY = 'pdjmidi_style_count';
  private readonly SHOW_ALL_GRID_STORAGE_KEY = 'pdjmidi_show_all';
  private readonly SCENES_STORAGE_KEY = 'pdjmidi_scenes';
  private mql?: MediaQueryList;

  @property({ type: Boolean }) private showMidi = false;
  @property({ type: String }) public playbackState: PlaybackState = 'stopped';
  @state() public audioLevel = 0;
  @state() public currentTime = 0;
  @state() private midiInputIds: string[] = [];
  @state() private activeMidiInputId: string | null = null;
  @state() private learningPromptId: string | null = null;
  @state() private learningInstrumentId: string | null = null;
  @state() private selectedPromptIds: Set<string> = new Set();
  @state() private selectedInstrumentId: string | null = null;
  @state() private learningSlotIndex: number | null = null;
  @state() private slotCcMap: Map<number, number> = new Map();
  private readonly SLOT_CC_STORAGE_KEY = 'pdjmidi_slot_cc_mappings';
  
  private readonly PROMPT_CC_STORAGE_KEY = 'pdjmidi_prompt_cc_mappings';
  private readonly INSTR_CC_STORAGE_KEY = 'pdjmidi_instrument_cc_mappings';

  // Scenes (snapshot/recall) state
  @state() private scenes: Array<{ id: string; name: string; weights: Record<string, number>; selectedOrder: string[] }> = [];
  @state() private showScenesMenu = false;
  @state() private sceneMorphSec = 4;

    // Generator settings UI
  @state() private genLoopBars = 8;
  @state() private genVariation = 1.2; // 0..2
  @state() private genGenreContrast = 1.2; // 0..2
  @state() private genMix: 'background' | 'balanced' | 'energetic' = 'balanced';

  // Konami unlock for advanced controls
  @state() private konamiUnlocked = false;
  private konamiIndex = 0;
  private readonly konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];

  override firstUpdated() {
    try {
      const done = localStorage.getItem('deeprabbit_onboarded');
      if (!done) this.showTutorial = true;
    } catch {}
  }

  private handleTutorialFinish() {
    this.showTutorial = false;
    try { localStorage.setItem('deeprabbit_onboarded', '1'); } catch {}
  }
  @state() private showHelp = false;

  @property({ type: Object })
  private filteredPrompts = new Set<string>();
  
  @property({ type: Object })
  private filteredInstruments = new Set<string>();

  constructor(
    initialPrompts: Map<string, Prompt>,
  ) {
    super();
    this.prompts = initialPrompts;
    
    // Initialize instruments with comprehensive musical instruments
    this.instruments = new Map([
      // Core Instruments
      ['piano', { promptId: 'piano', text: 'Piano', weight: 0, color: '#FFEAA7', cc: 0 }],
      ['rhodes-piano', { promptId: 'rhodes-piano', text: 'Rhodes Piano', weight: 0, color: '#DDA0DD', cc: 0 }],
      ['harpsichord', { promptId: 'harpsichord', text: 'Harpsichord', weight: 0, color: '#C19A6B', cc: 0 }],
      ['celesta', { promptId: 'celesta', text: 'Celesta', weight: 0, color: '#F0E68C', cc: 0 }],
      
      // Guitars
      ['guitar', { promptId: 'guitar', text: 'Guitar', weight: 0, color: '#4ECDC4', cc: 0 }],
      ['electric-guitar', { promptId: 'electric-guitar', text: 'Electric Guitar', weight: 0, color: '#FF6B6B', cc: 0 }],
      ['acoustic-guitar', { promptId: 'acoustic-guitar', text: 'Acoustic Guitar', weight: 0, color: '#4ECDC4', cc: 0 }],
      ['classical-guitar', { promptId: 'classical-guitar', text: 'Classical Guitar', weight: 0, color: '#8FBC8F', cc: 0 }],
      ['bass-guitar', { promptId: 'bass-guitar', text: 'Bass Guitar', weight: 0, color: '#45B7D1', cc: 0 }],
      ['ukulele', { promptId: 'ukulele', text: 'Ukulele', weight: 0, color: '#FFA07A', cc: 0 }],
      ['banjo', { promptId: 'banjo', text: 'Banjo', weight: 0, color: '#DAA520', cc: 0 }],
      ['mandolin', { promptId: 'mandolin', text: 'Mandolin', weight: 0, color: '#CD853F', cc: 0 }],
      
      // Bass Instruments
      ['bass', { promptId: 'bass', text: 'Bass', weight: 0, color: '#96CEB4', cc: 0 }],
      ['electric-bass', { promptId: 'electric-bass', text: 'Electric Bass', weight: 0, color: '#45B7D1', cc: 0 }],
      ['acoustic-bass', { promptId: 'acoustic-bass', text: 'Acoustic Bass', weight: 0, color: '#96CEB4', cc: 0 }],
      ['double-bass', { promptId: 'double-bass', text: 'Double Bass', weight: 0, color: '#8B4513', cc: 0 }],
      ['fretless-bass', { promptId: 'fretless-bass', text: 'Fretless Bass', weight: 0, color: '#2E8B57', cc: 0 }],
      
      // Drums & Percussion
      ['drums', { promptId: 'drums', text: 'Drums', weight: 0, color: '#FFB347', cc: 0 }],
      ['live-drums', { promptId: 'live-drums', text: 'Live Drums', weight: 0, color: '#98D8C8', cc: 0 }],
      ['electronic-drums', { promptId: 'electronic-drums', text: 'Electronic Drums', weight: 0, color: '#FF6347', cc: 0 }],
      ['snare-drum', { promptId: 'snare-drum', text: 'Snare Drum', weight: 0, color: '#DC143C', cc: 0 }],
      ['kick-drum', { promptId: 'kick-drum', text: 'Kick Drum', weight: 0, color: '#8B0000', cc: 0 }],
      ['hi-hat', { promptId: 'hi-hat', text: 'Hi-Hat', weight: 0, color: '#C0C0C0', cc: 0 }],
      ['crash-cymbal', { promptId: 'crash-cymbal', text: 'Crash Cymbal', weight: 0, color: '#D3D3D3', cc: 0 }],
      ['ride-cymbal', { promptId: 'ride-cymbal', text: 'Ride Cymbal', weight: 0, color: '#A9A9A9', cc: 0 }],
      ['tambourine', { promptId: 'tambourine', text: 'Tambourine', weight: 0, color: '#FFD700', cc: 0 }],
      ['shaker', { promptId: 'shaker', text: 'Shaker', weight: 0, color: '#F4A460', cc: 0 }],
      ['conga', { promptId: 'conga', text: 'Conga', weight: 0, color: '#8B4513', cc: 0 }],
      ['bongo', { promptId: 'bongo', text: 'Bongo', weight: 0, color: '#A0522D', cc: 0 }],
      ['timpani', { promptId: 'timpani', text: 'Timpani', weight: 0, color: '#8B4513', cc: 0 }],
      ['marimba', { promptId: 'marimba', text: 'Marimba', weight: 0, color: '#DEB887', cc: 0 }],
      ['xylophone', { promptId: 'xylophone', text: 'Xylophone', weight: 0, color: '#F5DEB3', cc: 0 }],
      ['vibraphone', { promptId: 'vibraphone', text: 'Vibraphone', weight: 0, color: '#E6E6FA', cc: 0 }],
      ['glockenspiel', { promptId: 'glockenspiel', text: 'Glockenspiel', weight: 0, color: '#FFE4E1', cc: 0 }],
      
      // Strings
      ['strings', { promptId: 'strings', text: 'Strings', weight: 0, color: '#9900FF', cc: 0 }],
      ['violin', { promptId: 'violin', text: 'Violin', weight: 0, color: '#5200FF', cc: 0 }],
      ['viola', { promptId: 'viola', text: 'Viola', weight: 0, color: '#6A0DAD', cc: 0 }],
      ['cello', { promptId: 'cello', text: 'Cello', weight: 0, color: '#FF25F6', cc: 0 }],
      ['double-bass-string', { promptId: 'double-bass-string', text: 'Double Bass', weight: 0, color: '#8B4513', cc: 0 }],
      ['harp', { promptId: 'harp', text: 'Harp', weight: 0, color: '#FFB6C1', cc: 0 }],
      ['sitar', { promptId: 'sitar', text: 'Sitar', weight: 0, color: '#FF8C00', cc: 0 }],
      ['erhu', { promptId: 'erhu', text: 'Erhu', weight: 0, color: '#FF4500', cc: 0 }],
      
      // Brass
      ['trumpet', { promptId: 'trumpet', text: 'Trumpet', weight: 0, color: '#FFDD28', cc: 0 }],
      ['trombone', { promptId: 'trombone', text: 'Trombone', weight: 0, color: '#FFA500', cc: 0 }],
      ['french-horn', { promptId: 'french-horn', text: 'French Horn', weight: 0, color: '#FF7F50', cc: 0 }],
      ['tuba', { promptId: 'tuba', text: 'Tuba', weight: 0, color: '#CD853F', cc: 0 }],
      ['cornet', { promptId: 'cornet', text: 'Cornet', weight: 0, color: '#DAA520', cc: 0 }],
      ['flugelhorn', { promptId: 'flugelhorn', text: 'Flugelhorn', weight: 0, color: '#B8860B', cc: 0 }],
      
      // Woodwinds
      ['flute', { promptId: 'flute', text: 'Flute', weight: 0, color: '#3DFFAB', cc: 0 }],
      ['piccolo', { promptId: 'piccolo', text: 'Piccolo', weight: 0, color: '#98FB98', cc: 0 }],
      ['clarinet', { promptId: 'clarinet', text: 'Clarinet', weight: 0, color: '#87CEEB', cc: 0 }],
      ['bass-clarinet', { promptId: 'bass-clarinet', text: 'Bass Clarinet', weight: 0, color: '#4682B4', cc: 0 }],
      ['oboe', { promptId: 'oboe', text: 'Oboe', weight: 0, color: '#DDA0DD', cc: 0 }],
      ['english-horn', { promptId: 'english-horn', text: 'English Horn', weight: 0, color: '#DA70D6', cc: 0 }],
      ['bassoon', { promptId: 'bassoon', text: 'Bassoon', weight: 0, color: '#8B008B', cc: 0 }],
      ['contrabassoon', { promptId: 'contrabassoon', text: 'Contrabassoon', weight: 0, color: '#4B0082', cc: 0 }],
      ['recorder', { promptId: 'recorder', text: 'Recorder', weight: 0, color: '#32CD32', cc: 0 }],
      ['pan-flute', { promptId: 'pan-flute', text: 'Pan Flute', weight: 0, color: '#00FF7F', cc: 0 }],
      
      // Saxophones
      ['saxophone', { promptId: 'saxophone', text: 'Saxophone', weight: 0, color: '#2AF6DE', cc: 0 }],
      ['alto-sax', { promptId: 'alto-sax', text: 'Alto Sax', weight: 0, color: '#00CED1', cc: 0 }],
      ['tenor-sax', { promptId: 'tenor-sax', text: 'Tenor Sax', weight: 0, color: '#20B2AA', cc: 0 }],
      ['baritone-sax', { promptId: 'baritone-sax', text: 'Baritone Sax', weight: 0, color: '#008B8B', cc: 0 }],
      ['soprano-sax', { promptId: 'soprano-sax', text: 'Soprano Sax', weight: 0, color: '#00FFFF', cc: 0 }],
      
      // Keyboards & Organs
      ['organ', { promptId: 'organ', text: 'Organ', weight: 0, color: '#D9B2FF', cc: 0 }],
      ['pipe-organ', { promptId: 'pipe-organ', text: 'Pipe Organ', weight: 0, color: '#9370DB', cc: 0 }],
      ['hammond-organ', { promptId: 'hammond-organ', text: 'Hammond Organ', weight: 0, color: '#8A2BE2', cc: 0 }],
      ['accordion', { promptId: 'accordion', text: 'Accordion', weight: 0, color: '#FF69B4', cc: 0 }],
      ['concertina', { promptId: 'concertina', text: 'Concertina', weight: 0, color: '#FF1493', cc: 0 }],
      
      // Synthesizers & Electronic
      ['synth', { promptId: 'synth', text: 'Synth', weight: 0, color: '#DDA0DD', cc: 0 }],
      ['analog-synth', { promptId: 'analog-synth', text: 'Analog Synth', weight: 0, color: '#BA55D3', cc: 0 }],
      ['digital-synth', { promptId: 'digital-synth', text: 'Digital Synth', weight: 0, color: '#9370DB', cc: 0 }],
      ['pad-synth', { promptId: 'pad-synth', text: 'Pad Synth', weight: 0, color: '#8A2BE2', cc: 0 }],
      ['lead-synth', { promptId: 'lead-synth', text: 'Lead Synth', weight: 0, color: '#7B68EE', cc: 0 }],
      ['bass-synth', { promptId: 'bass-synth', text: 'Bass Synth', weight: 0, color: '#6A5ACD', cc: 0 }],
      ['arp-synth', { promptId: 'arp-synth', text: 'Arp Synth', weight: 0, color: '#483D8B', cc: 0 }],
      ['sequencer', { promptId: 'sequencer', text: 'Sequencer', weight: 0, color: '#4169E1', cc: 0 }],
      
      // Ethnic & World Instruments
      ['harmonica', { promptId: 'harmonica', text: 'Harmonica', weight: 0, color: '#D8FF3E', cc: 0 }],
      ['kazoo', { promptId: 'kazoo', text: 'Kazoo', weight: 0, color: '#FFFF00', cc: 0 }],
      ['whistle', { promptId: 'whistle', text: 'Whistle', weight: 0, color: '#ADFF2F', cc: 0 }],
      ['ocarina', { promptId: 'ocarina', text: 'Ocarina', weight: 0, color: '#9ACD32', cc: 0 }],
      ['didgeridoo', { promptId: 'didgeridoo', text: 'Didgeridoo', weight: 0, color: '#556B2F', cc: 0 }],
      ['kalimba', { promptId: 'kalimba', text: 'Kalimba', weight: 0, color: '#6B8E23', cc: 0 }],
      ['steel-drum', { promptId: 'steel-drum', text: 'Steel Drum', weight: 0, color: '#FFD700', cc: 0 }],
      ['tabla', { promptId: 'tabla', text: 'Tabla', weight: 0, color: '#CD853F', cc: 0 }],
      ['djembe', { promptId: 'djembe', text: 'Djembe', weight: 0, color: '#8B4513', cc: 0 }],
      ['cajon', { promptId: 'cajon', text: 'Cajon', weight: 0, color: '#A0522D', cc: 0 }],
      
      // Vocal & Choir
      ['vocals', { promptId: 'vocals', text: 'Vocals', weight: 0, color: '#FF69B4', cc: 0 }],
      ['choir', { promptId: 'choir', text: 'Choir', weight: 0, color: '#FFB6C1', cc: 0 }],
      ['backing-vocals', { promptId: 'backing-vocals', text: 'Backing Vocals', weight: 0, color: '#FFC0CB', cc: 0 }],
      ['vocal-harmony', { promptId: 'vocal-harmony', text: 'Vocal Harmony', weight: 0, color: '#FFA0B4', cc: 0 }],
      
      // General Categories
      ['brass', { promptId: 'brass', text: 'Brass', weight: 0, color: '#FFB347', cc: 0 }],
      ['woodwind', { promptId: 'woodwind', text: 'Woodwind', weight: 0, color: '#98D8C8', cc: 0 }],
      ['percussion', { promptId: 'percussion', text: 'Percussion', weight: 0, color: '#D2691E', cc: 0 }],
      ['strings-section', { promptId: 'strings-section', text: 'Strings Section', weight: 0, color: '#9370DB', cc: 0 }]
    ]);
    
    this.midiDispatcher = new MidiDispatcher();
    this.midiDispatcher.addEventListener('cc-message', (e: Event) => {
      const customEvent = e as CustomEvent<ControlChange>;
      const { cc, value } = customEvent.detail;
      // Slot-level learn: map CC to visible slot index (container binding)
      if (this.learningSlotIndex !== null) {
        this.slotCcMap = new Map(this.slotCcMap.set(this.learningSlotIndex, cc));
        this.learningSlotIndex = null;
        this.saveSlotMappings();
        this.requestUpdate();
        return;
      }

      // If a CC is bound to a slot, apply it to the prompt currently occupying that slot
      if (this.slotCcMap.size > 0) {
        const promptsToShow = this.selectedOrder
          .map((id) => this.prompts.get(id))
          .filter((p): p is Prompt => !!p)
          .slice(0, this.maxSelectedPrompts);
        for (let i = 0; i < promptsToShow.length; i++) {
          const boundCc = this.slotCcMap.get(i);
          if (boundCc && boundCc === cc) {
            const newWeight = (value / 127) * 2;
            this.handleSliderChange(promptsToShow[i].promptId, newWeight);
            // Do not return; allow prompt/instrument-level mappings to also respond if desired
          }
        }
      }
      if (this.learningPromptId) {
        const prompt = this.prompts.get(this.learningPromptId);
        if (prompt) {
          prompt.cc = cc;
          const newPrompts = new Map(this.prompts);
          newPrompts.set(this.learningPromptId, prompt);
          this.prompts = newPrompts;
          this.learningPromptId = null;
          this.requestUpdate();
          this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
          this.saveMidiMappings();
        }
      } else if (this.learningInstrumentId) {
        const instrument = this.instruments.get(this.learningInstrumentId);
        if (instrument) {
          instrument.cc = cc;
          const newInstruments = new Map(this.instruments);
          newInstruments.set(this.learningInstrumentId, instrument);
          this.instruments = newInstruments;
          this.learningInstrumentId = null;
          this.requestUpdate();
          this.dispatchEvent(new CustomEvent('instrument-changed', { detail: instrument }));
          this.saveMidiMappings();
        }
      } else {
        // Not in learn mode: adjust mapped prompt/instrument weights by incoming CC
        const newWeight = (value / 127) * 2;
        // Update prompts with matching CC (> 0)
        let updatedPrompts = false;
        this.prompts.forEach((p) => {
          if (p.cc > 0 && p.cc === cc) {
            this.handleSliderChange(p.promptId, newWeight);
            updatedPrompts = true;
          }
        });
        // Update instruments with matching CC (> 0)
        this.instruments.forEach((inst) => {
          if (inst.cc > 0 && inst.cc === cc) {
            this.handleInstrumentChange(inst.promptId, newWeight);
          }
        });
        if (updatedPrompts) {
          this.requestUpdate();
        }
      }
    });
    // Load persisted prompt weights and selected order
    this.loadPromptWeights();
    this.loadStyleCount?.();
    this.loadSelectedOrder();
    if (this.selectedOrder.length === 0) {
      // Initialize selected prompts empty by default; do not auto-fill more than max.
      // If there are existing weights > 0, pick the top up to maxSelectedPrompts.
      const weighted = [...this.prompts.values()]
        .filter(p => (p.weight ?? 0) > 0.001)
        .sort((a, b) => (b.weight || 0) - (a.weight || 0));
      for (const p of weighted) {
        if (this.selectedOrder.length >= this.maxSelectedPrompts) break;
        this.selectedOrder.push(p.promptId);
      }
      // If still empty (fresh install), seed grid with 4 random styles with random weights
      if (this.selectedOrder.length === 0) {
        const allIds = [...this.prompts.keys()];
        for (let i = allIds.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allIds[i], allIds[j]] = [allIds[j], allIds[i]];
        }
        const seedCount = Math.min(4, allIds.length);
        const chosen = allIds.slice(0, seedCount);
        this.selectedOrder = chosen;
        const updated = new Map(this.prompts);
        chosen.forEach((id) => {
          const p = updated.get(id);
          if (p) { 
            p.weight = Math.random() * 1.9 + 0.1; // Random weight between 0.1 and 2.0
            updated.set(id, p); 
          }
        });
        this.prompts = updated;
        this.saveSelectedOrder();
        this.savePromptWeights();
      }
    }
    // Sync Set for quick membership checks
    this.selectedPromptIds = new Set(this.selectedOrder);

    // Load saved MIDI CC mappings (if any)
    this.loadMidiMappings();
    this.loadSlotMappings();
    this.loadShowAll();
    this.loadScenes();
  }

  override connectedCallback() {
    super.connectedCallback();
    this._onKeyDown = this._onKeyDown.bind(this);
    window.addEventListener('keydown', this._onKeyDown);
    // Detect mobile viewport
    this.mql = window.matchMedia('(max-width: 768px)');
    const handleMql = () => { this.isMobile = !!this.mql?.matches; if (!this.isMobile) this.showMobileMenu = false; this.requestUpdate(); };
    this.mql.addEventListener ? this.mql.addEventListener('change', handleMql) : this.mql.addListener(handleMql);
    handleMql();
    
    // Check authentication status
    this.checkAuthStatus();
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this._onKeyDown);
    if (this.mql) {
      const noop = () => {};
      try { this.mql.removeEventListener?.('change', noop); } catch {}
    }
    super.disconnectedCallback();
  }

  private _onKeyDown(e: KeyboardEvent) {
    // Konami code handling
    const key = e.key;
    const expect = this.konamiSeq[this.konamiIndex];
    if (key === expect) {
      this.konamiIndex += 1;
      if (this.konamiIndex === this.konamiSeq.length) {
        this.konamiUnlocked = true;
        this.konamiIndex = 0;
      }
    } else {
      // If mismatch, check if this key restarts the sequence
      this.konamiIndex = key === this.konamiSeq[0] ? 1 : 0;
    }

    if (e.key === '?' || e.key === '/') {
      e.preventDefault();
      this.toggleHelp();
    } else if (e.key === 'Escape') {
      if (this.isMobile && this.showMobileMenu) {
        e.preventDefault();
        this.showMobileMenu = false;
        this.requestUpdate();
      }
    }
  }

  private saveSlotMappings() {
    try {
      const obj: Record<string, number> = {};
      this.slotCcMap.forEach((cc, idx) => { obj[idx.toString()] = cc; });
      localStorage.setItem(this.SLOT_CC_STORAGE_KEY, JSON.stringify(obj));
    } catch {}
  }

  private loadSlotMappings() {
    try {
      const str = localStorage.getItem(this.SLOT_CC_STORAGE_KEY);
      if (!str) return;
      const obj = JSON.parse(str) as Record<string, number>;
      const map = new Map<number, number>();
      Object.entries(obj).forEach(([k, v]) => map.set(Number(k), v));
      this.slotCcMap = map;
    } catch {}
  }

  private saveMidiMappings() {
    try {
      const promptMappings: Record<string, number> = {};
      this.prompts.forEach((p) => { if (p.cc && p.cc > 0) { promptMappings[p.promptId] = p.cc; } });
      localStorage.setItem(this.PROMPT_CC_STORAGE_KEY, JSON.stringify(promptMappings));

      const instrumentMappings: Record<string, number> = {};
      this.instruments.forEach((i) => { if (i.cc && i.cc > 0) { instrumentMappings[i.promptId] = i.cc; } });
      localStorage.setItem(this.INSTR_CC_STORAGE_KEY, JSON.stringify(instrumentMappings));
    } catch (e) {
      // ignore storage errors
    }
  }

  private loadMidiMappings() {
    try {
      const promptStr = localStorage.getItem(this.PROMPT_CC_STORAGE_KEY);
      if (promptStr) {
        const map = JSON.parse(promptStr) as Record<string, number>;
        const updated = new Map(this.prompts);
        Object.entries(map).forEach(([promptId, cc]) => {
          const p = updated.get(promptId);
          if (p) { p.cc = cc; updated.set(promptId, p); }
        });
        this.prompts = updated;
      }

      const instrStr = localStorage.getItem(this.INSTR_CC_STORAGE_KEY);
      if (instrStr) {
        const map = JSON.parse(instrStr) as Record<string, number>;
        const updated = new Map(this.instruments);
        Object.entries(map).forEach(([instrumentId, cc]) => {
          const i = updated.get(instrumentId);
          if (i) { i.cc = cc; updated.set(instrumentId, i); }
        });
        this.instruments = updated;
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  private goHome() {
    this.dispatchEvent(new CustomEvent('go-home'));
  }

  private toggleHelp() { this.showHelp = !this.showHelp; }
  private toggleExportMenu() { this.showExportMenu = !this.showExportMenu; }
  private toggleScenesMenu() { this.showScenesMenu = !this.showScenesMenu; }

  private async exportWavOrMp3(kind: 'wav' | 'mp3') {
    this.dispatchEvent(new CustomEvent('export-audio', { detail: { kind } }));
  }

  private handlePromptChanged(e: CustomEvent<Prompt>) {
    const { promptId, text, weight, cc } = e.detail;
    const prompt = this.prompts.get(promptId);

    if (!prompt) {
      console.error('prompt not found', promptId);
      return;
    }

    prompt.text = text;
    prompt.weight = weight;
    prompt.cc = cc;

    const newPrompts = new Map(this.prompts);
    newPrompts.set(promptId, prompt);

    this.prompts = newPrompts;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('prompts-changed', { detail: this.prompts }),
    );
  }

  /** Generates radial gradients for each prompt based on weight and color. */
  private readonly makeBackground = throttle(
    () => {
      const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

      const MAX_WEIGHT = 0.5;
      const MAX_ALPHA = 0.6;

      const bg: string[] = [];

      [...this.prompts.values()].forEach((p, i) => {
        const alphaPct = clamp01(p.weight / MAX_WEIGHT) * MAX_ALPHA;
        const alpha = Math.round(alphaPct * 0xff)
          .toString(16)
          .padStart(2, '0');

        const stop = p.weight / 2;
        const x = (i % 4) / 3;
        const y = Math.floor(i / 4) / 3;
        const s = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${p.color}${alpha} 0px, ${p.color}00 ${stop * 100}%)`;

        bg.push(s);
      });

      return bg.join(', ');
    },
    30, // don't re-render more than once every XXms
  );

  private toggleShowMidi() {
    return this.setShowMidi(!this.showMidi);
  }

  public async setShowMidi(show: boolean) {
    this.showMidi = show;
    if (!this.showMidi) return;
    try {
      const inputIds = await this.midiDispatcher.getMidiAccess();
      this.midiInputIds = inputIds;
      this.activeMidiInputId = this.midiDispatcher.activeMidiInputId;
    } catch (e) {
      this.showMidi = false;
      this.dispatchEvent(new CustomEvent('error', {detail: e.message}));
    }
  }

  private handleMidiInputChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newMidiId = selectElement.value;
    this.activeMidiInputId = newMidiId;
    this.midiDispatcher.activeMidiInputId = newMidiId;
  }

  private playPause() {
    this.dispatchEvent(new CustomEvent('play-pause'));
  }

  private toggleRecording() {
    this.dispatchEvent(new CustomEvent('toggle-recording'));
  }

  private toggleAutoEvolve() {
    this.autoEvolveEnabled = !this.autoEvolveEnabled;
    if (this.autoEvolveEnabled) {
      this.startAutoEvolve();
    } else {
      this.stopAutoEvolve();
    }
  }

  private startAutoEvolve() {
    this.stopAutoEvolve();
    const run = () => this.runAutoEvolveOnce();
    run();
    this.evolveTimer = window.setInterval(run, this.autoEvolveRateSec * 1000);
  }

  // --- Scenes: Save/Load/Morph ---
  private loadScenes() {
    try {
      const raw = localStorage.getItem(this.SCENES_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<{ id: string; name: string; weights: Record<string, number>; selectedOrder: string[] }>;
      if (Array.isArray(parsed)) {
        this.scenes = parsed;
      }
    } catch {}
  }

  private persistScenes() {
    try { localStorage.setItem(this.SCENES_STORAGE_KEY, JSON.stringify(this.scenes)); } catch {}
  }

  private saveScene = () => {
    const weights: Record<string, number> = {};
    this.prompts.forEach((p, id) => { weights[id] = p.weight || 0; });
    const nextIndex = this.scenes.length + 1;
    const scene = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: `Scene ${nextIndex}`,
      weights,
      selectedOrder: [...this.selectedOrder],
    };
    this.scenes = [...this.scenes, scene];
    this.persistScenes();
    this.showScenesMenu = true;
  }

  private deleteScene = (id: string) => {
    this.scenes = this.scenes.filter(s => s.id !== id);
    this.persistScenes();
  }

  private renameScene = (id: string) => {
    const name = prompt('Rename scene to:', this.scenes.find(s => s.id === id)?.name || 'Scene');
    if (!name) return;
    this.scenes = this.scenes.map(s => s.id === id ? { ...s, name } : s);
    this.persistScenes();
  }

  private recallScene = (id: string) => {
    const scene = this.scenes.find(s => s.id === id);
    if (!scene) return;
    // Update grid selection first
    this.selectedOrder = [...scene.selectedOrder];
    this.selectedPromptIds = new Set(this.selectedOrder);

    // Prepare morph
    const start: Record<string, number> = {};
    this.prompts.forEach((p, pid) => { start[pid] = p.weight || 0; });
    const target = scene.weights;
    const durationMs = Math.max(0.1, this.sceneMorphSec) * 1000;
    const startTime = performance.now();

    const step = () => {
      const now = performance.now();
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = t; // linear for now
      const updated = new Map(this.prompts);
      let changed = false;
      updated.forEach((p, pid) => {
        const a = start[pid] ?? 0;
        const b = target[pid] ?? 0;
        const w = a + (b - a) * eased;
        if (Math.abs((p.weight || 0) - w) > 1e-3) {
          p.weight = Math.max(0, Math.min(2, w));
          updated.set(pid, p);
          changed = true;
        }
      });
      if (changed) {
        this.prompts = updated;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      }
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        this.savePromptWeights();
      }
    };
    requestAnimationFrame(step);
    this.showScenesMenu = false;
  }

  private stopAutoEvolve() {
    if (this.evolveTimer !== null) {
      clearInterval(this.evolveTimer);
      this.evolveTimer = null;
    }
  }

  private runAutoEvolveOnce() {
    // Subtle random walk on active prompts
    const activePrompts: Prompt[] = this.selectedOrder
      .map((id) => this.prompts.get(id))
      .filter((p): p is Prompt => !!p)
      .slice(0, this.maxSelectedPrompts);
    if (activePrompts.length === 0) return;

    const updated = new Map(this.prompts);
    let changed = false;
    for (const p of activePrompts) {
      const scale = Math.max(0, Math.min(1, this.autoEvolveDepth));
      const delta = (Math.random() - 0.5) * 0.2 * scale; // ±0.1 at depth=1
      const newW = Math.max(0, Math.min(2, (p.weight || 0) + delta));
      if (Math.abs(newW - p.weight) > 0.001) {
        p.weight = newW;
        updated.set(p.promptId, p);
        changed = true;
      }
    }

    // Occasionally rotate one prompt to introduce new material
    if (Math.random() < 0.2) {
      const pool = [...this.prompts.keys()].filter((id) => !this.selectedOrder.includes(id));
      if (pool.length > 0) {
        const swapIn = pool[Math.floor(Math.random() * pool.length)];
        const idxOut = Math.floor(Math.random() * this.selectedOrder.length);
        const newOrder = [...this.selectedOrder];
        newOrder[idxOut] = swapIn;
        this.selectedOrder = newOrder;
        this.selectedPromptIds = new Set(this.selectedOrder);
        this.resetWeightsForNonDisplayedPrompts();
      }
    }

    if (changed) {
      this.prompts = updated;
      this.savePromptWeights();
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    }
  }

  public addFilteredPrompt(prompt: string) {
    this.filteredPrompts = new Set([...this.filteredPrompts, prompt]);
  }

  private handleSliderChange(promptId: string, value: number) {
    console.log('handleSliderChange called with promptId:', promptId, 'value:', value);
    const prompt = this.prompts.get(promptId);
    if (prompt) {
      prompt.weight = value;
      // Update the prompts map and dispatch the prompts-changed event
      const newPrompts = new Map(this.prompts);
      newPrompts.set(promptId, prompt);
      this.prompts = newPrompts;
      
      console.log('Slider changed for prompt:', promptId, 'new weight:', value);
      console.log('Dispatching prompts-changed event with prompts:', this.prompts);
      
      // Force a re-render and dispatch the event
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent('prompts-changed', { detail: this.prompts }),
      );
      this.savePromptWeights();

      // If the prompt is not currently selected/displayed, ensure it remains at 0
      if (!this.selectedPromptIds.has(promptId) && prompt.weight !== 0) {
        prompt.weight = 0;
        const updated = new Map(this.prompts);
        updated.set(promptId, prompt);
        this.prompts = updated;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      }
    } else {
      console.error('Prompt not found for ID:', promptId);
    }
  }

  private handleInstrumentChange(instrumentId: string, value: number) {
    const instrument = this.instruments.get(instrumentId);
    if (instrument) {
      instrument.weight = value;
      // Update the instruments map
      const newInstruments = new Map(this.instruments);
      newInstruments.set(instrumentId, instrument);
      this.instruments = newInstruments;
      this.requestUpdate();
      
      // Dispatch instrument change event
      this.dispatchEvent(new CustomEvent('instrument-changed', { detail: instrument }));

      // Selecting logic: enforce only one instrument active at a time
      if (value > 0) {
        // Deselect previous selection and zero out its weight
        if (this.selectedInstrumentId && this.selectedInstrumentId !== instrumentId) {
          const prev = this.instruments.get(this.selectedInstrumentId);
          if (prev) {
            prev.weight = 0;
            const map2 = new Map(this.instruments);
            map2.set(prev.promptId, prev);
            this.instruments = map2;
            this.dispatchEvent(new CustomEvent('instrument-changed', { detail: prev }));
          }
        }
        this.selectedInstrumentId = instrumentId;
      } else if (this.selectedInstrumentId === instrumentId && value === 0) {
        this.selectedInstrumentId = null;
      }
    }
  }

  private toggleStyleSelected(promptId: string) {
    const isSelected = this.selectedPromptIds.has(promptId);
    if (!isSelected) {
      if (this.selectedPromptIds.size >= this.maxSelectedPrompts) {
        this.dispatchEvent(new CustomEvent('error', { detail: `You can select up to ${this.maxSelectedPrompts} styles.` }));
        return;
      }
      // Append to order and set
      this.selectedOrder = [...this.selectedOrder, promptId];
      this.selectedPromptIds = new Set(this.selectedOrder);
      // Auto-activate newly added style with a random weight
      const p = this.prompts.get(promptId);
      if (p && (!p.weight || p.weight === 0)) {
        p.weight = Math.random() * 1.9 + 0.1; // Random weight between 0.1 and 2.0
        const updated = new Map(this.prompts); updated.set(promptId, p);
        this.prompts = updated;
        this.savePromptWeights();
        this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      }
    } else {
      // Remove from order and set
      this.selectedOrder = this.selectedOrder.filter((id) => id !== promptId);
      this.selectedPromptIds = new Set(this.selectedOrder);
    }

    // Clear search after selection
    this.styleSearchQuery = '';
    // Ensure prompts not displayed in grid are not active: zero their weights
    this.resetWeightsForNonDisplayedPrompts();
    this.saveSelectedOrder();
  }

  /** Zero-out weights for prompts that are not currently selected/displayed. */
  private resetWeightsForNonDisplayedPrompts() {
    let changed = false;
    const updated = new Map(this.prompts);
    updated.forEach((p, id) => {
      if (!this.selectedPromptIds.has(id) && p.weight !== 0) {
        p.weight = 0;
        updated.set(id, p);
        changed = true;
      }
    });
    if (changed) {
      this.prompts = updated;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    }
  }

  private async ensureMidiAccess(): Promise<boolean> {
    try {
      const inputIds = await this.midiDispatcher.getMidiAccess();
      this.midiInputIds = inputIds;
      this.activeMidiInputId = this.midiDispatcher.activeMidiInputId;
      if (inputIds.length === 0) {
        this.dispatchEvent(new CustomEvent('error', { detail: 'No MIDI devices found.' }));
        return false;
      }
      return true;
    } catch (e: any) {
      this.dispatchEvent(new CustomEvent('error', { detail: e.message }));
      return false;
    }
  }

  private async toggleLearnMode(promptId: string) {
    if (this.learningPromptId === promptId) {
      this.learningPromptId = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningInstrumentId = null; // only one learn target at a time
    this.learningPromptId = promptId;
  }

  private async toggleSlotLearn(slotIndex: number) {
    if (this.learningSlotIndex === slotIndex) {
      this.learningSlotIndex = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningPromptId = null;
    this.learningInstrumentId = null;
    this.learningSlotIndex = slotIndex;
  }

  private async toggleInstrumentLearnMode(instrumentId: string) {
    if (this.learningInstrumentId === instrumentId) {
      this.learningInstrumentId = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningPromptId = null; // only one learn target at a time
    this.learningInstrumentId = instrumentId;
    // Auto-assign a default MIDI note range to this instrument if none set: map CC 0-7 to keys C4-B4
    // For now, we keep CC learn only; note mapping could be implemented here later.
  }

  private handleStyleSlotChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = Number(select.value);
    if (![2,4,6,8,16].includes(value)) return;
    this.maxSelectedPrompts = value;
    // Trim order if necessary
    if (this.selectedOrder.length > value) {
      this.selectedOrder = this.selectedOrder.slice(0, value);
      this.selectedPromptIds = new Set(this.selectedOrder);
      this.resetWeightsForNonDisplayedPrompts();
    }
    this.saveStyleCount();
  }

  private saveStyleCount() {
    try { localStorage.setItem(this.STYLE_COUNT_STORAGE_KEY, String(this.maxSelectedPrompts)); } catch {}
  }

  private loadStyleCount() {
    try {
      const raw = localStorage.getItem(this.STYLE_COUNT_STORAGE_KEY);
      if (!raw) return;
      const n = Number(raw);
      if ([2,4,6,8,16].includes(n)) this.maxSelectedPrompts = n;
    } catch {}
  }

  private toggleStyleMute(styleId: string) {
    // TODO: Implement style muting
    console.log('Toggle mute for style:', styleId);
    // Clear search after selection
    this.styleSearchQuery = '';
  }

  private isStyleMuted(styleId: string): boolean {
    // TODO: Implement style mute state
    return false;
  }

  private resetAll = () => {
    this.selectedOrder = [];
    this.selectedPromptIds = new Set();
    const updated = new Map(this.prompts);
    updated.forEach((p) => { if (p.weight !== 0) { p.weight = 0; } });
    this.prompts = updated;
    this.saveSelectedOrder();
    this.savePromptWeights();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
  }

  private toggleShowAll = () => {
    this.showAllPrompts = !this.showAllPrompts;
    this.saveShowAll();
    // When turning off show-all, ensure we zero weights for non-displayed prompts again
    if (!this.showAllPrompts) {
      this.resetWeightsForNonDisplayedPrompts();
    }
    this.requestUpdate();
  }

  private randomizeGrid = () => {
    const allIds = [...this.prompts.keys()];
    const k = Math.min(this.maxSelectedPrompts, allIds.length);
    for (let i = allIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIds[i], allIds[j]] = [allIds[j], allIds[i]];
    }
    const chosen = allIds.slice(0, k);
    this.selectedOrder = chosen;
    this.selectedPromptIds = new Set(this.selectedOrder);
    
    // Assign random weights to selected styles (0.1 to 2.0)
    const updated = new Map(this.prompts);
    chosen.forEach((id) => {
      const p = updated.get(id);
      if (p) {
        p.weight = Math.random() * 1.9 + 0.1; // Random weight between 0.1 and 2.0
        updated.set(id, p);
      }
    });
    this.prompts = updated;
    
    this.resetWeightsForNonDisplayedPrompts();
    this.saveSelectedOrder();
    this.savePromptWeights();
    this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    this.requestUpdate();
  }

  private presetSlotCcMap = () => {
    // Determine the set of prompts currently shown in the grid, in order
    const showAll = false; // always show selected grid only; "ALL" button was removed
    const promptsToShow: Prompt[] = showAll
      ? [...this.prompts.values()]
      : this.selectedOrder
          .map((id) => this.prompts.get(id))
          .filter((p): p is Prompt => !!p)
          .slice(0, this.maxSelectedPrompts);

    const newMap = new Map<number, number>();
    for (let i = 0; i < promptsToShow.length; i++) {
      const cc = 48 + (i % 8); // strictly 48..55 only
      newMap.set(i, cc);
    }
    this.slotCcMap = newMap;
    this.saveSlotMappings();
    this.requestUpdate();
  }

  // Authentication methods
  private async checkAuthStatus() {
    try {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        const userResponse = await authService.getCurrentUser();
        this.currentUser = userResponse.user;
        this.userId = this.currentUser.id.toString();
        this.userEmail = this.currentUser.email;
      } else {
        this.currentUser = null;
        this.userId = '';
        this.userEmail = '';
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      this.currentUser = null;
      this.userId = '';
      this.userEmail = '';
    }
  }

  private openAuthModal() {
    this.showAuthModal = true;
  }

  private handleAuthSuccess(event: CustomEvent) {
    const { user } = event.detail;
    this.currentUser = user;
    this.userId = user.id.toString();
    this.userEmail = user.email;
    this.showAuthModal = false;
  }

  private handleAuthLogout() {
    this.currentUser = null;
    this.userId = '';
    this.userEmail = '';
  }

  override render() {
    return html`
      <!-- DAW Header -->
      <header class="daw-header ${this.isMobile ? 'mobile-hidden' : ''}">
        ${this.isMobile && !this.showMobileMenu ? html`
          <div class="toolbar-left" style="justify-content: space-between; width:100%">
            <gf-brand></gf-brand>
            <div class="transport-controls compact">
              <play-pause-button .playbackState=${this.playbackState} @click=${this.playPause}></play-pause-button>
            </div>
          </div>
        ` : html`
          <div class="toolbar-left">
            ${this.isMobile ? html`<button class="toolbar-btn" @click=${() => { this.showMobileMenu = false; }} title="Close menu">✕</button>` : ''}
            <gf-brand></gf-brand>
            <div class="transport-controls">
              <play-pause-button .playbackState=${this.playbackState} @click=${this.playPause}></play-pause-button>
              <div class="status-indicator">
                <div class="status-dot ${this.playbackState === 'playing' ? 'playing' : ''}"></div>
                <span>${this.playbackState === 'playing' ? 'Playing' : 'Stopped'}</span>
              </div>
            </div>
          </div>
          
          <div class="toolbar-right">
            <!-- Desktop Menu Items -->
            ${!this.isMobile ? html`
              <!-- Core Actions -->
              <button class="toolbar-btn ${this.isRecording ? 'active' : ''}" @click=${this.toggleRecording} title="Record / Stop">⏺</button>
              <button class="toolbar-btn" @click=${this.resetAll} title="Reset all">♻</button>
              <button class="toolbar-btn" @click=${this.goHome} title="Return to Home">🏠</button>
              
              <!-- Generation -->
              <button class="toolbar-btn" @click=${this.randomizeGrid} title="Fill grid randomly">🎲</button>
              ${this.konamiUnlocked ? html`<button class="toolbar-btn" @click=${this.presetSlotCcMap} title="Preset CC 48–55">CC48–55</button>` : ''}
              
              <!-- Export -->
            <require-pro .userId=${this.userId} .email=${this.userEmail} inline>
                <button class="toolbar-btn" @click=${this.toggleExportMenu} title="Export">⬇</button>
            </require-pro>
              
              <!-- Settings -->
              <button class="toolbar-btn ${this.showSettingsMenu ? 'active' : ''}" @click=${() => { this.showSettingsMenu = !this.showSettingsMenu; }} title="Generator Settings">⚙</button>
              
              <!-- Scenes -->
              <button class="toolbar-btn" @click=${this.toggleScenesMenu} title="Scenes">🎬</button>
              
              <!-- Help -->
              <button class="toolbar-btn" @click=${this.toggleHelp} title="How to use">❓</button>
              
              <!-- Authentication -->
              ${this.currentUser 
                ? html`<user-profile .user=${this.currentUser} @auth-logout=${this.handleAuthLogout}></user-profile>`
                : html`<button class="toolbar-btn" @click=${this.openAuthModal} title="Sign In">👤</button>`
              }
            ` : ''}
            
          ${this.isMobile ? '' : html`
            <select class="midi-select" title="Style slots" @change=${this.handleStyleSlotChange} .value=${String(this.maxSelectedPrompts)}>
              ${[2,4,6,8,16].map(n => html`<option value=${n}>${n} styles</option>`)}
            </select>
          `}
          ${this.isMobile ? '' : html`
            <button class="toolbar-btn ${this.showMidi ? 'active' : ''}" @click=${this.toggleShowMidi}>MIDI</button>
            ${this.showMidi ? html`
              <select class="midi-select" @change=${this.handleMidiInputChange} .value=${this.activeMidiInputId || ''}>
                <option value="">MIDI Input</option>
                ${this.midiInputIds.length > 0
                  ? this.midiInputIds.map(
                      (id) => html`<option value=${id}>${this.midiDispatcher.getDeviceName(id)}</option>`
                    )
                  : html`<option value="">No devices found</option>`}
              </select>
            ` : ''}
            
            <!-- EVOLVE Button -->
            <div style="position: relative;">
              <button class="toolbar-btn ${this.autoEvolveEnabled ? 'active' : ''}" @click=${() => { this.toggleEvolveMenu(); }} title="Auto-Evolve">EVOLVE</button>
              ${this.showEvolveMenu ? html`
                <div class="evolve-submenu">
                  <div class="evolve-header">
                    <h4>Auto-Evolve</h4>
                    <button class="evolve-toggle ${this.autoEvolveEnabled ? 'active' : ''}" @click=${() => { this.toggleAutoEvolve(); }}>${this.autoEvolveEnabled ? 'ON' : 'OFF'}</button>
                  </div>
                  <div class="evolve-controls">
                    <div class="control-row">
                      <label>Rate</label>
                      <select class="midi-select" title="Evolve rate" @change=${(e: Event) => { this.autoEvolveRateSec = Number((e.target as HTMLSelectElement).value); if (this.autoEvolveEnabled) this.startAutoEvolve(); }} .value=${String(this.autoEvolveRateSec)}>
                        ${[8,16,32,64].map(s => html`<option value=${s}>${s}s</option>`)}
                      </select>
                    </div>
                    <div class="control-row">
                      <label>Depth</label>
                      <select class="midi-select" title="Evolve depth" @change=${(e: Event) => { this.autoEvolveDepth = Number((e.target as HTMLSelectElement).value); }} .value=${String(this.autoEvolveDepth)}>
                        <option value="0.1">Subtle</option>
                        <option value="0.15">Light</option>
                        <option value="0.25">Medium</option>
                        <option value="0.4">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>` : ''}
            </div>
          `}
          </div>
        `}
      </header>

      <!-- Main DAW Layout -->
      <div class="daw-layout">
        <!-- Left Panel: Styles & Instruments -->
          <aside class="style-panel">
          <div class="panel-header">
            <div class="panel-toggle">
              <button class="toggle-btn ${this.leftPanelMode === 'styles' ? 'active' : ''}" @click=${() => { this.leftPanelMode = 'styles'; }}>
                Styles
                ${this.leftPanelMode === 'styles' ? html`<span class="active-count">${this.getActiveStylesCount()}</span>` : ''}
              </button>
              <button class="toggle-btn ${this.leftPanelMode === 'instruments' ? 'active' : ''}" @click=${() => { this.leftPanelMode = 'instruments'; }}>
                Instruments
                ${this.leftPanelMode === 'instruments' ? html`<span class="active-count">${this.getActiveInstrumentsCount()}</span>` : ''}
              </button>
            </div>
            
            <!-- Filter Controls -->
            <div class="filter-controls">
              <button class="filter-btn ${this.showActiveOnly ? 'active' : ''}" @click=${this.toggleShowActiveOnly}>
                ${this.showActiveOnly ? 'Show All' : 'Show Active Only'}
              </button>
            </div>
            
            <div class="search-container">
              <div class="search-input-wrapper">
                <input 
                  class="search-input" 
                  type="text" 
                  placeholder=${this.leftPanelMode === 'styles' ? 'Search styles...' : 'Search instruments...'} 
                  aria-label=${this.leftPanelMode === 'styles' ? 'Search styles' : 'Search instruments'} 
                  @input=${(e: Event) => { this.styleSearchQuery = (e.target as HTMLInputElement).value.toLowerCase(); }} 
                  .value=${this.styleSearchQuery} 
                />
                <div class="search-icon">🔍</div>
              </div>
            </div>
          </div>
          <div class="style-list" role="listbox" aria-multiselectable="true" style="${this.isMobile ? 'max-height: 216px;' : ''}">
            ${this.leftPanelMode === 'styles' ? this.renderStyleList() : this.renderInstrumentList()}
          </div>
        </aside>

        <!-- Center: Main Workspace -->
        <main class="workspace ${this.isMobile ? 'mobile-full' : ''}">
          ${this.isMobile ? '' : html`
            <timeline-ruler 
              .currentTime=${this.currentTime || 0}
              .duration=${120}
              .bpm=${120}
              .timeSignature=${4}
              .isPlaying=${this.playbackState === 'playing'}>
            </timeline-ruler>
          `}
          
          <!-- Timeline/Grid Area -->
          <div class="timeline-area">
            ${this.isMobile ? '' : html`
              <div class="timeline-header">
                <h3>deeprabbit — Fresh tracks. Forged by AI.</h3>
              </div>
            `}
            <div class="grid-container">
              ${this.renderPrompts()}
            </div>
          </div>
        </main>

      <!-- Bottom Navigation Bar -->
      ${this.isMobile ? html`
        <div class="bottom-nav">
          <!-- Evolve Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.autoEvolveEnabled ? 'active' : ''}" @click=${() => { this.toggleEvolveMenu(); }} title="Auto-Evolve">
              <div class="nav-icon">🔄</div>
              <div class="nav-label">Evolve</div>
            </button>
          </div>
          
          <!-- Menu Button -->
          <div class="nav-item">
            <button class="nav-btn" @click=${() => { this.toggleMobileMenu(); }} title="Menu">
              <div class="nav-icon">☰</div>
              <div class="nav-label">Menu</div>
            </button>
          </div>
          
          <!-- Play Button (Center) -->
          <div class="nav-item nav-center">
            <button class="nav-btn nav-play ${this.playbackState === 'playing' ? 'playing' : ''}" @click=${this.playPause} title="Play / Pause">
              <div class="nav-icon">${this.playbackState === 'playing' ? '⏸' : '▶'}</div>
            </button>
          </div>
          
          <!-- Settings Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.showSettingsMenu ? 'active' : ''}" @click=${() => { this.toggleSettingsMenu(); }} title="Settings">
              <div class="nav-icon">⚙</div>
              <div class="nav-label">Settings</div>
            </button>
          </div>
          
          <!-- Record Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.isRecording ? 'active' : ''}" @click=${() => { this.toggleRecordMenu(); }} title="Record">
              <div class="nav-icon">⏺</div>
              <div class="nav-label">Record</div>
            </button>
          </div>
        </div>
        
        <!-- Bottom Sheet Menus -->
        ${this.showEvolveMenu ? html`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${() => { this.showEvolveMenu = false; }}></div>
            <div class="bottom-sheet-header">
              <h3>Auto-Evolve</h3>
              <button class="bottom-sheet-close" @click=${() => { this.showEvolveMenu = false; }}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Controls</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.autoEvolveEnabled ? 'active' : ''}" @click=${() => { this.toggleAutoEvolve(); }}>
                    <div class="sheet-btn-icon">${this.autoEvolveEnabled ? '🔄' : '⏸'}</div>
                    <div class="sheet-btn-label">${this.autoEvolveEnabled ? 'ON' : 'OFF'}</div>
                  </button>
                </div>
              </div>
              <div class="sheet-section">
                <h4>Settings</h4>
                <div class="control-row">
                  <label class="control-label">Rate</label>
                  <select class="control-input" @change=${(e: Event) => { this.autoEvolveRateSec = Number((e.target as HTMLSelectElement).value); if (this.autoEvolveEnabled) this.startAutoEvolve(); }} .value=${String(this.autoEvolveRateSec)}>
                    ${[8,16,32,64].map(s => html`<option value=${s}>${s}s</option>`)}
                  </select>
                </div>
                <div class="control-row">
                  <label class="control-label">Depth</label>
                  <select class="control-input" @change=${(e: Event) => { this.autoEvolveDepth = Number((e.target as HTMLSelectElement).value); }} .value=${String(this.autoEvolveDepth)}>
                    <option value="0.1">Subtle</option>
                    <option value="0.15">Light</option>
                    <option value="0.25">Medium</option>
                    <option value="0.4">Bold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${this.showMobileMenu ? html`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${() => { this.showMobileMenu = false; }}></div>
            <div class="bottom-sheet-header">
              <h3>Menu</h3>
              <button class="bottom-sheet-close" @click=${() => { this.showMobileMenu = false; }}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <!-- Core Actions -->
              <div class="sheet-section">
                <h4>Core Actions</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.isRecording ? 'active' : ''}" @click=${() => { this.toggleRecording(); this.showMobileMenu = false; }}>
                    <div class="sheet-btn-icon">⏺</div>
                    <div class="sheet-btn-label">Record</div>
                  </button>
                  <button class="sheet-btn" @click=${() => { this.resetAll(); this.showMobileMenu = false; }}>
                    <div class="sheet-btn-icon">♻</div>
                    <div class="sheet-btn-label">Reset</div>
                  </button>
                  <button class="sheet-btn" @click=${() => { this.goHome(); this.showMobileMenu = false; }}>
                    <div class="sheet-btn-icon">🏠</div>
                    <div class="sheet-btn-label">Home</div>
                  </button>
                </div>
              </div>
              
              <!-- Generation -->
              <div class="sheet-section">
                <h4>Generation</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${() => { this.randomizeGrid(); this.showMobileMenu = false; }}>
                    <div class="sheet-btn-icon">🎲</div>
                    <div class="sheet-btn-label">Randomize</div>
                  </button>
                </div>
              </div>
              
              <!-- Export -->
              <require-pro .userId=${this.userId} .email=${this.userEmail} inline>
                <div class="sheet-section">
                  <h4>Export</h4>
                  <div class="sheet-grid">
                    <button class="sheet-btn" @click=${() => { this.exportWavOrMp3('wav'); this.showMobileMenu = false; }}>
                      <div class="sheet-btn-icon">⬇</div>
                      <div class="sheet-btn-label">Export WAV</div>
                    </button>
                    <button class="sheet-btn" @click=${() => { this.exportWavOrMp3('mp3'); this.showMobileMenu = false; }}>
                      <div class="sheet-btn-icon">⬇</div>
                      <div class="sheet-btn-label">Export MP3</div>
                    </button>
                  </div>
                </div>
              </require-pro>
              
              <!-- Scenes -->
              <div class="sheet-section">
                <h4>Scenes</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${() => { this.saveScene(); }}>
                    <div class="sheet-btn-icon">💾</div>
                    <div class="sheet-btn-label">Save Scene</div>
                  </button>
                </div>
                <div class="scenes-list">
                  ${this.scenes.length === 0 ? html`<div class="no-scenes">No scenes yet</div>` : ''}
                  ${this.scenes.map(scene => html`
                    <div class="scene-item">
                      <button class="scene-btn" @click=${() => { this.recallScene(scene.id); this.showMobileMenu = false; }}>${scene.name}</button>
                      <div class="scene-actions">
                        <button class="scene-action-btn" @click=${() => { this.renameScene(scene.id); }}>✎</button>
                        <button class="scene-action-btn" @click=${() => { this.deleteScene(scene.id); }}>🗑</button>
                      </div>
                    </div>
                  `)}
                </div>
              </div>
              
              <!-- Help -->
              <div class="sheet-section">
                <h4>Help</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${() => { this.toggleHelp(); this.showMobileMenu = false; }}>
                    <div class="sheet-btn-icon">❓</div>
                    <div class="sheet-btn-label">Help</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${this.showSettingsMenu ? html`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${() => { this.showSettingsMenu = false; }}></div>
            <div class="bottom-sheet-header">
              <h3>Settings</h3>
              <button class="bottom-sheet-close" @click=${() => { this.showSettingsMenu = false; }}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Generator Settings</h4>
                <div class="control-row">
                  <label class="control-label">Loop bars</label>
                  <input class="control-input" type="number" min="4" max="32" step="4" .value=${String(this.genLoopBars)} @change=${(e: Event) => this.updateGenSetting('loopBars', Number((e.target as HTMLInputElement).value))} />
                </div>
                <div class="control-row">
                  <label class="control-label">Variation</label>
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <input class="control-range" type="range" min="0" max="2" step="0.1" .value=${String(this.genVariation)} @input=${(e: Event) => this.updateGenSetting('variation', Number((e.target as HTMLInputElement).value))} />
                    <span style="color: #29F2C6; font-size: 12px; font-weight: 600; min-width: 30px; text-align: center;">${this.genVariation.toFixed(1)}</span>
                  </div>
                </div>
                <div class="control-row">
                  <label class="control-label">Genre contrast</label>
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <input class="control-range" type="range" min="0" max="2" step="0.1" .value=${String(this.genGenreContrast)} @input=${(e: Event) => this.updateGenSetting('genreContrast', Number((e.target as HTMLInputElement).value))} />
                    <span style="color: #29F2C6; font-size: 12px; font-weight: 600; min-width: 30px; text-align: center;">${this.genGenreContrast.toFixed(1)}</span>
                  </div>
                </div>
                <div class="control-row">
                  <label class="control-label">Mix</label>
                  <select class="control-input" .value=${this.genMix} @change=${(e: Event) => this.updateGenSetting('mix', (e.target as HTMLSelectElement).value)}>
                    <option value="background">Background</option>
                    <option value="balanced">Balanced</option>
                    <option value="energetic">Energetic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${this.showRecordMenu ? html`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${() => { this.showRecordMenu = false; }}></div>
            <div class="bottom-sheet-header">
              <h3>Record</h3>
              <button class="bottom-sheet-close" @click=${() => { this.showRecordMenu = false; }}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Recording Controls</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.isRecording ? 'active' : ''}" @click=${() => { this.toggleRecording(); this.showRecordMenu = false; }}>
                    <div class="sheet-btn-icon">${this.isRecording ? '⏸' : '⏺'}</div>
                    <div class="sheet-btn-label">${this.isRecording ? 'Stop' : 'Start'}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      ` : ''}

        
      </div>
      ${this.showHelp ? html`<help-panel open @close=${this.toggleHelp}></help-panel>` : ''}
      ${this.showTutorial ? html`<onboarding-tutorial @finish=${this.handleTutorialFinish}></onboarding-tutorial>` : ''}
      
      <!-- Authentication Modal -->
      <auth-modal 
        ?isOpen=${this.showAuthModal} 
        @auth-success=${this.handleAuthSuccess}
      ></auth-modal>
    `;
  }

  private renderPrompts() {
    const showAll = this.isMobile ? false : this.showAllPrompts;
    const promptsToShow: Prompt[] = showAll
      ? [...this.prompts.values()]
      : this.selectedOrder
          .map((id) => this.prompts.get(id))
          .filter((p): p is Prompt => !!p)
          .slice(0, this.maxSelectedPrompts);

    // When not showing all, ensure non-visible prompts are zeroed
    if (!showAll) {
      const visibleIds = new Set(promptsToShow.map(p => p.promptId));
      const updated = new Map(this.prompts);
      let changed = false;
      updated.forEach((p, id) => {
        if (!visibleIds.has(id) && (p.weight ?? 0) > 0) {
          p.weight = 0;
          updated.set(id, p);
          changed = true;
        }
      });
      if (changed) {
        this.prompts = updated;
        this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      }
    }

    return promptsToShow.map((prompt, index) => {
      const isFiltered = this.filteredPrompts.has(prompt.text);
      const blending = prompt.weight > 0;
      return html`<div class="slider-row ${blending ? 'blending' : ''}">
        <button class="slot-close" title="Remove from grid" aria-label="Remove ${prompt.text} from grid" @click=${(e: Event) => { e.stopPropagation(); this.removePromptFromGrid(prompt.promptId); }}>✕</button>
        <div class="slider-label">${prompt.text}</div>
        <div class="slider-control">
          <weight-slider
            .value=${prompt.weight}
            color=${isFiltered ? '#888' : prompt.color}
            audioLevel=${isFiltered ? 0 : this.audioLevel}
            @input=${(e: CustomEvent) => this.handleSliderChange(prompt.promptId, e.detail)}></weight-slider>
          ${this.isMobile ? '' : html`
            <button type="button" class="midi-info ${this.learningSlotIndex === index ? 'active' : ''}"
              @click=${() => this.toggleSlotLearn(index)}
              aria-label=${this.learningSlotIndex === index
                ? 'Mapping in progress, turn a knob'
                : (this.slotCcMap.has(index) ? `Mapped to CC ${this.slotCcMap.get(index)}. Click to remap` : 'Click to learn MIDI mapping')}>
              ${this.learningSlotIndex === index
                ? 'Learning… turn a knob'
                : (this.slotCcMap.has(index) ? `CC:${this.slotCcMap.get(index)}` : 'Click to learn')}
            </button>
          `}
        </div>
      </div>`;
    });
  }

  private removePromptFromGrid(promptId: string) {
    // Remove from grid selection
    this.selectedOrder = this.selectedOrder.filter(id => id !== promptId);
    this.selectedPromptIds = new Set(this.selectedOrder);
    // Zero its weight
    const p = this.prompts.get(promptId);
    if (p && (p.weight ?? 0) !== 0) {
      p.weight = 0;
      const updated = new Map(this.prompts);
      updated.set(promptId, p);
      this.prompts = updated;
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      this.savePromptWeights();
    }
    this.saveSelectedOrder();
    this.requestUpdate();
  }

  private saveSelectedOrder() {
    try {
      localStorage.setItem(this.SELECTED_ORDER_STORAGE_KEY, JSON.stringify(this.selectedOrder));
    } catch {}
  }

  private loadSelectedOrder() {
    try {
      const raw = localStorage.getItem(this.SELECTED_ORDER_STORAGE_KEY);
      if (!raw) return;
      const arr = JSON.parse(raw) as string[];
      // Keep only ids that still exist
      this.selectedOrder = arr.filter((id) => this.prompts.has(id));
    } catch {}
  }

  private savePromptWeights() {
    try {
      const obj: Record<string, number> = {};
      this.prompts.forEach((p, id) => { obj[id] = p.weight || 0; });
      localStorage.setItem(this.PROMPT_WEIGHTS_STORAGE_KEY, JSON.stringify(obj));
    } catch {}
  }

  private loadPromptWeights() {
    try {
      const raw = localStorage.getItem(this.PROMPT_WEIGHTS_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, number>;
      const updated = new Map(this.prompts);
      Object.entries(saved).forEach(([id, w]) => {
        const p = updated.get(id);
        if (p) { p.weight = w; updated.set(id, p); }
      });
      this.prompts = updated;
    } catch {}
  }

  private saveShowAll() {
    try { localStorage.setItem(this.SHOW_ALL_GRID_STORAGE_KEY, this.showAllPrompts ? '1' : '0'); } catch {}
  }

  private loadShowAll() {
    try {
      const raw = localStorage.getItem(this.SHOW_ALL_GRID_STORAGE_KEY);
      // Default to false (show only selected grid) unless explicitly set to '1'
      this.showAllPrompts = raw === '1';
    } catch {}
  }

  private renderInstruments() {
    return [...this.instruments.values()].map((instrument) => {
      const isFiltered = this.filteredInstruments.has(instrument.text);
      const isActive = this.selectedInstrumentId === instrument.promptId;
      return html`<div class="instrument-slider ${isActive ? 'active' : ''}">
        <div class="instrument-label">${instrument.text}</div>
        <weight-slider
          .value=${instrument.weight}
          color=${isFiltered ? '#888' : instrument.color}
          audioLevel=${isFiltered ? 0 : this.audioLevel}
          @input=${(e: CustomEvent) => this.handleInstrumentChange(instrument.promptId, e.detail)}></weight-slider>
        <button type="button" class="midi-info ${this.learningInstrumentId === instrument.promptId ? 'active' : ''}"
          @click=${() => this.toggleInstrumentLearnMode(instrument.promptId)}
          aria-label=${this.learningInstrumentId === instrument.promptId
            ? 'Mapping in progress, turn a knob'
            : (instrument.cc > 0 ? `Mapped to CC ${instrument.cc}. Click to remap` : 'Click to learn MIDI mapping')}>
          ${this.learningInstrumentId === instrument.promptId
            ? 'Learning… turn a knob'
            : (instrument.cc > 0 ? `CC:${instrument.cc}` : 'Click to learn')}
        </button>
      </div>`;
    });
  }

  private renderStyleList() {
    const q = this.styleSearchQuery.trim();
    let items = [...this.prompts.values()];
    
    // Filter by search query
    if (q) {
      items = items.filter(p => p.text.toLowerCase().includes(q));
    }
    
    // Filter by active only if enabled
    if (this.showActiveOnly) {
      items = items.filter(p => this.selectedOrder.includes(p.promptId));
    }
    
    return items.map((prompt) => {
      const isFiltered = this.filteredPrompts.has(prompt.text);
      const isActive = this.selectedPromptIds.has(prompt.promptId);
      return html`<div class="style-item ${isFiltered ? 'filtered' : ''} ${isActive ? 'active' : ''}"
        role="option"
        tabindex="0"
        aria-selected=${isActive}
        aria-label="${isActive ? 'Deselect' : 'Select'} style ${prompt.text}"
        @click=${() => this.toggleStyleSelected(prompt.promptId)}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleStyleSelected(prompt.promptId); } }}>
        <div class="style-color" style="background-color: ${prompt.color}"></div>
        <div class="style-name">${prompt.text}</div>
        <button type="button" class="style-mute" @click=${(e: Event) => { e.stopPropagation(); this.toggleStyleMute(prompt.promptId); }} aria-label="${this.isStyleMuted(prompt.promptId) ? 'Unmute style' : 'Mute style'} ${prompt.text}">
          ${this.isStyleMuted(prompt.promptId) ? '🔇' : '🔊'}
        </button>
      </div>`;
    });
  }

  private renderInstrumentList() {
    const q = this.styleSearchQuery.trim();
    let items = [...this.instruments.values()];
    
    // Filter by search query
    if (q) {
      items = items.filter(i => i.text.toLowerCase().includes(q));
    }
    
    // Filter by active only if enabled
    if (this.showActiveOnly) {
      items = items.filter(i => this.selectedOrder.includes(i.promptId));
    }
    
    return items.map((instrument) => {
      const isFiltered = this.filteredInstruments.has(instrument.text);
      const isActive = this.selectedInstrumentId === instrument.promptId;
      const isInGrid = this.selectedOrder.includes(instrument.promptId);
      
      return html`<div class="style-item ${isFiltered ? 'filtered' : ''} ${isActive ? 'active' : ''}"
        role="option"
        tabindex="0"
        aria-selected=${isActive}
        aria-label="${isActive ? 'Deselect' : 'Select'} instrument ${instrument.text}"
        @click=${() => this.toggleInstrumentSelection(instrument.promptId)}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleInstrumentSelection(instrument.promptId); } }}>
        <div class="style-color" style="background-color: ${instrument.color}"></div>
        <div class="style-name">${instrument.text}</div>
        <button type="button" class="style-mute" @click=${(e: Event) => { e.stopPropagation(); this.toggleInstrumentMute(instrument.promptId); }} aria-label="${isInGrid ? 'Remove from grid' : 'Add to grid'} ${instrument.text}">
          ${isInGrid ? '✓' : '+'}
        </button>
      </div>`;
    });
  }

  private toggleInstrumentSelection(instrumentId: string) {
    if (this.selectedInstrumentId === instrumentId) {
      this.selectedInstrumentId = '';
    } else {
      this.selectedInstrumentId = instrumentId;
    }
    // Clear search after selection
    this.styleSearchQuery = '';
  }

  private getActiveInstrumentsCount(): number {
    return [...this.instruments.values()].filter(instrument => 
      this.selectedOrder.includes(instrument.promptId)
    ).length;
  }

  private getActiveStylesCount(): number {
    return [...this.prompts.values()].filter(prompt => 
      this.selectedOrder.includes(prompt.promptId)
    ).length;
  }

  private toggleShowActiveOnly() {
    this.showActiveOnly = !this.showActiveOnly;
  }

  private toggleEvolveMenu() {
    this.showEvolveMenu = !this.showEvolveMenu;
    if (this.showEvolveMenu) {
      this.showMobileMenu = false;
      this.showSettingsMenu = false;
      this.showRecordMenu = false;
    }
  }

  private toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      this.showEvolveMenu = false;
      this.showSettingsMenu = false;
      this.showRecordMenu = false;
    }
  }

  private toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
    if (this.showSettingsMenu) {
      this.showEvolveMenu = false;
      this.showMobileMenu = false;
      this.showRecordMenu = false;
    }
  }

  private toggleRecordMenu() {
    this.showRecordMenu = !this.showRecordMenu;
    if (this.showRecordMenu) {
      this.showEvolveMenu = false;
      this.showMobileMenu = false;
      this.showSettingsMenu = false;
    }
  }

  private toggleInstrumentMute(instrumentId: string) {
    const instrument = this.instruments.get(instrumentId);
    if (!instrument) return;

    if (this.selectedOrder.includes(instrumentId)) {
      // Remove from grid
      this.selectedOrder = this.selectedOrder.filter(id => id !== instrumentId);
      instrument.weight = 0;
    } else {
      // Add to grid if there's space
      if (this.selectedOrder.length < this.maxSelectedPrompts) {
        this.selectedOrder.push(instrumentId);
        instrument.weight = 0.5; // Default weight
      }
    }
    
    // Clear search after selection
    this.styleSearchQuery = '';
    this.selectedPromptIds = new Set(this.selectedOrder);
    this.saveSelectedOrder();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
  }

  private renderMixerTracks() { return null; }

  private updateGenSetting(key: 'loopBars' | 'variation' | 'genreContrast' | 'mix', value: any) {
    if (key === 'loopBars') this.genLoopBars = value;
    if (key === 'variation') this.genVariation = value;
    if (key === 'genreContrast') this.genGenreContrast = value;
    if (key === 'mix') this.genMix = value;
    this.dispatchEvent(new CustomEvent('generator-settings-changed', { detail: {
      loopBars: this.genLoopBars,
      variation: this.genVariation,
      genreContrast: this.genGenreContrast,
      mix: this.genMix,
    }}));
  }



  private handleApplySuggestedStyles = (e: CustomEvent) => {
    const { styles } = e.detail;
    console.log('Applying suggested styles:', styles);
    
    // Find matching styles in our prompts and add them to the grid
    const updated = new Map(this.prompts);
    const newSelectedOrder = [...this.selectedOrder];
    
    styles.forEach((styleName: string) => {
      // Find the prompt that matches this style name
      const matchingPrompt = Array.from(this.prompts.values()).find(p => 
        p.text.toLowerCase().includes(styleName.toLowerCase()) ||
        styleName.toLowerCase().includes(p.text.toLowerCase())
      );
      
      if (matchingPrompt && !this.selectedPromptIds.has(matchingPrompt.promptId)) {
        // Add to selection if not already selected and we have room
        if (newSelectedOrder.length < this.maxSelectedPrompts) {
          newSelectedOrder.push(matchingPrompt.promptId);
          // Set a moderate weight for the new style
          matchingPrompt.weight = Math.random() * 1.5 + 0.5;
          updated.set(matchingPrompt.promptId, matchingPrompt);
        }
      }
    });
    
    if (newSelectedOrder.length > this.selectedOrder.length) {
      this.selectedOrder = newSelectedOrder;
      this.selectedPromptIds = new Set(this.selectedOrder);
      this.prompts = updated;
      this.saveSelectedOrder();
      this.savePromptWeights();
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      
      // Show success message
      this.dispatchEvent(new CustomEvent('error', { 
        detail: `Added ${styles.length} suggested styles to your grid!` 
      }));
    }
  };
}
