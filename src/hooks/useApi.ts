import { useState, useCallback } from 'react';
import { sendMessage } from '../api/openRouterApi';

export interface Message {
  content: string;
  role: 'user' | 'assistant';
}

interface UseApiProps {
  apiKey: string;
}

const useApi = ({ apiKey }: UseApiProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const sendMessageToApi = useCallback(
    async (message: string) => {
      const allMessages = [
        ...messages,
        { role: 'user', content: message },
      ] as Message[];
      if (apiKey) {
        setLoading(true);

        setMessages((prevMessage) => [
          ...prevMessage,
          { content: message, role: 'user' },
        ]);
        try {
          const responseMessage = await sendMessage(allMessages);
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: responseMessage, role: 'assistant' },
          ]);
        } catch (error) {
          console.error('Failed to send message:', error);
        } finally {
          setLoading(false);
        }
      }
    },
    [apiKey, messages]
  );

  return { messages, sendMessageToApi, loading };
};

export default useApi;
