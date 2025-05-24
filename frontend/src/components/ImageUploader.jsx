import { useState, useRef, useEffect } from "react";
function ImageUploader({ images = [], onChange }) {
  const [files, setFiles] = useState(images);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFiles(images);
  }, [images]);

  const handleUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const updated = [...files, ...newFiles];
    setFiles(updated);
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = files.filter((_, i) => i !== index);

    setFiles(updated);
    onChange(updated);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  const getPreview = (item) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    if (item.url) return item.url;
    return item;
  };

  return (
    <div>
      <label className="block font-semibold text-lg mb-2">Images</label>

      <input
        type="file"
        multiple
        onChange={handleUpload}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="flex gap-4 flex-wrap">
        {files.map((item, index) => (
          <div
            key={index}
            className="relative w-32 h-32 rounded overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={getPreview(item)}
              alt={`img-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center shadow"
              title="Remove image"
            >
              ✕
            </button>
          </div>
        ))}

        <div
          onClick={triggerUpload}
          className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-500 rounded cursor-pointer hover:border-gray-600 hover:text-gray-700 transition"
        >
          + Add
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
