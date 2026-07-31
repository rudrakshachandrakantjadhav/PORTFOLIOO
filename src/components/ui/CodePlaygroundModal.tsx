'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code2, Terminal, FileCode2 } from 'lucide-react';
import { useSoundFX } from '@/components/providers/SoundProvider';

export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  code: string;
  description: string;
}

export interface ProjectSnippets {
  projectId: string;
  projectTitle: string;
  snippets: CodeSnippet[];
}

export const PROJECT_CODE_DATA: Record<string, ProjectSnippets> = {
  disasterlink: {
    projectId: 'disasterlink',
    projectTitle: 'DisasterLink Platform',
    snippets: [
      {
        id: 'dl-store',
        filename: 'store/useDisasterStore.ts',
        language: 'typescript',
        description: 'Zustand global state store managing real-time emergency SOS dispatch, active rescue teams, and role-based incident command state.',
        code: `import { create } from 'zustand';

export interface SOSIncident {
  id: string;
  location: { lat: number; lng: number };
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  status: 'PENDING' | 'DISPATCHED' | 'RESOLVED';
  timestamp: string;
}

interface DisasterState {
  incidents: SOSIncident[];
  activeRole: 'SUPER_ADMIN' | 'RESCUE_TEAM' | 'CITIZEN';
  triggerSOS: (location: { lat: number; lng: number }) => Promise<void>;
  dispatchTeam: (incidentId: string) => void;
}

export const useDisasterStore = create<DisasterState>((set, get) => ({
  incidents: [],
  activeRole: 'SUPER_ADMIN',
  
  triggerSOS: async (location) => {
    const newIncident: SOSIncident = {
      id: \`sos-\${Date.now()}\`,
      location,
      severity: 'CRITICAL',
      status: 'PENDING',
      timestamp: new Date().toISOString(),
    };
    set((state) => ({ incidents: [newIncident, ...state.incidents] }));
  },

  dispatchTeam: (incidentId) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === incidentId ? { ...inc, status: 'DISPATCHED' } : inc
      ),
    }));
  },
}));`
      },
      {
        id: 'dl-api',
        filename: 'lib/api/incidentService.ts',
        language: 'typescript',
        description: 'Service-layer REST API abstraction decoupling backend communication from presentation React components.',
        code: `import { SOSIncident } from '@/store/useDisasterStore';

export async function fetchLiveIncidents(): Promise<SOSIncident[]> {
  const response = await fetch('/api/v1/incidents/stream', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!response.ok) throw new Error('Incident command stream unavailable');
  return response.json();
}`
      }
    ]
  },
  carbonlens: {
    projectId: 'carbonlens',
    projectTitle: 'CarbonLens Platform',
    snippets: [
      {
        id: 'cl-chart',
        filename: 'components/EmissionsDashboard.jsx',
        language: 'javascript',
        description: 'React.js Chart.js emissions visualization engine rendering monthly carbon footprint trends with sub-200ms feedback.',
        code: `import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function EmissionsDashboard({ monthlyData }) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Carbon Footprint (kg CO2e)',
        data: monthlyData || [420, 380, 310, 290, 240, 195],
        borderColor: '#4F8EFF',
        backgroundColor: '#FFD54F',
        borderWidth: 3,
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
}`
      },
      {
        id: 'cl-ai',
        filename: 'services/aiAnalyticsService.js',
        language: 'javascript',
        description: 'AI API integration service querying LLM endpoints for real-time personalized carbon mitigation recommendations.',
        code: `export async function getAIFootprintAnalysis(userLogData) {
  const prompt = \`Analyze emissions data: Transport: \${userLogData.transport}km, Energy: \${userLogData.energy}kWh.\`;
  const response = await fetch('/api/ai/analyze', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  return response.json();
}`
      }
    ]
  },
  terralife: {
    projectId: 'terralife',
    projectTitle: 'Terralife App',
    snippets: [
      {
        id: 'tl-ml',
        filename: 'android/app/PlantClassifier.java',
        language: 'java',
        description: 'Native Java Android ML Kit image labeling service processing CameraX frame buffers for ~90% on-device plant identification accuracy.',
        code: `package com.rudraksha.terralife;

import android.graphics.Bitmap;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;

public class PlantClassifier {
    private final ImageLabeler labeler;

    public PlantClassifier() {
        this.labeler = ImageLabeling.getClient();
    }

    public void classifyPlant(Bitmap bitmap, ClassificationCallback callback) {
        InputImage image = InputImage.fromBitmap(bitmap, 0);
        labeler.process(image)
            .addOnSuccessListener(labels -> {
                if (!labels.isEmpty()) {
                    String topLabel = labels.get(0).getText();
                    float confidence = labels.get(0).getConfidence();
                    callback.onSuccess(topLabel, confidence);
                }
            })
            .addOnFailureListener(callback::onError);
    }

    public interface ClassificationCallback {
        void onSuccess(String plantName, float confidence);
        void onError(Exception e);
    }
}`
      },
      {
        id: 'tl-camera',
        filename: 'android/app/CameraXActivity.java',
        language: 'java',
        description: 'CameraX preview capture lifecycle integration and Firebase Storage image upload pipeline.',
        code: `package com.rudraksha.terralife;

import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.ImageCapture;
import com.google.firebase.storage.FirebaseStorage;

public class CameraXActivity extends AppCompatActivity {
    private ImageCapture imageCapture;
    private FirebaseStorage storage = FirebaseStorage.getInstance();
    
    // Lifecycle setup & CameraX binding
}`
      }
    ]
  }
};

