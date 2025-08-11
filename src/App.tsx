import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Plus, 
} from "lucide-react";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  NavLink 
} from "react-router";
import { ThemeProvider } from "./components/theme-provider"; 

import Home from "./pages/Home";
import Create from "./pages/Create";
import Study from "./pages/Study";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <BrowserRouter>
        <Header>
          <NavLink to="/">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "secondary"}>
                <CreditCard className="mr-1 h-4 w-4" />
                Collections
              </Button>
            )}
          </NavLink>
          <NavLink to="/create">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "secondary"}>
                <Plus className="mr-1 h-4 w-4" />
                Create
              </Button>
            )}
          </NavLink>
        </Header>
        <main className="container max-w-[1000px] mx-auto mb-5 pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/study/:collectionId" element={<Study />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}