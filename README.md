🏦 Autonomous AI-Powered Cheque Processing System
An advanced, end-to-end fintech solution engineered to eliminate queue friction in semi-urban and rural banking. By combining intelligent document processing with accessible financial inclusion tools, this system bridges the digital divide for both bank clerks and feature-phone customers while ensuring institutional-grade security.

🌟 Key Features
Intelligent OCR & AI Cross-Verification: Instantly extracts key cheque fields (Payee, Amount in Figures, Amount in Words, Account Number, MICR) and runs a specialized pipeline to cross-verify numerical values against written amounts.

Geo-Velocity Risk Scoring: Calculates real-time risk metrics based on transaction velocity and location patterns, instantly flagging anomalies on an intuitive color-coded dashboard (Green: Safe, Yellow: Review, Red: High Risk).

Inclusive IVR & SMS Authorization: Bridges the digital divide by automatically triggering smartphone notifications or an automated IVR voice call to feature-phone users for seamless one-tap voice verification.

Cost-Effective UV Watermark Checks: Implements an innovative smartphone flash simulation technique to perform ultraviolet security watermark validations without requiring expensive, specialized hardware.

Tamper-Proof Blockchain Audit Trail: Records every verified transaction onto a cryptographic ledger, establishing an immutable audit trail to eliminate insider tampering and ensure total accountability.

🏗️ System Architecture & Workflow
Plaintext
[ Snap Photo via Web UI ] 
        │
        ▼
[ OCR & Field Extraction ] ──► [ AI Cross-Verification (Figures vs. Words) ]
        │
        ▼
[ Geo-Velocity Risk Scoring ] ──► [ Color-Dashed Dashboard (Green / Yellow / Red) ]
        │
        ├─► [ Smartphone Flash Simulation (UV Watermark Check) ]
        │
        └─► [ IVR Call / SMS Trigger for Feature-Phone Authorization ]
                        │
                        ▼
         [ Cryptographic Blockchain Audit Trail ]
💻 Tech Stack
Frontend: Responsive web interface for bank clerks (HTML5, CSS3, JavaScript / React)

Backend: Flask / Python API server for handling requests and pipeline orchestration

AI & Computer Vision: Python, OpenCV, YOLO / Roboflow for object detection and document processing pipelines

Voice & Notification Services: Twilio / Automated IVR and SMS integration frameworks

Security & Ledger: Cryptographic hashing libraries for the local blockchain audit trail

🚀 Getting Started
Prerequisites
Python 3.8+

pip package manager

Node.js & npm (if using a React frontend component)

Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/autonomous-cheque-processor.git
cd autonomous-cheque-processor
Set up the backend environment:

Bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
Configure environment variables:
Create a .env file in the root directory and add your required API keys (e.g., Twilio credentials, database URIs, etc.):

Code snippet
FLASK_APP=app.py
FLASK_ENV=development
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
Run the application:

Bash
python app.py
📌 Usage Guide
Clerk Portal: Log into the web interface and use the camera capture tool to snap a clear photo of the physical cheque.

Automated Verification: The system instantly parses text, runs the AI cross-check, and evaluates the geo-velocity risk score.

Customer Authorization: If flagged or required, the system automatically dispatches an IVR call or SMS to the account holder's feature phone for voice confirmation.

Final Settlement: Once authorized, the transaction details are locked into the blockchain audit trail, and the status updates on the dashboard.

🤝 Contributing
Contributions, bug reports, and feature requests are welcome!
