import { FC, useState } from 'react';
import { useApiKey } from '../context/APIKeyContext';
import { Input } from '@mui/material';

const ApiKeyInput: FC = () => {
  const { apiKey, setApiKey } = useApiKey();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <Input
      type="text"
      value={apiKey}
      onChange={handleChange}
      fullWidth
      placeholder="Please enter your API key"
      style={{ margin: '20px' }}
    />
  );
};

export default ApiKeyInput;
