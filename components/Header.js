function Header() {
    try {
        return (
            <header data-name="header" className="bg-gray-900 shadow-lg border-b border-gray-800">
                <div data-name="header-container" className="container mx-auto px-4 py-6">
                    <div data-name="header-content" className="flex items-center justify-center">
                        <div data-name="logo-section" className="flex items-center space-x-3">
                            <i className="fas fa-braille text-4xl text-blue-500"></i>
                            <h1 data-name="title" className="text-3xl font-bold text-white">Image to Braille Converter</h1>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
