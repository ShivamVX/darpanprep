/**
 * DARPANPREP APPLICATION NAVBAR
 * Responsive glassmorphism header with navigation links, free usage ticker, language picker, and auth state.
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { useUsage } from '../../providers/UsageProvider';
import { INDIAN_LANGUAGES } from '../../data/exams';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { remainingInterviews, totalAllowed, openUpgradeModal } = useUsage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Exams', path: '/exams' },
    { label: 'Placement', path: '/placement' },
    { label: 'Communication', path: '/communication' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Resources', path: '/resources' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E17]/95 backdrop-blur-xl border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-9 h-9 rounded-xl bg-[#0B1020] border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-colors">
            <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6">
              <rect width="40" height="40" rx="10" fill="#0B0F19"/>
              <path d="M12 10H20C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30H12V10Z" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 16H20C22.2091 16 24 17.7909 24 20C24 22.2091 22.2091 24 20 24H16V16Z" fill="#F59E0B"/>
              <circle cx="28" cy="12" r="2.5" fill="#FBBF24"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight tracking-tight text-white group-hover:text-amber-400 transition-colors">
              DarpanPrep
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider">
              Practice Today &bull; Reflect Tomorrow
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Free Interview Quota Counter */}
          <button
            onClick={openUpgradeModal}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer"
            title="Click to view upgrade plans"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Free: {remainingInterviews}/{totalAllowed}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111726] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/5">
                  Interview Language
                </div>
                {INDIAN_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-amber-500/15 hover:text-amber-400 flex items-center justify-between transition-colors"
                  >
                    <span>{lang.label}</span>
                    <span className="text-xs">{lang.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[80px] truncate">{user?.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-all"
            >
              Login
            </Link>
          )}

          {/* Start Free Practice CTA */}
          <button
            onClick={() => navigate('/interview/setup')}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold tracking-tight shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Start Free Practice &rarr;
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => navigate('/interview/setup')}
            className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold"
          >
            Start
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-[#0B1020] border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs text-amber-400 font-semibold">
              Free Interviews: {remainingInterviews}/{totalAllowed}
            </span>
            {isAuthenticated ? (
              <Link to="/profile" className="text-xs text-slate-300 underline">
                My Profile ({user?.name})
              </Link>
            ) : (
              <Link to="/login" className="text-xs text-amber-400 font-semibold">
                Login / Register
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
