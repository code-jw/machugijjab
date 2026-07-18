const QUIZ_DATA = [
  { id: 1, title: '포켓몬 이름 맞추기 (1~9세대)', category: 'game', description: '포켓몬스터 1세대부터 9세대까지의 포켓몬을 사진을 보고 맞춘다.\n\n문의는 댓글로', plays: '553.6K', type: '주관식', image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&q=80' },
  { id: 2, title: '유튜버 이름 맞추기', category: 'broadcast', description: '*이미지를 보고 유튜버의 이름을 맞추면 되는 심플한 게임입니다.*', plays: '3.1M', type: '주관식', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80' },
  { id: 3, title: '여자 아이돌 인물퀴즈', category: 'music', description: '여자 아이돌 인물퀴즈 제작자: cc 그룹 추가 요청은 댓글로 부탁드립니다.', plays: '539.4K', type: '주관식', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80' },
  { id: 4, title: '캐치 티니핑 티니핑 맞추기', category: 'toon', description: '나무위키 기준 진도 다시 왔다감 (그래도 모른다)\n(2025-12-15일 연말 업뎃)', plays: '43.4K', type: '주관식', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  { id: 5, title: '초성보고 애니 제목 맞추기', category: 'toon', description: '초성은 풀네임 기준으로 넣었으니 정답 입력할 때도 되도록 풀네임으로 적어주세요.', plays: '399.6K', type: '주관식', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80' },
  { id: 6, title: '포켓몬 이름 맞추기(1~4세대)', category: 'game', description: '- 포켓몬의 그림을 보고 이름을 맞추세요. - 한국 명칭만 정답으로 인정됩니다.', plays: '198.9K', type: '주관식', image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=500&q=80' },
];

let currentCategory = 'all';
let searchQuery = '';
const quizGrid = document.getElementById('quizGrid');
const searchInput = document.getElementById('searchInput');
const noResult = document.getElementById('noResult');
const categoryTabs = document.querySelectorAll('.category-tab');

function renderQuizzes() {
  if(!quizGrid) return;
  const filtered = QUIZ_DATA.filter(quiz => {
    const matchesCategory = currentCategory === 'all' || quiz.category === currentCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  quizGrid.innerHTML = '';
  if (filtered.length === 0) {
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';

  filtered.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="card-top">
        <img src="${quiz.image}" alt="${quiz.title}">
      </div>
      <div class="card-bottom">
        <h3 class="card-title">${quiz.title}</h3>
        <p class="card-description">${quiz.description}</p>
      </div>
    `;
    // 클릭 시 quiz.html 로 이동 (ID 파라미터 전달)
    card.addEventListener('click', () => {
      window.location.href = `quiz.html?id=${quiz.id}`;
    });
    quizGrid.appendChild(card);
  });
}

if(searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderQuizzes();
  });
}

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    currentCategory = tab.getAttribute('data-category');
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderQuizzes();
  });
});

renderQuizzes();
