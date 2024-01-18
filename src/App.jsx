import Header from "./header";
import Footer from "./Footer";
import AboutSection from "./aboutSection";
import ExperienceSection from "./experienceSection";
import Sidebar from "./sidebar";
import "./style.css";

function App() {
  return (
    <div>
      <Header />
      <div className="main-container container flex">
        <div className="personal-infomation">
          <AboutSection />
          <ExperienceSection />
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
