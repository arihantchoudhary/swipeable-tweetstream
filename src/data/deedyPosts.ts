
export interface DeedyPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  platform: "twitter" | "facebook" | "instagram" | "youtube" | "twitch" | "linkedin" | "github";
  category: string;
  timestamp: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  code?: string;
}

const deedyPosts: DeedyPost[] = [
  // Immigration category
  {
    id: "imm-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Just got my H1B visa approved after a 6-month wait! The US immigration system needs serious reform. Too many talented individuals stuck in limbo. #ImmigrationReform #TechTalent",
    platform: "twitter",
    category: "immigration",
    timestamp: "2h ago",
    likes: 245,
    comments: 37,
    shares: 89
  },
  {
    id: "imm-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "After navigating the complex US immigration system for 6 months, my H1B visa was finally approved. This experience highlighted the critical need for immigration reform. The current system creates unnecessary barriers for global tech talent, hampering both innovation and economic growth. We need a streamlined process that recognizes the value international workers bring to American companies. #ImmigrationReform #GlobalTalent #TechPolicy",
    platform: "linkedin",
    category: "immigration",
    timestamp: "5h ago",
    likes: 378,
    comments: 42
  },
  {
    id: "imm-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Finally got my H1B approved today! 🎉 What a journey through the US immigration system. If you're going through the same process, hang in there - and feel free to message me if you need any advice or support. We need serious reform to make this process more humane and efficient for talented people who want to contribute to this country.",
    platform: "facebook",
    category: "immigration",
    timestamp: "3h ago",
    imageUrl: "https://images.unsplash.com/photo-1575937130966-81b786d00e07?q=80&w=1000",
    likes: 156,
    comments: 28,
    shares: 12
  },
  {
    id: "imm-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "That moment when your H1B finally gets approved after months of waiting! 🇺🇸✅ Immigration process needs to change. #ImmigrationStory #TechLife #NewBeginnings",
    platform: "instagram",
    category: "immigration",
    timestamp: "7h ago",
    imageUrl: "https://images.unsplash.com/photo-1581553673739-c4906b5d0de1?q=80&w=1000",
    likes: 521,
    comments: 46
  },
  {
    id: "imm-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Created a new open-source tool to help immigrants navigate the US visa system. Check out visa-navigator on my repos. Contributions welcome!",
    platform: "github",
    category: "immigration",
    timestamp: "1d ago",
    code: "function checkVisaStatus(visaType, submissionDate) {\n  // Logic to estimate processing time based on visa type\n  const processingTimes = {\n    h1b: 6,\n    l1: 3,\n    o1: 2\n  };\n  return processingTimes[visaType] || 'Unknown';\n}",
    likes: 89
  },

  // AI category
  {
    id: "ai-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Just finished testing the new Claude 3 Opus model. The reasoning capabilities are mind-blowing! LLMs are evolving faster than most people realize. #AI #MachineLearning #Claude3",
    platform: "twitter",
    category: "ai",
    timestamp: "4h ago",
    likes: 763,
    comments: 128,
    shares: 201
  },
  {
    id: "ai-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "I've spent the last week rigorously testing Claude 3 Opus, and I'm thoroughly impressed by its reasoning capabilities. The model demonstrates remarkable improvement in logical reasoning, contextual understanding, and nuanced responses compared to previous versions. As LLMs continue to advance at this pace, we need thoughtful consideration about their implementation and impact across industries. What's your experience with the latest AI models? #ArtificialIntelligence #LLMs #FutureTech",
    platform: "linkedin",
    category: "ai",
    timestamp: "8h ago",
    likes: 492,
    comments: 86
  },
  {
    id: "ai-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Spent my weekend testing the new Claude 3 Opus AI model. It's incredible how quickly these systems are improving! I asked it to help analyze some complex data sets and explain quantum computing concepts, and the responses were surprisingly sophisticated. We're entering a new era of AI capabilities that will transform how we work and live. What do you think - excited or concerned about these developments?",
    platform: "facebook",
    category: "ai",
    timestamp: "1d ago",
    imageUrl: "https://images.unsplash.com/photo-1677442135968-6094f8c1f97d?q=80&w=1000",
    likes: 328,
    comments: 57,
    shares: 24
  },
  {
    id: "ai-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "When your AI assistant understands you better than most humans 🤖 Testing Claude 3 Opus all week and I'm blown away! #ArtificialIntelligence #FutureTech #AIRevolution",
    platform: "instagram",
    category: "ai",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1675557009875-436f71457475?q=80&w=1000",
    likes: 847,
    comments: 136
  },
  {
    id: "ai-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Released ai-benchmark-suite v1.0 - an open-source framework for evaluating LLM performance across different reasoning tasks. Contributions welcome!",
    platform: "github",
    category: "ai",
    timestamp: "3d ago",
    code: "def evaluate_llm(model_name, tasks=['reasoning', 'math', 'coding']):\n  results = {}\n  for task in tasks:\n    test_cases = load_test_cases(task)\n    score = run_benchmark(model_name, test_cases)\n    results[task] = score\n  return results",
    likes: 217
  },

  // Tech category
  {
    id: "tech-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Just migrated our entire backend from MongoDB to PostgreSQL. 2 months of work, zero downtime, 30% performance improvement. Worth every second of effort! #DatabaseMigration #Backend #PostgreSQL",
    platform: "twitter",
    category: "tech",
    timestamp: "5h ago",
    likes: 592,
    comments: 84,
    shares: 137
  },
  {
    id: "tech-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "After months of careful planning and execution, we've successfully completed a major database migration from MongoDB to PostgreSQL without any service interruption. The project required refactoring our ORM layer, creating sophisticated data transformation pipelines, and implementing a seamless switchover mechanism. The results speak for themselves: 30% performance improvement, better data integrity, and more robust querying capabilities. I'm immensely proud of our engineering team for executing this complex migration with such precision. #DatabaseEngineering #TechMigration #EngineeringExcellence",
    platform: "linkedin",
    category: "tech",
    timestamp: "1d ago",
    likes: 428,
    comments: 63
  },
  {
    id: "tech-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "My team just pulled off an amazing feat - migrating our entire database system from MongoDB to PostgreSQL without any downtime! Two months of intense work paid off with a 30% performance boost. So proud of what we accomplished together. Special thanks to Sarah, Mike, and Priya for the late nights and brilliant problem-solving!",
    platform: "facebook",
    category: "tech",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    likes: 273,
    comments: 41,
    shares: 18
  },
  {
    id: "tech-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "When your database migration finally completes after 2 months of work 🚀 MongoDB → PostgreSQL with zero downtime and 30% faster performance! #TechLife #EngineeringWins #DatabaseMagic",
    platform: "instagram",
    category: "tech",
    timestamp: "3d ago",
    imageUrl: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000",
    likes: 612,
    comments: 72
  },
  {
    id: "tech-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Published our mongo-to-postgres migration toolkit. Includes zero-downtime switchover mechanism and data integrity verification tools.",
    platform: "github",
    category: "tech",
    timestamp: "5d ago",
    code: "class DatabaseMigrator:\n  def __init__(self, source_conn, target_conn):\n    self.source = source_conn\n    self.target = target_conn\n    \n  def migrate_table(self, table_name, transform_fn=None):\n    data = self.source.fetch_all(table_name)\n    if transform_fn:\n      data = [transform_fn(record) for record in data]\n    self.target.insert_batch(table_name, data)",
    likes: 186
  },

  // India category
  {
    id: "india-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Back in Bangalore for the week and amazed by the startup energy here. Met with 5 founders building incredible AI companies. India's tech ecosystem is on fire! 🇮🇳 #IndianStartups #TechIndia",
    platform: "twitter",
    category: "india",
    timestamp: "10h ago",
    likes: 482,
    comments: 56,
    shares: 107
  },
  {
    id: "india-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "My week in Bangalore has been nothing short of inspirational. I've had the privilege of meeting with five innovative founders who are leveraging AI to solve uniquely Indian challenges - from healthcare access in rural areas to optimizing agricultural supply chains. The technical talent and entrepreneurial spirit in India's tech ecosystem is remarkable, with a perfect blend of global perspective and local insight. Excited to see these companies scale and transform their respective industries. India is positioning itself as a global AI powerhouse, and the momentum is palpable. #IndianTech #StartupEcosystem #AIInnovation #EmergingMarkets",
    platform: "linkedin",
    category: "india",
    timestamp: "1d ago",
    likes: 367,
    comments: 48
  },
  {
    id: "india-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Spending the week in Bangalore and feeling so energized by the incredible innovation happening here! Just had back-to-back meetings with founders building AI solutions for healthcare, agriculture, and education. The talent and ambition in India's tech scene is incredible - solving big problems with sophisticated technology. Also, the food is amazing as always! 😋🇮🇳",
    platform: "facebook",
    category: "india",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000",
    likes: 341,
    comments: 62,
    shares: 27
  },
  {
    id: "india-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Bangalore startup scene is 🔥! Meeting brilliant founders and enjoying amazing street food - perfect week! #IncredibleIndia #StartupLife #BangaloreDiaries",
    platform: "instagram",
    category: "india",
    timestamp: "3d ago",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000",
    likes: 729,
    comments: 93
  },
  {
    id: "india-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Looking for collaborators on india-ai-ecosystem project - documenting the growth of AI startups across major Indian tech hubs. PRs welcome!",
    platform: "github",
    category: "india",
    timestamp: "5d ago",
    code: "# India AI Ecosystem Map\n\nclass Startup:\n  def __init__(self, name, city, domain, founding_year, funding=None):\n    self.name = name\n    self.city = city\n    self.domain = domain\n    self.founding_year = founding_year\n    self.funding = funding\n\n# Example usage\nstartups = [\n  Startup(\"AIHealth\", \"Bangalore\", \"healthcare\", 2021, \"$3.5M\"),\n  Startup(\"FarmAI\", \"Pune\", \"agriculture\", 2020, \"$2.1M\"),\n]",
    likes: 126
  },

  // Cricket category
  {
    id: "cricket-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "What a match! 🏏 India vs. Australia was a nail-biter until the very end. Kohli's 87 was pure class. Cricket at its finest! #INDvAUS #CricketFever",
    platform: "twitter",
    category: "cricket",
    timestamp: "6h ago",
    likes: 873,
    comments: 143,
    shares: 218
  },
  {
    id: "cricket-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Beyond the thrill of today's India-Australia cricket match, I'm fascinated by how data analytics is transforming the sport. Teams now employ sophisticated statistical models to inform player selection, match strategy, and training regimens. The intersection of sports and data science creates opportunities for innovation in performance optimization and fan engagement. Cricket, with its rich statistical tradition, is particularly well-suited for these analytical approaches. As both a cricket enthusiast and technologist, I find this evolution compelling. #CricketAnalytics #SportsScience #DataInSports",
    platform: "linkedin",
    category: "cricket",
    timestamp: "12h ago",
    likes: 256,
    comments: 31
  },
  {
    id: "cricket-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Watched the most incredible cricket match today! India vs. Australia was a rollercoaster of emotions. Virat Kohli's 87 was masterclass, and that last over had us all on the edge of our seats! Anyone else catch the game? 🏏 🇮🇳 vs 🇦🇺",
    platform: "facebook",
    category: "cricket",
    timestamp: "1d ago",
    imageUrl: "https://images.unsplash.com/photo-1631178955522-7c4d27ba6b8a?q=80&w=1000",
    likes: 418,
    comments: 87,
    shares: 32
  },
  {
    id: "cricket-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Cricket fever at its peak! 🏏 Watching India vs Australia with friends. Nothing unites us like this sport! #CricketLove #INDvAUS #WeekendVibes",
    platform: "instagram",
    category: "cricket",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1624526267942-ab0c0e53d0e3?q=80&w=1000",
    likes: 563,
    comments: 74
  },
  {
    id: "cricket-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Created cricket-data-analysis repo with Python scripts for scraping and analyzing cricket match statistics. Great for fantasy cricket leagues!",
    platform: "github",
    category: "cricket",
    timestamp: "7d ago",
    code: "def calculate_batting_stats(player_id, match_type='test'):\n  matches = fetch_player_matches(player_id, match_type)\n  innings = [m for m in matches if m['did_bat'] == True]\n  \n  stats = {\n    'matches': len(matches),\n    'innings': len(innings),\n    'runs': sum(i['runs'] for i in innings),\n    'average': sum(i['runs'] for i in innings) / len(innings) if innings else 0,\n    'centuries': sum(1 for i in innings if i['runs'] >= 100),\n    'fifties': sum(1 for i in innings if i['runs'] >= 50 and i['runs'] < 100)\n  }\n  \n  return stats",
    likes: 94
  },

  // Fitness category
  {
    id: "fitness-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Hit a new personal record on my 5K today! 19:45 ⏱️ Consistent training pays off. What's your current fitness goal? #Running #FitnessJourney #5K",
    platform: "twitter",
    category: "fitness",
    timestamp: "3h ago",
    likes: 349,
    comments: 67,
    shares: 41
  },
  {
    id: "fitness-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "I'm a firm believer that physical fitness directly impacts professional performance. Today I achieved a personal milestone by breaking the 20-minute barrier on my 5K run (19:45). This didn't happen overnight - it's the result of consistent training, data-driven progress tracking, and carefully structured recovery periods over the past six months. I apply many of the same principles to my professional work: incremental improvement, measurable goals, and strategic persistence. Whether in fitness or career development, sustainable progress comes from disciplined consistency rather than sporadic intensity. #WorkLifeBalance #PerformanceOptimization #FitnessGoals",
    platform: "linkedin",
    category: "fitness",
    timestamp: "10h ago",
    likes: 274,
    comments: 38
  },
  {
    id: "fitness-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "6 months of consistent training and I finally broke the 20-minute barrier on my 5K this morning! 19:45 and feeling amazing! 🏃‍♂️💨 Special thanks to my running group for pushing me every Saturday - couldn't have done it without you all. Who's up for a celebration run this weekend?",
    platform: "facebook",
    category: "fitness",
    timestamp: "1d ago",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000",
    likes: 296,
    comments: 54,
    shares: 12
  },
  {
    id: "fitness-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Sub-20 5K achieved! 19:45 and couldn't be happier with this milestone. The journey continues! 🏃‍♂️⏱️ #RunningCommunity #PersonalBest #FitnessGoals",
    platform: "instagram",
    category: "fitness",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000",
    likes: 527,
    comments: 89
  },
  {
    id: "fitness-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Created fitness-tracker app - a minimalist progressive web app for logging workouts and visualizing training progress.",
    platform: "github",
    category: "fitness",
    timestamp: "4d ago",
    code: "class WorkoutSession:\n  def __init__(self, workout_type, duration, intensity):\n    self.workout_type = workout_type\n    self.duration = duration  # in minutes\n    self.intensity = intensity  # 1-10 scale\n    self.timestamp = datetime.now()\n    \n  def calculate_calories(self):\n    base_rate = {\n      'running': 10,\n      'cycling': 8,\n      'swimming': 9,\n      'strength': 6\n    }.get(self.workout_type, 5)\n    \n    return base_rate * self.duration * (self.intensity / 5)",
    likes: 108
  },

  // Search category (representing content about search technology)
  {
    id: "search-twitter-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Vector search is revolutionizing how we find information. Just implemented a semantic search system using embeddings that's 3x more accurate than keyword search. The future of search is here! #MachineLearning #VectorSearch #SearchTech",
    platform: "twitter",
    category: "search",
    timestamp: "8h ago",
    likes: 421,
    comments: 69,
    shares: 105
  },
  {
    id: "search-linkedin-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "I'm excited to share that we've successfully implemented a semantic search system using vector embeddings that has dramatically improved our information retrieval capabilities. Our benchmarks show this approach delivers results that are 3x more relevant than traditional keyword-based search, particularly for nuanced or conceptual queries. The system converts search queries into high-dimensional vectors that capture semantic meaning, allowing us to match user intent rather than just keywords. This represents a fundamental shift in search technology - moving from lexical matching to genuine understanding of content. The implications for knowledge management and information retrieval are profound. #SemanticSearch #AISearch #InformationRetrieval #VectorEmbeddings",
    platform: "linkedin",
    category: "search",
    timestamp: "1d ago",
    likes: 318,
    comments: 47
  },
  {
    id: "search-facebook-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Just launched a new search system at work that actually understands what you're looking for instead of just matching keywords! Using AI embeddings to capture meaning, it's finding results that are 3x more relevant in our tests. It's amazing how vector search is changing the game - the days of adding random keywords to find what you want might finally be ending! 🔍🤖",
    platform: "facebook",
    category: "search",
    timestamp: "2d ago",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000",
    likes: 187,
    comments: 31,
    shares: 14
  },
  {
    id: "search-instagram-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "When your search algorithm finally understands what users actually want 🔍✨ Vector search is a game changer! #SearchTech #AIInnovation #TechLife",
    platform: "instagram",
    category: "search",
    timestamp: "3d ago",
    imageUrl: "https://images.unsplash.com/photo-1675739506527-77d680df9e01?q=80&w=1000",
    likes: 392,
    comments: 46
  },
  {
    id: "search-github-1",
    author: {
      name: "Deedy",
      handle: "deedy",
      avatar: "/lovable-uploads/7cdc9702-4e6b-4998-93ac-bf602f42e994.png"
    },
    content: "Released vector-search-engine v1.0 - a lightweight library for implementing semantic search with multiple embedding model options.",
    platform: "github",
    category: "search",
    timestamp: "6d ago",
    code: "class VectorSearchEngine:\n  def __init__(self, embedding_model='all-MiniLM-L6-v2'):\n    self.embedding_model = SentenceTransformer(embedding_model)\n    self.document_embeddings = []\n    self.documents = []\n    \n  def add_documents(self, documents):\n    self.documents.extend(documents)\n    new_embeddings = self.embedding_model.encode([doc.content for doc in documents])\n    self.document_embeddings.extend(new_embeddings)\n    \n  def search(self, query, top_k=5):\n    query_embedding = self.embedding_model.encode(query)\n    similarities = cosine_similarity([query_embedding], self.document_embeddings)[0]\n    top_indices = np.argsort(similarities)[-top_k:][::-1]\n    \n    return [(self.documents[i], similarities[i]) for i in top_indices]",
    likes: 253
  }
];

export default deedyPosts;
