CREATE TABLE IF NOT EXISTS "Course" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  instructor TEXT NOT NULL,
  "instructorTitle" TEXT NOT NULL,
  "instructorImage" TEXT,
  image TEXT,
  category TEXT NOT NULL,
  topics TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "Module" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "courseId" TEXT NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "Lesson" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT,
  duration TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  image TEXT,
  bio TEXT,
  "lastActive" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "Enrollment" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "courseId" TEXT NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  progress INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  "enrolledAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "completedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "courseId")
);


CREATE TABLE IF NOT EXISTS "Progress" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  "lastAccessed" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "lessonId")
);


CREATE TABLE IF NOT EXISTS "Certificate" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "courseId" TEXT NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "issueDate" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "courseId")
);

-- Create Podcast table
CREATE TABLE IF NOT EXISTS "Podcast" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  "imageUrl" TEXT,
  "hostName" TEXT NOT NULL,
  "hostTitle" TEXT,
  "hostImage" TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create PodcastEpisode table
CREATE TABLE IF NOT EXISTS "PodcastEpisode" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  "audioUrl" TEXT,
  duration TEXT,
  "podcastId" TEXT NOT NULL REFERENCES "Podcast"(id) ON DELETE CASCADE,
  "publishDate" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("podcastId", "slug")
);

-- Create TeamMember table
CREATE TABLE IF NOT EXISTS "TeamMember" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  "imageUrl" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Analytics table
CREATE TABLE IF NOT EXISTS "Analytics" (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  "pageViews" INTEGER NOT NULL DEFAULT 0,
  "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
  "courseEnrollments" INTEGER NOT NULL DEFAULT 0,
  "totalRevenue" DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(date)
);

-- Seed Users if none exist
INSERT INTO "User" (id, name, email, password, role, image, bio, "lastActive")
SELECT 
  'user-1', 
  'Admin User', 
  'admin@example.com', 
  '$2a$10$GQKrHQcZsyBa3VwVzO0zT.LCFrwu9oJCkfJj4j.V9fGt8jxEuIXsC', -- password: admin123
  'admin',
  '/team/sarah-johnson.png',
  'Administrator with full access to the platform.',
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE role = 'admin')
LIMIT 1;

INSERT INTO "User" (id, name, email, password, role, image, bio, "lastActive")
SELECT 
  'user-2', 
  'Sarah Johnson', 
  'sarah@example.com', 
  '$2a$10$GQKrHQcZsyBa3VwVzO0zT.LCFrwu9oJCkfJj4j.V9fGt8jxEuIXsC', -- password: admin123
  'user',
  '/team/sarah-johnson.png',
  'AI Strategy Expert with over 10 years of experience.',
  NOW() - INTERVAL '2 hours'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE id = 'user-2')
LIMIT 1;

INSERT INTO "User" (id, name, email, password, role, image, bio, "lastActive")
SELECT 
  'user-3', 
  'Michael Chen', 
  'michael@example.com', 
  '$2a$10$GQKrHQcZsyBa3VwVzO0zT.LCFrwu9oJCkfJj4j.V9fGt8jxEuIXsC', -- password: admin123
  'user',
  '/team/michael-chen.png',
  'Chief Innovation Officer specializing in AI implementation.',
  NOW() - INTERVAL '1 day'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE id = 'user-3')
LIMIT 1;

INSERT INTO "User" (id, name, email, password, role, image, bio, "lastActive")
SELECT 
  'user-4', 
  'Elena Rodriguez', 
  'elena@example.com', 
  '$2a$10$GQKrHQcZsyBa3VwVzO0zT.LCFrwu9oJCkfJj4j.V9fGt8jxEuIXsC', -- password: admin123
  'user',
  '/team/elena-rodriguez.png',
  'Ethics Specialist focusing on responsible AI adoption.',
  NOW() - INTERVAL '3 days'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE id = 'user-4')
LIMIT 1;

INSERT INTO "User" (id, name, email, password, role, image, bio, "lastActive")
SELECT 
  'user-5', 
  'David Williams', 
  'david@example.com', 
  '$2a$10$GQKrHQcZsyBa3VwVzO0zT.LCFrwu9oJCkfJj4j.V9fGt8jxEuIXsC', -- password: admin123
  'user',
  '/team/david-williams.png',
  'CTO & AI Implementation Expert with enterprise experience.',
  NOW() - INTERVAL '2 weeks'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE id = 'user-5')
