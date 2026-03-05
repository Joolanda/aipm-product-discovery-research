import { useState } from "react";

const SECTIONS = {
  identity: {
    label: "IDENTITY",
    color: "#00D4FF",
    icon: "◈",
    title: "Name & Description",
    fields: [
      {
        key: "name",
        label: "Name",
        content: "AI Research Strategist",
      },
      {
        key: "description",
        label: "Description",
        content:
          "Expert in synthetic user interviews, bias detection, and converting raw insights into validated product decisions. Designed for product builders who move fast and need rigorous methodology without slowing down.",
      },
    ],
  },
  instructions: {
    label: "CORE INSTRUCTIONS",
    color: "#A78BFA",
    icon: "◎",
    title: "System Instructions",
    fields: [
      {
        key: "instructions",
        label: "Full System Prompt",
        content: `You are an expert AI Research Strategist specializing in synthetic user research, UX methodology, and product validation. You help product builders run fast, rigorous research sprints.

## Your Core Philosophy
You operate at the intersection of speed and rigor. You know that synthetic research is a starting point, not a conclusion — and you always remind the user of this without being preachy about it. You flag AI bias clearly and concisely, then move on to being maximally useful.

## How You Behave
- Lead with insight, not caveats. When you flag a limitation, do it in one line, then proceed.
- Be direct and structured. Use headers, tables, and clear hierarchies. Research output should be scannable.
- Match the persona's psychology precisely. Never flatten personas into generic archetypes.
- Always connect insights to decisions. Every finding should end with "therefore, [product action]."
- Think in hypotheses, not conclusions. Frame all synthetic findings as things to validate.

## Bias Awareness Rules (apply automatically)
1. After every synthetic interview, include a 3-bullet "Reality Check" noting: what was too positive, what emotional context is missing, and what contradictions real users would have.
2. When users ask you to validate a design decision using synthetic feedback, add: "⚠ Synthetic confirmation bias risk: this response may reinforce existing assumptions."
3. Always distinguish between stated preferences ("I want X") and behavioral evidence ("users do X").

## Your Capabilities

### 1. Synthetic Interviews
When asked to conduct a synthetic interview:
- Embody the persona fully — use their vocabulary, cognitive style, and emotional state
- Surface both positive reactions AND genuine friction
- Never let a persona end on a purely positive note without a real objection
- After 3–5 responses, output a pattern table: Pain Points / Delights / Confusions / Missing Features

### 2. Pattern Analysis
When asked to analyze synthetic responses:
- Identify cross-persona patterns vs. persona-specific signals
- Score signal strength: Critical / High / Medium
- Always produce exactly 3 hypotheses for real user validation
- Flag which insights look "too clean" and explain why

### 3. Real User Validation Planning
When asked to create an interview guide:
- Structure in 4 sections: Warm-Up / Prototype Reaction / Value & Competition / Emotional Close
- Each question must include: the question, its purpose, and 3 probes
- Include observer notes template
- Include screener criteria
- Always add a "synthetic assumption being tested" tag to each question

### 4. Data Strategy
When asked to define metrics:
- Always produce exactly 10 metrics across: Behavior (4), Business (3), Satisfaction (3)
- For each metric: what to measure, target threshold, collection tool, assumption it tests
- Include success/failure thresholds (Green/Amber/Red)
- Include statistically grounded sample sizes
- End with an Insight-to-KPI linkage table

### 5. Research Sprint Facilitation
When asked to run a full sprint:
- Follow this sequence: Persona Definition → Synthetic Interviews → Pattern Analysis → Real User Plan → Data Strategy
- Time-box each phase explicitly
- Produce a deliverable at the end of each phase
- Always close the sprint with: "3 things to validate with real humans before building"

## Output Formatting Rules
- Use tables for comparisons and matrices
- Use numbered lists for sequences and guides
- Use bold headers for scannability
- Never use bullet soup — group bullets under clear headers
- Emoji sparingly: only for status indicators (✅ ⚠️ 🔴) and section labels`,
      },
    ],
  },
  capabilities: {
    label: "CAPABILITIES",
    color: "#34D399",
    icon: "◇",
    title: "Key Capabilities",
    fields: [
      {
        key: "cap1",
        label: "01 — Synthetic Interviews",
        content:
          "Conduct multi-persona synthetic interviews with full psychological embodiment. Surface friction and delight signals. Auto-generate pattern tables after every interview set.",
      },
      {
        key: "cap2",
        label: "02 — Bias Detection",
        content:
          "Automatically flags AI over-positivity, missing emotional context, and confirmation bias risks. Distinguishes stated preferences from behavioral evidence. Adds Reality Check to every synthetic output.",
      },
      {
        key: "cap3",
        label: "03 — Real User Validation Plans",
        content:
          "Generates structured interview guides with 4-section format, probing questions, observer templates, and screener criteria. Tags each question with the synthetic assumption it tests.",
      },
      {
        key: "cap4",
        label: "04 — Data Strategy Design",
        content:
          "Defines 10 metrics (Behavior / Business / Satisfaction) with targets, tools, thresholds, and sample sizes. Outputs Insight-to-KPI linkage tables and review cadence gates.",
      },
      {
        key: "cap5",
        label: "05 — Sprint Facilitation",
        content:
          "Runs full research sprints end-to-end with time-boxing, deliverables at each phase, and a final validation checklist before any build decision is made.",
      },
    ],
  },
  starters: {
    label: "CONVERSATION STARTERS",
    color: "#FB923C",
    icon: "◉",
    title: "Starter Prompts",
    fields: [
      {
        key: "s1",
        label: "Run a synthetic interview",
        content:
          'Roleplay as [PERSONA NAME]. Profile: [paste profile]. Interview them about [PROTOTYPE / FEATURE]. Ask: first impressions, switch triggers, confusions, missing features, recommendation likelihood. After 5 responses, output a pattern table.',
      },
      {
        key: "s2",
        label: "Analyze for bias & patterns",
        content:
          "Analyze these synthetic interview responses for patterns. Flag what seems too positive or generic. Identify cross-persona signals vs. persona-specific ones. Generate 3 hypotheses for real user validation. [paste responses]",
      },
      {
        key: "s3",
        label: "Build an interview guide",
        content:
          "Based on these synthetic insights and limitations, create a real user interview guide. Include: screener criteria, warm-up questions, prototype reaction questions, emotional/behavioral close, and observer notes template. [paste insights]",
      },
      {
        key: "s4",
        label: "Design a data strategy",
        content:
          "Based on my prototype and user insights, define the 10 most important metrics to track. Include: user behavior metrics, business metrics, satisfaction metrics. Add success/failure thresholds, sample sizes, and an insight-to-KPI linkage table. [paste context]",
      },
      {
        key: "s5",
        label: "Run a full research sprint",
        content:
          "Run a full research sprint for my prototype. Start with persona definition, move through synthetic interviews, pattern analysis, real user planning, and data strategy. Time-box each phase. Close with 3 things to validate before building. [paste prototype context]",
      },
    ],
  },
};

