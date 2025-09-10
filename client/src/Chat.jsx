import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

const scenarios = {
  'buying-something-at-the-cu-mart': 'Only answer in Korean. You are a cashier at a CU mart. Greet me as a customer.',
  'talking-with-a-lecturer': 'Only answer in Korean. You are my lecturer. I want to talk about my grades. Greet me.',
  'conversation-with-a-group-mate': 'Only answer in Korean. You are my group mate for a project. Greet me and ask about our project.',
};

function Chat() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);

  const sendMessage = async (messageToSend, hideMessage = false) => {
    if (!messageToSend.trim()) return;

    if (!hideMessage) {
      const userMessage = { role: 'user', content: messageToSend };
      setChatHistory(prev => [...prev, userMessage]);
    }
    
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: messageToSend });
      const botMessage = { role: 'bot', content: response.data.message };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, something went wrong.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const scenario = searchParams.get('scenario');
    if (scenario && scenarios[scenario] && scenario !== currentScenario) {
      const timer = setTimeout(() => {
        sendMessage(scenarios[scenario], true);
        setCurrentScenario(scenario);
      }, 500); // 500ms delay
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [searchParams, currentScenario]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'bot' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;