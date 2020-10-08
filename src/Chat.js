import React, { useState, useEffect, handleSubmit } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic"
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
 const [input, setInput] = useState("");
 const [seed, setSeed ] = useState("");
 const { roomId } = useParams();
 const [ roomName, setRoomName ] = useState("");
 const [ messages, setMessages] = useState([]);
 const [ { user }, dispatch] = useStateValue();


 useEffect(() => {
 if (roomId) {
     db.collection("rooms").doc(roomId).onSnapshot((snapshot) => setRoomName (snapshot.data().name));
       db.collection("rooms").doc(roomId).collection("messages").orderBy ("timestamp", "asc").onSnapshot((snapshot) => 
             setMessages(snapshot.docs.map((doc) => doc.data()))
         );
 }
 }, [roomId])

       useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

}, [roomId]);


const sendMessage  = (e) => {
    e.preventDefault();
    console.log('You typed >>>', input);

    db.collection("rooms").doc(roomId).collection ("messages").add ({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
       
    });

    setInput("");
 
};

    return ( 
    
    <div className="chat">
        <div className="chat-header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

            <div className="chat-headerInfo">
             <h3>{roomName}</h3>
                <p>
                    last seen {""}
                    {new Date (
                       messages[messages.length - 1]?.timestamp?.toDate() 
                    ).toUTCString()}
                </p>

            </div>

            <div className="chat-headerRight">
            <IconButton>
                  <SearchOutlined />
                </IconButton>
                <IconButton>
                <AttachFile />
                </IconButton>
                <IconButton>
                <MoreVert />
                </IconButton>
            </div>
          </div>
        <div className="chat-body">
            {messages.map((message) => (
            <p className={`chat-message ${message.name === user.displayName && "chat-reciever"}`}>
              <span className="chat-name ">
                {message.name}</span>
                {message.message}
                <span className="chat-timestamp">
                 {new Date(message.timestamp?.toDate()).toUTCString()}
               </span>  <span><img className="messageTick" src="https://img.icons8.com/windows/452/double-tick.png" alt=""></img></span>
            </p>          
            ))}
        </div>

        <div className="chat-footer">
             <InsertEmoticonIcon  />
             <form>
                 <input value={input} onChange={e => setInput(e.target.value)}  placeholder="Type a Message here 👈"type="text" />
                 <button  onClick={sendMessage} type="submit"> Send a Message</button>
               </form>

             <MicIcon />

        </div>
        <div class="modal" id="modal-one" aria-hidden="true">
    <div className="modal-dialog">
        <div class="modal-header">
           <Avatar src={user?.photoURL}/>
            <h3>Welcome, {user?.displayName} in the WhatsAppWebChat</h3>
            <h4>Sign in as</h4>
            <span className="modalspan">{user?.email}</span>
            <span className="modalspan">{user?.phoneNumber}</span>
            <a href="#modal-one" className="btn-close" aria-hidden="true">×</a>

        </div>
    </div>
</div>

 </div>
        
        
    );
    
}

export default Chat;
