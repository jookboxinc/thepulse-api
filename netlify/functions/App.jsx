import React, { useEffect, useState } from 'react'

const TABS = ['dashboard','events','library','lounge']

export default function App() {
  const [tab, setTab] = useState(() => (location.hash.replace('#/','') || 'dashboard'))
  useEffect(() => {
    const onHash = () => setTab(location.hash.replace('#/','') || 'dashboard')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goto = (name) => {
    if (location.hash !== `#/${name}`) location.hash = `#/${name}`
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">Pulse+</div>
        <nav className="tabs" role="tablist" aria-label="Dashboard navigation">
          {TABS.map(name => (
            <button
              key={name}
              className={`tab ${tab===name?'active':''}`}
              role="tab"
              aria-selected={tab===name}
              tabIndex={tab===name?0:-1}
              onClick={() => goto(name)}>
              {name.charAt(0).toUpperCase()+name.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main className="content" role="tabpanel">
        {tab==='dashboard' && <Dashboard />}
        {tab==='events' && <Events />}
        {tab==='library' && <Library />}
        {tab==='lounge' && <Lounge />}
      </main>

      <div id="pulse-announcements" className="sr-only" aria-live="polite" aria-atomic="true"></div>
    </div>
  )
}

function Card({title, children}){
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function Dashboard(){
  const [metrics,setMetrics] = useState({events:'-', reads:'-', downloads:'-', members:'-'})
  useEffect(()=>{
    const t = setTimeout(()=> setMetrics({events:7, reads:12, downloads:5, members:2450}), 800)
    return ()=>clearTimeout(t)
  },[])
  return (
    <div className="grid">
      <Card title="Events">{metrics.events}</Card>
      <Card title="Reads">{metrics.reads}</Card>
      <Card title="Downloads">{metrics.downloads}</Card>
      <Card title="Members">{metrics.members}</Card>
    </div>
  )
}

function Events(){
  const [list,setList] = useState(null)
  useEffect(()=>{
    const t = setTimeout(()=> setList([
      {id:'ev1', title:'Founder AMA', when:'Tue 6pm', where:'Zoom', rsvp:false},
      {id:'ev2', title:'Design Crit', when:'Wed 12pm', where:'HQ', rsvp:true},
      {id:'ev3', title:'Community Meetup', when:'Fri 5pm', where:'Cafe', rsvp:false},
    ]), 600)
    return ()=>clearTimeout(t)
  },[])
  if(!list) return <div className="skeleton stack-3" />
  return (
    <div className="stack">
      {list.map(ev => (
        <div className="row" key={ev.id}>
          <div>
            <div className="title">{ev.title}</div>
            <div className="meta">{ev.when} • {ev.where}</div>
          </div>
          <div>
            {ev.rsvp ? <span className="badge ok">RSVP’d ✓</span> : <button className="btn">RSVP</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

function Library(){
  const items = [
    {id:'p1', title:'Deep Dive: Growth Loops', type:'PDF'},
    {id:'p2', title:'Pulse+ Exclusive: Founder Story', type:'Audio'},
  ]
  return (
    <div className="stack">
      {items.map(it => (
        <div className="row" key={it.id}>
          <div>
            <div className="title">{it.title}</div>
            <div className="meta">{it.type}</div>
          </div>
          <div><button className="btn ghost">Open</button></div>
        </div>
      ))}
    </div>
  )
}

function Lounge(){
  return (
    <div className="center">
      <p>Single Sign-On coming soon. Use the Direct Link if SSO fails.</p>
      <button className="btn">Connect</button>
      <a className="btn ghost" href="#">Direct Link</a>
    </div>
  )
}
