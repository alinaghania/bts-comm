'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Shuffle, Trophy, Clock, RotateCcw, ChevronRight, Check, X, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import QuizQuestion from '@/components/QuizQuestion';
import CountdownTimer from '@/components/CountdownTimer';
import OpusHelper from '@/components/OpusHelper';
import DidYouKnow from '@/components/DidYouKnow';
import PageGuide from '@/components/PageGuide';

const funFacts = [
  'Le premier slogan publicitaire date de 1859 : "It\'s finger lickin\' good" n\'existait pas encore, mais les marques commencaient deja a communiquer !',
  'En moyenne, un Francais est expose a plus de 1 200 messages publicitaires par jour. Ton cerveau en filtre 99% inconsciemment.',
  'Le logo Nike "Swoosh" a ete cree en 1971 par une etudiante en graphisme pour seulement 35 dollars.',
  'Le mot "communication" vient du latin "communicare" qui signifie "mettre en commun". C\'est l\'essence meme du metier !',
  'La premiere publicite televisee en France a ete diffusee le 1er octobre 1968 pour la marque Boursin.',
];

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  module: string;
}

const questionBank: Question[] = [
  {
    question: 'Quel modele de communication introduit la notion de "bruit" ?',
    options: ['Le modele de Jakobson', 'Le modele de Shannon et Weaver', 'Le modele de Lasswell', 'Le modele de Palo Alto'],
    correctIndex: 1,
    explanation: 'Le modele de Shannon et Weaver (1949) est le premier modele mathematique de la communication. Il introduit la notion de bruit comme perturbation du signal.',
    module: 'Theories de la communication',
  },
  {
    question: 'Quelle fonction du langage selon Jakobson vise a maintenir le contact ?',
    options: ['Fonction conative', 'Fonction phatique', 'Fonction referentielle', 'Fonction metalinguistique'],
    correctIndex: 1,
    explanation: 'La fonction phatique (liee au canal) sert a etablir, maintenir ou interrompre le contact. Ex: "Allo ?", "Tu m\'ecoutes ?"',
    module: 'Theories de la communication',
  },
  {
    question: 'Dans l\'analyse SWOT, le "O" represente :',
    options: ['Les objectifs', 'Les opportunites', 'Les obligations', 'L\'organisation'],
    correctIndex: 1,
    explanation: 'SWOT = Strengths (Forces), Weaknesses (Faiblesses), Opportunities (Opportunites), Threats (Menaces). C\'est un outil d\'analyse strategique.',
    module: 'Strategie de communication',
  },
  {
    question: 'Quel est l\'objectif cognitif en communication ?',
    options: ['Faire agir', 'Faire aimer', 'Faire connaitre', 'Faire acheter'],
    correctIndex: 2,
    explanation: 'L\'objectif cognitif vise a faire connaitre (notoriete). L\'affectif vise a faire aimer (image) et le conatif a faire agir (comportement).',
    module: 'Objectifs de communication',
  },
  {
    question: 'Qui a dit "On ne peut pas ne pas communiquer" ?',
    options: ['Jakobson', 'Shannon', 'Watzlawick', 'Barthes'],
    correctIndex: 2,
    explanation: 'C\'est un axiome fondamental de l\'Ecole de Palo Alto, enonce par Paul Watzlawick. Meme le silence est une forme de communication.',
    module: 'Theories de la communication',
  },
  {
    question: 'Roland Barthes distingue dans l\'image publicitaire :',
    options: ['2 niveaux de lecture', '3 niveaux de lecture', '4 niveaux de lecture', '5 niveaux de lecture'],
    correctIndex: 1,
    explanation: 'Barthes identifie 3 messages : le message linguistique, le message iconique code (denote) et le message iconique non-code (connote).',
    module: 'Semiotique',
  },
  {
    question: 'Qu\'est-ce que la notion de "coeur de cible" ?',
    options: ['L\'ensemble des consommateurs', 'Le segment le plus large', 'Le segment prioritaire a atteindre', 'Les prescripteurs'],
    correctIndex: 2,
    explanation: 'Le coeur de cible est le segment de population prioritaire, sur lequel l\'effort de communication sera le plus concentre.',
    module: 'Strategie de communication',
  },
  {
    question: 'Le brief creatif est :',
    options: [
      'Un document comptable',
      'Un document de synthese pour l\'equipe creative',
      'Un rapport d\'activite',
      'Un contrat avec le client',
    ],
    correctIndex: 1,
    explanation: 'Le brief creatif resume la problematique, les objectifs, la cible, le message cle, le ton et les contraintes pour guider la creation.',
    module: 'Production',
  },
  {
    question: 'L\'agenda-setting designe :',
    options: [
      'L\'agenda du journaliste',
      'La capacite des medias a influencer ce a quoi le public pense',
      'Le planning des publications',
      'La gestion du temps mediatique',
    ],
    correctIndex: 1,
    explanation: 'La theorie de l\'agenda-setting (McCombs & Shaw, 1972) montre que les medias determinent les sujets auxquels le public prete attention.',
    module: 'Sociologie des medias',
  },
  {
    question: 'Quel moyen de persuasion d\'Aristote correspond a la credibilite de l\'orateur ?',
    options: ['Pathos', 'Logos', 'Ethos', 'Kairos'],
    correctIndex: 2,
    explanation: 'L\'ethos est la credibilite/autorite de l\'orateur. Le pathos concerne l\'emotion, le logos la logique du discours.',
    module: 'Argumentation',
  },
];

