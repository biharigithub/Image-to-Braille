function ConversionResult({ extractedText, brailleText, originalImage }) {
    try {
        const [isSpeaking, setIsSpeaking] = React.useState(false);

        const handleReadAloud = () => {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }

            const speech = new SpeechSynthesisUtterance(extractedText);
            speech.onend = () => setIsSpeaking(false);
            speech.onerror = () => setIsSpeaking(false);
            
            setIsSpeaking(true);
            window.speechSynthesis.speak(speech);
        };

        React.useEffect(() => {
            return () => {
                window.speechSynthesis.cancel();
            };
        }, []);

        if (!extractedText && !originalImage) return null;

        return (
            <div data-name="results-section" className="max-w-2xl mx-auto mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Results</h2>
                    {extractedText && (
                        <button
                            data-name="read-aloud-btn"
                            onClick={handleReadAloud}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-up'}`}></i>
                            <span>{isSpeaking ? 'Stop Reading' : 'Read Aloud'}</span>
                        </button>
                    )}
                </div>
                
                {originalImage && (
                    <div data-name="image-preview" className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
                        <div className="result-box rounded-lg overflow-hidden">
                            <img
                                src={URL.createObjectURL(originalImage)}
                                alt="Original text"
                                className="max-w-full h-auto"
                            />
                        </div>
                    </div>
                )}

                {extractedText && (
                    <div data-name="extracted-text" className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Extracted Text</h3>
                        <div className="result-box p-4 rounded-lg">
                            <p className="text-gray-300">{extractedText}</p>
                        </div>
                    </div>
                )}

                {brailleText && (
                    <div data-name="braille-output">
                        <h3 className="text-lg font-semibold mb-2">Braille Output</h3>
                        <div className="result-box p-4 rounded-lg">
                            <p className="text-2xl leading-relaxed text-gray-300">{brailleText}</p>
                        </div>
                        <button
                            data-name="copy-button"
                            onClick={() => navigator.clipboard.writeText(brailleText)}
                            className="mt-4 flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            <i className="fas fa-copy"></i>
                            <span>Copy Braille Text</span>
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ConversionResult component error:', error);
        reportError(error);
        return null;
    }
}
