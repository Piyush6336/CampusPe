const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

const resumeInput = document.querySelector('#resume-file');
const resumeWidget = document.querySelector('.resume-widget');
const uploadStatus = document.querySelector('#upload-status');

function showSelectedFile(file) {
  if (!file) return;
  const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
  if (!allowed) {
    uploadStatus.textContent = 'Please choose a PDF, DOC, or DOCX file.';
    uploadStatus.setAttribute('role', 'alert');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    uploadStatus.textContent = 'That file is over 10MB. Please choose a smaller file.';
    uploadStatus.setAttribute('role', 'alert');
    return;
  }
  uploadStatus.textContent = `${file.name} selected · Ready to upload`;
  uploadStatus.removeAttribute('role');
}

resumeInput.addEventListener('change', () => showSelectedFile(resumeInput.files[0]));
['dragenter', 'dragover'].forEach((eventName) => {
  resumeWidget.addEventListener(eventName, (event) => {
    event.preventDefault();
    resumeWidget.classList.add('dragging');
  });
});
['dragleave', 'drop'].forEach((eventName) => {
  resumeWidget.addEventListener(eventName, (event) => {
    event.preventDefault();
    resumeWidget.classList.remove('dragging');
  });
});
resumeWidget.addEventListener('drop', (event) => showSelectedFile(event.dataTransfer.files[0]));
