import React, { useMemo, useState, useCallback } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';

//TOKEN-LP IMPORTS
import useWithdraw from '../../../hooks/useWithdraw';
import useHarvest from '../../../hooks/useHarvest';
import useStake from '../../../hooks/useStake';
import useBank from '../../../hooks/useBank';
import useModal from '../../../hooks/useModal';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import { BugReportSharp } from '@material-ui/icons';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';






const LPToken1 = () => {

    const { onWithdraw } = useWithdraw(useBank('BBondBShareRewardPool'));
    const { onStake } = useStake(useBank('BBondBShareRewardPool'));
    const tokenBalance = useTokenBalance(useBank('BBondBShareRewardPool').depositToken);
    const stakedBalance = useStakedBalanceOnBoardroom();
    const [approveStatus2, approve2] = useApprove(useBank('BombBtcbLPBShareRewardPool').depositToken, useBank('BombBtcbLPBShareRewardPool').address);
    const {onReward} = useHarvest(useBank('BombBtcbLPBShareRewardPool'))




    const [onPresentWithdraw2, onDismissWithdraw2] = useModal(
        <WithdrawModal
            max={stakedBalance}
            onConfirm={(value) => {
                onWithdraw(value);
                onDismissWithdraw2();
            }}
            tokenName={'BShare'}
        />,
    );
    const [onPresentDeposit2, onDismissDeposit2] = useModal(
        <DepositModal
            max={tokenBalance}
            onConfirm={(value) => {
                onStake(value);
                onDismissDeposit2();
            }}
            tokenName={'BShare'}
        />,
    );

    return (
        <div>
            {approveStatus2 !== ApprovalState.APPROVED ? (
                <Button
                    disabled={approveStatus2 !== ApprovalState.NOT_APPROVED}
                    className={approveStatus2 === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                    onClick={approve2}
                >
                    Approve
                </Button>
            ) : (
                <>
                    <Button
                        className={'shinyButton'}
                        onClick={onPresentDeposit2}>
                        Deposite
                    </Button>
                </>
            )}
            <Button
                className={'shinyButton'}
                onClick={onPresentWithdraw2}>
                Withdraw
            </Button>
            <Button
                className='shinyButton'
                onClick={onReward}
            >
                Claim Reward
            </Button>
        </div>
    );

}

export default LPToken1;