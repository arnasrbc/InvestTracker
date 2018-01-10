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
        icon: 'alert',
        label: 'Liquidated Share Class',
        code: 'liquidated_share_class'
    },
    {
        icon: 'add-circle',
        label: 'New Legal Found ',
        code: 'new_legal_fund'
    },
    {
        icon: 'warning',
        label: 'Holding is Blocked ',
        code: 'holding_blocked'
    }

];