LIMIT 1;

-- Seed Courses if none exist
INSERT INTO "Course" (id, title, slug, description, level, duration, price, instructor, "instructorTitle", "instructorImage", image, category, topics, featured, published)
SELECT 
  'course-1', 
  'AI Leadership Fundamentals', 
  'ai-leadership-fundamentals',
  'Learn the fundamentals of AI leadership and how to develop an effective AI strategy for your organization.',
  'beginner',
  '5 hours',
  199,
  'Dr. Sarah Johnson',
  'AI Strategy Expert',
  '/team/sarah-johnson.png',
  '/ai-leadership-course.png',
  'leadership',
  'AI, Leadership, Strategy, Implementation',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM "Course" WHERE id = 'course-1')
LIMIT 1;

INSERT INTO "Course" (id, title, slug, description, level, duration, price, instructor, "instructorTitle", "instructorImage", image, category, topics, featured, published)
SELECT 
  'course-2', 
  'AI for Business Strategy', 
  'ai-business-strategy',
  'Develop a comprehensive AI strategy for your business and learn how to implement it effectively.',
  'intermediate',
  '8 hours',
  299,
  'Michael Chen',
  'Chief Innovation Officer',
  '/team/michael-chen.png',
  '/ai-strategy-course.png',
  'business',
  'AI, Business, Strategy, ROI',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM "Course" WHERE id = 'course-2')
LIMIT 1;

INSERT INTO "Course" (id, title, slug, description, level, duration, price, instructor, "instructorTitle", "instructorImage", image, category, topics, featured, published)
SELECT 
  'course-3', 
  'AI Ethics and Governance', 
  'ai-ethics-governance',
  'Learn about ethical considerations and governance frameworks for responsible AI implementation.',
  'intermediate',
  '6 hours',
  199,
  'Elena Rodriguez',
  'Ethics Specialist',
  '/team/elena-rodriguez.png',
  '/ai-ethics-course.png',
  'ethics',
  'AI, Ethics, Governance, Responsibility',
  false,
  true
WHERE NOT EXISTS (SELECT 1 FROM "Course" WHERE id = 'course-3')
LIMIT 1;

INSERT INTO "Course" (id, title, slug, description, level, duration, price, instructor, "instructorTitle", "instructorImage", image, category, topics, featured, published)
SELECT 
  'course-4', 
  'AI Implementation for Executives', 
  'ai-implementation-executives',
  'A practical guide to implementing AI in your organization for executive leaders.',
  'advanced',
  '8 hours',
  399,
  'David Williams',
  'CTO & AI Implementation Expert',
  '/team/david-williams.png',
  '/ai-training-executives.png',
  'technical',
  'AI, Implementation, Technical, Executive',
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM "Course" WHERE id = 'course-4')
LIMIT 1;

-- Seed Modules for Course 1 if none exist
INSERT INTO "Module" (id, title, "order", "courseId")
SELECT 
  'module-1-1', 
  'Introduction to AI Leadership', 
  1, 
  'course-1'
WHERE NOT EXISTS (SELECT 1 FROM "Module" WHERE id = 'module-1-1')
LIMIT 1;

INSERT INTO "Module" (id, title, "order", "courseId")
SELECT 
  'module-1-2', 
  'AI Strategy Development', 
  2, 
  'course-1'
WHERE NOT EXISTS (SELECT 1 FROM "Module" WHERE id = 'module-1-2')
LIMIT 1;

-- Seed Lessons for Module 1-1 if none exist
INSERT INTO "Lesson" (id, title, type, content, duration, "order", "moduleId")
SELECT 
  'lesson-1-1-1', 
  'Understanding AI Fundamentals', 
  'video', 
  'Video content about AI fundamentals', 
  '45 min', 
  1, 
  'module-1-1'
WHERE NOT EXISTS (SELECT 1 FROM "Lesson" WHERE id = 'lesson-1-1-1')
LIMIT 1;

INSERT INTO "Lesson" (id, title, type, content, duration, "order", "moduleId")
SELECT 
  'lesson-1-1-2', 
  'The Role of Leadership in AI Transformation', 
  'video', 
  'Video content about leadership in AI transformation', 
  '50 min', 
  2, 
  'module-1-1'
