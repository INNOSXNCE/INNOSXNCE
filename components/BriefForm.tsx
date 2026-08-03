'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'
import { CONTACT, waLink, mailLink } from '@/lib/inno-productions'

/**
 * Client brief form.
 *
 * There is no backend: the form compiles the answers into a single formatted
 * message and hands it to WhatsApp or the user's mail client. That keeps the
 * page a static export while still giving the client a structured brief
 * instead of a blank "hi" — which is the whole point of the form.
 */

const DIM = '#7a7a7a'
const LINE = '#1a1a1a'

interface Fields {
  name: string
  type: string
  qty: string
  dur: string
  deadline: string
  footage: string
  notes: string
}

const EMPTY: Fields = { name: '', type: '', qty: '', dur: '', deadline: '', footage: '', notes: '' }

export function BriefForm() {
  const { lang } = useLang()
  const f = COPY[lang].inno.form
  const [v, setV] = useState<Fields>(EMPTY)
  const [err, setErr] = useState(false)
  const [hoverWa, setHoverWa] = useState(false)
  const [hoverMail, setHoverMail] = useState(false)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV(prev => ({ ...prev, [k]: e.target.value }))
    if (err) setErr(false)
  }

  // Only non-empty fields make it into the message, so a half-filled brief
  // still reads cleanly instead of being padded with blank labels.
  const compose = () => {
    const rows: Array<[string, string]> = [
      [f.name, v.name],
      [f.type, v.type],
      [f.qty, v.qty],
      [f.dur, v.dur],
      [f.deadline, v.deadline],
      [f.footage, v.footage],
      [f.notes, v.notes],
    ]
    const body = rows.filter(([, val]) => val.trim()).map(([k, val]) => `${k}: ${val.trim()}`).join('\n')
    return `${f.greeting}\n\n${body}`
  }

  const guard = (e: React.MouseEvent) => {
    if (v.name.trim() && v.type.trim()) return true
    e.preventDefault()
    setErr(true)
    return false
  }

  const message = compose()

  const btn = (hover: boolean): React.CSSProperties => ({
    flex: '1 1 220px',
    textAlign: 'center',
    padding: '15px 26px',
    fontFamily: 'var(--font-manrope), sans-serif',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.16em',
    textDecoration: 'none',
    background: hover ? '#fff' : 'transparent',
    color: hover ? '#000' : '#fff',
    border: '1px solid #fff',
    transition: 'background 0.12s, color 0.12s',
    cursor: 'inherit',
  })

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 18,
        }}
      >
        <Field label={f.name} hint={f.required}>
          <input value={v.name} onChange={set('name')} placeholder={f.namePh} style={inputStyle} />
        </Field>

        <Field label={f.type} hint={f.required}>
          <select value={v.type} onChange={set('type')} style={{ ...inputStyle, appearance: 'none' }}>
            <option value="">—</option>
            {f.typeOpts.map(o => (
              <option key={o} value={o} style={{ background: '#000' }}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label={f.qty} hint={f.optional}>
          <input value={v.qty} onChange={set('qty')} placeholder={f.qtyPh} inputMode="numeric" style={inputStyle} />
        </Field>

        <Field label={f.dur} hint={f.optional}>
          <input value={v.dur} onChange={set('dur')} placeholder={f.durPh} style={inputStyle} />
        </Field>

        <Field label={f.deadline} hint={f.optional}>
          <input value={v.deadline} onChange={set('deadline')} type="date" style={inputStyle} />
        </Field>

        <Field label={f.footage} hint={f.optional}>
          <input value={v.footage} onChange={set('footage')} placeholder={f.footagePh} style={inputStyle} />
        </Field>
      </div>

      <div style={{ marginTop: 18 }}>
        <Field label={f.notes} hint={f.optional}>
          <textarea value={v.notes} onChange={set('notes')} placeholder={f.notesPh} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>
      </div>

      {err && (
        <div
          role="alert"
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 12,
            letterSpacing: '0.04em',
            color: '#c83232',
          }}
        >
          {f.missing}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26 }}>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={guard}
          onMouseEnter={() => setHoverWa(true)}
          onMouseLeave={() => setHoverWa(false)}
          style={btn(hoverWa)}
        >
          {f.sendWa}
        </a>
        <a
          href={mailLink(f.subject, message)}
          onClick={guard}
          onMouseEnter={() => setHoverMail(true)}
          onMouseLeave={() => setHoverMail(false)}
          style={{ ...btn(hoverMail), borderColor: LINE, color: hoverMail ? '#000' : DIM }}
        >
          {f.sendMail}
        </a>
      </div>

      <div
        style={{
          marginTop: 16,
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 10,
          letterSpacing: '0.1em',
          color: '#3a3a3a',
        }}
      >
        {CONTACT.hours[lang]}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 13px',
  background: '#000',
  border: `1px solid ${LINE}`,
  color: '#fff',
  fontFamily: 'var(--font-manrope), sans-serif',
  fontSize: 13,
  outline: 'none',
  borderRadius: 0,
  cursor: 'inherit',
}

function Field({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 8,
          fontFamily: 'var(--font-manrope), sans-serif',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: DIM,
          textTransform: 'uppercase',
        }}
      >
        <span>{label}</span>
        <span style={{ color: '#333', letterSpacing: '0.1em', textTransform: 'lowercase' }}>{hint}</span>
      </span>
      {children}
    </label>
  )
}
