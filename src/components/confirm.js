import React from 'react';

const Confirm = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/4">
        <p className="text-center text-lg mb-4 text-black">{message}</p>
        <div className="flex justify-around">
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Yes
          </button>
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
