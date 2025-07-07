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
        "Hunter Broughton is a Computer Science and Economics student at the University of Michigan, studying from August 2023 to December 2026. He is a developer who loves to learn and build, solving complex real-world problems using efficient, high-impact software. From machine learning and resilient web systems to financial modeling and forecasts, he develops innovative solutions that matter.",
        "personal",
        {"type": "bio", "importance": "high", "school": "University of Michigan"}
    )
    
    kb.add_knowledge_item(
        "Hunter enjoys working on projects that combine creativity and purpose with technical rigor, and he's always searching for new challenges. When he's not coding, you can find him backpacking in Washington, playing the guitar, struggling to learn how to love running, or constantly tweaking his golf swing. From big ideas to clean execution, he loves turning a vision into reality.",
        "personal",
        {"type": "interests", "hobbies": ["backpacking", "guitar", "running", "golf"]}
    )
    
    # Education Details
    kb.add_knowledge_item(
        "Hunter Broughton is pursuing a Bachelor of Science in Computer Science and Economics at the University of Michigan from August 2023 to December 2026. His Computer Science coursework includes Intro to AI (EECS 492), Software Engineering (EECS 481), Mathematics of Machine Learning (EECS 298), Computer Organization (EECS 370), Data Structures and Algorithms (EECS 281), and Foundations of Computer Science (EECS 203).",
        "education",
        {"school": "University of Michigan", "degree": "BS Computer Science and Economics", "status": "current", "graduation": "December 2026"}
    )
    
    kb.add_knowledge_item(
        "Hunter's Economics coursework at University of Michigan includes Intermediate Microeconomics (ECON 401), Intermediate Macroeconomics (ECON 402), Introduction to Statistics and Econometrics (ECON 452), Game Theory (ECON 409), and Money and Banking (ECON 340). He has made the HTTPie Open Source Contribution as an academic highlight.",
        "education",
        {"type": "coursework", "field": "Economics", "achievement": "HTTPie Open Source Contribution"}
    )
    
    # Work Experience
    kb.add_knowledge_item(
        "Hunter worked as a System and Software Engineering Intern at Credo Semiconductor in San Jose, CA from May 2025 to August 2025. He developed features for the new PCIe software called Pilot using Vue, Vuetify, JavaScript, Python, and APIs. He implemented efficient algorithms for Linecard-SDK with Python and PyTest, and programmed S-parameter analysis automation and Proportional-Integral-Derivative Controllers for the optical team.",
        "experience",
        {"company": "Credo Semiconductor", "position": "System and Software Engineering Intern", "location": "San Jose, CA", "duration": "May 2025 - August 2025"}
    )
    
    kb.add_knowledge_item(
        "At Credo Semiconductor, Hunter gained hands-on experience with Thermoelectric Temperature Controllers (TC-720) and a Vector Network Analyzer. He worked on PCIe software development and optical systems automation, combining both software and hardware engineering skills.",
        "experience",
        {"company": "Credo Semiconductor", "type": "hardware_software", "technologies": ["TC-720", "Vector Network Analyzer", "PCIe"]}
    )
    
    kb.add_knowledge_item(
        "Hunter worked as a Software Developer Intern at Vloggi in Sydney, Australia from June 2024 to August 2024. He engineered full-stack features for Vloggi, a platform that offers MP4 data collection and management for companies. He developed and optimized web interfaces using React and TypeScript, integrated configurable CSS components for diverse client needs, and connected the front-end with a MySQL backend using Node.js, deploying it using AWS and Docker.",
        "experience",
        {"company": "Vloggi", "position": "Software Developer Intern", "location": "Sydney, Australia", "duration": "June 2024 - August 2024"}
    )
    
    kb.add_knowledge_item(
        "Hunter worked as a Data Engineer at SparkRacing in Ann Arbor, MI from January 2024 to May 2024. SparkRacing is a University of Michigan student organization focused on racing and automotive technology.",
        "experience",
        {"company": "SparkRacing", "position": "Data Engineer", "location": "Ann Arbor, MI", "duration": "January 2024 - May 2024", "type": "student_organization"}
    )
    
    # Projects - Detailed Information
    kb.add_knowledge_item(
        "ThriftSwipe is an AI-powered online marketplace for thrift clothing that Hunter is currently developing. The algorithm matches users with clothing based on their preferences and style, making sustainable fashion discovery effortless. It's built with Express, MongoDB, React, Tailwind, Python, and AI/ML technologies. The project is scaling with University of Michigan students and represents Hunter's work in combining AI/ML with practical applications.",
        "projects",
        {"name": "ThriftSwipe", "status": "in-progress", "year": 2024, "featured": True, "impact": "scaling with UMich students", "domain": "AI/ML + E-commerce"}
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
        "Hunter's current portfolio website (the one you're viewing) is built with Next.js, Tailwind CSS, TypeScript, React, and Framer Motion. It features cyberpunk aesthetics, interactive components, responsive design, and showcases his technical skills through its implementation. The website includes features like a skills constellation, project showcase, dynamic GitHub integration, and this AI chatbot.",
        "projects",
        {"name": "Portfolio Website", "status": "completed", "year": 2025, "featured": True, "url": "https://hunterbroughton.com", "features": ["cyberpunk design", "AI chatbot", "skills constellation"]}
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
        "Hunter is highly proficient in JavaScript and has used it extensively in projects like GreekLink, ThriftSwipe, his portfolio website, and HTTPie contributions. He has experience with modern ES6+ features, async/await, functional programming, and both frontend and backend JavaScript development.",
        "skills",
        {"name": "JavaScript", "category": "language", "projects": ["GreekLink", "ThriftSwipe", "Portfolio", "HTTPie"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter has strong Python skills and has used Python for ThriftSwipe's AI/ML components, S-Parameter Analysis automation, HTTPie contributions, Chrome Dino game, and backend development. He's experienced with libraries like NumPy, Pandas, PyTorch, FastAPI, PyTest, and PyVisa for both data science and software engineering applications.",
        "skills",
        {"name": "Python", "category": "language", "libraries": ["NumPy", "Pandas", "PyTorch", "FastAPI", "PyTest", "PyVisa"], "proficiency": "high"}
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
        "Hunter is highly skilled in React and has used it extensively in GreekLink, ThriftSwipe, his portfolio website, Vloggi projects, and HTTPie contributions. He's experienced with hooks, state management, component architecture, and modern React patterns for building scalable user interfaces.",
        "skills",
        {"name": "React", "category": "framework", "concepts": ["hooks", "state management", "component architecture"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter is proficient in Next.js and has used it for GreekLink, his portfolio website, and Hill Street Run Club website. He leverages Next.js features like server-side rendering, API routes, static site generation, and modern web development patterns for performance and SEO optimization.",
        "skills",
        {"name": "Next.js", "category": "framework", "features": ["SSR", "API routes", "SSG"], "proficiency": "high"}
    )
    
    kb.add_knowledge_item(
        "Hunter has strong Tailwind CSS skills and has used it for styling in GreekLink, ThriftSwipe, his portfolio website, Hill Street Run Club website, and Vloggi projects. He creates responsive, modern designs using utility-first CSS methodology.",
        "skills",
        {"name": "Tailwind CSS", "category": "framework", "approach": "utility-first", "proficiency": "strong"}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with Node.js and Express for backend development, particularly in ThriftSwipe and Vloggi projects. He builds RESTful APIs, handles server-side logic, and integrates with databases using these technologies.",
        "skills",
        {"name": "Node.js/Express", "category": "framework", "type": "backend", "projects": ["ThriftSwipe", "Vloggi"]}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with PyTorch for machine learning applications, particularly in ThriftSwipe's AI/ML components. He uses PyTorch for building and training neural networks for the clothing recommendation system.",
        "skills",
        {"name": "PyTorch", "category": "framework", "type": "ML", "application": "recommendation systems"}
    )
    
    # Tools & Technologies
    kb.add_knowledge_item(
        "Hunter is proficient with Git version control and uses it for all his projects. He's experienced with branching, merging, collaborative development workflows, and maintains active repositories on GitHub showcasing his work.",
        "skills",
        {"name": "Git", "category": "tool", "concepts": ["branching", "merging", "collaboration"], "proficiency": "proficient"}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with MongoDB for database management, particularly in ThriftSwipe and other projects. He designs schemas, handles data operations, and integrates MongoDB with Node.js backends for scalable data storage.",
        "skills",
        {"name": "MongoDB", "category": "tool", "type": "database", "projects": ["ThriftSwipe"]}
    )
    
    kb.add_knowledge_item(
        "Hunter has Firebase experience and has used Firebase and Firestore for GreekLink's backend services, authentication, and real-time database functionality. He leverages Firebase for rapid development of full-stack applications.",
        "skills",
        {"name": "Firebase", "category": "tool", "services": ["authentication", "Firestore", "real-time database"], "projects": ["GreekLink"]}
    )
    
    kb.add_knowledge_item(
        "Hunter has experience with MySQL databases from his work at Vloggi, where he integrated front-end applications with MySQL backends for data management and storage in enterprise applications.",
        "skills",
        {"name": "MySQL", "category": "tool", "type": "database", "company": "Vloggi"}
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
        "Hunter's portfolio website features a cyberpunk theme with interactive components including a skills constellation, project showcase, dynamic GitHub integration, responsive design, and an AI-powered chatbot. It uses Next.js, TypeScript, Tailwind CSS, Framer Motion for animations, and includes features like particle systems, geometric backgrounds, and terminal-style interfaces.",
        "website",
        {"theme": "cyberpunk", "features": ["skills constellation", "AI chatbot", "GitHub integration", "particle systems"], "technologies": ["Next.js", "TypeScript", "Tailwind", "Framer Motion"]}
    )
    
    kb.add_knowledge_item(
        "The portfolio website includes several interactive sections: a hero section with terminal-style typewriter effects, an about section with personal photos slideshow, a skills constellation with MST algorithm visualization, experience timeline, education details with coursework tabs, and a comprehensive projects showcase. The site also features a newsletter signup and social links page.",
        "website",
        {"sections": ["hero", "about", "skills", "experience", "education", "projects"], "interactive_features": ["typewriter effects", "photo slideshow", "algorithm visualization"]}
    )
    
    # Leadership & Activities
    kb.add_knowledge_item(
        "Hunter serves as VP of Communications for the Hill Street Run Club at University of Michigan, where he leads communication efforts and is developing the club's website. He's also been involved with SparkRacing, a student organization focused on racing and automotive technology.",
        "activities",
        {"role": "VP of Communications", "organization": "Hill Street Run Club", "school": "University of Michigan", "other_orgs": ["SparkRacing"]}
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
        "Tell me about ThriftSwipe",
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
