/* Mode Coran — versets expliqués mot à mot (lecture de Hafs) */
const SURAHS = [
{ id:'fatiha', num:1, name:'Al-Fâtiha', ar:'الفَاتِحَة', fr:'L’Ouverture', lieu:'Mecquoise',
  intro:'La « Mère du Livre », récitée dans chaque unité de prière. Elle réunit la louange d’Allah, l’adoration exclusive et la demande de guidance.',
  verses:[
  {ar:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', tr:'bismi-llāhi r-raḥmāni r-raḥīm', fr:'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux.',
   w:[['بِسْمِ','bismi','au nom de','بِـ « par » + اسْم « nom »'],['اللَّهِ','llāhi','d’Allah','Le nom propre de Dieu'],['الرَّحْمَٰنِ','ar-raḥmāni','le Tout Miséricordieux','Racine ر ح م : miséricorde immense, englobant toute la création'],['الرَّحِيمِ','ar-raḥīmi','le Très Miséricordieux','Même racine ر ح م : miséricorde constante envers les croyants']]},
  {ar:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', tr:'al-ḥamdu li-llāhi rabbi l-ʿālamīn', fr:'La louange est à Allah, Seigneur des mondes.',
   w:[['الْحَمْدُ','al-ḥamdu','la louange','Racine ح م د ; même famille que مُحَمَّد « le loué »'],['لِلَّهِ','li-llāhi','à Allah','لِـ « à, pour » + اللَّه'],['رَبِّ','rabbi','Seigneur','Celui qui crée, possède et prend soin'],['الْعَالَمِينَ','al-ʿālamīna','des mondes','Pluriel de عَالَم « monde »']]},
  {ar:'الرَّحْمَٰنِ الرَّحِيمِ', tr:'ar-raḥmāni r-raḥīm', fr:'Le Tout Miséricordieux, le Très Miséricordieux.',
   w:[['الرَّحْمَٰنِ','ar-raḥmāni','le Tout Miséricordieux','Racine ر ح م'],['الرَّحِيمِ','ar-raḥīmi','le Très Miséricordieux','Racine ر ح م']]},
  {ar:'مَالِكِ يَوْمِ الدِّينِ', tr:'māliki yawmi d-dīn', fr:'Maître du Jour de la Rétribution.',
   w:[['مَالِكِ','māliki','Maître, Possesseur','Racine م ل ك « posséder, régner »'],['يَوْمِ','yawmi','du jour','يَوْم « jour »'],['الدِّينِ','ad-dīni','de la Rétribution','Ici دِين = le Jugement, la rétribution des actes']]},
  {ar:'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', tr:'iyyāka naʿbudu wa-iyyāka nastaʿīn', fr:'C’est Toi seul que nous adorons, et c’est Toi seul dont nous implorons le secours.',
   w:[['إِيَّاكَ','iyyāka','Toi (seul)','Placé en tête pour marquer l’exclusivité'],['نَعْبُدُ','naʿbudu','nous adorons','Verbe au présent, « nous » ; racine ع ب د'],['وَإِيَّاكَ','wa-iyyāka','et Toi (seul)','وَ « et » + إِيَّاكَ'],['نَسْتَعِينُ','nastaʿīnu','nous demandons le secours','Forme X de ع و ن « aider » : demander de l’aide']]},
  {ar:'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', tr:'ihdinā ṣ-ṣirāṭa l-mustaqīm', fr:'Guide-nous sur le droit chemin.',
   w:[['اهْدِنَا','ihdinā','guide-nous','Impératif de هَدَى « guider » + نَا « nous »'],['الصِّرَاطَ','aṣ-ṣirāṭa','le chemin','La voie claire et large'],['الْمُسْتَقِيمَ','al-mustaqīma','droit','Racine ق و م « se tenir droit »']]},
  {ar:'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', tr:'ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn', fr:'Le chemin de ceux que Tu as comblés de faveurs, non de ceux qui ont encouru la colère, ni des égarés.',
   w:[['صِرَاطَ','ṣirāṭa','le chemin','Reprise du mot du verset précédent'],['الَّذِينَ','alladhīna','de ceux que','Pronom relatif pluriel'],['أَنْعَمْتَ','anʿamta','Tu as comblé de faveurs','Passé, « tu » ; racine ن ع م « bienfait »'],['عَلَيْهِمْ','ʿalayhim','sur eux','عَلَى « sur » + هِمْ « eux »'],['غَيْرِ','ghayri','non (pas)','« autre que »'],['الْمَغْضُوبِ','al-maghḍūbi','ceux qui ont encouru la colère','Participe passif de غَضِبَ « se mettre en colère »'],['عَلَيْهِمْ','ʿalayhim','contre eux','عَلَى + هِمْ'],['وَلَا','wa-lā','ni','وَ + لَا'],['الضَّالِّينَ','aḍ-ḍāllīna','les égarés','Pluriel de ضَالّ « égaré »']]}
  ]},
{ id:'ikhlas', num:112, name:'Al-Ikhlâs', ar:'الإِخْلَاص', fr:'Le Monothéisme pur', lieu:'Mecquoise',
  intro:'Elle résume l’unicité d’Allah ; le Prophète ﷺ a dit qu’elle équivaut au tiers du Coran.',
  verses:[
  {ar:'قُلْ هُوَ اللَّهُ أَحَدٌ', tr:'qul huwa llāhu aḥad', fr:'Dis : Il est Allah, Unique.', w:[['قُلْ','qul','dis','Impératif de قَالَ « dire »'],['هُوَ','huwa','Il','Pronom (leçon 3 !)'],['اللَّهُ','llāhu','Allah',''],['أَحَدٌ','aḥadun','Unique','Un, sans pareil']]},
  {ar:'اللَّهُ الصَّمَدُ', tr:'allāhu ṣ-ṣamad', fr:'Allah, Celui vers qui l’on se tourne en tout besoin.', w:[['اللَّهُ','allāhu','Allah',''],['الصَّمَدُ','aṣ-ṣamadu','l’Absolu, le Soutien universel','Celui dont tous ont besoin et qui n’a besoin de personne']]},
  {ar:'لَمْ يَلِدْ وَلَمْ يُولَدْ', tr:'lam yalid wa-lam yūlad', fr:'Il n’a pas engendré et n’a pas été engendré.', w:[['لَمْ','lam','ne… pas','Négation du passé (avec le présent)'],['يَلِدْ','yalid','Il a engendré','Racine و ل د'],['وَلَمْ','wa-lam','et ne… pas',''],['يُولَدْ','yūlad','Il a été engendré','Forme passive']]},
  {ar:'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', tr:'wa-lam yakun lahū kufuwan aḥad', fr:'Et nul n’est égal à Lui.', w:[['وَلَمْ','wa-lam','et ne… pas',''],['يَكُن','yakun','il est','Verbe كَانَ « être »'],['لَّهُ','lahū','à Lui','لِـ + هُ'],['كُفُوًا','kufuwan','égal','Équivalent, semblable'],['أَحَدٌ','aḥadun','quiconque','']]}
  ]},
{ id:'falaq', num:113, name:'Al-Falaq', ar:'الفَلَق', fr:'L’Aube naissante', lieu:'Mecquoise',
  intro:'Demande de protection contre les maux extérieurs. Avec An-Nâs, on les appelle « al-muʿawwidhatayn ».',
  verses:[
  {ar:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', tr:'qul aʿūdhu bi-rabbi l-falaq', fr:'Dis : Je cherche protection auprès du Seigneur de l’aube naissante,', w:[['قُلْ','qul','dis',''],['أَعُوذُ','aʿūdhu','je cherche protection','Racine ع و ذ'],['بِرَبِّ','bi-rabbi','auprès du Seigneur','بِـ + رَبّ'],['الْفَلَقِ','al-falaqi','de l’aube','Litt. « ce qui se fend » : l’aube qui perce la nuit']]},
  {ar:'مِن شَرِّ مَا خَلَقَ', tr:'min sharri mā khalaq', fr:'contre le mal de ce qu’Il a créé,', w:[['مِن','min','contre, de',''],['شَرِّ','sharri','le mal',''],['مَا','mā','ce que','Relatif'],['خَلَقَ','khalaqa','Il a créé','Racine خ ل ق']]},
  {ar:'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', tr:'wa-min sharri ghāsiqin idhā waqab', fr:'contre le mal de l’obscurité quand elle s’étend,', w:[['وَمِن','wa-min','et contre',''],['شَرِّ','sharri','le mal',''],['غَاسِقٍ','ghāsiqin','l’obscurité (de la nuit)',''],['إِذَا','idhā','quand',''],['وَقَبَ','waqaba','elle s’étend','Elle envahit tout']]},
  {ar:'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', tr:'wa-min sharri n-naffāthāti fi l-ʿuqad', fr:'contre le mal de celles qui soufflent sur les nœuds,', w:[['وَمِن','wa-min','et contre',''],['شَرِّ','sharri','le mal',''],['النَّفَّاثَاتِ','an-naffāthāti','celles qui soufflent','Allusion à la sorcellerie'],['فِي','fī','sur, dans',''],['الْعُقَدِ','al-ʿuqadi','les nœuds','Pluriel de عُقْدَة']]},
  {ar:'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', tr:'wa-min sharri ḥāsidin idhā ḥasad', fr:'et contre le mal de l’envieux quand il envie.', w:[['وَمِن','wa-min','et contre',''],['شَرِّ','sharri','le mal',''],['حَاسِدٍ','ḥāsidin','un envieux','Participe de حَسَدَ'],['إِذَا','idhā','quand',''],['حَسَدَ','ḥasada','il envie','']]}
  ]},
{ id:'nas', num:114, name:'An-Nâs', ar:'النَّاس', fr:'Les Hommes', lieu:'Mecquoise',
  intro:'Dernière sourate du Coran : protection contre le mal intérieur, les murmures qui égarent.',
  verses:[
  {ar:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', tr:'qul aʿūdhu bi-rabbi n-nās', fr:'Dis : Je cherche protection auprès du Seigneur des hommes,', w:[['قُلْ','qul','dis',''],['أَعُوذُ','aʿūdhu','je cherche protection',''],['بِرَبِّ','bi-rabbi','auprès du Seigneur',''],['النَّاسِ','an-nāsi','des hommes','Les gens, l’humanité']]},
  {ar:'مَلِكِ النَّاسِ', tr:'maliki n-nās', fr:'le Roi des hommes,', w:[['مَلِكِ','maliki','le Roi','Racine م ل ك'],['النَّاسِ','an-nāsi','des hommes','']]},
  {ar:'إِلَٰهِ النَّاسِ', tr:'ilāhi n-nās', fr:'le Dieu des hommes,', w:[['إِلَٰهِ','ilāhi','le Dieu','Celui qui seul mérite l’adoration'],['النَّاسِ','an-nāsi','des hommes','']]},
  {ar:'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', tr:'min sharri l-waswāsi l-khannās', fr:'contre le mal du tentateur furtif,', w:[['مِن','min','contre',''],['شَرِّ','sharri','le mal',''],['الْوَسْوَاسِ','al-waswāsi','celui qui murmure','Le tentateur qui souffle le mal'],['الْخَنَّاسِ','al-khannāsi','qui se dérobe','Il recule quand on invoque Allah']]},
  {ar:'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', tr:'alladhī yuwaswisu fī ṣudūri n-nās', fr:'qui souffle le mal dans les poitrines des hommes,', w:[['الَّذِي','alladhī','celui qui','Relatif singulier'],['يُوَسْوِسُ','yuwaswisu','murmure','Même racine que الْوَسْوَاس'],['فِي','fī','dans',''],['صُدُورِ','ṣudūri','les poitrines','Pluriel de صَدْر'],['النَّاسِ','an-nāsi','des hommes','']]},
  {ar:'مِنَ الْجِنَّةِ وَالنَّاسِ', tr:'mina l-jinnati wa-n-nās', fr:'qu’il soit des djinns ou des hommes.', w:[['مِنَ','mina','parmi',''],['الْجِنَّةِ','al-jinnati','les djinns',''],['وَالنَّاسِ','wa-n-nāsi','et les hommes','']]}
  ]},
{ id:'kawthar', num:108, name:'Al-Kawthar', ar:'الكَوْثَر', fr:'L’Abondance', lieu:'Mecquoise',
  intro:'La plus courte sourate du Coran : un réconfort adressé au Prophète ﷺ.',
  verses:[
  {ar:'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', tr:'innā aʿṭaynāka l-kawthar', fr:'Nous t’avons certes accordé l’Abondance.', w:[['إِنَّا','innā','certes Nous','إِنَّ + نَا'],['أَعْطَيْنَاكَ','aʿṭaynāka','Nous t’avons donné','أَعْطَى « donner » + نَا + كَ'],['الْكَوْثَرَ','al-kawthara','l’Abondance','Aussi le nom d’un fleuve du Paradis']]},
  {ar:'فَصَلِّ لِرَبِّكَ وَانْحَرْ', tr:'fa-ṣalli li-rabbika wa-nḥar', fr:'Prie donc ton Seigneur et sacrifie.', w:[['فَصَلِّ','fa-ṣalli','prie donc','فَـ « donc » + impératif de صَلَّى'],['لِرَبِّكَ','li-rabbika','pour ton Seigneur','لِـ + رَبّ + كَ (ton : leçon 7 !)'],['وَانْحَرْ','wa-nḥar','et sacrifie','Impératif de نَحَرَ']]},
  {ar:'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', tr:'inna shāni’aka huwa l-abtar', fr:'Celui qui te hait, c’est lui qui sera sans postérité.', w:[['إِنَّ','inna','certes',''],['شَانِئَكَ','shāni’aka','celui qui te hait','شَانِئ « haineux » + كَ'],['هُوَ','huwa','lui',''],['الْأَبْتَرُ','al-abtaru','sans postérité','Litt. « coupé »']]}
  ]},
{ id:'asr', num:103, name:'Al-ʿAsr', ar:'العَصْر', fr:'Le Temps', lieu:'Mecquoise',
  intro:'L’imam Ash-Shâfiʿî a dit que si les gens méditaient seulement cette sourate, elle leur suffirait.',
  verses:[
  {ar:'وَالْعَصْرِ', tr:'wa-l-ʿaṣr', fr:'Par le Temps !', w:[['وَالْعَصْرِ','wa-l-ʿaṣri','par le Temps','وَ de serment + الْعَصْر « le temps, l’après-midi »']]},
  {ar:'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', tr:'inna l-insāna la-fī khusr', fr:'L’homme est certes en perdition,', w:[['إِنَّ','inna','certes',''],['الْإِنسَانَ','al-insāna','l’homme','L’être humain'],['لَفِي','la-fī','assurément dans','لَـ d’insistance + فِي'],['خُسْرٍ','khusrin','une perte','Racine خ س ر']]},
  {ar:'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', tr:'illa lladhīna āmanū wa-ʿamilu ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr', fr:'sauf ceux qui croient, accomplissent les bonnes œuvres, s’enjoignent mutuellement la vérité et s’enjoignent mutuellement la patience.',
   w:[['إِلَّا','illā','sauf',''],['الَّذِينَ','alladhīna','ceux qui',''],['آمَنُوا','āmanū','ont cru','Racine أ م ن'],['وَعَمِلُوا','wa-ʿamilū','et ont accompli','Racine ع م ل'],['الصَّالِحَاتِ','aṣ-ṣāliḥāti','les bonnes œuvres',''],['وَتَوَاصَوْا','wa-tawāṣaw','et se sont recommandé','Forme VI : action réciproque'],['بِالْحَقِّ','bi-l-ḥaqqi','la vérité',''],['وَتَوَاصَوْا','wa-tawāṣaw','et se sont recommandé',''],['بِالصَّبْرِ','bi-ṣ-ṣabri','la patience','']]}
  ]}
];
