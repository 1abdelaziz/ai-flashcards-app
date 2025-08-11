import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export default function PageNotFound() {
  return (
    <>
        <HeroSection 
            title="404 - Page Not Found" 
            paragraph="Oops! The page you're looking for seems to have wandered off into the digital void. Let's get you back on track."
        />
        
        <div className="flex justify-center">
            <Button
            variant="default"
            size="lg"
            onClick={() => window.location.href = "/"}
            className="shadow-lg hover:shadow-xl transition-all duration-200 mx-auto"
            >
            <RotateCcw className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
            </Button>
        </div>
    </>
  );
}