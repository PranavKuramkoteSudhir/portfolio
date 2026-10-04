// ============================================================
// SITE CONTENT — edit this file, then run `npm run build`.
// Every page is generated from the data below.
// ============================================================

export const site = {
  name: 'Pranav Kuramkote Sudhir',
  shortName: 'Pranav K. Sudhir',
  initials: 'PS',
  role: 'AI Engineer',
  tagline: 'RAG, LLM agents & production ML',
  url: 'https://www.pranavkuramkotesudhir.com',
  description:
    'Pranav Kuramkote Sudhir is an AI engineer building RAG assistants, LLM agents and predictive models on real plant data.',
  location: 'Vance, AL',
  relocation: 'Open to relocation',
  status: 'Open to AI engineering roles',
  currently: 'Now at Mercedes-Benz',
  email: 'pranavkuramkotesudhir@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/pranav-kuramkote-sudhir-a46359168/',
    github: 'https://github.com/PranavKuramkoteSudhir',
    leetcode: 'https://leetcode.com/u/PranavKuramkoteSudhir/',
  },
  // Replace this file with your latest resume (keep the same name, or change it here).
  resume: 'assets/PranavKuramkoteSudhir.pdf',
  photo: { webp: 'assets/img/profile.webp', jpg: 'assets/img/profile.jpg', alt: 'Portrait of Pranav Kuramkote Sudhir' },
};

// Project categories. Colors are CSS custom properties defined in assets/css/site.css.
export const CATS = {
  genai: { label: 'GenAI', color: 'var(--c1)' },
  agents: { label: 'Agents', color: 'var(--c2)' },
  ml: { label: 'ML', color: 'var(--c3)' },
  data: { label: 'Data platform', color: 'var(--c4)' },
};

