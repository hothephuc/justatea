import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import "../pages/css/Chatbot.css";
import ProductController from '../controller/Product';

const genAI = new GoogleGenerativeAI("AIzaSyCL3SxaggSY6G5Idx_jGEE9bi4SCHGpn5A");

const extractProductIdFromInput = (input) => {
  const match = input.match(/product\s(\d+)/i);
  return match ? match[1] : null;
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Welcome to JustaTea's Customer Support! How can I assist you with our food and beverage services today?" }
  ]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const products = await ProductController.fetchProducts();
        const productDetails = products.map(product => 
          `Product Name: ${product.name}, Price: ${product.price}, Description: ${product.description}`
        ).join("\n");

        const initialPrompt = `
          You are a customer support specialist with extensive knowledge in e-commerce solutions, specifically focused on food and beverage industries. 
          Your role involves providing expert assistance to clients regarding the Justatea beverage shop.
          Product Information:
          ${productDetails}
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chatInstance = model.startChat({
          history: [
            { role: "user", parts: [{ text: initialPrompt }] },
            { role: "model", parts: [{ text: "Welcome to JustaTea's Customer Support! How can I assist you with our food and beverage services today?" }] },
          ],
        });
        setChat(chatInstance);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { role: "user", text: input };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      if (chat) {
        const result = await chat.sendMessage(input);
        const botResponse = result.response.text();
        setMessages(prevMessages => [...prevMessages, { role: "model", text: botResponse }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, { role: "model", text: "Sorry, there was an error processing your request." }]);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  return (
    <div className="chatbot-page">
      <h1>Customer Support Chatbot</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="loading">...</div>}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatbotPage;
