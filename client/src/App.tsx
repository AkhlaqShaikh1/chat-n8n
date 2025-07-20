import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import InfoPanel from './components/InfoPanel';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    let currentChatId = localStorage.getItem('chatId');
    if (!currentChatId) {
      currentChatId = uuidv4();
      localStorage.setItem('chatId', currentChatId);
    }
    setChatId(currentChatId);

    const socket = io('https://chat-n8n-q3o9.onrender.com', { query: { chatId: currentChatId } });

    socket.on('botResponse', (response) => {
      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, text: response.message, sender: 'bot' }]);
      setIsTyping(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || !chatId) return;

    const userMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    const messageToSend = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      await fetch('https://chat-n8n-q3o9.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend, chatId }),
      });
    } catch (error) {
      console.error('Error sending message to backend:', error);
      setIsTyping(false); // Stop typing indicator on error
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex flex-col h-[85vh] bg-white rounded-lg shadow-lg">
            <Header />
            <MessageList messages={messages} isTyping={isTyping} />
            <MessageInput 
              inputValue={inputValue} 
              setInputValue={setInputValue} 
              handleSendMessage={handleSendMessage} 
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}

export default App;