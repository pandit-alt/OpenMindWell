import config from '../config';

interface EmotionScore {
  label: string;
  score: number;
}

interface HuggingFaceResponse {
  label: string;
  score: number;
}

interface CrisisDetectionResult {
  isCrisis: boolean;
  riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  detectedEmotions?: string[];
  triggeredKeywords?: string[];
  confidence: number;
}

// Crisis keywords categorized by severity
const CRISIS_KEYWORDS = {
  critical: [
    'suicide',
    'kill myself',
    'end my life',
    'want to die',
    'better off dead',
    'no reason to live',
    'goodbye world',
    'final goodbye',
  ],
  high: [
    'self harm',
    'cut myself',
    'hurt myself',
    'overdose',
    'jump off',
    'hang myself',
    'planning to',
    'going to hurt',
  ],
  medium: [
    'hopeless',
    'worthless',
    'cant go on',
    'no point',
    'give up',
    'ending it',
    'rather be dead',
    'disappear forever',
  ],
  low: [
    'depressed',
    'anxious',
    'scared',
    'alone',
    'struggling',
    'hard time',
    'overwhelming',
    'cant cope',
  ],
};

// High-risk emotions from the AI model
const HIGH_RISK_EMOTIONS = ['sadness', 'fear', 'anger'];
const MEDIUM_RISK_EMOTIONS = ['disgust', 'surprise'];

/**
 * Analyze message using HuggingFace emotion detection model
 */
async function analyzeWithHuggingFace(
  message: string
): Promise<EmotionScore[] | null> {
  const apiToken = config.huggingface.apiToken;

  if (!apiToken) {
    console.warn('HuggingFace API token not configured, using keyword fallback');
    return null;
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-emotion',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: message }),
      }
    );

    if (!response.ok) {
      console.error('HuggingFace API error:', response.statusText);
      return null;
    }

    const result: HuggingFaceResponse[][] = await response.json();
    return result[0] || null;
  } catch (error) {
    console.error('Error calling HuggingFace API:', error);
    return null;
  }
}

/**
 * Analyze message using keyword matching (fallback)
 */
function analyzeWithKeywords(message: string): CrisisDetectionResult {
  const lowerMessage = message.toLowerCase();
  const triggeredKeywords: string[] = [];
  let highestRiskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';

  // Check critical keywords
  for (const keyword of CRISIS_KEYWORDS.critical) {
    if (lowerMessage.includes(keyword)) {
      triggeredKeywords.push(keyword);
      highestRiskLevel = 'critical';
    }
  }

  // Check high-risk keywords
  if (highestRiskLevel !== 'critical') {
    for (const keyword of CRISIS_KEYWORDS.high) {
      if (lowerMessage.includes(keyword)) {
        triggeredKeywords.push(keyword);
        if (highestRiskLevel !== 'high') {
          highestRiskLevel = 'high';
        }
      }
    }
  }

  // Check medium-risk keywords
  if (highestRiskLevel === 'none' || highestRiskLevel === 'low') {
    for (const keyword of CRISIS_KEYWORDS.medium) {
      if (lowerMessage.includes(keyword)) {
        triggeredKeywords.push(keyword);
        if (highestRiskLevel !== 'medium' && highestRiskLevel !== 'high') {
          highestRiskLevel = 'medium';
        }
      }
    }
  }

  // Check low-risk keywords
  if (highestRiskLevel === 'none') {
    for (const keyword of CRISIS_KEYWORDS.low) {
      if (lowerMessage.includes(keyword)) {
        triggeredKeywords.push(keyword);
        highestRiskLevel = 'low';
      }
    }
  }

  return {
    isCrisis: highestRiskLevel !== 'none',
    riskLevel: highestRiskLevel,
    triggeredKeywords,
    confidence: triggeredKeywords.length > 0 ? 0.7 : 0.0,
  };
}

/**
 * Main crisis detection function
 */
export async function detectCrisis(
  message: string
): Promise<CrisisDetectionResult> {
  // First, try HuggingFace AI analysis
  const emotions = await analyzeWithHuggingFace(message);

  if (emotions && emotions.length > 0) {
    // Analyze emotion scores
    const detectedEmotions = emotions.map((e) => e.label);
    let riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';
    let maxScore = 0;

    for (const emotion of emotions) {
      if (emotion.score > maxScore) {
        maxScore = emotion.score;
      }

      if (HIGH_RISK_EMOTIONS.includes(emotion.label) && emotion.score > 0.5) {
        riskLevel = emotion.score > 0.7 ? 'high' : 'medium';
      } else if (
        MEDIUM_RISK_EMOTIONS.includes(emotion.label) &&
        emotion.score > 0.6
      ) {
        if (riskLevel === 'none') {
          riskLevel = 'low';
        }
      }
    }

    // Also run keyword analysis and take the higher risk level
    const keywordResult = analyzeWithKeywords(message);
    const riskLevels = ['none', 'low', 'medium', 'high', 'critical'];
    const aiRiskIndex = riskLevels.indexOf(riskLevel);
    const keywordRiskIndex = riskLevels.indexOf(keywordResult.riskLevel);

    if (keywordRiskIndex > aiRiskIndex) {
      riskLevel = keywordResult.riskLevel;
    }

    return {
      isCrisis: riskLevel !== 'none',
      riskLevel,
      detectedEmotions,
      triggeredKeywords: keywordResult.triggeredKeywords,
      confidence: maxScore,
    };
  }

  // Fallback to keyword analysis
  return analyzeWithKeywords(message);
}

/**
 * Get crisis resources message based on risk level
 */
export function getCrisisResourcesMessage(
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
): string {
  const baseMessage =
    '🆘 **Crisis Resources** 🆘\n\n' +
    '**If you are in immediate danger, please call emergency services (911/112/999).**\n\n';

  const resources =
    '**24/7 Crisis Hotlines:**\n' +
    '• US: Call/Text **988** (Suicide & Crisis Lifeline)\n' +
    '• US: Text **HOME** to **741741** (Crisis Text Line)\n' +
    '• International: **findahelpline.com**\n\n' +
    '**You are not alone. Help is available.**';

  if (riskLevel === 'critical' || riskLevel === 'high') {
    return (
      baseMessage +
      '⚠️ **This message may indicate a mental health crisis.** ⚠️\n\n' +
      'Please reach out to a crisis professional immediately:\n\n' +
      resources
    );
  } else if (riskLevel === 'medium') {
    return (
      baseMessage +
      'If you\'re struggling, consider reaching out:\n\n' +
      resources
    );
  } else {
    return (
      '💙 **Support Resources** 💙\n\n' +
      'If you need support, here are some resources:\n\n' +
      resources
    );
  }
}
