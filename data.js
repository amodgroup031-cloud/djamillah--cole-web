/* Djamillah École — contenu pédagogique */
const R = (ar, tr, fr) => `<div class="ex-row"><span class="ar">${ar}</span><span class="tr">${tr}</span><span class="fr">${fr}</span></div>`;
const NOTE = (t) => `<div class="note">${t}</div>`;

const LETTERS = [
 ['ا','alif','a / ā long — support de la hamza'],['ب','bā’','b'],['ت','tā’','t'],['ث','thā’','th anglais (think)'],
 ['ج','jīm','dj'],['ح','ḥā’','h fort soufflé de la gorge'],['خ','khā’','kh (jota espagnole)'],['د','dāl','d'],
 ['ذ','dhāl','dh anglais (this)'],['ر','rā’','r roulé'],['ز','zāy','z'],['س','sīn','s'],['ش','shīn','ch'],
 ['ص','ṣād','s emphatique'],['ض','ḍād','d emphatique'],['ط','ṭā’','t emphatique'],['ظ','ẓā’','dh emphatique'],
 ['ع','ʿayn','son de gorge serré'],['غ','ghayn','r grasseyé (Paris)'],['ف','fā’','f'],['ق','qāf','k profond (gorge)'],
 ['ك','kāf','k'],['ل','lām','l'],['م','mīm','m'],['ن','nūn','n'],['ه','hā’','h aspiré léger'],['و','wāw','w / ū long'],['ي','yā’','y / ī long']
];
const SUN = ['ت','ث','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ل','ن'];

