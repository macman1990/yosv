import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ToolItem } from '../../types/portfolio';
import { Cpu, Scissors, Activity, Layers, Box, Radio, Zap, Layout } from 'lucide-react';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-5 h-5 text-purple-400" />,
  Scissors: <Scissors className="w-5 h-5 text-indigo-400" />,
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Box: <Box className="w-5 h-5 text-amber-400" />,
  Radio: <Radio className="w-5 h-5 text-[var(--color-accent)]" />,
  Zap: <Zap className="w-5 h-5 text-rose-400" />,
  Layout: <Layout className="w-5 h-5 text-blue-400" />,
};

export const ToolsSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const tools: ToolItem[] = (data.tools || [])
    .filter((tool) => tool.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="tools" className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
            style={{
              backgroundColor: 'var(--accent-muted)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <Cpu className="w-3.5 h-3.5" />
            {t('tools.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('tools.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
            {t('tools.subtitle')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((tool) => {
            const description = tool.description[language] || tool.description.en;

            return (
              <div
                key={tool.id}
                className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between space-y-4 shadow-[var(--card-shadow)] text-start"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center group-hover:scale-105 transition-all">
                      {TOOL_ICONS[tool.icon] || <Cpu className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border-subtle)]">
                      {tool.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--foreground)] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2 mt-1">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Years Used & Skill Level Bar */}
                <div className="space-y-2 pt-3 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--muted-foreground)]">
                      {tool.yearsUsed} {t('tools.yearsUsed')}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{tool.skillLevel}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${tool.skillLevel}%`,
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
