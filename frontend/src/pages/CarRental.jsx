import React from 'react';
import { Link } from 'react-router-dom';

const CARS = [
  { id: 1, name: 'Luxury Toyota Premio', client: 'Speed Cabs', price: 'LKR 85/km', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80' },
  { id: 2, name: 'Off-Road Safari Jeep', client: 'Vihan Poojan', price: 'LKR 15,000/Tour', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80' },
  { id: 3, name: 'Toyota Hiace Van', client: 'Southern Travels', price: 'LKR 120/km', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 4, name: 'Sedan AC', client: 'Galle Cabs', price: 'LKR 75/km', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80' },
  { id: 5, name: 'Mini Van 7 Seater', client: 'Matara Tours', price: 'LKR 95/km', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80' },
  { id: 6, name: 'Luxury SUV', client: 'Hambantota Rentals', price: 'LKR 150/km', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
];

export default function CarRental() {
  return (
    <div className="main-booking">
      <section className="sec-booking">
        <h1 className="sec-t-booking">Car rental</h1>
        <p className="sec-sub-booking">Rent a car or jeep for your trip across Southern Sri Lanka. Book with us or add to your All-in-One package.</p>
        <div className="list-grid-booking">
          {CARS.map((car) => (
            <div key={car.id} className="list-card-booking">
              <div className="list-card-img-booking">
                <img src={car.img} alt={car.name} />
              </div>
              <div className="list-card-b-booking">
                <h3>{car.name}</h3>
                <p className="list-card-meta-booking">{car.client}</p>
                <p className="list-card-price-booking">{car.price}</p>
                <Link to="/all-in-one" className="list-card-btn-booking">Book or add to package</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
