'use client';

import React, { useState } from 'react';
import { X, ArrowRight, Layers, Cpu, Database, Server, Smartphone, Globe, Shield, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

interface ArchitectureDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
}

interface ArchNode {
  id: string;
  title: string;
  type: 'client' | 'state' | 'backend' | 'database' | 'ai';
  tech: string;
  details: string;
}

interface ArchFlow {
  from: string;
  to: string;
  label: string;
}

interface ArchData {
  title: string;
  subtitle: string;
  nodes: ArchNode[];
  flows: ArchFlow[];
  highlights: string[];
}

const ARCHITECTURE_DATA: Record<string, ArchData> = {
  disasterlink: {
    title: 'DisasterLink Platform Architecture',
    subtitle: 'Real-Time Emergency Incident Command & SOS Workflow Architecture',
    nodes: [
      { id: 'n1', title: 'Web Dashboard', type: 'client', tech: 'Next.js 15 (React 19, TypeScript)', details: '20+ reusable components across 5 role-based route groups (Super Admin, Admin, Citizen, Volunteer)' },
      { id: 'n2', title: 'Global State Store', type: 'state', tech: 'Zustand Store', details: 'Centralized SOS state & incident command data reducing component coupling by ~40%' },
      { id: 'n3', title: 'Real-Time Emergency Gateway', type: 'backend', tech: 'Socket.IO & REST APIs', details: 'Sub-50ms WebSocket broadcast channel for instant SOS citizen dispatch' },
      { id: 'n4', title: 'GIS Command Map', type: 'ai', tech: 'Mapbox GL', details: 'Live incident mapping with spatial clustering and emergency zone boundaries' },
      { id: 'n5', title: 'Data Store', type: 'database', tech: 'REST Services API', details: 'Hydration-safe abstraction layer maintaining 100% pipeline stability' }
    ],
    flows: [
      { from: 'Web Dashboard', to: 'Global State Store', label: 'Dispatches UI Events' },
      { from: 'Global State Store', to: 'Real-Time Emergency Gateway', label: 'Socket.IO SOS Stream' },
      { from: 'Real-Time Emergency Gateway', to: 'GIS Command Map', label: 'Pushes Live Coordinates' },
      { from: 'GIS Command Map', to: 'Data Store', label: 'Syncs Incident Logs' }
    ],
    highlights: [
      'Architected 5 role-based route groups with strict layout boundaries and ARIA accessibility',
      'Configured Zustand global state with service-layer abstraction, cutting coupling by ~40%',
      'Implemented real-time Socket.IO emergency broadcasting with sub-50ms dispatch latency',
      'Resolved hydration errors to maintain 100% stable static build output'
    ]
  },
  carbonlens: {
    title: 'CarbonLens Platform Architecture',
    subtitle: 'AI-Powered Carbon Footprint Analytics & Sustainability Architecture',
    nodes: [
      { id: 'n1', title: 'Analytics UI', type: 'client', tech: 'React.js (ES6+, Tailwind CSS)', details: 'Interactive carbon logger covering transport, energy, food, and screen time' },
      { id: 'n2', title: 'Emissions Engine', type: 'state', tech: 'Chart.js Visualizations', details: 'Sub-200ms real-time chart rendering for monthly emissions trends' },
      { id: 'n3', title: 'Backend Controller', type: 'backend', tech: 'Node.js & Express.js', details: 'RESTful API controllers computing carbon equivalencies and user metrics' },
      { id: 'n4', title: 'AI Recommendation Service', type: 'ai', tech: 'AI / LLM APIs', details: 'Queries LLMs for personalized, actionable sustainability reduction strategies' },
      { id: 'n5', title: 'Sustainability DB', type: 'database', tech: 'MongoDB Atlas', details: 'Document schemas indexed for high-speed monthly aggregations' }
    ],
    flows: [
      { from: 'Analytics UI', to: 'Emissions Engine', label: 'Logs Daily Activity' },
      { from: 'Emissions Engine', to: 'Backend Controller', label: 'HTTP REST Payload' },
      { from: 'Backend Controller', to: 'AI Recommendation Service', label: 'Sends Emissions Prompt' },
      { from: 'Backend Controller', to: 'Sustainability DB', label: 'Stores Document Log' }
    ],
    highlights: [
      'Engineered React.js analytics dashboard with Chart.js maintaining sub-200ms UI feedback',
      'Integrated third-party AI/LLM APIs for automated personalized sustainability reports',
      'Modeled MongoDB Atlas schema with optimized query indexes for multi-category logging',
      'Presented platform at the Parul University Environment Hackathon 2026'
    ]
  },
  collections: {
    title: 'Collections Mobile Architecture',
    subtitle: 'Cross-Platform Flutter Fashion E-Commerce Architecture',
    nodes: [
      { id: 'n1', title: 'Flutter Mobile App', type: 'client', tech: 'Flutter & Dart UI', details: 'Cross-platform mobile UX with product catalog, cart, wishlist, and profile views' },
      { id: 'n2', title: 'State & Navigation', type: 'state', tech: 'Riverpod & GoRouter', details: 'Reactive StateNotifier providers managing cart mutations and declarative routing' },
      { id: 'n3', title: 'Catalog REST API', type: 'backend', tech: 'Node.js & Express.js', details: 'High-speed REST API controllers handling order authentication and product inventory' },
      { id: 'n4', title: 'E-Commerce Database', type: 'database', tech: 'MongoDB', details: 'Catalog schema, user wishlist collections, and order transaction documents' }
    ],
    flows: [
      { from: 'Flutter Mobile App', to: 'State & Navigation', label: 'Riverpod State Binding' },
      { from: 'State & Navigation', to: 'Catalog REST API', label: 'HTTPS JSON Request' },
      { from: 'Catalog REST API', to: 'E-Commerce Database', label: 'MongoDB CRUD Operations' }
    ],
    highlights: [
      'Engineered cross-platform mobile shopping UX with Flutter, Dart & Riverpod state management',
      'Implemented GoRouter navigation, cart/wishlist state persistence & secure auth flows',
      'Modeled Node.js, Express.js & MongoDB REST API backend for real-time catalog & order processing',
      'Created intuitive modern UI featuring 4 screenshot gallery screens'
    ]
  },
  terralife: {
    title: 'Terralife Android Architecture',
    subtitle: 'Native Java Android & On-Device ML Architecture',
    nodes: [
      { id: 'n1', title: 'Native Java Android App', type: 'client', tech: 'Java & Android SDK', details: 'Constructed native project structure with Material Design components' },
      { id: 'n2', title: 'Camera & Navigation', type: 'state', tech: 'CameraX & Jetpack Navigation', details: 'Real-time CameraX image capture buffer with seamless screen navigation' },
      { id: 'n3', title: 'On-Device ML Engine', type: 'ai', tech: 'Google ML Kit Vision', details: 'On-device plant species image labeling achieving ~90% recognition accuracy' },
      { id: 'n4', title: 'Cloud Backend', type: 'database', tech: 'Firebase (Auth, Firestore, Storage)', details: 'Secure user authentication, plant history documents, and cloud image storage' }
    ],
    flows: [
      { from: 'Native Java Android App', to: 'Camera & Navigation', label: 'Captures Frame Buffer' },
      { from: 'Camera & Navigation', to: 'On-Device ML Engine', label: 'Feeds InputImage Bitmap' },
      { from: 'On-Device ML Engine', to: 'Cloud Backend', label: 'Syncs Firestore & Storage' }
    ],
    highlights: [
      'Constructed complete Java Android project structure with Firebase Auth, Firestore & Storage',
      'Implemented ML Kit on-device image labeling achieving ~90% plant recognition accuracy',
      'Integrated CameraX real-time frame capture buffer and Jetpack Navigation UI flows',
      'Fixed Gradle conflicts and MaterialCardView crashes, reducing crash rate by ~40%'
    ]
  }
};

