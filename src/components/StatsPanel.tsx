// src/components/StatsPanel.tsx

import React from 'react';
import { HandshakeResult } from '../logic/handshakeSim';

interface StatsPanelProps {
    result: HandshakeResult;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ result }) => {
    return (
        <div className="stats-panel">
            <div className="stats-panel-title">SATELLITE ORBIT VISUALISATION</div>
            <ul className="stats-list">
                <li>
                    <span className="stats-label">Total Handshakes</span>
                    <span className="stats-value">{result.handshakeCount}</span>
                </li>
                <li>
                    <span className="stats-label">Total Blackouts</span>
                    <span className="stats-value">{result.blackoutCount}</span>
                </li>
                <li>
                    <span className="stats-label">Total Blackout Time</span>
                    <span className="stats-value">{(result.totalBlackoutTime / 3600).toFixed(2)} hours</span>
                </li>
                <li>
                    <span className="stats-label">Average Blackout Time</span>
                    <span className="stats-value">{(result.averageBlackoutTime / 3600).toFixed(2)} hours</span>
                </li>
            </ul>
        </div>
    );
};

export default StatsPanel;
