import HeroSection from "@/components/HeroSection";
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    CardTitle, 
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
    FileText, 
    Text, 
    WandSparkles,
    Book,
    Sparkles,
    Zap,
    ArrowLeft
} from "lucide-react";
import { 
    useState, 
    useRef, 
    useEffect 
} from "react";
import { useNavigate } from "react-router";

type Difficulty = 1 | 2 | 3;

export default function Create() {
    const [charactersCount, setCharactersCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [textIsEmpty, setTextIsEmpty] = useState(true);
    const [pageState, setPageState] = useState<"input" | "results">("input");
    const [flashCards, setFlashCards] = useState<Array<{question: string, answer: string, difficulty: Difficulty}>>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTextIsEmpty(textareaRef.current?.value.trim().length === 0);
    }, [charactersCount]);

    const handleFlashcardsRequest = () => {
        setIsLoading(true);
        if(textIsEmpty) {
            alert("Please enter some text.");
            setIsLoading(false);
            return;
        }

        getFlashCards(textareaRef.current?.value || "")
            .then((flashcards) => {
                setIsLoading(false);
                setTextIsEmpty(true);
                setPageState("results");
                setFlashCards(flashcards);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const handleTextareaChange = (event: any) => {
        const text = event.target.value;
        setCharactersCount(text.length);
        setTextIsEmpty(text.trim().length === 0);
    }

    return (
        <div className="min-h-screen relative">
            <HeroSection
                title="Create a new collection"
                paragraph="Transform your text into intelligent flashcards powered by AI."
            />
            
            <div className="container mx-auto px-4 pb-16">
                {pageState === "input" && 
                    <>
                        {/* Main input section */}
                        <section className="max-w-4xl mx-auto mb-12 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.2s_forwards]">
                            <Card className="shadow-2xl border-2 border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl">
                                        <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-xl text-white">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                            Your Content
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea 
                                        ref={textareaRef}
                                        className="w-full min-h-[300px] text-base leading-relaxed border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-400 dark:focus:border-purple-600 transition-colors duration-300 resize-none"
                                        name="text-source"
                                        id="text-source" 
                                        placeholder="Enter your notes, study material, or any text you want to transform into flashcards. The AI will analyze your content and create intelligent questions and answers..."
                                        onChange={handleTextareaChange}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium">{charactersCount} characters</span>
                                    </div>
                                    <Button 
                                        onClick={handleFlashcardsRequest}
                                        className="px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        variant="default" 
                                        size="lg"
                                        disabled={isLoading || textIsEmpty}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-3">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                <Sparkles className="h-5 w-5 animate-pulse" />
                                                <span>Generating Magic...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <WandSparkles className="h-5 w-5" />
                                                <span>Generate Flashcards</span>
                                                <Zap className="h-4 w-4 opacity-70" />
                                            </div>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </section>

                        {/* Examples section */}
                        <section className="max-w-4xl mx-auto opacity-0 animate-[fade-in-up_0.6s_ease-out_0.4s_forwards]">
                            <Card className="shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-xl">
                                        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl text-white">
                                            <Text className="h-5 w-5" />
                                        </div>
                                        <span>Try These Examples</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <TextExample 
                                        title="🏛️ History - The Renaissance" 
                                        textareaRef={textareaRef}
                                        setCharactersCount={setCharactersCount}
                                    >
                                        The Renaissance is a period of European history that extends 
                                        from the 14th to the 16th century. It marks the transition between 
                                        the Middle Ages and the modern era. This period is characterized by 
                                        an artistic, cultural, and scientific revival.
                                        Leonardo da Vinci is one of the iconic figures of this era. 
                                        He was a painter, sculptor, architect, engineer, and scientist.
                                        Michelangelo was another genius of the Renaissance, famous for his 
                                        sculptures and the painting of the Sistine Chapel.
                                    </TextExample>
                                    <TextExample 
                                        title="🌌 Sciences - The Solar System" 
                                        textareaRef={textareaRef}
                                        setCharactersCount={setCharactersCount}
                                    >
                                        The solar system is made up of the Sun and celestial objects that orbit it.
                                        It consists of 8 main planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.
                                        Mercury is the closest planet to the Sun.
                                        Jupiter is the largest planet in the solar system.
                                        Earth is the only known planet to support life.
                                        Mars is nicknamed the red planet due to its characteristic color.
                                    </TextExample>
                                    <TextExample 
                                        title="🎨 Art - The Mona Lisa" 
                                        textareaRef={textareaRef}
                                        setCharactersCount={setCharactersCount}
                                    >
                                        The Mona Lisa is a portrait painted by Leonardo da Vinci in the early 16th century.
                                        It is one of the most famous paintings in the world and is widely considered to be one of the greatest paintings of all time.
                                        The subject of the painting is thought to be Lisa del Giocondo, the wife of a wealthy merchant named Francesco del Giocondo.
                                        The painting is known for its enigmatic smile and its incredible level of detail and realism.
                                    </TextExample>
                                </CardContent>
                            </Card>
                        </section>
                    </>
                }
                {pageState === "results" && 
                    <>
                        <FlashCardsPreviewer 
                            setPageState={setPageState} 
                            flashCards={flashCards} 
                        />
                    </>
                }
            </div>
        </div>
    );
}

function TextExample({ children, title, textareaRef, setCharactersCount }: any) {
    function writeTextToTextarea() {
        if (textareaRef.current) {
            textareaRef.current.value = children;
            setCharactersCount(children.length);
        }
    }

    return (
        <Card 
            onClick={writeTextToTextarea}
            className="cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 group"
        >
            <CardHeader>
                <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {children && children.slice(0, 200) + "..."}
                </p>
                <div className="mt-3 text-sm text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to use this example →
                </div>
            </CardContent>
        </Card>
    );
}

function FlashCardsPreviewer({ flashCards, setPageState } : { flashCards: Array<{ question: string, answer: string, difficulty: number }>, setPageState: Function }) {
    const navigate = useNavigate();
    const [collectionName, setCollectionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    

    function handleCollectionCreation() {
        const collection = {
            id: crypto.randomUUID(),
            name: collectionName,
            description: collectionDescription ?? "No description provided",
            creationDate: new Date().toISOString(),
            flashCards: flashCards,
            successRate: 0,
        };
        
        const existingCollections = JSON.parse(localStorage.getItem("collections") ?? "[]");
        localStorage.setItem("collections", JSON.stringify([...existingCollections, collection]));
        navigate("/");
    }	

    return (
        <section className="max-w-4xl mx-auto space-y-6">
            {/* Collection Info Card */}
            <Card className="shadow-2xl border-2 border-green-100 dark:border-green-900/50 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.1s_forwards]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl text-white">
                            <Book className="h-6 w-6" />
                        </div>
                        <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                            Collection Details
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <Label htmlFor="collection-name" className="text-base font-semibold flex items-center gap-2">
                            Collection Name
                            <span className="text-red-500 text-lg">*</span>
                        </Label>
                        <Input 
                            onChange={(e) => setCollectionName(e.target.value)}
                            id="collection-name" 
                            placeholder="e.g., Biology - Cell Structure"
                            className="h-12 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-400 dark:focus:border-green-600"
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="collection-description" className="text-base font-semibold">
                            Description (Optional)
                        </Label>
                        <Input 
                            onChange={(e) => setCollectionDescription(e.target.value)}
                            id="collection-description" 
                            placeholder="Brief description of your flashcards..."
                            className="h-12 text-base border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-400 dark:focus:border-green-600"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Preview Cards */}
            <Card className="shadow-xl opacity-0 animate-[fade-in-up_0.6s_ease-out_0.2s_forwards]">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg text-white">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="text-xl">
                                Generated Flashcards ({flashCards.length})
                            </span>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-purple-300">
                    {flashCards.map((flashCard: any, index: number) => (
                        <FlashCard 
                            key={index} 
                            question={flashCard.question}
                            answer={flashCard.answer}
                            difficulty={flashCard.difficulty}
                            index={index}
                        />
                    ))}
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.3s_forwards]">
                <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setPageState("input")}
                    className="w-full sm:w-auto px-8 py-3 text-base font-semibold border-2 hover:border-purple-300 dark:hover:border-purple-600"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Editor
                </Button>
                <Button
                    onClick={handleCollectionCreation}
                    disabled={!collectionName.trim()}
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center gap-2">
                        <Book className="h-5 w-5" />
                        <span>Create Collection</span>
                        <Sparkles className="h-4 w-4 opacity-70" />
                    </div>
                </Button>
            </div>
        </section>
    )
}

function FlashCard({ question, answer, difficulty, index }: any) {
    const getDifficultyColor = (diff: number) => {
        switch(diff) {
            case 1: return "from-green-500 to-emerald-600";
            case 2: return "from-orange-500 to-yellow-600";
            case 3: return "from-red-500 to-red-600";
            default: return "from-gray-500 to-gray-600";
        }
    };

    const getDifficultyLabel = (diff: number) => {
        switch(diff) {
            case 1: return "Easy";
            case 2: return "Medium";
            case 3: return "Hard";
            default: return "Unknown";
        }
    };

    return (
        <Card className={`transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg border-l-4 border-l-transparent hover:border-l-purple-400 stagger-fade-in opacity-0`}
              style={{animationDelay: `${index * 0.1}s`}}>
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Flashcard #{index + 1}
                        </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${getDifficultyColor(difficulty)}`}>
                        {getDifficultyLabel(difficulty)}
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-xl">
                        <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Question:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{question}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl">
                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Answer:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{answer}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

async function getFlashCards(text: string) {
  const res = await fetch("https://promotions-worth-minimal-serving.trycloudflare.com/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return await res.json();
}