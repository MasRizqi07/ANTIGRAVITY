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
  'ai-software-startup-advisor': {
    name: 'AI Software Startup Advisor',
    desc: 'Konsultan strategi produk & analisis arsitektural bertenaga AI.',
    tech: 'React 19, Express, SQLite, Gemini API',
    arch: 'Full-Stack (Vite + Express)',
    status: 'Siap Pakai (Grade A)',
  },
  'cake-boss-platform': {
    name: 'Cake Boss Platform',
    desc: 'Platform toko roti digital Surabaya dengan manajemen multi-cabang & aset redesign presisi tinggi.',
    tech: 'Next.js 15, NestJS, Prisma, PostgreSQL, Redis',
    arch: 'Full-Stack (Next.js + NestJS REST API) + UI Assets',
    status: 'Pengembangan UI & Integrasi (Grade B+)',
  },
  'portfolio-website': {
    name: 'Portfolio Website',
    desc: 'Website portofolio pribadi retro-futuristik bertema terminal interaktif untuk Ahmad Rizqi Mubarok.',
    tech: 'React, Vite, Tailwind CSS, Framer Motion',
    arch: 'Single Page App (SPA)',
    status: 'Siap Pakai (Grade B-)',
  },
  'studyflow-ai': {
    name: 'StudyFlowAI',
    desc: 'Collaborative AI Planner untuk penjadwalan kalender belajar non-overlapping bagi STEM & Pre-Med.',
    tech: 'Next.js, Prisma (Postgres), Clerk Auth, OpenAI',
    arch: 'Next.js Serverless App with Sandbox Mode',
    status: 'Siap Pakai',
  },
  'ai-coo': {
    name: 'ai-coo',
    desc: 'Platform Chief Operating Officer (COO) virtual berbasis AI untuk UMKM Indonesia.',
    tech: 'Next.js 15, NestJS 11, Prisma, Redis, Turborepo',
    arch: 'Monorepo (pnpm workspaces)',
    status: 'Siap Pakai (Grade A-)',
  },
  'careerforge-ai': {
    name: 'careerforge-ai',
    desc: 'Asisten optimalisasi resume & analisis kecocokan sistem ATS bertenaga AI.',
    tech: 'Next.js 16, Supabase, Tailwind CSS, Vitest',
    arch: 'Next.js Client-Server',
    status: 'Siap Pakai (Grade B-)',
  },
  seapedia: {
    name: 'seapedia',
    desc: 'Marketplace e-commerce multi-role (Admin, Seller, Buyer, Driver) dengan sweeper SLA otomatis.',
    tech: 'Next.js 14, NestJS, Prisma, Redis, Turborepo',
    arch: 'Monorepo (pnpm workspaces)',
    status: 'Siap Pakai (Level 7)',
  },
  'warkop-yareh': {
    name: 'warkop-yareh',
    desc: 'Ekosistem digital coworking space & warkop modern dengan integrasi payment gateway Midtrans.',
    tech: 'Next.js 16, NestJS 11, Prisma, Redis, Midtrans',
    arch: 'Monorepo (DDD + Clean Architecture)',
    status: 'Siap Pakai (Grade A-)',
  },
  'e-commerce-web': {
    name: 'E-Commerce Web',
    desc: 'Platform e-commerce Next.js & landing page.',
    tech: 'Next.js (JavaScript/TypeScript)',
    arch: 'Full-Stack (Next.js)',
    status: 'Siap Pakai (Grade B)',
  },
  'venture-blueprint': {
    name: 'Venture Blueprint',
    desc: 'Kumpulan dokumen cetak biru produk, riset pasar, strategi MVP, dan instruksi AI Coding.',
    tech: 'Markdown Documentation',
    arch: 'Documentation Platform',
    status: 'Siap Pakai',
  },
  'context-forge': {
    name: 'context-forge',
    desc: 'Sistem utility context management untuk integrasi LLM & AI.',
    tech: 'TypeScript, Node.js',
    arch: 'Shared Package / Monorepo Tooling',
    status: 'Dalam Pengembangan',
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
          // If it is a directory, count it as a project
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

  console.log(`Found ${totalCount} projects:`);
  categories.forEach((cat) => {
    console.log(`- ${cat}: ${categoryCounts[cat]}`);
  });

  // Construct Markdown Table
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

  // Read README.md
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // 1. Update project count in description
  const countRegex =
    /mengintegrasikan \*\*\d+ proyek.*?\*\* yang telah dibangun/g;
  const countRepl = `mengintegrasikan **${totalCount} proyek (monorepo, multirepo, dan dokumentasi)** yang telah dibangun`;
  readmeContent = readmeContent.replace(countRegex, countRepl);

  // Fallback if the pattern changed slightly
  if (!readmeContent.includes(countRepl)) {
    readmeContent = readmeContent.replace(
      /mengintegrasikan \*\*.*?\*\* yang telah dibangun/,
      `mengintegrasikan **${totalCount} proyek (monorepo, multirepo, dan dokumentasi)** yang telah dibangun`
    );
  }

  // 2. Insert or replace the table between markers
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
    // If markers do not exist, we will replace the old table structure
    const oldTableRegex = /\| # {3}\| Nama Folder[\s\S]*?(?=\n\n---|\n\n##)/;
    const replacement = `${startMarker}\n\n${tableStr}\n\n${endMarker}`;
    readmeContent = readmeContent.replace(oldTableRegex, replacement);
  }

  // Write README.md
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log('README.md updated successfully!');
}

main();
