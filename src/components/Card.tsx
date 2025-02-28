import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon"; // Add a delete icon

interface CardProps {
    type: "twitter" | "youtube";
    link:string;
    title: string;
    content: string[];
    tags: string[];
    dateAdded: string;
}

export function Card({ title, content, tags, dateAdded }: CardProps) {
    return (
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-80 min-h-48">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2 text-gray-600 text-sm font-medium">
                    📂 {title}
                </div>
               
                <div className="flex space-x-2 text-gray-400">
                    
                    <ShareIcon  />
                    <TrashIcon  />
                </div>
            </div>

            {/* Main Content */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Future Projects</h2>
            <ul className="text-gray-700 text-sm space-y-1">
                {content.map((item, index) => (
                    <li key={index} className="flex items-start">
                        • {item}
                    </li>
                ))}
            </ul>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <p className="text-gray-400 text-xs mt-4">Added on {dateAdded}</p>
        </div>
    );
}
