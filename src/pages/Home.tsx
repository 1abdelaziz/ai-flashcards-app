import HeroSection from "@/components/HeroSection";
import { NotebookPen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
    return (
        <>
            <HeroSection
                title="Welcome to FlashCards"
                paragraph="Create and study flashcards with ease."
            />
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
    );
}