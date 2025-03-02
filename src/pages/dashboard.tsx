// import { useEffect, useState } from "react";
// import { Button } from "../components/Button";
// import { Card } from "../components/Card";
// import { CreateContentModal } from "../components/CreateContentModal";
// import { PlusIcon } from "../icons/PlusIcon";
// import { ShareIcon } from "../icons/ShareIcon";
// import { Sidebar } from "../components/Sidebar";
// import { useContent } from "../hooks/useContent";
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// import Editor from "../components/Editor"; // Import the Editor component

// // Define types for content
// interface Content {
//   type: "twitter" | "youtube" | string; // Allow string but prefer known values
//   link: string;
//   title: string;
// }

// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const { contents = [], refresh } = useContent() as { contents: Content[]; refresh: () => void }; // Ensure correct type
//   const [selectedDoc, setSelectedDoc] = useState<Content | null>(null); // Explicitly type selectedDoc

//   useEffect(() => {
//     refresh();
//   }, [modalOpen]);

//   return (
//     <div>
//       <Sidebar />
//       <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
//         <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
//         <div className="flex justify-end gap-4">
//           <Button 
//             onClick={() => setModalOpen(true)} 
//             variant="primary" 
//             text="Add content" 
//             startIcon={<PlusIcon />} 
//           />
//           <Button 
//             onClick={async () => {
//               try {
//                 const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
//                   share: true
//                 }, {
//                   headers: {
//                     "Authorization": localStorage.getItem("token") || ""
//                   }
//                 });
//                 const shareUrl = `https://second-brain-frontend-two.vercel.app/share/${response.data.hash}`;
//                 alert(shareUrl);
//               } catch (error) {
//                 console.error("Error sharing brain:", error);
//               }
//             }} 
//             variant="secondary" 
//             text="Share brain" 
//             startIcon={<ShareIcon />} 
//           />
//         </div>
        
//         <div className="flex gap-4 flex-wrap">
//           {contents.length > 0 ? (
//             contents.map(({ type, link, title }, index) => (
//               <div key={index} onClick={() => setSelectedDoc({ type, link, title })}>
//                 <Card
//   type="twitter"
//   link="https://twitter.com/example"
//   title="Follow us on Twitter"
//   content={["Stay updated with our latest tweets!"]} // ✅ Now an array
//   tags={["social", "twitter"]}
//   dateAdded={new Date().toISOString()} // ✅ Converts Date to a string
// />


//               </div>
//             ))
//           ) : (
//             <p>No content available</p>
//           )}
//         </div>
        
//         {/* Render Editor when a document is selected */}
//         {selectedDoc && (
//           <Editor 
//             docId={selectedDoc.link} 
//             userId="someUserId" // Replace with actual user ID
//             onClose={() => setSelectedDoc(null)} 
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { PlusIcon, Share2Icon } from "lucide-react";
// import { toast } from "sonner";
// import axios from "axios";
// import { BACKEND_URL } from "@/config"; // Ensure this is correctly set
// import { CreateContentModal } from "@/components/CreateContentModal";

// interface Content {
//   type: "twitter" | "youtube" | string;
//   link: string;
//   title: string;
// }

// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
// const { contents = [], refresh } = useContent() as { contents: Content[]; refresh: () => void }; 
//   const [selectedDoc, setSelectedDoc] = useState<Content | null>(null);

//   const refresh = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/api/v1/brain/contents`, {
//         headers: { Authorization: localStorage.getItem("token") || "" },
//       });
//       setContents(response.data);
//     } catch (error) {
//       console.error("Error fetching content:", error);
//       toast.error("Failed to load content");
//     }
//   };

//   useEffect(() => {
//     refresh();
//   }, []);

//   const handleShareBrain = async () => {
//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/api/v1/brain/share`,
//         { share: true },
//         { headers: { Authorization: localStorage.getItem("token") || "" } }
//       );

//       const shareUrl = `https://second-brain-frontend-two.vercel.app/share/${response.data.hash}`;
//       await navigator.clipboard.writeText(shareUrl);
//       toast.success("Brain shared successfully!", { description: "Share link copied to clipboard" });
//     } catch (error) {
//       console.error("Error sharing brain:", error);
//       toast.error("Failed to share brain");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#1A1F2C] text-white">
//       <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)}  />

