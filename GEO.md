# 🚀 The Ultimate GEO & Agent-Presence Framework (v2.0)
## *Optimized for LLMs, RAG, and Agentic Workflows*

This framework integrates Content Density, Semantic Entity Linking, and Protocol Discovery to ensure sites are citable by LLMs (Gemini, ChatGPT) and interactable by autonomous AI agents (Model Context Protocol).

---

## 1. The Machine-Readability & Protocol Layer
AI agents prioritize clean, structured entry points and protocol discovery to minimize scraping.

### A. The `.well-known` Agent Stack
To support active AI workflows (e.g., an AI agent booking a reservation), implement the following manifests:
- [cite_start]**API Catalog:** Publish a RFC 9727 API catalog at `/.well-known/api-catalog` to let agents discover APIs without scraping the whole site[cite: 64, 158, 159].
- [cite_start]**Agent Skills Manifest:** Publish `/.well-known/agent-skills/index.json` to give agents a compact list of workflows they can invoke or understand[cite: 167, 168].
- [cite_start]**MCP Server Card:** Publish `/.well-known/mcp/server-card.json` to advertise machine-usable capabilities for MCP-aware agents[cite: 176, 177].

### B. The `llms.txt` Standard
[cite_start]Place these in the `/public` or root directory to give agents a compact overview of the site[cite: 51].
- **`llms.txt`**: A brief summary, core services, and trust signals.
- [cite_start]**`llms-full.txt`**: A full long-form file that gives agents deeper site context than the shorter overview[cite: 100, 155].

### C. Technical Guardrails & Headers
- [cite_start]**HTTP Link Headers:** Add RFC 8288 Link headers to expose alternate resources (like `llms.txt` or markdown alternates) without extra crawling.
- [cite_start]**Page-Level Directives:** Use HTML agent directives (like `<meta name="robots">`) to complement your `robots.txt` for granular controls[cite: 73, 135].
- [cite_start]**Content-Signal Directives:** Add content signals to `robots.txt` to tell AI systems if content can be trained on or used for input handling[cite: 55].

---

## 2. Markdown Content Negotiation
[cite_start]Serving markdown reduces token waste and makes data extraction more reliable for agents.

- [cite_start]**Content Negotiation:** Configure your server to return markdown content when agents request `Accept: text/markdown`[cite: 143, 146].
- [cite_start]**Markdown Fallback:** Always publish a `.md` companion (e.g., `/index.md`) to provide agents a stable fallback when content negotiation is not supported.
- [cite_start]**Redirect Hints:** Use agent-friendly redirect paths to help agents land on the machine-friendly version of content faster[cite: 61, 132].

---

## 3. The Semantic Blueprint (Advanced JSON-LD)
Use Entity Linking and highly specific schema subtypes.

```json
{
  "@context": "[https://schema.org](https://schema.org)",
  "@graph": [
    {
      "@type": "SpecificBusinessType", // e.g., Resort, BarOrPub, ConstructionCompany
      "@id": "[https://yourdomain.com/#organization](https://yourdomain.com/#organization)",
      "name": "Business Name",
      "url": "[https://yourdomain.com](https://yourdomain.com)",
      "contactPoint": { "@type": "ContactPoint", "telephone": "+123456789" }, 
      "description": "Clear entity definition and high-level summary.",
      "sameAs": [
        "[https://maps.google.com/?cid=YOUR_CID](https://maps.google.com/?cid=YOUR_CID)",
        "[https://www.tripadvisor.com/your-id](https://www.tripadvisor.com/your-id)",
        "[https://www.wikidata.org/wiki/QXXXXX](https://www.wikidata.org/wiki/QXXXXX)"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "[https://yourdomain.com](https://yourdomain.com)" }]
    }
  ]
}
```

---

## 4. Citable Content Architecture
To be cited, content must be structurally readable and entity-defined.

### A. The "Self-Contained Answer" Rule
[cite_start]Ensure your answer blocks are concise  [cite_start]and include clear entity definitions.
- **Bad:** "Our bar is great and open late."
- **Good:** "ZAZÚ Cocktails & Tapas is a premium BarOrPub in Zakynthos featuring signature mixology, open daily from 18:00 to 02:00."

### B. E-E-A-T & Freshness Signals
- [cite_start]**Last-Updated Signals:** You must include a detectable last-updated signal like `dateModified`, `datePublished`, or a `<time datetime>` tag[cite: 19]. 
- **Statistical Density:** Always include numbers (percentages, distances, counts).

---

## 5. Audit-Ready Checklist for New Projects

| Factor | Requirement |
| :--- | :--- |
| **Markdown Access** | `Accept: text/markdown` supported, or `/index.md` fallback present. |
| **Agent Protocols** | `api-catalog` and `agent-skills` JSON manifests published in `/.well-known/`. |
| **LLM Context** | `llms.txt` and `llms-full.txt` available in root. |
| **Link Headers** | HTTP Link headers point to `.md` alternates and AI manifests. |
| **Entity Precision** | Clear entity definitions with specific Schema subtypes (e.g., `BarOrPub`). |
| **Freshness** | `<time datetime>` explicitly rendered on all content blocks. |

---
*Created for use in automated project stacks and Next.js/React environments.*