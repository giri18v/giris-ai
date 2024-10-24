import { useState, useEffect } from 'react';

const EditKeyModal = ({ isOpen, onClose, onEditKey, keyData }) => {
  const [keyName, setKeyName] = useState('');
  const [limitUsage, setLimitUsage] = useState(false);
  const [usageLimit, setUsageLimit] = useState(1000);

  useEffect(() => {
    if (keyData) {
      setKeyName(keyData.name);
      setLimitUsage(keyData.limitUsage || false);
      setUsageLimit(keyData.usageLimit || 1000);
    }
  }, [keyData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditKey(keyData.id, { name: keyName, limitUsage, usageLimit });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit API key</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-1">
              Key Name
            </label>
            <input
              type="text"
              id="keyName"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Key Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={limitUsage}
                onChange={(e) => setLimitUsage(e.target.checked)}
                className="mr-2"
              />
              <span>Limit monthly usage</span>
            </label>
          </div>
          {limitUsage && (
            <div className="mb-4">
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKeyModal;