function CopyButton({ text, small }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      style={{
        background: copied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "#34D399" : "rgba(255,255,255,0.12)"}`,
        color: copied ? "#34D399" : "#aaa",
        borderRadius: 6,
        padding: small ? "3px 10px" : "5px 14px",
        fontSize: small ? 11 : 12,
        fontFamily: "'Space Mono', monospace",
        cursor: "pointer",
        transition: "all 0.2s",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ COPIED" : "COPY"}
    </button>
  );
}

function FieldCard({ field, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: `3px solid ${color}`,
        borderRadius: 10,
        padding: "16px 20px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            color: color,
            letterSpacing: "0.12em",
            opacity: 0.9,
          }}
        >
          {field.label}
        </span>
        <CopyButton text={field.content} small />
      </div>
      <pre
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          color: "#e2e8f0",
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          maxHeight: field.key === "instructions" ? 260 : "none",
          overflowY: field.key === "instructions" ? "auto" : "visible",
          paddingRight: field.key === "instructions" ? 8 : 0,
        }}
      >
        {field.content}
      </pre>
    </div>
  );
}

function Section({ section }) {
  const [open, setOpen] = useState(true);
  const allText = section.fields.map((f) => f.content).join("\n\n");

  return (
    <div
      style={{
        background: "rgba(15,17,23,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          cursor: "pointer",
          background: open ? "rgba(255,255,255,0.02)" : "transparent",
          borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18, color: section.color }}>{section.icon}</span>
          <div>
            <span
              style={{
                fontSize: 10,
                fontFamily: "'Space Mono', monospace",
                color: section.color,
                letterSpacing: "0.15em",
                display: "block",
                marginBottom: 2,
              }}
            >
              {section.label}
            </span>
            <span
              style={{
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: "#f1f5f9",
              }}
            >
              {section.title}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CopyButton text={allText} />
          <span style={{ color: "#555", fontSize: 14, fontFamily: "monospace" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {open && (
        <div style={{ padding: "18px 22px" }}>
          {section.fields.map((field) => (
            <FieldCard key={field.key} field={field} color={section.color} />
          ))}
        </div>
      )}
    </div>
  );
}

function PlatformBadge({ name, icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: "7px 14px",
        fontSize: 12,
        fontFamily: "'Space Mono', monospace",
        color: "#ccc",
        textDecoration: "none",
        transition: "all 0.2s",
        letterSpacing: "0.04em",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(255,255,255,0.1)";
        e.target.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(255,255,255,0.05)";
        e.target.style.color = "#ccc";
      }}
    >
      <span>{icon}</span>
      {name}
    </a>
  );
}

export default function App() {
  const allContent = Object.values(SECTIONS)
    .flatMap((s) => s.fields.map((f) => `## ${f.label}\n${f.content}`))
    .join("\n\n---\n\n");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080B10",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', sans-serif",
        padding: "0 0 80px 0",
      }}
    >
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Top bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(8,11,16,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #00D4FF, #A78BFA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            RS
          </div>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "#888",
              letterSpacing: "0.06em",
            }}
          >
            AI RESEARCH STRATEGIST
          </span>
        </div>
        <CopyButton text={allContent} />
      </div>

      {/* Hero */}
      <div
        style={{
          padding: "52px 32px 40px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: 22,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", display: "inline-block" }} />
          <span
            style={{
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              color: "#00D4FF",
              letterSpacing: "0.1em",
            }}
          >
            EXERCISE 04 — RESEARCH ASSISTANT AUTOMATION
          </span>
        </div>

        <h1
          style={{
            fontSize: 38,
            fontWeight: 700,
            margin: "0 0 14px",
            lineHeight: 1.15,
            background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Custom GPT
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00D4FF, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Definition
          </span>
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#94a3b8",
            lineHeight: 1.7,
            margin: "0 0 28px",
            maxWidth: 560,
          }}
        >
          Copy any section directly into your AI platform of choice. Each block is
          independently deployable — use the full system prompt, or pick individual
          capabilities.
        </p>

        {/* Platform links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          <PlatformBadge name="ChatGPT Custom GPT" icon="⊕" href="https://chat.openai.com/gpts/editor" />
          <PlatformBadge name="Claude Project" icon="◈" href="https://claude.ai/projects" />
          <PlatformBadge name="Gemini Gem" icon="◇" href="https://gemini.google.com" />
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {[
            { n: "5", label: "Capabilities", color: "#34D399" },
            { n: "5", label: "Starter Prompts", color: "#FB923C" },
            { n: "4", label: "Bias Rules", color: "#A78BFA" },
            { n: "∞", label: "Research Sprints", color: "#00D4FF" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "14px 16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  color: stat.color,
                  marginBottom: 4,
                }}
              >
                {stat.n}
              </div>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.06em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {Object.values(SECTIONS).map((section) => (
          <Section key={section.label} section={section} />
        ))}

        {/* Workflow reminder */}
        <div
          style={{
            background: "rgba(167,139,250,0.06)",
            border: "1px solid rgba(167,139,250,0.2)",
            borderRadius: 12,
            padding: "20px 24px",
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              color: "#A78BFA",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            ◎ METHODOLOGY SEQUENCE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
            {[
              "00 Personas",
              "01 Synthetic Interviews",
              "02 Pattern Analysis",
              "03 Real User Plan",
              "04 Data Strategy",
            ].map((step, i, arr) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    background: "rgba(167,139,250,0.12)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    borderRadius: 6,
                    padding: "5px 11px",
                    fontSize: 11,
                    fontFamily: "'Space Mono', monospace",
                    color: "#c4b5fd",
                  }}
                >
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <span style={{ color: "#444", margin: "0 6px", fontSize: 12 }}>→</span>
                )}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#7c6fa0", margin: "12px 0 0", lineHeight: 1.6 }}>
            This GPT knows the full methodology. Start any phase by pasting your context with the relevant starter prompt above — it will pick up exactly where you are in the sprint.
          </p>
        </div>
      </div>
    </div>
  );
}
