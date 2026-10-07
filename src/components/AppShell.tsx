import { ArrowLeft, LogOut, Network, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ViewName } from '../types'

type AppShellProps = {
  children: ReactNode
  view: ViewName
  title: string
  stationCount: number
  eyebrow?: string
  onNavigate: (view: ViewName) => void
  onLogout: () => void
  onBack?: () => void
}

export function AppShell({ children, view, title, stationCount, eyebrow = 'STATION COMMERCIAL SPACE', onNavigate, onLogout, onBack }: AppShellProps) {
  const isHome = view === 'overview'
  const stationCountLabel = stationCount.toString().padStart(2, '0')
  return (
    <div className={`app-shell app-shell--${view}`}>
      <header className="topbar" aria-label={title}>
        <div className="topbar__brand" onClick={() => onNavigate('overview')} role="button" tabIndex={0}>
          <div className="brand-mark"><span /><span /><span /></div>
          <div>
            <div className="topbar__eyebrow">{eyebrow}</div>
            <div className="topbar__title">车站商业空间</div>
          </div>
        </div>
        <div className="topbar__center">
          {!isHome && onBack ? (
            <button className="quiet-button" onClick={onBack}>
              <ArrowLeft size={15} /> 返回上一级
            </button>
          ) : (
            <span className="topbar__path"><Network size={14} /> 全国车站空间网络 <span>·</span> {stationCountLabel} / {stationCountLabel}</span>
          )}
        </div>
        <div className="topbar__actions">
          <div className="user-chip"><span className="user-chip__dot" /><UserRound size={14} /> 演示用户</div>
          <button className="icon-button icon-button--dark" onClick={onLogout} aria-label="退出登录"><LogOut size={16} /></button>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}
