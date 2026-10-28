const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const readmePath = path.join(rootDir, 'README.md');

const categories = [
  '01-production',
  '02-in-progress',
  '03-portfolio-showcase',
  '04-experimental',
  '05-archive',
  '06-docs-blueprints',
];

const projectMetadata = {
  // 01-production
  'ai-coo': {
    name: 'ai-coo',
    desc: 'Platform Chief Operating Officer (COO) virtual berbasis AI untuk UMKM Indonesia.',
    tech: 'Next.js 15, NestJS 11, Prisma, Redis, Turborepo',
    arch: 'Monorepo (pnpm workspaces)',
    status: 'Siap Pakai (Grade A-)',
  },
  'ai-software-startup-advisor': {
    name: 'AI Software Startup Advisor',
    desc: 'Konsultan strategi produk & analisis arsitektural bertenaga AI.',
    tech: 'React 19, Express, SQLite, Gemini API',
    arch: 'Full-Stack (Vite + Express)',
    status: 'Siap Pakai (Grade A)',
  },
  'careerforge-ai': {
    name: 'careerforge-ai',
    desc: 'Asisten optimalisasi resume & analisis kecocokan sistem ATS bertenaga AI.',
    tech: 'Next.js 16, Supabase, Tailwind CSS, Vitest',
    arch: 'Next.js Client-Server',
    status: 'Siap Pakai (Grade B-)',
  },
  'nexus-ecosystem': {
    name: 'Nexus Ecosystem',
    desc: 'Ekosistem e-commerce & workspace developer terpadu dengan visualizer engine, JSON/Regex tools, dan concurrency-guarded checkout.',
    tech: 'Next.js 15, React 19, Drizzle ORM, PostgreSQL, Vitest, Tailwind CSS',
    arch: 'Full-Stack App Router + Modular Workspaces',
    status: 'Siap Pakai (Grade A)',
  },
  'rsi-islam-sby': {
    name: 'RS Islam Surabaya A. Yani',
    desc: 'Portal rumah sakit & sistem booking rawat jalan online berbasis konsep "Hijau Tower Sanctuary".',
    tech: 'Next.js 16, React 19, Better-Auth, Prisma, Tailwind CSS',
    arch: 'Full-Stack Web (App Router + Server Actions)',
    status: 'Siap Pakai (Grade A)',
  },
  seapedia: {
    name: 'seapedia',
    desc: 'Marketplace e-commerce multi-role (Admin, Seller, Buyer, Driver) dengan sweeper SLA otomatis.',
    tech: 'Next.js 14, NestJS, Prisma, Redis, Turborepo',
    arch: 'Monorepo (pnpm workspaces)',
    status: 'Siap Pakai (Level 7)',
  },
  'studyflow-ai': {
    name: 'StudyFlowAI',
    desc: 'Collaborative AI Planner untuk penjadwalan kalender belajar non-overlapping bagi STEM & Pre-Med.',
    tech: 'Next.js, Prisma (Postgres), Clerk Auth, OpenAI',
    arch: 'Next.js Serverless App with Sandbox Mode',
    status: 'Siap Pakai',
  },
  'warkop-yareh': {
    name: 'warkop-yareh',
    desc: 'Ekosistem digital coworking space & warkop modern dengan integrasi payment gateway Midtrans.',
    tech: 'Next.js 16, NestJS 11, Prisma, Redis, Midtrans',
    arch: 'Monorepo (DDD + Clean Architecture)',
    status: 'Siap Pakai (Grade A-)',
  },

  // 02-in-progress
  'cake-boss-platform': {
    name: 'Cake Boss Platform',
    desc: 'Platform toko roti digital Surabaya dengan manajemen multi-cabang & aset redesign presisi tinggi.',
    tech: 'Next.js 15, NestJS, Prisma, PostgreSQL, Redis',
    arch: 'Full-Stack (Next.js + NestJS REST API) + UI Assets',
    status: 'Pengembangan UI & Integrasi (Grade B+)',
  },
  'context-forge': {
    name: 'context-forge',
    desc: 'Sistem utility context management untuk integrasi LLM & AI.',
    tech: 'TypeScript, Node.js',
    arch: 'Shared Package / Monorepo Tooling',
    status: 'Dalam Pengembangan',
  },
  'google-cloud-extended-next-2026': {
    name: 'High-Concurrency Event Ticketing (GCloud)',
    desc: 'Arsitektur checkout tiket event anti-race condition berkecepatan tinggi dengan integrasi Google Cloud Run.',
    tech: 'TypeScript, Node.js, PHP Laravel, Redis, Google Cloud Run',
    arch: 'Microservices & Event Worker (Cloud Run + SSE)',
    status: 'Dalam Pengembangan (Grade A-)',
  },
  'Kasbuka-Project': {
    name: 'Kasbuka (Buku Kas Terbuka)',
    desc: 'Buku kas digital transparansi penggalangan dana publik dengan verifikasi bukti & integrasi Midtrans.',
    tech: 'Next.js 16, React 19, Prisma, PostgreSQL, Zod, Midtrans',
    arch: 'Full-Stack Serverless Web',
    status: 'Dalam Pengembangan (Grade B+)',
  },

  // 03-portfolio-showcase
  'portfolio-website': {
    name: 'Portfolio Website',
    desc: 'Website portofolio pribadi retro-futuristik bertema terminal interaktif untuk Ahmad Rizqi Mubarok.',
    tech: 'React, Vite, Tailwind CSS, Framer Motion',
    arch: 'Single Page App (SPA)',
    status: 'Siap Pakai (Grade B-)',
  },
  'tugas-akhir-project-gdgoc-its': {
    name: 'Showcase Web Dev GDGoC ITATS',
    desc: 'Website portofolio interaktif dengan design token modern, scroll observer, dan animasi CSS native.',
    tech: 'HTML5, Modern CSS3 Tokens, Vanilla JavaScript',
    arch: 'Static Interactive Showcase',
    status: 'Siap Pakai (Grade A)',
  },

  // 04-experimental
  'e-commerce-web': {
    name: 'E-Commerce Web',
    desc: 'Platform e-commerce Next.js & landing page.',
    tech: 'Next.js (JavaScript/TypeScript)',
    arch: 'Full-Stack (Next.js)',
    status: 'Siap Pakai (Grade B)',
  },
  'gemma-security-workshop': {
    name: 'Enterprise AI Security Pipeline (Gemma 2)',
    desc: 'Pipeline microservices keamanan AI enterprise: Ingress/Egress Guard (OWASP LLM), Tool Router, dan Kepatuhan EU AI Act.',
    tech: 'Python, Gemma 2 (2B), FunctionGemma, FastAPI/Uvicorn, Docker',
    arch: 'Microservices AI Security Pipeline',
    status: 'Siap Pakai (Google I/O Extended Module)',
  },

  // 05-archive
  'carreer-intelligence-platform': {
    name: 'Career Intelligence Platform',
    desc: 'Platform manajemen karir mahasiswa dan pelacakan jejak alumni universitas berbasis enterprise.',
    tech: 'PHP 8.2, Laravel, MySQL, Bootstrap',
    arch: 'Monolith MVC (Laravel)',
    status: 'Diarsipkan (Legacy Reference)',
  },
  cuancerdas: {
    name: 'CuanCerdas (Finansial Gen-Z)',
    desc: 'Platform robo-advisor dan simulasi edukasi finansial untuk generasi Z berbasis gamifikasi.',
    tech: 'PHP 8.2, Laravel, MySQL, Tailwind CSS',
    arch: 'Monolith MVC (Laravel)',
    status: 'Diarsipkan (Legacy Reference)',
  },
  'example-app': {
    name: 'Laravel Passkey & WebAuthn Boilerplate',
    desc: 'Boilerplate autentikasi modern Laravel dengan dukungan Fortify dan biometric Passkeys/WebAuthn.',
    tech: 'PHP 8.3, Laravel Fortify, WebAuthn, Inertia.js',
    arch: 'Full-Stack Starter Kit',
    status: 'Diarsipkan (Starter Reference)',
  },
  'icl-itats': {
    name: 'ICL ITATS (Integrated Career Link)',
    desc: 'Sistem portal karir & kolaborasi industri terintegrasi untuk civitas akademika ITATS.',
    tech: 'PHP 8.2, Laravel, MySQL, Alpine.js',
    arch: 'Monolith MVC (Laravel)',
    status: 'Diarsipkan (Legacy Reference)',
  },
  smartakademik: {
    name: 'SmartAkademik MAN 4 Jombang',
    desc: 'Sistem informasi akademik madrasah aliyah untuk manajemen nilai, presensi, dan jadwal siswa.',
    tech: 'PHP 8.2, Laravel, MySQL, Livewire',
    arch: 'Monolith MVC (Laravel)',
    status: 'Diarsipkan (Legacy Reference)',
  },

  // 06-docs-blueprints
  'venture-blueprint': {
    name: 'Venture Blueprint',
    desc: 'Kumpulan dokumen cetak biru produk, riset pasar, strategi MVP, dan instruksi AI Coding.',
    tech: 'Markdown Documentation',
    arch: 'Documentation Platform',
    status: 'Siap Pakai',
  },
};

