
const services=[['Broken springs','A broken spring or a door that feels unusually heavy.','〰','Describe what happened. Is the door stuck, heavy, or making a loud noise?'],['Cables','Help with loose, damaged, or off-track lifting cables.','⌁','Is a cable loose, frayed, or off its drum? Describe what you can see from a safe distance.'],['New door installation','Give your home a fresh look with a new garage door.','▤','Tell us about the door size, style, and whether you’re replacing an existing door.'],['New opener installation','A smoother start with a new garage door opener.','⚙','Do you need a first-time opener installation or a replacement?'],['Keypads & remotes','Get help with keyless entry and garage door remotes.','▦','Tell us the opener brand, if known, and what your keypad or remote is doing.'],['Yearly servicing','Routine care to help keep your garage door working.','↻','When was your door last serviced? Tell us about any noise or movement concerns.'],['Not sure / Other','Tell us what you need.','','Describe the issue or the service you have in mind.']];
const serviceImages=['assets/broken-torsion-spring.webp','assets/lift-cable-detail.webp','assets/hero-house.webp','assets/opener.webp','assets/project-0600.webp','assets/project-0603.webp'];
const servicePhotoLabels = ['Broken torsion spring', 'Lift cable and drum'];
const cards=document.getElementById('cards');services.slice(0,6).forEach(([title,desc,icon],i)=>{const b=document.createElement('button');b.className='service';b.dataset.service=title;b.innerHTML=`<div class="service-image"><img src="${serviceImages[i]}" alt="${servicePhotoLabels[i] || ''}" loading="lazy">${servicePhotoLabels[i] ? `<span class="service-photo-label" aria-hidden="true">${servicePhotoLabels[i]}</span>` : ''}<span class="service-number">0${i+1}</span></div><div class="service-copy"><h3>${title}</h3><p>${desc}</p><span class="card-cta">Request an Estimate <span aria-hidden="true">↗</span></span></div>`;cards.append(b)});
const modal=document.getElementById('estimate'),form=document.getElementById('form'),select=document.getElementById('service'),summary=document.getElementById('summary');services.forEach(([s])=>select.add(new Option(s,s)));function update(){document.getElementById('details').placeholder=services.find(s=>s[0]===select.value)[3];document.getElementById('safety').hidden=!['Broken springs','Cables'].includes(select.value)}select.onchange=update;document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{select.value=b.dataset.service;update();form.hidden=false;summary.hidden=true;modal.showModal()}));document.querySelector('.close').onclick=()=>modal.close();modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});form.onsubmit = event => {
  event.preventDefault();
  const fields = new FormData(form);
  const summaryText = Array.from(fields)
    .map(([key, value]) => key[0].toUpperCase() + key.slice(1) + ': ' + value)
    .join('\n');
  const message = 'Hi UGA, I would like an estimate.\n\n' + summaryText;
  const emailLink = document.getElementById('emailrequest');

  document.getElementById('summarytext').textContent = summaryText;
  const gmail = new URL(emailLink.getAttribute('href'));
  gmail.searchParams.set('su', 'Garage door estimate request');
  gmail.searchParams.set('body', message);
  emailLink.href = gmail.href;
  document.getElementById('textrequest').href = 'sms:+12404377571?body=' + encodeURIComponent(message);
  form.hidden = true;
  summary.hidden = false;
  document.getElementById('copymsg').textContent = '';
  document.getElementById('summary-title').focus();
};
document.getElementById('edit').onclick=()=>{form.hidden=false;summary.hidden=true};document.getElementById('copy').onclick=async()=>{try{await navigator.clipboard.writeText(document.getElementById('summarytext').textContent);document.getElementById('copymsg').textContent='Summary copied.'}catch{document.getElementById('copymsg').textContent='Select the summary text to copy it manually.'}};document.getElementById('year').textContent=new Date().getFullYear();

