import React, { useMemo, useState, useCallback } from 'react';
import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';


import ProgressCountdown from '../components/ProgressCountdown';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';





export default function Grid1b() {

    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    const cashStat = useCashPriceInEstimatedTWAP();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);



    return (
        <div>
            <div>
                <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Current Epoch</Typography>
                <Typography>{Number(currentEpoch)}</Typography>            </div>
            <div>
                <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch</Typography>
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />            </div>
            <div>
                <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>
                    BOMB PEG <small>(TWAP)</small>
                </Typography>
                <Typography>{scalingFactor} BTC</Typography>
                <Typography>
                    <small>per 10,000 BOMB</small>
                </Typography>
            </div>

        </div>
    );
}
