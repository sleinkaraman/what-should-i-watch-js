import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Shuffle, Play, Sparkles } from 'lucide-react';
import { getRandomMovie, getMultipleRandomMovies } from '../data/mock';

const MovieWheel = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [displayMovies, setDisplayMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleSpin = async () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);
        setSelectedMovie(null);

        // Get random movies for the animation
        const randomMovies = getMultipleRandomMovies(20);
        setDisplayMovies(randomMovies);

        // Start the card flip animation
        let index = 0;
        const interval = setInterval(() => {
            setCurrentIndex(index % randomMovies.length);
            index++;
        }, 100); // Fast initial speed

        // Slow down after 2 seconds
        setTimeout(() => {
            clearInterval(interval);

            let slowIndex = index % randomMovies.length;
            const slowInterval = setInterval(() => {
                setCurrentIndex(slowIndex % randomMovies.length);
                slowIndex++;
            }, 300); // Slower speed

            // Final selection after another 2 seconds
            setTimeout(() => {
                clearInterval(slowInterval);
                const finalMovie = getRandomMovie();
                setSelectedMovie(finalMovie);
                setIsSpinning(false);
                setShowResult(true);
            }, 2000);

        }, 2000);
    };

    const resetWheel = () => {
        setIsSpinning(false);
        setSelectedMovie(null);
        setDisplayMovies([]);
        setCurrentIndex(0);
        setShowResult(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto text-center space-y-8">

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                        What Should I Watch Today?
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Can't decide what to watch? Let fate choose for you from over 100 amazing movies!
                    </p>
                </div>

                {/* Movie Display Area */}
                <div className="relative h-96 flex items-center justify-center">
                    {!isSpinning && !showResult && (
                        <div className="text-center space-y-6">
                            <div className="w-48 h-72 mx-auto bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center">
                                <div className="text-slate-500">
                                    <Play size={48} className="mx-auto mb-4" />
                                    <p className="text-lg">Press the button<br />to discover your movie!</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isSpinning && displayMovies.length > 0 && (
                        <div className="relative">
                            <Card className={`w-48 h-72 bg-slate-800 border-slate-600 overflow-hidden transform transition-all duration-200 ${
                                isSpinning ? 'scale-105 rotate-1' : ''
                            }`}>
                                <div className="relative h-full">
                                    <img
                                        src={displayMovies[currentIndex]?.poster}
                                        alt={displayMovies[currentIndex]?.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1489599859333-5c0b6055e282?w=300&h=450&fit=crop";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white text-sm font-semibold mb-1 truncate">
                                            {displayMovies[currentIndex]?.title}
                                        </h3>
                                        <p className="text-slate-300 text-xs">
                                            {displayMovies[currentIndex]?.year} • {displayMovies[currentIndex]?.genre}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Spinning indicator */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
                            </div>
                        </div>
                    )}

                    {showResult && selectedMovie && (
                        <div className="text-center space-y-6 animate-in fade-in duration-500">
                            <div className="mb-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
                                    Today's Lucky Pick!
                                </h2>
                                <div className="flex justify-center items-center gap-2 text-slate-300">
                                    <Sparkles size={20} className="text-orange-400" />
                                    <span>Your movie destiny awaits</span>
                                    <Sparkles size={20} className="text-orange-400" />
                                </div>
                            </div>

                            <Card className="w-64 h-80 mx-auto bg-slate-800 border-2 border-orange-400 overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-orange-400/20">
                                <div className="relative h-full">
                                    <img
                                        src={selectedMovie.poster}
                                        alt={selectedMovie.title}
                                        className="w-full h-56 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1489599859333-5c0b6055e282?w=300&h=450&fit=crop";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-white text-xl font-bold mb-2 leading-tight">
                                            {selectedMovie.title}
                                        </h3>
                                        <div className="flex justify-between items-center text-slate-300">
                                            <span className="text-sm">{selectedMovie.year}</span>
                                            <span className="text-sm bg-orange-400/20 px-2 py-1 rounded text-orange-300">
                        {selectedMovie.genre}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <p className="text-slate-400 text-lg">
                                Perfect choice for today! Enjoy your movie night.
                            </p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <Button
                        onClick={handleSpin}
                        disabled={isSpinning}
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSpinning ? (
                            <>
                                <Shuffle className="w-6 h-6 mr-2 animate-spin" />
                                Choosing...
                            </>
                        ) : (
                            <>
                                <Shuffle className="w-6 h-6 mr-2" />
                                What Should I Watch Today?
                            </>
                        )}
                    </Button>

                    {showResult && (
                        <Button
                            onClick={resetWheel}
                            variant="outline"
                            size="lg"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-4 text-lg rounded-xl transition-all duration-300"
                        >
                            Try Again
                        </Button>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-slate-500 text-sm">
                    <p>Featuring over 100 carefully curated movies from different genres and eras</p>
                </div>

            </div>
        </div>
    );
};

export default MovieWheel;
