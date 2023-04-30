import styled from "styled-components";
import { useState, useEffect } from "react";
import { socket } from "@/services/socket";
import { colors } from "@/styles/colors";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [dataMessages, setDataMessages] = useState([]);

  useEffect(() => {
    try {
      const receiveMessage = (message) => {
        console.log({ message });
        setDataMessages([message, ...dataMessages]);
      };
      socket.on("sendMessage", receiveMessage);
      return () => {
        socket.off("sendMessage", receiveMessage);
      };
    } catch (error) {
      console.log({ error });
    }
  }, [dataMessages]);

  const sendData = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message);
    setMessage("");
    let newMessage = {
      text: message,
      user: "yo",
    };
    setDataMessages([newMessage, ...dataMessages]);
  };
  return (
    <Layout>
      <div className="container">
        <div className=" header">
          <p className="title"> Chat demo with Next</p>
        </div>
        <div className="body">
          <form className="form" onSubmit={sendData}>
            <div className="display-text">
              <ul className="list">
                {dataMessages.length > 0
                  ? dataMessages.map((message, index) => {
                      return (
                        <li
                          key={index}
                          className={`text-message ${
                            message.user === "yo" ? `me` : `oter`
                          }`}
                        >
                          usuario ({message.user}) : {message.text}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div className="send-text">
              <input
                className="chat-box"
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
              <button className="buttom" onClick={sendData}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  width: 99vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  .me {
    color: ${colors.white};
    background-color: ${colors.blue};
  }
  .oter {
    color: ${colors.white};
    background-color: ${colors.aqua};
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10vh;

    .header {
      .title {
        color: ${colors.aqua};
        font-size: xx-large;
        font-weight: bold;
        font-family: cursive;
      }
    }
    .body {
      form {
        background-color: ${colors.gray};
        width: 44vw;
        border-radius: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .display-text {
          margin-top: 1.6rem;
          width: 40vw;
          height: 34vh;
          background-color: ${colors.white};
          border: solid 1px;
          border-color: ${colors.gray};
          overflow-y: auto;
          .list {
            padding-inline: 20px;
          }
          .text-message {
          }
        }
      }
      .send-text {
        display: flex;
        width: 40vw vw;
        border: solid 1px;
        border-color: ${colors.gray};
        margin: auto;
        margin-bottom: 2rem;
        .chat-box {
          padding: 0.56rem;
          width: 30.2vw;
        }
        .buttom {
          padding: 0.6rem;
          padding-inline: 2.8rem;
          color: ${colors.white};
          background-color: ${colors.aqua};
          border-color: transparent;
          cursor: pointer;
          &:hover {
            background-color: ${colors.primary};
            color: ${colors.white};
          }
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 10vh;

      .header {
        .title {
          color: ${colors.aqua};
          font-size: xx-large;
          font-weight: bold;
          font-family: cursive;
        }
      }
      .body {
        form {
          background-color: ${colors.gray};
          width: 82vw;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .display-text {
            margin-top: 1.6rem;
            width: 72vw;
            height: 34vh;
            background-color: ${colors.white};
            border: solid 1px;
            border-color: ${colors.gray};
            overflow-y: auto;
          }
        }
        .send-text {
          display: flex;
          /* width: 40vw; */
          border: solid 1px;
          border-color: ${colors.gray};
          margin: auto;
          margin-bottom: 2rem;
          .chat-box {
            padding: 0.56rem;
            width: 40.2vw;
          }
          .buttom {
            padding: 0.6rem;
            padding-inline: 2rem;
            color: ${colors.white};
            background-color: ${colors.aqua};
            border-color: transparent;
            cursor: pointer;
            &:hover {
              background-color: ${colors.primary};
              color: ${colors.white};
            }
          }
        }
      }
    }
  }
`;
