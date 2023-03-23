import { Game } from '@/core/game-loop/game';
import { Router } from 'express';

export const stateRouter = (game: Game) => Router()
    .get('/current', (_req, res) => res.json(game.toJSON()));
