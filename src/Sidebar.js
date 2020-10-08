import React , { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertiIcon from "@material-ui/icons/MoreVert";
import SearchOutlined  from "@material-ui/icons/SearchOutlined";
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from "./StateProvider";


function Sidebar () {

  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => { 
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({
         id: doc.id,
         data:doc.data(),
   }))
   )
  );

  return () => {
      unsubscribe();
  }
  },[]);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName){
        //do some database code
        db.collection("rooms").add({
            name: roomName, 
        });
    }
};

    return (
        <div className="sidebar">
        <div className="sidebar-header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebarusername">
            <h3>{user?.displayName}</h3>
            </div>
             <div className="sidebar-header-right">
                <IconButton>
                  <DonutLargeIcon />
                </IconButton>
                <IconButton>
                <ChatIcon />
                </IconButton>
                <IconButton>
                <MoreVertiIcon  onClick={createChat}  />
                </IconButton>

            </div>
        </div>
            <div className="sidebar-search">
            <div className="sidebar-searchContainer">
            <SearchOutlined />
                <input placeholder="Search or start new chat" type ="text"
                />
          </div>
              
            </div>
            <div className="sidebar-chats">
                <SidebarChat  addNewChat/>
                 {rooms.map(room => (
                     <SidebarChat key={room.id} id={room.id}
                     name={room.data.name} />
                 ))}

             </div>
        </div>
    )
}

export default Sidebar
