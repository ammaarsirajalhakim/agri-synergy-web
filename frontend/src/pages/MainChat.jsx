import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ExpertSidebar from '../components/ExpertSidebar';
import '../css/Chatstyless.css';
import Header from '../components/Header';
import Footer from '../components/footer';

function MainChat() {
  
  const [users] = useState([
    { id: 1, name: 'Siti Marlina', avatar: 'src/assets/profile/profile1.png', online: true },
    { id: 2, name: 'Ahmad Rizal', avatar: 'src/assets/profile/profile2.png', online: true },
  ]);

  const [experts] = useState([
    { id: 1, name: 'Ahmad Rizal', avatar: 'src/assets/profile/profile3.jpg', online: true },
    { id: 2, name: 'Diana Lestari', avatar: 'src/assets/profile/profile4.jpg', online: true },
    { id: 3, name: 'Budi Santoso', avatar: 'src/assets/profile/profile5.jpg', online: true },
    { id: 3, name: 'Siti Marlina', avatar: 'src/assets/profile/profile6.jpg', online: true },
    { id: 3, name: 'Wahyu Nugroho', avatar: 'src/assets/profile/profile7.jpg', online: true },
    { id: 3, name: 'Rama Duta', avatar: 'src/assets/profile/profile8.jpg', online: true },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help you?", sender: "expert" },
    { id: 2, text: "I need some information about farming.", sender: "user" },
    { id: 3, text: "Sure! What would you like to know?", sender: "expert" },
  ]);

  const [inputText, setInputText] = useState("");
  const [showEmojiBar, setShowEmojiBar] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = { id: messages.length + 1, text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const addEmojiToInput = (emoji) => {
    setInputText(inputText + emoji);
    setShowEmojiBar(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newMessage = { id: messages.length + 1, text: imageUrl, sender: "user", isImage: true };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <>
      <Header />
      <div className="app">
        <ChatSidebar users={users} onLogout={() => alert('Logout')} />
        <div className="rectangles-kalender"></div>

        <div className="chat-area">
          <div className="chat-box">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === "expert" && (
                  <>
                    <img src="src/assets/profile/profile5.jpg" alt="Expert Avatar" className="avatar" />
                    <div className="message-content expert-bubble">
                      {message.isImage ? (
                        <img src={message.text} alt="User uploaded" className="message-image" />
                      ) : (
                        message.text
                      )}
                    </div>
                  </>
                )}
                {message.sender === "user" && (
                  <>
                    <img src="src/assets/profile/profile9.jpg" alt="User Avatar" className="avatar" />
                    <div className="message-content user-bubble">
                      {message.isImage ? (
                        <img src={message.text} alt="User uploaded" className="message-image" />
                      ) : (
                        message.text
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="message-input">
            <button>
            <label htmlFor="imageUpload" className="image-upload-button">
              <img src="src/assets/chain.png" alt="Upload" />
            </label>
            </button>
            
            <button className="emoji-button" title="Add emoji" onClick={() => setShowEmojiBar(!showEmojiBar)}>
              <img src="src/assets/emot.png" alt="Emoji" className="emoji-icon" />
            </button>
            <input
              type="text"
              placeholder="Ketik pesan Anda di sini..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="imageUpload"
              onChange={handleImageUpload}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>

          {showEmojiBar && (
            <div className="emoji-bar">
              <button className="emoji" onClick={() => addEmojiToInput('😊')}>😊</button>
              <button className="emoji" onClick={() => addEmojiToInput('😂')}>😂</button>
              <button className="emoji" onClick={() => addEmojiToInput('❤️')}>❤️</button>
              <button className="emoji" onClick={() => addEmojiToInput('😎')}>😎</button>
              <button className="emoji" onClick={() => addEmojiToInput('😢')}>😢</button>
            </div>
          )}
        </div>
        
        <div className="rectangles-kalender"></div>
        <ExpertSidebar experts={experts} />
      </div>
      <Footer />
    </>
  );
}

export default MainChat;