const photoDialog=document.getElementById('photo');document.getElementById('closephoto').onclick=()=>photoDialog.close();photoDialog.addEventListener('click',e=>{if(e.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)photoDialog.close()}});
const menuButton=document.getElementById('menuButton'),navLinks=document.getElementById('navLinks');menuButton.onclick=()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));navLinks.classList.toggle('open',!open)};navLinks.querySelectorAll('a,button').forEach(x=>x.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
const mediaTriggers = document.querySelectorAll('[data-photo], [data-video]');
const galleryMedia = Array.from(document.querySelectorAll('#gallery [data-photo], #gallery [data-video]'));
const mediaTitle = document.getElementById('phototitle');
const largePhoto = document.getElementById('largephoto');
const largeVideo = document.getElementById('largevideo');
const mediaStage = document.getElementById('mediaStage');
const previousMedia = document.getElementById('mediaPrevious');
const nextMedia = document.getElementById('mediaNext');
const mediaPosition = document.getElementById('mediaPosition');
let currentMediaIndex = -1;

function stopGalleryVideo() {
  if (!largeVideo.hasAttribute('src')) return;
  largeVideo.pause();
  largeVideo.removeAttribute('src');
  largeVideo.load();
}

function showGalleryMedia(trigger) {
  stopGalleryVideo();
  currentMediaIndex = galleryMedia.indexOf(trigger);
  const inGallery = currentMediaIndex !== -1;
  const isVideo = Boolean(trigger.dataset.video);
  mediaTitle.textContent = trigger.dataset.title;
  photoDialog.classList.toggle('gallery-lightbox', inGallery && !isVideo);
  largePhoto.hidden = isVideo;
  largeVideo.hidden = !isVideo;
  previousMedia.hidden = !inGallery;
  nextMedia.hidden = !inGallery;
  mediaPosition.hidden = !inGallery;
  mediaPosition.textContent = inGallery ? (currentMediaIndex + 1) + ' / ' + galleryMedia.length : '';

  if (isVideo) {
    largePhoto.removeAttribute('src');
    largeVideo.poster = trigger.dataset.poster;
    largeVideo.src = trigger.dataset.video;
  } else {
    largePhoto.src = trigger.dataset.photo;
    largePhoto.alt = trigger.dataset.title;
    largePhoto.classList.toggle('gallery-photo--lift', trigger.classList.contains('gallery-photo--lift'));
  }
}

function stepGalleryMedia(direction) {
  const nextIndex = (currentMediaIndex + direction + galleryMedia.length) % galleryMedia.length;
  showGalleryMedia(galleryMedia[nextIndex]);
}

mediaTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    showGalleryMedia(trigger);
    photoDialog.showModal();
    if (trigger.dataset.video) largeVideo.play().catch(() => {});
  });
});
previousMedia.onclick = () => stepGalleryMedia(-1);
nextMedia.onclick = () => stepGalleryMedia(1);

let swipeStart = null;
mediaStage.addEventListener('touchstart', event => {
  swipeStart = null;
  if (currentMediaIndex === -1 || event.touches.length !== 1 || event.target.closest('button')) return;

  const touch = event.touches[0];
  // Keep the video controls and seek bar available for their native gestures.
  if (event.target === largeVideo && touch.clientY > largeVideo.getBoundingClientRect().bottom - 56) return;
  swipeStart = touch;
}, { passive: true });

mediaStage.addEventListener('touchend', event => {
  const start = swipeStart;
  swipeStart = null;
  if (!start || event.touches.length) return;

  const end = Array.from(event.changedTouches).find(touch => touch.identifier === start.identifier);
  if (!end) return;
  const dx = end.clientX - start.clientX;
  const dy = end.clientY - start.clientY;
  if (Math.abs(dx) >= 45 && Math.abs(dx) > 1.4 * Math.abs(dy)) stepGalleryMedia(dx < 0 ? 1 : -1);
}, { passive: true });
mediaStage.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });
photoDialog.addEventListener('keydown', event => {
  if (currentMediaIndex === -1 || event.target === largeVideo || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  stepGalleryMedia(event.key === 'ArrowLeft' ? -1 : 1);
});
photoDialog.addEventListener('close', () => {
  swipeStart = null;
  stopGalleryVideo();
});

// Reserve the actual navigation height at every zoom level; never reposition on scroll.
const mobileHeader=document.querySelector('header');
const mobileTopline=document.querySelector('.topline');
function syncNavigationSpace(){
 document.documentElement.style.setProperty('--mobile-topline-height',mobileTopline.getBoundingClientRect().height+'px');
 document.documentElement.style.setProperty('--mobile-header-height',mobileHeader.getBoundingClientRect().height+'px');
}
if('ResizeObserver' in window){const navigationObserver=new ResizeObserver(syncNavigationSpace);navigationObserver.observe(mobileHeader);navigationObserver.observe(mobileTopline)}else{window.addEventListener('resize',syncNavigationSpace)}
syncNavigationSpace();
