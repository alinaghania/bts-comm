'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenLine, Search, FileText, RotateCcw, ChevronRight, ArrowLeft, Clock, Bot, Loader2 } from 'lucide-react';
import PageGuide from '@/components/PageGuide';

type Mode = 'select' | 'reperage' | 'analyse' | 'redaction';
type SubStep = 'consigne' | 'work' | 'correction';

const CORPUS_EXERCISES = [
  {
    id: 'corpus-1',
    title: 'La communication a l\'ere du numerique',
    text: `La communication numerique a profondement modifie les rapports entre les marques et leurs publics. Desormais, chaque consommateur peut devenir emetteur, commentateur, voire prescripteur. Les reseaux sociaux ont inverse le rapport de force : la marque ne controle plus son image, elle la negocie en permanence avec ses communautes.

Cependant, cette horizontalite apparente masque de nouvelles formes de controle. Les algorithmes decident de la visibilite des messages. Le ciblage publicitaire, de plus en plus precis grace aux donnees personnelles, souleve des questions ethiques majeures. Comme le souligne Dominique Wolton, "communiquer, ce n'est pas la meme chose qu'informer" : la profusion d'informations ne garantit ni la comprehension ni le dialogue.

Par ailleurs, certaines marques ont su transformer cette contrainte en opportunite. La strategie de Burger King sur Twitter, fondee sur l'humour et la provocation, montre qu'une communication authentique et reactive peut creer un lien plus fort que n'importe quelle campagne traditionnelle.`,
    expected: {
      these: 'Le numerique a inverse le rapport de force entre marques et consommateurs',
      nuance: 'Cette horizontalite masque de nouvelles formes de controle (algorithmes, ciblage)',
      opposition: 'Profusion d\'information vs comprehension et dialogue (Wolton)',
      motscles: 'horizontalite, controle, algorithmes, authentique, reactive',
      lien_comm: 'Passage d\'une communication verticale (marque -> public) a une communication horizontale et negociee',
    },
  },
  {
    id: 'corpus-2',
    title: 'L\'exces dans la publicite',
    text: `La publicite contemporaine cultive l'exces comme strategie. L'hyperbole est devenue la figure reine du discours publicitaire : "le meilleur", "l'unique", "le plus puissant". Cette surenchere verbale et visuelle repond a une logique de saturation mediatique — dans un environnement ou le consommateur est expose a plusieurs milliers de messages par jour, seul l'exces semble encore capable de capter l'attention.

Pourtant, cette course a l'exageration produit ses propres limites. Le phenomene de "banner blindness" montre que les consommateurs developpent des mecanismes d'evitement face a la publicite excessive. Plus troublant encore, l'exces peut se retourner contre l'annonceur : le greenwashing, forme d'exces dans la promesse environnementale, a suscite une defiance durable chez les consommateurs les plus informes.

A l'inverse, des marques comme Patagonia ont fait de la sobriete leur positionnement : "N'achetez pas cette veste" reste l'une des campagnes les plus memorables de la decennie, precisement parce qu'elle prenait le contre-pied de l'exces ambiant.`,
    expected: {
      these: 'La publicite utilise l\'exces (hyperbole) pour capter l\'attention dans un environnement sature',
      nuance: 'L\'exces produit ses propres limites : evitement (banner blindness), defiance (greenwashing)',
      opposition: 'Exces vs sobriete — Patagonia prend le contre-pied avec succes',
      motscles: 'hyperbole, saturation, exces, sobriete, greenwashing, banner blindness',
      lien_comm: 'La strategie de communication oscille entre surenchere et authenticite — la sobriete peut etre plus efficace que l\'exces',
    },
  },
];

