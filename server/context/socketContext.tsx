// import React, { createContext, useContext, useEffect, useState } from "react"
// import { io } from "socket.io-client";

// const SocketContext = createContext();

// export const useSocket = () => {
//     return useContext(SocketContext);
// }

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const user = JSON.parse(localStorage.getItem("user-threads")!);

//     useEffect(() => {
//         const newSocket = io('http://localhost:5000', {
//             query: {
//                 userId: user?._id
//             }
//         })

//         setSocket(newSocket);

//         return () => {newSocket && newSocket.close()};
//     }, [socket, user?._id])

//     return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
// }

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const user = JSON.parse(localStorage.getItem("user-threads")!);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            query: {
                userId: user?._id
            }
        });

        setSocket(newSocket);

        return () => { newSocket && newSocket.close(); };
    }, [user?._id]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}