function main() {
  const foundProjects = [];
  const categoryCounts = {};

  categories.forEach((cat) => {
    categoryCounts[cat] = 0;
    const catPath = path.join(rootDir, cat);
    if (fs.existsSync(catPath) && fs.statSync(catPath).isDirectory()) {
      const items = fs.readdirSync(catPath);
      items.forEach((item) => {
        const itemPath = path.join(catPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
          categoryCounts[cat]++;
          foundProjects.push({
            category: cat,
            folder: item,
            relPath: `${cat}/${item}`,
          });
        }
      });
    }
  });

  const totalCount = foundProjects.length;
  const isCheckMode = process.argv.includes('--check');

  if (isCheckMode) {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const match = readmeContent.match(/mengintegrasikan \*\*(\d+) proyek/);
    if (!match) {
      console.error('ERROR: Could not find project count in README.md!');
      process.exit(1);
    }
    const currentCount = parseInt(match[1], 10);
    if (currentCount !== totalCount) {
      console.error(
        '\n======================================================================'
      );
      console.error(
        '[ERROR] README project count is out of sync with actual folders!'
      );
      console.error(`- Folders on disk: ${totalCount}`);
      console.error(`- Count in README: ${currentCount}`);
      console.error(
        'Please run "node scripts/update-readme.js" to update README.md first.'
      );
      console.error(
        '======================================================================\n'
      );
      process.exit(1);
    }
    console.log('README project count is in sync with folders on disk.');
    process.exit(0);
  }

  console.log(`Found ${totalCount} projects:`);
  categories.forEach((cat) => {
    console.log(`- ${cat}: ${categoryCounts[cat]}`);
  });

  let tableMarkdown = [
    '| #   | Kategori | Nama Folder / Proyek | Deskripsi Singkat | Tech Stack Utama | Arsitektur & Tipe Proyek | Status Kesiapan |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ];

  foundProjects.forEach((proj, idx) => {
    const meta = projectMetadata[proj.folder] || {
      name: proj.folder,
      desc: '-',
      tech: '-',
      arch: '-',
      status: '-',
    };

    const projectLink = `**[${meta.name}](file:///d:/MY%20CODE/ANTIGRAVITY/${proj.relPath})**`;
    tableMarkdown.push(
      `| ${idx + 1} | \`${proj.category}\` | ${projectLink} | ${meta.desc} | ${meta.tech} | ${meta.arch} | ${meta.status} |`
    );
  });

  const tableStr = tableMarkdown.join('\n');
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const countRegex =
    /mengintegrasikan \*\*\d+ proyek.*?\*\* yang telah dibangun/g;
  const countRepl = `mengintegrasikan **${totalCount} proyek (monorepo, multirepo, dan dokumentasi)** yang telah dibangun`;
  readmeContent = readmeContent.replace(countRegex, countRepl);

  if (!readmeContent.includes(countRepl)) {
    readmeContent = readmeContent.replace(
      /mengintegrasikan \*\*.*?\*\* yang telah dibangun/,
      `mengintegrasikan **${totalCount} proyek (monorepo, multirepo, dan dokumentasi)** yang telah dibangun`
    );
  }

  const startMarker = '<!-- PROJECT_TABLE_START -->';
  const endMarker = '<!-- PROJECT_TABLE_END -->';

  if (
    readmeContent.includes(startMarker) &&
    readmeContent.includes(endMarker)
  ) {
    const parts = readmeContent.split(startMarker);
    const postParts = parts[1].split(endMarker);
    readmeContent =
      parts[0] +
      startMarker +
      '\n\n' +
      tableStr +
      '\n\n' +
      endMarker +
      postParts[1];
  } else {
    const oldTableRegex = /\| # {3}\| Nama Folder[\s\S]*?(?=\n\n---|\n\n##)/;
    const replacement = `${startMarker}\n\n${tableStr}\n\n${endMarker}`;
    readmeContent = readmeContent.replace(oldTableRegex, replacement);
  }

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('README.md updated successfully!');
}

main();
