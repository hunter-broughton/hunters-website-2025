import os
import json
import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class KnowledgeItem:
    """Represents a piece of knowledge about Hunter's portfolio"""
    content: str
    category: str  # e.g., "projects", "skills", "experience", "education", "personal"
    metadata: Dict[str, Any]
    embedding: Optional[np.ndarray] = None

class PortfolioKnowledgeBase:
    """
    ML-powered knowledge base that understands Hunter's portfolio
    Uses sentence transformers for semantic search and similarity matching
    """
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.encoder = SentenceTransformer(model_name)
        self.knowledge_items: List[KnowledgeItem] = []
        self.embeddings: Optional[np.ndarray] = None
        self.faiss_index: Optional[faiss.Index] = None
        self.is_trained = False
        
    def add_knowledge_item(self, content: str, category: str, metadata: Dict[str, Any] = None):
        """Add a new knowledge item to the database"""
        if metadata is None:
            metadata = {}
            
        # Generate embedding for the content
        embedding = self.encoder.encode([content])[0]
        
        item = KnowledgeItem(
            content=content,
            category=category,
            metadata=metadata,
            embedding=embedding
        )
        
        self.knowledge_items.append(item)
        logger.info(f"Added knowledge item: {category} - {content[:50]}...")
        
    def build_index(self):
        """Build FAISS index for fast similarity search"""
        if not self.knowledge_items:
            logger.warning("No knowledge items to index")
            return
            
        # Extract all embeddings
        embeddings = np.array([item.embedding for item in self.knowledge_items])
        self.embeddings = embeddings
        
        # Build FAISS index
        dimension = embeddings.shape[1]
        self.faiss_index = faiss.IndexFlatIP(dimension)  # Inner product (cosine similarity)
        
        # Normalize embeddings for cosine similarity
        faiss.normalize_L2(embeddings)
        self.faiss_index.add(embeddings)
        
        self.is_trained = True
        logger.info(f"Built FAISS index with {len(self.knowledge_items)} items")
        
    def search(self, query: str, top_k: int = 5, category_filter: str = None) -> List[Dict[str, Any]]:
        """Search for relevant knowledge items using semantic similarity"""
        if not self.is_trained:
            logger.warning("Knowledge base not trained. Building index...")
            self.build_index()
            
        # Encode the query
        query_embedding = self.encoder.encode([query])
        faiss.normalize_L2(query_embedding)
        
        # Search using FAISS
        scores, indices = self.faiss_index.search(query_embedding, min(top_k * 2, len(self.knowledge_items)))
        
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx >= len(self.knowledge_items):
                continue
                
            item = self.knowledge_items[idx]
            
            # Apply category filter if specified
            if category_filter and item.category != category_filter:
                continue
                
            results.append({
                "content": item.content,
                "category": item.category,
                "metadata": item.metadata,
                "similarity_score": float(score),
                "relevance": "high" if score > 0.7 else "medium" if score > 0.5 else "low"
            })
            
            if len(results) >= top_k:
                break
                
        return results
    
    def get_category_stats(self) -> Dict[str, int]:
        """Get statistics about knowledge base categories"""
        stats = {}
        for item in self.knowledge_items:
            stats[item.category] = stats.get(item.category, 0) + 1
        return stats
    
    def save(self, filepath: str):
        """Save the knowledge base to disk"""
        data = {
            "model_name": self.model_name,
            "knowledge_items": [
                {
                    "content": item.content,
                    "category": item.category,
                    "metadata": item.metadata,
                    "embedding": item.embedding.tolist() if item.embedding is not None else None
                }
                for item in self.knowledge_items
            ]
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        logger.info(f"Saved knowledge base to {filepath}")
    
    def load(self, filepath: str):
        """Load the knowledge base from disk"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        self.model_name = data["model_name"]
        self.encoder = SentenceTransformer(self.model_name)
        
        self.knowledge_items = []
        for item_data in data["knowledge_items"]:
            embedding = np.array(item_data["embedding"]) if item_data["embedding"] else None
            item = KnowledgeItem(
                content=item_data["content"],
                category=item_data["category"],
                metadata=item_data["metadata"],
                embedding=embedding
            )
            self.knowledge_items.append(item)
            
        self.build_index()
        logger.info(f"Loaded knowledge base from {filepath}")

def create_hunter_knowledge_base() -> PortfolioKnowledgeBase:
    """Create and populate the knowledge base with Hunter's portfolio information"""
    kb = PortfolioKnowledgeBase()
    
    # Personal Information & Bio
    kb.add_knowledge_item(
        "Hunter Broughton is a Computer Science and Economics student at the University of Michigan, studying from August 2023 to December 2026. What he cares about most is AI infrastructure and the cloud that powers it: the distributed systems, cluster orchestration, and deployment pipelines that let machine learning actually run reliably at scale. He's drawn to that layer because the models getting all the attention only work because of the infrastructure underneath them.",
        "personal",
        {"type": "bio", "importance": "high", "school": "University of Michigan", "focus": ["AI infrastructure", "cloud", "distributed systems", "AI/ML"]}
    )

    kb.add_knowledge_item(
        "While Hunter's focus is AI infrastructure and cloud-native systems, his love for software engineering is broad. He got into engineering because building things is fun, and that curiosity has taken him across full-stack development, machine learning, and even firmware. He likes working close to the hard parts of a system and writing code that is clean and fast. When he's not building, you can find him backpacking in Washington, playing the guitar, or trying to fix his golf swing.",
        "personal",
        {"type": "interests", "hobbies": ["backpacking", "guitar", "golf"], "breadth": ["full-stack", "machine learning", "firmware"]}
    )

    # Education Details
    kb.add_knowledge_item(
        "Hunter Broughton is pursuing a Bachelor of Science in Computer Science and Economics at the University of Michigan from August 2023 to December 2026. His Computer Science coursework includes Intro to AI (EECS 492), Distributed Systems (EECS 491), Operating Systems (EECS 482), Software Engineering (EECS 481), Conversational AI (EECS 449), Intro to Machine Learning (EECS 445), Theory of Computation (EECS 376), Computer Organization (EECS 370), Mathematics of Machine Learning (EECS 298), Data Structures and Algorithms (EECS 281), and Discrete Math (EECS 203), along with Calculus 3 (MATH 215) and Intro to Data Science (STATS 206).",
        "education",
        {"school": "University of Michigan", "degree": "BS Computer Science and Economics", "status": "current", "graduation": "December 2026"}
    )

    kb.add_knowledge_item(
        "Hunter's Economics coursework at University of Michigan includes Economic Development (ECON 461), Intermediate Macroeconomics (ECON 402), Intermediate Microeconomics (ECON 401), Game Theory (ECON 398), Business Cycle Theory (ECON 396), Macroeconomic Theory (ECON 102), and Microeconomic Theory (ECON 101).",
        "education",
        {"type": "coursework", "field": "Economics"}
    )

    # Academic Highlights / Project Coursework
    kb.add_knowledge_item(
        "For EECS 491 (Distributed Systems), Hunter built a Paxos-Based Fault-Tolerant Distributed Key/Value Service. The service uses the Paxos consensus protocol to tolerate node failures while guaranteeing linearizable reads and writes across a replicated state machine cluster. This is a core example of his interest in distributed systems and infrastructure.",
        "education",
        {"type": "academic_highlight", "course": "EECS 491", "name": "Paxos-Based Fault-Tolerant Key/Value Service", "topic": "distributed systems"}
    )

    kb.add_knowledge_item(
        "For EECS 445 (Intro to Machine Learning), Hunter designed and trained a Vision Transformer (ViT) in Python to classify dog breeds from images. He applied patch embedding, multi-head self-attention, and fine-tuning techniques to maximize classification accuracy across a multi-class dataset.",
        "education",
        {"type": "academic_highlight", "course": "EECS 445", "name": "Vision Transformer Dog Breed Classifier", "topic": "machine learning"}
    )

    kb.add_knowledge_item(
        "For EECS 370 (Computer Organization), Hunter developed an ISA simulator for the LC2K architecture in C, implementing a simulator, assembler, pipeline, and cache to optimize performance. For EECS 492 (Intro to AI), he built a Convolutional Neural Network from scratch in Python that classifies images from the CIFAR-10 dataset, using a hyperparameter grid search to optimize performance. For EECS 481 (Software Engineering), he contributed to the open-source HTTPie project, improving its authentication, error handling, and test suite.",
        "education",
        {"type": "academic_highlight", "courses": ["EECS 370", "EECS 492", "EECS 481"], "names": ["LC2K ISA", "CNN", "HTTPie Contribution"]}
    )

    # Work Experience
    kb.add_knowledge_item(
        "Hunter is a Software Engineering Intern at Microsoft in Redmond, WA (May 2026 to August 2026), working on Azure Arc Enabled Kubernetes. He engineers Cluster Extensions for Kubernetes across AKS, hybrid, and edge clusters, improving state reconciliation for hybrid and GPU workloads. His work spans automating workload identity and federated credentials to eliminate long-lived secret storage, integrating Azure Monitor with Flux-configured clusters to optimize telemetry pipelines, and abstracting GitOps, security, and observability into a unified Cluster Extension experience for multi-cluster environments. This is his most recent and current role.",
        "experience",
        {"company": "Microsoft", "position": "Software Engineering Intern", "team": "Azure Arc Enabled Kubernetes", "location": "Redmond, WA", "duration": "May 2026 - August 2026", "current": True, "technologies": ["Kubernetes", "AKS", "Azure", "GitOps", "Flux", "Go"]}
    )

    kb.add_knowledge_item(
        "Hunter worked as a System and Software Engineering Intern at Credo Semiconductor in San Jose, CA from May 2025 to August 2025. He developed features for the new PCIe software called Pilot using Vue, Vite, JavaScript, Python, C, and FastAPI. He implemented efficient algorithms for the PCIe-SDK with Python, PyTest, Regex, and multithreading, boosting throughput speed by 30%. He programmed S-parameter analysis automation and Proportional-Integral-Derivative Controllers to streamline optical testing, and won best implementation at the company hackathon for an EV-Charger management system.",
        "experience",
        {"company": "Credo Semiconductor", "position": "System and Software Engineering Intern", "location": "San Jose, CA", "duration": "May 2025 - August 2025"}
    )

    kb.add_knowledge_item(
        "At Credo Semiconductor, Hunter gained hands-on experience with Thermoelectric Temperature Controllers (TC-720), a Vector Network Analyzer, and Grafana. He worked on PCIe software development and optical systems automation, combining both software and hardware engineering skills.",
        "experience",
        {"company": "Credo Semiconductor", "type": "hardware_software", "technologies": ["TC-720", "Vector Network Analyzer", "PCIe", "Grafana"]}
    )

    kb.add_knowledge_item(
        "Hunter worked as a Software Developer Intern at Vloggi in Sydney, Australia from June 2024 to August 2024. He engineered full-stack features for Vloggi, a platform that offers MP4 data collection and management for companies. He developed and optimized web interfaces using React, Tailwind CSS, and TypeScript, integrated configurable CSS components for diverse client needs, and connected the front-end with a MySQL backend using Node.js, deploying it using AWS and Docker.",
        "experience",
        {"company": "Vloggi", "position": "Software Developer Intern", "location": "Sydney, Australia", "duration": "June 2024 - August 2024"}
    )

    # Projects - Detailed Information
    kb.add_knowledge_item(
        "Anywear is an AI-powered online marketplace for clothing that Hunter is currently developing (formerly called ThriftSwipe). The algorithm matches users with clothing based on their preferences and style, making fashion discovery effortless. It's built with Express, PostgreSQL, React, Tailwind, Python, and AI/ML technologies. The project is scaling with University of Michigan students and represents Hunter's work combining AI/ML with practical applications.",
        "projects",
        {"name": "Anywear", "aka": "ThriftSwipe", "status": "in-progress", "year": 2024, "featured": True, "impact": "scaling with UMich students", "domain": "AI/ML + E-commerce"}
    )

    kb.add_knowledge_item(
        "Hunter built an Algorithmic Trading System in Python that analyzes market data and executes trades based on predefined strategies, backtesting them against historical data. It's built with Python, Matplotlib, Pandas, NumPy, Scikit-learn, and machine learning. The project reflects his interest in applying ML and his Economics background to financial markets.",
        "projects",
        {"name": "Algorithmic Trading System", "status": "completed", "year": 2025, "featured": True, "domain": "ML + Finance", "tech": ["Python", "Pandas", "NumPy", "Scikit-learn"]}
    )

    kb.add_knowledge_item(
        "Inspired by Silicon Valley and Pied Piper, Hunter implemented various compression algorithms in Rust including Huffman coding, LZ77, and RLE, tested and managed through a CLI. It's built with Rust, WebAssembly, Leptos, Cargo, and Flask. The project demonstrates his systems programming skills and interest in low-level performance.",
        "projects",
        {"name": "Rust Compression Algorithms", "status": "completed", "year": 2025, "featured": True, "tech": ["Rust", "WebAssembly", "Leptos"]}
    )

    kb.add_knowledge_item(
        "At the 2025 Credo company hackathon, Hunter built a Credo EV Charger Management and Queue System with real-time monitoring, queue management, and user-friendly interfaces to optimize charger usage. It's built with Next.js, Tailwind CSS, TypeScript, SQLite, and Node.js, and won best implementation and technical achievement.",
        "projects",
        {"name": "Credo EV Charger Management + Queue System", "status": "completed", "year": 2025, "featured": True, "achievement": "best implementation and technical achievement"}
    )

    kb.add_knowledge_item(
        "GreekLink is an anonymous social media platform connecting Greek life communities nationwide that Hunter completed in 2023. He led both front-end and back-end development for this community-focused platform. It's built with Next.js, React, TypeScript, Tailwind, Firebase, and Firestore. The platform successfully connects students nationwide and is live at greeklink.xyz.",
        "projects",
        {"name": "GreekLink", "status": "completed", "year": 2023, "featured": True, "url": "https://www.greeklink.xyz/", "impact": "connecting students nationwide"}
    )
    
    kb.add_knowledge_item(
        "Chrome Dino Time Travel is a level-based parody of Chrome's Dino game featuring different time periods that Hunter completed in 2023. This was a collaborative game development project with immersive time-travel mechanics built using PyGame and Python. The game showcases Hunter's ability to work on creative, entertainment-focused projects while collaborating with other developers.",
        "projects",
        {"name": "Chrome Dino Time Travel", "status": "completed", "year": 2023, "featured": True, "type": "game", "collaboration": True}
    )
    
    kb.add_knowledge_item(
        "Hunter's current portfolio website (the one you're viewing) is built with Next.js, Tailwind CSS, TypeScript, React, and Framer Motion. It features cyberpunk aesthetics, interactive components, responsive design, and showcases his technical skills through its implementation. The website includes a categorized skills list, project showcase, dynamic GitHub commit integration, and this AI chatbot.",
        "projects",
        {"name": "Portfolio Website", "status": "completed", "year": 2025, "featured": True, "url": "https://hunterbroughton.com", "features": ["cyberpunk design", "AI chatbot", "skills list", "GitHub integration"]}
    )
    
    kb.add_knowledge_item(
        "As VP of Communications for the Hill Street Run Club at University of Michigan, Hunter is developing a website to promote the club and its events. The website features interest forms, event calendar, and membership database, built with Next.js, Tailwind CSS, SQLite, Node.js, and TypeScript. This project demonstrates his leadership role and community involvement.",
        "projects",
        {"name": "Hill Street Run Club Website", "status": "in-progress", "year": 2024, "role": "VP of Communications", "organization": "University of Michigan"}
    )
    
    kb.add_knowledge_item(
        "Hunter developed a Python program to automate S-parameter analysis using a TC-720 temperature controller and VNA (Vector Network Analyzer). The project includes an interactive GUI for data visualization and user-friendly analysis interface, built with Python, PyVisa, Tkinter, NumPy, and Matplotlib. This demonstrates his ability to bridge software and hardware engineering.",
        "projects",
        {"name": "S-Parameter Analysis Automation", "status": "completed", "year": 2023, "type": "automation", "hardware_integration": True}
    )
    
    kb.add_knowledge_item(
        "Hunter contributed to HTTPie, a popular command-line HTTP client, by adding a new authentication method. He implemented username/password authentication with proper parsing functionality using Python, PyTest, JavaScript, and React. This open-source contribution is available at httpie.io and demonstrates his ability to contribute to established projects.",
        "projects",
        {"name": "HTTPie Authentication Contributions", "status": "completed", "year": 2023, "url": "https://httpie.io/", "type": "open_source", "achievement": "academic_highlight"}
    )
    
    # Technical Skills - Programming Languages
    kb.add_knowledge_item(
        "Hunter is highly proficient in JavaScript and has used it extensively in projects like GreekLink, Anywear, his portfolio website, and HTTPie contributions. He has experience with modern ES6+ features, async/await, functional programming, and both frontend and backend JavaScript development.",
        "skills",
        {"name": "JavaScript", "category": "language", "projects": ["GreekLink", "Anywear", "Portfolio", "HTTPie"], "proficiency": "high"}
    )

    kb.add_knowledge_item(
        "Hunter has strong Python skills and has used Python for Anywear's AI/ML components, his Algorithmic Trading System, machine learning coursework (EECS 445, EECS 492), S-Parameter Analysis automation, HTTPie contributions, and backend development. He's experienced with libraries like NumPy, Pandas, PyTorch, TensorFlow, FastAPI, PyTest, Scikit-learn, and PyVisa for both data science and software engineering applications.",
        "skills",
        {"name": "Python", "category": "language", "libraries": ["NumPy", "Pandas", "PyTorch", "TensorFlow", "FastAPI", "PyTest", "Scikit-learn", "PyVisa"], "proficiency": "high"}
    )

    kb.add_knowledge_item(
        "Hunter is proficient in Go (Golang), which he uses in his work at Microsoft on Azure Arc Enabled Kubernetes. Go is central to cloud-native and Kubernetes development, and Hunter works with it on distributed infrastructure and Cluster Extensions.",
        "skills",
        {"name": "Go", "category": "language", "company": "Microsoft", "domain": "cloud-native / Kubernetes"}
    )
    
    kb.add_knowledge_item(
        "Hunter is proficient in TypeScript and has used it extensively in GreekLink, his portfolio website, Hill Street Run Club website, and Vloggi projects. He leverages TypeScript for type-safe development, better code maintainability, and enhanced developer experience in React and Next.js applications.",
        "skills",
        {"name": "TypeScript", "category": "language", "projects": ["GreekLink", "Portfolio", "Hill Street Run Club", "Vloggi"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter has solid C++ skills with experience in object-oriented programming, memory management, and performance optimization. He has used C++ in academic coursework and understands systems programming concepts, making him capable of working on performance-critical applications.",
        "skills",
        {"name": "C++", "category": "language", "concepts": ["OOP", "memory management", "performance optimization"], "proficiency": "solid"}
    )
    
    kb.add_knowledge_item(
        "Hunter has foundational Java skills and has used Java for academic projects at University of Michigan. He understands object-oriented programming principles, data structures, and algorithms implementation in Java through his coursework.",
        "skills",
        {"name": "Java", "category": "language", "context": "academic", "proficiency": "foundational"}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with Vue.js and Vuetify from his work at Credo Semiconductor, where he developed features for PCIe software called Pilot. This demonstrates his adaptability to different frontend frameworks beyond React.",
        "skills",
        {"name": "Vue.js", "category": "framework", "company": "Credo Semiconductor", "project": "Pilot PCIe software"}
    )
    
    # Frameworks & Libraries
    kb.add_knowledge_item(
        "Hunter is highly skilled in React and has used it extensively in GreekLink, Anywear, his portfolio website, Vloggi projects, and HTTPie contributions. He's experienced with hooks, state management, component architecture, and modern React patterns for building scalable user interfaces.",
        "skills",
        {"name": "React", "category": "framework", "concepts": ["hooks", "state management", "component architecture"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter is proficient in Next.js and has used it for GreekLink, his portfolio website, and Hill Street Run Club website. He leverages Next.js features like server-side rendering, API routes, static site generation, and modern web development patterns for performance and SEO optimization.",
        "skills",
        {"name": "Next.js", "category": "framework", "features": ["SSR", "API routes", "SSG"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter has strong Tailwind CSS skills and has used it for styling in GreekLink, Anywear, his portfolio website, Hill Street Run Club website, and Vloggi projects. He creates responsive, modern designs using utility-first CSS methodology.",
        "skills",
        {"name": "Tailwind CSS", "category": "framework", "approach": "utility-first", "proficiency": "strong"}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with Node.js and Express for backend development, particularly in Anywear and Vloggi projects. He builds RESTful APIs, handles server-side logic, and integrates with databases using these technologies.",
        "skills",
        {"name": "Node.js/Express", "category": "framework", "type": "backend", "projects": ["Anywear", "Vloggi"]}
    )

    kb.add_knowledge_item(
        "Hunter has experience with PyTorch and TensorFlow for machine learning, used across his ML coursework (EECS 445, EECS 492) and projects like Anywear. He has built neural networks from scratch, including a Convolutional Neural Network for image classification and a Vision Transformer for dog breed classification, working with patch embeddings, self-attention, and model fine-tuning.",
        "skills",
        {"name": "PyTorch / TensorFlow", "category": "framework", "type": "ML", "courses": ["EECS 445", "EECS 492"], "concepts": ["CNNs", "Vision Transformers", "fine-tuning"]}
    )

    kb.add_knowledge_item(
        "Hunter works with Transformers and modern deep learning architectures, including Vision Transformers (ViT) for image classification and the attention-based models studied in EECS 449 (Conversational AI). This ties into his broader interest in AI and the infrastructure that supports it.",
        "skills",
        {"name": "Transformers", "category": "framework", "type": "ML", "courses": ["EECS 449", "EECS 445"]}
    )
    
    # Tools & Technologies
    kb.add_knowledge_item(
        "Hunter is proficient with Git version control and uses it for all his projects. He's experienced with branching, merging, collaborative development workflows, and maintains active repositories on GitHub showcasing his work.",
        "skills",
        {"name": "Git", "category": "tool", "concepts": ["branching", "merging", "collaboration"], "proficiency": "proficient"}
    )
    
    kb.add_knowledge_item(
        "Hunter works with databases including PostgreSQL (used in Anywear), MongoDB, MySQL (at Vloggi), SQLite, and Azure CosmosDB. He designs schemas, handles data operations, and integrates databases with Node.js and Python backends for scalable data storage.",
        "skills",
        {"name": "Databases", "category": "tool", "type": "database", "systems": ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "CosmosDB", "DynamoDB"]}
    )

    kb.add_knowledge_item(
        "Hunter has strong experience with Kubernetes, the core of his work at Microsoft on Azure Arc Enabled Kubernetes. He builds Cluster Extensions that manage state across AKS, hybrid, and edge clusters, including GPU workloads. He works with cluster orchestration, multi-cluster environments, and the operational concerns of running containerized workloads at scale.",
        "skills",
        {"name": "Kubernetes", "category": "tool", "company": "Microsoft", "concepts": ["AKS", "Cluster Extensions", "edge clusters", "GPU workloads"]}
    )

    kb.add_knowledge_item(
        "Hunter works extensively with Microsoft Azure, particularly Azure Arc, Azure Kubernetes Service (AKS), Azure Monitor, and Azure CosmosDB through his role at Microsoft. He focuses on cloud-native infrastructure and the systems that run AI and distributed workloads at scale.",
        "skills",
        {"name": "Azure", "category": "tool", "company": "Microsoft", "services": ["Azure Arc", "AKS", "Azure Monitor", "CosmosDB"]}
    )

    kb.add_knowledge_item(
        "Hunter practices DevOps, GitOps, and CI/CD as core parts of his work on cloud infrastructure at Microsoft. He works with Flux for GitOps-driven cluster configuration, builds deployment pipelines, and integrates observability and security into unified workflows for multi-cluster environments. He also uses Docker for containerization (experience dating back to Vloggi).",
        "skills",
        {"name": "DevOps / GitOps / CI/CD", "category": "concept", "company": "Microsoft", "tools": ["Flux", "Docker", "GitOps", "CI/CD pipelines"]}
    )

    kb.add_knowledge_item(
        "Hunter has hands-on experience with distributed systems and distributed state management, both academically (EECS 491, where he built a Paxos-based fault-tolerant key/value store) and professionally (state reconciliation across Kubernetes clusters at Microsoft). This is a central focus of his interest in AI infrastructure.",
        "skills",
        {"name": "Distributed Systems", "category": "concept", "context": ["EECS 491", "Microsoft"], "topics": ["Paxos", "consensus", "state reconciliation"]}
    )

    kb.add_knowledge_item(
        "Hunter has experience with AWS and Docker from his work at Vloggi, where he deployed applications using cloud services and containerization technologies for scalable and reliable deployments.",
        "skills",
        {"name": "AWS/Docker", "category": "tool", "type": "deployment", "company": "Vloggi"}
    )

    kb.add_knowledge_item(
        "Hunter has experience with hardware integration and test equipment, including Thermoelectric Temperature Controllers (TC-720) and Vector Network Analyzers from his work at Credo Semiconductor. He bridges software and hardware engineering through automation and control systems.",
        "skills",
        {"name": "Hardware Integration", "category": "tool", "equipment": ["TC-720", "VNA"], "company": "Credo Semiconductor"}
    )
    
    # Contact & Social Information
    kb.add_knowledge_item(
        "You can contact Hunter Broughton through his website's contact page at hunterbroughton.com/socials, via email, or through his social media profiles including LinkedIn, GitHub, and Strava. He's open to hiring opportunities, collaboration, and general inquiries.",
        "contact",
        {"website": "hunterbroughton.com/socials", "platforms": ["LinkedIn", "GitHub", "Strava"], "open_to": ["hiring", "collaboration", "inquiries"]}
    )
    
    # Website & Portfolio Features
    kb.add_knowledge_item(
        "Hunter's portfolio website features a cyberpunk theme with interactive components including a categorized skills list, project showcase, dynamic GitHub commit integration, responsive design, and an AI-powered chatbot. It uses Next.js, TypeScript, Tailwind CSS, Framer Motion for animations, and includes features like particle systems, geometric backgrounds, and terminal-style interfaces.",
        "website",
        {"theme": "cyberpunk", "features": ["skills list", "AI chatbot", "GitHub integration", "particle systems"], "technologies": ["Next.js", "TypeScript", "Tailwind", "Framer Motion"]}
    )

    kb.add_knowledge_item(
        "The portfolio website includes several interactive sections: a hero section with terminal-style typewriter effects, an about section with personal photos slideshow, a categorized skills list (organized by languages, frameworks, tools, and concepts), an experience timeline, education details with coursework tabs, and a comprehensive projects showcase. The site also features a newsletter signup and social links page.",
        "website",
        {"sections": ["hero", "about", "skills", "experience", "education", "projects"], "interactive_features": ["typewriter effects", "photo slideshow", "categorized skills"]}
    )

    # Leadership & Activities
    kb.add_knowledge_item(
        "Hunter serves as VP of Communications for the Hill Street Run Club at University of Michigan, where he leads communication efforts and is developing the club's website.",
        "activities",
        {"role": "VP of Communications", "organization": "Hill Street Run Club", "school": "University of Michigan"}
    )
    
    return kb

if __name__ == "__main__":
    # Create and save the knowledge base
    kb = create_hunter_knowledge_base()
    kb.build_index()
    
    # Test the knowledge base
    test_queries = [
        "What projects has Hunter worked on?",
        "What programming languages does Hunter know?",
        "Tell me about Hunter's work at Microsoft",
        "What does Hunter know about AI infrastructure and Kubernetes?",
        "How can I contact Hunter?",
        "What is Hunter studying?"
    ]
    
    print("Testing Knowledge Base:")
    print("=" * 50)
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        results = kb.search(query, top_k=3)
        for i, result in enumerate(results, 1):
            print(f"{i}. [{result['category']}] {result['content'][:100]}... (Score: {result['similarity_score']:.3f})")
    
    # Save the knowledge base
    kb.save("hunter_knowledge_base.json")
    print(f"\nKnowledge base saved with {len(kb.knowledge_items)} items")
    print("Category stats:", kb.get_category_stats())
