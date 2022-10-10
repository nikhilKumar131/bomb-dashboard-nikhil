import React, { useMemo, useState, useCallback } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import useBombStats from '../../../hooks/useBombStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useBondStats from '../../../hooks/useBondStats';
import { roundAndFormatNumber } from '../../../0x';







function createData(
    name: string,
    currentSup: string,
    totalSup: string,
    pricee: string,
) {
    return { name, currentSup, totalSup, pricee };
}



export default function Trial() {



    const bombStats = useBombStats();
    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);



    const bShareStats = usebShareStats();
    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );
    const bSharePriceInBNB = useMemo(
        () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
        [bShareStats],
    );
    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);



    const tBondStats = useBondStats();
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );

    const rows = [


        createData('Bomb',bombCirculatingSupply , bombTotalSupply,bombPriceInDollars +' $'),
        createData('Bshare', bShareCirculatingSupply, bShareTotalSupply, bSharePriceInDollars + ' $'),
        createData('Bond', tBondCirculatingSupply, tBondTotalSupply, tBondPriceInDollars + ' $'),
    ]


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Current Supply</TableCell>
                        <TableCell align="right">Total Supply</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow

                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.currentSup}</TableCell>
                            <TableCell align="right">{row.totalSup}</TableCell>
                            <TableCell align="right">{row.pricee}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
