import React from 'react'

/**
 * Custom bar chart icon for the Analytics page header.
 * Uses ascending columns to represent data visualization.
 * Color defaults to the analytics page accent (#A78BFA) via currentColor.
 */
export function AnalyticsBarChartIcon({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="14" width="4" height="8" rx="1" fill="currentColor" />
      <rect x="8" y="9" width="4" height="13" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="17" rx="1" fill="currentColor" />
      <rect x="20" y="2" width="2" height="20" rx="1" fill="currentColor" />
    </svg>
  )
}
