import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import ExpertSidebar from "../components/ExpertSidebar";
import "../css/Chatstyless.css";
import Header from "../components/Header";
import Footer from "../components/footer";

function MainChat() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  // const [idUser, setIdUser] = useState(localStorage.getItem("id_user"));
  // const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [currentConsultationId, setCurrentConsultationId] = useState(null);
  const [users, setUsers] = useState([]);

  const [experts] = useState([
    {
      id: 1,
      name: "Ahmad Rizal",
      avatar: "src/assets/profile/profile3.jpg",
      online: true,
    },
    {
      id: 2,
      name: "Diana Lestari",
      avatar: "src/assets/profile/profile4.jpg",
      online: true,
    },
    {
      id: 3,
      name: "Budi Santoso",
      avatar: "src/assets/profile/profile5.jpg",
      online: true,
    },
  ]);

  const [messages, setMessages] = useState([]);

  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("id_user");
    const userRole = localStorage.getItem("role");
    const isOnlone = localStorage.getItem("isOnline");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:3000/api/send", {
        validateStatus: function (status) {
          return status < 500;
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }

      if (response.data?.data && response.data.data.length > 0) {
        const filteredConsultations = response.data.data.filter((konsultasi) =>
          userRole === "petani"
            ? konsultasi.id_user == userId
            : konsultasi.ahli_id == userId
        );

        if (filteredConsultations.length > 0) {
          setCurrentConsultationId(filteredConsultations[0].id_konsultasi);
        }

        const transformedMessages = filteredConsultations.flatMap(
          (konsultasi) =>
            konsultasi.send
              .filter(
                (message) =>
                  message.role === "petani" || message.role === "ahli"
              )
              .map((message) => ({
                id: message.id_chat,
                text: message.message,
                sender: message.id_sender == userId ? "user" : "expert",
                senderName: message.nama_pengguna,
                senderRole: message.role,
                sentAt: message.sent_at,
                avatar: message.foto,
              }))
        );

        if (transformedMessages.length === 0) {
          console.log("Tidak ada pesan ditemukan");
        }

        setMessages(transformedMessages);

        const transformedUsers = response.data.data.flatMap((konsultasi) =>
          konsultasi.send
            .filter((message) => message.role === "ahli")
            .map((message) => ({
              id: message.id_sender,
              name: message.nama_pengguna,
              avatar: `http://localhost:3000/api/fileUsers/${message.foto}`,
              online: true,
            }))
        );
        setUsers(transformedUsers);
      } else {
        console.log("Tidak ada data konsultasi");
        setMessages([]);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }
      console.log("Error Validating token:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || !currentConsultationId) return;

    try {
      const response = await axios.post("http://localhost:3000/api/send", {
        message: inputText,
        id_sender: idUser,
        id_konsultasi: currentConsultationId,
      });

      if (response.data.success) {
        const newMessage = {
          id: messages.length + 1,
          text: inputText,
          sender: "user",
          senderName: userRole,
          avatar: localStorage.getItem("user_avatar") || "default_avatar.jpg",
          sentAt: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        setInputText("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && currentConsultationId) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id_sender", idUser);
      formData.append("id_konsultasi", currentConsultationId);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          const imageUrl = URL.createObjectURL(file);
          const newMessage = {
            id: messages.length + 1,
            text: imageUrl,
            sender: "user",
            isImage: true,
            avatar: localStorage.getItem("user_avatar") || "default_avatar.jpg",
            sentAt: new Date().toISOString(),
          };
          setMessages([...messages, newMessage]);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const addEmojiToInput = (emoji) => {
    setInputText(inputText + emoji);
    setShowEmojiBar(false);
  };

  return (
    <>
      <Header />
      <div className="app">
        <ChatSidebar users={users} onLogout={() => alert("Logout")} />
        <div className="rectangles-kalender"></div>

        <div className="chat-area">
          <div className="chat-box">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === "expert" && (
                  <>
                    <img
                      src={`http://localhost:3000/api/fileUsers/${message.avatar}`}
                      alt="Expert Avatar"
                      className="avatar"
                    />
                    <div className="message-content expert-bubble">
                      {message.isImage ? (
                        <img
                          src={message.text}
                          alt="User uploaded"
                          className="message-image"
                        />
                      ) : (
                        message.text
                      )}
                    </div>
                  </>
                )}
                {message.sender === "user" && (
                  <>
                    <img
                      src={`http://localhost:3000/api/fileUsers/${message.avatar}`}
                      alt="User Avatar"
                      className="avatar"
                    />
                    <div className="message-content user-bubble">
                      {message.isImage ? (
                        <img
                          src={message.text}
                          alt="User uploaded"
                          className="message-image"
                        />
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

            <button
              className="emoji-button"
              title="Add emoji"
              onClick={() => setShowEmojiBar(!showEmojiBar)}
            >
              <img
                src="src/assets/emot.png"
                alt="Emoji"
                className="emoji-icon"
              />
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
              <button className="emoji" onClick={() => addEmojiToInput("😊")}>
                😊
              </button>
              <button className="emoji" onClick={() => addEmojiToInput("😂")}>
                😂
              </button>
              <button className="emoji" onClick={() => addEmojiToInput("❤️")}>
                ❤️
              </button>
              <button className="emoji" onClick={() => addEmojiToInput("😎")}>
                😎
              </button>
              <button className="emoji" onClick={() => addEmojiToInput("😢")}>
                😢
              </button>
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
