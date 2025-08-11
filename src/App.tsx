import Header from "./components/Header";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Plus, 
  Settings2 
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
          <NavLink to="/settings">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "secondary"}>
                <Settings2 className="mr-1 h-4 w-4" />
                Settings
              </Button>
            )}
          </NavLink>
        </Header>
        <main className="container max-w-[1000px] mx-auto mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/study/:collectionId" element={<Study />} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}