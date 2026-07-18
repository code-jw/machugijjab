// 임시 데이터 (실제로는 서버나 localStorage에서 가져옴)
const QUIZ_DATA = [
  { id: 1, title: '포켓몬 이름 맞추기 (1~9세대)', category: 'game', description: '포켓몬스터 1세대부터 9세대까지의 포켓몬을 사진을 보고 맞춘다.\n\n문의는 댓글로', plays: '553.6K', type: '주관식', image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&q=80' },
  { id: 2, title: '유튜버 이름 맞추기', category: 'broadcast', description: '*이미지를 보고 유튜버의 이름을 맞추면 되는 심플한 게임입니다.*', plays: '3.1M', type: '주관식', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80' },
  { id: 3, title: '여자 아이돌 인물퀴즈', category: 'music', description: '여자 아이돌 인물퀴즈 제작자: cc 그룹 추가 요청은 댓글로 부탁드립니다.', plays: '539.4K', type: '주관식', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80' },
  { id: 4, title: '캐치 티니핑 티니핑 맞추기', category: 'toon', description: '나무위키 기준 진도 다시 왔다감 (그래도 모른다)\n(2025-12-15일 연말 업뎃)', plays: '43.4K', type: '주관식', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  { id: 5, title: '초성보고 애니 제목 맞추기', category: 'toon', description: '초성은 풀네임 기준으로 넣었으니 정답 입력할 때도 되도록 풀네임으로 적어주세요.', plays: '399.6K', type: '주관식', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80' },
  { id: 6, title: '포켓몬 이름 맞추기(1~4세대)', category: 'game', description: '- 포켓몬의 그림을 보고 이름을 맞추세요. - 한국 명칭만 정답으로 인정됩니다.', plays: '198.9K', type: '주관식', image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=500&q=80' },
];

// URL에서 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const quizId = parseInt(urlParams.get('id')) || 1; // 기본값 1

// 데이터 매핑
const currentQuiz = QUIZ_DATA.find(q => q.id === quizId) || QUIZ_DATA[0];

document.getElementById('detailImg').src = currentQuiz.image;
document.getElementById('detailTitle').textContent = currentQuiz.title;
document.getElementById('detailDesc').innerText = currentQuiz.description;

// 추천 퀴즈 렌더링 (현재 퀴즈 제외)
const recommendList = document.getElementById('recommendList');
const recommendations = QUIZ_DATA.filter(q => q.id !== currentQuiz.id).slice(0, 4);

recommendations.forEach(rec => {
  const div = document.createElement('div');
  div.className = 'rec-card';
  div.innerHTML = `
    <img src="${rec.image}" alt="">
    <div class="rec-info">
      <h4>${rec.title}</h4>
      <p>${rec.description}</p>
    </div>
  `;
  div.addEventListener('click', () => {
    window.location.href = `quiz.html?id=${rec.id}`;
  });
  recommendList.appendChild(div);
});

// 타이머 UI 상호작용
const timerNodes = document.querySelectorAll('.timer-node');
timerNodes.forEach(node => {
  node.addEventListener('click', () => {
    timerNodes.forEach(n => {
      n.classList.remove('active');
      n.querySelector('.node-label').classList.remove('active-label');
    });
    node.classList.add('active');
    node.querySelector('.node-label').classList.add('active-label');
  });
});
