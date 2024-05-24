import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import useApi from '../hooks/useApi';
import { useApiKey } from '../context/APIKeyContext';
//@ts-ignore
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HourglassEmptyTwoToneIcon from '@mui/icons-material/HourglassEmptyTwoTone';
import PendingIcon from '@mui/icons-material/Pending';
const Chat: React.FC = () => {
  const { apiKey } = useApiKey();
  const [input, setInput] = React.useState('');
  const { messages, sendMessageToApi, loading } = useApi({ apiKey });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (!apiKey) {
      window.alert('Enter API key first');
    }
    const trimmedInput = input.trim();
    if (trimmedInput) {
      sendMessageToApi(trimmedInput);
      setInput('');
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // 检测到回车键
      event.preventDefault(); // 阻止表单默认提交行为
      handleSubmit();
    }
  };

  return (
    <>
      <Box
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          position: 'relative',
        }}
      >
        {messages.length
          ? messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                  margin: '10px 0',
                }}
              >
                <Avatar
                  style={{
                    backgroundColor:
                      message.role === 'user' ? 'green' : 'purple',
                    margin: '0 10px',
                    width: '30px',
                    height: '30px',
                  }}
                >
                  {message.role === 'user' ? 'U' : 'M'}
                </Avatar>
                <Paper
                  elevation={3}
                  style={{
                    padding: '10px 15px',
                    borderRadius: '20px',
                    flex: 1,
                    minWidth: '100px',
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                </Paper>
              </div>
            ))
          : 'Type and press Enter to start chatting'}
        {loading ? <PendingIcon /> : null}
      </Box>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
          borderTop: '1px solid #ccc',
          position: 'relative',
          width: '100%',
        }}
      >
        <TextField
          value={input}
          onChange={handleChange}
          label="Type your message"
          multiline
          variant="outlined"
          fullWidth
          onKeyPress={handleKeyPress}
        ></TextField>
        {loading ? (
          <HourglassEmptyTwoToneIcon
            style={{ position: 'absolute', right: '20px' }}
          />
        ) : (
          <ArrowUpwardIcon
            onClick={handleSubmit}
            style={{ position: 'absolute', right: '20px' }}
          />
        )}
      </Box>
    </>
  );
};

export default Chat;