// Industry projects — each one gets its own page at /work/<slug>/
export const PROJECTS = [
  {
    slug: 'plant-knowledge-assistant', cat: 'genai', title: 'Plant knowledge assistant',
    where: 'Mercedes-Benz', when: '2024 – now', context: 'Prototyped first at Veeco',
    res: ['85%', 'answer acceptance from 200+ engineers'],
    blurb: 'Plain-English questions, cited answers from SOPs, maintenance manuals and quality reports in seconds.',
    problem: 'The answers technicians needed were spread across SOPs, maintenance manuals and quality reports. Finding the right paragraph meant searching shared drives or asking whoever knew.',
    built: [
      'Prototyped a RAG chatbot with LlamaIndex over Veeco service manuals and troubleshooting logs.',
      'Built the plant version at Mercedes-Benz with LangChain and vector search over SOPs, manuals and quality reports.',
      'Every answer cites its source documents, so people can check it before acting.',
      'Tracked answer acceptance with users as the main quality signal.',
    ],
    out: [['200+', 'engineers and technicians using it'], ['85%', 'answer acceptance'], ['−40%', 'time-to-answer in the Veeco pilot']],
    flow: [['Sources', 'SOPs, manuals, quality reports'], ['Embed', 'Chunked and embedded'], ['Retrieve', 'Vector search, top passages', 'core'], ['Generate', 'LLM answers from passages'], ['Cite', 'Answer with sources', 'end']],
    stack: ['LangChain', 'LlamaIndex', 'Vector search', 'Embeddings', 'Azure OpenAI', 'LLM evaluation', 'Python'],
    motif: [3, 5, 4, 7, 6, 9, 8, 11, 10, 12],
  },
  {
    slug: 'plant-agents', cat: 'agents', title: 'Tool-calling plant agents',
    where: 'Mercedes-Benz', when: '2025 – now', context: 'Phase 2 of the plant roadmap',
    res: ['5 shops', 'in the phased rollout'],
    blurb: 'Agents that turn requests into SQL, refresh dashboards, and raise alerts or tickets, with a person approving each action.',
    problem: 'Phase 1 gave the plant one source of truth and dashboards. People still had to turn each question into a query, a dashboard change or a ticket by hand.',
    built: [
      'Built agents that choose between tools: text-to-SQL, dashboard generation and refresh, alerts and maintenance tickets.',
      'Kept a human-in-the-loop approval step before any action reaches plant systems.',
      'Rolled out in Agile sprints with production, quality, maintenance and IT, with user training across 5 shops.',
    ],
    out: [['SQL', 'written from plain-English questions'], ['Tickets', 'raised by agents, approved by people'], ['5 shops', 'covered by the rollout']],
    flow: [['Request', 'A question in plain English'], ['Plan', 'Agent picks a tool', 'core'], ['Act', 'SQL, dashboard or ticket'], ['Approve', 'A person confirms'], ['Done', 'Query, view or work order', 'end']],
    stack: ['LLM agents', 'Tool calling', 'Text-to-SQL', 'LangChain', 'FastAPI', 'Databricks', 'Power BI'],
    motif: [4, 4, 6, 5, 8, 7, 9, 9, 11, 12],
  },
  {
    slug: 'predictive-maintenance', cat: 'ml', title: 'Predictive maintenance',
    where: 'Mercedes-Benz · Veeco', when: '2024 – now', context: 'Line and tool sensor data',
    res: ['−15%', 'unplanned downtime on pilot lines'],
    blurb: 'Anomaly detection and failure prediction on sensor time series, wired to alerts and work orders.',
    problem: 'Static alarm thresholds fire late, or not at all, when a process drifts slowly. By the time a failure is obvious the line is already down.',
    built: [
      'Trained Isolation Forest and autoencoder models on high-frequency sensor data (temperature, pressure, flow).',
      'Trained XGBoost and LightGBM models to predict component failures.',
      'Tracked experiments and models in MLflow.',
      'Wired model outputs to alerts and work orders so maintenance teams act before a failure.',
    ],
    out: [['−15%', 'unplanned downtime on pilot lines'], ['6 h', 'earlier drift detection than static alarms'], ['0.86', 'F1 on failure prediction']],
    flow: [['Sense', 'Temperature, pressure, flow'], ['Shape', 'Windows and rolling features'], ['Score', 'Anomaly and failure risk', 'core'], ['Alert', 'Thresholds set with maintenance'], ['Fix', 'Work order opened', 'end']],
    stack: ['Isolation Forest', 'Autoencoders', 'XGBoost', 'LightGBM', 'scikit-learn', 'PyTorch', 'MLflow'],
    motif: [6, 5, 6, 7, 5, 6, 12, 6, 5, 6],
  },
  {
    slug: 'plant-lakehouse', cat: 'data', title: 'Plant lakehouse',
    where: 'Mercedes-Benz', when: '2025 – now', context: 'Phase 1 of the plant roadmap',
    res: ['10+ → 1', 'data sources in one governed lakehouse'],
    blurb: 'MES, SAP, quality inspection and line-sensor data in one Azure Databricks lakehouse.',
    problem: 'Each team worked from its own extracts, so the same metric could show different numbers in different meetings.',
    built: [
      'Ingested 10+ siloed plant sources with PySpark into Delta Lake on Azure Databricks.',
      'Modeled shared tables for production, quality and maintenance, with data-quality checks.',
      'Made the lakehouse the base for every later dashboard, assistant and model.',
    ],
    out: [['10+', 'sources unified'], ['1', 'governed source of truth'], ['3 teams', 'production, quality, maintenance']],
    flow: [['Sources', 'MES, SAP, QC, sensors'], ['Ingest', 'PySpark, Data Factory'], ['Store', 'Delta Lake, quality-checked', 'core'], ['Model', 'Shared plant tables'], ['Serve', 'Dashboards, RAG, ML', 'end']],
    stack: ['Azure Databricks', 'PySpark', 'Delta Lake', 'Data Factory', 'ADLS', 'Data modeling'],
    motif: [10, 9, 8, 7, 6, 5, 4, 3, 2, 2],
  },
  {
    slug: 'cloud-data-pipelines', cat: 'data', title: 'Cloud data pipelines',
    where: 'HCL Technologies', when: '2021 – 2023', context: 'Fortune 500 client',
    res: ['−30%', 'monthly compute cost'],
    blurb: 'Batch and streaming pipelines on AWS at 2 TB+ a day, plus a zero-loss migration off legacy ETL.',
    problem: 'The client ran a large daily data load on legacy on-premises SQL Server jobs, with slow runtimes and rising compute costs.',
    built: [
      'Built batch and streaming ETL/ELT on S3, Glue, Lambda, Kinesis and Redshift with PySpark.',
      'Migrated 40+ legacy SQL Server jobs to AWS with parallel-run validation.',
      'Tuned partitioning, file compaction and Redshift sort and distribution keys.',
      'Orchestrated 50+ production pipelines in Airflow with quality checks and alerting.',
    ],
    out: [['2 TB+', 'processed daily'], ['−45%', 'job runtimes'], ['99.5%', 'on-time SLA'], ['0', 'data lost in migration']],
    flow: [['Sources', 'Batch and streaming'], ['Ingest', 'Kinesis, Lambda, S3'], ['Transform', 'Glue and PySpark', 'core'], ['Warehouse', 'Redshift, tuned'], ['Deliver', '99.5% on time', 'end']],
    stack: ['S3', 'Glue', 'Lambda', 'Kinesis', 'Redshift', 'PySpark', 'Airflow', 'Jenkins'],
    motif: [8, 8, 7, 6, 6, 5, 5, 4, 4, 4],
  },
];

