const frameworkInfo = {
    "Scrum": {
      description: [
        "Scrum is one of the most widely used Agile frameworks, known for its sprint-based structure, fixed roles (Scrum Master, Product Owner, Developers), and emphasis on iterative delivery. It is highly effective for fast-paced product development projects where requirements evolve rapidly and quick feedback loops are essential. Based on your decision weights, Scrum is best suited for small, cross-functional teams that can deliver weekly, prefer flexible workflows, and prioritize scope as the most adjustable constraint. It thrives in non-regulated environments and integrates seamlessly with modern tools like Jira and Trello.",
        "-Scrum is great for startups or small dev teams building apps, software features, or prototypes.",
        "-Choose Scrum when teamwork, feedback, and speed matter more than long-term forecasting."
      ].join("\n\n"),
      getStarted: "https://trello.com/b/Ea23VnF7/scrum-framework-template",
      learnMore: "https://www.atlassian.com/agile/scrum"
    },
    "Kanban": {
      description: [
        "Kanban is a visual workflow management system designed to optimize continuous delivery without imposing iterations or specific roles. It’s great for operations, service teams, or teams looking to evolve their workflow organically. Your decision weights show that Kanban fits small, cross-functional teams delivering daily, who need flexible, visual workflows, and operate in non-regulated environments. It’s especially effective when schedule flexibility is key and tools like Trello or Jira are already in place.",
        "-Use Kanban for DevOps, customer support, marketing campaigns, or any team handling frequent task inflow.",
        "-Choose Kanban when flow efficiency and work-in-progress visibility matter most."
      ].join("\n\n"),
      getStarted: "https://trello.com/b/bo4pS2cF/kanban-framework-template",
      learnMore: "https://www.atlassian.com/agile/kanban"
    },
    "SAFe": {
      description: [
        "SAFe is a structured Agile framework tailored for large enterprises needing to scale Agile across multiple teams and departments. It introduces roles like Release Train Engineers and aligns team execution with business strategy. According to your model, SAFe fits large, cross-functional teams in regulated industries (e.g., healthcare, finance) that deliver weekly or monthly and require both governance and agility. It supports flexible changes, focuses on scope management, and is ideal when tools are already in use for coordination and tracking.",
        "-SAFe is ideal for digital transformation efforts or enterprise-wide software development.",
       "-Choose SAFe if multiple teams need to align under shared planning and delivery cycles."
      ].join("\n\n"),
      getStarted: "https://trello.com/b/faJlpTDO/safe-framework-template",
      learnMore: "https://www.atlassian.com/scale/agile/scaled-agile-framework"
    },
    "Six Sigma": {
      description: [
        "Six Sigma is a process improvement methodology that aims to reduce defects and enhance quality through data-driven decisions, often applied in manufacturing, logistics, and healthcare. It’s more analytical than iterative, emphasizing statistical control rather than adaptability. Your weights suggest Six Sigma is best for large teams in highly regulated industries where budget is the primary constraint, deliverables are often on demand, and the environment is structured and inflexible.",
        "-Six Sigma is most effective in environments where precision, efficiency, and quality are top priorities.",
        "-Choose Six Sigma for stable processes needing optimization—not rapidly changing product builds."        
      ].join("\n\n"),
      getStarted: "https://www.isixsigma.com/",
      learnMore: "https://www.tutorialspoint.com/six_sigma/index.htm"
    },
    "PRINCE2": {
      description: [
        "PRINCE2 is a governance-focused project management methodology originating in the UK government sector. It breaks projects into controlled stages and is known for its rigor, documentation, and role clarity. Based on your scoring, PRINCE2 works best for large, non-cross-functional teams delivering on a weekly cadence in regulated environments. It favors rigid planning, prioritizes budget control, and suits teams using tracking tools where visibility and compliance are critical.",
        "-Use PRINCE2 for infrastructure, policy, or government-funded projects where audits are likely.",
        "-Choose this framework when you need structure, accountability, and clearly assigned roles."
      ].join("\n\n"),
      getStarted: "https://www.axelos.com/best-practice-solutions/prince2",
      learnMore: "https://www.prince2.com/eur"
    },
    "Stage-Gate": {
      description: [
        "Stage-Gate is a phase-based approach to product development commonly used in industries like pharmaceuticals and hardware engineering. Projects pass through predefined gates where continuation is reviewed based on business case alignment. According to your analysis, Stage-Gate is ideal for large, structured teams in regulated industries, delivering monthly with limited flexibility. It’s especially suited for organizations prioritizing budget control, formal checkpoints, and senior-level oversight.",
        "-Stage-Gate works best for R&D and innovation projects requiring multiple internal reviews.",
        "-Choose Stage-Gate when decisions need executive approval before progressing."
      ].join("\n\n"),
      getStarted: "https://trello.com/b/bcUw8gGG/stage-gate-framework-template",
      learnMore: "https://www.prod-dev.com/stage-gate-model/"
    },
    "LeSS": {
      description: [
        "LeSS is a minimal extension of Scrum for scaling across multiple teams working on the same product. It maintains Agile values while simplifying coordination between teams. Based on your scoring logic, LeSS is most appropriate for medium-sized, cross-functional teams delivering weekly in non-regulated, product-focused settings. It allows some flexibility, favors scope adjustability, and works well when multiple Scrum teams need to align with minimal process overhead.",
        "-LeSS is excellent for scaling product teams without heavy governance or complex process layers.",
        "-Choose LeSS when your teams already use Scrum but now need to coordinate more closely."
      ].join("\n\n"),
      getStarted: "https://less.works/",
      learnMore: "https://www.scaledagileframework.com/compare-less-and-safe/"
    },
    "Waterfall": {
      description: [
        "Waterfall is a traditional, linear project management methodology where each phase—requirements, design, development, testing—must be completed before moving to the next. It’s best suited for projects with fixed scope and minimal expected change. According to your weights, Waterfall is ideal for medium-sized teams operating in regulated sectors with a monthly deliverable cycle, low flexibility, structured workflows, and strong emphasis on budget control.",
        "-Waterfall fits well in civil engineering, defense, and regulated manufacturing.",
        "-Choose Waterfall if you need high predictability, heavy documentation, and sequential sign-offs."
      ].join("\n\n"),
      getStarted: "https://www.atlassian.com/agile/project-management/waterfall",
      learnMore: "https://www.wrike.com/project-management-guide/methodologies/waterfall/"
    },
    "Disciplined Agile": {
      description: [
        "Disciplined Agile is a flexible process decision toolkit that blends strategies from multiple Agile approaches (Scrum, Kanban, SAFe, XP) and helps organizations define their own 'Way of Working' (WoW). Your data suggests DA suits small teams working on process improvement or product dev, delivering daily, with schedule flexibility, and working in moderately regulated environments. It’s ideal for organizations that want to apply Agile principles but also require guidance on tailoring their approach across business functions.",
        "-DA is especially useful in enterprise settings moving from chaos to guided agility.",
        "-Choose DA when you need structured choices rather than one prescribed method."
      ].join("\n\n"),
      getStarted: "https://www.pmi.org/disciplined-agile",
      learnMore: "https://www.techwell.com/techwell-insights/2019/09/what-disciplined-agile-delivery"
    },
    "Crystal": {
      description: [
        "Crystal is an Agile family that prioritizes people, communication, and team context over rigid processes. It adapts based on team size and criticality, with the goal of minimizing process overhead. Based on your weights, Crystal fits small, cross-functional teams working on product development with daily deliveries, high flexibility, and no regulatory constraints. It’s perfect for creative environments or startups where lightweight practices and team trust are more valuable than documentation and structure.",
        "-Crystal excels in face-to-face environments where close collaboration and rapid iteration are key.",
        "-Choose Crystal if your team values adaptability, low process friction, and fast decision-making."
      ].join("\n\n"),
      getStarted: "https://agilemanifesto.org/",
      learnMore: "https://www.agilealliance.org/agile101/crystal/"
    }
  };
  
  export default frameworkInfo;
  