type Phase = 'config' | 'quiz' | 'results';

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('config');
  const [numQuestions, setNumQuestions] = useState(5);
  const [interleaving, setInterleaving] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  const startQuiz = useCallback(() => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, numQuestions));
    setCurrentQ(0);
    setAnswers([]);
    setXpEarned(0);
    setPhase('quiz');
  }, [numQuestions]);

  const handleAnswer = useCallback((correct: boolean) => {
    setAnswers((prev) => [...prev, correct]);
    if (correct) setXpEarned((prev) => prev + 10);
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setPhase('results');
    }
  }, [currentQ, questions.length]);

  const score = answers.filter(Boolean).length;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Quiz</h1>
        <p className="text-text-muted mt-1">Teste tes connaissances</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* CONFIG PHASE */}
        {phase === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-text-muted" />
                <h2 className="text-lg font-semibold">Configuration</h2>
              </div>

              {/* Number of questions */}
              <div>
                <label className="text-sm text-text-muted block mb-3">Nombre de questions</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNumQuestions(n)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        numQuestions === n
                          ? 'bg-primary text-white'
                          : 'bg-bg-hover text-text-muted hover:text-text'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interleaving toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-text-muted" />
                  <div>
                    <p className="text-sm font-medium">Mode Entrelacement</p>
                    <p className="text-xs text-text-muted">Melange les modules pour un meilleur apprentissage</p>
                  </div>
                </div>
                <button
                  onClick={() => setInterleaving(!interleaving)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${
                    interleaving ? 'bg-primary' : 'bg-bg-hover'
                  }`}
                >
                  <motion.div
                    animate={{ x: interleaving ? 20 : 2 }}
                    className="absolute top-1 w-5 h-5 rounded-full bg-white"
                  />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startQuiz}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg"
            >
              Commencer le quiz
            </motion.button>
          </motion.div>
        )}

        {/* QUIZ PHASE */}
        {phase === 'quiz' && questions[currentQ] && (
          <motion.div
            key={`quiz-${currentQ}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {/* Progress & Timer */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted">Question {currentQ + 1}/{questions.length}</span>
                  <span className="text-xs text-text-muted">{questions[currentQ].module}</span>
                </div>
                <div className="h-1.5 bg-bg-hover rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <QuizQuestion
                question={questions[currentQ].question}
                options={questions[currentQ].options}
                correctIndex={questions[currentQ].correctIndex}
                explanation={questions[currentQ].explanation}
                onAnswer={handleAnswer}
              />
            </div>

            {/* Opus Helper (appears when answered) */}
            {answers.length > currentQ && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <OpusHelper
                  context={`Question: ${questions[currentQ].question}\nOptions: ${questions[currentQ].options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join(', ')}\nBonne reponse: ${questions[currentQ].options[questions[currentQ].correctIndex]}\nExplication du cours: ${questions[currentQ].explanation}\nL'etudiant a ${answers[currentQ] ? 'bien repondu' : 'mal repondu'}.`}
                  type="question"
                />
              </motion.div>
            )}

            {/* Fun fact between questions */}
            {answers.length > currentQ && currentQ < questions.length - 1 && currentQ % 3 === 1 && (
              <DidYouKnow fact={funFacts[currentQ % funFacts.length]} />
            )}

            {/* Next button (appears when answered) */}
            {answers.length > currentQ && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextQuestion}
                className="w-full py-3 rounded-xl bg-bg-card border border-white/10 text-sm font-medium hover:bg-bg-hover transition-colors flex items-center justify-center gap-2"
              >
                {currentQ < questions.length - 1 ? 'Question suivante' : 'Voir les resultats'}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* RESULTS PHASE */}
        {phase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Trophy className={`w-16 h-16 mx-auto mb-4 ${score >= questions.length * 0.7 ? 'text-warning' : 'text-text-muted'}`} />
              </motion.div>
              <h2 className="text-2xl font-bold">{score}/{questions.length}</h2>
              <p className="text-text-muted mt-1">
                {score >= questions.length * 0.8
                  ? 'Excellent ! Tu maitrises bien le sujet !'
                  : score >= questions.length * 0.5
                  ? 'Pas mal ! Continue a reviser pour t\'ameliorer.'
                  : 'Il faut reviser davantage. Ne lache pas !'}
              </p>

              <div className="flex justify-center gap-6 mt-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">+{xpEarned}</p>
                  <p className="text-xs text-text-muted">XP gagnes</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{Math.round((score / questions.length) * 100)}%</p>
                  <p className="text-xs text-text-muted">Precision</p>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text-muted">Resume des reponses</h3>
              {questions.map((q, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    answers[i] ? 'bg-success/5 border-success/20' : 'bg-danger/5 border-danger/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-sm font-bold ${answers[i] ? 'text-success' : 'text-danger'}`}>
                      {answers[i] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{q.question}</p>
                      <p className="text-xs text-text-muted mt-1">
                        Reponse : {q.options[q.correctIndex]}
                      </p>
                    </div>
                    <OpusHelper
                      context={`Question: ${q.question}\nOptions: ${q.options.map((o, j) => `${String.fromCharCode(65 + j)}) ${o}`).join(', ')}\nBonne reponse: ${q.options[q.correctIndex]}\nExplication: ${q.explanation}`}
                      type="question"
                      compact
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase('config')}
                className="w-full py-3 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Nouveau quiz
              </motion.button>

              <Link
                href="/bilan"
                className="w-full py-3 rounded-xl bg-bg-card border border-white/10 text-text font-medium flex items-center justify-center gap-2 hover:bg-bg-hover transition-colors"
              >
                <ClipboardCheck className="w-4 h-4" /> Bilan du jour
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageGuide page="quiz" />
    </div>
  );
}
