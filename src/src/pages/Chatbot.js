import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import "../pages/css/Chatbot.css";
import ProductController from '../controller/Product';

const genAI = new GoogleGenerativeAI("AIzaSyCL3SxaggSY6G5Idx_jGEE9bi4SCHGpn5A");

// Helper function to format Firestore Timestamp
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds / 1000000));
    return date.toLocaleString(); // Adjust the format as needed
  }
  return 'N/A';
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Welcome to JustaTea's Customer Support! How can I assist you with our food and beverage services today?" }
  ]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const updateInitialPromptWithMetadata = async () => {
    try {
      const products = await ProductController.fetchProducts();
      console.log("Fetched Products:", products); // Debugging line
      
      // Format product details with timestamp conversion
      const productDetails = products.map(product => 
        `Product Name: ${product.name}\n` +
        `Description: ${product.description}\n` +
        `Price: ${product.price}\n` +
        `Tag: ${product.tag}\n` +
        `Image: [View Image](${product.imageUrl})\n` +
        `Added On: ${formatTimestamp(product.timestamp)}\n`
      ).join("\n");

      console.log("Formatted Product Details:", productDetails); // Debugging line

      const initialPrompt = `
        You are a customer support specialist with extensive knowledge in e-commerce solutions, specifically focused on food and beverage industries. 
        Địa chỉ: 227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh

        Điện thoại: 0901931656

        Email: TranBinhPhuocViet@gmail.com
        Your role involves providing expert assistance to clients regarding the Justatea beverage shop. Only answer based on the existing info about the shop and provide answers about products only.

        Product Information:
        ${productDetails}

        Metadata:
        - Products include detailed descriptions, images, and timestamps for when they were added.
        - Description: Ingredients or key details about the product.
        - Image: Link to the product image.
        - Added On: Timestamp when the product was added.

        Instructions:
        - Respond with detailed and accurate information.
        - If a product ID is mentioned, retrieve the product details from the provided product information.
        - Provide concise, clear, and helpful responses to enhance user experience.
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

  useEffect(() => {
    updateInitialPromptWithMetadata();
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

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
      <div className="chat-window" ref={chatWindowRef}>
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
