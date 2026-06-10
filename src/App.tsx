/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  BookOpen, 
  Map, 
  Trophy, 
  Users, 
  HelpCircle, 
  Settings as SettingsIcon, 
  Search, 
  Bell, 
  ChevronRight, 
  Play, 
  Check, 
  Flame, 
  Zap, 
  Star, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  CheckCircle,
  FileText,
  HelpCircle as QuestionIcon,
  X,
  Plus,
  Book,
  Sparkles,
  ArrowRight,
  Info,
  ThumbsUp,
  MessageSquare,
  Clock
} from 'lucide-react';
import { initialModules, videosData, articlesData, initialLeaderboard } from './data';
import { Lesson, Module, Video, Article, LeaderboardUser } from './types';
import { supabase, isSupabaseConfigured, SUPABASE_BOOTSTRAP_SQL } from './supabase';

export default function App() {
  // Local storage lazy initialisers to keep it lightweight, fast, & offline-persistent!
  const getInitialProgress = (key: string, defaultValue: any) => {
    try {
      const stored = localStorage.getItem(`pmprep_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // State for beginner profile and scores
  const [xp, setXp] = useState<number>(() => getInitialProgress('xp', 0));
  const [xpToday, setXpToday] = useState<number>(() => getInitialProgress('xpToday', 0));
  const [dayStreak, setDayStreak] = useState<number>(() => getInitialProgress('dayStreak', 1));
  const [weeklyGoalDays, setWeeklyGoalDays] = useState<number>(() => getInitialProgress('weeklyGoalDays', 0));
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => getInitialProgress('completedLessons', []));
  const [completedVideos, setCompletedVideos] = useState<string[]>(() => getInitialProgress('completedVideos', []));
  const [completedArticles, setCompletedArticles] = useState<string[]>(() => getInitialProgress('completedArticles', []));
  const [claimedModuleBonuses, setClaimedModuleBonuses] = useState<string[]>(() => getInitialProgress('claimedModuleBonuses', []));
  const [userName, setUserName] = useState<string>(() => getInitialProgress('userName', 'You (First Timer!)'));

  // Supabase Authentication & Synced user state
  const [user, setUser] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>('learn');
  const [activeModuleId, setActiveModuleId] = useState<string>('foundations');
  const [firstTimerGuideOpen, setFirstTimerGuideOpen] = useState<boolean>(false);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('foundations');
  const [searchText, setSearchText] = useState<string>('');
  
  // Interactive Beginner Tour variables
  const [beginnerTourOpen, setBeginnerTourOpen] = useState<boolean>(() => {
    return getInitialProgress('beginner_tour_dismissed', 'false') === 'false';
  });
  const [tourStep, setTourStep] = useState<number>(0);

  const dismissTour = () => {
    setBeginnerTourOpen(false);
    localStorage.setItem('pmprep_beginner_tour_dismissed', 'true');
  };
  
  // Interactive Modals
  const [currentReadingArticle, setCurrentReadingArticle] = useState<Article | null>(null);
  const [currentWatchingVideo, setCurrentWatchingVideo] = useState<Video | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);
  const [showXpClaimedToast, setShowXpClaimedToast] = useState<boolean>(false);
  
  // Notification Toast
  const [toast, setToast] = useState<{ message: string; sub: string } | null>(null);
  
  // Dynamic leaderboard state preloaded with default ranking
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);

  // Community interactive posts list
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 'post-1',
      author: 'Ananya M.',
      role: 'Gold League Rival',
      avatar: 'AM',
      body: 'Welcome to all the newcomers! Product discovery literally changed how I think about building apps. Keep interviewing those users!',
      likes: 12,
      replies: 3,
      liked: false,
      timestamp: '2 hours ago'
    },
    {
      id: 'post-2',
      author: 'You (First Timer!)',
      role: 'Active Learner',
      avatar: 'Y',
      body: 'This is my first website tutorial ever! I just clicked my first concept checkbox and saw my XP score increase! It feels amazing!',
      likes: 8,
      replies: 1,
      liked: true,
      timestamp: 'Just now'
    },
    {
      id: 'post-3',
      author: 'Kenji O.',
      role: 'Friendly Mentor',
      avatar: 'KO',
      body: 'Pro tip for the Mom Test: When talking to users, try to record the audio if they consent. Writing notes and maintaining natural conversational flows at the same time is super hard!',
      likes: 15,
      replies: 4,
      liked: false,
      timestamp: '1 day ago'
    }
  ]);
  const [newPostText, setNewPostText] = useState<string>('');

  // 1. Local storage synchroniser effect (offline-first persistence!)
  useEffect(() => {
    localStorage.setItem('pmprep_xp', JSON.stringify(xp));
    localStorage.setItem('pmprep_xpToday', JSON.stringify(xpToday));
    localStorage.setItem('pmprep_dayStreak', JSON.stringify(dayStreak));
    localStorage.setItem('pmprep_weeklyGoalDays', JSON.stringify(weeklyGoalDays));
    localStorage.setItem('pmprep_completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('pmprep_completedVideos', JSON.stringify(completedVideos));
    localStorage.setItem('pmprep_completedArticles', JSON.stringify(completedArticles));
    localStorage.setItem('pmprep_claimedModuleBonuses', JSON.stringify(claimedModuleBonuses));
    localStorage.setItem('pmprep_userName', JSON.stringify(userName));
  }, [xp, xpToday, dayStreak, weeklyGoalDays, completedLessons, completedVideos, completedArticles, claimedModuleBonuses, userName]);

  // 2. Fetch/Load profile from Supabase Database
  const loadUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code === 'PGRST116') {
        // First-time signup! Upsert user's existing offline progress to cloud so they never lose progress!
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            username: userName === 'You (First Timer!)' ? 'New PM Learner' : userName,
            xp: xp,
            xp_today: xpToday,
            day_streak: dayStreak,
            weekly_goal_days: weeklyGoalDays,
            completed_lessons: completedLessons,
            completed_videos: completedVideos,
            completed_articles: completedArticles,
            claimed_module_bonuses: claimedModuleBonuses,
            updated_at: new Date().toISOString()
          });
        if (insertError) console.error('Error creating profile row', insertError);
      } else if (data) {
        // Merge clouds stats back to local storage
        setXp(data.xp || 0);
        setXpToday(data.xp_today || 0);
        setDayStreak(data.day_streak || 0);
        setWeeklyGoalDays(data.weekly_goal_days || 0);
        setCompletedLessons(data.completed_lessons || []);
        setCompletedVideos(data.completed_videos || []);
        setCompletedArticles(data.completed_articles || []);
        setClaimedModuleBonuses(data.claimed_module_bonuses || []);
        if (data.username) {
          setUserName(data.username);
        }
      }
    } catch (err) {
      console.error('Failed to load user profile.', err);
    }
  };

  // 3. Sync updates manually to Supabase Cloud
  const syncProfileToCloud = async (updates: any) => {
    if (!isSupabaseConfigured || !supabase || !user) return;
    try {
      setIsSyncing(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });
      if (error) console.error('Error syncing to Supabase:', error);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  // 4. Rate-limiting Debounce Effect to sync progress to Supabase securely without clogging quota limits
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user) return;
    
    const delayDebounceFn = setTimeout(() => {
      syncProfileToCloud({
        xp,
        xp_today: xpToday,
        day_streak: dayStreak,
        weekly_goal_days: weeklyGoalDays,
        completed_lessons: completedLessons,
        completed_videos: completedVideos,
        completed_articles: completedArticles,
        claimed_module_bonuses: claimedModuleBonuses,
        username: userName
      });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [xp, xpToday, dayStreak, weeklyGoalDays, completedLessons, completedVideos, completedArticles, claimedModuleBonuses, userName, user]);

  // 5. Fetch community discussion forum posts from Supabase
  const loadCommunityPosts = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error reading discussions:', error);
        return;
      }
      if (data && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          author: p.author,
          role: p.role,
          avatar: p.avatar,
          body: p.body,
          likes: p.likes || 0,
          replies: p.replies || 0,
          liked: p.liked || false,
          timestamp: new Date(p.created_at).toLocaleDateString()
        }));
        setCommunityPosts(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Recalculate dynamic rankings on Leaderboard
  const syncLeaderboard = async () => {
    // If Supabase is connected, retrieve real community records
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, xp')
          .order('xp', { ascending: false })
          .limit(15);
        
        if (error) {
          console.error('Error fetching dynamic rankings:', error);
          return;
        }

        if (data && data.length > 0) {
          const fetchedUsers: LeaderboardUser[] = data.map((p: any) => ({
            rank: 0,
            name: p.username || 'Anonymous Learner',
            initials: (p.username || 'A').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
            xp: p.xp || 0,
            isYou: user ? p.id === user.id : false
          }));

          // Merge with mockup default characters to keep it competitive & lively
          const standardMockOthers = initialLeaderboard.filter(u => !u.isYou);
          const realNames = new Set(fetchedUsers.map(u => u.name));
          const filteredMockupObj = standardMockOthers.filter(u => !realNames.has(u.name));

          let merged: LeaderboardUser[] = [...fetchedUsers];
          
          // Ensure "You" exist on the leaderboard list
          const hasYou = merged.some(u => u.isYou);
          if (!hasYou) {
            merged.push({
              rank: 0,
              name: userName,
              initials: userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
              xp: xp,
              isYou: true
            });
          }

          filteredMockupObj.forEach(u => {
            if (!merged.some(j => j.name === u.name)) {
              merged.push(u);
            }
          });

          const sorted = merged.sort((a, b) => b.xp - a.xp).map((u, idx) => ({ ...u, rank: idx + 1 }));
          setLeaderboard(sorted);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Local-only leaderboard recalculator
    const localBase = [...initialLeaderboard];
    const userIdx = localBase.findIndex(u => u.isYou);
    if (userIdx !== -1) {
      localBase[userIdx] = {
        ...localBase[userIdx],
        name: userName,
        initials: userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        xp: xp
      };
    }
    const localSorted = localBase.sort((a, b) => b.xp - a.xp).map((u, idx) => ({ ...u, rank: idx + 1 }));
    setLeaderboard(localSorted);
  };

  useEffect(() => {
    syncLeaderboard();
  }, [xp, userName, user]);

  // 7. Subscribe to Session & load forum records on mount
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      syncLeaderboard();
      return;
    }

    loadCommunityPosts();

    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        loadUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Submit Sign-In / SignUp safely
  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) return;
    if (!authEmail || !authPassword) {
      setAuthError("Email and Password are required fields.");
      return;
    }
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (authMode === 'signup') {
        const currentDisplayName = userName === 'You (First Timer!)' ? 'New PM Learner' : userName;
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              display_name: currentDisplayName
            }
          }
        });
        if (error) throw error;
        
        triggerNotification("🎉 Account Created!", "Verify email or start live cloud syncing immediately!");
        if (data.user) {
          setUser(data.user);
          await syncProfileToCloud({
            xp,
            xp_today: xpToday,
            day_streak: dayStreak,
            weekly_goal_days: weeklyGoalDays,
            completed_lessons: completedLessons,
            completed_videos: completedVideos,
            completed_articles: completedArticles,
            claimed_module_bonuses: claimedModuleBonuses,
            username: currentDisplayName
          });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        triggerNotification("🔑 Authenticated Successfully", "Your workspace achievements are fully loaded.");
        if (data.user) {
          setUser(data.user);
          await loadUserProfile(data.user.id);
        }
      }
      setAuthEmail('');
      setAuthPassword('');
    } catch (err: any) {
      setAuthError(err.message || "Authentication attempt failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
      setUser(null);
      triggerNotification("👋 Disconnected", "Switched back to your safe offline workspace.");
    } catch (e) {
      console.error(e);
    }
  };

  // Automatically clear toast notifications after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Helper trigger for showing friendly alerts
  const triggerNotification = (message: string, sub: string) => {
    setToast({ message, sub });
  };

  // Click handler to toggle a lesson completed state
  const handleToggleLesson = (lesson: Lesson, moduleId: string) => {
    const isCompleted = completedLessons.includes(lesson.id);
    if (!isCompleted) {
      // Adding progress
      setCompletedLessons([...completedLessons, lesson.id]);
      setXp(prev => prev + lesson.xpValue);
      setXpToday(prev => prev + lesson.xpValue);
      triggerNotification(
        `🎉 Concept Complete: +${lesson.xpValue} XP!`,
        `You checked off "${lesson.title}" successfully.`
      );
      
      // Update weekly goal status if they did their first lesson of the day today
      if (weeklyGoalDays < 5) {
        setWeeklyGoalDays(5);
        triggerNotification(
          "🌟 Weekly Goal Met! 5/5 Days!",
          "Splendid! You completed your practice goal for the week."
        );
      }
    } else {
      // Reverting progress
      setCompletedLessons(completedLessons.filter(id => id !== lesson.id));
      setXp(prev => prev - lesson.xpValue);
      setXpToday(prev => Math.max(0, prev - lesson.xpValue));
      triggerNotification(
        "✏️ Concept Reset",
        `"${lesson.title}" marked as incomplete.`
      );
    }
  };

  // Video viewer completion handler
  const handleCompleteVideo = (video: Video) => {
    if (!completedVideos.includes(video.id)) {
      setCompletedVideos([...completedVideos, video.id]);
      setXp(prev => prev + 20);
      setXpToday(prev => prev + 20);
      triggerNotification("📺 Video Watched: +20 XP!", `Completed watching: ${video.title}`);
    }
    setCurrentWatchingVideo(null);
  };

  // Article viewer quiz submission
  const handleSelectQuizOption = (idx: number) => {
    if (!quizSubmitted) {
      setSelectedQuizOption(idx);
    }
  };

  const handleVerifyQuiz = (article: Article) => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    
    if (article.quiz && selectedQuizOption === article.quiz.answerIndex) {
      triggerNotification("👏 Perfect Answer! +15 XP", "You proved you understand this article!");
      if (!completedArticles.includes(article.id)) {
        setCompletedArticles([...completedArticles, article.id]);
        setXp(prev => prev + 15);
        setXpToday(prev => prev + 15);
      }
    } else {
      triggerNotification("🧐 Let's Try Again!", "That wasn't quite right. Review the article text above.");
    }
  };

  // Dynamic Module Final claiming function
  const handleClaimModuleBonus = (moduleId: string) => {
    if (!claimedModuleBonuses.includes(moduleId)) {
      setClaimedModuleBonuses([...claimedModuleBonuses, moduleId]);
      setXp(prev => prev + 30);
      setXpToday(prev => prev + 30);

      // Auto-complete all lessons, videos, and articles in this module so the status changes to "Completed"
      const targetMod = initialModules.find(m => m.id === moduleId);
      if (targetMod) {
        const lessonIds = targetMod.lessons.map(l => l.id);
        setCompletedLessons(prev => Array.from(new Set([...prev, ...lessonIds])));
      }
      const videoIds = videosData.filter(v => v.moduleId === moduleId).map(v => v.id);
      setCompletedVideos(prev => Array.from(new Set([...prev, ...videoIds])));
      const articleIds = articlesData.filter(a => a.moduleId === moduleId).map(a => a.id);
      setCompletedArticles(prev => Array.from(new Set([...prev, ...articleIds])));
      
      // Replaced popup with a simple small notification on the right side bottom for 4 seconds
      setShowXpClaimedToast(true);
      const timer = setTimeout(() => {
        setShowXpClaimedToast(false);
      }, 4000);
    }
  };

  // Add custom post to community forum
  const handleAddPost = (e: FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    const postId = `post-${Date.now()}`;
    const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'Y';
    const newPost = {
      id: postId,
      author: userName,
      role: user ? 'Registered Learner' : 'Active Learner',
      avatar: initials,
      body: newPostText,
      likes: 0,
      replies: 0,
      liked: false,
      timestamp: 'Just now'
    };
    
    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostText('');
    setXp(prev => prev + 10);
    setXpToday(prev => prev + 10);
    triggerNotification("💬 Post Shared: +10 XP!", "You asked a question or shared feedback on the forum.");

    if (isSupabaseConfigured && supabase) {
      supabase
        .from('community_posts')
        .insert({
          id: postId,
          author: userName,
          role: user ? 'Registered Learner' : 'Active PM Learner',
          avatar: initials,
          body: newPostText,
          likes: 0,
          replies: 0,
          liked: false,
          user_id: user ? user.id : null
        })
        .then(({ error }) => {
          if (error) {
            console.error('Error sharing post to Supabase database:', error);
          } else {
            loadCommunityPosts();
          }
        });
    }
  };

  // Toggle community post like
  const handleToggleLike = (postId: string) => {
    setCommunityPosts(communityPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.liked ? p.likes - 1 : p.likes + 1,
          liked: !p.liked
        };
      }
      return p;
    }));
  };

  // Search filter across lessons
  const allSearchableLessons = [
    ...initialModules.flatMap(mod => mod.lessons.map(l => ({ ...l, moduleId: mod.id, moduleName: mod.title }))),
    ...articlesData.map(a => ({ id: a.id, title: a.title, explanation: a.description, duration: a.readTime, xpValue: 15, isArticle: true }))
  ];

  const filteredLessons = allSearchableLessons.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchText.toLowerCase())
  );

  const activeModule = initialModules.find(m => m.id === activeModuleId) || initialModules[0];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] bg-white text-[#1a1c1c] p-4 rounded-xl shadow-2xl border-l-4 border-[#2b6c00] max-w-sm flex items-start gap-3 transition-transform duration-300 transform translate-y-0">
          <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 flex items-center justify-center text-[#2b6c00] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1a1c1c]">{toast.message}</h4>
            <p className="text-xs text-[#3f4a36] mt-0.5">{toast.sub}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-[#3f4a36] hover:text-[#1a1c1c] ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#becbb1] px-4 md:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-4">
          
          {/* Logo brand strictly for first screen on mobile / top bar on web */}
          <button 
            onClick={() => { setActiveTab('learn'); setSearchText(''); }}
            className="flex items-center gap-2 text-left cursor-pointer hover:opacity-85 transition-opacity focus:outline-none"
          >
            <div className="w-10 h-10 bg-[#58cc02] rounded-xl flex items-center justify-center text-[#1e5000] md:hidden shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="md:hidden">
              <h1 className="font-black text-lg text-[#2b6c00] leading-none">PMprepares</h1>
              <p className="text-[9px] text-[#3f4a36] tracking-widest uppercase font-bold">Discovery Platform</p>
            </div>
          </button>

          {/* Intuitive plain search bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#3f4a36]" />
            <input 
              type="text"
              placeholder="What do you want to learn today? Type here..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (activeTab !== 'lessons') {
                  setActiveTab('lessons');
                }
              }}
              className="w-full bg-[#eeeeee] pl-10 pr-4 py-2.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#2b6c00] text-sm font-medium placeholder-[#3f4a36]"
            />
          </div>

          {/* Points & Profile section */}
          <div className="flex items-center gap-4 ml-auto">

            <button 
              onClick={() => triggerNotification("🔔 Notifications", "No unread alerts. You are fully up to date!")}
              className="relative p-2.5 rounded-full bg-[#eeeeee] hover:bg-[#e2e2e2] text-[#3f4a36] transition-transform active:scale-95"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            {/* Profile widget */}
            <div className="flex items-center gap-3 border-l border-[#becbb1] pl-4">
              <div className="text-right hidden sm:block">
                <p className="font-extrabold text-xs text-[#1a1c1c] tracking-wider uppercase">You (Learner)</p>
                <p className="text-xs text-[#2b6c00] font-bold">{xp.toLocaleString()} XP</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-[#2fb8ff]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLs1oOdUrE4ZjWTHbaj1beBYwZ681JjAYdF9yUsml7YTMeuFwb9C1bWtW-RRID36jq7FG9torLdNI-GFxtCHJSrr6A-pQ7DwkBQGlpDrkOL8MUqF4wTxOOh8rM_I4T0Z0vTh0FunMYU7CjWWNdDPaKX3pBePMeIUrGpPndPd2ppW6VQcl9gT461y7Iyxhqk-3kWxlxnR19m40WOlVn1wE0lalaiwJAGYINcvEZ85aGFVVvBSqi-FjpWDPLkOIUKKmxe5ghc671u5A" 
                  alt="My avatar representation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Structural split */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto flex">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-[260px] border-r border-[#becbb1] bg-white p-5 gap-6 shrink-0 h-[calc(100vh-69px)] sticky top-[69px]">
          
          {/* Brand Identity / Header strictly matching Screen 1 details */}
          <button 
            onClick={() => { setActiveTab('learn'); setSearchText(''); }}
            className="px-2 text-left hover:opacity-85 transition-opacity cursor-pointer group focus:outline-none"
          >
            <h1 className="font-extrabold text-2xl text-[#2b6c00] flex items-center gap-2 group-hover:text-[#1e5000] transition-colors">
              <span className="material-symbols-outlined text-4xl text-[#58cc02]" style={{ fontVariationSettings: "'FILL' 1" }}>
                potted_plant
              </span>
              PMprepares
            </h1>
            <p className="font-bold text-[10px] uppercase tracking-widest text-[#3f4a36] opacity-75 mt-0.5">Discovery Platform</p>
          </button>

          {/* Simple clear navigation list */}
          <nav className="flex flex-col gap-1.5 flex-1">
            
            <button 
              onClick={() => { setActiveTab('learn'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === 'learn' ? 'bg-[#58cc02] text-[#1e5000] shadow-sm' : 'text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00]'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Learn (Study Map)</span>
            </button>

            <button 
              onClick={() => { setActiveTab('path'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === 'path' ? 'bg-[#58cc02] text-[#1e5000] shadow-sm' : 'text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00]'}`}
            >
              <Map className="w-5 h-5" />
              <span className="text-sm">My Path (active concept)</span>
            </button>

            <button 
              onClick={() => { setActiveTab('lessons'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === 'lessons' ? 'bg-[#58cc02] text-[#1e5000] shadow-sm' : 'text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00]'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Find Concepts</span>
            </button>

            <button 
              onClick={() => { setActiveTab('leaderboard'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === 'leaderboard' ? 'bg-[#58cc02] text-[#1e5000] shadow-sm' : 'text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00]'}`}
            >
              <Trophy className="w-5 h-5" />
              <span className="text-sm">Leaderboard</span>
            </button>

            <button 
              onClick={() => { setActiveTab('community'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === 'community' ? 'bg-[#58cc02] text-[#1e5000] shadow-sm' : 'text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00]'}`}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm">Community Chat</span>
            </button>

          </nav>

          {/* Lower Sidebar Tabs */}
          <div className="border-t border-[#becbb1] pt-4 flex flex-col gap-1.5">
            
            {/* Quick streak calculator widget */}
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl mb-2">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                🔥
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-[#3f4a36] uppercase tracking-wider">Your Daily Streak</p>
                <p className="text-sm font-black text-orange-600">{dayStreak} Days Active</p>
              </div>
            </div>

            <button 
              onClick={() => { setActiveTab('help'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00] text-left text-sm ${activeTab === 'help' ? 'bg-[#f3f3f3] text-[#2b6c00]' : ''}`}
            >
              <HelpCircle className="w-4.5 h-4.5" />
              <span>How to use the Web</span>
            </button>

            <button 
              onClick={() => { setActiveTab('settings'); setSearchText(''); }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all text-[#3f4a36] hover:bg-[#f3f3f3] hover:text-[#2b6c00] text-left text-sm ${activeTab === 'settings' ? 'bg-[#f3f3f3] text-[#2b6c00]' : ''}`}
            >
              <SettingsIcon className="w-4.5 h-4.5" />
              <span>Profile Settings</span>
            </button>

          </div>

        </aside>

        {/* Content Panel Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* View Tab router */}
          
          {/* TAB 1: Learn module list */}
          {activeTab === 'learn' && (
            <div className="space-y-6">
              
              {/* Header Section */}
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-3xl font-black text-[#1a1c1c] tracking-tight">Product Discovery Path</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-bold text-[#3f4a36]">
                  <span className="flex items-center gap-1.5 bg-[#eeeeee] px-3 py-1 rounded-full text-xs">
                    <Layers className="w-4 h-4 text-[#2b6c00]" /> {initialModules.length} Custom Modules
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#eeeeee] px-3 py-1 rounded-full text-xs">
                    <BookOpen className="w-4 h-4 text-[#2b6c00]" /> {initialModules.reduce((acc, mod) => acc + mod.lessons.length, 0)} Key Concepts
                  </span>
                  <span className="px-2.5 py-1 bg-[#ddad00]/25 text-[#1e5000] rounded text-[10px] font-black uppercase tracking-wider">
                    Free forever for beginners
                  </span>
                </div>
              </div>

              {/* Beginner Tour Step 0 */}
              {beginnerTourOpen && tourStep === 0 ? (
                <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-2 border-indigo-400 rounded-2xl p-5 md:p-6 shadow-md transition-all relative overflow-hidden animate-pulse-subtle">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                    Beginner Guide: Step 1 of 4
                  </div>
                  <div className="flex gap-4 items-start mt-2">
                    <span className="text-3xl filter drop-shadow">🚀</span>
                    <div className="space-y-3 flex-1">
                      <h4 className="font-extrabold text-indigo-950 text-base md:text-lg">
                        Welcome, Future Product Manager! Let's get started 👋
                      </h4>
                      <p className="text-xs md:text-sm text-indigo-900/90 font-medium leading-relaxed max-w-3xl">
                        Product discovery is the secret weapon of elite software design teams. To help you build ultimate confidence, we prepared step-by-step guidance! <strong className="text-indigo-950 font-extrabold">Chapter 1: Discovery Foundations</strong> is your perfect starting point.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button 
                          onClick={() => {
                            setActiveModuleId('foundations');
                            setActiveTab('path');
                            setTourStep(1);
                          }} 
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow hover:shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Open Chapter 1 & Continue</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={dismissTour} 
                          className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200 cursor-pointer"
                        >
                          Skip Guide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setBeginnerTourOpen(true);
                      setTourStep(0);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Need Help? Launch Quick Rookie Tour</span>
                  </button>
                </div>
              )}

              {/* List of Modules */}
              <div className="space-y-4">
                
                {/* Loop through custom designed modules */}
                {initialModules.map((mod, index) => {
                  const completedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
                  const totalCount = mod.lessons.length;
                  const percent = claimedModuleBonuses.includes(mod.id) ? 100 : Math.round((completedCount / totalCount) * 100);

                  return (
                    <div 
                      key={mod.id} 
                      onClick={() => {
                        setActiveModuleId(mod.id);
                        setActiveTab('path');
                      }}
                      className="bg-white rounded-2xl border-2 border-[#becbb1] hover:border-[#2b6c00] hover:shadow-md transition-all duration-300 p-5 cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="flex gap-4 items-start md:items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          mod.color === 'primary' ? 'bg-[#58cc02]/20 text-[#2b6c00]' :
                          mod.color === 'secondary' ? 'bg-[#2fb8ff]/20 text-[#006590]' :
                          mod.color === 'tertiary' ? 'bg-amber-500/25 text-amber-700' :
                          mod.color === 'quaternary' ? 'bg-purple-500/25 text-purple-700' :
                          'bg-[#58cc02]/20 text-[#2b6c00]'
                        }`}>
                          {mod.id === 'foundations' ? <BookOpen className="w-6 h-6" /> :
                           mod.id === 'research' ? <Users className="w-6 h-6" /> :
                           mod.id === 'competitive' ? <Layers className="w-6 h-6" /> :
                           mod.id === 'surveys' ? <FileText className="w-6 h-6" /> :
                           <BookOpen className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                              Chapter {index + 1}
                            </span>
                            {percent === 100 ? (
                              <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Complete
                              </span>
                            ) : percent > 0 ? (
                              <span className="text-[10px] bg-sky-500 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                In Progress ({percent}%)
                              </span>
                            ) : (
                              <span className="text-[10px] bg-slate-400 text-white font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Not Started
                              </span>
                            )}
                            <span className="text-xs text-[#3f4a36] font-bold">
                              • {mod.lessons.length} Concepts
                            </span>
                          </div>
                          
                          <h3 className="font-extrabold text-xl text-[#1a1c1c] group-hover:text-[#2b6c00] transition-colors">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-[#3f4a36] font-medium leading-relaxed mt-1 max-w-2xl">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      {/* Right-side button and progress */}
                      <div className="w-full md:w-auto shrink-0 flex flex-col items-end gap-3 self-stretch justify-center pt-4 md:pt-0 border-t md:border-t-0 border-[#becbb1]">
                        {/* Button call to action */}
                        <button className="w-full md:w-auto px-5 py-2.5 bg-[#2b6c00] group-hover:bg-[#1e5000] text-white text-xs font-black rounded-xl transition-all shadow-md active:translate-y-0.5 flex items-center justify-center gap-1.5 uppercase">
                          <span>Open Chapter Guide</span>
                          <Play className="w-3.5 h-3.5 fill-white animate-pulse" />
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>
          )}

          {/* TAB 2: Active Module detail view "The Mom Test Framework" */}
          {activeTab === 'path' && (() => {
            const activeModuleVideos = videosData.filter(vid => vid.moduleId === activeModule.id);
            const activeModuleArticles = articlesData.filter(art => art.moduleId === activeModule.id);
            
            const moduleHighlights: Record<string, Array<{title: string, desc: string, badgeColor: string, dotColor: string}>> = {
              foundations: [
                { title: "Reduce Bias", desc: "Spot false validation patterns before building.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Build vs Discover", desc: "Delivery is writing code; discovery is deciding what to code.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Double Diamond", desc: "Explore options widely for beginners, then focus on key objectives.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              research: [
                { title: "Unbiased Feedback", desc: "Avoid leading questions that force fake praise blockages.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Past Behavior", desc: "Focus on specific past events rather than hypothetical claims.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Rule of 3", desc: "Identify the three golden rules of non-toxic validation.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              competitive: [
                { title: "Decode Reviews", desc: "Scour customer reviews to find competitors' hidden product gaps.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Orthogonal Axes", desc: "Map competitor workflows rather than arbitrary scoring lists.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Secret Shop", desc: "Try competitor systems as a normal beginner user to see points of friction.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              surveys: [
                { title: "Quantifiable Facts", desc: "Ask about factual frequencies and history rather than opinion projections.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "2-Minute Rule", desc: "Keep questionnaires short and punchy to prevent learner dropouts.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Even Scales", desc: "Remove middle-neutral ratings to force honest choices.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              synthesis: [
                { title: "Analyze Emotion", desc: "Group intense sentiment swings to see raw urgency levels.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Affinity Grid", desc: "Collect disparate feedback notes into unified category clusters.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Definite Problem", desc: "Draft high-clarity formula problem statements before designing any UI.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              prioritization: [
                { title: "Objective Scoring", desc: "Run quantitative RICE equations instead of intuitive guessing.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Value vs Effort", desc: "Sift quick-wins from resource-intensive strategic traps.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Backlog Guarding", desc: "Say polite but firm 'nos' using hard customer behavioral data.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              hypothesis: [
                { title: "Sift Assumptions", desc: "Locate dangerous latent assertions behind features.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Form and Spec", desc: "Define actions, outcomes, and clear target indicators.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Falsifiability Check", desc: "Design test conditions that can clearly fail to guarantee true user learning.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              validation: [
                { title: "Fake-Door Selling", desc: "Publish landing page smoke sites to measure real button interactions.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Manual Magic", desc: "Perform product workflows manually behind the scene as an extreme MVP.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Speed Loop", desc: "Validate customer desire within 48 hours instead of complex sprints.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ],
              metrics: [
                { title: "Core Goal", desc: "Identify one North Star Metric capturing repeating value.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
                { title: "Behavior Tracking", desc: "Track active usage leading metrics rather than passive sign-ups.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
                { title: "Cohort Health", desc: "Plot retention curves to verify permanent value loyalty.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
              ]
            };

            const currentHighlights = moduleHighlights[activeModule.id] || [
              { title: "Unbiased Feedback", desc: "Speak clean language without framing.", badgeColor: "border-[#2b6c00]", dotColor: "bg-[#2b6c00]" },
              { title: "Past Behavior", desc: "Search for actions that are already habit-forming.", badgeColor: "border-sky-500", dotColor: "bg-sky-500" },
              { title: "Keep it Simple", desc: "Always reduce complexity for web beginners.", badgeColor: "border-amber-500", dotColor: "bg-amber-500" }
            ];

            return (
              <div className="space-y-6">
                
                {/* Breadcrumb row */}
                <nav className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#3f4a36]">
                  <button onClick={() => setActiveTab('learn')} className="hover:text-[#2b6c00]">Discovery Path</button>
                  <ChevronRight className="w-3.5 h-3.5 text-[#3f4a36]" />
                  <span className="text-[#2b6c00]">{activeModule.title}</span>
                </nav>

                {/* Beginner Tour Step 1 */}
                {beginnerTourOpen && tourStep === 1 && activeModule.id === 'foundations' && (
                  <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-2 border-indigo-400 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                      Beginner Guide: Step 2 of 4
                    </div>
                    <div className="flex gap-4 items-start mt-2">
                      <span className="text-3xl filter drop-shadow">📖</span>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-extrabold text-indigo-950 text-base md:text-lg">
                          Nice work! Let's explore the Textbook Guides 💡
                        </h4>
                        <p className="text-xs md:text-sm text-indigo-900/90 font-medium leading-relaxed">
                          This section contains your core educational readings. Take a moment to read topic guides such as <strong className="text-indigo-950">"What is Product Discovery?"</strong>, <strong className="text-indigo-950">"Discovery vs Delivery"</strong>, and <strong className="text-indigo-950">"The Double Diamond"</strong> below! It helps to understand these master concepts before tackling practice tasks.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button 
                            onClick={() => setTourStep(2)} 
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg transition-all shadow cursor-pointer text-center"
                          >
                            Next: Check off Concepts Checklist ✏️
                          </button>
                          <button 
                            onClick={() => {
                              setActiveTab('learn');
                              setTourStep(0);
                            }} 
                            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all border border-slate-200 cursor-pointer"
                          >
                            Back
                          </button>
                          <button 
                            onClick={dismissTour} 
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-transparent"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Restructured Active Module Textbook Flow */}
                <section className="bg-white border border-[#becbb1] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  
                  {/* Title & Estimated Time */}
                  <div className="space-y-2 border-b border-slate-100 pb-5">
                    <div className="inline-flex items-center gap-1.5 bg-[#58cc02]/20 text-[#1e5000] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-[#2b6c00]" />
                      <span>MASTER CLASS READING</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1c1c] tracking-tight">{activeModule.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-[#3f4a36] font-bold">
                      <Clock className="w-4.5 h-4.5 text-[#2b6c00]" />
                      <span>Estimated Reading Time: <strong className="text-[#1a1c1c] font-black underline decoration-2 decoration-[#58cc02]">35 Minutes</strong></span>
                    </div>
                    <p className="text-sm text-[#3f4a36] font-medium leading-relaxed mt-2 max-w-3xl">
                      {activeModule.description}
                    </p>
                  </div>

                  {/* Syllabus / Topics to Study bullet points */}
                  <div className="bg-[#f9f9f9] border border-[#becbb1] rounded-2xl p-5 md:p-6 space-y-3">
                    <h3 className="font-extrabold text-sm text-[#1a1c1c] uppercase tracking-wider flex items-center gap-2">
                      <span className="text-base">📖</span> Topics you are going to study in this page:
                    </h3>
                    <ul className="space-y-3 pl-1">
                      {activeModule.lessons.map((lesson, idx) => (
                        <li key={lesson.id} className="flex items-start gap-3 text-sm text-[#3f4a36] font-medium leading-relaxed">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#58cc02]/15 text-[#1e5000] text-xs font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="text-[#1a1c1c] font-medium">
                            {lesson.title}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-100 pt-4"></div>

                  {/* Full-Fledged Succession Explanations Article */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="p-1.5 bg-sky-50 text-[#006590] rounded-xl text-lg">💡</span>
                      <h3 className="font-extrabold text-xs uppercase tracking-widest text-[#006590]">
                        Full-Fledged Comprehensive Reading Article
                      </h3>
                    </div>

                    <div className="text-[#1a1c1c] text-sm md:text-base leading-relaxed space-y-8 font-medium">
                      {activeModule.id === 'foundations' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: What is Product Discovery?</h4>
                            <p className="text-[#3f4a36]">
                              Product Discovery is a structured, continuous, and highly iterative process that helps product teams validate assumptions, refine user understandings, and determine which features should be actively pursued versus ignored. In modern digital markets, embarking straight on software delivery without dedicating proper time to discovery is one of the leading causes of startup product failure. By prioritizing qualitative patient conversations, quantitative checkmarks, and continuous collaborative exercises, product managers can prevent wasting expensive software developer time on unvalued interfaces.
                            </p>
                            <p className="text-[#3f4a36]">
                              The discovery process shifts the team’s mindset from blindly shipping feature tickets from a backlog to scientifically analyzing the user’s environment and operational constraints. It empowers cross-functional teams comprising designers, engineering leads, and business stakeholders to collaboratively outline testable hypotheses and construct raw, informative low-fidelity prototypes. This investigative model is the cornerstone of great, digital-first organizations looking to stay ahead of fast-moving customer preferences and technical developments.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Ultimately, Product Discovery acts as the primary shield that ensures your engineering resources are focused solely on building features that satisfy a true, deeply felt customer need.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Discovery vs Delivery</h4>
                            <p className="text-[#3f4a36]">
                              The fundamental distinction between product discovery and product delivery is the difference between choosing the optimal road to travel versus driving the vehicle efficiently. Product delivery focuses purely on execution speed, code cleanliness, automated regression test suits, system refactoring, and deploying server containers with zero service interruption. While these engineering disciplines are absolutely necessary, superb delivery will produce zero long-term business value if the finished application does not resolve a critical user pain.
                            </p>
                            <p className="text-[#3f4a36]">
                              Conversely, product discovery is occupied with testing user value, examining ease of use, measuring market demand, and verifying business model scalability. It demands close cooperation with customers to gather real-world behavioral evidence before writing production-grade software. Balancing both discovery cycles and delivery sprints is a primary characteristic of healthy, high-performing product companies that prevent their engineers from building products in isolation.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              To put it simply: discovery is the persistent effort of choosing "what to build," while delivery is the strict discipline of "how to build it."
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: The Double Diamond</h4>
                            <p className="text-[#3f4a36]">
                              The Double Diamond is a legendary design framework popularized by the British Design Council that splits the creative problem-solving cycle into four clear, organized steps: Discover, Define, Develop, and Deliver. Represented visually as two distinct diamonds positioned side-by-side, this architecture illustrates the balance of divergent thinking and convergent thinking. Divergent phases require teams to expand their horizons to explore customer feedback, while convergent steps force them to narrow down options to make clear, actionable decisions.
                            </p>
                            <p className="text-[#3f4a36]">
                              The first diamond focuses entirely on the problem space, expanding during "Discover" to gather raw customer behavior data and contracting during "Define" to lock in a canonical, high-friction problem statement. The second diamond focuses on the solution space, expanding during "Develop" to design multiple, creative low-fidelity concepts and contracting during "Deliver" to build a validated product. By implementing this structure, teams can ensure they do not jump straight to coding before fully understanding the core user problem.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Separating these phases prevents teams from rushing to build solutions for problems that have not been validated.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'research' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Introduction to Interviews</h4>
                            <p className="text-[#3f4a36]">
                              Effective customer interviews are a fast and reliable way to gather qualitative insights in user research. While quantitative metrics can tell you what actions users are taking, qualitative interviews help expose the underlying emotional reasons and motivations behind those actions. PMs should approach customer interviews with curiosity, keeping the focus entirely on the customer's real experience.
                            </p>
                            <p className="text-[#3f4a36]">
                              The industry standard for conducting research conversations is Rob Fitzpatrick's "The Mom Test," which provides rules for asking questions that people cannot lie to you about. Rather than asking users "Would you use an app that does X?", focus on investigating their previous actions, current systems, and recent purchase decisions. When you ask about concrete past behaviors instead of hypothetical future promises, you gather authentic evidence to guide your product.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              The key to a successful interview is spending 80% of your time listening to your user’s story rather than pitching your project idea.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Identifying User Pain Points</h4>
                            <p className="text-[#3f4a36]">
                              Uncovering genuine customer pain points is the primary goal of any discovery sprint, but not all client complaints deserve equal attention on your backlog. User feedback can be noisy, featuring requests for aesthetic tweaks or minor improvements that do not represent core blockers for their operations. Product managers must separate these minor grievances from deep pain points that cost users significant time, energy, and financial budget.
                            </p>
                            <p className="text-[#3f4a36]">
                              The strongest indicator of a critical pain point is the existence of an active, manual, or expensive workaround. If a user is manually copying information across spreadsheets and spending hours every Friday printing reports, they are already feeling the problem intensely. Discovering these workarounds gives you a clear blueprint of pre-validated demand that you can capitalize on.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Focus your efforts on solving problems that users are already paying money or spending hours trying to resolve today.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Avoiding Leading Questions</h4>
                            <p className="text-[#3f4a36]">
                              The fastest way to pollute your user research is to ask leading, hypothetical, or subjective questions that encourage polite, positive answers. Questions like "Would you buy a beautiful, automated system that organizes your documents?" can be misleading. This phrasing forces the user into a hypothetical future where actions cost them nothing, leading to unreliable validation.
                            </p>
                            <p className="text-[#3f4a36]">
                              Instead of guiding respondents toward a specific answer, focus on open-ended, fact-based questions about historical occurrences. Replace "How often would you use this?" with "Walk me through the last time you organized your files manually, and how long did it take?". By anchoring the conversation in recent reality, you eliminate speculation and uncover raw truths about user workflows.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Never ask users to predict their future budgets; ask them to walk you through how they spent their money yesterday.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'competitive' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Feature Lists vs Core Value</h4>
                            <p className="text-[#3f4a36]">
                              Traditional competitive research often leads teams into the trap of analyzing massive lists of features. PMs spend weeks mapping out exhaustive grids containing hundreds of rows, trying to match every button, setting, and option their competitors have launched. This practice is based on the assumption that the competitor with the largest feature set wins, which is a common misconception.
                            </p>
                            <p className="text-[#3f4a36]">
                              In reality, feature bloat is a primary cause of software clutter, and competitor customers are often frustrated by the complexity. Excellent competitive discovery focuses on analyzing the core value promise that competitors advertise on their landing pages. By studying their primary value proposition, target segments, and user onboarding flows, you can find simple, focused gaps.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              It is better to build three core features that users love than fifty minor features that clutter the interface.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: The Competitive Matrix</h4>
                            <p className="text-[#3f4a36]">
                              Creating a competitive matrix is a powerful exercise to visualize how your product relates to existing solutions on the market. Instead of relying on a standard list of names, placing competitors on a two-axis grid forces you to define the market parameters. The axes should represent the key purchasing decision criteria for your target audience, such as Price vs Performance or Simplicity vs Flexibility.
                            </p>
                            <p className="text-[#3f4a36]">
                              Once competitors are plotted, patterns will immediately emerge, showing where the market is overcrowded and where opportunities exist. Many older incumbents tend to huddle in the same high-complexity, high-price quadrant, leaving the simple, affordable spaces entirely open. Finding these gaps allows you to position your product with a clear value proposition.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Use orthogonal vectors to discover uncrowded, valuable spaces that competitors have neglected.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Secret Shopping</h4>
                            <p className="text-[#3f4a36]">
                              Secret shopping is the practice of signing up for competitor products as a normal customer to evaluate their entire user experience. By walking through their landing page, registration funnel, onboarding guides, and help documentation, you can discover hidden friction points. This hands-on research exposes the gap between what competitors claim on their website and what users actually experience.
                            </p>
                            <p className="text-[#3f4a36]">
                              While shopping, record your emotional reactions, system delays, and confusing instructions. Take detailed screenshots of their payment walls, setup guides, and transactional emails. These records have high educational value, revealing the exact customer satisfaction issues that competitors' paying users complain about on public forums.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Evaluate your competitor's onboarding flow from the perspective of a beginner to identify quick wins.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'surveys' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Drafting Fact-Based Questions</h4>
                            <p className="text-[#3f4a36]">
                              Surveys are a highly efficient method for gathering feedback from hundreds of users, but their value depends on question design. Most product surveys gather useless speculation because they ask hypothetical preference questions. Inquiries like "How much would you pay for an automated invoice tracking system?" yield unreliable data that does not correlate with actual purchasing behavior.
                            </p>
                            <p className="text-[#3f4a36]">
                              To get high-quality data, configure your surveys to ask factual, retrospective questions that test past actions. Replace speculative questions with ones like "In the past 30 days, how many invoices did you process manually, and what tool did you use?". Real, verifiable historical behavior is the only reliable indicator of future product adoption.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Build your entire questionnaire around actual events rather than hypothetical possibilities.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: The Goldilocks Survey Length</h4>
                            <p className="text-[#3f4a36]">
                              Survey abandonment is a major issue in user research, with completion rates dropping for every additional question asked. When faced with a 20-minute survey, busy respondents will either exit without completing it or rush through, clicking random options. This leads to biased, incomplete data sets that can misguide your product roadmap.
                            </p>
                            <p className="text-[#3f4a36]">
                              To prevent this, design a short survey focused on your core hypotheses. Keep the survey under seven questions in total, ensuring it can be completed in under two minutes. This constraint forces you to ruthlessly prioritize your inquiries, keeping only the questions that directly serve your learning goals.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              A short, focused survey with 100 complete responses is far more valuable than a long one with 5 partial ones.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Avoiding the Neutral Trap</h4>
                            <p className="text-[#3f4a36]">
                              Standard survey design often uses five-point Likert scales, offering options like "Strongly Agree," "Agree," "Neutral," "Disagree," and "Strongly Disagree." While common, this design introduces a major issue known as the neutral trap. Given an easy middle option, indifferent or busy respondents will choose "Neutral," which hides their true feelings.
                            </p>
                            <p className="text-[#3f4a36]">
                              To avoid this, use even-numbered rating scales (such as 1 to 4 or 1 to 6) that force respondents to lean positive or negative. This forced-choice method eliminates lazy defaults and provides clear, actionable customer feedback.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Eliminating the middle ground forces respondents to make a clear choice, yielding high-value insights.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'synthesis' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Pain Point Severity Mapping</h4>
                            <p className="text-[#3f4a36]">
                              Once customer interviews and survey feedback are completed, product teams are often overwhelmed with qualitative data. Synthesizing this feedback starts with pain point severity mapping. This framework helps you categorize user complaints based on how severely they impact the customer's daily operations and financial budgets.
                            </p>
                            <p className="text-[#3f4a36]">
                              PMs should group complaints into three clear tiers: Tier-1 "hair-on-fire" problems that cause operational stagnation; Tier-2 moderate annoyances that users can work around; and Tier-3 aesthetic preferences. This mapping ensures your engineering resources are focused on high-priority issues rather than low-friction requests.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Focus your early development on solving Tier-1 blockers to prove immediate value.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Affinity Mapping Framework</h4>
                            <p className="text-[#3f4a36]">
                              Affinity mapping is a collaborative synthesis framework used to organize unstructured user feedback into thematic clusters. By placing individual sticky notes representing user quotes, complaints, and behaviors on a shared digital or physical board, teams can visually identify common pain points. This process helps reveal hidden patterns in the qualitative data.
                            </p>
                            <p className="text-[#3f4a36]">
                              As teams group similar notes together, natural thematic columns emerge, demonstrating how frequently specific pain points occur across different users. This density mapping helps you identify systemic market frustrations rather than isolated, individual requests.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Grouping individual user observations helps uncover the broader themes that drive your product strategy.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Crafting Problem Statements</h4>
                            <p className="text-[#3f4a36]">
                              The final step of the synthesis phase is translating thematic patterns into structured, actionable problem statements. Vague definitions like "The checkout process is confusing" are difficult for design and engineering teams to act on, often leading to misaligned features and wasted sprint cycles.
                            </p>
                            <p className="text-[#3f4a36]">
                              To avoid this, write canonical problem statements that clearly define the user profile, the exact friction, the operational blocker, and the emotional or business cost. Use a standard formula: "Our [Target Persona] experiences [specific friction] when trying to [achieve goal], resulting in [quantifiable loss]." This keeps the team aligned on a single problem.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              A well-structured problem statement is the foundation for designing effective, high-value solutions.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'prioritization' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: The Quantitative RICE Framework</h4>
                            <p className="text-[#3f4a36]">
                              Prioritization is the process of deciding which features, bug fixes, and updates should be built first, given your limited engineering resources. To prevent decisions from being driven by subjective feelings or the louder voices in the room, teams should use quantitative prioritization frameworks like RICE.
                            </p>
                            <p className="text-[#3f4a36]">
                              RICE is a mathematical formula that calculates a score for each feature by multiplying Reach, Impact, and Confidence, and dividing by Effort. Reach measures how many users will be affected in a given timeframe; Impact targets the value generated for those users; Confidence represents your data-backed certainty; and Effort tracks the required developer weeks. This structure helps you build an objective rank.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Using formulas to score features helps ground product planning in objective data, reducing roadmap debates.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: MoSCoW & Value vs Effort</h4>
                            <p className="text-[#3f4a36]">
                              The MoSCoW method is a qualitative prioritization framework that groups project requirements into four categories: Must-have, Should-have, Could-have, and Won't-have. This categorization is especially useful when planning MVP launches or scoping specific release metrics under tight deadlines.
                            </p>
                            <p className="text-[#3f4a36]">
                              To refine this mapping, plot tasks on a two-by-two grid of Value versus Effort. Focus your sprint planning on high-value, low-effort "Quick Wins" to build team momentum, while identifying and avoiding low-value, high-effort "Thankless Tasks." This visual alignment keeps stakeholders focused on key priorities.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Categorizing tasks on simple value vectors helps protect your team's development capacity.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Roadmap Defense Rules</h4>
                            <p className="text-[#3f4a36]">
                              Protecting your product roadmap from unvalidated stakeholder requests is a key skill for product managers. Executive teams and sales reps often demand custom features to close individual deals, which can distract your team from solving the core problems of your broader target audience.
                            </p>
                            <p className="text-[#3f4a36]">
                              To defend your roadmap, anchor your arguments in objective user research and quantitative RICE scores. Presenting clear problem statements, competitor analysis, and experiment results helps shift the conversation from subjective opinions to data-driven discussions. This approach helps you maintain product focus.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Align your stakeholders around agreed-upon prioritization metrics to prevent roadmap distraction.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'hypothesis' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Unearthing Latent Assumptions</h4>
                            <p className="text-[#3f4a36]">
                              Every product plan is built on a foundation of implicit assumptions regarding market demand, user behavior, usability, and technical feasibility. If the core assumptions are incorrect, the entire product strategy can fall apart, leading to costly waste. Before writing code, teams should deconstruct their ideas to identify these dependencies.
                            </p>
                            <p className="text-[#3f4a36]">
                              Start by listing all the assertions that must be true for your product to succeed. Categorize these into value assumptions, usability assumptions, and business viability assumptions, then plot them on a grid of Importance versus Certainty. Focus your prototyping on testing the high-importance, low-certainty risks first to validate them.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Identify and test your riskiest assumptions early to avoid building on unstable foundations.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Writing Testable Hypotheses</h4>
                            <p className="text-[#3f4a36]">
                              To test your product assumptions scientifically, convert them into clear, actionable hypotheses. Vague descriptions like "Users will find the automated document organizer valuable" are difficult to test, often leading to ambiguous results that fail to guide your product decisions.
                            </p>
                            <p className="text-[#3f4a36]">
                              Instead, use a structured hypothesis template: "We believe [Target User] will perform [Specific Interaction] because they need to solve [Pain Point]. We will verify this when [Key Indicator] reaches [Falsifiable Threshold]." This format forces you to specify the target persona, the expected behavior, and the success criteria.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Formatting your ideas as testable hypotheses helps turn product development into a structured process.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Setting Falsifiability Bars</h4>
                            <p className="text-[#3f4a36]">
                              In scientific research, a hypothesis is only useful if it is falsifiable—meaning there is a clear outcome that can prove it wrong. In product management, teams often set vague success criteria like "We want to see high user engagement" or "The feedback should be positive." These criteria are impossible to fail, leading to false validation.
                            </p>
                            <p className="text-[#3f4a36]">
                              To practice rigorous discovery, set specific, numerical failure thresholds before running any tests. For example, specify: "If fewer than 15% of page visitors sign up for the waitlist, our hypothesis is invalidated, and we will pivot." This discipline protects your team from bias and helps you make clear-cut decisions.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Defining clear failure metrics in advance helps you make objective decisions about whether to pivot or proceed.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'validation' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Landing Page Smoke Tests</h4>
                            <p className="text-[#3f4a36]">
                              A landing page smoke test is a highly efficient method to validate customer purchase intent before writing any backend code. By launching a simple, conversion-oriented single page that describes your solution, you can measure real demand. This approach helps you gather quantitative proof of market interest with minimal effort.
                            </p>
                            <p className="text-[#3f4a36]">
                              Your landing page should feature impact-driven copywriting, simple mockups, and a clear call-to-action button, such as "Pre-order Now" or "Join Beta waitlist." Track the click-through rates on these buttons to gauge user interest. This metric provides stronger evidence of product demand than simple survey responses.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              A customer's action to sign up for a waitlist represents higher intent than their response to a survey.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Wizard of Oz vs Concierge</h4>
                            <p className="text-[#3f4a36]">
                              When validating complex product ideas, writing automation code too early can slow you down. Instead, use manual MVPs to test your hypotheses quickly. Two popular models are the Wizard of Oz and the Concierge MVP, which allow you to test your service flows manually.
                            </p>
                            <p className="text-[#3f4a36]">
                              A Wizard of Oz MVP looks fully automated from the outside, but all backend operations are executed manually behind the scenes. A Concierge MVP is openly manual, with the product team providing highly personalized service directly to the user. Both approaches help you understand user workflows and perfect your solution before automation.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Use manual processes early on to learn what features you actually need to automate in code.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: The Minimum Viable Test</h4>
                            <p className="text-[#3f4a36]">
                              The concept of the Minimum Viable Test (MVT) helps you focus on the fastest, lowest-cost feedback loop to prove or disprove a core hypothesis. While a Minimum Viable Product (MVP) is a functional version of your solution, an MVT is designed to test a single assumption without building a complete product.
                            </p>
                            <p className="text-[#3f4a36]">
                              MVTs are highly effective because they prevent teams from over-engineering solutions for unverified needs. By testing your core assumptions with simple tools like community posts or manual consultations, you can gather high-quality data. This approach keeps your development cycles fast and focused.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Run cheap, focused tests on your riskiest assumptions to guide your product decisions with evidence.
                            </p>
                          </div>
                        </article>
                      )}

                      {activeModule.id === 'metrics' && (
                        <article className="space-y-8">
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 1: Choosing a North Star Metric (NSM)</h4>
                            <p className="text-[#3f4a36]">
                              Your North Star Metric is the single key performance indicator that best captures the core value your product delivers to its customers. Avoid vanity stats like total registered accounts. Instead, focus on metrics that reflect recurring user satisfaction, such as the weekly active report generation rate.
                            </p>
                            <p className="text-[#3f4a36]">
                              A well-chosen North Star Metric helps align your product, engineering, and marketing teams behind a shared goal. If your NSM is growing, it indicates your product is delivering value to your customers, which drives long-term retention and revenue growth.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Focus your team's efforts on growing your North Star Metric to drive sustainable product value.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 2: Leading vs Lagging Metrics</h4>
                            <p className="text-[#3f4a36]">
                              Product managers must understand the difference between leading and lagging indicators to make timely decisions. Lagging indicators, like monthly recurring revenue or churn rate, tell you what has already happened. While useful for reporting, they do not help you prevent issues in real time.
                            </p>
                            <p className="text-[#3f4a36]">
                              Leading indicators, like user activation frequency within their first three days or draft completion rates, help predict future retention patterns. By tracking these behavioral metrics, you can identify and address usability issues before they impact your financial results.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Monitor leading behavioral indicators to stay proactive and maintain long-term retention.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-[#006590] border-l-4 border-[#006590] pl-3">Topic 3: Cohort Retention Curves</h4>
                            <p className="text-[#3f4a36]">
                              Churn is a major blocker for product growth, and tracking retention is key to building a sustainable business. To evaluate your product health, group users into cohorts based on the week or month they registered, and track their active usage over time. This approach helps you see if users are finding long-term value from your product.
                            </p>
                            <p className="text-[#3f4a36]">
                              If your cohort retention curves flatline at a steady percentage rather than dropping to zero, it indicates your product has achieved fit with a stable group of users. This baseline is essential for growth; if retention is poor, bringing in new users won't scale.
                            </p>
                            <p className="pl-4 border-l-4 border-[#2b6c00]/30 italic bg-slate-50 p-3 rounded-r-xl text-xs text-[#3f4a36] font-semibold">
                              Focus on stabilizing your cohort retention curves before investing heavily in user acquisition.
                            </p>
                          </div>
                        </article>
                      )}
                    </div>
                  </div>
                </section>

                {/* Interactive Lessons Checklist block */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#58cc02]/20 flex items-center justify-center text-[#2b6c00] shrink-0 border border-[#58cc02]/35">
                      <CheckCircle className="w-5 h-5 text-[#2b6c00]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-[#1a1c1c]">Chapter Syllabus Checklist</h3>
                      <p className="text-xs text-[#3f4a36] font-medium">Click the circular checks to mark concepts complete as you progress, earning XP instantly!</p>
                    </div>
                  </div>

                  {/* Beginner Tour Step 2 */}
                  {beginnerTourOpen && tourStep === 2 && activeModule.id === 'foundations' && (
                    <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-2 border-indigo-400 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden animate-fade-in my-3">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                        Beginner Guide: Step 3 of 4
                      </div>
                      <div className="flex gap-4 items-start mt-2">
                        <span className="text-3xl filter drop-shadow">✏️</span>
                        <div className="space-y-2 flex-1">
                          <h4 className="font-extrabold text-indigo-950 text-base md:text-lg">
                            Step 3: Interactive Practice & Instant Scoring 🏆
                          </h4>
                          <p className="text-xs md:text-sm text-indigo-900/90 font-medium leading-relaxed">
                            PM learning is all about habit-building! Click the circular checkboxes next to each concept below. Checking off a completed concept grants you <strong className="text-indigo-950 font-black">+20 XP</strong> instantly to boost your profile performance on the active list!
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button 
                              onClick={() => {
                                setTourStep(3);
                                // scroll gently to videos section
                                document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
                              }} 
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-lg transition-all shadow cursor-pointer text-center"
                            >
                              Next: View Media Rooms 📺
                            </button>
                            <button 
                              onClick={() => setTourStep(1)} 
                              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all border border-slate-200 cursor-pointer"
                            >
                              Back
                            </button>
                            <button 
                              onClick={dismissTour} 
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-all cursor-pointer border border-transparent"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModule.lessons.map((lesson) => {
                      const isChecked = completedLessons.includes(lesson.id);
                      return (
                        <div 
                          key={lesson.id}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#becbb1] hover:border-[#2b6c00] transition-all relative"
                        >
                          <button 
                            onClick={() => handleToggleLesson(lesson, activeModule.id)}
                            className={`w-7 h-7 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-[#58cc02] border-[#2b6c00] text-white' : 'border-[#becbb1] hover:border-[#2b6c00] bg-white text-transparent'}`}
                            title={`Click to mark "${lesson.title}" as complete`}
                          >
                            <Check className="w-4.5 h-4.5 stroke-[3px]" />
                          </button>

                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-1.5 flex-wrap">
                              <h4 className={`text-sm font-bold ${isChecked ? 'text-slate-500 line-through' : 'text-[#1a1c1c]'}`}>
                                {lesson.title}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-500 bg-[#eeeeee] px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                {lesson.duration} • +{lesson.xpValue} XP
                              </span>
                            </div>
                            <p className="text-xs text-[#3f4a36] font-medium mt-1.5 leading-relaxed">
                              {lesson.explanation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Videos section */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <Play className="w-5 h-5 fill-red-600" />
                    </div>
                    <h3 className="font-black text-xl text-[#1a1c1c]" id="videos-section">Videos summaries to Watch</h3>
                  </div>

                  {/* Beginner Tour Step 3 */}
                  {beginnerTourOpen && tourStep === 3 && activeModule.id === 'foundations' && (
                    <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 border-2 border-indigo-400 rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden animate-fade-in my-3">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                        Beginner Guide: Step 4 of 4
                      </div>
                      <div className="flex gap-4 items-start mt-2">
                        <span className="text-3xl filter drop-shadow">📺</span>
                        <div className="space-y-3 flex-1">
                          <h4 className="font-extrabold text-indigo-950 text-base md:text-lg">
                            Step 4: Media Rooms & Active Case Studies 🗣️
                          </h4>
                          <p className="text-xs md:text-sm text-indigo-900/90 font-medium leading-relaxed">
                            Watch immersive masterclass videos and interactive case study articles! Watching a session grants you <strong className="text-indigo-950 font-black">+20 XP</strong> while auxiliary articles reward you with custom trivia tests.
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button 
                              onClick={dismissTour} 
                              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow cursor-pointer text-center flex items-center gap-1.5"
                            >
                              <span>Finish Guide & Start Learning</span>
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setTourStep(2)} 
                              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all border border-slate-200 cursor-pointer"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModuleVideos.length === 0 ? (
                    <p className="text-xs text-[#3f4a36] italic bg-white p-4 rounded-2xl border border-dashed border-[#becbb1]">No customized video courses assigned to this chapter yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {activeModuleVideos.map((vid) => {
                        const isWatched = completedVideos.includes(vid.id);
                        return (
                          <div 
                            key={vid.id}
                            onClick={() => setCurrentWatchingVideo(vid)}
                            className="bg-white rounded-2xl border border-[#becbb1] overflow-hidden cursor-pointer hover:shadow-lg transition-all group scale-100 active:scale-95 duration-200 flex flex-col justify-between"
                          >
                            <div className="relative aspect-video bg-[#eeeeee] overflow-hidden">
                              <img 
                                src={vid.imageUrl}
                                alt={vid.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md text-red-600 scale-100 group-hover:scale-110 transition-transform">
                                  <Play className="w-5 h-5 fill-red-600" />
                                </div>
                              </div>
                              <span className="absolute bottom-2 right-2 bg-black/75 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                                {vid.duration}
                              </span>
                              {isWatched && (
                                <span className="absolute top-2 left-2 bg-[#2b6c00] text-white font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                                  <Check className="w-3" /> Watched (+20 XP)
                                </span>
                              )}
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-sm text-[#1a1c1c] group-hover:text-[#2b6c00] transition-colors leading-snug">
                                  {vid.title}
                                </h4>
                                <p className="text-xs text-[#3f4a36] font-medium mt-1.5 leading-relaxed">
                                  {vid.description}
                                </p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#006590]">
                                <span>By: {vid.author}</span>
                                <span className="underline group-hover:no-underline font-extrabold flex items-center gap-0.5">
                                  Watch summary <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Articles section */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                      <Book className="w-5 h-5 text-sky-600" />
                    </div>
                    <h3 className="font-black text-xl text-[#1a1c1c]">Articles for Beginners to Read & Test</h3>
                  </div>

                  {activeModuleArticles.length === 0 ? (
                    <p className="text-xs text-[#3f4a36] italic bg-white p-4 rounded-2xl border border-dashed border-[#becbb1]">No custom articles designed config for this sector yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {activeModuleArticles.map((art) => {
                        const isRead = completedArticles.includes(art.id);
                        return (
                          <div 
                            key={art.id}
                            onClick={() => {
                              setCurrentReadingArticle(art);
                              setSelectedQuizOption(null);
                              setQuizSubmitted(false);
                            }}
                            className={`bg-white rounded-2xl border border-[#becbb1] p-4 flex items-start gap-4 cursor-pointer hover:border-[#2b6c00] hover:shadow-md transition-all group scale-100 active:scale-98 duration-200 ${isRead ? 'bg-emerald-50/10 border-dashed border-emerald-500' : ''}`}
                          >
                            <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${isRead ? 'bg-[#58cc02]/20 text-[#2b6c00]' : 'bg-[#eeeeee] text-[#3f4a36] group-hover:bg-[#2b6c00]/10 group-hover:text-[#2b6c00]'}`}>
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <h4 className="font-extrabold text-sm text-[#1a1c1c] group-hover:text-[#2b6c00] transition-colors">
                                  {art.title}
                                </h4>
                                <span className="text-[10px] font-bold text-slate-500 bg-[#eeeeee] px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                                  {art.readTime}
                                </span>
                              </div>
                              <p className="text-xs text-[#3f4a36] font-medium mt-1 leading-relaxed">
                                {art.description}
                              </p>
                              <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-sky-700">
                                {isRead ? (
                                  <span className="text-[#2b6c00] flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5" /> Successfully Read
                                  </span>
                                ) : (
                                  <span>Click to read article (+15 XP)</span>
                                )}
                                <span className="underline group-hover:no-underline font-extrabold text-[#2b6c00]">Open Book</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                {/* Ready to Finish claim reward section */}
                <footer className="mt-8 pt-6 border-t border-[#becbb1] flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#58cc02]/20 rounded-2xl flex items-center justify-center text-[#2b6c00]">
                      <Sparkles className="w-8 h-8 text-[#2b6c00]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-[#1a1c1c]">Finish Active Chapter?</h4>
                      <p className="text-xs text-[#3f4a36] font-medium">Claim your 30 practice bonus points and update the leaderboard standings!</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleClaimModuleBonus(activeModule.id)}
                    className="px-8 py-4 bg-[#2b6c00] hover:bg-[#1e5000] text-white font-extrabold text-lg rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all scale-100 active:scale-95 w-full md:w-auto"
                  >
                    {claimedModuleBonuses.includes(activeModule.id) ? 'Claimed Congratulations!' : 'CLAIM +30 BONUS XP'}
                    <Zap className="w-5 h-5 text-white" />
                  </button>
                </footer>

              </div>
            );
          })()}

          {/* TAB 3: Search and Lesson Directory for Learners */}
          {activeTab === 'lessons' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-2xl font-black text-[#1a1c1c]">Concept Exploration Registry</h2>
                <p className="text-xs text-[#3f4a36] font-medium mt-1">Here is a full list of all 11 topics and articles tailored for your first-time study experience. Type below to search instantly.</p>
              </div>

              {/* Beginner-friendly custom text search bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3f4a36]" />
                <input 
                  type="text"
                  placeholder="Type anything here e.g. 'unbiased', 'question', 'research'..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-white pl-11 pr-10 py-3.5 rounded-xl border border-[#becbb1] focus:outline-none focus:ring-2 focus:ring-[#2b6c00] text-sm font-semibold text-[#1a1c1c]"
                />
                {searchText && (
                  <button onClick={() => setSearchText('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#eeeeee] p-1.5 rounded-full hover:bg-[#e2e2e2]">
                    <X className="w-4 h-4 text-[#3f4a36]" />
                  </button>
                )}
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-bold text-[#3f4a36] self-center">Quick Beginner tags:</span>
                {['All', 'Discovery', 'Research', 'Rules', 'Leading questions', 'Interviews'].map((tag) => {
                  const keyword = tag === 'All' ? '' : tag === 'Rules' ? 'golden' : tag.toLowerCase();
                  const isCurrent = searchText.toLowerCase() === keyword;
                  return (
                    <button 
                      key={tag}
                      onClick={() => setSearchText(keyword)}
                      className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${isCurrent ? 'bg-[#58cc02] text-[#1e5000] border-[#2b6c00]' : 'bg-white text-[#3f4a36] border-[#becbb1] hover:border-[#2b6c00]'}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Results Grid List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLessons.map((item: any) => {
                  const isChecked = completedLessons.includes(item.id) || completedArticles.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#becbb1] p-5 flex flex-col justify-between hover:shadow-sm transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-[9px] bg-slate-100 text-slate-600 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {item.isArticle ? '📖 Article Study' : '💡 Course Concept'}
                          </span>
                          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {item.duration} • +{item.xpValue} XP
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-[#1a1c1c]">{item.title}</h4>
                        <p className="text-xs text-[#3f4a36] mt-2 leading-relaxed font-semibold">
                          {item.explanation || item.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        {item.moduleName && (
                          <span className="text-[10px] text-slate-500 font-bold">In: {item.moduleName}</span>
                        )}
                        
                        {item.isArticle ? (
                          <button 
                            onClick={() => {
                              const article = articlesData.find(a => a.id === item.id);
                              if (article) {
                                setCurrentReadingArticle(article);
                                setSelectedQuizOption(null);
                                setQuizSubmitted(false);
                              }
                            }}
                            className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-extrabold px-3 py-1.5 rounded-lg ml-auto transition-colors"
                          >
                            Read Article
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              const modId = item.moduleId || 'foundations';
                              setExpandedModuleId(modId);
                              setActiveTab('learn');
                            }}
                            className="text-xs bg-[#2b6c00] hover:bg-[#1e5000] text-white font-extrabold px-3 py-1.5 rounded-lg ml-auto transition-colors"
                          >
                            Go to module
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {filteredLessons.length === 0 && (
                  <div className="col-span-2 bg-white rounded-2xl p-8 text-center border border-dashed border-[#becbb1]">
                    <p className="text-base font-bold text-slate-500">No matching subjects found.</p>
                    <button onClick={() => setSearchText('')} className="mt-3 text-sm font-extrabold text-[#2b6c00] hover:underline">
                      Reset search filter
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: Detailed Leaderboard */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-2xl font-black text-[#1a1c1c]">Gold League Arena</h2>
                <p className="text-xs text-[#3f4a36] font-medium mt-1">This is a friendly overview showing your score rank against other virtual Product Management learners. Rank up as you finish lessons!</p>
              </div>

              {/* Informative explanation Box about ranks and Leagues */}
              <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 font-semibold text-xs text-amber-900 leading-relaxed">
                📢 <strong className="text-amber-950 text-sm block mb-1">What is a League?</strong>
                Leagues are virtual study groups. The <strong>Gold League</strong> is our weekly target segment. If you finish in the top 3 (1,800+ XP), you will unlock the legendary Platinum badge! Try marking more checkboxes to catch Sven and Ananya!
              </div>

              {/* Leaderboard Table widget list */}
              <div className="bg-white rounded-2xl border border-[#becbb1] overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-[#becbb1]">
                  <h4 className="font-extrabold text-[#1a1c1c] text-sm">Leaderboard Rank Index</h4>
                </div>

                <div className="divide-y divide-[#becbb1]/40">
                  {leaderboard.map((userItem) => {
                    const currentScore = userItem.xp;
                    const highlighted = userItem.isYou;

                    return (
                      <div 
                        key={`${userItem.name}-${userItem.rank}`}
                        className={`p-4 flex items-center justify-between gap-4 transition-colors ${highlighted ? 'bg-[#58cc02]/10 border-l-4 border-[#2b6c00]' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-5 text-center font-black text-sm text-[#3f4a36]">
                            {userItem.rank}
                          </span>
                          <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white shrink-0 ${highlighted ? 'bg-[#2fb8ff]' : 'bg-[#2b6c00]'}`}>
                            {userItem.initials}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-[#1a1c1c]">
                              {userItem.name} {highlighted && <span className="text-[10px] bg-[#2b6c00] text-white px-2 py-0.5 rounded-full font-bold ml-1.5 uppercase shrink-0">YOU</span>}
                            </h4>
                            <p className="text-[11px] text-[#3f4a36] font-medium">Aspiring PM • practicing daily</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#1a1c1c] text-sm">
                            {currentScore.toLocaleString()} XP
                          </span>
                          
                          {userItem.rank === 1 && (
                            <span className="text-lg" title="First Place gold medal!">🥇</span>
                          )}
                          {userItem.rank === 2 && (
                            <span className="text-lg" title="Second Place silver medal!">🥈</span>
                          )}
                          {userItem.rank === 3 && (
                            <span className="text-lg" title="Third Place bronze streak!">🥉</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Interactive Community Bulletin Board */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-2xl font-black text-[#1a1c1c]">Learners Community Discussion</h2>
                <p className="text-xs text-[#3f4a36] font-medium mt-1">Share your practice feedback with fellow beginners. Type your question or note to receive +10 XP bonus immediately!</p>
              </div>

              {/* Simple plain form to add question */}
              <form onSubmit={handleAddPost} className="bg-white rounded-2xl border border-[#becbb1] p-5 space-y-3 shadow-md">
                <h3 className="font-bold text-sm text-[#1a1c1c]">What is on your mind? Ask the class:</h3>
                <textarea 
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Ask any basic question here... e.g. 'Can I use this framework with my business?'"
                  className="w-full bg-[#eeeeee] p-3 text-sm rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[#2b6c00] text-[#1a1c1c] font-semibold placeholder-[#3f4a36] h-20"
                ></textarea>
                <div className="flex justify-between items-center flex-wrap gap-2 pt-2">
                  <p className="text-xs text-emerald-700 font-bold">💡 Tip: Asking a question adds +10 XP to your score today!</p>
                  <button 
                    type="submit"
                    className="bg-[#2b6c00] hover:bg-[#1e5000] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow active:translate-y-0.5 shrink-0"
                  >
                    Post Question
                  </button>
                </div>
              </form>

              {/* Forum items list */}
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl border border-[#becbb1] p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#58cc02]/20 font-bold text-xs text-[#2b6c00] flex items-center justify-center">
                          {post.avatar}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#1a1c1c]">
                            {post.author}
                          </h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">
                            {post.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-[#3f4a36] font-medium">{post.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1a1c1c] font-semibold leading-relaxed">
                      {post.body}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-4 text-xs font-bold text-slate-500">
                      <button 
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1 hover:text-[#2b6c00] ${post.liked ? 'text-[#2b6c00]' : ''}`}
                      >
                        <ThumbsUp className="w-4 h-4 fill-none" />
                        <span>Like ({post.likes})</span>
                      </button>
                      <button 
                        onClick={() => triggerNotification("💬 Reply feature", "Real-time chat answers are coming soon in your next workspace session!")} 
                        className="flex items-center gap-1 hover:text-sky-600"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Reply ({post.replies})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: Simple Guide on How to Use the Web */}
          {activeTab === 'help' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-2xl font-black text-[#1a1c1c]">Welcome to the World Wide Web! 🌐</h2>
                <p className="text-xs text-[#3f4a36] font-medium mt-1">If this is your first time using a computer web browser, this page will guide you through all the friendly actions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                
                <div className="bg-white p-5 rounded-2xl border border-[#becbb1] space-y-3">
                  <h3 className="font-extrabold text-[#2b6c00] text-base">🖱️ How to click things</h3>
                  <p className="text-[#3f4a36] font-medium leading-relaxed">
                    A <strong>button</strong> is a rectangular box with text on it (like "Start" or "Learn"). When you hover your cursor over it, it will change color slightly or shrink. Try pressing your mouse button to click it—nothing will break!
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#becbb1] space-y-3">
                  <h3 className="font-extrabold text-[#006590] text-base">📜 Scrolling pages</h3>
                  <p className="text-[#3f4a36] font-medium leading-relaxed">
                    Some information on this website won't fit on your screen. You can scroll down by using the wheel on your mouse, or dragging the vertical bar on the extreme right edge of your screen.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#becbb1] space-y-3">
                  <h3 className="font-extrabold text-orange-600 text-base">🔥 What is an "Experience Point" (XP)?</h3>
                  <p className="text-[#3f4a36] font-medium leading-relaxed">
                    Think of XP as virtual stars you receive for finishing practice. It helps you track how much content you have finished. The numbers rise automatically whenever you click checklists!
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#becbb1] space-y-3">
                  <h3 className="font-extrabold text-amber-600 text-base">🔔 Help & FAQs</h3>
                  <p className="text-[#3f4a36] font-medium leading-relaxed">
                    If you get lost, just click the <strong>"Learn"</strong> button on the sidebar. It always brings you back to the home map safely!
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: Profile settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div className="pb-3 border-b border-[#becbb1]">
                <h2 className="text-2xl font-black text-[#1a1c1c]">Your Learner Profile Settings</h2>
                <p className="text-xs text-[#3f4a36] font-medium mt-1">Review your score details, manage cloud-sync integrations, and set up your authenticated profile.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Profile Profile details settings */}
                <div className="bg-white rounded-2xl border border-[#becbb1] p-6 space-y-4 h-fit">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#1e5000] mb-2 flex items-center gap-1.5">
                    <span>👤 Identity & Stats</span>
                  </h3>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#3f4a36] mb-1">Your display name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-50 p-3 text-sm rounded-xl border border-[#becbb1] text-[#1a1c1c] font-black focus:outline-none focus:ring-2 focus:ring-[#2b6c00]/30 transition-all font-sans"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">This is your student name shown in the Gold League leaderboard.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#3f4a36] mb-1">Total Points (XP)</label>
                      <div className="bg-[#f9f9f9] p-3 text-sm font-black rounded-xl border border-[#becbb1] text-[#2b6c00]">
                        {xp} XP
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#3f4a36] mb-1">Current daily Streak</label>
                      <div className="bg-[#f9f9f9] p-3 text-sm font-black rounded-xl border border-[#becbb1] text-orange-600">
                        {dayStreak} Days
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                      onClick={() => triggerNotification("🛠️ Settings saved", "Your display name and offline stats are safely locked in.")}
                      className="bg-[#2b6c00] text-white font-extrabold text-sm px-5 py-3 rounded-xl hover:bg-[#1e5000] transition-colors shadow cursor-pointer"
                    >
                      Save Identity Changes
                    </button>
                  </div>
                </div>

                {/* 2. Supabase Auth Integration */}
                <div className="bg-white rounded-2xl border border-[#becbb1] p-6 space-y-4 h-fit">
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#1e5000] mb-2 flex items-center gap-1.5 justify-between">
                    <span>☁️ Supabase Cloud Sync</span>
                    {isSupabaseConfigured && (
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${user ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {user ? 'Cloud Synced' : 'Offline Mode'}
                      </span>
                    )}
                  </h3>

                  {!isSupabaseConfigured ? (
                    <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-4 space-y-3">
                      <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                        🌐 <strong>Local-First Sandbox Mode Enabled</strong>
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                        Your study progress (XP, Streak, Completed Concepts) is backup-saved on this browser's local cache!
                      </p>
                      <p className="text-[11px] text-amber-900 leading-relaxed font-bold font-sans">
                        To activate cloud-sync authentication database backups, deploy to Vercel and supply your environment credentials.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans">
                      {user ? (
                        <div className="space-y-4">
                          <div className="bg-emerald-50 text-emerald-950 rounded-xl p-4 border border-emerald-200 text-xs font-semibold leading-relaxed space-y-1">
                            <p className="text-[13px] font-bold text-emerald-950">✓ Successfully Connected to Cloud</p>
                            <p className="font-medium text-emerald-800">Account Mailbox: <strong className="underline text-emerald-950">{user.email}</strong></p>
                            <p className="font-medium text-emerald-800">Your XP details are live-synced instantly behind the scenes.</p>
                          </div>
                          <button 
                            onClick={handleSignOut}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-3 rounded-xl transition-all border border-slate-300 shadow-sm cursor-pointer"
                          >
                            Disconnect Account & Log Out
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleAuthSubmit} className="space-y-3">
                          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                              type="button"
                              onClick={() => { setAuthMode('login'); setAuthError(null); }}
                              className={`flex-1 text-center py-2 text-xs font-bold rounded-md transition-all ${authMode === 'login' ? 'bg-white text-slate-800 shadow animate-fade-in' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              Log In
                            </button>
                            <button
                              type="button"
                              onClick={() => { setAuthMode('signup'); setAuthError(null); }}
                              className={`flex-1 text-center py-2 text-xs font-bold rounded-md transition-all ${authMode === 'signup' ? 'bg-white text-slate-800 shadow animate-fade-in' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              Sign Up
                            </button>
                          </div>

                          {authError && (
                            <div className="bg-rose-50 text-rose-800 rounded-xl p-3 border border-rose-200 text-[11px] font-extrabold leading-relaxed">
                              {authError}
                            </div>
                          )}

                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                              <input 
                                type="email"
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                placeholder="enter your email..."
                                className="w-full bg-slate-50 p-2.5 text-xs rounded-lg border border-[#becbb1] text-slate-800 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Secure Password</label>
                              <input 
                                type="password"
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                placeholder="******"
                                className="w-full bg-slate-50 p-2.5 text-xs rounded-lg border border-[#becbb1] text-slate-800 focus:outline-none"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={authLoading}
                            className={`w-full text-white font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1 bg-[#2b6c00] hover:bg-[#1e5000] cursor-pointer`}
                          >
                            <span>{authLoading ? 'Authorising...' : authMode === 'signup' ? 'Create Registered Account (+ Merge Sync)' : 'Log In to Cloud Workspace'}</span>
                            {isSyncing && <span>⚡</span>}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* 3. Vercel & Supabase Developer Integration Guide Column Dashboard */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                      <span className="text-lg">⚡</span> Easy Vercel Deployment & Supabase Bootstrap Guide
                    </h3>
                    <p className="text-xs text-slate-500 font-medium font-sans mt-0.5">Learn how to instantly deploy this lightweight, highly optimized PMPrepares app to Vercel static hosting!</p>
                  </div>
                  <span className="text-xs font-black uppercase px-2.5 py-1 bg-slate-900 border border-slate-700 text-white rounded-md shrink-0">100% Vercel Ready</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed font-sans">
                  
                  {/* Step 1: Environment Setup */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                      <span className="bg-slate-900 text-white text-[10px] w-4.5 h-4.5 rounded-full inline-flex items-center justify-center">1</span> Add Vercel Environment Variables
                    </h4>
                    <p className="font-medium text-slate-600 font-sans">
                      When deploying to your Vercel Dashboard, go to <strong>Project Settings &gt; Environment Variables</strong>, and configure:
                    </p>
                    <div className="bg-slate-900 text-slate-100 rounded-lg p-3 font-mono text-[10px] select-all space-y-1 leading-normal">
                      <p className="text-pink-400">VITE_SUPABASE_URL<span className="text-slate-400">="your_project_url"</span></p>
                      <p className="text-pink-400">VITE_SUPABASE_ANON_KEY<span className="text-slate-400">="your_anon_public_key"</span></p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium font-sans">
                      * Vite automatically bundles environment parameters starting with the prefix <code>VITE_</code> directly into output code during asset generation.
                    </p>
                  </div>

                  {/* Step 2: Supabase database setup */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
                        <span className="bg-slate-900 text-white text-[10px] w-4.5 h-4.5 rounded-full inline-flex items-center justify-center">2</span> Generate PostgreSQL Tables
                      </h4>
                      <p className="font-medium text-slate-600 font-sans">
                        Copy and paste the schema trigger code below directly into your Supabase project's <strong>SQL Editor</strong> to configure row-level security (RLS), tables, policies, and links.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_BOOTSTRAP_SQL);
                        setCopySuccess(true);
                        triggerNotification("📋 SQL Copied to Clipboard!", "Run it in Supabase's SQL Editor immediately.");
                        setTimeout(() => setCopySuccess(false), 2500);
                      }}
                      className={`w-full py-3 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${copySuccess ? 'bg-emerald-500 text-white border-emerald-600 shadow' : 'bg-slate-900 hover:bg-black text-white border-slate-800 shadow-sm'}`}
                    >
                      <span>{copySuccess ? '✓ Copied SQL Schema' : '📋 Copy Supabase SQL Bootstrap Code'}</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

        </main>

        {/* Right Gamification Sidebar styled exactly as mockup detail */}
        <aside className="hidden lg:flex flex-col w-[300px] p-6 gap-6 bg-white border-l border-[#becbb1] shrink-0 h-[calc(100vh-69px)] sticky top-[69px] overflow-y-auto">
          
          {/* Stats Grid Bento */}
          <div className="grid grid-cols-2 gap-3">
            
            <div className="bg-white p-4 rounded-xl border border-[#becbb1] hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 text-orange-200 opacity-20 text-5xl">🔥</div>
              <p className="font-bold text-[10px] text-[#3f4a36] mb-1 flex items-center gap-1 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-orange-500" /> Day Streak
              </p>
              <p className="text-2xl font-black text-orange-500">{dayStreak}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#becbb1] hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 text-green-200 opacity-20 text-5xl">⚡</div>
              <p className="font-bold text-[10px] text-[#3f4a36] mb-1 flex items-center gap-1 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#2b6c00]" /> XP Today
              </p>
              <p className="text-2xl font-black text-[#2b6c00]">{xpToday}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#becbb1] hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 text-purple-200 opacity-20 text-5xl">⭐</div>
              <p className="font-bold text-[10px] text-[#3f4a36] mb-1 flex items-center gap-1 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-purple-500" /> Total XP
              </p>
              <p className="text-2xl font-black text-purple-500">{xp.toLocaleString()}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#becbb1] hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 text-yellow-200 opacity-20 text-5xl">🏆</div>
              <p className="font-bold text-[10px] text-[#3f4a36] mb-1 flex items-center gap-1 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#ddad00]" /> League
              </p>
              <p className="text-2xl font-black text-[#ddad00]">Gold</p>
            </div>

          </div>

          {/* Weekly Goal Progress widget */}
          <div className="bg-[#f9f9f9] p-5 rounded-2xl border border-[#becbb1] space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-xs uppercase text-[#1a1c1c]">Weekly Goal</h4>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                {weeklyGoalDays}/5 days complete
              </span>
            </div>
            
            <div className="flex justify-between gap-1 h-3">
              <div className="flex-1 bg-[#2b6c00] rounded-full border border-[#2b6c00]"></div>
              <div className="flex-1 bg-[#2b6c00] rounded-full border border-[#2b6c00]"></div>
              <div className="flex-1 bg-[#2b6c00] rounded-full border border-[#2b6c00]"></div>
              <div className="flex-1 bg-[#2b6c00] rounded-full border border-[#2b6c00]"></div>
              <div className={`flex-1 rounded-full border ${weeklyGoalDays >= 5 ? 'bg-[#2b6c00]' : 'bg-[#eeeeee]'}`}></div>
            </div>

            <p className="text-[11px] text-[#3f4a36] text-center font-bold">
              {weeklyGoalDays >= 5 ? 'Weekly goal achieved! 🥳' : 'Practice today to complete weekly calendar!'}
            </p>
          </div>

          {/* Leaderboard Mini list widget */}
          <div className="bg-[#f9f9f9] rounded-2xl border border-[#becbb1] overflow-hidden space-y-2">
            
            <div className="p-4 flex justify-between items-center border-b border-[#becbb1]/60 bg-slate-50">
              <h4 className="font-extrabold text-[#1a1c1c] text-xs uppercase">Gold League standings</h4>
              <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                This Week
              </span>
            </div>

            <div className="p-2 space-y-1.5">
              
              {/* Leader leaderboard row AM */}
              <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#becbb1]/50">
                <span className="w-4 text-center text-xs font-black text-slate-500">1</span>
                <div className="w-8 h-8 rounded-full bg-[#2b6c00] text-white text-[10px] font-bold flex items-center justify-center">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-[#1a1c1c] truncate">Ananya M.</p>
                  <p className="text-[10px] text-[#3f4a36] font-medium">3,200 XP</p>
                </div>
                <span className="text-amber-500">🏆</span>
              </div>

              {/* Leader leaderboard row Sven */}
              <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#becbb1]/50">
                <span className="w-4 text-center text-xs font-black text-slate-500">2</span>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  SG
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-[#1a1c1c] truncate">Sven G.</p>
                  <p className="text-[10px] text-[#3f4a36] font-medium">2,150 XP</p>
                </div>
                <span className="text-slate-400">🏅</span>
              </div>

              {/* This User dynamically updated row! */}
              <div className="flex items-center gap-3 p-2.5 bg-[#58cc02]/20 rounded-xl border-2 border-[#2b6c00] shadow-sm">
                <span className="w-4 text-center text-xs font-black text-[#1e5000]">
                  {leaderboard.find(u => u.isYou)?.rank || 3}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#2fb8ff] text-white text-[10px] font-extrabold flex items-center justify-center">
                  {userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'Y'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-[#1a1c1c] truncate">{userName}</p>
                  <p className="text-[10px] text-[#2b6c00] font-bold">{xp.toLocaleString()} XP</p>
                </div>
                <span className="text-orange-500">🔥</span>
              </div>

            </div>

            <button 
              onClick={() => setActiveTab('leaderboard')}
              className="w-full text-center py-3 text-[10px] font-extrabold uppercase tracking-wider text-[#2b6c00] hover:bg-[#eeeeee] transition-colors border-t border-[#becbb1]"
            >
              VIEW FULL LEADERBOARD
            </button>

          </div>

        </aside>

      </div>

      {/* Interactive Article Reading Reader Modal Container */}
      {currentReadingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#becbb1] max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
            
            {/* Close handler link */}
            <button 
              onClick={() => {
                setCurrentReadingArticle(null);
                setSelectedQuizOption(null);
                setQuizSubmitted(false);
              }}
              className="absolute top-4 right-4 bg-[#eeeeee] hover:bg-[#e2e2e2] text-[#3f4a36] p-2 rounded-full z-10"
              title="Close modal window"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header info */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] bg-slate-100 text-[#3f4a36] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Article Reading Mode • {currentReadingArticle.readTime}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-[#1a1c1c] tracking-tight">
                {currentReadingArticle.title}
              </h3>
            </div>

            {/* Main content body paragraphs - spacious, high readability layout */}
            <div className="space-y-5 text-slate-800 text-base md:text-[17px] leading-relaxed font-normal py-4 border-t border-b border-slate-100">
              {currentReadingArticle.content.map((p, idx) => {
                if (p.startsWith('### ')) {
                  return <h4 key={idx} className="text-lg font-bold text-[#1a1c1c] pt-2">{p.replace('### ', '')}</h4>;
                }
                return <p key={idx}>{p}</p>;
              })}
            </div>

            {/* Real Article External Link & Completion Actions */}
            <div className="space-y-4 pt-2">
              {currentReadingArticle.externalUrl && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Source</h4>
                    <p className="text-sm font-bold text-slate-800">Learn more by reading the official full article</p>
                  </div>
                  <a 
                    href={currentReadingArticle.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl text-xs sm:text-sm font-extrabold hover:bg-black transition-all inline-flex items-center gap-1.5 shrink-0 self-stretch sm:self-auto justify-center"
                  >
                    <span>Read Full Article Online</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              )}

              {/* Completion claim state */}
              <div className="bg-[#58cc02]/10 p-4 rounded-2xl border border-[#becbb1]/60 space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-[#1e5000] text-xs uppercase tracking-wider flex items-center gap-1">
                    <span>📖 COMPLETED READING?</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium font-sans">
                    Validate your study time for this topic to boost your leaderboard standing!
                  </p>
                </div>
                
                {!completedArticles.includes(currentReadingArticle.id) ? (
                  <button 
                    onClick={() => {
                      setCompletedArticles([...completedArticles, currentReadingArticle.id]);
                      setXp(prev => prev + 15);
                      setXpToday(prev => prev + 15);
                      triggerNotification("📚 Article Completed: +15 XP!", `You finished reading: ${currentReadingArticle.title}`);
                      setCurrentReadingArticle(null);
                    }}
                    className="px-6 py-3 bg-[#2b6c00] hover:bg-[#1e5000] text-white font-extrabold text-sm rounded-xl transition-all shadow shrink-0 self-stretch md:self-auto justify-center flex items-center gap-2 cursor-pointer"
                  >
                    <span>Finish & Claim +15 XP</span>
                    <span>🚀</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-[#2b6c00] font-extrabold text-sm self-stretch md:self-auto justify-center bg-[#58cc02]/20 py-2.5 px-4 rounded-xl border border-[#becbb1]">
                    <Check className="w-4 h-4" />
                    <span>Completed Article (+15 XP)</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Video summary Watcher Modal */}
      {currentWatchingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl border border-[#becbb1] max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            
            <button 
              onClick={() => setCurrentWatchingVideo(null)}
              className="absolute top-4 right-4 bg-[#eeeeee] hover:bg-[#e2e2e2] text-[#3f4a36] p-2 rounded-full"
              title="Close watcher widget"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] bg-red-100 text-red-600 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Watching Interactive Video Summary
            </span>

            <h3 className="text-lg font-black text-[#1a1c1c]">
              {currentWatchingVideo.title}
            </h3>

            {/* Video preview or working YouTube player */}
            <div className="aspect-video rounded-2xl overflow-hidden relative bg-black shadow-inner">
              {currentWatchingVideo.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentWatchingVideo.youtubeId}?autoplay=1&rel=0`}
                  title={currentWatchingVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img 
                    src={currentWatchingVideo.imageUrl}
                    alt={currentWatchingVideo.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    {/* Mock video content playing representation */}
                    <div className="z-10 bg-black/60 px-4 py-2.5 rounded-xl border border-white/20 self-center text-center mt-auto">
                      <span className="text-xs font-bold block">📽️ VIDEO SUMMARY TIMELINE</span>
                      <span className="text-[10px] font-medium text-slate-300">00:00 / {currentWatchingVideo.duration} mins watch time</span>
                    </div>

                    {/* Timeline duration tracker simulator */}
                    <div className="z-10 mt-auto pt-4 space-y-2">
                      <div className="h-1.5 w-full bg-slate-600 rounded-full relative overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1/3 bg-red-600 rounded-full"></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
                        <span>PLAY / PAUSE</span>
                        <span>{currentWatchingVideo.duration} mins left</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Custom summaries strictly matching what's readable */}
            <div className="bg-[#f9f9f9] p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-black text-[#006590] uppercase block">High Points discussed:</span>
              <p className="text-xs text-[#3f4a36] font-semibold mt-1 leading-relaxed">
                {currentWatchingVideo.summary}
              </p>
            </div>

            <button 
              onClick={() => handleCompleteVideo(currentWatchingVideo)}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-md active:translate-y-0.5"
            >
              Complete Watching (+20 XP!)
            </button>

          </div>
        </div>
      )}

      {/* Interactive Celebration XP award replaced with bottom-right notification */}
      {showXpClaimedToast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-white text-[#1a1c1c] p-4 rounded-xl shadow-2xl border-l-4 border-[#2b6c00] max-w-sm flex items-start gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 flex items-center justify-center text-[#2b6c00] shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1a1c1c]">xp claimed</h4>
            <p className="text-[10px] text-[#3f4a36] font-medium">+30 Practice bonus points added</p>
          </div>
        </div>
      )}

      {/* Mobile Navigation Sticking Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#becbb1] flex justify-around items-center py-2 px-4 z-40 shadow-lg">
        
        <button 
          onClick={() => { setActiveTab('learn'); setSearchText(''); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'learn' ? 'text-[#2b6c00] font-bold' : 'text-[#3f4a36]'}`}
        >
          <BookOpen className="w-5.5 h-5.5" />
          <span className="text-[10px]">Learn</span>
        </button>

        <button 
          onClick={() => { setActiveTab('path'); setSearchText(''); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'path' ? 'text-[#2b6c00] font-bold' : 'text-[#3f4a36]'}`}
        >
          <Map className="w-5.5 h-5.5" />
          <span className="text-[10px]">Active</span>
        </button>

        <button 
          onClick={() => { setActiveTab('lessons'); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'lessons' ? 'text-[#2b6c00] font-bold' : 'text-[#3f4a36]'}`}
        >
          <Search className="w-5.5 h-5.5" />
          <span className="text-[10px]">Search</span>
        </button>

        <button 
          onClick={() => { setActiveTab('leaderboard'); setSearchText(''); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'leaderboard' ? 'text-[#2b6c00] font-bold' : 'text-[#3f4a36]'}`}
        >
          <Trophy className="w-5.5 h-5.5" />
          <span className="text-[10px]">League</span>
        </button>

        <button 
          onClick={() => { setActiveTab('community'); setSearchText(''); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'community' ? 'text-[#2b6c00] font-bold' : 'text-[#3f4a36]'}`}
        >
          <Users className="w-5.5 h-5.5" />
          <span className="text-[10px]">Chat</span>
        </button>

      </nav>

      {/* Mobile Add Post button floating */}
      {activeTab === 'community' && (
        <button 
          onClick={() => {
            const txt = prompt("Type your forum comment/question here to share with other beginners:");
            if (txt && txt.trim()) {
              setNewPostText(txt);
              triggerNotification("💬 Prepared!", "Click the 'Post Question' button in form to upload completed thread.");
            }
          }}
          className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-[#2b6c00] text-white rounded-full flex items-center justify-center shadow-2xl z-40 active:scale-90 transition-transform font-bold"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      )}

    </div>
  );
}
