import React from 'react'

export const Breadcrumbs: React.FC = () => {
    if (typeof window === 'undefined') {
        return null // Возвращаем null на сервере
    }

    // Получаем сегменты пути
    const pathSegments = window.location.pathname.split('/').filter(Boolean)

    // Пропускаем первый сегмент (например, 'categoryNews')
    pathSegments.shift()

    // Формируем хлебные крошки
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        const label = decodeURIComponent(segment)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())

        return { href, label }
    })

    return (
        <nav aria-label="breadcrumb">
            <ul className="flex items-center space-x-1 text-sm">
                <li>
                    <a href="/" className="text-blue-600 hover:underline">
                        Главная
                    </a>
                </li>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                        <span>›</span>
                        <li>
                            <span className="text-gray-500">{crumb.label}</span>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    )
}
