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
        return (
            <>
                <CollectionNotFound />
            </>
        )
    }

    const flashCards = collection.flashCards;
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [rightQuestions, setRightQuestions] = useState(0);
    const [pageState, setPageState] = useState<PageState>("flashCards");
	const flashCard = flashCards[currentCardIndex];

    function updateSuccessRateAndGoToResults() {
        collection.successRate = (rightQuestions / flashCards.length) * 100;
        localStorage.setItem("collections", JSON.stringify(collections));
        setPageState("results");
    }
    
	function onSuccess() {
		setRightQuestions(rightQuestions + 1);
		setCurrentCardIndex(currentCardIndex + 1);
        if(currentCardIndex === flashCards.length - 1) {
            updateSuccessRateAndGoToResults();
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

    return (
        <>
            {pageState === "flashCards" && (
                <>
                    <StudyHeader collectionName={"Collection name"} />
                    <ProgressWrapper cardsDone={currentCardIndex + 1} totalCards={flashCards.length} />
                    <FlashCard 
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        flashCard={flashCard} 
                    />
                </>            
            )}
            {pageState === "results" && (
                <>
                    <div className="flex flex-col justify-center items-center">
                        <div className="p-10 bg-yellow-500 rounded-full">
                            <Trophy className="h-20 w-20" />
                        </div>
                        <h3 className="text-2xl my-5">Session completed!</h3>
                        <Card className="my-5">
                            <CardContent>
                                <p className="my-3 text-center">{rightQuestions} out of {flashCards.length} questions were answered correctly</p>
                                <p className="my-3 text-center">{Math.round((rightQuestions / flashCards.length) * 100)}% of the questions were answered correctly</p>
                            </CardContent>
                        </Card>
                        <Button
                            className="my-5"
                            variant={"default"}
                            size={"lg"}
                            onClick={handleRestart}
                        >
                            <span>Restart</span>
                        </Button>
                        <Link to="/">
                            <Button
                                variant={"secondary"}
                                size={"lg"}
                                onClick={() => setPageState("flashCards")}
                            >
                                <span>Return to collections</span>
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}

function StudyHeader({ collectionName } : { collectionName : string}) {
    return (
        <div className="flex justify-around my-5">
            <Link to="/">
                <Button variant={"outline"} size={"lg"}>
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Return</span>
                </Button>
            </Link>
            <h2 className="text-lg font-semibold">{collectionName}</h2>
            <div>
                <Tooltip>
                    <TooltipTrigger>
                        <Button variant={"outline"} size={"lg"}>
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Restart</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}

function ProgressWrapper({ cardsDone, totalCards } : { cardsDone : number, totalCards : number }) {
    const progress = Math.round((cardsDone / totalCards) * 100);

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <p>Card {cardsDone} of {totalCards}</p>
            <Progress value={progress} />
        </div>
    )
}

function CollectionNotFound() {
    return (
        <div className="flex flex-col justify-center items-center my-8">
            <h1 className="text-center text-2xl my-5">Collection not found</h1>
            <p className="text-center text-lg my-5">You may have entered the wrong URL</p>
            <Link to="/">
                <Button variant={"default"} size={"lg"}>
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    <span>Return to home page</span>
                </Button>
            </Link>
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

    return (
        <div className="perspective">
            <div className={`flip-card ${flipped ? "flipped" : ""}`}>
                {/* FRONT */}
                <Card className="flip-card-front my-5">
                    <CardHeader>
                        {flashCard.difficulty === 1 && <Badge variant={"success"}>Easy</Badge>}
                        {flashCard.difficulty === 2 && <Badge variant={"warning"}>Medium</Badge>}
                        {flashCard.difficulty === 3 && <Badge variant={"destructive"}>Hard</Badge>}
                    </CardHeader>
                    <CardContent className="py-5 px-2">
                        <h2 className="text-xl text-center">Question:</h2>
                        <h2 className="text-xl text-center my-3">{flashCard.question}</h2>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleShowingAnswer}
                            size={"lg"}
                            variant={"default"}
                            className="mx-auto flex"
                        >
                            <Eye className="mr-1 h-4 w-4" />
                            <span>Reveal answer</span>
                        </Button>
                    </CardFooter>
                </Card>

                {/* BACK */}
                <Card className="flip-card-back my-5">
                    <CardContent className="py-5 px-2">
                        <h2 className="text-xl text-center">Answer:</h2>
                        <h2 className="text-xl text-center my-3">{flashCard.answer}</h2>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="flex gap-5">
                            <Button
                                className="flex"
                                onClick={onSuccess}
                                size={"lg"}
                                variant={"success"}
                            >
                                <Check className="mr-1 h-4 w-4" />
                                <span>Correct</span>
                            </Button>
                            <Button
                                className="flex"
                                onClick={onFailure}
                                size={"lg"}
                                variant={"destructive"}
                            >
                                <X className="mr-1 h-4 w-4" />
                                <span>Incorrect</span>
                            </Button>
                        </div>
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="mx-auto flex mt-4"
                            onClick={handleShowingAnswer}
                        >
                            <RotateCcw className="mr-1 h-4 w-4" />
                            <span>Rotate card</span>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
