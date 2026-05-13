import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  IconCalendar,
  IconMapPin,
  IconClock,
  IconBriefcase,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail
} from '@tabler/icons-react';
import { useTheme } from '../theme/ThemeProvider';


function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export function ProfileWidgets({ currentTime }: { currentTime: Date }) {
  const { theme } = useTheme();
  const hauCoordinates: [number, number] = [15.1400, 120.5901];

  const mapUrl = theme === 'latte'
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <>
      {/* Availability Card */}
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-theme-accent/40 bg-theme-bg p-5 shadow-lg transition-all hover:border-theme-accent/70 lg:col-span-1">
        {/* Decorative Background Kanji */}
        <span className="absolute -right-2 -bottom-2 select-none text-[8rem] font-black leading-none text-theme-accent/[0.08] transition-all duration-700 group-hover:text-theme-accent/[0.15] group-hover:scale-110">
          稼働
        </span>

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center gap-3">
            <div className="h-4 w-[2px] bg-theme-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-theme-accent">Status: Active</span>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2 text-theme-text-muted mb-1">
              <IconBriefcase size={14} />
              <span className="text-[11px] font-mono tracking-tighter uppercase">Role: [Internship]</span>
            </div>
            <h3 className="text-3xl font-black tracking-tighter text-theme-text leading-tight">
              OPEN FOR <br /> <span className="text-theme-accent">WORK</span>
            </h3>
          </div>

          <div className="mt-auto pt-6 flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </div>
            <span className="text-[10px] font-bold text-theme-text-muted uppercase">Available</span>
          </div>
        </div>
      </div>

      {/* Let's Connect Card */}
      <div className="group flex flex-col rounded-xl border border-theme-accent/40 bg-theme-bg p-4 shadow-lg transition-all hover:border-theme-accent/70 lg:col-span-1">
        <div className="mb-4 flex items-center gap-2 text-theme-text">
          <IconCalendar size={20} stroke={2} className="text-theme-accent" />
          <h3 className="text-sm font-semibold tracking-tight opacity-80">Contact Me</h3>
        </div>
        <p className="mb-auto text-[13px] leading-relaxed text-theme-text-muted">
          Let's connect and explore new opportunities together.
        </p>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://github.com/Zankcry"
              target="_blank"
              rel="noopener noreferrer"
              className="group/icon flex h-14 w-full flex-col items-center justify-center gap-1 rounded-xl border border-theme-border/40 bg-theme-surface/40 text-theme-text-muted transition-all hover:border-theme-accent/40 hover:bg-theme-surface/70 hover:text-theme-accent"
              title="GitHub"
            >
              <IconBrandGithub size={18} className="transition-transform group-hover/icon:scale-110" />
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 transition-opacity group-hover/icon:opacity-100">GH</span>
            </a>
            <a
              href="https://www.linkedin.com/in/james-michael-duque-100154350/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/icon flex h-14 w-full flex-col items-center justify-center gap-1 rounded-xl border border-theme-border/40 bg-theme-surface/40 text-theme-text-muted transition-all hover:border-theme-accent/40 hover:bg-theme-surface/70 hover:text-theme-accent"
              title="LinkedIn"
            >
              <IconBrandLinkedin size={18} className="transition-transform group-hover/icon:scale-110" />
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 transition-opacity group-hover/icon:opacity-100">LI</span>
            </a>
            <a
              href="mailto:duquejames657@gmail.com"
              className="group/icon flex h-14 w-full flex-col items-center justify-center gap-1 rounded-xl border border-theme-border/40 bg-theme-surface/40 text-theme-text-muted transition-all hover:border-theme-accent/40 hover:bg-theme-surface/70 hover:text-theme-accent"
              title="Email"
            >
              <IconMail size={18} className="transition-transform group-hover/icon:scale-110" />
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 transition-opacity group-hover/icon:opacity-100">MAIL</span>
            </a>
          </div>

          <a
            href="https://www.linkedin.com/in/james-michael-duque-100154350/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-theme-accent px-4 py-3.5 text-[13px] font-bold text-theme-on-accent transition-all active:scale-95 hover:brightness-110"
          >
            <span>Message Me</span>
            <IconArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Location Card - Wider on desktop */}
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-theme-accent/40 bg-theme-bg shadow-lg transition-all hover:border-theme-accent/70 sm:col-span-2 lg:col-span-2 min-h-[180px]">
        {/* Header - Absolute overlay */}
        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 text-theme-text drop-shadow-md">
          <IconMapPin size={20} stroke={2} className="text-theme-accent" />
          <h3 className="text-sm font-semibold tracking-tight opacity-90">Currently Located In</h3>
        </div>

        {/* Map - Now fills the container with full color by default */}
        <div className="absolute inset-0 z-10 grayscale-0 contrast-40 opacity-90 transition-all duration-700 ease-out group-hover:scale-110">
          <MapContainer
            center={hauCoordinates}
            zoom={13}
            scrollWheelZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ height: '100%', width: '100%', background: 'transparent' }}
          >
            <TileLayer
              url={mapUrl}
            />
            <MapRecenter center={hauCoordinates} />
          </MapContainer>
        </div>

        {/* Footer - Absolute overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between p-5 pt-4 text-theme-text drop-shadow-md">
          <div className="text-[13px] font-medium">
            Pampanga, Philippines
          </div>
          <div className="flex items-center gap-1.5 text-[12px]">
            <IconClock size={14} />
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })} <span className="opacity-70">(GMT+8)</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function BentoProfile() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ProfileWidgets currentTime={currentTime} />
    </section>
  );
}
