function HowToUse() {
    try {
        return (
            <div data-name="how-to-use" className="max-w-2xl mx-auto mt-12 mb-8">
                <h2 className="text-xl font-semibold mb-4">How to Use</h2>
                <div className="info-box p-6 rounded-lg">
                    <p className="text-gray-300 mb-4">
                        This tool extracts text from images and converts it into Braille characters. Follow these steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Upload an image containing English text.</li>
                        <li>Click "Extract Text & Convert" to process the image.</li>
                        <li>The extracted text and its Braille representation will appear in the Results section.</li>
                        <li>You can click "Read Aloud" to hear the extracted text spoken.</li>
                    </ol>
                    <div className="mt-4 text-blue-300">
                        <i className="fas fa-info-circle mr-2"></i>
                        For best results, use clear images with good contrast and legible text.
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('HowToUse component error:', error);
        reportError(error);
        return null;
    }
}
