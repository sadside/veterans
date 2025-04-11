import React from 'react'

export const Breadcrumbs: React.FC = () => {
    const location =
        typeof window !== 'undefined' ? window.location : { pathname: '/' }

    const pathSegments = location.pathname.split('/').filter(Boolean)

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
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-gray-500">
                                    {crumb.label}
                                </span>
                            ) : (
                                <a
                                    href={crumb.href}
                                    className="text-blue-600 hover:underline"
                                >
                                    {crumb.label}
                                </a>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </nav>
    )
}