//       {/* Header */}
//       <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#403E43]/30 bg-[#222222]">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 rounded-full bg-violet-800 flex items-center justify-center">
//             <span className="text-white font-bold">B</span>
//           </div>
//           <h1 className="text-xl font-bold text-white">BrainApp</h1>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <motion.section
//           className="py-12 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">
//             Your Digital Brain
//           </h1>
//         </motion.section>

//         {/* Dashboard Preview */}
//         <motion.section
//           className="mt-8 rounded-xl overflow-hidden shadow-xl bg-[#222] py-8 px-6 text-center border border-[#333]/30"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//         >
//           <h2 className="text-2xl font-semibold text-violet-300 mb-4">BrainApp Dashboard</h2>
//           <div className="bg-[#0006] h-40 rounded-lg flex items-center justify-center">
//             <p className="text-[#C8C8C9] text-sm">Your content will appear here</p>
//           </div>
//         </motion.section>

//         {/* Action Buttons */}
//         <div className="mt-10 flex justify-end gap-4">
//           <Button
//             onClick={() => setModalOpen(true)}
//             variant="outline"
//             className="border-violet-700 text-violet-300 hover:bg-violet-800/20 flex items-center gap-2"
//           >
//             <PlusIcon size={16} />
//             Add content
//           </Button>
//           <Button
//             onClick={handleShareBrain}
//             className="bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2"
//           >
//             <Share2Icon size={16} />
//             Share brain
//           </Button>
//         </div>

//         {/* Content List */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//           {contents.length > 0 ? (
//             contents.map((content, index) => (
//               <motion.div
//                 key={index}
//                 onClick={() => setSelectedDoc(content)}
//                 className="bg-[#222] rounded-lg p-4 cursor-pointer hover:bg-[#2226] transition-colors border border-[#3336]/30"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * index, duration: 0.4 }}
//                 whileHover={{ y: -2 }}
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-6 h-6 rounded-full bg-violet-900/50 flex items-center justify-center text-xs">
//                     {content.type === "twitter" ? "𝕏" : content.type === "youtube" ? "▶" : "📄"}
//                   </div>
//                   <h3 className="font-medium text-white">{content.title}</h3>
//                 </div>
//                 <p className="text-[#C8C8C9]/70 text-xs truncate">{content.link}</p>
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-8 bg-[#222] rounded-lg border border-[#333]/30">
//               <p className="text-[#C8C8C9]/60">No content available</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusIcon, Share2Icon } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { BACKEND_URL } from "@/config" // Ensure this is correctly set
import { CreateContentModal } from "@/components/CreateContentModal"

interface Content {
  type: "twitter" | "youtube" | string
  link: string
  title: string
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [contents, setContents] = useState<Content[]>([])
  const [selectedDoc, setSelectedDoc] = useState<Content | null>(null)

  const refresh = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/brain/contents`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      })
      setContents(response.data)
    } catch (error) {
      console.error("Error fetching content:", error)
      toast.error("Failed to load content")
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleShareBrain = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") || "" } },
      )

      const shareUrl = `https://second-brain-frontend-two.vercel.app/share/${response.data.hash}`
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Brain shared successfully!", { description: "Share link copied to clipboard" })
    } catch (error) {
      console.error("Error sharing brain:", error)
      toast.error("Failed to share brain")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50 dark:from-background dark:to-background text-foreground">
      <CreateContentModal open={modalOpen} onClose={() =>{
     setModalOpen(false)
     refresh();   
      }} />

      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            BrainApp
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          className="py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
            Your Digital Brain
          </h1>
        </motion.section>

        {/* Dashboard Preview */}
        <motion.section
          className="mt-8 rounded-xl overflow-hidden shadow-xl bg-background py-8 px-6 text-center border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-purple-500 mb-4">BrainApp Dashboard</h2>
          <div className="bg-muted h-40 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Your content will appear here</p>
          </div>
        </motion.section>

        {/* Action Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Add content
          </Button>
          <Button
            onClick={handleShareBrain}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
          >
            <Share2Icon size={16} />
            Share brain
          </Button>
        </div>

        {/* Content List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {contents.length > 0 ? (
            contents.map((content, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedDoc(content)}
                className="bg-background rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xs text-white">
                    {content.type === "twitter" ? "𝕏" : content.type === "youtube" ? "▶" : "📄"}
                  </div>
                  <h3 className="font-medium text-foreground">{content.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs truncate">{content.link}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-background rounded-lg border border-border">
              <p className="text-muted-foreground">No content available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

