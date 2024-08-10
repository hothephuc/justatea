import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this is installed and imported correctly
import ReactMarkdown from 'react-markdown'; // Import the ReactMarkdown component
import "../pages/css/Chatbot.css";

const genAI = new GoogleGenerativeAI("AIzaSyCL3SxaggSY6G5Idx_jGEE9bi4SCHGpn5A");

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Welcome to JustaTea's Customer Support! How can I assist you with our food and beverage services today?" }
  ]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chatInstance = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: " You are a customer support specialist with extensive knowledge in e-commerce solutions, specifically focused on food and beverage industries. Your role involves providing expert assistance to clients regarding the Justatea project proposal for a comprehensive F&B e-commerce website. You possess strong communication skills, enabling you to engage effectively with clients, address their inquiries, and resolve issues timely.Your expertise includes an in-depth understanding of e-commerce platforms, customer relationship management, and the unique challenges associated with online food and beverage sales. You are adept at navigating technical issues related to website functionality, order processing, payment systems, and user experience optimization.In addition, you have a keen ability to empathize with customers, ensuring they feel heard and supported. You are familiar with best practices for customer support within the e-commerce sector, including ticketing systems, live chat protocols, and follow-up strategies to enhance customer satisfaction.You are also equipped to provide insights on how the Justatea platform can meet customers' needs by showcasing key features, addressing potential concerns, and guiding them through the purchasing process. You can anticipate common questions and proactively offer information regarding product offerings, delivery options, and any promotional campaigns.Your goal is to build lasting relationships with customers, ensuring that they have a positive experience while navigating the Justatea e-commerce site. You are dedicated to continuous learning to stay updated on industry trends and technological advancements that can enhance customer engagement and retention.Act as a customer support specialist for the project proposal titled \"Justatea - F&B E-Commerce Website.\" Provide an overview of the project, including key objectives, target audience, and unique selling points. Address potential customer queries regarding the e-commerce platform's features, user experience, payment options, and return policies. Additionally, explain the benefits of the Justatea website for both consumers and suppliers. Ensure your response is informative, empathetic, and solution-oriented, anticipating customer concerns and providing clear, reassuring answers." }],
          },
          {
            role: "model",
            parts: [{ text: "Welcome to JustaTea's Customer Support! How can I assist you with our food and beverage services today?" }],
          },
        ],
      });
      setChat(chatInstance);
    };
    initializeChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message to the conversation
    setMessages([...messages, { role: "user", text: input }]);

    if (chat) {
      const result = await chat.sendMessage(input);
      const botResponse = result.response.text();

      // Add bot response to the conversation
      setMessages([...messages, { role: "user", text: input }, { role: "model", text: botResponse }]);
    }

    setInput(''); // Clear input field
  };

  return (
    <div className="chatbot-page">
      <h1>Customer Support Chatbot</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {/* Render Markdown content */}
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
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
