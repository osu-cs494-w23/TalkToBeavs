import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useLobby = (onid, option) => {
  const [queue, setQueue] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient('https://talk-to-beavs.herokuapp.com', {
      query: { onid },
    });

    socketRef.current.on('matched', (data) => {
      console.log(`[Frontend ⚡️]: ${data.message}`);
      setRoomId(data.room);
    });

    socketRef.current.on('getPeer', (data) => {
      console.log(`[Frontend ⚡️]: Your peer is in ${data.room}`);
      setRoomId(data.room);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [onid]);

  const joinQueue = () => {
    if (option === 'text') {
      socketRef.current.emit('joinTextQueue', {
        name: onid,
      });
    } else {
      socketRef.current.emit('joinVideoQueue', {
        name: onid,
      });
    }
  };

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  return { queue, joinQueue, roomId, disconnect };
};

export default useLobby;
