import { useState, useEffect } from 'react';
import { getMessages } from './useMessages';

function useLastMessage(roomId) {
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        if (roomId) {
            const unsubscribe = getMessages(roomId, (messages) => {
                if (messages.length > 0) {
                    setLastMessage(messages[messages.length - 1].text);
                }
            });

            return unsubscribe;
        }
    }, [roomId]);

    return lastMessage;
}

export { useLastMessage };