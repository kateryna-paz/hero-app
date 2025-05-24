function Modal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-sm text-gray-600">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
