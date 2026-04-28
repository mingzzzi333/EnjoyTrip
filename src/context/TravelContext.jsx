// src/context/TravelContext.jsx
// 설문 결과 / 여행자 유형 / 추천 루트를 앱 전역에서 공유하기 위한 Context

import { createContext, useContext, useState, useMemo } from "react";

const TravelContext = createContext(null);

export function TravelProvider({ children }) {
  const [answers, setAnswers] = useState(null);         // 설문 5개 응답 원본
  const [travelerResult, setTravelerResult] = useState(null); // { type, scores, info }
  const [route, setRoute] = useState([]);               // Dijkstra 결과 장소 배열

  const reset = () => {
    setAnswers(null);
    setTravelerResult(null);
    setRoute([]);
  };

  const value = useMemo(
    () => ({
      answers,
      setAnswers,
      travelerResult,
      setTravelerResult,
      route,
      setRoute,
      reset,
    }),
    [answers, travelerResult, route]
  );

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTravel() {
  const ctx = useContext(TravelContext);
  if (!ctx) {
    throw new Error("useTravel는 <TravelProvider> 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}