import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// 定义 context 的类型
interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

// 创建 context 并赋予初始值
const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

interface ApiKeyProviderProps {
  children: ReactNode;
}

// 创建 Provider 组件
export const APIKeyContext: React.FC<ApiKeyProviderProps> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    // 尝试从本地存储中读取初始值
    return localStorage.getItem('apiKey') || '';
  });
  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem('apiKey', key);
  };

  const getApiKeyFromStorage = (): string | null => {
    return localStorage.getItem('apiKey');
  };

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKeyState(storedApiKey);
    }
  }, []);
  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

// 创建自定义 hook
export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
export const getApiKeyFromStorage = (): string => {
  return localStorage.getItem('apiKey') || '';
};
