// 定义API端点和请求头
import { getApiKeyFromStorage } from '../context/APIKeyContext';
import { Message } from '../hooks/useApi';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// 定义发送消息的函数
export const sendMessage = async (messages: Message[]): Promise<string> => {
  const apiKey = getApiKeyFromStorage();
  const body = {
    model: 'mistralai/mistral-7b-instruct',
    messages,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.role === 'assistant'
      ? data.choices[0].message.content
      : 'Sorry, an error occurred while processing your request.';
  } catch (error) {
    console.error('Error during API call:', error);
    return 'An error occurred while processing your request.';
  }
};
