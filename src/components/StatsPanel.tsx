// src/components/StatsPanel.tsx

import React from 'react';
import { HandshakeResult } from '../logic/handshakeSim';

interface StatsPanelProps {
    result: HandshakeResult;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ result }) => {
    return (
        <div>
            <h2> Handshake Stats </h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0}}>
                <li>
                    <strong> Total Handshakes: </strong>{' '}
                    {result.handshakeCount}
                </li>
                <li>
                    <strong> Total Blackouts: </strong>{' '}
                    {result.blackoutCount}
                </li>
                <li> 
                    <strong> Total Blackout Team: </strong>{' '}
                    {(result.totalBlackoutTime / 3600).toFixed(2)} hours
                </li>
                <li>
                    <strong> Average Blackout Time: </strong>{' '}
                    {(result.averageBlackoutTime / 3600).toFixed(2)} hours
                </li>               
            </ul>  
        </div>
    );
};

export default StatsPanel;
