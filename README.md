# 🌌 Azka Reyhan Mohammed — Personal CV & 3D Portfolio

Modern, interactive, and responsive Multi-Page Personal Portfolio & CV web application built with **Dark Navy & Ice Blue Glassmorphism Aesthetics**, **Three.js 3D Hero Canvas**, and **Google Model-Viewer** for real-time 3D inspection.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zakurey177/web-cv-azka)

---

## 🎨 Design System & Theme
- **Color Palette**:
  - Primary Background: Dark Navy Blue (`#0B132B` / `#1C2541`)
  - Accent / Hover: Crisp White (`#FFFFFF`) & Soft Ice Blue (`#5BC0BE` / `#6FFFE9`)
  - Cards: Semi-transparent Navy with Glassmorphism & Backdrop Blur (`rgba(28, 37, 65, 0.65)`)
- **Typography**: Google Fonts — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Visuals & 3D**:
  - Interactive Three.js particle starfield & floating wireframe geometry reacting to cursor movement
  - Smooth 3D tilt effects on cards
  - Real-time 3D model inspection via `<model-viewer>` (`.glb` models)
  - Parallax scrolling and smooth page transitions

---

## 📂 Pages & Navigation
- **Halaman 1: CV & Home (`index.html` / `/`)**
  - **Hero Section**: Glowing profile frame, tagline, and quick CTAs
  - **About & Education**: Universitas Gunadarma (Informatics '24), Sentul Bogor
  - **Experience**: Panitia Ospek PKKMB FTI Gunadarma 2026, Praktikan Animasi 3D LepKom Gunadarma, PC Assembly, Proyek Lingkungan Filtrasi Air
  - **Skills & Languages**: Core Problem Solving, 3D Animasi, Kerjasama Tim, Komunikasi; Indonesian (Native), English (Intermediate)
  - **Hobbies & Interests**: 🎮 Playing Games, 🏃 Running, 🏸 Badminton, 📚 Reading Books, 🎬 Watching Movies, 🏎️ Collecting Hot Wheels, 🤖 Building Gunpla, 🎵 Listening to Music
  - **Footer & Social Links**: WhatsApp, Instagram, Backloggd, GitHub, Email

- **Halaman 2: Projects & 3D Portfolio (`projects.html` / `/projects`)**
  - Modular data architecture powered by `assets/js/projects-data.js`
  - Filter tags by Semester and Category
  - 3D Interactive Viewer Modal for:
    - **Semester 1**: *3D Living Room Environment* (`pertemuan 10.blend` / `living_room.glb`)
    - **Semester 2**: *Animated Natural Environment* (`m10 ujian smester 2.blend` / `nature_river.glb`)
    - **Semester 3 & 4**: *Full 3D Character Rigging & Motion* (`SMES 4 PERT 10.PENGULANGAN.blend` / `character_rig.glb`)
  - **Add New Project Placeholder** component for easy expansion

---

## 🚀 How to Add New Projects in the Future
Edit `assets/js/projects-data.js` and push your changes:

```javascript
{
  id: "smes-5-robot",
  title: "Sci-Fi Robot Rig",
  semester: "Semester 5",
  semesterTag: "semester-5",
  category: "3D Hard Surface",
  description: "Your project description...",
  image: "assets/img/your-render.png",
  model3d: "assets/img/your-model.glb",
  sourceFile: "project.blend",
  tags: ["Blender", "Rigging"],
  year: "2026"
}
```

---

## 🌐 Deploy to Vercel
1. Import this repository into [Vercel](https://vercel.com/new).
2. Framework Preset: **Other** (Pure HTML/CSS/JS).
3. Root Directory: `./`
4. Click **Deploy**!
