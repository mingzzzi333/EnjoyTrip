// src/components/ResultCard.jsx
// 설문 결과로 분류된 여행자 유형을 보여주는 카드
// 부모(App)에서 onShowRoute prop으로 "루트 보기" 동작을 주입한다.

import { useTravel } from "../context/TravelContext";

export default function ResultCard({ onShowRoute }) {
  const { travelerResult, reset } = useTravel();

  // 결과가 아직 없는 경우(설문 미완료 시) 렌더링하지 않음
  if (!travelerResult) return null;

  const { info } = travelerResult;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center space-y-6">
        {/* 이모지 */}
        <div className="text-7xl sm:text-8xl leading-none select-none">
          {info.emoji}
        </div>

        {/* 라벨 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase">
            당신의 여행자 유형은
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {info.label}
          </h1>
        </div>

        {/* 설명 */}
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {info.description}
        </p>

        {/* 버튼 영역 */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => onShowRoute?.(travelerResult)}
            className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition"
          >
            나에게 맞는 루트 보기 →
          </button>
          <button
            type="button"
            onClick={reset}
            className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            다시 하기
          </button>
        </div>
      </div>
    </div>
  );
}