WHERE NOT EXISTS (SELECT 1 FROM "Lesson" WHERE id = 'lesson-1-1-2')
LIMIT 1;

-- Seed Lessons for Module 1-2 if none exist
INSERT INTO "Lesson" (id, title, type, content, duration, "order", "moduleId")
SELECT 
  'lesson-1-2-1', 
  'Assessing Organizational Readiness', 
  'video', 
  'Video content about organizational readiness', 
  '40 min', 
  1, 
  'module-1-2'
WHERE NOT EXISTS (SELECT 1 FROM "Lesson" WHERE id = 'lesson-1-2-1')
LIMIT 1;

INSERT INTO "Lesson" (id, title, type, content, duration, "order", "moduleId")
SELECT 
  'lesson-1-2-2', 
  'Creating an AI Roadmap', 
  'document', 
  'Document content about creating an AI roadmap', 
  '30 min', 
  2, 
  'module-1-2'
WHERE NOT EXISTS (SELECT 1 FROM "Lesson" WHERE id = 'lesson-1-2-2')
LIMIT 1;

INSERT INTO "Lesson" (id, title, type, content, duration, "order", "moduleId")
SELECT 
  'lesson-1-2-3', 
  'Strategy Assessment Quiz', 
  'quiz', 
  'Quiz content for strategy assessment', 
  '20 min', 
  3, 
  'module-1-2'
WHERE NOT EXISTS (SELECT 1 FROM "Lesson" WHERE id = 'lesson-1-2-3')
LIMIT 1;

-- Seed Enrollments if none exist
INSERT INTO "Enrollment" (id, "userId", "courseId", progress, status, "enrolledAt", "completedAt")
SELECT 
  'enrollment-1', 
  'user-2', 
  'course-1', 
  75, 
  'active', 
  NOW() - INTERVAL '30 days', 
  NULL
WHERE NOT EXISTS (SELECT 1 FROM "Enrollment" WHERE id = 'enrollment-1')
LIMIT 1;

INSERT INTO "Enrollment" (id, "userId", "courseId", progress, status, "enrolledAt", "completedAt")
SELECT 
  'enrollment-2', 
  'user-2', 
  'course-2', 
  30, 
  'active', 
  NOW() - INTERVAL '15 days', 
  NULL
WHERE NOT EXISTS (SELECT 1 FROM "Enrollment" WHERE id = 'enrollment-2')
LIMIT 1;

INSERT INTO "Enrollment" (id, "userId", "courseId", progress, status, "enrolledAt", "completedAt")
SELECT 
  'enrollment-3', 
  'user-3', 
  'course-1', 
  100, 
  'completed', 
  NOW() - INTERVAL '60 days', 
  NOW() - INTERVAL '10 days'
WHERE NOT EXISTS (SELECT 1 FROM "Enrollment" WHERE id = 'enrollment-3')
LIMIT 1;

INSERT INTO "Enrollment" (id, "userId", "courseId", progress, status, "enrolledAt", "completedAt")
SELECT 
  'enrollment-4', 
  'user-4', 
  'course-3', 
  50, 
  'active', 
  NOW() - INTERVAL '20 days', 
  NULL
WHERE NOT EXISTS (SELECT 1 FROM "Enrollment" WHERE id = 'enrollment-4')
LIMIT 1;

-- Seed Team Members if none exist
INSERT INTO "TeamMember" (id, name, title, bio, "imageUrl", "order")
SELECT 
  'team-1', 
  'James Wilson', 
  'CEO & Founder', 
  'James has over 20 years of experience in AI and machine learning, having led AI initiatives at several Fortune 500 companies before founding AI First Academy.', 
  '/team/james-wilson.png', 
  1
WHERE NOT EXISTS (SELECT 1 FROM "TeamMember" WHERE id = 'team-1')
LIMIT 1;

INSERT INTO "TeamMember" (id, name, title, bio, "imageUrl", "order")
SELECT 
  'team-2', 
  'Sarah Johnson', 
  'Chief AI Strategy Officer', 
  'Sarah specializes in helping organizations develop and implement effective AI strategies. She has advised over 100 companies on their AI transformation journeys.', 
  '/team/sarah-johnson.png', 
  2
WHERE NOT EXISTS (SELECT 1 FROM "TeamMember" WHERE id = 'team-2')
LIMIT 1;

