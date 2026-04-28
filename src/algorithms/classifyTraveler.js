// src/algorithms/classifyTraveler.js
// 설문 응답 → 여행자 유형 분류
// 점수 규칙은 프로젝트 스펙에 정의된 것 그대로 + 감성/미식 확장 포함

export const TRAVELER_TYPES = {
  healing: {
    id: "healing",
    emoji: "🌿",
    label: "힐링형",
    description: "여유로운 산책과 조용한 공간을 사랑하는 타입. 자연과 신사 위주로 루트를 짭니다.",
  },
  shopping: {
    id: "shopping",
    emoji: "🛍️",
    label: "쇼핑형",
    description: "도쿄의 쇼핑 스팟을 알차게 도는 타입. 번화가 중심 루트를 추천해요.",
  },
  active: {
    id: "active",
    emoji: "🏃",
    label: "액티비티형",
    description: "체험과 이동이 많아도 즐거운 타입. 하루를 빽빽하게 채우는 루트에 강해요.",
  },
  emotional: {
    id: "emotional",
    emoji: "📸",
    label: "감성형",
    description: "사진 찍기 좋은 장소를 따라 다니는 타입. 골목·전시·야경 중심 루트.",
  },
  food: {
    id: "food",
    emoji: "🍜",
    label: "미식형",
    description: "맛집이 여행의 중심인 타입. 시장·라멘·이자카야 동선을 최적화합니다.",
  },
};

/**
 * 설문 응답을 받아 유형을 분류합니다.
 * @param {{placesPerDay:string, walkPreference:string, shoppingLevel:string, style:string, foodLevel:string}} answers
 * @returns {{type:string, scores:object, info:object}}
 */
export function classifyTraveler(answers) {
  const scores = { healing: 0, shopping: 0, active: 0, emotional: 0, food: 0 };

  // placesPerDay
  if (answers.placesPerDay === "low") scores.healing += 2;
  if (answers.placesPerDay === "high") scores.active += 2;

  // walkPreference
  if (answers.walkPreference === "love") scores.healing += 2;
  if (answers.walkPreference === "hate") scores.shopping += 2;

  // shoppingLevel
  if (answers.shoppingLevel === "high") scores.shopping += 3;

  // style
  if (answers.style === "healing") scores.healing += 3;
  if (answers.style === "active") scores.active += 3;
  if (answers.style === "emotional") scores.emotional += 3;   // 확장
  if (answers.style === "food") scores.food += 3;             // 확장

  // foodLevel
  if (answers.foodLevel === "core") scores.food += 3;

  // 최고 점수 유형 선택 (동점 시 우선순위: healing > emotional > food > active > shopping)
  const priority = ["healing", "emotional", "food", "active", "shopping"];
  let topType = priority[0];
  for (const t of priority) {
    if (scores[t] > scores[topType]) topType = t;
  }

  return {
    type: topType,
    scores,
    info: TRAVELER_TYPES[topType],
  };
}