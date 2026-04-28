// src/components/Survey.jsx
// 5문항 설문 폼 (단일 페이지 전체 폼, Tailwind 스타일)

import { useState } from "react";
import { useTravel } from "../context/TravelContext";
import { classifyTraveler } from "../algorithms/classifyTraveler";

const QUESTIONS = [
  {
    id: "placesPerDay",
    title: "하루에 몇 곳 정도 돌아보고 싶으세요?",
    hint: "이동 빈도와 여유로움에 영향을 줘요.",
    options: [
      { value: "low", label: "여유롭게 2~3곳" },
      { value: "mid", label: "적당히 4~5곳" },
      { value: "high", label: "빠듯하게 6곳 이상" },
    ],
  },
  {
    id: "walkPreference",
    title: "걷는 건 얼마나 좋아하세요?",
    hint: "도쿄는 도보 이동이 꽤 많답니다.",
    options: [
      { value: "love", label: "걷는 거 좋아해요" },
      { value: "okay", label: "적당하면 괜찮아요" },
      { value: "hate", label: "많이 걷는 건 별로예요" },
    ],
  },
  {
    id: "shoppingLevel",
    title: "쇼핑은 어느 정도 하실 예정인가요?",
    hint: "긴자·시부야·하라주쿠 같은 쇼핑 스팟 포함 여부와 연결돼요.",
    options: [
      { value: "low", label: "거의 관심 없어요" },
      { value: "mid", label: "구경 정도는 좋아요" },
      { value: "high", label: "쇼핑이 메인이에요!" },
    ],
  },
  {
    id: "style",
    title: "가장 끌리는 여행 스타일은?",
    hint: "가장 비중 큰 성향 한 가지만 골라주세요.",
    options: [
      { value: "healing", label: "🌿 힐링과 산책" },
      { value: "active", label: "🏃 활동·체험 많은 여행" },
      { value: "emotional", label: "📸 감성 사진·분위기 스팟" },
      { value: "food", label: "🍜 맛집 탐방" },
    ],
  },
  {
    id: "foodLevel",
    title: "맛집 탐방은 얼마나 챙기시나요?",
    hint: "미식형 판정에 반영돼요.",
    options: [
      { value: "light", label: "끼니만 해결되면 OK" },
      { value: "normal", label: "맛집 몇 곳은 들러야죠" },
      { value: "core", label: "여행의 핵심은 음식!" },
    ],
  },
];

export default function Survey({ onComplete }) {
  const [draft, setDraft] = useState({});
  const { setAnswers, setTravelerResult } = useTravel();

  const answeredCount = Object.keys(draft).length;
  const allAnswered = QUESTIONS.every((q) => draft[q.id]);
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const select = (qId, value) =>
    setDraft((prev) => ({ ...prev, [qId]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allAnswered) return;
    const result = classifyTraveler(draft);
    setAnswers(draft);
    setTravelerResult(result);
    onComplete?.(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto px-4 py-10 space-y-8"
    >
      <header className="text-center space-y-3">
        <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase">
          EnjoyTrip · Tokyo
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          도쿄 여행 취향 테스트
        </h1>
        <p className="text-gray-500">
          5개 질문에 답하면 내 성향에 딱 맞는 루트를 추천해드려요.
        </p>
      </header>

      {/* 진행률 */}
      <div className="sticky top-0 bg-white/80 backdrop-blur z-10 py-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>진행률</span>
          <span>
            {answeredCount} / {QUESTIONS.length}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 목록 */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <fieldset
            key={q.id}
            className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 bg-white"
          >
            <div className="space-y-1">
              <legend className="inline-block text-xs font-semibold text-indigo-600">
                Q{idx + 1}
              </legend>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {q.title}
              </h2>
              {q.hint && (
                <p className="text-sm text-gray-400">{q.hint}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt) => {
                const selected = draft[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => select(q.id, opt.value)}
                    aria-pressed={selected}
                    className={`text-left px-4 py-3 rounded-xl border text-sm sm:text-base transition ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 text-indigo-900 font-medium shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* 제출 */}
      <button
        type="submit"
        disabled={!allAnswered}
        className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-base sm:text-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        {allAnswered
          ? "나의 여행 유형 보기 →"
          : `응답을 모두 선택해주세요 (${answeredCount}/${QUESTIONS.length})`}
      </button>
    </form>
  );
}