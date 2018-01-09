 export interface EventCategroy {
    icon:string;
    label:string;
    code: string;
};

export const EVENT_CATEGORIES: EventCategroy[] = [
    {
        icon: 'add-circle',
        label: 'New Share Class',
        code: 'new_share_class'
    },
    {
        icon: 'trending-up',
        label: 'Balance for the share class over X',
        code: 'balance_share_class_over_x'
    },
    {
        icon: 'add-circle',
        label: 'New Account ',
        code: 'new_account'
    },
    {
        icon: 'warning',
        label: 'Account is Blocked ',
        code: 'account_blocked'
    },
    {
        icon: 'trending-up',
        label: 'Balance for the account over X',
        code: 'balance_account_over_x'
    },

];