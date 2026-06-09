/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xpValue: number;
  completed: boolean;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string; // 'primary' or 'secondary' etc
  lessons: Lesson[];
}

export interface Video {
  id: string;
  moduleId?: string;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  author: string;
  summary: string;
  youtubeId?: string;
}

export interface Article {
  id: string;
  moduleId?: string;
  title: string;
  description: string;
  readTime: string;
  icon: string;
  content: string[];
  externalUrl?: string;
  quiz?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  initials: string;
  xp: number;
  isYou?: boolean;
}
