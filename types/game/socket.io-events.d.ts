declare interface IBaseEvents {
    error: (error: string) => void;
}

declare interface IClientToServerEvents extends IBaseEvents {
    'change-country': (name: string) => void;
    'order-edit': (form: IOrderEdit) => void;
}

declare interface IServerToClientEvents extends IBaseEvents {
    'accept-login': (isAdmin: boolean) => void;
    'order-sync': (order: IOrder) => void;
    'state-sync': (state: IGameState) => void;
    'country-private-state-sync': (state: ICountry & { private: ICountryPrivateState }) => void;
}

declare interface IAdminClientToServerEvents extends IBaseEvents {
    'end-pre-phase': voidfn;
    'force-phase-skip': voidfn;
}

declare interface IAdminServerToClientEvents extends IBaseEvents {
    'accept-login': (isAdmin: true) => void;
    'state-sync': (state: IGameState) => void;
}

