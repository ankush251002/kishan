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
      title: "Digital Marketing",
      body: [
        "Comprehensive social media management and data-backed content strategies. I plan high-impact promotional reels, interactive posts, and engaging content pipelines to boost your brand."
      ],
      tags: ["Social Media", "Content Strategy", "Brand Management"]
    },
    {
      title: "Sales & Client Acquisition",
      body: [
        "Executing high-performance B2B/B2C sales cycles and cultivating robust client communications. I drive lead generation pipelines and consistently achieve aggressive sales targets."
      ],
      tags: ["B2B Marketing", "Lead Generation", "Negotiation"]
    },
    {
      title: "Influencer Marketing",
      body: [
        "Strategic creator partnerships and result-driven campaigns. I leverage a proprietary network of 500+ active influencers to amplify brand visibility and consumer engagement."
      ],
      tags: ["Creator Collaborations", "B2B Campaigns", "Brand Visibility"]
    },
    {
      title: "Brand Growth & Strategy",
      body: [
        "Formulating sharp brand positioning and multi-channel digital growth frameworks. Managing end-to-end creative content production and coordinating large-scale promotional activities."
      ],
      tags: ["Positioning", "Video Production", "Business Dev"]
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
    { value: 2, placeholder: "[X]",  suffix: "+",  label: "Years Sales Experience" },
    { value: 1.5, placeholder: "[Y]",  suffix: "+", label: "Years Digital Mktg" },
    { value: 25, placeholder: "[Z]",  suffix: "+", label: "Brands Partnered" },
    { value: 500, placeholder: "[W]", suffix: "+", label: "Influencer Network"}
  ],

  /* ---------------------------------------------------------
     3. SOCIAL LINKS  (minimalist icons — shown in About + Footer)
     icon: any Font Awesome class, e.g. fa-brands fa-instagram
     --------------------------------------------------------- */
  socials: [
    { label: "Facebook",  icon: "fa-brands fa-facebook", url: "https://www.facebook.com/share/19mgzZsJ7k/?mibextid=wwXIfr" },
    { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com/digig.lab?stkn=MXE0NGZpZjM1Nzlucw==" },
    { label: "WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://wa.me/917000694616" }
  ],

  /* ---------------------------------------------------------
     4. FEATURED CAMPAIGNS  (project cards)
     image: "" → renders a clean placeholder thumbnail
     --------------------------------------------------------- */
  campaigns: [
    {
      category: "Influencer Marketing",
      title: "Indore Creator Network",
      text: "Engineered a proprietary network of active influencers and creators for strategic B2B campaigns.",
      result: "500+ Active Creators",
      image: ""
    },
    {
      category: "Brand Growth",
      title: "Multi-Industry Scaling",
      text: "Partnered with diverse industry brands to amplify digital presence and accelerate revenue growth.",
      result: "25+ Brands Scaled",
      image: ""
    },
    {
      category: "Sales Strategy",
      title: "B2B/B2C Optimization",
      text: "Consistently achieved aggressive sales targets through highly optimized, conversion-focused processes.",
      result: "High-Performance Cycles",
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
      type: "stat",
      value: 25,
      suffix: "+",
      label: "Industry Brands Partnered"
    },
    {
      type: "quote",
      rating: 5,
      quote: "Kishan's approach to digital growth and influencer networks in Indore is unmatched. He truly understands how to scale a brand.",
      name: "Partner Brand",
      title: "Client",
      avatar: ""
    },
    {
      type: "stat",
      value: 500,
      suffix: "+",
      label: "Active Influencers in Network"
    },
    {
      type: "quote",
      rating: 5,
      quote: "His combination of rigorous sales experience and digital marketing strategies leads to measurable revenue growth.",
      name: "B2B Client",
      title: "Partner",
      avatar: ""
    }
  ],

  /* ---------------------------------------------------------
     6. FAQ  (accordion)
     --------------------------------------------------------- */
  faqs: [
    {
      q: "What is DigiG lab?",
      a: "DigiG lab is my digital marketing venture where I manage end-to-end digital marketing, creative content production, and brand growth activities for diverse industrial sectors."
    },
    {
      q: "How do you approach influencer marketing?",
      a: "I have built a proprietary network of 500+ active influencers and creators in Indore. This allows for highly targeted, strategic B2B influencer campaigns that drive real engagement."
    },
    {
      q: "What is your sales background?",
      a: "I have 2 years of rigorous B2B/B2C sales experience, focusing on lead generation, client acquisition, and achieving aggressive sales targets through optimized processes."
    },
    {
      q: "What kind of content do you produce?",
      a: "I coordinate content shoots, promotional reels, dynamic posts, and manage full-scale social media strategies designed for organic visibility and ROI."
    }
  ],

  /* ---------------------------------------------------------
     7. INSIGHTS  (blog / case-study cards) — all placeholders
     image: "" → renders a clean placeholder thumbnail
     --------------------------------------------------------- */
  insights: [
    {
      category: "Strategy",
      date: "Current",
      title: "Building an Influencer Network from Scratch",
      text: "How we curated 500+ active creators in Indore for B2B campaigns.",
      url: "#",
      image: ""
    },
    {
      category: "Sales",
      date: "Experience",
      title: "Combining Sales Tactics with Digital Growth",
      text: "Leveraging direct communication and negotiation in digital spaces.",
      url: "#",
      image: ""
    },
    {
      category: "Brand Growth",
      date: "Case Study",
      title: "Omni-Channel Social Media Management",
      text: "Architecting strategies for 25+ brands across diverse sectors.",
      url: "#",
      image: ""
    }
  ],

  /* ---------------------------------------------------------
     8. CONTACT FORM  ("Service Needed" dropdown options)
     --------------------------------------------------------- */
  serviceOptions: [
    "Digital Marketing & Strategy",
    "Influencer Marketing Campaigns",
    "Sales & Client Acquisition",
    "Social Media Management",
    "Brand Consulting"
  ]
};
