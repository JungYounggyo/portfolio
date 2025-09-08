export function showPopup(messageTitle = "알림") {
  // 기존 팝업 제거
  let existing = document.querySelector('.custom-popup-overlay');
  if (existing) existing.remove();

  // 오버레이
  let overlay = document.createElement('div');
  overlay.className = 'custom-popup-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  // 팝업 박스
  let popup = document.createElement('div');
  popup.className = 'custom-popup';
  popup.style.cssText = `
    width: 320px;
    background: var(--subaccent);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    position: relative;
  `;

  // 헤더
  let header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 2px 7px;
    background-color: var(--border);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `;

  let closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 20px;
    color: var(--ansfont);
    font-weight: 800;
    cursor: pointer;
  `;
  closeBtn.addEventListener('click', () => {
    overlay.remove();
  });

  let contentbox = document.createElement('div');
  contentbox.style.cssText = `
    padding: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `;

  let title = document.createElement('p');
  title.textContent = `${messageTitle} 복사되었습니다.`;
  title.style.cssText = `
    font-size: 18px;
    color: var(--ansfont);
    font-weight: 800;
    margin: 0;
    flex: 1;
  `;

  header.appendChild(closeBtn);

  // 콘텐츠 메시지
  let message = document.createElement('p');
  message.textContent = '복사한 항목을 붙여넣어보세요.';
  message.style.cssText = `
    font-size: 14px;
    font-weight: 700;
    color: var(--ansfont);
    margin: 0 0 10px;
  `;

  // textarea
  let textarea = document.createElement('textarea');
  textarea.rows = 4;
  textarea.style.cssText = `
    width: 100%;
    padding: 8px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    background-color: var(--ansfont);
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
  `;

  contentbox.appendChild(title);
  contentbox.appendChild(message);
  contentbox.appendChild(textarea);
  popup.appendChild(header);
  popup.appendChild(contentbox);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