export function ArchitectureDiagramModal({ isOpen, onClose, projectSlug }: ArchitectureDiagramModalProps) {
  const { playClick, playHover } = useSoundFX();

  if (!isOpen) return null;

  const data = ARCHITECTURE_DATA[projectSlug] || ARCHITECTURE_DATA.disasterlink;

  const getNodeBadgeColor = (type: ArchNode['type']) => {
    switch (type) {
      case 'client':
        return 'bg-[#4F8EFF] text-[#111111]';
      case 'state':
        return 'bg-[#FFD54F] text-[#111111]';
      case 'backend':
        return 'bg-[#8BFFB0] text-[#111111]';
      case 'ai':
        return 'bg-[#FF8A8A] text-[#111111]';
      case 'database':
        return 'bg-[#C0AFFF] text-[#111111]';
    }
  };

  const getNodeIcon = (type: ArchNode['type']) => {
    switch (type) {
      case 'client':
        return <Smartphone className="w-5 h-5" />;
      case 'state':
        return <Layers className="w-5 h-5" />;
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'ai':
        return <Sparkles className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
    }
  };

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-4 border-[#111111] neo-shadow-hard text-[#111111] p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 bg-[#FF8A8A] text-[#111111] border-2 border-[#111111] hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-8 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD54F] border-2 border-[#111111] font-mono text-xs font-black uppercase neo-shadow-premium">
            <Layers className="w-4 h-4 text-[#111111]" />
            <span>INTERACTIVE SYSTEM ARCHITECTURE FLOW</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#111111]">
            {data.title}
          </h2>
          <p className="font-sans text-sm font-medium text-[#111111]/80">
            {data.subtitle}
          </p>
        </div>

        {/* Visual Architecture Flow Diagram Nodes */}
        <div className="space-y-6 mb-10">
          <h4 className="font-display font-black text-base uppercase text-[#111111] flex items-center gap-2 border-b-2 border-[#111111] pb-2">
            <Zap className="w-5 h-5 text-[#4F8EFF]" />
            <span>END-TO-END SYSTEM DATA FLOW</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.nodes.map((node, index) => (
              <div
                key={node.id}
                className="p-5 bg-[#FFF9F0] border-4 border-[#111111] neo-shadow-premium space-y-3 relative group hover:-translate-y-1 transition-transform"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] font-black text-[#111111]/60">NODE #{index + 1}</span>
                  <span className={`px-2.5 py-0.5 border border-[#111111] font-mono text-[10px] font-black uppercase ${getNodeBadgeColor(node.type)}`}>
                    {node.type}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="p-2 bg-[#111111] text-white border border-[#111111]">
                    {getNodeIcon(node.type)}
                  </div>
                  <div>
                    <h5 className="font-display font-black text-base text-[#111111]">{node.title}</h5>
                    <p className="font-mono text-[11px] font-bold text-[#4F8EFF]">{node.tech}</p>
                  </div>
                </div>

                <p className="font-sans text-xs font-medium text-[#111111]/80 leading-relaxed pt-2 border-t border-[#111111]/15">
                  {node.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Pipeline Connections */}
        <div className="space-y-4 mb-10 p-5 bg-[#111111] text-white border-4 border-[#111111] neo-shadow-premium">
          <h4 className="font-display font-black text-base uppercase text-[#8BFFB0] flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span>DATA PIPELINE PROTOCOLS & LATENCY SPECS</span>
          </h4>

          <div className="space-y-2.5 font-mono text-xs">
            {data.flows.map((flow, i) => (
              <div key={i} className="p-3 bg-white/10 border border-white/20 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-[#FFD54F]">{flow.from}</span>
                  <ArrowRight className="w-4 h-4 text-white/50" />
                  <span className="text-[#8BFFB0]">{flow.to}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#4F8EFF] text-[#111111] font-black text-[10px] uppercase border border-white">
                  {flow.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Engineering Rationale Highlights */}
        <div className="space-y-4 p-5 bg-white border-4 border-[#111111] neo-shadow-premium">
          <h4 className="font-display font-black text-base uppercase text-[#111111] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FFD54F]" />
            <span>KEY ARCHITECTURE DESIGN DECISIONS</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.highlights.map((h, i) => (
              <div key={i} className="p-3.5 bg-[#FFF9F0] border-2 border-[#111111] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#8BFFB0] shrink-0 stroke-[3] mt-0.5" />
                <span className="font-sans text-xs font-semibold leading-relaxed">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
