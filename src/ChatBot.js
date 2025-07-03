// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaPaperPlane, FaTimes, FaRedo } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! 👋 I'm Dev's virtual assistant. Ask me about Dev's background, skills, or projects!", 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [setBackendStatus] = useState('unknown');
  const messagesEndRef = useRef(null);
  
  // Backend URL configuration
  const backendBaseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  const suggestedQuestions = [
    "What are Dev's technical skills?",
    "Can you tell me about Dev's experience?",
    "What projects has Dev worked on?",
    "How can I contact Dev?"
  ];

  const testBackendConnection = async () => {
    try {
      setBackendStatus('checking');
      await axios.get(`${backendBaseURL}/`, {
        timeout: 3000,
        headers: { 'X-Connection-Test': 'true' }
      });
      setBackendStatus('connected');
      setConnectionError(null);
    } catch (error) {
      setBackendStatus('failed');
      setConnectionError(
        `I'm having trouble connecting to the knowledge base. ` + 
        'Please check your internet connection and try again.'
      );
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    testBackendConnection();
  },  [testBackendConnection]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const sendToBackend = async (message) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `${backendBaseURL}/api/chat`, 
        { message: message },
        { 
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'X-Client': 'portfolio-chatbot'
          }
        }
      );
      
      if (response.data.reply) {
        return response.data.reply;
      } else {
        throw new Error('No reply from server');
      }
    } catch (error) {
      let errorMessage = "I'm having some trouble connecting right now. ";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "I'm taking longer than usual to respond. Please try again in a moment.";
      } else if (error.response) {
        errorMessage += `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage += "I didn't get a response. Please check your connection and try again.";
      } else {
        errorMessage += `Error: ${error.message}`;
      }
      
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { 
      text: input, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Get response from backend
    const botResponse = await sendToBackend(input);
    
    // Add bot response
    setMessages(prev => [...prev, { 
      text: botResponse, 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSuggestedQuestion = async (question) => {
    setInput('');
    
    // Add user message
    const userMessage = { 
      text: question, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Get response from backend
    const botResponse = await sendToBackend(question);
    
    // Add bot response
    setMessages(prev => [...prev, { 
      text: botResponse, 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleRetryConnection = () => {
    setConnectionError(null);
    testBackendConnection();
  };

  return (
    <div className="chatbot-container" style={{ right: '30px', bottom: '30px' }}>
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-left">
              <div className="avatar">
                <FaRobot className="robot-icon" />
              </div>
              <div>
                <h3>Dev's Assistant</h3>
                <p>Online • Ready to help</p>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="chatbot-body">
            {connectionError && (
              <div className="connection-error">
                <div className="error-content">
                  <div className="error-icon">⚠️</div>
                  <div>
                    <p>{connectionError}</p>
                    <button 
                      className="retry-btn"
                      onClick={handleRetryConnection}
                    >
                      <FaRedo className="retry-icon" /> Retry Connection
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-content">
                    {msg.text}
                  </div>
                  <div className="message-timestamp">
                    {msg.timestamp}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message bot-message">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {!isLoading && messages.length === 1 && (
              <div className="suggested-questions">
                <p>Try asking:</p>
                <div className="question-buttons">
                  {suggestedQuestions.map((question, index) => (
                    <button 
                      key={index}
                      className="question-btn"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="chatbot-footer">
            <form onSubmit={handleSend}>
              <div className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Dev's background..."
                  disabled={isLoading}
                  aria-label="Chat input"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                >
                  <FaPaperPlane className="send-icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <IoMdChatbubbles className="chat-icon" />
          <span className="pulse-dot"></span>
        </button>
      )}
      
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          z-index: 1000;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .chatbot-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .chatbot-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .chat-icon {
          font-size: 28px;
        }
        
        .pulse-dot {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 12px;
          height: 12px;
          background-color: #4ade80;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse 1.5s infinite;
        }
        
        .chatbot-window {
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .chatbot-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .robot-icon {
          color: #6a11cb;
          font-size: 20px;
        }
        
        h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
          padding: 5px;
        }
        
        .close-btn:hover {
          opacity: 1;
        }
        
        .chatbot-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f8f9fa;
          overflow: hidden;
        }
        
        .connection-error {
          background: #ffeaea;
          color: #d32f2f;
          padding: 12px;
          font-size: 13px;
          border-bottom: 1px solid #ffcdcd;
        }
        
        .error-content {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        
        .error-icon {
          font-size: 18px;
          flex-shrink: 0;
        }
        
        .retry-btn {
          background: #d32f2f;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 12px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .retry-btn:hover {
          background: #b71c1c;
        }
        
        .retry-icon {
          font-size: 10px;
        }
        
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          animation: fadeIn 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .bot-message {
          align-self: flex-start;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 18px 18px 18px 4px;
        }
        
        .user-message {
          align-self: flex-end;
          background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
        
        .message-content {
          font-size: 14px;
          line-height: 1.5;
        }
        
        .message-timestamp {
          font-size: 10px;
          opacity: 0.7;
          margin-top: 5px;
          text-align: right;
        }
        
        .typing-indicator {
          display: flex;
          gap: 5px;
          padding: 5px 0;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #6a11cb;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.3s linear infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.15s;
          background: #2575fc;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.3s;
          background: #6a11cb;
        }
        
        .suggested-questions {
          padding: 0 15px 15px;
          border-top: 1px solid #eee;
          background: white;
        }
        
        .suggested-questions p {
          font-size: 13px;
          color: #666;
          margin-bottom: 10px;
        }
        
        .question-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .question-btn {
          background: #f0f4ff;
          border: 1px solid #d0d8ff;
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 12px;
          color: #2575fc;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          white-space: normal;
        }
        
        .question-btn:hover {
          background: #e1e8ff;
          transform: translateY(-2px);
        }
        
        .chatbot-footer {
          padding: 15px;
          background: white;
          border-top: 1px solid #eee;
        }
        
        .input-group {
          display: flex;
          gap: 10px;
        }
        
        input {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 24px;
          padding: 12px 18px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        
        input:focus {
          border-color: #2575fc;
          box-shadow: 0 0 0 2px rgba(37, 117, 252, 0.2);
        }
        
        button[type="submit"] {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        
        button[type="submit"]:hover {
          transform: scale(1.05);
        }
        
        button[type="submit"]:disabled {
          background: #cccccc;
          cursor: not-allowed;
          transform: none;
        }
        
        .send-icon {
          font-size: 18px;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;