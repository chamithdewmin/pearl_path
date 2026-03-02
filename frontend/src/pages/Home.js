import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconSearch,
  IconHeart,
  IconChevronRight,
  IconX,
  IconGift,
} from '../components/Icons';

// Image URLs (Unsplash)
const I = {
  galle: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80',
  matara: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  hambantota: 'https://images.unsplash.com/photo-1578645510447-e20b4656919f?w=800&q=80',
  nuwara: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
  negombo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  ella: 'https://images.unsplash.com/photo-1609252509102-aa0ece2e3d66?w=800&q=80',
  hotel1: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
  hotel2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  hotel3: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  hotel4: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  typeHotel: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  typeApt: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
  typeResort: 'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80',
  typeVilla: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=600&q=80',
  cabin: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80',
  tree: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
  tiny: 'https://images.unsplash.com/photo-1520127629-d73a64ed8e39?w=600&q=80',
  redHouse: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
  home1: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  home2: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  home3: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
  home4: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  safari: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
};

const stillInterested = [
  { name: 'Yala Safari Stay', loc: 'Tissamaharama, Sri Lanka', rating: '8.7', reviews: '109 reviews', img: I.safari },
  { name: 'Galle Fort Hotel', loc: 'Galle, Sri Lanka', rating: '8.5', reviews: '375 reviews', img: I.hotel2 },
  { name: 'Coral Reef Beach Hotel', loc: 'Negombo, Sri Lanka', rating: '8.2', reviews: '204 reviews', img: I.beach },
  { name: 'Ella Rock Boutique', loc: 'Ella, Sri Lanka', rating: '9.0', reviews: '88 reviews', img: I.hotel3 },
];

const weekendDeals = [
  { name: 'Kandy Myst by Cinnamon', loc: 'Kandy, Sri Lanka', rating: '8.7', reviews: '311 reviews', price: 'LKR 53,492', orig: 'LKR 77,244', img: I.hotel1, deal: 'Great value', dType: 'gv' },
  { name: '360 Viewpoint Queens Mount', loc: 'Kandy, Sri Lanka', rating: '9.1', reviews: '148 reviews', price: 'LKR 16,390', orig: 'LKR 21,000', img: I.hotel2, deal: 'Genius', dType: 'gn' },
  { name: 'Viyona Boutique Hotel', loc: 'Kandy, Sri Lanka', rating: '9.3', reviews: '72 reviews', price: 'LKR 42,550', orig: null, img: I.hotel3, deal: 'Top pick', dType: 'tp' },
  { name: 'The Darwin Heights', loc: 'Kandy, Sri Lanka', rating: '8.5', reviews: '13 reviews', price: 'LKR 35,623', orig: 'LKR 46,000', img: I.hotel4, deal: null, dType: '' },
];

const uniqueProps = [
  { name: 'Domki Wierzyki Shelters', loc: 'Galle · Superb', img: I.cabin },
  { name: 'Kenzoa w Dolinie', loc: 'Matara · Superb', img: I.tree },
  { name: 'Tiny House Dreischwesternherz', loc: 'Hambantota · Superb', img: I.tiny },
  { name: 'Das rote Haus Mintern Daich', loc: 'Galle · Wonderful', img: I.redHouse },
];

const homesLove = [
  { name: 'Aparthotel Stare Miasto', loc: 'Galle Fort, Galle', rating: '8.5', label: 'Excellent', price: 'LKR 37,392', img: I.home1 },
  { name: 'The Apartments by The Sloane Club', loc: 'Matara City', rating: '9.2', label: 'Superb', price: 'LKR 96,369', img: I.home2 },
  { name: 'Cheval Three Quays at The Tower', loc: 'Hambantota', rating: '8.9', label: 'Wonderful', price: 'LKR 129,712', img: I.home3 },
  { name: 'Oriente Palace Apartments', loc: 'Galle City Center', rating: '8.6', label: 'Excellent', price: 'LKR 34,981', img: I.home4 },
];

