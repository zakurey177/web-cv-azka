/**
 * DATA PROYEK PORTOFOLIO AZKA REYHAN MOHAMMED
 * 
 * Untuk menambahkan proyek baru, Anda cukup menduplikasi salah satu objek di dalam array `PROJECTS_DATA`
 * di bawah ini dan menyesuaikan nilainya.
 */

const PROJECTS_DATA = [
  {
    id: "smes-1-living-room",
    title: "3D Living Room Environment",
    semester: "Semester 1",
    semesterTag: "semester-1",
    category: "Blender 3D / Interior Modeling",
    description: "Pembuatan aset dan desain interior ruang tamu menggunakan Blender dengan detail pencahayaan dan tekstur realistik. Mengimplementasikan komposisi furniture modern seperti sofa, TV, meja kopi, dan dekorasi lampu.",
    extendedDetails: "Proyek ini berfokus pada pemodelan hard-surface, teknik pencahayaan interior tiga titik (three-point lighting), serta pemberian material tekstur kayu dan kain realistis. Menggunakan Blender EEVEE Next untuk rendering real-time dengan shadow map yang tajam.",
    image: "assets/img/project-smes1.png",
    model3d: "assets/img/living_room.glb",
    sourceFile: "pertemuan 10.blend",
    tags: ["Blender 3D", "Interior Modeling", "EEVEE", "Lighting", "Hard Surface"],
    highlight: true,
    year: "2024 - 2025"
  },
  {
    id: "smes-2-nature-environment",
    title: "Animated Natural Environment (River & Trees)",
    semester: "Semester 2",
    semesterTag: "semester-2",
    category: "3D Environment Animation",
    description: "Pembuatan ekosistem lingkungan alam terbuka (sungai dan pepohonan) yang dilengkapi animasi pergerakan dinamis (air mengalir & dedaunan). Menghadirkan jembatan kayu melintasi aliran air dengan vegetasi lebat.",
    extendedDetails: "Eksplorasi pembuatan simulasi material air dinamis dengan procedural bump mapping, partikel dedaunan, pergerakan angin alami pada kanopi pohon, serta jembatan setapak low-poly dengan tekstur kayu terarah.",
    image: "assets/img/project-smes2.png",
    model3d: "assets/img/nature_river.glb",
    sourceFile: "m10 ujian smester 2.blend",
    tags: ["Environment Design", "Procedural Water", "Animation", "Foliage", "Blender"],
    highlight: true,
    year: "2025"
  },
  {
    id: "smes-3-4-character-rigging",
    title: "Full 3D Character Rigging & Motion",
    semester: "Semester 3 & 4",
    semesterTag: "semester-3-4",
    category: "Character Design & Animation",
    description: "Pemodelan karakter 3D utuh dari tahap sculpting, texturing, rigging selangka hingga proses animasi pergerakan karakter secara alami. Dilengkapi controller IK/FK spine, hip, dan ekspresi wajah detail.",
    extendedDetails: "Pengembangan karakter humanoid lengkap dengan topologi mesh optimal, weighting vertex influence, setup armature tulang kustom dengan driver matematika, controller spline bezier, dan rangkaian animasi pose dinamis.",
    image: "assets/img/project-character.png",
    model3d: "assets/img/character_rig.glb",
    sourceFile: "SMES 3 PERT 10 ujian blend.blend / SMES 4 PERT 10.PENGULANGAN.blend",
    tags: ["Character Modeling", "Armature & Rigging", "Inverse Kinematics", "Blender 5.1", "Pose Motion"],
    highlight: true,
    year: "2025 - 2026"
  }
];

// Placeholder informasi untuk panduan penambahan proyek baru
const ADD_PROJECT_GUIDE = {
  template: {
    id: "id-proyek-unik",
    title: "Nama Judul Proyek Baru",
    semester: "Semester X",
    semesterTag: "semester-x",
    category: "Kategori Proyek",
    description: "Deskripsi singkat proyek...",
    extendedDetails: "Deskripsi teknis mendalam...",
    image: "assets/img/nama-gambar.png",
    model3d: "assets/img/nama-model.glb", // Opsional
    sourceFile: "nama-file.blend",
    tags: ["Tag 1", "Tag 2"],
    highlight: false,
    year: "2026"
  }
};
