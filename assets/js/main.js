/**
 * AZKA REYHAN MOHAMMED - MAIN SCRIPT
 * Interactive Web App: Three.js 3D Hero, Parallax, Tilt, Modal & Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initNavbar();
  initMobileDrawer();
  initScrollReveal();
  initParallaxEffects();
  initThreeHeroCanvas();
  initTiltCards();
  initProjectsPage();
  initScheduleSection();
  initMapControls();
  initAppMasteryTracker();
  initActiveNavLinks();
});

/* ===================================================================
   1. SMOOTH PAGE TRANSITIONS
   =================================================================== */
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;

  // Fade in on page load
  window.addEventListener('pageshow', () => {
    overlay.classList.remove('is-active');
  });

  // Intercept local page links for smooth fade out transition
  const links = document.querySelectorAll('a[href$=".html"], a[href="./"], a[href="/"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      // Ignore hash links or external links
      if (!target || target.startsWith('#') || target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:') || link.hasAttribute('target')) {
        return;
      }

      e.preventDefault();
      overlay.classList.add('is-active');
      setTimeout(() => {
        window.location.href = target;
      }, 280);
    });
  });
}

/* ===================================================================
   2. NAVBAR & MOBILE DRAWER
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar-sticky');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function initActiveNavLinks() {
  const path = window.location.pathname;
  const isProjects = path.includes('projects');

  document.querySelectorAll('.nav-link, .drawer-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (isProjects && href.includes('projects')) {
      link.classList.add('active');
    } else if (!isProjects && (href.includes('index') || href === './' || href === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ===================================================================
   3. SCROLL REVEAL ANIMATIONS (FRAMER-STYLE)
   =================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Optional: keep observer if repeating or unobserve
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });
}

/* ===================================================================
   4. PARALLAX EFFECTS (SMOOTH & LIGHTWEIGHT)
   =================================================================== */
function initParallaxEffects() {
  const parallaxItems = document.querySelectorAll('[data-parallax-speed]');
  const orbs = document.querySelectorAll('.ambient-orb');

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
  }, { passive: true });

  const renderParallax = () => {
    // Smooth lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Shift ambient orbs
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.6;
      orb.style.transform = `translate(${targetX * factor}px, ${targetY * factor}px)`;
    });

    // Scroll parallax for flagged items
    const scrollY = window.scrollY;
    parallaxItems.forEach(item => {
      const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.15;
      item.style.transform = `translateY(${scrollY * speed}px)`;
    });

    requestAnimationFrame(renderParallax);
  };

  requestAnimationFrame(renderParallax);
}

/* ===================================================================
   5. THREE.JS 3D HERO CANVAS (FLOATING 3D ELEMENTS & STARFIELD)
   =================================================================== */
function initThreeHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles Starfield
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color('#5BC0BE');
  const color2 = new THREE.Color('#1C2541');
  const color3 = new THREE.Color('#6FFFE9');

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 80;
    positions[i + 1] = (Math.random() - 0.5) * 80;
    positions[i + 2] = (Math.random() - 0.5) * 60;

    const chosen = Math.random() > 0.5 ? color1 : (Math.random() > 0.5 ? color3 : color2);
    colors[i] = chosen.r;
    colors[i + 1] = chosen.g;
    colors[i + 2] = chosen.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // Floating Wireframe 3D Geometry
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x5BC0BE,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });

  const mesh1 = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 1), wireMaterial);
  mesh1.position.set(-18, 5, -10);
  scene.add(mesh1);

  const mesh2 = new THREE.Mesh(new THREE.TorusGeometry(5, 1.2, 16, 50), wireMaterial);
  mesh2.position.set(20, -6, -8);
  scene.add(mesh2);

  const mesh3 = new THREE.Mesh(new THREE.OctahedronGeometry(4, 0), wireMaterial);
  mesh3.position.set(0, 14, -15);
  scene.add(mesh3);

  // Cursor reaction
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const animate = () => {
    requestAnimationFrame(animate);

    particleSystem.rotation.y += 0.001;
    particleSystem.rotation.x += 0.0005;

    mesh1.rotation.x += 0.005;
    mesh1.rotation.y += 0.006;
    mesh2.rotation.x += 0.004;
    mesh2.rotation.y += 0.007;
    mesh3.rotation.x += 0.006;
    mesh3.rotation.y += 0.005;

    camera.position.x += (mouseX * 4 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 4 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ===================================================================
   6. 3D TILT EFFECT ON CARDS
   =================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ===================================================================
   7. PROJECTS PAGE (MODULAR GRID, FILTER & 3D VIEWER MODAL)
   =================================================================== */
function initProjectsPage() {
  const grid = document.getElementById('projects-grid-container');
  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  // Render Projects Grid
  const renderProjects = (filter = 'all') => {
    grid.innerHTML = '';

    const filtered = filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.semesterTag === filter || p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card reveal-on-scroll is-revealed';
      card.setAttribute('data-tilt', '');

      card.innerHTML = `
        <div class="project-image-box">
          <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
          <span class="project-badge-semester">${project.semester}</span>
          ${project.model3d ? `<span class="project-badge-3d">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Interactive 3D
          </span>` : ''}
        </div>
        <div class="project-content">
          <span class="project-category">${project.category}</span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-actions">
            ${project.model3d ? `
              <button class="btn-card-action primary" onclick="open3DModal('${project.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                Inspect in 3D
              </button>
            ` : `
              <button class="btn-card-action primary" onclick="open3DModal('${project.id}')">
                Lihat Detail
              </button>
            `}
            <button class="btn-card-action secondary" onclick="open3DModal('${project.id}')">
              Info Lengkap
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Always append the "Add New Project Placeholder" component!
    const placeholderCard = document.createElement('div');
    placeholderCard.className = 'project-card-placeholder reveal-on-scroll is-revealed';
    placeholderCard.onclick = openAddProjectModal;
    placeholderCard.innerHTML = `
      <div class="placeholder-icon-box">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <h3 class="placeholder-title">+ Tambah Proyek Baru</h3>
      <p class="placeholder-desc">Arsitektur data modular. Klik di sini untuk melihat format JSON cepat menambah karya baru.</p>
      <span class="placeholder-badge">Scalable JSON Array</span>
    `;
    grid.appendChild(placeholderCard);

    // Re-init tilt on newly generated cards
    initTiltCards();
  };

  // Filter click handlers
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });

  // Initial render
  renderProjects('all');
}

/* ===================================================================
   8. MODAL CONTROLS (PROJECT DETAILS & 3D VIEWER)
   =================================================================== */
window.open3DModal = function(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-dynamic-content');
  if (!modal || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-viewer-container">
      ${project.model3d ? `
        <model-viewer 
          src="${project.model3d}" 
          alt="${project.title}" 
          auto-rotate 
          camera-controls 
          shadow-intensity="1.5"
          exposure="1.2"
          ar
          ar-modes="webxr scene-viewer quick-look">
        </model-viewer>
      ` : `
        <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">
      `}
    </div>
    <div class="modal-content-body">
      <span class="project-badge-semester" style="position:static; display:inline-block; margin-bottom:12px;">${project.semester} • ${project.year || '2025'}</span>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-subtitle">${project.category}</p>
      
      <p class="modal-text">${project.extendedDetails || project.description}</p>
      
      <div class="modal-info-grid">
        <div class="modal-info-item">
          <h5>Source Blender File</h5>
          <p>📦 ${project.sourceFile}</p>
        </div>
        <div class="modal-info-item">
          <h5>Render Engine</h5>
          <p>⚡ Blender EEVEE Next</p>
        </div>
        <div class="modal-info-item">
          <h5>Interaktivitas</h5>
          <p>🎮 3D WebGL / GLTF Orbit</p>
        </div>
      </div>

      <div class="project-tags" style="margin-bottom: 24px;">
        ${project.tags.map(t => `<span class="project-tag" style="background:rgba(91,192,190,0.15); color:#6FFFE9;">#${t}</span>`).join('')}
      </div>

      <div style="display:flex; gap:14px; flex-wrap:wrap;">
        <a href="https://wa.me/6281317225674?text=Halo%20Azka,%20saya%20tertarik%20dengan%20proyek%203D%20${encodeURIComponent(project.title)}" 
           target="_blank" 
           class="btn-primary" 
           style="text-decoration:none;">
          Tanyakan Proyek Ini via WA
        </a>
        <button class="btn-secondary" onclick="closeModal()">Tutup</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.openAddProjectModal = function() {
  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-dynamic-content');
  if (!modal || !modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-content-body" style="padding-top:40px;">
      <span class="placeholder-badge" style="display:inline-block; margin-bottom:12px;">PANDUAN KELENGKAPAN MODULAR</span>
      <h2 class="modal-title">+ Cara Menambah Proyek Baru</h2>
      <p class="modal-subtitle">Struktur Scalable JSON Array pada <code>assets/js/projects-data.js</code></p>
      
      <p class="modal-text">
        Anda dapat menambahkan karya 3D terbaru hanya dengan membuka file <strong>assets/js/projects-data.js</strong> dan menambahkan satu objek JSON ke dalam array <code>PROJECTS_DATA</code>. Proyek akan langsung muncul dan difilter otomatis!
      </p>

      <div style="background:#050914; border:1px solid var(--border-glass); border-radius:12px; padding:18px; margin-bottom:24px; overflow-x:auto;">
        <pre style="color:#6FFFE9; font-family:monospace; font-size:0.85rem; line-height:1.5;">{
  id: "proyek-semester-5",
  title: "Judul Proyek Keren Anda",
  semester: "Semester 5",
  semesterTag: "semester-5",
  category: "3D Animation / Sci-Fi Robot",
  description: "Deskripsi singkat tentang apa yang Anda buat...",
  extendedDetails: "Penjelasan detail teknik modeling, shader, atau animasi...",
  image: "assets/img/karya-baru.png",
  model3d: "assets/img/karya-baru.glb", // Opsional jika ada GLB
  sourceFile: "ujian-semester-5.blend",
  tags: ["Blender", "Hard Surface", "EEVEE"],
  highlight: true,
  year: "2026"
}</pre>
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button class="btn-primary" onclick="closeModal()">Paham & Tutup</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ===================================================================
   9. JADWAL PRAKTIKUM 3IA15 - INTERACTIVE CONTROLS
   =================================================================== */
function initScheduleSection() {
  const scheduleSec = document.getElementById('jadwal');
  if (!scheduleSec) return;

  // 1. View Toggling (Table vs Cards)
  const viewBtns = document.querySelectorAll('.schedule-view-btn');
  const tableView = document.getElementById('schedule-table-view');
  const cardsView = document.getElementById('schedule-cards-view');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-view-mode');
      if (mode === 'table') {
        if (tableView) tableView.style.display = 'block';
        if (cardsView) cardsView.style.display = 'none';
      } else {
        if (tableView) tableView.style.display = 'none';
        if (cardsView) cardsView.style.display = 'grid';
      }
    });
  });

  // 2. Day Filter Pills
  const filterPills = document.querySelectorAll('.schedule-filter-pill');
  const tableRows = document.querySelectorAll('.schedule-table-row');
  const dayCards = document.querySelectorAll('.schedule-day-column');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-day-filter');

      // Filter Table Rows
      tableRows.forEach(row => {
        const day = row.getAttribute('data-day');
        if (filter === 'all' || day === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });

      // Filter Day Cards
      dayCards.forEach(card => {
        const day = card.getAttribute('data-day');
        if (filter === 'all' || day === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Highlight Today's Schedule
  const dayMap = {
    2: 'selasa',
    3: 'rabu',
    5: 'jumat',
    6: 'sabtu'
  };
  const currentDayIndex = new Date().getDay();
  const todayKey = dayMap[currentDayIndex];

  if (todayKey) {
    // Highlight table rows for today
    tableRows.forEach(row => {
      if (row.getAttribute('data-day') === todayKey) {
        row.classList.add('is-today');
        const badge = row.querySelector('.schedule-day-badge');
        if (badge && !badge.querySelector('.today-indicator-tag')) {
          const tag = document.createElement('span');
          tag.className = 'today-indicator-tag';
          tag.style.cssText = 'background:var(--accent-ice-light); color:#070C1C; font-size:0.68rem; padding:2px 8px; border-radius:99px; margin-left:6px; font-weight:800; letter-spacing:0.5px;';
          tag.textContent = 'HARI INI';
          badge.appendChild(tag);
        }
      }
    });

    // Highlight day card for today
    dayCards.forEach(card => {
      if (card.getAttribute('data-day') === todayKey) {
        card.style.borderColor = 'var(--accent-ice-light)';
        card.style.boxShadow = '0 0 30px rgba(91, 192, 190, 0.35)';
        const header = card.querySelector('.schedule-day-col-header');
        if (header && !header.querySelector('.today-indicator-tag')) {
          const tag = document.createElement('span');
          tag.className = 'today-indicator-tag';
          tag.style.cssText = 'background:rgba(255,255,255,0.25); color:#fff; font-size:0.72rem; padding:3px 8px; border-radius:99px; font-weight:700;';
          tag.textContent = 'Hari Ini';
          header.appendChild(tag);
        }
      }
    });
  }

  // 4. Copy Schedule Button
  const copyBtn = document.getElementById('copy-schedule-btn');
  const toast = document.getElementById('schedule-toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const scheduleText = `JADWAL PRAKTIKUM 3IA15
Semester Ganjil PTA 2026/2027 • Universitas Gunadarma
Semangat praktikumnya! :)

[SELASA]
• 07.30 – 09.30 WIB: PAA 3IA15 (Perancangan & Analisis Algoritma) - LAB F8427
• 15.30 – 17.30 WIB: GK 3IA15 (Grafik Komputer) - LAB F8422

[RABU]
• 07.30 – 09.30 WIB: JK 3IA15 (Jaringan Komputer) - LAB H405
• 09.30 – 11.30 WIB: IMK 3IA15 (Interaksi Manusia dan Komputer) - LAB H405

[JUMAT]
• 07.30 – 09.30 WIB: SBD1 3IA15 (Sistem Basis Data) - LAB H2

[SABTU]
• 13.30 – 15.30 WIB: PW 3IA15 (Pemrograman Web) - LAB H2

Catatan: Jangan lupa cek lab & persiapannya!`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(scheduleText).then(() => {
          showScheduleToast('Jadwal berhasil disalin ke clipboard!');
        }).catch(() => {
          fallbackCopyText(scheduleText);
        });
      } else {
        fallbackCopyText(scheduleText);
      }
    });
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      showScheduleToast('Jadwal berhasil disalin ke clipboard!');
    } catch (err) {
      alert('Gagal menyalin jadwal otomatis.');
    }
    document.body.removeChild(textarea);
  }

  function showScheduleToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ===================================================================
   10. ADDRESS MAP IFRAME INTERACTIVE CONTROLS
   =================================================================== */
function initMapControls() {
  const mapIframe = document.getElementById('address-map-iframe');
  const themeBtn = document.getElementById('map-theme-btn');
  const copyBtn = document.getElementById('copy-address-btn');
  const toast = document.getElementById('schedule-toast');

  // 1. Theme Toggle (Cyber Dark vs Standard)
  if (themeBtn && mapIframe) {
    let isDark = true;
    themeBtn.addEventListener('click', () => {
      isDark = !isDark;
      if (isDark) {
        mapIframe.classList.remove('map-light-theme');
        mapIframe.classList.add('map-dark-theme');
        themeBtn.innerHTML = `
          <span class="theme-icon">🌙</span>
          <span class="theme-label">Tema Web</span>
        `;
        themeBtn.title = 'Beralih ke tampilan standar';
      } else {
        mapIframe.classList.remove('map-dark-theme');
        mapIframe.classList.add('map-light-theme');
        themeBtn.innerHTML = `
          <span class="theme-icon">☀️</span>
          <span class="theme-label">Standar</span>
        `;
        themeBtn.title = 'Beralih ke tema gelap web';
      }
    });
  }

  // 2. Copy Address to Clipboard
  if (copyBtn) {
    const fullAddress = 'Kadumangu, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810 (Koordinat: -6.553500, 106.862496)';
    
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullAddress).then(() => {
          showMapToast('Alamat & koordinat berhasil disalin ke clipboard!');
        }).catch(() => {
          fallbackCopyAddress(fullAddress);
        });
      } else {
        fallbackCopyAddress(fullAddress);
      }
    });
  }

  function fallbackCopyAddress(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      showMapToast('Alamat & koordinat berhasil disalin ke clipboard!');
    } catch (err) {
      alert('Gagal menyalin alamat otomatis.');
    }
    document.body.removeChild(textarea);
  }

  function showMapToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ===================================================================
   11. INTERACTIVE APPLICATION MASTERY CHECKBOX TRACKER
   =================================================================== */
function initAppMasteryTracker() {
  const trackerContainer = document.getElementById('app-mastery-tracker');
  if (!trackerContainer) return;

  const appCards = trackerContainer.querySelectorAll('.app-item-card');
  const counterText = document.getElementById('app-mastered-counter');
  const progressFill = document.getElementById('app-progress-fill');
  const resetBtn = document.getElementById('reset-app-tracker-btn');
  const toast = document.getElementById('schedule-toast');

  const defaultState = {
    'blender': true,
    'premiere': true,
    'excel': true,
    'figma': false,
    'flstudio': false
  };

  // Load saved state or default
  let savedState = {};
  try {
    const raw = localStorage.getItem('azka_app_mastery');
    if (raw) savedState = JSON.parse(raw);
  } catch (e) {
    savedState = {};
  }

  const getAppState = (id) => {
    return savedState.hasOwnProperty(id) ? savedState[id] : defaultState[id];
  };

  // Update card UI state
  const updateCardUI = (card, isChecked) => {
    const input = card.querySelector('.app-checkbox-hidden');
    const group = card.getAttribute('data-group');
    const statusTag = card.querySelector('.app-status-tag');

    if (input) input.checked = isChecked;

    if (isChecked) {
      card.classList.add('is-checked');
      if (statusTag) {
        if (group === 'mastered') {
          statusTag.className = 'app-status-tag status-mastered-checked';
          statusTag.textContent = '✅ Dikuasai';
        } else {
          statusTag.className = 'app-status-tag status-target-checked';
          statusTag.textContent = '🌟 Dipelajari / Aktif';
        }
      }
    } else {
      card.classList.remove('is-checked');
      if (statusTag) {
        if (group === 'mastered') {
          statusTag.className = 'app-status-tag status-unchecked';
          statusTag.textContent = '⭕ Belum Dicentang';
        } else {
          statusTag.className = 'app-status-tag status-unchecked';
          statusTag.textContent = '🎯 Target Ingin Dikuasai';
        }
      }
    }
  };

  // Recalculate stats
  const recalculateStats = () => {
    const totalApps = appCards.length;
    let checkedCount = 0;

    appCards.forEach(card => {
      const input = card.querySelector('.app-checkbox-hidden');
      if (input && input.checked) checkedCount++;
    });

    const percentage = totalApps > 0 ? Math.round((checkedCount / totalApps) * 100) : 0;

    if (counterText) {
      counterText.textContent = `${checkedCount} dari ${totalApps} Aplikasi Dicentang (${percentage}%)`;
    }
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  };

  // Save current states
  const saveStates = () => {
    const current = {};
    appCards.forEach(card => {
      const id = card.getAttribute('data-app-id');
      const input = card.querySelector('.app-checkbox-hidden');
      if (id && input) {
        current[id] = input.checked;
      }
    });
    savedState = current;
    try {
      localStorage.setItem('azka_app_mastery', JSON.stringify(current));
    } catch (e) {}
  };

  // Initialize each card
  appCards.forEach(card => {
    const id = card.getAttribute('data-app-id');
    const isChecked = getAppState(id);
    updateCardUI(card, isChecked);

    // Toggle on click
    card.addEventListener('click', (e) => {
      // Prevent double trigger if clicking label/input directly
      if (e.target.tagName.toLowerCase() === 'input') return;

      const input = card.querySelector('.app-checkbox-hidden');
      if (!input) return;

      const newState = !input.checked;
      updateCardUI(card, newState);
      saveStates();
      recalculateStats();

      // Quick feedback toast
      const appName = card.querySelector('.app-name')?.textContent || 'Aplikasi';
      if (toast) {
        toast.textContent = newState 
          ? `✓ ${appName} berhasil dicentang!` 
          : `○ Centang ${appName} dinonaktifkan.`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
      }
    });
  });

  recalculateStats();

  // Reset button handler
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      appCards.forEach(card => {
        const id = card.getAttribute('data-app-id');
        const defaultVal = !!defaultState[id];
        updateCardUI(card, defaultVal);
      });
      saveStates();
      recalculateStats();

      if (toast) {
        toast.textContent = 'Pengaturan centang aplikasi dikembalikan ke default!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      }
    });
  }
}



