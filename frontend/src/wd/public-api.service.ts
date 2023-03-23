import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom as promisify } from 'rxjs';

@Injectable()
export class PublicApiService {
    public constructor(
        private readonly http: HttpClient
    ) { }

    public currentState(): Promise<IGameState> {
        return promisify(this.http.get<IGameState>('/api/state/current', { responseType: 'json' }));
    }
}
