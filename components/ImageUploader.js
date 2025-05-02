function ImageUploader({ onImageSelect }) {
    try {
        const [isDragging, setIsDragging] = React.useState(false);
        const [selectedFileName, setSelectedFileName] = React.useState('No file chosen');
        const [error, setError] = React.useState('');

        const validateImage = (file) => {
            if (!file) {
                setError('Please select an image file');
                return false;
            }

            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file (JPG, PNG, etc.)');
                return false;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return false;
            }

            return true;
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = () => {
            setIsDragging(false);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            processFile(files[0]);
        };

        const handleFileInput = (e) => {
            const file = e.target.files[0];
            processFile(file);
        };

        const processFile = (file) => {
            setError('');
            
            if (!validateImage(file)) {
                return;
            }

            setSelectedFileName(file.name);
            onImageSelect(file);
        };

        return (
            <div data-name="upload-section" className="max-w-2xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                <p className="text-gray-400 mb-4">Select an image containing English text</p>
                <div
                    data-name="dropzone"
                    className={`dropzone p-8 text-center rounded-lg bg-gray-800 border-2 border-dashed ${
                        isDragging ? 'border-blue-500 bg-gray-700' : 'border-gray-600'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            data-name="choose-file-btn"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            Choose File
                        </button>
                        <span className="text-gray-400">{selectedFileName}</span>
                    </div>
                    <input
                        id="file-input"
                        data-name="file-input"
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept="image/*"
                    />
                    {error && (
                        <p data-name="error-message" className="text-red-500 mt-4">
                            {error}
                        </p>
                    )}
                </div>
                <div className="mt-4 text-gray-400 text-sm">
                    <p>Supported formats: JPG, PNG, GIF, BMP</p>
                    <p>Maximum file size: 5MB</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ImageUploader component error:', error);
        reportError(error);
        return null;
    }
}
