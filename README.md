# 🏦 Autonomous AI-Powered Cheque Processing System

An advanced, end-to-end fintech solution engineered to eliminate queue friction in semi-urban and rural banking. By combining intelligent document processing with accessible financial inclusion tools, this system bridges the digital divide for both bank clerks and feature-phone customers while ensuring institutional-grade security.

---

## 📋 Table of Contents
* [Core Features](#-core-features)
* [System Workflow](#-system-workflow)
* [Technology Stack](#-technology-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Usage Guide](#-usage-guide)
* [Roadmap](#-roadmap)
* [License](#-license)

---

## 🌟 Core Features

* **Intelligent OCR & AI Cross-Verification:** Extracts key cheque fields instantly and runs a specialized pipeline to cross-verify numerical values against written amounts.
* **Geo-Velocity Risk Scoring:** Evaluates transaction velocity and location patterns in real-time, displaying a color-coded fraud risk level (`Green`: Safe, `Yellow`: Review, `Red`: High Risk).
* **Inclusive IVR & SMS Authorization:** Bridges the digital divide by triggering automated smartphone notifications or IVR voice calls for one-tap voice verification for feature-phone users.
* **Cost-Effective UV Watermark Checks:** Utilizes an innovative smartphone flash simulation technique for secure ultraviolet watermark validations without expensive specialized hardware.
* **Tamper-Proof Blockchain Audit Trail:** Records every verified transaction onto a cryptographic ledger, establishing an immutable audit trail to eliminate insider tampering.

---

## 🔄 System Workflow

```text
[ Snap Photo via Web UI ] 
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
```
## 💻 Technology Stack
* ComponentTechnology / ToolsFrontend UIHTML5, CSS3, JavaScript / React (Responsive Web Interface)
* Backend APIPython, Flask FrameworkAI & Computer VisionOpenCV, YOLO / Roboflow, Custom OCR PipelineVoice & Notifications 
* Security & Ledger Custom Cryptographic Hashing (Blockchain Audit Trail)

## 📂 Project StructurePlaintextautonomous-cheque-processor/
```text
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
```
## 🚀 Getting Started Prerequisites
* Python 3.8+pip package managerNode.js & npm (for frontend components)
* Installation & SetupClone the repository:
  ``` git clone [https://github.com/codewithakshyaaa/autonomous-cheque-processor.git](https://github.com/codewithakshyaaa/autonomous-cheque-processor.git)```
* cd autonomous-cheque-processor
* Set up the backend environment:Bashcd backend
```python -m venv venv```
source venv/bin/activate
 # On Windows: venv\Scripts\activate
* pip install -r requirements.txt
* Configure environment variables:Create a .env file in the root directory based on .env.example:Code snippetFLASK_APP=app.py
* FLASK_ENV=development
* TWILIO_ACCOUNT_SID=your_sid_here
* TWILIO_AUTH_TOKEN=your_token_here
*Run the application:Bashpython app.py

## 📌 Usage GuideClerk Portal: 
Log into the web interface and use the camera capture tool to snap a clear photo of the physical cheque.
Automated Verification: The system parses text, executes the AI cross-check, and computes the geo-velocity risk score.Customer Authorization: If flagged or required, the system dispatches an automated IVR call or SMS to the account holder's feature phone for voice confirmation.
Final Settlement: Upon successful authorization, transaction details are sealed into the cryptographic blockchain audit trail, updating the clerk dashboard instantly.
## 🗺️ Roadmap[x]
Core OCR extraction and figure-to-word cross-verification[x] Color-coded geo-velocity risk dashboard[x] IVR and SMS integration for feature-phone authorization[ ] Advanced YOLO-based multi-cheque batch processing[ ] Extended mobile application wrapper for bank field agents

##🤝 Contributing 
* Contributions, bug reports, and feature requests are welcome! Feel free to check out the issues page or submit a pull request.
