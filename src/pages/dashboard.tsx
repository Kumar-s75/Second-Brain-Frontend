import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents = [], refresh } = useContent(); // Ensure contents is always an array

  useEffect(() => {
    
    refresh();
  }, [modalOpen]);

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <div className="flex justify-end gap-4">
          <Button 
            onClick={() => setModalOpen(true)} 
            variant="primary" 
            text="Add content" 
            startIcon={<PlusIcon />} 
          />
          <Button 
            onClick={async () => {
              try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers: {
                    "Authorization": localStorage.getItem("token")
                  }
                });
                const shareUrl = `https://second-brain-frontend-two.vercel.app/share/${response.data.hash}`;
                alert(shareUrl);
              } catch (error) {
                console.error("Error sharing brain:", error);
              }
            }} 
            variant="secondary" 
            text="Share brain" 
            startIcon={<ShareIcon />} 
          />
        </div>
        
        <div className="flex gap-4 flex-wrap">
          {contents.length > 0 ? (
            contents.map(({ type, link, title }, index) => (
              <Card key={index} type={type} link={link} title={title} />
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </div>
  );
}
