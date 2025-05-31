// export async function generateMetadata({ params }) {
//     const res = await fetch(`http://localhost:3000/api/projects/${params.id}`);
//     const project = await res.json();
  
//     return {
//       title: `${project.name} | РМСтрой`,
//       description: `${project.floors}-этажный дом площадью ${project.area} м²`,
//       openGraph: {
//         title: `${project.name} | РМСтрой`,
//         description: `Проект дома от РМСтрой. ${project.floors} этажа, ${project.area} м²`,
//         images: project.images.length > 0 ? [
//           {
//             url: project.images[0].url,
//             width: 800,
//             height: 600,
//             alt: `Проект дома ${project.name}`,
//           }
//         ] : [],
//         url: `https://ваш-сайт/projects/${params.id}`,
//         type: 'website',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: `${project.name} | РМСтрой`,
//         description: `Проект дома от РМСтрой. ${project.floors} этажа, ${project.area} м²`,
//         images: project.images.length > 0 ? [project.images[0].url] : [],
//       }
//     };
//   }

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function generateMetadata({ params }) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
    include: { images: true }
  })

  if (!project) return { title: 'Проект не найден' }

  return {
    title: `${project.name} – Проект дома`,
    description: project.description?.slice(0, 160) || 'Описание проекта дома.',
    openGraph: {
      title: project.name,
      description: project.description || '',
      url: `https://example.com/projects/${project.id}`,
      images: project.images.length
        ? [{ url: project.images[0].url }]
        : [{ url: 'https://example.com/placeholder.jpg' }],
    },
  }
}


import ProjectPageClient from '@/components/ProjectPageClient';

export default async function ProjectPage({ params }) {
  return <ProjectPageClient id={params.id} />;
}