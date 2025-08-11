import HeroSection from "@/components/HeroSection";
import { 
    NotebookPen, 
    Plus,
    Book,
    Trash2,
    Calendar,
    Target
} from "lucide-react";
import { 
    Link, 
    useNavigate 
} from "react-router";
import { useState, } from "react";
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
        <div className="min-h-screen relative">
            <HeroSection
                title="Welcome to FlashCards"
                paragraph="Create and study flashcards with ease using AI-powered learning."
            />
            
            <div className="container mx-auto px-4 pb-16">
                {collections.length === 0 && 
                    <>
                        <section className="flex flex-col items-center mt-16 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.3s_forwards]">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-20 scale-150"></div>
                                <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 p-8 rounded-full">
                                    <NotebookPen className="h-24 w-24 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            
                            <h3 className="text-center text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                No Collections Yet
                            </h3>
                            <p className="text-center text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed">
                                Transform your learning journey by creating your first collection of AI-powered flashcards
                            </p>
                            
                            <Link to="/create" className="group">
                                <Button variant="default" size="lg" className="text-lg px-8 py-4 h-auto shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                                            <Plus className="h-5 w-5" />
                                        </div>
                                        <span>Create my first collection</span>
                                    </div>
                                </Button>
                            </Link>
                        </section>
                    </>
                }
                
                {collections.length > 0 && 
                    <>
                        <div className="flex justify-between items-center my-12 opacity-0 animate-[fade-in-up_0.6s_ease-out_0.2s_forwards]">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    Your Collections
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    {collections.length} collection{collections.length > 1 ? "s" : ""} ready for study
                                </p>
                            </div>
                            <Link to="/create">
                                <Button variant="default" size="lg" className="shadow-lg hover:shadow-xl">
                                    <Plus className="mr-2 h-5 w-5" />
                                    <span>New Collection</span>
                                </Button>
                            </Link>
                        </div>
                        <CollectionShower 
                            collections={collections} 
                            setCollections={setCollections} 
                        />
                    </>
                }
            </div>
        </div>
    );
}

function Collection({ collection, setCollections, index } : any) {
    const [cardHovered, setCardHovered] = useState(false);
    const creationDate = new Date(collection.creationDate);
    const navigate = useNavigate();

    function handleDeleteCollection(e: React.MouseEvent) {
        e.stopPropagation();
        const confirmation = confirm(`Are you sure you want to delete collection ${collection.name}? This action cannot be undone.`);
        if (!confirmation) return;

        const existingCollections = JSON.parse(localStorage.getItem("collections") ?? "[]");
        const updatedCollections = existingCollections.filter((c: any) => c.creationDate !== collection.creationDate);

        localStorage.setItem("collections", JSON.stringify(updatedCollections));
        setCollections(updatedCollections);
    }

    function handleNavigation(collectionID : string) {
        navigate(`/study/${collectionID}`);
    }

    return (
        <Card 
            onClick={() => handleNavigation(collection.id)}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            className={`relative cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-2 transition-all duration-500 border-2 hover:border-purple-300 dark:hover:border-purple-600 stagger-fade-in opacity-0`}
            style={{animationDelay: `${index * 0.1}s`}}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Delete button */}
            <Button 
                className={`absolute top-3 right-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg z-20 transform transition-all duration-300 ${cardHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                size="sm" 
                onClick={handleDeleteCollection}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                        <Book className="h-5 w-5" />
                    </div>
                    <span className="text-xl">{collection.name}</span> 
                </CardTitle>
            </CardHeader>
            
            <CardContent className="pb-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {collection.description}
                </p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Target className="h-4 w-4" />
                        <span className="text-sm font-medium">
                            {collection.flashCards.length} card{collection.flashCards.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                    {collection.successRate > 0 && (
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                {collection.successRate}% success rate
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{creationDate.getDate()}/{creationDate.getMonth() + 1}/{creationDate.getFullYear()}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

function CollectionShower({ collections, setCollections } : any) {
    return (
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection: any, index: number) => (
                <Collection 
                    key={collection.creationDate} 
                    collection={collection} 
                    setCollections={setCollections}
                    index={index}
                />
            ))}
        </section>
    );
}