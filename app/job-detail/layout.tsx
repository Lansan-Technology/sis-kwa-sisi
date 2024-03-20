import React from 'react'

export default function JobLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>{children}</div>
  )
}
