import { useEffect, useState } from "react";
// import { io} from "socket.io-client";

import io from "socket.io-client"
const socket = io("http://localhost:8080", {
  transports: ["websocket", "polling"],
  //@ts-ignore
  withCredentials: true
});



const useLiveEditing = (docId: string, userId: string) => {
  const [content, setContent] = useState("");
  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server");
});
  useEffect(() => {
    socket.emit("join-document", { docId, userId });

    socket.on("load-document", (loadedContent:any) => {
      setContent(loadedContent);
    });

    socket.on("update-document", (updatedContent:any) => {
      setContent(updatedContent);
    });

    return () => {
      socket.off("load-document");
      socket.off("update-document");
    };
  }, [docId, userId]);

  const updateContent = (newContent: string) => {
    setContent(newContent);
    socket.emit("edit-document", { docId, content: newContent });
  };

  const saveContent = () => {
    socket.emit("save-document", { docId, content });
  };

  return { content, updateContent, saveContent };
};

export default useLiveEditing;