const propertyTypes = [
  { label: 'Hotels', img: I.typeHotel, to: '/all-in-one' },
  { label: 'Apartments', img: I.typeApt, to: '/all-in-one' },
  { label: 'Resorts', img: I.typeResort, to: '/all-in-one' },
  { label: 'Villas', img: I.typeVilla, to: '/all-in-one' },
];

const popularLinks = [
  'Galle hotels', 'Matara hotels', 'Hambantota hotels', 'Kandy hotels',
  'Negombo hotels', 'Hikkaduwa hotels', 'Nuwara Eliya hotels', 'Ella hotels',
  'Mirissa hotels', 'Unawatuna hotels', 'Arugam Bay hotels', 'Weligama hotels',
];

export default function Home() {
  const [dest, setDest] = useState('Galle');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [trendTab, setTrendTab] = useState('Popular');
  const [popTab, setPopTab] = useState('Popular cities');
  const [wishlist, setWishlist] = useState({});
  const [ctaVal, setCtaVal] = useState('');

  const toggleWish = (id) => setWishlist((p) => ({ ...p, [id]: !p[id] }));

  return (
    <>
      {/* HERO */}
      <div className="hero-booking">
        <h1>Find your next stay</h1>
        <p>Search deals on hotels, homes, and much more across Southern Sri Lanka</p>

        <div className="sb-booking">
          <div className="sb-f-booking dest">
            <span className="sb-ico-booking"><IconMapPin /></span>
            <input
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              placeholder="Where are you going?"
            />
            {dest && (
              <button type="button" className="sb-clr-booking" onClick={() => setDest('')} aria-label="Clear destination">
                <IconX />
              </button>
            )}
          </div>
          <div className="sb-sep-booking" />
          <div className="sb-f-booking date">
            <span className="sb-ico-booking"><IconCalendar /></span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={{ border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14, background: 'transparent', width: '100%', color: checkIn ? '#1a1a2e' : '#aaa' }}
            />
          </div>
          <div className="sb-sep-booking" />
          <div className="sb-f-booking date">
            <span className="sb-ico-booking"><IconCalendar /></span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={{ border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14, background: 'transparent', width: '100%', color: checkOut ? '#1a1a2e' : '#aaa' }}
            />
          </div>
          <div className="sb-sep-booking" />
          <div className="sb-f-booking guests">
            <span className="sb-ico-booking"><IconUsers /></span>
            <span className="sb-gt-booking">2 adults · 0 children · 1 room</span>
          </div>
          <Link to="/all-in-one" className="sbtn-booking"><IconSearch /> Search</Link>
        </div>
        <div className="hero-spacer-booking" />
      </div>

      {/* MAIN */}
      <div className="main-booking">

        {/* Still interested */}
        <section className="sec-booking">
          <div className="sec-hd-booking">
            <div className="sec-t-booking">Still interested in these properties?</div>
            <Link to="/all-in-one" className="see-all-booking">See all <IconChevronRight /></Link>
          </div>
          <div className="row-booking">
            {stillInterested.map((p, i) => (
              <Link to="/all-in-one" className="pc-booking" key={i}>
                <img src={p.img} alt={p.name} />
                <button type="button" className="wbtn-booking" onClick={(e) => { e.preventDefault(); toggleWish(`s${i}`); }} aria-label="Wishlist"><IconHeart filled={wishlist[`s${i}`]} /></button>
                <div className="pc-b-booking">
                  <h3>{p.name}</h3>
                  <div className="ploc-booking">{p.loc}</div>
                  <div className="rrow-booking">
                    <span className="rbadge-booking">{p.rating}</span>
                    <span className="rlabel-booking">Wonderful</span>
                    <span className="rcnt-booking">{p.reviews}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by property type */}
        <section className="sec-booking">
          <div className="sec-t-booking" style={{ marginBottom: 16 }}>Browse by property type</div>
          <div className="tgrid-booking">
            {propertyTypes.map((t, i) => (
              <Link to={t.to} className="tc-booking" key={i}>
                <img src={t.img} alt={t.label} />
                <div className="tc-ov-booking">{t.label}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending destinations */}
        <section className="sec-booking">
          <div className="sec-t-booking">Trending destinations</div>
          <div className="sec-sub-booking">Popular destinations to kickstart your planning</div>
          <div className="ttabs-booking">
            {['Popular', 'Explore Sri Lanka', 'Culinary Adventures', 'Adventurous Activities', 'Romantic Getaways', 'More ▾'].map((t) => (
              <button key={t} type="button" className={`ttab-booking ${trendTab === t ? 'active' : ''}`} onClick={() => setTrendTab(t)}>{t}</button>
            ))}
          </div>
          <div className="dg2-booking">
            {[
              { name: 'Galle', img: I.galle, slug: 'galle' },
              { name: 'Matara', img: I.matara, slug: 'matara' },
            ].map((d) => (
              <Link to={`/provinces/${d.slug}`} className="dc-booking big" key={d.slug}>
                <img src={d.img} alt={d.name} />
                <div className="dov-booking"><div className="dn-booking big">{d.name} <span className="fbadge-booking">🔥</span></div></div>
              </Link>
            ))}
          </div>
          <div className="dg4-booking">
            {[
              { name: 'Hambantota', img: I.hambantota, slug: 'hambantota' },
              { name: 'Nuwara Eliya', img: I.nuwara },
              { name: 'Ella', img: I.ella },
              { name: 'Negombo', img: I.negombo },
            ].map((d, i) => (
              <Link to={d.slug ? `/provinces/${d.slug}` : '/provinces'} className="dc-booking sm" key={d.name}>
                <img src={d.img} alt={d.name} />
                <div className="dov-booking"><div className="dn-booking sm">{d.name} <span className="fbadge-booking">🔥</span></div></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Weekend deals */}
        <section className="sec-booking">
          <div className="sec-hd-booking">
            <div>
              <div className="sec-t-booking">Deals for the weekend</div>
              <div className="sec-sub-booking" style={{ marginBottom: 0 }}>Save on stays. Search and book your next trip.</div>
            </div>
            <Link to="/all-in-one" className="see-all-booking">See all <IconChevronRight /></Link>
          </div>
          <div className="row-booking" style={{ marginTop: 16 }}>
            {weekendDeals.map((p, i) => (
              <Link to="/all-in-one" className="pc-booking" key={i} style={{ minWidth: 240, maxWidth: 240 }}>
                <img src={p.img} alt={p.name} />
                <button type="button" className="wbtn-booking" onClick={(e) => { e.preventDefault(); toggleWish(`w${i}`); }} aria-label="Wishlist"><IconHeart filled={wishlist[`w${i}`]} /></button>
                <div className="pc-b-booking">
                  {p.deal && <span className={`dtag-booking ${p.dType}`}>{p.deal}</span>}
                  <h3>{p.name}</h3>
                  <div className="ploc-booking">{p.loc}</div>
                  <div className="rrow-booking">
                    <span className="rbadge-booking">{p.rating}</span>
                    <span className="rlabel-booking">Wonderful</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{p.reviews}</div>
                  <div className="pprice-booking">
                    {p.orig && <span className="porig-booking">{p.orig}</span>}
                    {p.price}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>2 nights, 2 adults</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Unique properties */}
        <section className="sec-booking">
          <div className="sec-hd-booking">
            <div>
              <div className="sec-t-booking">Stay at our top unique properties</div>
              <div className="sec-sub-booking" style={{ marginBottom: 0 }}>From villas and cabins to beach houses across the South</div>
            </div>
            <Link to="/all-in-one" className="see-all-booking">See all <IconChevronRight /></Link>
          </div>
          <div className="ugrid-booking" style={{ marginTop: 16 }}>
            {uniqueProps.map((u, i) => (
              <Link to="/all-in-one" className="uc-booking" key={i}>
                <img src={u.img} alt={u.name} />
                <div className="uc-b-booking"><h4>{u.name}</h4><p>{u.loc}</p></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Homes guests love */}
        <section className="sec-booking">
          <div className="sec-hd-booking">
            <div className="sec-t-booking">Homes guests love</div>
            <Link to="/all-in-one" className="see-all-booking">Discover homes <IconChevronRight /></Link>
          </div>
          <div className="row-booking">
            {homesLove.map((h, i) => (
              <Link to="/all-in-one" className="hc-booking" key={i}>
                <img src={h.img} alt={h.name} />
                <button type="button" className="wbtn-booking" onClick={(e) => { e.preventDefault(); toggleWish(`h${i}`); }} aria-label="Wishlist"><IconHeart filled={wishlist[`h${i}`]} /></button>
                <div className="hc-b-booking">
                  <h4>{h.name}</h4>
                  <div className="hloc-booking">{h.loc}</div>
                  <div className="rrow-booking">
                    <span className="rbadge-booking">{h.rating}</span>
                    <span className="rlabel-booking">{h.label}</span>
                  </div>
                  <div className="hprice-booking">Starting from {h.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="sec-booking">
          <div className="cta-booking">
            <div>
              <h2>Want to feel at home on your next adventure?</h2>
              <div className="cta-form-booking">
                <input className="cta-inp-booking" placeholder="Discover vacation rentals" value={ctaVal} onChange={(e) => setCtaVal(e.target.value)} />
                <Link to="/all-in-one" className="cta-btn-booking">Discover</Link>
              </div>
            </div>
            <svg width="150" height="130" viewBox="0 0 150 130" fill="none" aria-hidden="true">
              <ellipse cx="75" cy="122" rx="55" ry="7" fill="#b8d4f0" opacity="0.5" />
              <rect x="28" y="66" width="94" height="32" rx="10" fill="#febb02" />
              <rect x="33" y="22" width="84" height="48" rx="10" fill="#f5a623" />
              <rect x="20" y="57" width="20" height="38" rx="8" fill="#f5a623" />
              <rect x="110" y="57" width="20" height="38" rx="8" fill="#f5a623" />
              <rect x="38" y="96" width="12" height="22" rx="4" fill="#c67c00" />
              <rect x="100" y="96" width="12" height="22" rx="4" fill="#c67c00" />
              <rect x="38" y="26" width="74" height="14" rx="5" fill="rgba(255,255,255,.22)" />
            </svg>
          </div>
        </section>

        {/* Travel more banner */}
        <section className="sec-booking">
          <div className="tbanner-booking">
            <div>
              <h2>Travel more, spend less</h2>
              <p>Sign in to save on stays and packages.<br />Register to book hotels, rent cars and chat with guides.</p>
              <div className="tbtns-booking">
                <Link to="/signin" className="tb-p-booking">Sign in</Link>
                <Link to="/signup" className="tb-o-booking">Register</Link>
              </div>
            </div>
            <div className="gbadge-booking">
              <IconGift />
              <div className="gbadge-t-booking">
                <div>GENIUS</div>
                <div>Level 1</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular with travelers */}
        <section className="sec-booking">
          <div className="sec-t-booking" style={{ marginBottom: 16 }}>Popular with travelers from Sri Lanka</div>
          <div className="ptabs-booking">
            {['Popular cities', 'International cities', 'Regions', 'Countries', 'Places to stay'].map((t) => (
              <button key={t} type="button" className={`ptab-booking ${popTab === t ? 'active' : ''}`} onClick={() => setPopTab(t)}>{t}</button>
            ))}
          </div>
          <div className="plinks-booking">
            {popularLinks.map((l, i) => (
              <Link to="/all-in-one" className="plink-booking" key={i}>{l}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
