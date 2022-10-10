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






const LPToken2 = () => {

    const { onWithdraw } = useWithdraw(useBank('BshareBnbLPBShareRewardPool'));
    const { onStake } = useStake(useBank('BshareBnbLPBShareRewardPool'));
    const tokenBalance = useTokenBalance(useBank('BshareBnbLPBShareRewardPool').depositToken);
    const stakedBalance = useStakedBalanceOnBoardroom();
    const [approveStatus3, approve3] = useApprove(useBank('BshareBnbLPBShareRewardPool').depositToken, useBank('BshareBnbLPBShareRewardPool').address);
    const {onReward }= useHarvest(useBank('BshareBnbLPBShareRewardPool')) ;




    const [onPresentWithdraw3, onDismissWithdraw3] = useModal(
        <WithdrawModal
            max={stakedBalance}
            onConfirm={(value) => {
                onWithdraw(value);
                onDismissWithdraw3();
            }}
            tokenName={useBank('BshareBnbLPBShareRewardPool').depositTokenName}
        />,
    );
    const [onPresentDeposit3, onDismissDeposit3] = useModal(
        <DepositModal
            max={tokenBalance}
            onConfirm={(value) => {
                onStake(value);
                onDismissDeposit3();
            }}
            tokenName={useBank('BshareBnbLPBShareRewardPool').depositTokenName}
        />,
    );

    return (
        <div>
            {approveStatus3 !== ApprovalState.APPROVED ? (
                <Button
                    disabled={approveStatus3 !== ApprovalState.NOT_APPROVED}
                    className={approveStatus3 === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                    onClick={approve3}
                >
                    Approve
                </Button>
            ) : (
                <>
                    <Button
                        className={'shinyButton'}
                        onClick={onPresentDeposit3}>
                        Deposite
                    </Button>
                </>
            )}
            <Button
                className={'shinyButton'}
                onClick={onPresentWithdraw3}>
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

export default LPToken2;