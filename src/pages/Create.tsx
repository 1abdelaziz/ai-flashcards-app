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
	Book
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
    const [charactersCount, setCharactersCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [textIsEmpty, setTextIsEmpty] = useState(true);
	const [pageState, setPageState] = useState<"input" | "results">("input");
	const [flashCards, setFlashCards] = useState<Array<{question: string, answer: string}>>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Effects
    useEffect(() => {
        setTextIsEmpty(textareaRef.current?.value.trim().length === 0);
    }, [charactersCount]);

    // Handling Functions
    const handleFlashcardsRequest = () => {
        setIsLoading(true);
		if(textIsEmpty) {
			alert("Please enter some text.");
			return;
		}

		mockAPICall(textareaRef.current?.value || "")
			.then((flashcards) => {
				console.log(flashcards);
				setIsLoading(false);
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
        <>
            <HeroSection
                title="Create a new collection"
                paragraph="Transform your text into intelligent flashcards."
            />
			{pageState === "input" && 
				<>
					<section className="max-w-[1000px] mx-auto">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<FileText className="mr-1 h-4 w-4" />
									<span>Card Title</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Textarea 
									ref={textareaRef}
									className="w-full"
									rows={10}
									name="text-source"
									id="text-source" 
									placeholder="Enter notes, questions, or any text you want to transform into flashcards..."
									onChange={handleTextareaChange}
								>
								</Textarea>
							</CardContent>
							<CardFooter className="flex justify-between">
								<span>{charactersCount} characters</span>
								<Button 
									onClick={handleFlashcardsRequest}
									className="hover:cursor-pointer"
									variant={"default"} 
									size={"lg"}
									disabled={isLoading || textIsEmpty}
								>
									{isLoading ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-900"></div>
											<span>Generating</span>
										</>
									) : (
										<>
											<WandSparkles className="mr-1 h-4 w-4" />
											<span>Generate flashcards</span>
										</>
									)}
								</Button>
							</CardFooter>
						</Card>
					</section>
					<section className="max-w-[1000px] mx-auto mt-10">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<Text className="mr-1 h-4 w-4" />
									<span>Card Title</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<TextExample 
									title="History - The Renaissance" 
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
									title="Sciences - The Solar System" 
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
									title="Art - The Mona Lisa" 
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
        </>
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
            className="my-3 hover:opacity-70 hover:cursor-pointer"
        >
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{children && children.slice(0, 300) + "..."}</p>
            </CardContent>
        </Card>
    );
}

function FlashCardsPreviewer({ flashCards, setPageState }: { flashCards: Array<{ question: string, answer: string }>, setPageState: any }) {
	const [collectionName, setCollectionName] = useState("");

	return (
		<section className="container max-w-[1000px] mx-auto">
			<Card className="my-3">
				<CardHeader>
					<CardTitle className="flex gap-2">
						<Book className="mr-1 h-4 w-4" />
						<span>Collection information</span> 
					</CardTitle>
				</CardHeader>
				<CardContent className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
					<div className="flex flex-col gap-2">
						<Label htmlFor="collection-name" className="after:content-['*'] after:text-red-500">Collection name</Label>
						<Input 
							onChange={(e) => setCollectionName(e.target.value)}
							id="collection-name" 
							placeholder="ex: Sciences - The Solar System" 
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="collection-description">Collection description</Label>
						<Input 
							id="collection-description" 
							placeholder="ex: The solar system is made up of the Sun and celestial objects that orbit it." 
							required
						/>
					</div>
				</CardContent>
			</Card>
			<Card className="my-3">
				<CardHeader>
					<CardTitle>
						<span>FlashCards preview ({flashCards.length} card{flashCards.length > 1 ? "s" : ""})</span>
					</CardTitle>
					<CardContent className="max-h-96 overflow-y-auto">
						{flashCards.map((flashCard: any, index: number) => (
							<FlashCard 
								key={index} 
								question={flashCard.question}
								answer={flashCard.answer} 
							/>
						))}
					</CardContent>
				</CardHeader>
			</Card>
						<div className="flex justify-between max-w-[1000px] mx-auto my-5">
				<Button 
					variant={"outline"} 
					size={"lg"} 
					onClick={() => setPageState("input")}
				>
					Return to text
				</Button>
				<Button
					disabled={!collectionName.trim()}
					variant={"default"}
					size={"lg"}
				>
					Create the collection
				</Button>
			</div>
		</section>
	)
}

function FlashCard({ question, answer }: any) {
	return (
		<Card className="my-2">
			<CardContent>
				<h4 className="text-xl">Question:</h4>
				<p>{question}</p>
				<h4 className="text-xl">Answer:</h4>
				<p>{answer}</p>
			</CardContent>
		</Card>
	);
}

function mockAPICall(text: string) : Promise<Array<{ question: string, answer: string }>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                	question: "Who was Leonardo da Vinci?",
                    answer: "An iconic figure of the Renaissance, a polymath.",
                },  
                {
                    question: "What is the Mona Lisa?",
                    answer: "A famous painting by Leonardo da Vinci.",
                },
                {
                    question: "When was the Mona Lisa painted?",
                    answer: "In the early 16th century.",
                },
                {
                    question: "Who is the subject of the Mona Lisa?",
                    answer: "Lisa del Giocondo, the wife of a wealthy merchant named Francesco del Giocondo.",
                },
                {
                    question: "What is the Mona Lisa known for?",
                    answer: "Its enigmatic smile and its incredible level of detail and realism.",
                },
            ]);
        }, 1000);
    });
}	