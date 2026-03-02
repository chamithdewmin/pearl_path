import React from 'react';

const iconStyle = (size = 20, color = 'currentColor') => ({
  width: size,
  height: size,
  fill: color,
  stroke: color,
  flexShrink: 0,
});

export const SearchIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2M11 19a8 8 0 100-16 8 8 0 000 16z" />
  </svg>
);

export const HotelIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-3h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
  </svg>
);

export const CarIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

export const GuideIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

export const BookingIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

export const ProfileIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const LogoutIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

export const LocationIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const EditIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export const DeleteIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

export const AddIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const CameraIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0zm9 2h-2v2c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2v-2H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h2.2c.4-1.2 1.5-2 2.8-2h5c1.3 0 2.4.8 2.8 2H21c1.1 0 2 .9 2 2v6z" />
  </svg>
);

export const CheckIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export const CalendarIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
  </svg>
);

export const ChevronRightIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const StarIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const WhatsAppIcon = ({ size, color, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, color)} className={className} aria-hidden="true">
    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const GoogleIcon = ({ size = 18, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, 'currentColor')} className={className} aria-hidden="true">
    <path fill="#EA4335" d="M12 11.3v3.6h5.1C16.5 17.4 14.5 18.8 12 18.8c-3 0-5.5-2.4-5.5-5.5S9 7.8 12 7.8c1.6 0 2.9.6 3.8 1.4l2.6-2.6C16.8 5 14.6 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.7 0-.5 0-.9-.1-1.3H12z" />
  </svg>
);

export const FacebookIcon = ({ size = 18, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, 'currentColor')} className={className} aria-hidden="true">
    <path fill="#1877F2" d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.66 8.84 8.36 9.8v-6.93H8.08V12h2.28V9.79c0-2.25 1.34-3.5 3.4-3.5.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V12h2.5l-.4 2.87h-2.1v6.93C18.34 20.84 22 16.84 22 12z" />
  </svg>
);

export const AppleIcon = ({ size = 18, className }) => (
  <svg viewBox="0 0 24 24" style={iconStyle(size, 'currentColor')} className={className} aria-hidden="true">
    <path fill="#000000" d="M16.5 2c0 1-.4 1.9-1 2.6-.7.8-1.9 1.4-2.9 1.3-.1-1 .4-2 .9-2.6.7-.8 1.9-1.4 3-1.4zM19.9 8.5c-.1.1-1.9 1.1-1.9 3.1 0 2.4 2.3 3.3 2.4 3.4 0 .1-.4 1.4-1.4 2.7-.8 1.1-1.6 2.2-2.9 2.2s-1.7-.7-3.1-.7-1.8.7-3 .7-2.1-1-2.9-2.1C5.2 15.9 4 13 4 10.4c0-2.4 1.6-3.6 3.1-3.6 1 .1 1.8.7 2.4.7.6 0 1.7-.8 3-.7 1.2.1 2.3.7 3 1.7z" />
  </svg>
);

/* Booking.com-style stroke icons (18px default) */
const strokeProps = { fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' };
export const IconBed = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps}><path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/><rect x="2" y="9" width="20" height="11" rx="2"/><path d="M2 15h20"/><path d="M6 9v6"/><path d="M18 9v6"/></svg>);
export const IconPlane = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l5.5 5.5L3 14l2 2 3.5-1.5 5.5 5.5z"/></svg>);
export const IconCar = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps}><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 9h9"/></svg>);
export const IconCompass = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>);
export const IconTaxi = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps}><rect x="1" y="10" width="22" height="10" rx="2"/><path d="M5 10V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><path d="M9 5h6"/></svg>);
export const IconMapPin = () => (<svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
export const IconCalendar = () => (<svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
export const IconUsers = () => (<svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
export const IconSearch = () => (<svg width="18" height="18" viewBox="0 0 24 24" {...strokeProps} strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
export const IconHeart = ({ filled }) => (<svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#e00' : 'none'} stroke={filled ? '#e00' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>);
export const IconGlobe = () => (<svg width="16" height="16" viewBox="0 0 24 24" {...strokeProps}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>);
export const IconChevronRight = () => (<svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>);
export const IconX = () => (<svg width="14" height="14" viewBox="0 0 24 24" {...strokeProps} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
export const IconGift = () => (<svg width="30" height="30" viewBox="0 0 24 24" {...strokeProps}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>);

const Icons = {
  SearchIcon,
  HotelIcon,
  CarIcon,
  GuideIcon,
  BookingIcon,
  ProfileIcon,
  LogoutIcon,
  LocationIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  CameraIcon,
  CheckIcon,
  CalendarIcon,
  ChevronRightIcon,
  StarIcon,
  WhatsAppIcon,
  IconBed,
  IconPlane,
  IconCar,
  IconCompass,
  IconTaxi,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconSearch,
  IconHeart,
  IconGlobe,
  IconChevronRight,
  IconX,
  IconGift,
  GoogleIcon,
  FacebookIcon,
  AppleIcon,
};
export default Icons;
