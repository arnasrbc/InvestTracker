 export interface EventCategroy {
    icon:string;
    label:string;
    code: string;
    entity: string;
};

export const EVENT_CATEGORIES: EventCategroy[] = [
    {
        icon: 'add-circle',
        entity: 'share_class',
        label: 'New Share Class',
        code: 'new_share_class'
    },
    {
        icon: 'trending-up',
        entity: 'share_class',
        label: 'Balance for the share class over X',
        code: 'balance_share_class_over_x'
    },
    {
        icon: 'add-circle',
        entity: 'account',
        label: 'New Account ',
        code: 'new_account'
    },
    {
        icon: 'warning',
        entity: 'account',
        label: 'Account is Blocked ',
        code: 'account_blocked'
    },
    {
        icon: 'trending-up',
        entity: 'account',
        label: 'Balance for the account over X',
        code: 'balance_account_over_x'
    },

];