const CAMPAGNE_EXERCISES = [
  {
    id: 'campagne-1',
    title: 'Dove — "Real Beauty" (2004-present)',
    brief: 'Dove lance "Real Beauty" : des femmes ordinaires, non retouchees, remplacent les mannequins dans les publicites.',
    analyse_attendue: `Positionnement : beaute inclusive, anti-standards irealistes.
Procedes visuels : photos non retouchees, femmes de morphologies/ages/ethnies differentes, fond neutre (authenticite).
Procedes redactionnels : "Vous etes plus belles que vous ne le croyez" — fonction emotive (Jakobson), adresse directe au recepteur (conative).
References : Baudrillard (on consomme des signes — ici Dove vend le signe de l'authenticite), Lipovetsky (l'individu hypermoderne en quete d'authenticite).
Cible : femmes 25-55 ans, lassees des standards de beaute irealistes.
Efficacite : campagne devenue un cas d'ecole, +700% de ventes en 10 ans.`,
  },
  {
    id: 'campagne-2',
    title: 'Apple — "Think Different" (1997)',
    brief: 'Apple en crise lance "Think Different" : portraits de genies (Einstein, Gandhi, Lennon) avec le slogan "Think Different".',
    analyse_attendue: `Positionnement : marque rebelle, creatrice, pour ceux qui pensent autrement.
Procedes visuels : portraits N&B iconiques, logo Apple en couleur (seul element colore = la marque).
Procedes redactionnels : "Think Different" — injonction (fonction conative), tournure grammaticalement incorrecte volontaire (Different au lieu de Differently) pour marquer la transgression.
Figures de rhetorique : anaphore dans le manifeste ("Here's to the crazy ones"), accumulation, hyperbole.
References : McLuhan (le medium est le message — le format pub deviant un manifeste), Bourdieu (distinction culturelle — Apple cible les "different thinkers").
Cible : createurs, artistes, early adopters, CSP+.
Efficacite : relance d'Apple, construction d'une marque-culture.`,
  },
];

const REDACTION_EXERCISES = [
  {
    id: 'redaction-1',
    title: 'Post Instagram pour un restaurant bio',
    brief: `Annonceur : "La Table Verte", restaurant bio et local a Paris (15e).
Cible : urbains 25-40 ans, sensibles a l'alimentation responsable.
Objectif : promouvoir le nouveau menu de saison (printemps 2026).
Contrainte : 1 post Instagram (visuel + texte de 150 mots max).
Ton : chaleureux, authentique, un peu poetique.`,
    criteres: [
      'Adequation avec la cible (urbains eco-conscients)',
      'Ton chaleureux et authentique (pas corporate)',
      'Mise en valeur du menu de saison',
      'Appel a l\'action clair',
      'Format adapte a Instagram (hashtags, structure)',
    ],
  },
  {
    id: 'redaction-2',
    title: 'Communique de presse — Lancement produit',
    brief: `Annonceur : "Lumea", marque de cosmetiques naturels.
Evenement : lancement de "Lumea Solaire", une creme solaire 100% minerale, biodegradable.
Cible du CP : journalistes beaute/lifestyle.
Informations cles : SPF 50, sans nanoparticules, packaging en plastique oceanique recycle, disponible en pharmacie des juin 2026, prix 24,90 euros.
Ton : professionnel, factuel, avec un angle RSE.`,
    criteres: [
      'Structure classique du CP (titre, chapeau, corps, boilerplate)',
      'Informations cles presentes (produit, prix, distribution, date)',
      'Angle RSE mis en valeur sans greenwashing',
      'Ton adapte aux journalistes (factuel, pas publicitaire)',
      'Citation du dirigeant integree',
    ],
  },
];