// GitHub repos. To fill an empty slot, replace { slot: true, ... } with an object like the filled ones.
// `img` is optional (800×500 works well); `demo` is optional.
export const REPOS = [
  {
    name: 'mail_classifiaction', title: 'GPT-style transformer from scratch', lang: 'Python',
    desc: 'A decoder-only transformer in NumPy and core Python: multi-head attention, layer norm and greedy decoding, trained on email to draft replies and summaries.',
    topics: ['transformers', 'numpy', 'llm'],
    url: 'https://github.com/PranavKuramkoteSudhir/mail_classifiaction',
    img: 'assets/img/repo-mail-transformer.webp',
  },
  {
    name: 'Toxic-comments-analysis', title: 'Toxic comment classifier', lang: 'Python',
    desc: 'Multi-label NLP model on the Jigsaw dataset that flags six kinds of toxicity, served through a Flask API in Docker.',
    topics: ['nlp', 'lstm', 'flask', 'docker'],
    url: 'https://github.com/PranavKuramkoteSudhir/Toxic-comments-analysis', demo: 'https://toxic-comments-analysis.onrender.com/',
    img: 'assets/img/repo-toxic-comments.webp',
  },
  {
    name: 'portfolio', title: 'This website', lang: 'JavaScript',
    desc: 'A dependency-free static site generator in Node that builds every page from one content file, with CI checks and deploys through GitHub Actions.',
    topics: ['static-site', 'github-actions', 'github-pages'],
    url: 'https://github.com/PranavKuramkoteSudhir/portfolio',
    img: 'assets/img/repo-portfolio.webp',
  },
  { slot: true, idea: 'Text-to-SQL agent with an approval step', why: 'A public version of the plant agents, showing the human-in-the-loop pattern.', lang: 'Python' },
  { slot: true, idea: 'Databricks medallion pipeline template', why: 'Bronze, silver and gold Delta tables with quality checks.', lang: 'PySpark' },
  { slot: true, idea: 'Sensor anomaly detection notebook', why: 'Isolation Forest vs autoencoder on an open industrial dataset.', lang: 'Jupyter' },
];

