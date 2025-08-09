import HeroSection from "@/components/HeroSection";
import { 
    NotebookPen, 
    Plus,
    Book,
    Trash2,
} from "lucide-react";
import { 
    Link, 
    useNavigate 
} from "react-router";
import { useEffect, useState, } from "react";
import { 
    Card,
    CardHeader, 
    CardFooter, 
    CardTitle, 
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [collections, setCollections] = useState(JSON.parse(localStorage.getItem("collections") ?? "[]"));

    return (
        <>
            <HeroSection
                title="Welcome to FlashCards"
                paragraph="Create and study flashcards with ease."
            />
            {collections.length === 0 && 
                <>
                    <section className="flex flex-col items-center mt-10">
                        <NotebookPen className="h-28 w-28" />
                        <h3 className="text-center text-3xl mt-4">No Collection created</h3>
                        <p className="text-center text-xl mt-4">Start by creating your first collection</p>
                        <Link to="/create" className="mt-4">
                            <Button variant={"default"} size={"lg"} className="p-6">
                                <Plus className="mr-1 h-4 w-4" />
                                <span className="text-lg">Create my first collection</span>
                            </Button>
                        </Link>
                    </section>
                </>
            }
            {collections.length > 0 && 
                <>
                    <div className="flex justify-between items-center my-5">
                        <h3>{collections.length} collection{collections.length > 1 && "s"}</h3>
                        <Link to="/create">
                            <Button variant={"default"} size={"lg"}>
                                <Plus className="mr-1 h-4 w-4" />
                                <span>New collection</span>
                            </Button>
                        </Link>
                    </div>
                    <CollectionShower 
                        collections={collections} 
                        setCollections={setCollections} 
                    />
                </>
            }
        </>
    );
}

function Collection({ collection, setCollections } : any) {
    const [cardHovered, setCardHovered] = useState(false);
    const creationDate = new Date(collection.creationDate);
    const navigate = useNavigate();

    function handleDeleteCollection() {
        const confirmation = confirm(`Are you sure you want to delete collection ${collection.name}? This action cannot be undone.`);
        if (!confirmation) return;

        const existingCollections = JSON.parse(localStorage.getItem("collections") ?? "[]");
        const updatedCollections = existingCollections.filter((c: any) => c.creationDate !== collection.creationDate);

        localStorage.setItem("collections", JSON.stringify(updatedCollections));
        setCollections(updatedCollections);
    }

    useEffect(() => {
        console.log(collection);
    }, [])

    function handleNavigation(collectionID : string) {
        navigate(`/study/${collectionID}`);
    }

    return (
        <Card 
            onClick={() => handleNavigation(collection.id)}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
             className="relative my-2 hover:cursor-pointer hover:shadow-lg hover:border-black dark:hover:border-white transform duration-300"
        >
            <Button 
                className={`absolute top-2 right-2 rounded-full text-white bg-red-500 hover:cursor-pointer hover:bg-red-800 transform duration-300 ${cardHovered ? "opacity-100" : "opacity-0"}`}
                size={"sm"} 
                onClick={handleDeleteCollection}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <CardHeader className="p-3">
                <CardTitle className="flex gap-2">
                    <Book className="mr-1 h-4 w-4" />
                    <span>{collection.name}</span> 
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{collection.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                    <span>{collection.flashCards.length} flashcard{collection.flashCards.length > 1 && "s"}</span>
                    {collection.successRate > 0 && <span className="text-green-500">Success rate: {collection.successRate}%</span>}
                </div>
                <span>{creationDate.getDay() + "/" + creationDate.getMonth() + "/" + creationDate.getFullYear()}</span>
            </CardFooter>
        </Card>
    )
}

function CollectionShower({ collections, setCollections } : any) {
    return (
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {collections.map((collection: any) => (
                <Collection 
                    key={collection.creationDate} 
                    collection={collection} 
                    setCollections={setCollections} 
                />
            ))}
        </section>
    );
}