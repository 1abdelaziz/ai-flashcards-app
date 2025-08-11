import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowLeft, 
    RotateCcw,
    Eye,
    Check,
    X,
    Trophy,
    Star,
    Target,
    Zap,
    Home
} from "lucide-react";
import { Link } from "react-router";
import { 
	useState, 
	useEffect 
} from "react";

interface FlashCardProps {
  flashCard: { question: string; answer: string; difficulty: number };
  onSuccess: React.MouseEventHandler<HTMLButtonElement>;
  onFailure: React.MouseEventHandler<HTMLButtonElement>;
}

type PageState = "flashCards" | "results";

export default function Study() {
    const { collectionId } = useParams();
    const collections = JSON.parse(localStorage.getItem("collections") ?? "[]");
    const collection = collections.find((c: any) => c.id === collectionId);
    
    if(!collectionId || !collection?.flashCards.length) {
        return <CollectionNotFound />
    }

    const flashCards = collection.flashCards;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [rightQuestions, setRightQuestions] = useState(0);
    const [pageState, setPageState] = useState<PageState>("flashCards");
	const flashCard = flashCards[currentCardIndex];

    function updateSuccessRateAndGoToResults(finalRightQuestions = rightQuestions) {
        const newSuccessRate = Math.round((finalRightQuestions / flashCards.length) * 100);
        const updatedCollections = collections.map((c: any) =>
            c.id === collectionId ? { ...c, successRate: newSuccessRate } : c
        );
        localStorage.setItem("collections", JSON.stringify(updatedCollections));
        setPageState("results");
    }

    
	function onSuccess() {
        const newRightQuestions = rightQuestions + 1;
		setRightQuestions(newRightQuestions);
		setCurrentCardIndex(currentCardIndex + 1);
        if(currentCardIndex === flashCards.length - 1) {
            updateSuccessRateAndGoToResults(newRightQuestions);
        }
	}

	function onFailure() {
		setCurrentCardIndex(currentCardIndex + 1);
        if(currentCardIndex === flashCards.length - 1) {
            updateSuccessRateAndGoToResults();
        }
    }

    function handleRestart() {
        setCurrentCardIndex(0);
        setRightQuestions(0);
        setPageState("flashCards");
    }

    const successRate = Math.round((rightQuestions / flashCards.length) * 100);

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
            <div className="particles"></div>
            
            {pageState === "flashCards" && (
                <div className="relative z-10">
                    <StudyHeader collectionName={collection.name} onRestart={handleRestart} />
                    <ProgressWrapper 
                        cardsDone={currentCardIndex} 
                        totalCards={flashCards.length}
                        rightAnswers={rightQuestions}
                    />
                    <div className="container max-w-2xl mx-auto px-4 mt-8">
                        <FlashCard 
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            flashCard={flashCard} 
                        />
                    </div>
                </div>            
            )}
            
            {pageState === "results" && (
                <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4">
                    <div className="max-w-lg w-full text-center space-y-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.2s_forwards]">
                        {/* Trophy Animation */}
                        <div className="relative mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30 scale-150 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-full shadow-2xl celebrate">
                                <Trophy className="h-16 w-16 text-white mx-auto" />
                            </div>
                            {/* Floating particles */}
                            <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                            <div className="absolute -top-2 -right-6 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                            <div className="absolute -bottom-3 -left-6 w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                            <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                Session Complete! 🎉
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Great job on completing your study session
                            </p>
                        </div>

                        {/* Stats Card */}
                        <Card className="shadow-2xl border-2 border-purple-100 dark:border-purple-900/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-2">
                                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                                            <Check className="h-6 w-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{rightQuestions}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Correct</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                                            <X className="h-6 w-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{flashCards.length - rightQuestions}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Wrong</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                                            <Target className="h-6 w-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{successRate}%</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Success</p>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                        <span>Overall Performance</span>
                                        <span>{successRate}%</span>
                                    </div>
                                    <Progress value={successRate} className="h-2" />
                                </div>

                                {/* Performance message */}
                                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30">
                                    {successRate >= 90 && (
                                        <p className="text-purple-700 dark:text-purple-300 font-semibold flex items-center justify-center gap-2">
                                            <Star className="h-5 w-5 fill-current" />
                                            Outstanding! You're a master! 🌟
                                        </p>
                                    )}
                                    {successRate >= 70 && successRate < 90 && (
                                        <p className="text-blue-700 dark:text-blue-300 font-semibold">
                                            Great job! Well done! 👏
                                        </p>
                                    )}
                                    {successRate >= 50 && successRate < 70 && (
                                        <p className="text-orange-700 dark:text-orange-300 font-semibold">
                                            Good effort! Keep practicing! 💪
                                        </p>
                                    )}
                                    {successRate < 50 && (
                                        <p className="text-red-700 dark:text-red-300 font-semibold">
                                            Don't give up! Practice makes perfect! 🎯
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleRestart}
                                className="px-8 py-3 text-base font-semibold border-2 hover:border-purple-300 dark:hover:border-purple-600"
                            >
                                <RotateCcw className="mr-2 h-5 w-5" />
                                Study Again
                            </Button>
                            <Link to="/">
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="px-8 py-3 text-base font-bold w-full sm:w-auto"
                                >
                                    <Home className="mr-2 h-5 w-5" />
                                    Back to Collections
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function StudyHeader({ collectionName, onRestart } : { collectionName: string, onRestart: () => void }) {
    return (
        <div className="sticky top-0 z-20 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <Link to="/">
                        <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-300">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            <span>Back</span>
                        </Button>
                    </Link>
                    
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{collectionName}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Study Session</p>
                    </div>
                    
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                onClick={onRestart}
                                className="hover:scale-105 transition-transform duration-300"
                            >
                                <RotateCcw className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Restart Session</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

function ProgressWrapper({ cardsDone, totalCards, rightAnswers } : { cardsDone: number, totalCards: number, rightAnswers: number }) {
    const progress = Math.round((cardsDone / totalCards) * 100);
    const accuracy = cardsDone > 0 ? Math.round((rightAnswers / cardsDone) * 100) : 0;

    return (
        <div className="container max-w-2xl mx-auto px-4 mt-6">
            <Card className="shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Card {cardsDone + 1} of {totalCards}
                            </p>
                            {cardsDone > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Zap className="h-4 w-4 text-purple-500" />
                                    <span className="font-medium text-purple-600 dark:text-purple-400">
                                        {accuracy}% accuracy
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress 
                                value={progress} 
                                className="h-3 bg-gray-200 dark:bg-gray-700" 
                            />
                        </div>

                        {cardsDone > 0 && (
                            <div className="flex justify-center gap-6 pt-2">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                    <Check className="h-4 w-4" />
                                    <span className="text-sm font-medium">{rightAnswers} correct</span>
                                </div>
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                    <X className="h-4 w-4" />
                                    <span className="text-sm font-medium">{cardsDone - rightAnswers} wrong</span>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function CollectionNotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-red-900/20 dark:to-pink-900/20">
            <div className="max-w-md w-full text-center space-y-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.2s_forwards]">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-full blur-3xl opacity-20 scale-150"></div>
                    <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-full shadow-2xl">
                        <X className="h-16 w-16 text-white mx-auto" />
                    </div>
                </div>
                
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Collection Not Found
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        The collection you're looking for doesn't exist or may have been deleted.
                    </p>
                </div>
                
                <Link to="/">
                    <Button variant="default" size="lg" className="px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl">
                        <Home className="mr-2 h-5 w-5" />
                        <span>Back to Home</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}  

function FlashCard({ flashCard, onSuccess, onFailure }: FlashCardProps) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        setFlipped(false);
    }, [flashCard]);

    const handleShowingAnswer = () => {
        setFlipped((prev) => !prev);
    };

    const getDifficultyColor = (diff: number) => {
        switch (diff) {
            case 1: return "success";
            case 2: return "warning";
            case 3: return "destructive";
            default: return "secondary";
        }
    };

    const getDifficultyLabel = (diff: number) => {
        switch (diff) {
            case 1: return "Easy";
            case 2: return "Medium";
            case 3: return "Hard";
            default: return "Unknown";
        }
    };

    return (
        <div className="perspective my-5">
            <div className={`flip-card ${flipped ? "flipped" : ""}`}>
                
                {/* FRONT */}
                <Card className="flip-card-front min-h-[500px] shadow-2xl border-2 border-purple-100 dark:border-purple-900/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                            <Badge variant={getDifficultyColor(flashCard.difficulty)} className="text-sm px-4 py-2">
                                {getDifficultyLabel(flashCard.difficulty)}
                            </Badge>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🤔</span>
                        </div>
                    </CardHeader>

                    <CardContent className="px-8 py-6 text-center flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Question
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {flashCard.question}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-6 flex justify-center">
                        <Button
                            onClick={handleShowingAnswer}
                            size="lg"
                            variant="default"
                            className="px-8 py-3 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Eye className="mr-2 h-5 w-5" />
                            Reveal Answer
                        </Button>
                    </CardFooter>
                </Card>

                {/* BACK */}
                <Card className="flip-card-back min-h-[500px] shadow-2xl border-2 border-green-100 dark:border-green-900/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl">💡</span>
                        </div>
                    </CardHeader>

                    <CardContent className="px-8 py-6 text-center flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                            Answer
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {flashCard.answer}
                        </p>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 pt-6">
                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={onSuccess}
                                size="lg"
                                variant="success"
                                className="flex-1 max-w-36 py-3 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <Check className="mr-2 h-5 w-5" />
                                Correct
                            </Button>
                            <Button
                                onClick={onFailure}
                                size="lg"
                                variant="destructive"
                                className="flex-1 max-w-36 py-3 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <X className="mr-2 h-5 w-5" />
                                Wrong
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShowingAnswer}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Flip Back
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