export const JOBS = [
  {
    now: true, title: 'Data Analyst', org: 'Mercedes-Benz', place: 'Vance, AL', when: '11/2025 – Present',
    rel: ['plant-knowledge-assistant', 'plant-agents', 'predictive-maintenance', 'plant-lakehouse'],
    pts: [
      'Built RAG assistants adopted by 200+ engineers and technicians, with 85% answer acceptance.',
      'Extended the platform with tool-calling agents that write SQL, refresh dashboards and raise tickets with human approval.',
      'Delivered anomaly-detection and failure-prediction models that cut unplanned downtime 15% on pilot lines.',
      'Centralized 10+ plant data sources into an Azure Databricks lakehouse.',
      'Ran the phased data-and-AI roadmap across 5 shops, tracking scope, risks and dependencies in Jira.',
    ],
  },
  {
    title: 'Data Scientist, Co-op', org: 'Veeco Instruments', place: 'San Jose, CA', when: '07/2024 – 12/2024',
    rel: ['plant-knowledge-assistant', 'predictive-maintenance'],
    pts: [
      'Prototyped a LlamaIndex RAG chatbot that cut field engineers’ time-to-answer by 40% in pilot testing.',
      'Flagged process drift 6 hours earlier than static alarms with Isolation Forest and autoencoders.',
      'Reached 0.86 F1 on component-failure prediction and wired predictions to service tickets.',
      'Built Power BI tool-health dashboards that informed maintenance planning for 3 product lines.',
    ],
  },
  {
    title: 'Member Technical Staff / Data Engineer', org: 'HCL Technologies', place: 'Bengaluru, India', when: '02/2021 – 06/2023',
    rel: ['cloud-data-pipelines'],
    pts: [
      'Built AWS batch and streaming pipelines processing 2 TB+ of data daily for a Fortune 500 client.',
      'Cut Spark and Redshift runtimes 45% and monthly compute costs 30%.',
      'Migrated 40+ legacy SQL Server ETL jobs to AWS with zero data loss.',
      'Ran sprint planning and client demos, wrote runbooks and onboarded 3 new engineers.',
    ],
  },
  {
    title: 'Trainee Software Engineer', org: 'Quest Global', place: 'Bengaluru, India', when: '11/2019 – 10/2020', rel: [],
    pts: ['Built Python and SQL automation for data validation and report generation, cutting manual effort by 30%.'],
  },
];

export const SKILLS = [
  ['GenAI & agents', 'genai', ['RAG', 'LangChain', 'LlamaIndex', 'Tool calling', 'Vector search', 'Azure OpenAI', 'LLM evaluation', 'Prompt engineering']],
  ['Machine learning', 'ml', ['Anomaly detection', 'XGBoost', 'LightGBM', 'PyTorch', 'scikit-learn', 'Time series', 'pandas', 'NumPy']],
  ['Data engineering', 'data', ['Databricks', 'Spark', 'PySpark', 'Delta Lake', 'Airflow', 'dbt', 'ETL / ELT', 'Data modeling']],
  ['Cloud', 'data', ['AWS S3', 'Glue', 'Lambda', 'Redshift', 'Athena', 'Azure Data Factory', 'ADLS']],
  ['MLOps', 'agents', ['MLflow', 'Docker', 'FastAPI', 'REST APIs', 'GitHub Actions', 'Jenkins', 'CI/CD']],
  ['Delivery & BI', 'agents', ['Agile / Scrum', 'Jira', 'Stakeholder management', 'KPI design', 'Power BI', 'DAX', 'Tableau']],
];

export const EDUCATION = [
  ['M.S., Data Analytics', 'Northeastern University, Boston', '2025'],
  ['B.E., Mechanical Engineering', 'Siddaganga Institute of Technology', '2019'],
];

export const CERTS = [
  ['AWS Certified Data Engineer – Associate', 'Amazon Web Services', '2025'],
  ['Machine Learning Specialization', 'DeepLearning.AI', '2026'],
  ['Data Science Professional Certificate', 'IBM', '2023'],
];

export const STORY = [
  'I studied mechanical engineering, so I learned how production lines work before I learned how to model their data. That still shapes how I build: start with the people on the floor and the decision they need to make.',
  'Two years as a data engineer on AWS taught me that reliable pipelines matter more than clever models. A co-op at Veeco took me into failure prediction and my first RAG system.',
  'At Mercedes-Benz I’ve helped take a plant from scattered data to one lakehouse, then to assistants, agents and models that act on it.',
];
