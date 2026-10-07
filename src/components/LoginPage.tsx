import { ArrowLeft, ArrowRight, Check, LockKeyhole, Mail, Radio, ScanLine, UserPlus } from 'lucide-react'
import { FormEvent, useState } from 'react'

type LoginPageProps = { stationCount: number; onLogin: () => void }
type Feedback = { type: 'error' | 'success'; message: string } | null

export function LoginPage({ stationCount, onLogin }: LoginPageProps) {
  const stationCountLabel = stationCount.toString().padStart(2, '0')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState<Feedback>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (mode === 'login') {
      if (!username.trim() || !password.trim()) {
        setFeedback({ type: 'error', message: '请输入用户名和密码以进入演示空间' })
        return
      }
      onLogin()
      return
    }
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setFeedback({ type: 'error', message: '请完整填写注册信息' })
      return
    }
    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: '两次输入的密码不一致' })
      return
    }
    setFeedback({ type: 'success', message: '注册成功，请使用新账号登录' })
    setMode('login')
    setConfirmPassword('')
  }

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode)
    setFeedback(null)
  }

  return (
    <div className="login-page">
      <div className="login-grid" />
      <div className="login-plan" />
      <div className="login-orbit login-orbit--one" />
      <div className="login-orbit login-orbit--two" />
      <div className="login-scanline" />
      <section className="login-copy">
        <div className="login-kicker"><span className="status-dot" /> DIGITAL TWIN / 01</div>
        <h1>车站商业空间<br /><em>数字化展示平台</em></h1>
        <p>用一张可以探索的平面图，连接车站空间、商业资源与未来招商决策。</p>
        <div className="login-wordmark"><span>STATION</span><span>COMMERCIAL</span><span>SPACE</span></div>
        <div className="login-specs">
          <div><span>NETWORK</span><strong>全国车站空间网络</strong></div>
          <div><span>MODE</span><strong>空间展示 · 互动原型</strong></div>
          <div><span>VERSION</span><strong>{stationCountLabel} STATIONS / 1F</strong></div>
        </div>
      </section>
      <section className={`login-panel${mode === 'register' ? ' login-panel--register' : ''}`}>
        <div className="login-panel__meta"><span>ACCESS GATE</span><span>v0.1 / DEMO</span></div>
        <div className="login-panel__heading">
          <div className="panel-icon">{mode === 'login' ? <Radio size={17} /> : <UserPlus size={17} />}</div>
          <div><div className="eyebrow">{mode === 'login' ? '欢迎进入' : '新用户注册'}</div><h2>{mode === 'login' ? '空间控制台' : '创建空间账号'}</h2></div>
        </div>
        <p className="login-panel__intro">{mode === 'login' ? '登录后查看已接入车站的商业空间图谱。' : '注册演示账号，加入车站商业空间展示网络。'}</p>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="username">用户名 <span>IDENTITY</span></label>
          <div className="input-wrap"><ScanLine size={16} /><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="请输入用户名" /></div>
          {mode === 'register' && <>
            <label className="field-label" htmlFor="email">邮箱 <span>CONTACT</span></label>
            <div className="input-wrap"><Mail size={16} /><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="请输入邮箱" /></div>
          </>}
          <label className="field-label" htmlFor="password">密码 <span>ACCESS KEY</span></label>
          <div className="input-wrap"><LockKeyhole size={16} /><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" /></div>
          {mode === 'register' && <>
            <label className="field-label" htmlFor="confirm-password">确认密码 <span>VERIFY KEY</span></label>
            <div className="input-wrap"><Check size={16} /><input id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="请再次输入密码" /></div>
          </>}
          {feedback && <div className={`form-feedback form-feedback--${feedback.type}`} role="status" aria-live="polite">{feedback.message}</div>}
          <button className="primary-button primary-button--wide" type="submit">{mode === 'login' ? '进入展示平台' : '创建演示账号'} <ArrowRight size={17} /></button>
        </form>
        <div className="login-mode-switch">
          {mode === 'login' ? <><span>还没有空间账号？</span><button type="button" onClick={() => switchMode('register')}>注册账号 <ArrowRight size={13} /></button></> : <button type="button" onClick={() => switchMode('login')}><ArrowLeft size={13} /> 返回登录</button>}
        </div>
        <div className="login-panel__footer"><span>{mode === 'login' ? 'DEMO MODE · 任意非空账号可进入' : 'DEMO MODE · 注册仅用于演示流程'}</span><span className="signal-bars"><i /><i /><i /><i /></span></div>
      </section>
      <div className="login-coordinates">GUANGDONG RAIL NETWORK <span>{stationCountLabel} CONNECTED STATIONS</span></div>
    </div>
  )
}
