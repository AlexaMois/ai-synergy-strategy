import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadCriticalImages } from "./utils/imagePreloader";

// Preload critical images for faster LCP
preloadCriticalImages();

createRoot(document.getElementById("root")!).render(<App />);
