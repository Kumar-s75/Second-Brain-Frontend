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
import Editor from "../components/Editor"; // Import the Editor component

// Define types for content
interface Content {
  type: "twitter" | "youtube" | string; // Allow string but prefer known values
  link: string;
  title: string;
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents = [], refresh } = useContent() as { contents: Content[]; refresh: () => void }; // Ensure correct type
  const [selectedDoc, setSelectedDoc] = useState<Content | null>(null); // Explicitly type selectedDoc

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
                    "Authorization": localStorage.getItem("token") || ""
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
              <div key={index} onClick={() => setSelectedDoc({ type, link, title })}>
                <Card
  type="twitter"
  link="https://twitter.com/example"
  title="Follow us on Twitter"
  content={["Stay updated with our latest tweets!"]} // ✅ Now an array
  tags={["social", "twitter"]}
  dateAdded={new Date().toISOString()} // ✅ Converts Date to a string
/>


              </div>
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
        
        {/* Render Editor when a document is selected */}
        {selectedDoc && (
          <Editor 
            docId={selectedDoc.link} 
            userId="someUserId" // Replace with actual user ID
            onClose={() => setSelectedDoc(null)} 
          />
        )}
      </div>
    </div>
  );
}
