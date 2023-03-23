import { EventEmitter } from '@shared/typed-event-emitter';

type AdminEvents = {
    'force-phase-skip': voidfn;
}

export class Admin extends EventEmitter<AdminEvents> implements IAdmin {
    public constructor(
        public readonly username: string,
    ) {
        super();
    }

    public skipPhase(): void {
        this.emit('force-phase-skip');
    }

    public toJSON(): string {
        return this.username;
    }
}