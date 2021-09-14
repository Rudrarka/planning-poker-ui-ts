import React, { useState, createContext, useContext } from 'react';

export interface IPlayer {
    id: string | undefined;
    name: string | undefined;
    is_admin: boolean;
    vote: number | undefined;
}

export interface IGame {
    id: string | undefined;
    name: string | undefined;
    options: number[];
    players: IPlayer[];
}

interface GameContextProps {
    game: IGame;
    currentPlayer: IPlayer
    handleGame: (game: IGame) => void;
    handleCurrentPlayer: (player: IPlayer) => void
}

export const initialGameState: IGame = {
    id: undefined,
    name: undefined,
    options: [],
    players: []
}


export const initialPlayerState: IPlayer = {
    id: undefined,
    name: undefined,
    is_admin: false,
    vote: undefined,
};

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

interface GameContextProviderProps {
    children: React.ReactNode;
}

const GameContextProvider: React.FC<GameContextProviderProps> = ({ children }: GameContextProviderProps) => {
    const [game, setGame] = useState<IGame>(initialGameState);
    const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(initialPlayerState);

    const handleGame = (game: IGame) => setGame(game);
    const handleCurrentPlayer = (player: IPlayer) => setCurrentPlayer(player);

    return (
        <GameContext.Provider value={{ game, handleGame, currentPlayer, handleCurrentPlayer }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;

export const useGameContext = () => useContext(GameContext);
