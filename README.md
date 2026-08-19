🏦 Autonomous AI-Powered Cheque Processing SystemAn advanced, end-to-end fintech solution engineered to eliminate queue friction in semi-urban and rural banking. By combining intelligent document processing with accessible financial inclusion tools, this system bridges the digital divide for both bank clerks and feature-phone customers while ensuring institutional-grade security.📋 Table of ContentsCore FeaturesSystem WorkflowTechnology StackProject StructureGetting StartedUsage GuideRoadmapLicense🌟 Core FeaturesIntelligent OCR & AI Cross-Verification: Extracts key cheque fields instantly and runs a specialized pipeline to cross-verify numerical values against written amounts.Geo-Velocity Risk Scoring: Evaluates transaction velocity and location patterns in real-time, displaying a color-coded fraud risk level (Green: Safe, Yellow: Review, Red: High Risk).Inclusive IVR & SMS Authorization: Bridges the digital divide by triggering automated smartphone notifications or IVR voice calls for one-tap voice verification for feature-phone users.Cost-Effective UV Watermark Checks: Utilizes an innovative smartphone flash simulation technique for secure ultraviolet watermark validations without expensive specialized hardware.Tamper-Proof Blockchain Audit Trail: Records every verified transaction onto a cryptographic ledger, establishing an immutable audit trail to eliminate insider tampering.🔄 System WorkflowPlaintext[ Snap Photo via Web UI ] 
        │
        ▼
[ OCR & Field Extraction ] ──► [ AI Cross-Verification (Figures vs. Words) ]
        │
        ▼
[ Geo-Velocity Risk Scoring ] ──► [ Color-Coded Dashboard (Green / Yellow / Red) ]
        │
        ├─► [ Smartphone Flash Simulation (UV Watermark Check) ]
        │
        └─► [ IVR Call / SMS Trigger for Feature-Phone Authorization ]
                        │
                        ▼
         [ Cryptographic Blockchain Audit Trail ]
💻 Technology StackComponentTechnology / ToolsFrontend UIHTML5, CSS3, JavaScript / React (Responsive Web Interface)Backend APIPython, Flask FrameworkAI & Computer VisionOpenCV, YOLO / Roboflow, Custom OCR PipelineVoice & NotificationsTwilio API (Automated IVR & SMS Frameworks)Security & LedgerCustom Cryptographic Hashing (Blockchain Audit Trail)📂 Project StructurePlaintextautonomous-cheque-processor/
│
├── backend/
│   ├── app.py               # Main Flask application entry point
│   ├── models/              # AI pipelines, OCR parsers, and blockchain logic
│   ├── utils/               # Geo-velocity risk scoring & flash simulation helpers
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── public/              # Static assets and index template
│   └── src/                 # React components and dashboard views
│
├── .env.example             # Template for environment variables
└── README.md                # Project documentation
🚀 Getting StartedPrerequisitesPython 3.8+pip package managerNode.js & npm (for frontend components)Installation & SetupClone the repository:Bashgit clone https://github.com/your-username/autonomous-cheque-processor.git
cd autonomous-cheque-processor
Set up the backend environment:Bashcd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Configure environment variables:Create a .env file in the root directory based on .env.example:Code snippetFLASK_APP=app.py
FLASK_ENV=development
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
Run the application:Bashpython app.py
📌 Usage GuideClerk Portal: Log into the web interface and use the camera capture tool to snap a clear photo of the physical cheque.Automated Verification: The system parses text, executes the AI cross-check, and computes the geo-velocity risk score.Customer Authorization: If flagged or required, the system dispatches an automated IVR call or SMS to the account holder's feature phone for voice confirmation.Final Settlement: Upon successful authorization, transaction details are sealed into the cryptographic blockchain audit trail, updating the clerk dashboard instantly.🗺️ Roadmap[x] Core OCR extraction and figure-to-word cross-verification[x] Color-coded geo-velocity risk dashboard[x] IVR and SMS integration for feature-phone authorization[ ] Advanced YOLO-based multi-cheque batch processing[ ] Extended mobile application wrapper for bank field agents🤝 ContributingContributions, bug reports, and feature requests are welcome! Feel free to check out the issues page or submit a pull request.
