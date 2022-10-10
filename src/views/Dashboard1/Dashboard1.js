import React, { useMemo, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../components/Page';
import RegulationsImage from '../../assets/img/regulations_bg.png';
import { createGlobalStyle } from 'styled-components';
import useBombFinance from '../../hooks/useBombFinance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useStakedBalance from '../../hooks/useStakedBalance'
import useEarnings from '../../hooks/useEarnings';




//imports from home.js
import { Box, Button, Card, CardContent, Grid, } from '@material-ui/core';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import useBondStats from '../../hooks/useBondStats';


//copied from bond.JS

import { useTransactionAdder } from '../../state/transactions/hooks';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';


//grid 1
import Trial from './components/Trial';
import Grid1b from './components/Grid1b.tsx'


//boardroom imports
//claim reward
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
//withdraw
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakeToBoardroom from '../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../hooks/useWithdrawFromBoardroom';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck.ts'
import useBank from '../../hooks/useBank';


//TOKEN-LP IMPORTS
import LPToken1 from './components/LPToken1';
import LPToken2 from './components/LPToken2';




const TITLE = 'Dashboard';

const useStyles = makeStyles((theme) => ({
    gridItem: {
        height: '100%',
        [theme.breakpoints.up('md')]: {
            height: '90px',
        },
    },
}));

const BackgroundImage = createGlobalStyle`
  body, html {
    background: url(${RegulationsImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;


const Dashboard1 = () => {


    //copied from home.js 

    const tBondStats = useBondStats();
    const bombFinance = useBombFinance();
    const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);


    //copy from bond
    const addTransaction = useTransactionAdder();
    const bondBalance = useTokenBalance(bombFinance?.BBOND);


    //for boardroom
    //info

    //claim reward
    const { onReward } = useHarvestFromBoardroom();
    const earnings = useEarningsOnBoardroom();
    const canClaimReward = useClaimRewardCheck();

    //withdraw 
    const tokenBalance = useTokenBalance(bombFinance.BSHARE);
    const stakedBalance = useStakedBalanceOnBoardroom();
    const { onStake } = useStakeToBoardroom();
    const { onWithdraw } = useWithdrawFromBoardroom();
    const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);


    const [onPresentWithdraw, onDismissWithdraw] = useModal(
        <WithdrawModal
            max={stakedBalance}
            onConfirm={(value) => {
                onWithdraw(value);
                onDismissWithdraw();
            }}
            tokenName={'BShare'}
        />,
    );
    const [onPresentDeposit, onDismissDeposit] = useModal(
        <DepositModal
            max={tokenBalance}
            onConfirm={(value) => {
                onStake(value);
                onDismissDeposit();
            }}
            tokenName={'BShare'}
        />,
    );
    const { canWithdraw } = useWithdrawCheck();



    return (
        <Page>
            <BackgroundImage />
            <Grid container spacing={3}>
                                                     {/* Grid 1 */}
                <Grid item xs={12} sm={12}>
                    <Box mt={4}>
                        <StyledCardWrapper>
                            <Box>
                                <Card>
                                    <CardContent align="center">
                                        <h2>Bomb Finance Summary</h2>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={8}>
                                                <Trial />
                                            </Grid>
                                            <Grid item xs={12} sm={4}> <Grid1b /></Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </StyledCardWrapper>
                    </Box>
                </Grid>
                                                         {/* Grid 2 */}
                <Grid item xs={12} sm={8}>
                    <Grid container justify="center" >
                        <a
                            href="https://bombbshare.medium.com/the-bomb-cycle-how-to-print-forever-e89dc82c12e5"
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ color: '#dddfee', align: 'center' }}
                        >
                            Read Investment Strategy
                        </a>
                        <Grid container justify="center" item xs={12} sm={12} style={{ margin: '12px', display: 'flex' }} >
                            <Button style={{ width: '21cm', textAlign: 'center', backgroundColor: 'blue' }} href="https://bombbtc.com/">
                                Invest Now
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" item xs={12} sm={12} style={{ margin: '12px', display: 'flex' }}>
                        <Grid item xs={12} sm={6}>
                            <Button style={{ width: '10cm', textAlign: 'center', backgroundColor: 'grey' }} href="https://discord.bomb.money/">
                                Chat On Discord
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button style={{ width: '10cm', textAlign: 'center', backgroundColor: 'grey' }} href="https://docs.bomb.money/">
                                Read Docs
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Card>
                            <CardContent>
                                <p>Boardroom</p>
                                <p>Stake BSHARE and earn BBOMB every epoch.</p>
                                <Grid container>
                                    <Grid style={{ width: '10cm' }}>
                                        Staked(BSHARE staked)
                                        <p>{getDisplayBalance(stakedBalance)}</p>
                                    </Grid>
                                    <Grid>
                                        Reward("BOMB Earned")
                                        <p>{getDisplayBalance(earnings)} </p>
                                    </Grid>
                                </Grid>

                                {approveStatus !== ApprovalState.APPROVED ? (
                                    <Button
                                        disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                        className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                                        onClick={approve}
                                    >
                                        Approve BSHARE
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            className={!canWithdraw ? 'shinyButtonDisabled' : 'shinyButton'}
                                            disable={!canWithdraw}
                                            onClick={onPresentDeposit}>
                                            Deposite
                                        </Button>
                                    </>
                                )}
                                <Button
                                    className={!canWithdraw ? 'shinyButtonDisabled' : 'shinyButton'}
                                    disable={!canWithdraw}
                                    onClick={onPresentWithdraw}>
                                    Withdraw
                                </Button>
                                <Button
                                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled' : 'shinyButton'}
                                    disabled={earnings.eq(0) || !canClaimReward}
                                    onClick={onReward}
                                >
                                    Claim Reward
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box>
                        <Card style={{ height: '10cm' }}>
                            <CardContent align="center">
                                <h2>Latest News</h2>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                                                                           {/* Grid 3 */}
                <Grid item xs={12} sm={12}>
                    <Box mt={4}>
                        <StyledCardWrapper>
                            <Box>
                                <Card>
                                    <CardContent >
                                        <h1>BSHARE</h1>
                                        <p >Stake your LP token here to start earning Bshare</p>
                                        {/* BOMB-BTCB */}
                                        <h3>Bomb-BTCB</h3>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>

                                                <a>Your Stake</a>
                                                <p>
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                    {Number(useStakedBalance(useBank('BombBtcbLPBShareRewardPool').contract,useBank('BombBtcbLPBShareRewardPool').poolId))} Token
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>

                                                <a>Earned</a>
                                                <p>
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                    {Number(useEarnings(useBank('BombBtcbLPBShareRewardPool').contract,useBank('BombBtcbLPBShareRewardPool').earnTokenName,useBank('BombBtcbLPBShareRewardPool').poolId))} Bshare
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                            < LPToken1/>
                                            </Grid>
                                        </Grid>
                                        {/* BSHARE-BNB */}
                                        <h3>Bshare-BNB</h3>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>

                                                <a>Your Stake</a>
                                                <p>
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                    {Number(useStakedBalance(useBank('BshareBnbLPBShareRewardPool').contract,useBank('BshareBnbLPBShareRewardPool').poolId))} Token
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>

                                                <a>Earned</a>
                                                <p>
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                    {Number(useEarnings(useBank('BshareBnbLPBShareRewardPool').contract,useBank('BshareBnbLPBShareRewardPool').earnTokenName,useBank('BshareBnbLPBShareRewardPool').poolId))} Bshare
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                            < LPToken2 />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </StyledCardWrapper>

                    </Box>
                </Grid>
                                                                                  {/* Grid 4  */}
                <Grid item xs={12} sm={12}>
                    <Box mt={4}>
                        <StyledCardWrapper>
                            <Box>
                                <Card>
                                    <CardContent>
                                        <h2>Bonds</h2>
                                        <p><strong>Bbomb can only be purchased on contraction period ,when TWAP of bomb is below 1.</strong></p>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>

                                                <a>Current Price: (Bomb)^2</a>
                                                <p>Bbond =
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                        {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>

                                                <a>Available to redeem</a>
                                                <p>Bbond =
                                                    <span style={{ fontSize: '30px', color: 'white' }}>
                                                        {`${getDisplayBalance(bondBalance)} BBOND`}
                                                    </span>
                                                </p>

                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <div>
                                                    <a >Purchase Bbond</a>
                                                    <Button className='shinyButton'  > Purchases</Button>
                                                </div>
                                                <div>
                                                    <a>Redeem Bbond</a>
                                                    <Button className='shinyButton' > Redeem</Button>
                                                </div>

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        </StyledCardWrapper>
                    </Box>
                </Grid>
            </Grid>
        </Page>
    );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Dashboard1;
