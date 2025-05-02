function LoadingSpinner() {
    try {
        return (
            <div data-name="loading-spinner" className="flex flex-col items-center justify-center my-8">
                <div className="loading-spinner mb-4">
                    <i className="fas fa-circle-notch text-4xl text-blue-500"></i>
                </div>
                <span data-name="loading-text" className="text-gray-400 text-center">
                    Extracting text from image...<br/>
                    This may take a few moments
                </span>
            </div>
        );
    } catch (error) {
        console.error('LoadingSpinner component error:', error);
        reportError(error);
        return null;
    }
}
