// 1. 이미지 제공 상태 기반의 모의 데이터셋 (2026년 최신 업데이트 반영 버전)
const QUIZ_DATA = [
  {
    id: 1,
    title: '드라마 제목 마추기',
    category: 'broadcast',
    description: '* 제곧내 (추가 문의 수정 계속 해드려요! / 이상한 문의는 스루)',
    plays: '553.6K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80'
  },
  {
    id: 2,
    title: '유튜버 이름 맞추기',
    category: 'broadcast',
    description: '*이미지를 보고 유튜버의 이름을 맞추면 되는 심플한 게임입니다.* ☆재미를 위해 현실사진과 이미지를 섞어 만들었습니다☆',
    plays: '3.1M',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80'
  },
  {
    id: 3,
    title: '여자 아이돌 인물퀴즈',
    category: 'music',
    description: '여자 아이돌 인물퀴즈 제작자: cc 그룹 추가 요청은 댓글로 부탁드립니다. 총 205인',
    plays: '539.4K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80'
  },
  {
    id: 4,
    title: '게임 밈&드립 보고 게임 이름 맞추기',
    category: 'game',
    description: '사진을 보고 어느 게임에서 유래되었는지 맞추세요. (뭐 넣을지 추천 받습니다.)',
    plays: '43.4K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80'
  },
  {
    id: 5,
    title: '남자 아이돌 남돌 이름 맞추기',
    category: 'music',
    description: '2026.02.25 투바투, 알디윈, 릭플립, 롱샷 추가하였습니다',
    plays: '399.6K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'
  },
  {
    id: 6,
    title: '궁극기 대사로 요원 맞추기 <발로란트>',
    category: 'game',
    description: '궁 대사만으로 요원을 맞춰라 <신요원 테호 추가!>',
    plays: '198.9K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=500&q=80'
  },
  {
    id: 7,
    title: '연예인 맞추기',
    category: 'people',
    description: '연예인 맞추',
    plays: '836.2K',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'
  },
  {
    id: 8,
    title: '키즈 유튜버 이름 맞추기',
    category: 'broadcast',
    description: 'ㅋㅋ',
    plays: '1.3M',
    type: '주관식',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80'
  }
];

// 2. 상태 관리 변수 (초기값은 이미지처럼 'broadcast' 가 설정된 상태로 시작)
let currentCategory = 'broadcast';
let searchQuery = '';

// 3. DOM 요소 선택
const quizGrid = document.getElementById('quizGrid');
const searchInput = document.getElementById('searchInput');
const noResult = document.getElementById('noResult');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const categoryTabs = document.querySelectorAll('.category-tab');

// 4. 데이터 렌더링 함수
function renderQuizzes() {
  // 필터링 처리
  const filtered = QUIZ_DATA.filter(quiz => {
    const matchesCategory = currentCategory === 'all' || quiz.category === currentCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 초기화
  quizGrid.innerHTML = '';

  // 결과 처리 예외 코드
  if (filtered.length === 0) {
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';

  // 카드 HTML 구조 생성 및 삽입
  filtered.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="card-top">
        <img src="${quiz.image}" alt="${quiz.title}">
        <div class="card-overlay"></div>
        <div class="play-count">
          <i class="fa-solid fa-play"></i>
          <span>${quiz.plays}</span>
        </div>
        <div class="image-icon-badge">
          <i class="fa-regular fa-image"></i>
        </div>
        <div class="quiz-type-badge">${quiz.type}</div>
      </div>
      <div class="card-bottom">
        <h3 class="card-title">${quiz.title}</h3>
        <p class="card-description">${quiz.description}</p>
      </div>
    `;
    quizGrid.appendChild(card);
  });
}

// 5. 카테고리 탭 선택 활성화 UI 처리 함수
function updateCategoryUI() {
  categoryTabs.forEach(tab => {
    if (tab.getAttribute('data-category') === currentCategory) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

// 6. 이벤트 리스너 등록
// 검색창 입력 이벤트
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderQuizzes();
});

// 카테고리 탭 선택 이벤트
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    currentCategory = tab.getAttribute('data-category');
    updateCategoryUI();
    renderQuizzes();
  });
});

// 최상단 스크롤 버튼 이벤트
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 7. 초기 구동 실행
updateCategoryUI();
renderQuizzes();
