// 1. 설문 결과 → 여행자 유형 분류
export function classifyTraveler(answers) {
  const scores = {
    healing: 0, shopping: 0, active: 0, content: 0, food: 0
  };

  if (answers.placesPerDay === 'low')      scores.healing  += 2;
  if (answers.placesPerDay === 'high')     scores.active   += 2;
  if (answers.walkPreference === 'love')   scores.healing  += 2;
  if (answers.walkPreference === 'hate')   scores.shopping += 2;
  if (answers.shoppingLevel === 'high')    scores.shopping += 3;
  if (answers.style === 'healing')         scores.healing  += 3;
  if (answers.style === 'active')          scores.active   += 3;
  if (answers.foodLevel === 'core')        scores.food     += 3;

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];
}

// 2. 유형별 장소 후보 추출
export function filterCandidates(places, type, limit) {
  return [...places]
    .sort((a, b) => b.scores[type] - a.scores[type])
    .slice(0, limit);
}

// 3. Dijkstra — 최적 방문 순서 정렬
export function dijkstra(candidates, edges, useWalk) {
  const startId = candidates[0].id;
  const ids = candidates.map(p => p.id);

  // 인접 리스트 구성
  const graph = new Map();
  ids.forEach(id => graph.set(id, []));

  edges.forEach(e => {
    if (!ids.includes(e.from) || !ids.includes(e.to)) return;
    const cost = useWalk ? e.walkMin : e.transitMin;
    graph.get(e.from).push({ to: e.to, cost });
    graph.get(e.to).push({ to: e.from, cost });
  });

  // 거리 테이블 초기화
  const dist = new Map();
  ids.forEach(id => dist.set(id, Infinity));
  dist.set(startId, 0);

  const unvisited = new Set(ids);

  while (unvisited.size > 0) {
    // 미방문 중 최소 거리 노드 선택
    const current = [...unvisited]
      .reduce((a, b) => dist.get(a) < dist.get(b) ? a : b);
    unvisited.delete(current);

    // 이웃 노드 거리 갱신
    for (const { to, cost } of graph.get(current)) {
      if (!unvisited.has(to)) continue;
      const newDist = dist.get(current) + cost;
      if (newDist < dist.get(to)) dist.set(to, newDist);
    }
  }

  // 거리 오름차순 정렬 = 최적 방문 순서
  return [...candidates].sort(
    (a, b) => dist.get(a.id) - dist.get(b.id)
  );
}