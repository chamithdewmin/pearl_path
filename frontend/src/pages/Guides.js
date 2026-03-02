import React from 'react';
import { Link } from 'react-router-dom';

const GUIDES = [
  { id: 1, name: 'M M Dias Kumarasiri', skills: 'Historical, Cultural', status: 'Available', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { id: 2, name: 'G L Prasad Indika', skills: 'Wildlife, Yala', status: 'On Tour', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { id: 3, name: 'K A Sandun Perera', skills: 'Galle Fort, Beaches', status: 'Available', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: 4, name: 'Nimali Jayawardena', skills: 'Tea Trails, Nuwara Eliya', status: 'Available', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80' },
  { id: 5, name: 'Ruwan Silva', skills: 'Diving, Marine', status: 'Available', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { id: 6, name: 'Chamari Fernando', skills: 'Cultural, Temples', status: 'On Tour', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
];

export default function Guides() {
  return (
    <div className="main-booking">
      <section className="sec-booking">
        <h1 className="sec-t-booking">Guides</h1>
        <p className="sec-sub-booking">Experienced local guides for history, wildlife, culture and adventure across the Southern provinces.</p>
        <div className="list-grid-booking">
          {GUIDES.map((g) => (
            <div key={g.id} className="list-card-booking">
              <div className="list-card-img-booking list-card-img-round-booking">
                <img src={g.img} alt={g.name} />
              </div>
              <div className="list-card-b-booking">
                <h3>{g.name}</h3>
                <p className="list-card-meta-booking">{g.skills}</p>
                <span className={`list-card-badge-booking ${g.status === 'Available' ? 'available' : 'ontour'}`}>{g.status}</span>
                <Link to="/all-in-one" className="list-card-btn-booking">Book or add to package</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
