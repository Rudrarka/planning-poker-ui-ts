import React, { createContext, useContext } from 'react';
import { io, Socket } from "socket.io-client";

interface SocketContextProviderProps {
    children: React.ReactNode;
}

interface SocketContextProps {
    socket: Socket
}

export const socket: Socket = io(process.env.REACT_APP_SOCKET_URL || 'http://0.0.0.0:5000');

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }: SocketContextProviderProps) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;

export const useSocketContext = () => useContext(SocketContext);

