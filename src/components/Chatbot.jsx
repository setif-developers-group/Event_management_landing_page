import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { CHATBOT_URL } from '../apis';

const ChatBot = ({ apiEndpoint = `${CHATBOT_URL}/api/chatbot/sdg` }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isServerReady, setIsServerReady] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check server status
  useEffect(() => {
    const checkServer = async () => {
      try {
        const baseUrl = apiEndpoint.split('/api')[0];
        const response = await fetch(baseUrl);
        if (response.ok) {
          setIsServerReady(true);
        }
      } catch (error) {
        console.log('Server not ready yet');
        setIsServerReady(false);
      }
    };
    
    if (isOpen) {
      checkServer();
      // Check every 5 seconds until server is ready
      const interval = setInterval(() => {
        if (!isServerReady) {
          checkServer();
        }
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen, isServerReady, apiEndpoint]);

  // Auto focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to UI immediately
    const newUserMessage = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Prepare API request
      const requestBody = {
        summary: summary,
        history: messages,
        message: userMessage
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Update summary if provided
      if (data.summary) {
        setSummary(data.summary);
      }

      // Update messages with the full history from response
      if (data.history) {
        setMessages(data.history);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSummary(null);
    setInputMessage('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-brand text-white rounded-full p-4 shadow-lg hover:bg-[#1464b3] transition-colors duration-200"
        aria-label="Toggle chat"
      >
        <Bot size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[95vw] sm:w-[400px] md:w-[450px] h-[85vh] sm:h-[600px] max-h-[800px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand to-[#2ed87e] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">SDG Chat</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-white/20 rounded transition-colors"
                aria-label="Reset chat"
              >
                <RefreshCw size={18} />
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white/20 rounded px-2 py-1 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!isServerReady ? (
              <div className="text-center text-gray-500 mt-8">
                <Loader2 size={48} className="mx-auto mb-4 text-gray-400 animate-spin" />
                <p className="text-lg font-medium">Starting the server...</p>
                <p className="text-sm mt-2">This might take a minute due to a cold start. Please wait...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <Bot size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Welcome!</p>
                <p className="text-sm mt-2">How can I help you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.role === 'user'
                          ? 'bg-brand text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-brand text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-gray-200">
                    <Loader2 className="animate-spin text-gray-500" size={20} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Summary Display (optional) */}
          {summary && (
            <div className="px-4 py-2 bg-blue-50 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                <strong>Summary:</strong> {summary}
              </p>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={!isServerReady ? "Server is starting..." : "Type your message..."}
                disabled={isLoading || !isServerReady}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1772CD] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-[#98f1c2] focus:outline-none focus:ring-2 focus:ring-brand disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;