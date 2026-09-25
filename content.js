/* =========================================================
   CONTENT CONFIG — fill everything in here, in one place.
   Nothing below is personal data yet: every value is a
   [placeholder] you can replace. Edit this file only.
   ========================================================= */

window.SITE_CONTENT = {

  /* ---------------------------------------------------------
     1. SERVICES  (accordion — "What I Can Do For You")
     Add or remove items freely; numbering is automatic.
     --------------------------------------------------------- */
  services: [
    {
      title: "[SEO & SEM]",
      body: [
        "[One or two sentences describing how you approach search — technical SEO, keyword strategy, landing pages and paid search working together so the right people find the offer at the right moment.]"
      ],
      tags: ["Technical SEO", "Google Ads", "Keyword Research"]
    },
    {
      title: "[Social Media Strategy]",
      body: [
        "[Describe your social approach: platform-native content, content calendars, community management and creator collaborations that build an audience which actually converts.]"
      ],
      tags: ["Instagram", "LinkedIn", "Content Calendars"]
    },
    {
      title: "[Email Marketing]",
      body: [
        "[Explain your email system: list building, segmentation, automated flows and campaign copy that keeps the audience warm between launches and generates repeat revenue.]"
      ],
      tags: ["Automation", "Segmentation", "Lifecycle"]
    },
    {
      title: "[Brand Growth]",
      body: [
        "[Outline the bigger picture: positioning, offer clarity, funnel design and the paid + organic mix that takes a brand from unknown to category authority.]"
      ],
      tags: ["Positioning", "Funnels", "Paid + Organic"]
    }
  ],

  /* ---------------------------------------------------------
     2. STATS  (About Me)
     Two ways to fill these in:
       • value: a NUMBER  →  the figure animates counting up from 0
       • value: null + placeholder  →  shows the bracketed token
         as-is, so nothing looks like a fake "0" claim
     `suffix` is appended after the figure ("+", "%", "K"…)
     --------------------------------------------------------- */
  stats: [
    { value: null, placeholder: "[X]",  suffix: "",  label: "[X] Years of Experience" },
    { value: null, placeholder: "[Y]",  suffix: "+", label: "[Y] Successful Campaigns" },
    { value: null, placeholder: "[Z]",  suffix: "+", label: "[Z] Global Clients" }
  ],

  /* ---------------------------------------------------------
     3. SOCIAL LINKS  (minimalist icons — shown in About + Footer)
     icon: any Font Awesome class, e.g. fa-brands fa-instagram
     --------------------------------------------------------- */
  socials: [
    { label: "Instagram", icon: "fa-brands fa-instagram", url: "#" },
    { label: "LinkedIn",  icon: "fa-brands fa-linkedin-in", url: "#" },
    { label: "X / Twitter", icon: "fa-brands fa-x-twitter", url: "#" },
    { label: "YouTube",  icon: "fa-brands fa-youtube", url: "#" },
    { label: "WhatsApp", icon: "fa-brands fa-whatsapp", url: "#" }
  ],

  /* ---------------------------------------------------------
     4. FEATURED CAMPAIGNS  (project cards)
     image: "" → renders a clean placeholder thumbnail
     --------------------------------------------------------- */
  campaigns: [
    {
      category: "[Paid Ads]",
      title: "[Campaign Name]",
      text: "[A short description of the goal, the audience and what you actually did — keep it to two lines.]",
      result: "[Result: 3.4x ROAS in 60 days]",
      image: ""
    },
    {
      category: "[Social Media]",
      title: "[Campaign Name]",
      text: "[A short description of the goal, the audience and what you actually did — keep it to two lines.]",
      result: "[Result: 0 → 25K followers in 4 months]",
      image: ""
    },
    {
      category: "[Email Funnel]",
      title: "[Campaign Name]",
      text: "[A short description of the goal, the audience and what you actually did — keep it to two lines.]",
      result: "[Result: 42% open rate on relaunch]",
      image: ""
    },
    {
      category: "[Brand Launch]",
      title: "[Campaign Name]",
      text: "[A short description of the goal, the audience and what you actually did — keep it to two lines.]",
      result: "[Result: sold out launch week]",
      image: ""
    }
  ],

  /* ---------------------------------------------------------
     5. TESTIMONIALS  (mix quotes with "stat cards")
     type: "quote" | "stat"
     avatar: "" → renders an icon placeholder
     --------------------------------------------------------- */
  testimonials: [
    {
      type: "quote",
      rating: 5,
      quote: "[A short, specific client quote about the result you delivered — one or two sentences is ideal.]",
      name: "[Client Name]",
      title: "[Client Title, Company]",
      avatar: ""
    },
    {
      type: "stat",
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate"
    },
    {
      type: "quote",
      rating: 5,
      quote: "[A short, specific client quote about the result you delivered — one or two sentences is ideal.]",
      name: "[Client Name]",
      title: "[Client Title, Company]",
      avatar: ""
    },
    {
      type: "stat",
      value: 200,
      suffix: "%",
      label: "Client Revenue Growth"
    },
    {
      type: "quote",
      rating: 5,
      quote: "[A short, specific client quote about the result you delivered — one or two sentences is ideal.]",
      name: "[Client Name]",
      title: "[Client Title, Company]",
      avatar: ""
    },
    {
      type: "quote",
      rating: 5,
      quote: "[A short, specific client quote about the result you delivered — one or two sentences is ideal.]",
      name: "[Client Name]",
      title: "[Client Title, Company]",
      avatar: ""
    }
  ],

  /* ---------------------------------------------------------
     6. FAQ  (accordion)
     --------------------------------------------------------- */
  faqs: [
    {
      q: "What is your typical process?",
      a: "[Walk through your process in 3–4 steps: discovery and audit, strategy and offer, execution, then measure and scale. Keep it reassuring and specific.]"
    },
    {
      q: "How do you measure ROI?",
      a: "[Explain which numbers you track — ROAS, CPL, CAC, conversion rate — and how often you report them, plus the dashboard or report the client receives.]"
    },
    {
      q: "How long before I see results?",
      a: "[Give honest timelines: quick wins from paid campaigns in weeks, compounding organic and brand results in months. Being upfront here builds trust.]"
    },
    {
      q: "Do you work with a minimum budget?",
      a: "[State your minimum monthly ad spend or retainer, and which kinds of businesses are the best fit for your services.]"
    },
    {
      q: "What do you need from me to start?",
      a: "[List what you ask for at kickoff: brand assets, access to accounts, a clear offer, and a single point of contact for approvals.]"
    }
  ],

  /* ---------------------------------------------------------
     7. INSIGHTS  (blog / case-study cards) — all placeholders
     image: "" → renders a clean placeholder thumbnail
     --------------------------------------------------------- */
  insights: [
    {
      category: "[Strategy]",
      date: "[Month 2026]",
      title: "[Article headline goes here]",
      text: "[One line describing what the reader will learn from this piece.]",
      url: "#",
      image: ""
    },
    {
      category: "[Case Study]",
      date: "[Month 2026]",
      title: "[Case study headline goes here]",
      text: "[One line describing the campaign and the result it produced.]",
      url: "#",
      image: ""
    },
    {
      category: "[Paid Media]",
      date: "[Month 2026]",
      title: "[Article headline goes here]",
      text: "[One line describing what the reader will learn from this piece.]",
      url: "#",
      image: ""
    }
  ],

  /* ---------------------------------------------------------
     8. CONTACT FORM  ("Service Needed" dropdown options)
     --------------------------------------------------------- */
  serviceOptions: [
    "[SEO & SEM]",
    "[Social Media Strategy]",
    "[Email Marketing]",
    "[Brand Growth]",
    "[Something else]"
  ]
};
