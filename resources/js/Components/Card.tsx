import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Simple title rendered in the header. Ignored if `header` is provided. */
    title?: ReactNode;
    /** Optional muted text shown under the title. */
    subtitle?: ReactNode;
    /** Fully custom header content. Overrides `title`/`subtitle`. */
    header?: ReactNode;
    /** Optional footer content rendered below a divider. */
    footer?: ReactNode;
    children: ReactNode;
}

/**
 * Reusable content card. Wraps children in a rounded, bordered surface with an
 * optional header and footer. Pass `className` to tweak spacing or width.
 */
export default function Card({
    title,
    subtitle,
    header,
    footer,
    children,
    className = '',
    ...props
}: CardProps) {
    return (
        <div
            className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
            {...props}
        >
            {(header || title) && (
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                    {header ?? (
                        <>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {subtitle}
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            <div className="px-5 py-4 sm:px-6">{children}</div>

            {footer && (
                <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
                    {footer}
                </div>
            )}
        </div>
    );
}
