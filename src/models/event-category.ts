 export interface EventCategroy {
    icon:string;
    label:string;
    code: string;
};

export const EVENT_CATEGORIES: EventCategroy[] = [
    {
        icon: 'add',
        label: 'New Share Class',
        code: 'new_share_class'
    },
    {
        icon: 'add',
        label: 'New Legal Fund',
        code: 'new_legal_fund'
    },
    {
        icon: 'add',
        label: 'New Holding',
        code: 'new_holding'
    },
    {
        icon: 'add',
        label: 'New Dealer',
        code: 'new_dealer'
    },
    {
        icon: 'add',
        label: 'New Trade',
        code: 'new_trade'
    },
    {
        icon: 'alert',
        label: 'Liquidated Share Class',
        code: 'liquidated_share_class'
    },
    {
        icon: 'warning',
        label: 'Holding is Blocked ',
        code: 'holding_blocked'
    },
    {
        icon: 'trending-up',
        label: 'Dealer Balance over threshold',
        code: 'dealer_balance'
    },
    {
        icon: 'trending-up',
        label: 'Holding Balance over threshold',
        code: 'holding_balance'
    },
    {
        icon: 'trending-up',
        label: 'Share Class Balance over threshold',
        code: 'share_class_balance'
    },
    {
        icon: 'trending-up',
        label: 'Large trade',
        code: 'high_trade_amount'
    },
    {
        icon: 'trending-down',
        label: 'Below minimal trade',
        code: 'low_trade_amount'
    }

];
