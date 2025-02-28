import useLiveEditing from "../hooks/useLiveEditing";

type EditorProps = {
  docId: string;
  userId: string;
  onClose: () => void;
};

const Editor: React.FC<EditorProps> = ({ docId, userId, onClose }) => {
  const { content, updateContent, saveContent } = useLiveEditing(docId, userId);

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        rows={10}
      />
      <button onClick={saveContent}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Editor;
