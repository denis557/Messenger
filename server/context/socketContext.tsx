import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const user = JSON.parse(localStorage.getItem("user-threads")!);

	useEffect(() => {
		const newSocket = io("http://localhost:5000", {
			query: {
				userId: user?._id,
			},
		});

		setSocket(newSocket);

		newSocket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});
		return () => {newSocket && newSocket.close()};
	}, [user?._id]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};