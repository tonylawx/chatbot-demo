import { FC } from 'react';
import Chat from './components/Chat';
import ApiKeyInput from './components/APIKeyInput';

const App: FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <ApiKeyInput />
      <Chat />
    </div>
  );
};

export default App;
