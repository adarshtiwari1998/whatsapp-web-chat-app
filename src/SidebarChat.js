import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({id, name, addNewChat}) {
const [seed, setSeed] = useState("");
const [ messages, setMessages] = useState("");

useEffect(() => {
 if (id) {
     db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => setMessages(snapshot.docs.map((doc) => doc.data()))
     );

 }
}, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

}, []);

const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName){
        //do some database code
        db.collection("rooms").add({
            name: roomName, 
        });
    }
};

    return  !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
         <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
         <div className="sidebarChat-info">
            <h2>{name}</h2>
           <p>{messages[0]?.message} <span><img className="messageTick" src="https://img.icons8.com/color/452/double-tick.png" alt=""></img></span></p>
         
         </div>
         </div>
        </Link>
   
    ): (
        <div onClick={createChat}  className="sidebarChat1">
            <h4><button className="btn">Click Here</button> to Add New Chat Here <span>👈</span> </h4>
            </div>

    );
}

export default SidebarChat
