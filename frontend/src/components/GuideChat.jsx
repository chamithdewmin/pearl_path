import React, { useState } from 'react';
import { GuideIcon } from './Icons';

const BOT_REPLIES = [
  "Hello! I'm your Southern Tourism guide assistant. You can ask about tours, best times to visit, or request to connect with a local guide.",
  "For Galle Fort and beaches, we recommend guides like M M Dias Kumarasiri. For Yala safari, G L Prasad Indika is an expert.",
  "You can book a guide from the Guides tab or via the All-in-One package. Would you like me to suggest a guide for your dates?",
];

export default function GuideChat() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! I'm your guide assistant. Ask me about tours, guides or destinations in the Southern Province." },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.min(messages.length % BOT_REPLIES.length, BOT_REPLIES.length - 1)];
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <div className="card-enterprise" style={s.wrapper}>
      <h2 style={s.title} className="icon-text">
        <GuideIcon size={24} color="var(--color-primary)" />
        Chat with Guide (Bot)
      </h2>
      <div style={s.messages}>
        {messages.map((msg) => (
          <div key={msg.id} style={msg.from === 'user' ? s.userBubble : s.botBubble}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={s.inputRow}>
        <input
          className="input-enterprise"
          style={s.input}
          placeholder="Ask about guides or tours..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button type="button" className="btn-primary" style={s.sendBtn} onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}

const s = {
  wrapper: { padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', maxHeight: 520 },
  title: { marginBottom: 'var(--space-4)' },
  messages: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' },
  userBubble: { alignSelf: 'flex-end', maxWidth: '80%', padding: 'var(--space-3)', background: 'var(--color-primary)', color: '#fff', borderRadius: 'var(--radius-lg)' },
  botBubble: { alignSelf: 'flex-start', maxWidth: '80%', padding: 'var(--space-3)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' },
  inputRow: { display: 'flex', gap: 'var(--space-2)' },
  input: { flex: 1, margin: 0 },
  sendBtn: { flexShrink: 0 },
};
