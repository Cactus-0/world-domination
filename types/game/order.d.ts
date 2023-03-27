declare interface IOrder {
    buyNuclearTechnology: boolean;
    buildNuke: number;
    cityDevelopments: string[];
    buildCityShields: string[];
    nuclearAttackTargets: string[];
    improveEcology: boolean;
    sanctions: string[];
}

interface IOrderEditBase<T extends 'primitive' | 'array'> {
    type: T;
    field: FilterKeys<IOrder, T extends 'primitive' ? boolean | number : string[]>;
}

interface IOrderBooleanEdit extends IOrderEditBase<'primitive'> {
    newValue: boolean | number;
}

interface IOrderArrayEdit<Action extends 'add' | 'remove'> extends IOrderEditBase<'array'> {
    action: Action;
    index: Action extends 'add' ? string : number;
}

type IOrderEdit = IOrderArrayEdit<'add' | 'remove'> | IOrderBooleanEdit;
