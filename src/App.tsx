
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VibeProvider } from "@/contexts/VibeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SickLeaveDetails from "./pages/SickLeaveDetails";
import TripBookingDetails from "./pages/TripBookingDetails";
import UpcomingTrips from "./pages/UpcomingTrips";
import UpcomingTripsCalendar from "./pages/UpcomingTripsCalendar";
import EventDetails from "./pages/EventDetails";
import CourseDetails from "./pages/CourseDetails";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import ExpenseDetails from "./pages/ExpenseDetails";
import ProfilePage from "./pages/ProfilePage";
import SickLeavePage from "./pages/SickLeavePage";
import EducationPage from "./pages/EducationPage";
import TravelPage from "./pages/TravelPage";
import MaintenancePage from "./pages/MaintenancePage";
import BookingPage from "./pages/BookingPage";
import ExpensesPage from "./pages/ExpensesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VibeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sick-leave" element={<SickLeavePage />} />
            <Route path="/sick-leave/:id" element={<SickLeaveDetails />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/trip-booking/:id" element={<TripBookingDetails />} />
            <Route path="/upcoming-trips" element={<UpcomingTrips />} />
            <Route path="/upcoming-trips-calendar" element={<UpcomingTripsCalendar />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/expense-dashboard" element={<ExpenseDashboard />} />
            <Route path="/expense/:id" element={<ExpenseDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VibeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