export default function EcriturePage() {
  const [mode, setMode] = useState<Mode>('select');
  const [subStep, setSubStep] = useState<SubStep>('consigne');
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correction, setCorrection] = useState('');
  const [loadingCorrection, setLoadingCorrection] = useState(false);

  const requestCorrection = async (prompt: string) => {
    setLoadingCorrection(true);
    setSubStep('correction');
    try {
      const userId = localStorage.getItem('bts-user-id') || '';
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          context: 'course_help',
        }),
      });
      if (res.ok) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            setCorrection(result);
          }
        }
        if (!result) setCorrection(await res.text());
      } else {
        setCorrection('Erreur de connexion. Verifie que l\'API Azure est configuree.');
      }
    } catch {
      setCorrection('Erreur de connexion.');
    } finally {
      setLoadingCorrection(false);
    }
  };

  const handleSubmitReperage = () => {
    const ex = CORPUS_EXERCISES[exerciseIdx];
    const prompt = `L'etudiante devait reperer les positions dans ce corpus :

"${ex.text}"

Voici sa reponse :
"${userAnswer}"

Voici ce qui etait attendu :
- These : ${ex.expected.these}
- Nuance : ${ex.expected.nuance}
- Opposition : ${ex.expected.opposition}
- Mots-cles : ${ex.expected.motscles}
- Lien avec la communication : ${ex.expected.lien_comm}

Corrige sa reponse point par point. Pour chaque element :
- "Bien vu" si correct
- "Incomplet" si partiellement correct (dis ce qui manque)
- "Hors sujet" si incorrect
- "Non identifie" si absent

Termine par un modele de bonne reponse en 5 lignes. Sois exigeante mais bienveillante.`;
    requestCorrection(prompt);
  };

  const handleSubmitAnalyse = () => {
    const ex = CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length];
    const prompt = `L'etudiante devait analyser cette campagne :
"${ex.title}" — ${ex.brief}

Voici sa reponse :
"${userAnswer}"

Voici une analyse de reference :
${ex.analyse_attendue}

Corrige sa reponse. Indique :
1. Ce qui est bien identifie
2. Ce qui manque (procedes visuels ? redactionnels ? references ? cible ?)
3. Ce qui est imprecis ou hors sujet
4. Un modele de bonne analyse en 6 lignes

Sois precise. Cite des elements de sa copie.`;
    requestCorrection(prompt);
  };

  const handleSubmitRedaction = () => {
    const ex = REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length];
    const prompt = `L'etudiante devait rediger un message de communication a partir de ce brief :
${ex.brief}

Criteres d'evaluation :
${ex.criteres.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Voici sa production :
"${userAnswer}"

Evalue chaque critere sur 5. Ne dis JAMAIS "c'est bien mais tu peux approfondir". Dis :
- "tu as decrit au lieu de proposer"
- "ton ton est trop scolaire"
- "ta justification manque de reference au brief"
- "ton message ne s'adresse pas a la cible definie"

Donne un exemple de message modele a la fin.`;
    requestCorrection(prompt);
  };

  const reset = () => {
    setSubStep('consigne');
    setUserAnswer('');
    setCorrection('');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {mode !== 'select' && (
          <button onClick={() => { setMode('select'); reset(); }} className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text mb-4">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <PenLine className="w-7 h-7 text-primary" />
          Laboratoire d&apos;ecriture E1
        </h1>
        <p className="text-text-muted mt-1">3 modes pour progresser : reperer, analyser, rediger</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {mode === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4">
            {[
              { id: 'reperage' as Mode, icon: Search, title: 'Mode Reperage', desc: 'Identifie les positions dans un corpus (these, nuance, opposition)', time: '10-15 min', color: 'from-primary to-purple-700' },
              { id: 'analyse' as Mode, icon: FileText, title: 'Mode Analyse de campagne', desc: 'Decrypte les procedes d\'une campagne pub reelle', time: '15-20 min', color: 'from-secondary to-blue-700' },
              { id: 'redaction' as Mode, icon: PenLine, title: 'Mode Redaction', desc: 'Concois et redige un message a partir d\'un brief', time: '15-25 min', color: 'from-emerald-500 to-teal-700' },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => { setMode(m.id); reset(); setExerciseIdx(Math.floor(Math.random() * 2)); }}
                  className="p-6 rounded-2xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{m.title}</h3>
                      <p className="text-sm text-text-muted mt-1">{m.desc}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs text-text-muted">
                        <Clock className="w-3 h-3" /> {m.time}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors mt-1" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {mode === 'reperage' && (
          <motion.div key="reperage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Corpus : {CORPUS_EXERCISES[exerciseIdx]?.title}</h2>
              <div className="bg-bg-hover/50 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap">
                {CORPUS_EXERCISES[exerciseIdx]?.text}
              </div>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-primary">Consigne</h3>
                <p className="text-sm">Identifie dans ce corpus :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>1. La these principale</li>
                  <li>2. La nuance apportee</li>
                  <li>3. L&apos;opposition ou le contre-argument</li>
                  <li>4. Les mots-cles recurrents</li>
                  <li>5. Le lien avec la communication</li>
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="These principale : ...&#10;Nuance : ...&#10;Opposition : ...&#10;Mots-cles : ...&#10;Lien avec la communication : ..."
                  className="w-full h-56 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={handleSubmitReperage}
                  disabled={userAnswer.length < 30}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx((exerciseIdx + 1) % CORPUS_EXERCISES.length); }} className="flex-1 py-3 rounded-xl bg-primary/10 text-primary text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'analyse' && (
          <motion.div key="analyse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-2">{CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length]?.title}</h2>
              <p className="text-sm text-text-muted">{CAMPAGNE_EXERCISES[exerciseIdx % CAMPAGNE_EXERCISES.length]?.brief}</p>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-secondary">Consigne</h3>
                <p className="text-sm">Analyse cette campagne en identifiant :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  <li>1. Le positionnement de la marque</li>
                  <li>2. Les procedes visuels</li>
                  <li>3. Les procedes redactionnels (figures de style, ton)</li>
                  <li>4. Les references culturelles mobilisees</li>
                  <li>5. La cible et comment elle est interpellee</li>
                  <li>6. L&apos;efficacite globale</li>
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-secondary text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Positionnement : ...&#10;Procedes visuels : ...&#10;Procedes redactionnels : ...&#10;References culturelles : ...&#10;Cible : ...&#10;Efficacite : ..."
                  className="w-full h-64 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-secondary/50"
                />
                <button
                  onClick={handleSubmitAnalyse}
                  disabled={userAnswer.length < 50}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-secondary to-blue-700 text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx(exerciseIdx + 1); }} className="flex-1 py-3 rounded-xl bg-secondary/10 text-secondary text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {mode === 'redaction' && (
          <motion.div key="redaction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="font-semibold mb-2">{REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.title}</h2>
              <div className="text-sm text-text-muted whitespace-pre-wrap mt-3">
                {REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.brief}
              </div>
            </div>

            {subStep === 'consigne' && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-semibold text-emerald-400">Consigne</h3>
                <p className="text-sm">Redige le message de communication demande dans le brief. Tu seras evaluee sur :</p>
                <ul className="text-sm space-y-1 text-text-muted">
                  {REDACTION_EXERCISES[exerciseIdx % REDACTION_EXERCISES.length]?.criteres.map((c, i) => (
                    <li key={i}>{i + 1}. {c}</li>
                  ))}
                </ul>
                <button onClick={() => setSubStep('work')} className="mt-4 px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium text-sm flex items-center gap-2">
                  Commencer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {subStep === 'work' && (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Redige ton message ici..."
                  className="w-full h-72 bg-bg-card border border-white/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-emerald-500/50"
                />
                <button
                  onClick={handleSubmitRedaction}
                  disabled={userAnswer.length < 50}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-700 text-white font-medium text-sm disabled:opacity-30"
                >
                  Envoyer a Coline pour correction
                </button>
              </div>
            )}

            {subStep === 'correction' && (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold">Correction de Coline</h3>
                  {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{correction}</div>
                <div className="flex gap-3 mt-6">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl bg-bg-hover text-sm font-medium flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </button>
                  <button onClick={() => { reset(); setExerciseIdx(exerciseIdx + 1); }} className="flex-1 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
                    Exercice suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <PageGuide page="ecriture" />
    </div>
  );
}