interface CodePlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export function CodePlaygroundModal({ isOpen, onClose, projectId }: CodePlaygroundModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const { playClick, playHover } = useSoundFX();

  if (!isOpen) return null;

  const projectData = PROJECT_CODE_DATA[projectId] || PROJECT_CODE_DATA['disasterlink'];
  const currentSnippet = projectData.snippets[activeSnippetIndex] || projectData.snippets[0];

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            playClick();
            onClose();
          }
        }}
        className="fixed inset-0 z-[250] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl h-[85vh] bg-[#111111] border-4 border-[#111111] neo-shadow-hard flex flex-col overflow-hidden text-white cursor-default"
        >
          {/* Top Bar Header */}
          <div className="bg-[#111111] text-white p-4 sm:p-5 border-b-4 border-white/20 flex flex-wrap justify-between items-center gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4F8EFF] text-[#111111] border-2 border-white">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg tracking-wider uppercase text-white">
                  {projectData.projectTitle} • CODE ARCHITECTURE
                </h3>
                <span className="font-mono text-[10px] text-[#8BFFB0] font-bold block">
                  SYNTAX-HIGHLIGHTED ARCHITECTURE SNIPPET
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onMouseEnter={playHover}
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-[#FFD54F] text-[#111111] border-2 border-white font-mono text-xs font-black flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3] text-green-700" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>COPY SNIPPET</span>
                  </>
                )}
              </button>

              <button
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1.5 bg-[#FF8A8A] text-[#111111] border-2 border-white hover:bg-white transition-colors cursor-pointer"
                title="Close (ESC)"
              >
                <X className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Snippets Navigation Bar */}
          <div className="p-3 bg-white/5 border-b-2 border-white/10 flex gap-2 overflow-x-auto shrink-0 select-none">
            {projectData.snippets.map((snip, idx) => (
              <button
                key={snip.id}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveSnippetIndex(idx);
                }}
                className={`px-3.5 py-1.5 border-2 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeSnippetIndex === idx
                    ? 'bg-[#4F8EFF] text-[#111111] border-white font-black'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{snip.filename}</span>
              </button>
            ))}
          </div>

          {/* Snippet Description */}
          <div className="px-6 py-3 bg-[#4F8EFF]/10 border-b border-white/10 font-mono text-xs text-[#8BFFB0] font-medium flex items-center gap-2 shrink-0">
            <Terminal className="w-4 h-4 text-[#FFD54F] shrink-0 stroke-[2.5]" />
            <span>{currentSnippet.description}</span>
          </div>

          {/* Code Viewer Container */}
          <div
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-6 bg-[#0a0a0a] font-mono text-xs leading-relaxed text-[#8BFFB0] select-text font-medium border-t border-white/10"
          >
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
