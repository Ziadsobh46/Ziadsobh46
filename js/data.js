/* ==========================================================================
   PORTFOLIO CONTENT
   All text on the website comes from this file. It is based strictly on the
   CV (assets/cv/Eng-Ziad-Sobh-CV.pdf). Edit here to update the site.
   ========================================================================== */

window.PORTFOLIO = {
  profile: {
    name: "Eng. Ziad Sobh",
    fullName: "Ziad Khaled Mahrous Sobh",
    title: "Mechanical BIM Engineer",
    subtitle: "Technical Office · MEP Coordination",
    location: "Nasr City, Cairo, Egypt",
    email: "ziadsobh46@gmail.com",
    linkedin: "https://www.linkedin.com/in/ziad-khaled-sobh-80ba2a21a/",
    // The phone number is on the CV. It is hidden on the public site by
    // default; set showPhone to true to display it in the Contact section.
    phone: "+20 155 0664 848",
    showPhone: false,
    cv: "assets/cv/Eng-Ziad-Sobh-CV.pdf",
    intro:
      "Mechanical BIM Engineer in the Technical Office with over two years of hands-on experience developing coordinated Revit MEP models, preparing shop and execution drawings, and delivering LOD 500 models for HVAC, Fire Fighting, Plumbing and Medical Gas systems on projects in KSA, UAE and Egypt."
  },

  highlights: [
    { value: "2+", label: "Years of experience", note: "Technical office, BIM & MEP design" },
    { value: "4", label: "Mechanical systems", note: "HVAC · Fire Fighting · Plumbing · Medical Gas" },
    { value: "LOD 500", label: "Model delivery", note: "Upgraded from LOD 200 for fabrication & installation" },
    { value: "3", label: "Countries", note: "Project experience in KSA · UAE · Egypt" }
  ],

  about: {
    paragraphs: [
      "I am a Mechanical Power Engineering graduate of Damietta University (Very Good with Honors, 2024), currently working as a Mechanical BIM Engineer in the Technical Office of BEC Arabia LLC. My work focuses on turning consultant design packages into coordinated mechanical models and construction-ready drawings.",
      "Across BEC Arabia, BIM Works and ASEC Engineering Consultants, I have modeled and coordinated HVAC, Fire Fighting, Plumbing and Medical Gas systems in Revit MEP, run clash detection in Navisworks, reviewed design packages through the SD and DD stages, prepared shop, execution and as-built drawings, and upgraded models from LOD 200 to LOD 500 for fabrication and installation."
    ],
    focus: [
      "Mechanical Engineering",
      "BIM",
      "Technical Office",
      "MEP Systems",
      "Revit MEP",
      "Coordination",
      "Shop Drawings",
      "LOD 500"
    ],
    facts: [
      { label: "Current role", value: "Mechanical BIM Engineer — BEC Arabia LLC" },
      { label: "Discipline", value: "Mechanical (MEP)" },
      { label: "Based in", value: "Nasr City, Cairo, Egypt" },
      { label: "Project locations", value: "KSA · UAE · Egypt" },
      { label: "Languages", value: "Arabic (Native) · English (Advanced)" }
    ]
  },

  experience: [
    {
      company: "BEC ARABIA LLC",
      role: "Mechanical BIM Engineer",
      unit: "Technical Office",
      location: "District 5",
      period: "May 2025 – Present",
      current: true,
      points: [
        "Develop 3D mechanical models for HVAC, Plumbing, Fire Fighting and Medical Gases using Revit MEP.",
        "Review consultant design drawings and prepare detailed shop drawings in compliance with project requirements.",
        "Prepare construction drawings, schedules and material take-offs."
      ],
      projects: ["Dariya", "Bustan Park", "Amaala Civic Assets", "Amaala Staff Village", "Tharba Medical Center"]
    },
    {
      company: "BIM WORKS LLC",
      role: "BIM Engineer",
      unit: "Technical Office",
      location: "Nasr City",
      period: "Oct 2024 – May 2025",
      points: [
        "Developed 3D mechanical models for HVAC, Plumbing, Fire Fighting and Machinery using Revit MEP.",
        "Conducted clash detection and resolved conflicts using Navisworks.",
        "Upgraded the Level of Development of multiple projects from LOD 200 to LOD 500, making models suitable for fabrication and installation."
      ],
      projects: ["Metro Station 3rd Line", "Adahi Building"]
    },
    {
      company: "ASEC ENGINEERING CONSULTANTS",
      role: "MEP Engineer",
      location: "Nasr City",
      period: "Feb 2024 – Oct 2024",
      points: [
        "HVAC design: optimized systems and performed load calculations.",
        "Fire fighting: designed compliant sprinkler systems.",
        "Plumbing: created water supply and drainage layouts.",
        "Medical gas: designed piping for healthcare facilities.",
        "Coordinated with project teams."
      ],
      projects: []
    }
  ],

  /* Project filters shown above the grid. Each project lists its filter keys. */
  projectFilters: [
    { key: "all", label: "All projects" },
    { key: "lod500", label: "LOD 500" },
    { key: "drawings", label: "Shop & Execution Drawings" },
    { key: "coordination", label: "Coordination" },
    { key: "pointcloud", label: "Point Cloud" },
    { key: "design", label: "Design & Review" }
  ],

  /* systems: hvac | fire | plumbing | medgas | machinery | smoke
     systemsNote: used when the CV describes systems generally. */
  projects: [
    {
      id: "dariya",
      name: "Dariya",
      company: "BEC Arabia",
      location: "Dariya, KSA",
      type: "Design & Build · Mixed-Use (Hotel & Commercial)",
      role: "Mechanical BIM Engineer",
      systems: ["hvac", "fire", "plumbing"],
      contribution: [
        "Reviewed and coordinated mechanical design packages across the SD 50%, SD 100%, DD 50% and DD 100% stages.",
        "Tracked design progression against project requirements and flagged coordination issues between MEP disciplines at each milestone."
      ],
      tags: ["Design Review", "SD / DD Stages", "MEP Coordination", "Design & Build"],
      filters: ["coordination", "design"]
    },
    {
      id: "bustan-park",
      name: "Bustan Park",
      company: "BEC Arabia",
      location: "KSA",
      role: "Mechanical BIM Engineer",
      systems: ["hvac", "fire", "plumbing"],
      contribution: [
        "Prepared execution drawings for HVAC, Fire Fighting, Plumbing and builder's work across all MEP disciplines.",
        "Ensured accurate, fully coordinated shop drawings aligned with project requirements."
      ],
      tags: ["Execution Drawings", "Shop Drawings", "Builder's Work", "MEP Coordination"],
      filters: ["drawings", "coordination"]
    },
    {
      id: "amaala-civic",
      name: "Amaala Civic Assets",
      company: "BEC Arabia",
      location: "Amaala, KSA",
      type: "Civic Buildings & Pump Rooms",
      role: "Mechanical BIM Engineer",
      systems: [],
      systemsNote: "Mechanical works",
      contribution: [
        "Produced execution drawings and coordinated layouts for buildings and pump rooms.",
        "Developed and submitted LOD 500 BIM models for mechanical works with high precision."
      ],
      tags: ["LOD 500", "Revit MEP", "Execution Drawings", "Pump Rooms"],
      filters: ["lod500", "drawings"]
    },
    {
      id: "amaala-staff-village",
      name: "Amaala Staff Village",
      company: "BEC Arabia",
      location: "Amaala, KSA",
      type: "Residential Buildings",
      role: "Mechanical BIM Engineer",
      systems: [],
      systemsNote: "Mechanical systems",
      contribution: [
        "Delivered LOD 500 BIM models for multiple residential buildings.",
        "Prepared accurate mechanical asset data for the project's asset register.",
        "Handled full coordination between all MEP and architectural / structural disciplines."
      ],
      tags: ["LOD 500", "Asset Data", "Multi-discipline Coordination"],
      filters: ["lod500", "coordination"]
    },
    {
      id: "tharba",
      name: "Tharba Medical Center",
      company: "BEC Arabia",
      location: "AlUla, KSA",
      type: "Healthcare",
      role: "Mechanical BIM Engineer",
      systems: [],
      systemsNote: "All mechanical systems",
      contribution: [
        "Prepared and delivered complete as-built MEP drawings for the project.",
        "Developed and submitted a highly accurate LOD 500 BIM model for all mechanical systems."
      ],
      tags: ["LOD 500", "As-Built Drawings", "Revit MEP"],
      filters: ["lod500", "drawings"]
    },
    {
      id: "moral-tower",
      name: "Moral Tower",
      company: "Outsource",
      location: "Dubai, UAE",
      role: "Shop drawings — remote outsourced work",
      systems: ["smoke"],
      contribution: [
        "Prepared shop drawings for the smoke and ventilation system as part of remote outsourced work."
      ],
      tags: ["Shop Drawings", "Smoke & Ventilation", "Remote"],
      filters: ["drawings"]
    },
    {
      id: "metro-3rd-line",
      name: "Metro Station 3rd Line",
      company: "BIM Works",
      location: "Cairo, Egypt",
      type: "Metro Station",
      role: "BIM Engineer — supporting the MEP team",
      systems: ["fire", "plumbing"],
      contribution: [
        "Assisted the MEP team in developing BIM models aligned with point cloud data.",
        "Modeled and coordinated mechanical disciplines with other disciplines according to point cloud and CAD drawings."
      ],
      tags: ["Point Cloud", "BIM Coordination", "Revit MEP"],
      filters: ["pointcloud", "coordination"]
    },
    {
      id: "adahi",
      name: "Adahi Building",
      company: "BIM Works",
      location: "Makkah, KSA",
      role: "BIM Engineer",
      systems: ["hvac", "fire", "plumbing", "machinery"],
      contribution: [
        "Modeled and coordinated all mechanical disciplines with other disciplines according to point cloud and CAD drawings.",
        "Upgraded the Level of Development from LOD 200 to LOD 500.",
        "Created families for most machinery based on Recap files."
      ],
      tags: ["LOD 200 → 500", "Point Cloud", "Family Creation", "Recap"],
      filters: ["lod500", "pointcloud", "coordination"]
    },
    {
      id: "bedaya-hospital",
      name: "Bedaya Hospital",
      company: "Training",
      type: "Hospital",
      role: "MEP design & BIM modeling (MEP Diploma graduation project)",
      systems: ["hvac", "fire", "plumbing", "medgas"],
      contribution: [
        "MEP design and BIM modeling in Revit for HVAC, Fire Fighting, Plumbing and Medical Gases."
      ],
      tags: ["MEP Design", "Revit", "Healthcare"],
      filters: ["design"]
    },
    {
      id: "villa-moosa",
      name: "Villa Moosa",
      company: "Training",
      type: "Villa",
      role: "Schematic design",
      systems: ["hvac", "fire"],
      contribution: [
        "Prepared HVAC and fire fighting schematic design."
      ],
      tags: ["Schematic Design"],
      filters: ["design"]
    }
  ],

  expertise: [
    {
      title: "MEP Systems",
      code: "SYS",
      intro: "The mechanical systems I model, coordinate and draw.",
      items: [
        { name: "HVAC", system: "hvac" },
        { name: "Fire Fighting", system: "fire" },
        { name: "Plumbing", system: "plumbing" },
        { name: "Medical Gas", system: "medgas" }
      ]
    },
    {
      title: "BIM & Coordination",
      code: "BIM",
      intro: "Model development and multi-discipline coordination.",
      items: [
        { name: "Revit MEP" },
        { name: "Navisworks" },
        { name: "BIM Coordination" },
        { name: "LOD 200 → LOD 500" },
        { name: "Clash Detection" },
        { name: "ACC" },
        { name: "Recap" },
        { name: "Point Cloud Coordination" }
      ]
    },
    {
      title: "Design & Engineering",
      code: "DSN",
      intro: "Mechanical design work from consultancy and training.",
      items: [
        { name: "HVAC Design" },
        { name: "Load Calculations" },
        { name: "Sprinkler Systems" },
        { name: "Water Supply" },
        { name: "Drainage" },
        { name: "Medical Gas Systems" }
      ]
    },
    {
      title: "Software",
      code: "SW",
      intro: "Tools used for modeling, design and documentation.",
      items: [
        { name: "Revit" },
        { name: "Navisworks" },
        { name: "AutoCAD" },
        { name: "HAP" },
        { name: "Elite" },
        { name: "Duct & Pipe Sizer" },
        { name: "SolidWorks" },
        { name: "Enscape" },
        { name: "Recap" },
        { name: "Microsoft Office" }
      ]
    }
  ],

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Advanced" }
  ],

  workflow: [
    {
      title: "Design Review",
      text: "Review consultant design packages across SD and DD stages and flag coordination issues between disciplines.",
      applied: "Dariya"
    },
    {
      title: "Revit MEP Modeling",
      text: "Develop 3D mechanical models for HVAC, Fire Fighting, Plumbing, Medical Gas and machinery.",
      applied: "BEC Arabia · BIM Works"
    },
    {
      title: "Multi-discipline Coordination",
      text: "Coordinate mechanical systems with MEP, architectural and structural disciplines, including models aligned with point cloud data.",
      applied: "Amaala Staff Village · Metro Station · Adahi"
    },
    {
      title: "Clash Detection",
      text: "Run clash detection in Navisworks and resolve conflicts in the model.",
      applied: "BIM Works"
    },
    {
      title: "Shop / Execution Drawings",
      text: "Prepare shop, execution and builder's work drawings, schedules and material take-offs.",
      applied: "Bustan Park · Amaala Civic Assets · Moral Tower"
    },
    {
      title: "LOD Development",
      text: "Upgrade models from LOD 200 to LOD 500 so they are suitable for fabrication and installation.",
      applied: "Adahi · Amaala · Tharba"
    },
    {
      title: "As-Built / Asset Data",
      text: "Deliver as-built MEP drawings and mechanical asset data for the project's asset register.",
      applied: "Tharba Medical Center · Amaala Staff Village"
    }
  ],

  automation: {
    title: "Revit MEP Supports Add-in",
    status: "In development",
    summary:
      "A BIM automation initiative: a Revit MEP add-in that places supports automatically on ducts, pipes and cable trays, reducing the repetitive manual modeling needed for fabrication-level MEP models.",
    scope: [
      { name: "Duct supports", system: "hvac" },
      { name: "Pipe supports", system: "plumbing" },
      { name: "Cable tray supports", system: "tray" }
    ],
    why: "Supports are one of the most repetitive parts of detailed MEP modeling. Automating their placement frees time for coordination and drawing quality on LOD 500 work."
  },

  education: {
    degree: "Bachelor's Degree of Mechanical Power Engineering",
    school: "Damietta University",
    date: "May 2024",
    grade: "Very Good with Honors",
    project: "Solar Powered Portable Desalination Unit Using Air Humidification",
    projectGrade: "Excellent"
  },

  courses: [
    {
      title: "BIM Diploma",
      provider: "Niqat Global",
      period: "Feb 2025 – Nov 2025",
      text: "A 9-month BIM diploma covering LOD 100 – LOD 500 and BIM dimensions (3D – 7D), with interactive sessions led by industry experts focusing on advanced BIM applications and workflows.",
      points: [],
      tools: ["Revit", "Civil 3D", "Dynamo", "Navisworks", "ACC", "Recap"]
    },
    {
      title: "MEP Diploma",
      provider: "ENG.X",
      period: "Mar 2024 – Oct 2024",
      text: "A comprehensive diploma in MEP systems, focusing on practical skills and software proficiency.",
      points: [
        "HVAC systems design and installation.",
        "Fire fighting systems design and installation.",
        "Plumbing systems design and installation.",
        "Graduation project: designing a hospital from scratch for HVAC, fire fighting, plumbing and medical gas systems."
      ],
      tools: ["AutoCAD", "Revit", "Duct Sizer", "HAP", "Elite"]
    }
  ]
};
