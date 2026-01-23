<script type="text/babel">
    const { useState, useEffect, useRef } = React;

    function App() {
        const [view, setView] = useState('landing'); 
        const [page, setPage] = useState('home');
        const [displayedText, setDisplayedText] = useState('');
        const [isFinished, setIsFinished] = useState(false);
        
        const fullText = "Initialisation des protocoles... Authentification réussie. Accès aux serveurs d'Enzo Ebendinger accordé.";
        const index = useRef(0);
        const audioCtx = useRef(null);

        // Initialisation de l'AudioContext au premier clic ou interaction
        const initAudio = () => {
            if (!audioCtx.current) {
                audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
            }
        };

        // Fonction pour générer le bruit de touche de clavier
        const playKeySound = () => {
            if (!audioCtx.current) return;
            const osc = audioCtx.current.createOscillator();
            const gain = audioCtx.current.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(150 + Math.random() * 50, audioCtx.current.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.current.destination);
            osc.start();
            osc.stop(audioCtx.current.currentTime + 0.05);
        };

        // Fonction pour le bruit d'alerte (style GTA/Hack)
        const playAlertSound = () => {
            if (!audioCtx.current) return;
            const now = audioCtx.current.currentTime;
            [0, 0.2, 0.4].forEach(t => {
                const osc = audioCtx.current.createOscillator();
                const gain = audioCtx.current.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(880, now + t);
                osc.frequency.exponentialRampToValueAtTime(440, now + t + 0.1);
                gain.gain.setValueAtTime(0.1, now + t);
                gain.gain.linearRampToValueAtTime(0, now + t + 0.1);
                osc.connect(gain);
                gain.connect(audioCtx.current.destination);
                osc.start(now + t);
                osc.stop(now + t + 0.1);
            });
        };

        useEffect(() => {
            if (view === 'landing') {
                const timer = setInterval(() => {
                    if (index.current < fullText.length) {
                        setDisplayedText((prev) => prev + fullText.charAt(index.current));
                        playKeySound(); // Joue le son de touche
                        index.current++;
                    } else {
                        clearInterval(timer);
                        setIsFinished(true);
                        playAlertSound(); // Joue l'alerte à la fin
                    }
                }, 35);
                return () => clearInterval(timer);
            }
        }, [view]);

        // Le reste de ton code (Return, StatBox, etc.) reste identique
        // Ajoute juste initAudio() au onClick du bouton d'entrée pour "débloquer" le son du navigateur