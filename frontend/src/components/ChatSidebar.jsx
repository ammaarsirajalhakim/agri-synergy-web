// components/ChatSidebar.js
import React from 'react';
import { useNavigate } from "react-router-dom";

const ChatSidebar = ({ users, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className='chat-container'>
      <div className="chat-header sidebar-chat">
        <p>Your Chat</p>
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="chat-item">
              <img src={user.avatar} alt={user.name} className="avatar" />
              <div>
                <div>{user.name}</div>
                <span className="status">{user.online ? 'online' : 'offline'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="logout-button sidebar-chat">
        <button onClick={() => navigate('/')}>
          <div className='icon-out'>
            <img src="src/assets/out.png" alt="Logout Icon" className="logout-icon" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
