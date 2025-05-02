function App() {
    try {
        const [selectedImage, setSelectedImage] = React.useState(null);
        const [extractedText, setExtractedText] = React.useState('');
        const [brailleText, setBrailleText] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleImageSelect = async (file) => {
            try {
                setSelectedImage(file);
                setIsLoading(true);
                setError('');
                
                const result = await extractTextFromImage(file);
                setExtractedText(result.extractedText);
                setBrailleText(result.brailleText);
            } catch (err) {
                setError('Failed to process image. Please try again.');
                console.error('Image processing error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div data-name="app" className="app-container">
                <Header />
                <main data-name="main-content" className="container mx-auto px-4 py-8">
                    <ImageUploader onImageSelect={handleImageSelect} />
                    
                    {error && (
                        <div data-name="error-message" className="max-w-2xl mx-auto mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                    )}
                    
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <ConversionResult
                            extractedText={extractedText}
                            brailleText={brailleText}
                            originalImage={selectedImage}
                        />
                    )}

                    <HowToUse />
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
