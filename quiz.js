const POKEMON_DATA = [
    { id: 448, name: '루카리오', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png' },
    { id: 34, name: '니드킹', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png' },
    { id: 25, name: '피카츄', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
    { id: 6, name: '리자몽', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { id: 143, name: '잠만보', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png' },
    { id: 133, name: '이브이', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
    { id: 94, name: '팬텀', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    { id: 150, name: '뮤츠', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' },
    { id: 393, name: '팽도리', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png' },
    { id: 1, name: '이상해씨', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' }
];

function App() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [phase, setPhase] = React.useState('input'); // 'input', 'result', 'end'
    const [inputValue, setInputValue] = React.useState('');
    const [isCorrect, setIsCorrect] = React.useState(false);
    const [score, setScore] = React.useState(0);

    const currentPokemon = POKEMON_DATA[currentIndex];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const checkCorrect = inputValue.replace(/\s/g, '') === currentPokemon.name;
        setIsCorrect(checkCorrect);
        
        if (checkCorrect) setScore(prev => prev + 1);
        setPhase('result');
    };

    const handleNext = () => {
        if (currentIndex + 1 < POKEMON_DATA.length) {
            setCurrentIndex(prev => prev + 1);
            setPhase('input');
            setInputValue('');
        } else {
            setPhase('end');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 relative h-full">
            <button 
                onClick={() => window.location.href = 'index.html'} 
                className="absolute top-8 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white flex items-center justify-center transition-colors"
                title="메인으로 돌아가기"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {phase !== 'end' && (
                <div className="absolute top-8 text-white/50 font-medium tracking-widest text-sm">
                    문제 {currentIndex + 1} / 10
                </div>
            )}

            {phase === 'end' ? (
                <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/20">
                    <h2 className="text-4xl font-bold text-white mb-4">퀴즈 완료!</h2>
                    <p className="text-2xl text-white mb-8">
                        10문제 중 <span className="text-yellow-400 font-bold">{score}</span>문제를 맞췄습니다!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => window.location.href = 'index.html'}
                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            메인 화면으로
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-[#8640f1] hover:bg-[#7435d6] text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            다시하기
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full">
                    <div className="w-64 h-64 md:w-80 md:h-80 mb-12 flex justify-center items-center">
                        <img 
                            src={currentPokemon.img} 
                            alt="포켓몬" 
                            className="pokemon-img w-full h-full object-contain"
                            draggable="false"
                        />
                    </div>

                    {phase === 'input' && (
                        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-center w-full max-w-md gap-3">
                            <input 
                                type="text" 
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="이름을 입력하세요"
                                className="w-64 h-12 px-4 rounded-sm border-none outline-none text-gray-800 font-bold text-lg shadow-lg focus:ring-4 focus:ring-white/30 transition-all"
                            />
                            <button 
                                type="submit" 
                                className="w-12 h-12 bg-[#8640f1] hover:bg-[#7435d6] flex items-center justify-center rounded-sm text-white shadow-lg transition-colors"
                            >
                                <i className="fa-solid fa-chevron-right text-lg"></i>
                            </button>
                        </form>
                    )}

                    {phase === 'result' && (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center gap-2 font-bold text-lg">
                                {isCorrect ? (
                                    <>
                                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-o text-white text-[10px]"></i>
                                        </div>
                                        <span className="text-white tracking-wider">정답!</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-xmark text-white text-xs"></i>
                                        </div>
                                        <span className="text-white tracking-wider">오답!</span>
                                    </>
                                )}
                            </div>
                            
                            <h1 className="text-4xl text-white font-extrabold tracking-widest drop-shadow-md">
                                {currentPokemon.name}
                            </h1>

                            <div className="pt-2">
                                <button 
                                    onClick={handleNext} 
                                    autoFocus
                                    className="w-12 h-12 bg-[#8640f1] hover:bg-[#7435d6] flex items-center justify-center rounded-sm text-white shadow-lg transition-colors"
                                >
                                    <i className="fa-solid fa-chevron-right text-lg"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