INSERT INTO "TeamMember" (id, name, title, bio, "imageUrl", "order")
SELECT 
  'team-3', 
  'Michael Chen', 
  'Chief Innovation Officer', 
  'Michael leads our research and development efforts, ensuring our curriculum stays at the cutting edge of AI advancements and industry needs.', 
  '/team/michael-chen.png', 
  3
WHERE NOT EXISTS (SELECT 1 FROM "TeamMember" WHERE id = 'team-3')
LIMIT 1;

INSERT INTO "TeamMember" (id, name, title, bio, "imageUrl", "order")
SELECT 
  'team-4', 
  'Elena Rodriguez', 
  'Head of AI Ethics', 
  'Elena ensures that our approach to AI education emphasizes responsible and ethical implementation across all our programs.', 
  '/team/elena-rodriguez.png', 
  4
WHERE NOT EXISTS (SELECT 1 FROM "TeamMember" WHERE id = 'team-4')
LIMIT 1;

-- Seed Podcasts if none exist
INSERT INTO "Podcast" (id, title, slug, description, "imageUrl", "hostName", "hostTitle", "hostImage", featured, published)
SELECT 
  'podcast-1', 
  'AI Leadership Insights', 
  'ai-leadership-insights', 
  'Weekly discussions with AI leaders about strategy, implementation, and the future of AI in business.', 
  '/placeholder-e3eto.png', 
  'James Wilson', 
  'CEO & Founder', 
  '/team/james-wilson.png', 
  true, 
  true
WHERE NOT EXISTS (SELECT 1 FROM "Podcast" WHERE id = 'podcast-1')
LIMIT 1;

-- Seed Podcast Episodes if none exist
INSERT INTO "PodcastEpisode" (id, title, slug, description, "audioUrl", duration, "podcastId", "publishDate")
SELECT 
  'episode-1', 
  'Building an AI-First Organization', 
  'building-ai-first-organization', 
  'In this episode, we discuss what it means to be an AI-first organization and how to build one from the ground up.', 
  'https://example.com/podcast/ep1.mp3', 
  '45 min', 
  'podcast-1', 
  NOW() - INTERVAL '7 days'
WHERE NOT EXISTS (SELECT 1 FROM "PodcastEpisode" WHERE id = 'episode-1')
LIMIT 1;

INSERT INTO "PodcastEpisode" (id, title, slug, description, "audioUrl", duration, "podcastId", "publishDate")
SELECT 
  'episode-2', 
  'AI Ethics in Practice', 
  'ai-ethics-in-practice', 
  'Elena Rodriguez joins us to discuss practical approaches to implementing ethical AI frameworks in your organization.', 
  'https://example.com/podcast/ep2.mp3', 
  '52 min', 
  'podcast-1', 
  NOW() - INTERVAL '14 days'
WHERE NOT EXISTS (SELECT 1 FROM "PodcastEpisode" WHERE id = 'episode-2')
LIMIT 1;

-- Seed Analytics data if none exists
INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-1', 
  CURRENT_DATE - INTERVAL '1 day', 
  1245, 
  876, 
  12, 
  2388.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '1 day')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-2', 
  CURRENT_DATE - INTERVAL '2 days', 
  1102, 
  798, 
  9, 
  1791.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '2 days')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-3', 
  CURRENT_DATE - INTERVAL '3 days', 
  1356, 
  912, 
  15, 
  2985.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '3 days')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-4', 
  CURRENT_DATE - INTERVAL '4 days', 
  1189, 
  845, 
  11, 
  2189.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '4 days')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-5', 
  CURRENT_DATE - INTERVAL '5 days', 
  1078, 
  756, 
  8, 
  1592.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '5 days')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-6', 
  CURRENT_DATE - INTERVAL '6 days', 
  987, 
  698, 
  7, 
  1393.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '6 days')
LIMIT 1;

INSERT INTO "Analytics" (id, date, "pageViews", "uniqueVisitors", "courseEnrollments", "totalRevenue")
SELECT 
  'analytics-7', 
  CURRENT_DATE - INTERVAL '7 days', 
  1134, 
  823, 
  10, 
  1990.00
WHERE NOT EXISTS (SELECT 1 FROM "Analytics" WHERE date = CURRENT_DATE - INTERVAL '7 days')
LIMIT 1;