const LEVELS = [
 { id:1, name:'Primaire', ar:'المرحلة الابتدائية', color:'#0B6B4F',
   desc:'Lire, écrire, prononcer et construire tes premières phrases. Lire la Fâtiha.',
   lessons:[
   { id:'1-1', title:'Lettres, voyelles et premières phrases', ar:'الحُرُوفُ وَالحَرَكَاتُ', video:'@videos/n1-l1-v6.mp4',
     intro:'Les 28 lettres, les voyelles, la phrase هَذَا كِتَابٌ, l’article الـ, puis la Basmala et la Fâtiha.',
     sections:[
      {h:'1. L’alphabet arabe (28 lettres)', html:`<p>L’arabe s’écrit et se lit <b>de droite à gauche</b>. Il y a 28 lettres, presque toutes des consonnes. Touche une lettre pour l’agrandir.</p><div class="letters">${LETTERS.map(l=>`<button class="letter" data-l="${l[0]}" data-n="${l[1]}" data-s="${l[2]}"><span class="ar">${l[0]}</span><small>${l[1]}</small></button>`).join('')}</div>`+NOTE('Les lettres <b>ح ع خ غ ق</b> viennent de la gorge : ce sont elles qu’il faut le plus travailler.')},
      {h:'2. Les voyelles (الحَرَكَات)', html:`<p>Les voyelles courtes sont de petits signes au-dessus ou au-dessous de la lettre.</p>`+
        R('بَ','ba','fatha : petit trait au-dessus = « a »')+R('بِ','bi','kasra : petit trait au-dessous = « i »')+R('بُ','bu','damma : petit « و » au-dessus = « ou »')+
        R('بْ','b','soukoun : petit rond = pas de voyelle')+R('بّ','bb','chadda : la lettre est doublée')+
        `<p>Les voyelles longues utilisent ا و ي :</p>`+R('بَا','bā','a long')+R('بِي','bī','i long')+R('بُو','bū','ou long')+
        `<p>Le <b>tanwîn</b> (voyelle doublée en fin de mot) ajoute un son « n » et indique un nom indéfini (un / une) :</p>`+
        R('كِتَابٌ','kitābun','un livre (un, « oun »)')+R('كِتَابًا','kitāban','un livre (an)')+R('كِتَابٍ','kitābin','un livre (in)')},
      {h:'3. Première phrase : هَذَا كِتَابٌ', html:R('هَذَا كِتَابٌ','hādhā kitābun','Ceci est un livre')+R('هَذَا قَلَمٌ','hādhā qalamun','Ceci est un stylo')+R('هَذَا بَيْتٌ','hādhā baytun','Ceci est une maison')+R('هَذَا بَابٌ','hādhā bābun','Ceci est une porte')+
        NOTE('En arabe il n’y a <b>pas de verbe « être »</b> au présent : هَذَا (ceci) + كِتَابٌ (un livre) suffit pour dire « ceci est un livre ».')},
      {h:'4. L’article الـ (le, la, les)', html:`<p>On ajoute <b>الـ</b> au début du mot. Le tanwîn disparaît : il reste une seule voyelle.</p>`+
        R('كِتَابٌ ← الْكِتَابُ','kitābun → al-kitābu','un livre → le livre')+R('قَلَمٌ ← الْقَلَمُ','qalamun → al-qalamu','un stylo → le stylo')+
        R('بَيْتٌ ← الْبَيْتُ','baytun → al-baytu','une maison → la maison')+NOTE('Avec certaines lettres (les « lettres solaires »), le ل ne se prononce pas : الشَّمْسُ se dit <b>ash-shamsu</b>. Tu verras cela en détail à la leçon 2.')},
      {h:'5. La Basmala', html:R('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ','bismi-llāhi r-raḥmāni r-raḥīm','Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux')+
        `<p>Mot à mot : بِـ (par/au) + اسْمِ (nom) + اللَّهِ (d’Allah) + الرَّحْمَٰنِ + الرَّحِيمِ. Tu reconnais l’article الـ dans الرَّحْمَٰنِ et الرَّحِيمِ !</p>`},
      {h:'6. La Fâtiha (الفَاتِحَة)', html:`<p>La première sourate du Coran, récitée dans chaque prière. Lis-la verset par verset, puis ouvre le <b>Mode Coran</b> pour l’explication mot à mot.</p>`+
        R('الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ','al-ḥamdu li-llāhi rabbi l-ʿālamīn','La louange est à Allah, Seigneur des mondes')+
        R('الرَّحْمَٰنِ الرَّحِيمِ','ar-raḥmāni r-raḥīm','Le Tout Miséricordieux, le Très Miséricordieux')+
        R('مَالِكِ يَوْمِ الدِّينِ','māliki yawmi d-dīn','Maître du Jour de la Rétribution')+
        R('إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ','iyyāka naʿbudu wa-iyyāka nastaʿīn','C’est Toi seul que nous adorons, et c’est Toi seul dont nous implorons le secours')+
        R('اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ','ihdinā ṣ-ṣirāṭa l-mustaqīm','Guide-nous sur le droit chemin')+
        R('صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ','ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn','le chemin de ceux que Tu as comblés de faveurs, non de ceux qui ont encouru la colère, ni des égarés')+
        `<button class="btn ghost" data-go="#/sourate/fatiha">📖 Ouvrir la Fâtiha mot à mot</button>`}
     ],
     vocab:[['كِتَابٌ','kitābun','un livre'],['قَلَمٌ','qalamun','un stylo'],['بَيْتٌ','baytun','une maison'],['بَابٌ','bābun','une porte'],['هَذَا','hādhā','ceci (masculin)'],['الْكِتَابُ','al-kitābu','le livre'],['اسْمٌ','ismun','un nom'],['الْحَمْدُ','al-ḥamdu','la louange'],['رَبٌّ','rabbun','Seigneur'],['يَوْمٌ','yawmun','un jour']],
     exos:[
      {t:'qcm',q:'Dans quel sens s’écrit l’arabe ?',o:['De droite à gauche','De gauche à droite','De haut en bas'],a:0,ex:'L’arabe s’écrit et se lit de droite à gauche.'},
      {t:'qcm',q:'Quelle voyelle porte cette lettre ?',ar:'بِ',o:['Kasra (i)','Fatha (a)','Damma (ou)','Soukoun'],a:0,ex:'Le petit trait sous la lettre est la kasra : « bi ».'},
      {t:'qcm',q:'Comment se lit ce mot ?',ar:'كِتَابٌ',o:['kitābun','kutubun','kātibun','kitāban'],a:0,ex:'كِ = ki, تَا = tā, بٌ = bun (tanwîn damma).'},
      {t:'qcm',q:'Que signifie cette phrase ?',ar:'هَذَا قَلَمٌ',o:['Ceci est un stylo','Ceci est un livre','Le stylo','Ceci est une porte'],a:0,ex:'هَذَا = ceci, قَلَمٌ = un stylo.'},
      {t:'match',q:'Associe chaque mot à sa traduction',pairs:[['كِتَابٌ','un livre'],['بَيْتٌ','une maison'],['بَابٌ','une porte'],['قَلَمٌ','un stylo']]},
      {t:'qcm',q:'Comment dit-on « le livre » ?',o:['الْكِتَابُ','كِتَابٌ','كُتُبٌ','كَاتِبٌ'],a:0,ex:'On ajoute الـ et le tanwîn disparaît : الْكِتَابُ.'},
      {t:'tf',q:'Le signe « ْ » (soukoun) signifie que la lettre n’a pas de voyelle.',a:true,ex:'Oui : le soukoun indique l’absence de voyelle.'},
      {t:'order',q:'Remets dans l’ordre : « Ceci est une maison »',w:['هَذَا','بَيْتٌ'],ex:'هَذَا بَيْتٌ — on lit de droite à gauche.'},
      {t:'write',q:'Écris en arabe le mot « porte » (sans voyelles)',a:['باب'],ex:'بَابٌ s’écrit ب + ا + ب.'},
      {t:'qcm',q:'Que signifie رَبِّ الْعَالَمِينَ dans la Fâtiha ?',o:['Seigneur des mondes','Jour de la Rétribution','Le droit chemin','Au nom d’Allah'],a:0,ex:'رَبّ = Seigneur ; الْعَالَمِينَ = des mondes.'},
      {t:'qcm',q:'Combien de versets compte la Fâtiha ?',o:['7','5','10','4'],a:0,ex:'La Fâtiha compte 7 versets (la Basmala est le 1er selon la lecture de Hafs).'},
      {t:'tf',q:'Dans الرَّحِيمِ, on prononce le ل de l’article.',a:false,ex:'Non : ر est une lettre solaire, on dit « ar-raḥīm », le ل ne se prononce pas.'}
     ]},
   { id:'1-2', title:'Lettres solaires, lunaires et formes des lettres', ar:'الحُرُوفُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ',
     intro:'Quand le ل de الـ se prononce ou non, et comment une lettre change de forme selon sa place.',
     sections:[
      {h:'1. Lettres lunaires : on prononce le ل', html:R('الْقَمَرُ','al-qamaru','la lune')+R('الْبَابُ','al-bābu','la porte')+R('الْكِتَابُ','al-kitābu','le livre')+R('الْمَسْجِدُ','al-masjidu','la mosquée')},
      {h:'2. Lettres solaires : le ل disparaît', html:`<p>Avec les 14 lettres solaires, le ل ne se prononce pas et la lettre suivante prend une chadda.</p><div class="chips">${SUN.map(s=>`<span class="chip ar">${s}</span>`).join('')}</div>`+
        R('الشَّمْسُ','ash-shamsu','le soleil')+R('النُّورُ','an-nūru','la lumière')+R('الرَّجُلُ','ar-rajulu','l’homme')+R('الدَّرْسُ','ad-darsu','la leçon')+
        NOTE('Astuce : dans الشَّمْسُ (soleil) le ل est muet, dans الْقَمَرُ (lune) il se prononce. D’où les noms « solaire » et « lunaire ».')},
      {h:'3. Les formes des lettres', html:`<p>Les lettres s’attachent entre elles. Une même lettre change de forme : isolée, au début, au milieu, à la fin.</p>`+
        R('ب ← بـ ـبـ ـب','b','isolée, début, milieu, fin')+R('ع ← عـ ـعـ ـع','ʿ','la lettre ʿayn change beaucoup')+R('ه ← هـ ـهـ ـه','h','le hā’')+
        NOTE('Six lettres ne s’attachent jamais à la lettre suivante : <span class="ar">ا د ذ ر ز و</span>. Exemple : دَرْسٌ, وَرْدٌ.')+
        `<p>La <b>tā’ marbūṭa</b> <span class="ar">ة</span> se trouve à la fin des mots, souvent féminins : <span class="ar">مَدْرَسَةٌ</span> (une école).</p>`}
     ],
     vocab:[['الشَّمْسُ','ash-shamsu','le soleil'],['الْقَمَرُ','al-qamaru','la lune'],['النُّورُ','an-nūru','la lumière'],['الرَّجُلُ','ar-rajulu','l’homme'],['الدَّرْسُ','ad-darsu','la leçon'],['مَسْجِدٌ','masjidun','une mosquée'],['مَدْرَسَةٌ','madrasatun','une école'],['وَرْدٌ','wardun','des roses']],
     exos:[
      {t:'qcm',q:'Comment se prononce ce mot ?',ar:'الشَّمْسُ',o:['ash-shamsu','al-shamsu','al-shams-u avec le l','ach-chamsou-l'],a:0,ex:'ش est solaire : le ل est muet.'},
      {t:'qcm',q:'Laquelle de ces lettres est lunaire ?',o:['ق','ش','ر','ن'],a:0,ex:'ق est lunaire : الْقَمَرُ se dit al-qamaru.'},
      {t:'tf',q:'Dans الْبَابُ, on prononce le ل.',a:true,ex:'Oui, ب est une lettre lunaire : al-bābu.'},
      {t:'tf',q:'La lettre د s’attache à la lettre qui la suit.',a:false,ex:'Non, ا د ذ ر ز و ne s’attachent jamais à la lettre suivante.'},
      {t:'match',q:'Associe',pairs:[['الشَّمْسُ','le soleil'],['الْقَمَرُ','la lune'],['النُّورُ','la lumière'],['الدَّرْسُ','la leçon']]},
      {t:'qcm',q:'Que signifie مَدْرَسَةٌ ?',o:['une école','une mosquée','une leçon','une maison'],a:0,ex:'مَدْرَسَةٌ = une école (ة à la fin).'},
      {t:'qcm',q:'Comment se prononce النُّورُ ?',o:['an-nūru','al-nūru','al-nouroun','in-nūr'],a:0,ex:'ن est solaire : an-nūru.'},
      {t:'write',q:'Écris « lune » avec l’article (sans voyelles)',a:['القمر'],ex:'الْقَمَرُ = ا ل ق م ر'}
     ]},
   { id:'1-3', title:'Les pronoms et la phrase nominale', ar:'الضَّمَائِرُ وَالجُمْلَةُ الاسْمِيَّةُ',
     intro:'Je, tu, il, elle, nous… et dire « je suis étudiant ».',
     sections:[
      {h:'1. Les pronoms personnels', html:R('أَنَا','anā','je / moi')+R('أَنْتَ','anta','tu (homme)')+R('أَنْتِ','anti','tu (femme)')+R('هُوَ','huwa','il / lui')+R('هِيَ','hiya','elle')+R('نَحْنُ','naḥnu','nous')+R('هُمْ','hum','ils / eux')},
      {h:'2. La phrase nominale', html:`<p>Pronom + nom = phrase complète, sans verbe « être ».</p>`+R('أَنَا طَالِبٌ','anā ṭālibun','Je suis étudiant')+R('هِيَ طَالِبَةٌ','hiya ṭālibatun','Elle est étudiante')+R('هُوَ مُعَلِّمٌ','huwa muʿallimun','Il est enseignant')+R('نَحْنُ مُسْلِمُونَ','naḥnu muslimūna','Nous sommes musulmans')+NOTE('Le féminin se forme souvent en ajoutant <span class="ar">ة</span> : طَالِبٌ → طَالِبَةٌ.')}
     ],
     vocab:[['أَنَا','anā','je'],['أَنْتَ','anta','tu (m.)'],['أَنْتِ','anti','tu (f.)'],['هُوَ','huwa','il'],['هِيَ','hiya','elle'],['نَحْنُ','naḥnu','nous'],['طَالِبٌ','ṭālibun','un étudiant'],['مُعَلِّمٌ','muʿallimun','un enseignant'],['طَبِيبٌ','ṭabībun','un médecin'],['مُسْلِمٌ','muslimun','un musulman']],
     exos:[
      {t:'qcm',q:'Que signifie نَحْنُ ?',o:['nous','je','ils','elle'],a:0,ex:'نَحْنُ = nous.'},
      {t:'qcm',q:'« Tu » pour une femme se dit :',o:['أَنْتِ','أَنْتَ','أَنَا','هِيَ'],a:0,ex:'أَنْتِ avec kasra pour une femme.'},
      {t:'match',q:'Associe',pairs:[['أَنَا','je'],['هُوَ','il'],['هِيَ','elle'],['نَحْنُ','nous']]},
      {t:'qcm',q:'Traduis : هُوَ طَبِيبٌ',o:['Il est médecin','Elle est médecin','Je suis médecin','Tu es médecin'],a:0,ex:'هُوَ = il, طَبِيبٌ = médecin.'},
      {t:'order',q:'Remets dans l’ordre : « Je suis étudiant »',w:['أَنَا','طَالِبٌ'],ex:'أَنَا طَالِبٌ'},
      {t:'qcm',q:'Le féminin de طَالِبٌ est :',o:['طَالِبَةٌ','طُلَّابٌ','طَالِبُونَ','مُعَلِّمَةٌ'],a:0,ex:'On ajoute ة : طَالِبَةٌ.'},
      {t:'tf',q:'Pour dire « je suis enseignant », il faut un verbe « être » en arabe.',a:false,ex:'Non : أَنَا مُعَلِّمٌ suffit.'},
      {t:'write',q:'Écris « je » en arabe',a:['انا'],ex:'أَنَا'}
     ]},
   { id:'1-4', title:'Démonstratifs et questions', ar:'أَسْمَاءُ الإِشَارَةِ وَالاسْتِفْهَامُ',
     intro:'Ceci, cela, et poser des questions : quoi ? qui ? où ?',
     sections:[
      {h:'1. Ceci / cela', html:R('هَذَا','hādhā','ceci (masculin, proche)')+R('هَذِهِ','hādhihi','ceci (féminin, proche)')+R('ذَلِكَ','dhālika','cela (masculin, loin)')+R('تِلْكَ','tilka','cela (féminin, loin)')+R('هَذِهِ سَيَّارَةٌ','hādhihi sayyāratun','Ceci est une voiture')+R('ذَلِكَ مَسْجِدٌ','dhālika masjidun','Cela est une mosquée')},
      {h:'2. Les mots interrogatifs', html:R('مَا هَذَا؟','mā hādhā ?','Qu’est-ce que c’est ? (objet)')+R('مَنْ هَذَا؟','man hādhā ?','Qui est-ce ? (personne)')+R('أَيْنَ الْمَسْجِدُ؟','ayna l-masjidu ?','Où est la mosquée ?')+R('هَلْ هَذَا كِتَابٌ؟','hal hādhā kitābun ?','Est-ce un livre ?')+R('نَعَمْ / لَا','naʿam / lā','oui / non')+NOTE('مَا pour les choses, مَنْ pour les personnes. هَلْ transforme une phrase en question « oui/non ».')}
     ],
     vocab:[['هَذِهِ','hādhihi','ceci (f.)'],['ذَلِكَ','dhālika','cela (m.)'],['تِلْكَ','tilka','cela (f.)'],['مَا','mā','quoi ?'],['مَنْ','man','qui ?'],['أَيْنَ','ayna','où ?'],['نَعَمْ','naʿam','oui'],['لَا','lā','non'],['سَيَّارَةٌ','sayyāratun','une voiture'],['شَجَرَةٌ','shajaratun','un arbre']],
     exos:[
      {t:'qcm',q:'Pour un objet féminin proche, on dit :',o:['هَذِهِ','هَذَا','ذَلِكَ','تِلْكَ'],a:0,ex:'هَذِهِ سَيَّارَةٌ'},
      {t:'qcm',q:'« Qui est-ce ? » se dit :',o:['مَنْ هَذَا؟','مَا هَذَا؟','أَيْنَ هَذَا؟','هَلْ هَذَا؟'],a:0,ex:'مَنْ pour les personnes.'},
      {t:'match',q:'Associe',pairs:[['أَيْنَ','où ?'],['مَا','quoi ?'],['مَنْ','qui ?'],['نَعَمْ','oui']]},
      {t:'qcm',q:'Traduis : أَيْنَ الْمَسْجِدُ؟',o:['Où est la mosquée ?','Qu’est-ce que la mosquée ?','Est-ce une mosquée ?','Cela est une mosquée'],a:0,ex:'أَيْنَ = où.'},
      {t:'tf',q:'شَجَرَةٌ est un mot féminin, on dit donc هَذِهِ شَجَرَةٌ.',a:true,ex:'Oui, ة indique le féminin.'},
      {t:'order',q:'Remets dans l’ordre : « Est-ce un livre ? »',w:['هَلْ','هَذَا','كِتَابٌ؟'],ex:'هَلْ هَذَا كِتَابٌ؟'},
      {t:'write',q:'Écris « non » en arabe',a:['لا'],ex:'لَا'},
      {t:'qcm',q:'Que signifie تِلْكَ ?',o:['cela (féminin)','ceci (féminin)','cela (masculin)','qui'],a:0,ex:'تِلْكَ = cela, féminin, éloigné.'}
     ]},
   { id:'1-5', title:'Salutations et présentations', ar:'التَّحِيَّاتُ وَالتَّعَارُفُ',
     intro:'Saluer, demander des nouvelles, dire son nom et son pays.',
     sections:[
      {h:'1. Saluer', html:R('السَّلَامُ عَلَيْكُمْ','as-salāmu ʿalaykum','Que la paix soit sur vous')+R('وَعَلَيْكُمُ السَّلَامُ','wa-ʿalaykumu s-salām','Et sur vous la paix')+R('صَبَاحُ الْخَيْرِ','ṣabāḥu l-khayr','Bonjour (matin)')+R('صَبَاحُ النُّورِ','ṣabāḥu n-nūr','Réponse : bonjour')+R('مَسَاءُ الْخَيْرِ','masā’u l-khayr','Bonsoir')+R('أَهْلًا وَسَهْلًا','ahlan wa-sahlan','Bienvenue')},
      {h:'2. Se présenter', html:R('كَيْفَ حَالُكَ؟','kayfa ḥāluka ?','Comment vas-tu ?')+R('بِخَيْرٍ، وَالْحَمْدُ لِلَّهِ','bi-khayrin, wa-l-ḥamdu li-llāh','Bien, louange à Allah')+R('مَا اسْمُكَ؟','mā smuka ?','Comment t’appelles-tu ?')+R('اسْمِي عَبْدُ اللَّهِ','ismī ʿabdu llāh','Je m’appelle Abdallah')+R('مِنْ أَيْنَ أَنْتَ؟','min ayna anta ?','D’où viens-tu ?')+R('أَنَا مِنْ غِينِيَا','anā min ghīniyā','Je viens de Guinée')+R('شُكْرًا / عَفْوًا','shukran / ʿafwan','Merci / De rien')+R('مَعَ السَّلَامَةِ','maʿa s-salāma','Au revoir')}
     ],
     vocab:[['السَّلَامُ','as-salāmu','la paix'],['صَبَاحٌ','ṣabāḥun','un matin'],['مَسَاءٌ','masā’un','un soir'],['حَالٌ','ḥālun','un état'],['اسْمِي','ismī','mon nom'],['شُكْرًا','shukran','merci'],['عَفْوًا','ʿafwan','de rien'],['مَعَ السَّلَامَةِ','maʿa s-salāma','au revoir'],['أَهْلًا وَسَهْلًا','ahlan wa-sahlan','bienvenue'],['كَيْفَ','kayfa','comment ?']],
     exos:[
      {t:'qcm',q:'On te dit السَّلَامُ عَلَيْكُمْ. Tu réponds :',o:['وَعَلَيْكُمُ السَّلَامُ','صَبَاحُ الْخَيْرِ','شُكْرًا','مَعَ السَّلَامَةِ'],a:0,ex:'وَعَلَيْكُمُ السَّلَامُ'},
      {t:'qcm',q:'Réponse à صَبَاحُ الْخَيْرِ :',o:['صَبَاحُ النُّورِ','مَسَاءُ الْخَيْرِ','عَفْوًا','نَعَمْ'],a:0,ex:'صَبَاحُ النُّورِ'},
      {t:'match',q:'Associe',pairs:[['شُكْرًا','merci'],['عَفْوًا','de rien'],['كَيْفَ','comment ?'],['مَعَ السَّلَامَةِ','au revoir']]},
      {t:'qcm',q:'Comment demander « Comment t’appelles-tu ? »',o:['مَا اسْمُكَ؟','كَيْفَ حَالُكَ؟','مِنْ أَيْنَ أَنْتَ؟','أَيْنَ أَنْتَ؟'],a:0,ex:'مَا اسْمُكَ؟'},
      {t:'order',q:'Remets dans l’ordre : « Je viens de Guinée »',w:['أَنَا','مِنْ','غِينِيَا'],ex:'أَنَا مِنْ غِينِيَا'},
      {t:'tf',q:'مَسَاءُ الْخَيْرِ s’utilise le matin.',a:false,ex:'Non, c’est « bonsoir ».'},
      {t:'write',q:'Écris « merci » en arabe (sans voyelles)',a:['شكرا'],ex:'شُكْرًا'},
      {t:'qcm',q:'بِخَيْرٍ signifie :',o:['bien','merci','bienvenue','bonsoir'],a:0,ex:'بِخَيْرٍ = bien (litt. « dans le bien »).'}
     ]},
   { id:'1-6', title:'Les nombres de 1 à 10', ar:'الأَعْدَادُ مِنْ ١ إِلَى ١٠',
     intro:'Compter, et lire les chiffres arabes orientaux.',
     sections:[
      {h:'1. Compter', html:[['١','وَاحِدٌ','wāḥidun','un'],['٢','اثْنَانِ','ithnāni','deux'],['٣','ثَلَاثَةٌ','thalāthatun','trois'],['٤','أَرْبَعَةٌ','arbaʿatun','quatre'],['٥','خَمْسَةٌ','khamsatun','cinq'],['٦','سِتَّةٌ','sittatun','six'],['٧','سَبْعَةٌ','sabʿatun','sept'],['٨','ثَمَانِيَةٌ','thamāniyatun','huit'],['٩','تِسْعَةٌ','tisʿatun','neuf'],['١٠','عَشَرَةٌ','ʿasharatun','dix']].map(n=>R(n[0]+' — '+n[1],n[2],n[3])).join('')+NOTE('Les chiffres ١٢٣ se lisent de gauche à droite, comme en français : ١٠ = 10.')}
     ],
     vocab:[['وَاحِدٌ','wāḥidun','un'],['اثْنَانِ','ithnāni','deux'],['ثَلَاثَةٌ','thalāthatun','trois'],['أَرْبَعَةٌ','arbaʿatun','quatre'],['خَمْسَةٌ','khamsatun','cinq'],['سِتَّةٌ','sittatun','six'],['سَبْعَةٌ','sabʿatun','sept'],['ثَمَانِيَةٌ','thamāniyatun','huit'],['تِسْعَةٌ','tisʿatun','neuf'],['عَشَرَةٌ','ʿasharatun','dix']],
     exos:[
      {t:'qcm',q:'Quel chiffre est-ce ?',ar:'٧',o:['7','6','8','2'],a:0,ex:'٧ = 7 (sabʿa).'},
      {t:'qcm',q:'خَمْسَةٌ =',o:['5','4','6','15'],a:0,ex:'خَمْسَةٌ = cinq.'},
      {t:'match',q:'Associe',pairs:[['ثَلَاثَةٌ','trois'],['تِسْعَةٌ','neuf'],['اثْنَانِ','deux'],['عَشَرَةٌ','dix']]},
      {t:'qcm',q:'Quel nombre est-ce ?',ar:'١٠',o:['10','1','01','100'],a:0,ex:'١٠ = 10.'},
      {t:'qcm',q:'« Huit » se dit :',o:['ثَمَانِيَةٌ','سِتَّةٌ','أَرْبَعَةٌ','سَبْعَةٌ'],a:0,ex:'ثَمَانِيَةٌ'},
      {t:'tf',q:'Les sept versets de la Fâtiha : sept se dit سَبْعَةٌ.',a:true,ex:'Oui.'},
      {t:'write',q:'Écris le nombre « un » en lettres arabes (sans voyelles)',a:['واحد'],ex:'وَاحِدٌ'},
      {t:'qcm',q:'٤ + ٢ = ?',o:['٦','٥','٨','٣'],a:0,ex:'4 + 2 = 6 = ٦ (سِتَّةٌ).'}
     ]},
   { id:'1-7', title:'La famille et le possessif', ar:'الأُسْرَةُ',
     intro:'Les membres de la famille et dire « mon, ton ».',
     sections:[
      {h:'1. La famille', html:R('أَبٌ','abun','un père')+R('أُمٌّ','ummun','une mère')+R('أَخٌ','akhun','un frère')+R('أُخْتٌ','ukhtun','une sœur')+R('ابْنٌ','ibnun','un fils')+R('بِنْتٌ','bintun','une fille')+R('زَوْجٌ','zawjun','un mari')+R('زَوْجَةٌ','zawjatun','une épouse')+R('جَدٌّ / جَدَّةٌ','jaddun / jaddatun','grand-père / grand-mère')},
      {h:'2. Mon / ton', html:`<p>On colle une terminaison à la fin du mot, sans tanwîn :</p>`+R('كِتَابِي','kitābī','mon livre (ـي)')+R('كِتَابُكَ','kitābuka','ton livre (homme, ـكَ)')+R('كِتَابُكِ','kitābuki','ton livre (femme, ـكِ)')+R('أُمِّي','ummī','ma mère')+R('هَذَا أَبِي','hādhā abī','Voici mon père')+R('زَوْجَتِي','zawjatī','mon épouse')+NOTE('Devant un possessif, la ة devient ت : زَوْجَةٌ → زَوْجَتِي.')}
     ],
     vocab:[['أَبٌ','abun','père'],['أُمٌّ','ummun','mère'],['أَخٌ','akhun','frère'],['أُخْتٌ','ukhtun','sœur'],['ابْنٌ','ibnun','fils'],['بِنْتٌ','bintun','fille'],['زَوْجٌ','zawjun','mari'],['زَوْجَةٌ','zawjatun','épouse'],['جَدٌّ','jaddun','grand-père'],['أُسْرَةٌ','usratun','famille']],
     exos:[
      {t:'match',q:'Associe',pairs:[['أَبٌ','père'],['أُمٌّ','mère'],['أَخٌ','frère'],['أُخْتٌ','sœur']]},
      {t:'qcm',q:'« Mon livre » se dit :',o:['كِتَابِي','كِتَابُكَ','الْكِتَابُ','كِتَابٌ'],a:0,ex:'ـي = mon.'},
      {t:'qcm',q:'Traduis : هَذِهِ أُمِّي',o:['Voici ma mère','Voici ta mère','Voici une mère','Ma sœur'],a:0,ex:'أُمِّي = ma mère.'},
      {t:'qcm',q:'« Mon épouse » se dit :',o:['زَوْجَتِي','زَوْجَةِي','زَوْجِي','زَوْجَتُكَ'],a:0,ex:'ة devient ت : زَوْجَتِي.'},
      {t:'tf',q:'كِتَابُكِ s’adresse à une femme.',a:true,ex:'Oui, ـكِ avec kasra = ton (femme).'},
      {t:'order',q:'Remets dans l’ordre : « Voici mon père »',w:['هَذَا','أَبِي'],ex:'هَذَا أَبِي'},
      {t:'write',q:'Écris « fille » (sans voyelles)',a:['بنت'],ex:'بِنْتٌ'},
      {t:'qcm',q:'أُسْرَةٌ signifie :',o:['famille','maison','sœur','école'],a:0,ex:'أُسْرَةٌ = famille.'}
     ]},
   { id:'1-8', title:'Masculin, féminin et adjectifs', ar:'المُذَكَّرُ وَالمُؤَنَّثُ وَالصِّفَةُ',
     intro:'Accorder l’adjectif et dire « la maison est grande ».',
     sections:[
      {h:'1. Adjectifs courants', html:R('كَبِيرٌ / كَبِيرَةٌ','kabīrun / kabīratun','grand / grande')+R('صَغِيرٌ / صَغِيرَةٌ','ṣaghīrun / ṣaghīratun','petit / petite')+R('جَمِيلٌ / جَمِيلَةٌ','jamīlun / jamīlatun','beau / belle')+R('جَدِيدٌ / جَدِيدَةٌ','jadīdun / jadīdatun','neuf / neuve')+R('قَدِيمٌ / قَدِيمَةٌ','qadīmun / qadīmatun','ancien / ancienne')},
      {h:'2. Deux constructions', html:`<p><b>Phrase</b> (nom défini + adjectif indéfini) :</p>`+R('الْبَيْتُ كَبِيرٌ','al-baytu kabīrun','La maison est grande')+R('الْمَدْرَسَةُ جَدِيدَةٌ','al-madrasatu jadīdatun','L’école est neuve')+`<p><b>Groupe nominal</b> (l’adjectif suit le nom et prend aussi الـ) :</p>`+R('الْبَيْتُ الْكَبِيرُ','al-baytu l-kabīru','la grande maison')+R('بَيْتٌ كَبِيرٌ','baytun kabīrun','une grande maison')+NOTE('L’adjectif se place <b>après</b> le nom et s’accorde en genre et en définition.')}
     ],
     vocab:[['كَبِيرٌ','kabīrun','grand'],['صَغِيرٌ','ṣaghīrun','petit'],['جَمِيلٌ','jamīlun','beau'],['جَدِيدٌ','jadīdun','neuf'],['قَدِيمٌ','qadīmun','ancien'],['طَوِيلٌ','ṭawīlun','long, grand (taille)'],['قَصِيرٌ','qaṣīrun','court, petit (taille)'],['نَظِيفٌ','naẓīfun','propre']],
     exos:[
      {t:'qcm',q:'Traduis : الْبَيْتُ كَبِيرٌ',o:['La maison est grande','La grande maison','Une grande maison','La maison est petite'],a:0,ex:'Nom défini + adjectif indéfini = phrase.'},
      {t:'qcm',q:'« Une belle voiture » se dit :',o:['سَيَّارَةٌ جَمِيلَةٌ','سَيَّارَةٌ جَمِيلٌ','جَمِيلَةٌ سَيَّارَةٌ','السَّيَّارَةُ جَمِيلَةٌ'],a:0,ex:'Adjectif après le nom, accordé au féminin.'},
      {t:'match',q:'Associe',pairs:[['كَبِيرٌ','grand'],['صَغِيرٌ','petit'],['جَدِيدٌ','neuf'],['قَدِيمٌ','ancien']]},
      {t:'tf',q:'Dans « la grande maison », l’adjectif prend aussi الـ : الْبَيْتُ الْكَبِيرُ.',a:true,ex:'Oui, accord en définition.'},
      {t:'qcm',q:'Le féminin de صَغِيرٌ est :',o:['صَغِيرَةٌ','صِغَارٌ','أَصْغَرُ','صَغِيرٍ'],a:0,ex:'On ajoute ة.'},
      {t:'order',q:'Remets dans l’ordre : « L’école est neuve »',w:['الْمَدْرَسَةُ','جَدِيدَةٌ'],ex:'الْمَدْرَسَةُ جَدِيدَةٌ'},
      {t:'write',q:'Écris « grand » (sans voyelles)',a:['كبير'],ex:'كَبِيرٌ'},
      {t:'qcm',q:'Où se place l’adjectif en arabe ?',o:['Après le nom','Avant le nom','N’importe où','Au début de la phrase'],a:0,ex:'Toujours après le nom.'}
     ]}
   ],
   exam:[
    {t:'qcm',q:'Quelle voyelle donne le son « ou » ?',o:['Damma','Fatha','Kasra','Soukoun'],a:0},
    {t:'qcm',q:'Comment se lit الشَّمْسُ ?',o:['ash-shamsu','al-shamsu','ach-chams-l','as-sumsu'],a:0},
    {t:'qcm',q:'Traduis : هَذَا كِتَابٌ',o:['Ceci est un livre','Le livre','Cela est une porte','Ceci est un stylo'],a:0},
    {t:'qcm',q:'« La porte » se dit :',o:['الْبَابُ','بَابٌ','بَابِي','أَبْوَابٌ'],a:0},
    {t:'tf',q:'ر est une lettre solaire.',a:true},
    {t:'qcm',q:'« Elle est étudiante » :',o:['هِيَ طَالِبَةٌ','هُوَ طَالِبٌ','أَنْتِ طَالِبَةٌ','هِيَ طَالِبٌ'],a:0},
    {t:'qcm',q:'« Qu’est-ce que c’est ? » :',o:['مَا هَذَا؟','مَنْ هَذَا؟','أَيْنَ هَذَا؟','هَلْ هَذَا؟'],a:0},
    {t:'qcm',q:'Réponse à السَّلَامُ عَلَيْكُمْ :',o:['وَعَلَيْكُمُ السَّلَامُ','صَبَاحُ النُّورِ','عَفْوًا','أَهْلًا'],a:0},
    {t:'match',q:'Associe',pairs:[['ثَلَاثَةٌ','trois'],['سَبْعَةٌ','sept'],['عَشَرَةٌ','dix'],['خَمْسَةٌ','cinq']]},
    {t:'qcm',q:'« Ma mère » :',o:['أُمِّي','أُمُّكَ','الْأُمُّ','أُمٌّ'],a:0},
    {t:'qcm',q:'« La grande maison » :',o:['الْبَيْتُ الْكَبِيرُ','الْبَيْتُ كَبِيرٌ','بَيْتٌ كَبِيرٌ','كَبِيرٌ الْبَيْتُ'],a:0},
    {t:'tf',q:'Les lettres ا د ذ ر ز و ne s’attachent pas à la lettre suivante.',a:true},
    {t:'qcm',q:'Que signifie مَالِكِ يَوْمِ الدِّينِ ?',o:['Maître du Jour de la Rétribution','Seigneur des mondes','Le droit chemin','Le Très Miséricordieux'],a:0},
    {t:'qcm',q:'إِيَّاكَ نَعْبُدُ signifie :',o:['C’est Toi seul que nous adorons','Guide-nous','Nous implorons Ton secours','Au nom d’Allah'],a:0},
    {t:'order',q:'Remets dans l’ordre : « Où est la mosquée ? »',w:['أَيْنَ','الْمَسْجِدُ؟']},
    {t:'write',q:'Écris « maison » (sans voyelles)',a:['بيت']},
    {t:'qcm',q:'Quel chiffre ?',ar:'٩',o:['9','6','8','3'],a:0},
    {t:'qcm',q:'Que signifie نَحْنُ ?',o:['nous','vous','ils','je'],a:0},
    {t:'tf',q:'Dans كِتَابٌ, le tanwîn indique « un livre ».',a:true},
    {t:'qcm',q:'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ :',o:['Guide-nous sur le droit chemin','Le chemin des égarés','La louange est à Allah','Au nom d’Allah'],a:0}
   ]},
 { id:2, name:'Collège', ar:'المرحلة المتوسطة', color:'#1C7C6B', desc:'Le verbe, le pluriel, la phrase verbale, lire de courts textes.',
   syllabus:['Le verbe au passé (الْمَاضِي)','Le verbe au présent (الْمُضَارِع)','Les pluriels réguliers et brisés','Les prépositions (فِي، عَلَى، مِنْ، إِلَى)','L’annexion (الإِضَافَة)','Les nombres de 11 à 100','Le temps et les jours','Lecture : courtes histoires des prophètes','Sourates courtes : Juz’ ʿAmma (1re partie)']},
 { id:3, name:'Lycée', ar:'المرحلة الثانوية', color:'#2E6F8E', desc:'Grammaire complète (naḥw), conjugaison (ṣarf), expression écrite.',
   syllabus:['Les cas : nominatif, accusatif, génitif (الإِعْرَاب)','Kâna et ses sœurs, Inna et ses sœurs','Les formes verbales dérivées (II à X)','Le participe et le masdar','Phrase relative et conditionnelle','Rédaction : lettre, récit, résumé','Arabe moderne : presse simple','Tajwîd : règles essentielles','Sourates : Juz’ ʿAmma complet']},
 { id:4, name:'Licence', ar:'مرحلة الليسانس', color:'#6B4F9E', desc:'Spécialisation selon ta filière, sur trois années.', filiere:true,
   syllabus:{ coran:['Sciences du Coran (ʿulûm al-Qur’ân)','Tafsîr : méthodes et grands exégètes','Hadith et terminologie','Fiqh : les quatre écoles comparées','Tajwîd avancé'],
     litt:['Histoire de la littérature arabe','Poésie antéislamique et classique','Rhétorique (balâgha)','Prose moderne : nouvelle et roman','Critique littéraire'],
     trad:['Théorie de la traduction','Traduction arabe → français','Traduction français → arabe','Terminologie juridique et économique','Interprétariat de liaison'],
     affaires:['Arabe économique et commercial','Rédaction de courriers et contrats','Langue des médias et de la presse','Négociation et présentation orale','Arabe du numérique et du marketing'] }},
 { id:5, name:'Master', ar:'مرحلة الماجستير', color:'#9E4F6B', desc:'Approfondissement et méthodologie de recherche dans ta filière.', filiere:true,
   syllabus:{ coran:['Usûl al-fiqh','Exégèse comparée','Maqâsid ash-sharîʿa','Manuscrits et éditions critiques','Mémoire de master'],
     litt:['Linguistique arabe','Stylistique','Littérature comparée','Analyse de textes classiques','Mémoire de master'],
     trad:['Traduction spécialisée (droit, médecine)','Traduction littéraire','Traduction audiovisuelle','Outils de traduction','Mémoire de master'],
     affaires:['Communication institutionnelle','Journalisme arabe','Finance islamique en arabe','Rédaction stratégique','Mémoire de master'] }},
 { id:6, name:'Doctorat', ar:'مرحلة الدكتوراه', color:'#B08A2E', desc:'Recherche originale, publication et soutenance de thèse.', filiere:true,
   syllabus:{ coran:['Séminaire de recherche','Sources classiques et critique','Publication scientifique','Thèse'],
     litt:['Séminaire de recherche','Théories critiques','Publication scientifique','Thèse'],
     trad:['Séminaire de recherche','Traductologie','Publication scientifique','Thèse'],
     affaires:['Séminaire de recherche','Discours économique et médiatique','Publication scientifique','Thèse'] }}
];

const FILIERES = [
 {id:'coran', name:'Sciences islamiques et Coran', ar:'العلوم الإسلامية والقرآن', icon:'📖', desc:'Tafsîr, hadith, fiqh comparé, tajwîd : comprendre les textes sacrés en profondeur.'},
 {id:'litt', name:'Langue et littérature', ar:'اللغة والأدب', icon:'🖋️', desc:'Grammaire avancée, rhétorique, poésie et prose de l’Antiquité à nos jours.'},
 {id:'trad', name:'Traduction', ar:'الترجمة', icon:'🔁', desc:'Traduire entre l’arabe et le français : droit, économie, littérature, médias.'},
 {id:'affaires', name:'Arabe des affaires et médias', ar:'العربية للأعمال والإعلام', icon:'💼', desc:'Courriers, contrats, presse, négociation : l’arabe professionnel moderne.'}
];
