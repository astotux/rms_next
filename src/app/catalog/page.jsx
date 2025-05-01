import { prisma } from '@/lib/prisma'

export default async function CatalogPage() {
  const projects = await prisma.project.findMany({
    include: {
      wallMaterial: true,
      completions: {
        include: {
          details: true
        }
      }
    }
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Каталог проектов домов</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <li key={project.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p>Размер: {project.width}×{project.length} м</p>
            <p>Площадь: {project.area} м²</p>
            <p>Этажей: {project.floors}</p>
            <p>Комнат: {project.rooms}</p>
            <p>Материал стен: {project.wallMaterial.name}</p>

            {project.completions.length > 0 && (
              <div className="mt-3">
                <h3 className="font-medium">Комплектации:</h3>
                <ul className="mt-1 space-y-2">
                  {project.completions.map(completion => (
                    <li key={completion.id}>
                      <strong>{completion.completionType}</strong>
                      <ul className="pl-4 list-disc">
                        {completion.details.map(detail => (
                          <li key={detail.id}>
                            {detail.name}: {detail.value || '—'}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
