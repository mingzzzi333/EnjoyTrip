import Survey from "./components/Survey";
import ResultCard from "./components/ResultCard";
import { useTravel } from "./context/TravelContext";

function App() {
  const { travelerResult } = useTravel();

  const handleShowRoute = (result) => {
    console.log("루트 추천 시작:", result.type);
    // TODO: 다음 단계에서 RouteMap으로 전환
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {travelerResult ? (
        <ResultCard onShowRoute={handleShowRoute} />
      ) : (
        <Survey />
      )}
    </div>
  );
}

export default App;