
import { Bell, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white dark:bg-deepblue-dark py-3 px-4 flex items-center justify-between w-full shadow-sm">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          <span className="ml-2 font-semibold text-lg">RepuTrust</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium hover:text-teal">
            Dashboard
          </Link>
          <Link to="/models" className="text-sm font-medium hover:text-teal">
            Models
          </Link>
          <Link to="/reports" className="text-sm font-medium hover:text-teal">
            Reports
          </Link>
          <Link to="/community" className="text-sm font-medium hover:text-teal">
            Community
          </Link>
        </nav>
      </div>

      <div className="hidden md:flex items-center w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search models, reports..."
            className="pl-10 w-full bg-muted/50"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <div className="w-8 h-8 rounded-full bg-deepblue-light flex items-center justify-center text-white">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
