// Curated Finnish search terms — full list used as offline fallback
const words = [
    "karjalanpiirakka resepti",
    "helppo lohiresepti arki-iltaan",
    "perinteinen lihapullat resepti",
    "hernekeitto resepti kotitekoinen",
    "lettutaikina ohje",
    "kanakeitto resepti helppo",
    "kotitekoinen pizza taikina ohje",
    "borssikeitto resepti",
    "kalakukko resepti perinteinen",
    "ruisleipä kotitekoinen resepti",
    "poronkäristys perinteinen ohje",
    "silakkalaatikko resepti",
    "mansikkakakku resepti helppo",
    "mämmi resepti kotitekoinen",
    "saaristolaisleipä resepti",
    "mustikkapiiras ohje",
    "blini resepti helppo",
    "joulutorttu resepti",
    "piparkakkuohje jouluksi",
    "laskiaispullat resepti",
    "munkki resepti kotitekoinen",
    "marjarahka helppo jälkiruoka",
    "pannukakku resepti uunissa",
    "mojakka resepti suomalainen",
    "kaalikääryleet resepti helppo",
    "makaronilaatikko resepti klassinen",
    "jauheliha-perunavuoka ohje",
    "broileri-sitruunayrtit uunissa",
    "kalakeitto resepti helppo",
    "porkkanamurekepihvi kasvisruoka",
    "helppo arkiruoka perheelle",
    "nopea pasta arki-iltaan",
    "smoothie resepti marjoilla",
    "kaura-aamiaisresepti terveellinen",
    "granola ohje kotitekoinen",
    "raparperikiisseli resepti",
    "puolukkasurvos ohje",
    "tyrni mehujuoma resepti",
    "glögi resepti kotitekoinen jouluksi",
    "sima resepti vapuksi",
    "kotikalja ohje",
    "kahvikakku helppo ohje",
    "suklaakakku syntymäpäiväksi",
    "ohukaiset resepti",
    "riisipuuro resepti joulu",
    "tortut joulupöytään helppo",
    "savustettu lohi itse kotona",
    "sienikeitto resepti syksy",
    "juureslohi uunissa ohje",
    "kasvissosekeitto helppo talvi",
    "paras kahvila Helsinki",
    "parhaat ravintolat Tampere",
    "sushiravintola Turku suositukset",
    "vegaaniravintola Helsinki parhaat",
    "pizzeria suositukset Oulu",
    "hampurilaisravintola Helsinki paras",
    "aamiaispaikka Helsinki parhaat",
    "kahvila Rovaniemi suositukset",
    "fine dining Helsinki varaus",
    "pikaruoka Helsinki terveellinen vaihtoehto",
    "sää huomenna Helsinki",
    "viikon sääennuste Tampere",
    "talvisää Lappi 2025",
    "kesäsää ennuste Suomi",
    "ukkonen varoitukset tänään",
    "lumi ennuste Helsinki talvi",
    "aurinkoinen sää viikonloppu",
    "sadeennuste Turku tällä viikolla",
    "päänsärky luontaishoito kotikonstein",
    "hyvä unirytmi vinkit",
    "stressi oireet ja hoito",
    "selkäkipu hoito kotikonstein",
    "vastustuskyky parantaminen luontaisesti",
    "meditaatio aloittelijoille ohje",
    "jooga kotona aloittelijat",
    "venyttely aamulla rutiini",
    "juominen vesi terveyshyödyt",
    "ravitsemus perusteet terveellinen syöminen",
    "vitamiinit talvella suositukset",
    "d-vitamiini annos suomalaiset",
    "unen parantaminen keinot",
    "ahdistus luontaishoito keinot",
    "masennus oireet ja hoito",
    "uupumus palautuminen vinkit",
    "kuntosali aloittelijoille ohje",
    "kävely terveyshyödyt päivittäin",
    "pyöräily hyödyt terveys",
    "juoksuharjoitukset aloittelijalle ohjelma",
    "hiit-treeni kotona ohje",
    "kehonpainoharjoittelu ohjelma",
    "painonhallinta vinkit arjessa",
    "kolesteroli alentaminen ruokavaliolla",
    "verenpaine alentaminen luonnollisesti",
    "diabetes ennaltaehkäisy elintavat",
    "hampaiden hoito kotona",
    "ihon hoito talvella kuiva iho",
    "luontaistuotteet flunssan hoitoon",
    "akupunktio hyödyt ja hinta",
    "jääkiekon MM-kisat 2025 ohjelma",
    "Leijonat otteluohjelma 2025",
    "Veikkausliiga otteluohjelma",
    "HJK Helsinki ottelut",
    "TPS Turku jääkiekko tulokset",
    "Formula 1 2025 kausi tulokset",
    "Kimi Räikkönen ura",
    "Valtteri Bottas F1 2025",
    "yleisurheilun SM-kisat 2025",
    "suomalaiset urheilijat olympialaiset",
    "pesäpallo SM-liiga ohjelma",
    "koripallo liiga tulokset",
    "lentopalloliiga SM-finaali",
    "hiihto MM-kisat 2025",
    "mäkihyppy maailmancup 2025",
    "Iivo Niskanen kilpailuohjelma",
    "rinteessä laskettelu parhaat rinteet Suomi",
    "triatlon Suomi kilpailukalenteri",
    "maratonjuoksu Helsinki kaupunkimaraton",
    "uimahalli Helsinki hinnat aukioloajat",
    "kuntosali Helsinki edullisin",
    "golf kentät Suomi parhaat",
    "tennis harrastus Helsinki kurssit",
    "sulkapallo harrastaminen aloittelijat",
    "jalkapallo junioriharjoitukset Helsinki",
    "snooker SM-kisat 2025",
    "ralli MM-sarja Finland 2025",
    "paras puhelin 2025 hinta-laatu",
    "iPhone vs Samsung vertailu 2025",
    "kannettava tietokone alle 600 euroa",
    "tietokoneen puhdistus vinkit",
    "nopein internet operaattori Suomi",
    "vpn palvelu suositukset 2025",
    "antivirus ohjelma ilmainen paras",
    "windows 11 päivitys ohje",
    "älytelevisio parhaat mallit 2025",
    "kuulokkeet langattomat parhaat alle 100e",
    "pelikonsoli PS5 vai Xbox vertailu",
    "uudet pelit PS5 2025",
    "Nintendo Switch pelit parhaat",
    "tekoäly chatgpt käyttö arjessa",
    "tekoäly kuva generaattori ilmainen",
    "some algoritmi miten toimii",
    "tietoturva vinkit kotikäyttäjälle",
    "salasana hallinta paras ohjelma",
    "pilvipalvelu ilmainen tallennustila",
    "youtube premium kannattaako",
    "spotify vs apple music vertailu",
    "netflix parhaat sarjat 2025",
    "disney plus suomi sarjat",
    "hbo max suositukset 2025",
    "yle areena parhaat ohjelmat",
    "podcast suomi paras 2025",
    "älykello suositukset 2025 paras",
    "robotti imuri suositus hinta",
    "kodin älylaitteet aloituspaketti",
    "aurinkopaneeli kotiin hinta 2025",
    "parhaat vaellusreitit Suomessa",
    "Karhunkierros vaellusreitti ohje",
    "UKK-puisto vaeltaminen opas",
    "Nuuksio kansallispuisto retkeily",
    "Pallas-Yllästunturi talvivaellus",
    "retkipaikka vinkit Suomi",
    "marjastus vinkit aloittelijoille",
    "mustikka poimintapaikat Uusimaa",
    "puolukat milloin kypsyvät",
    "kantarelli tunnistus ohje",
    "herkkutatti löytöpaikat syksy",
    "karhun kohtaaminen metsässä ohje",
    "hirvieläimet tunnistaminen Suomi",
    "lintujen bongaus aloittelijoille",
    "talitintti siemenet pihalle",
    "lintulaudat parhaat kotiin",
    "kalastus luvat Suomi",
    "pilkkiminen aloittelijoille ohje",
    "heittokalastus tekniikka opas",
    "hauen kalastus parhaat paikat",
    "ahvenen pilkki talvella",
    "jokiravustus Suomi luvat",
    "metsästys luvat Suomi 2025",
    "hirven metsästys kausi Suomi",
    "kotipuutarha aloitus vinkit",
    "omenapuu istutus kotipuutarha",
    "marjapensaat kotipuutarhaan",
    "kompostointi kotona ohje helppo",
    "kierrätys Helsinki ohjeet 2025",
    "halvat lennot Eurooppaan Suomesta",
    "Lapin matkailu talvella",
    "Rovaniemi joulu matka",
    "Levi laskettelukeskus ohjelma",
    "Ruka talviloma pakettimatka",
    "Tallinna risteily hinnat 2025",
    "Tukholma päivämatka laivalla",
    "Viro matkailu vinkit",
    "Kreikka kesäloma 2025 halvat",
    "Kanariasaaret talviloma hinnat",
    "Thaimaa matka tammi-helmikuu",
    "Dubai matka 2025 tarjoukset",
    "Rooma matka vinkit nähtävyydet",
    "Barcelona matkailu viikko",
    "Amsterdam vinkit viikonloppu",
    "Pariisi lennot Helsinki alle 200",
    "Lontoo matkabudjetti vinkit",
    "Praha halpa kaupunkiloma",
    "Budapest matkailu parhaat vinkit",
    "Krakova matka halpa kaupunkiloma",
    "Islanti matka 2025 kokemuksia",
    "Norja vuonoristely kesä 2025",
    "Suomi mökkivuokraus kesä 2025",
    "järvimaisema mökki Saimaa vuokraus",
    "Åland matkailu kesä vinkit",
    "Helsinki nähtävyydet kesämatkailu",
    "Turku kaupunkikierros vinkit",
    "Tampere matkailu talvi vinkit",
    "Porvoo päiväretki Helsinki",
    "Savonlinna kesäloma ooppera",
    "suomalaiset elokuvat 2025",
    "Aki Kaurismäki uusin elokuva",
    "suomalainen teatteri parhaat 2025",
    "Kansallisteatteri ohjelma 2025",
    "Tampereen teatteri kesä 2025",
    "Savonlinnan oopperajuhlat ohjelma",
    "Ruisrock ohjelma 2025",
    "Flow Festival 2025 ohjelma",
    "Provinssirock 2025 esiintyjät",
    "Ilosaarirock ohjelma 2025",
    "Pori Jazz 2025 ohjelma",
    "suomalaiset artistit 2025 uudet",
    "Haloo Helsinki uusi albumi",
    "Nightwish keikka 2025",
    "HIM Ville Valo paluu 2025",
    "Tarja Turunen keikkakalenteri",
    "Poets of the Fall uusi musiikki",
    "Apulanta keikkajulkistus 2025",
    "suomalainen rap lista 2025",
    "Yle Radio Suomi soittolista",
    "kirja suositus suomeksi 2025",
    "suomalainen kirjailija uusi kirja",
    "Sofi Oksanen uusin kirja",
    "Tove Jansson muumit historia",
    "suomalainen sarjakuva parhaat",
    "suomalainen stand-up 2025 lippuja",
    "Yle Areena dokumentit",
    "Suomi-elokuva klassikot lista",
    "suomalainen musiikki Spotify lista",
    "MTV3 ohjelmat tällä viikolla",
    "asunnon haku Helsinki 2025",
    "vuokra-asunto Tampere halvat",
    "omakotitalon ostaminen vinkit",
    "asuntolaina korko 2025 Suomi",
    "kodin remontti budjetti vinkit",
    "kylpyhuone remontti hinta arvio",
    "keittiö remontti edullisesti",
    "ikkunaremontti hinta Suomi",
    "lämmitysjärjestelmä vertailu 2025",
    "maalämpö asennus hinta",
    "ilmalämpöpumppu paras 2025",
    "aurinkopaneeli koti asennus",
    "taloyhtiön remontti oikeudet",
    "vuokranantajan velvollisuudet Suomi",
    "vuokralaisen oikeudet Suomi 2025",
    "kodin sisustus ideat 2025",
    "olohuone sisustus pienen budjetin",
    "makuuhuone sisustus minimalistinen",
    "lastenhuone ideat leikki-ikäisille",
    "terassi rakentaminen itse ohje",
    "piha suunnittelu ideat",
    "puutarha aitaus itse tekeminen",
    "puuvaja rakennus itse",
    "talvipuutarha Suomi vinkit",
    "kodin järjestäminen KonMari metodi",
    "verotus 2025 muutokset Suomi",
    "veroilmoitus täyttäminen ohje",
    "veronpalautus milloin maksetaan 2025",
    "sijoittaminen aloittelijoille Suomi",
    "osakesijoittaminen perusteet",
    "indeksirahasto paras 2025",
    "asuntolaina hakeminen ohje",
    "säästäminen vinkit arki",
    "budjetti hallinta perheelle",
    "eläkesäästäminen aloittaminen",
    "kelan etuudet 2025 lista",
    "työttömyystuki hakeminen ohje",
    "sairauspäiväraha hakeminen",
    "vanhempainvapaa korvaukset 2025",
    "lapsilisä summa 2025",
    "opintotuki 2025 muutokset",
    "kulutusluotto vertailu paras",
    "pikavippi vaarat ja riskit",
    "vakuutus tarjoukset vertailu",
    "kotivakuutus kattavuus vertailu",
    "autovakuutus vertailu 2025",
    "henkivakuutus tarve arvio",
    "sähkölasku alentaminen vinkit",
    "energiatuki 2025 hakeminen",
    "ruokabudjetti alentaminen vinkit",
    "auto ostaminen vinkit käytetty",
    "käytetty auto vertailu sivustot",
    "sähköauto suositukset 2025",
    "Toyota vs Volkswagen vertailu",
    "rengasvaihto milloin tehdä",
    "talvirenkaat laki Suomi",
    "auton katsastus hinta Helsinki",
    "auton huolto itse vinkit",
    "ajokoe läpäiseminen vinkit",
    "GPS navigaattori paras 2025",
    "bensahinnat Suomi tänään",
    "sähköauto lataus kotiin asennus",
    "julkinen liikenne Helsinki hintoja",
    "HSL liput lataus sovellus",
    "juna Helsinki Tampere aikataulu",
    "VR junaliput halvat vinkit",
    "lentokenttä Helsinki parkkipaikka",
    "Finavia lentoasema palvelut",
    "pyöräily kaupungissa turvallisuus",
    "sähköpyörä suositukset 2025",
    "koiran koulutus vinkit aloittelijat",
    "koiran ruokinta paras ruoka",
    "kissanpennun hankinta vinkit",
    "lemmikkikoira rodut perheelle",
    "koiranpentu kasvatus ohjeet",
    "kissa rokotukset aikataulu",
    "eläinlääkäri Helsinki edullinen",
    "akvaario aloittaminen ohje",
    "kanit lemmikkeinä hoito ohjeet",
    "hamsterin hoito perusohjeet",
    "lintu lemmikkinä kasvatus",
    "hevonen ratsastus aloittelijat",
    "yliopisto hakeminen Suomi 2025",
    "ammattikoulu hakeminen ohje",
    "lukio vs ammattikoulu vertailu",
    "avoimen yliopiston kurssit ilmaiset",
    "suomen kielen kurssi ulkomaalaisille",
    "englanti kielen kurssi aikuisille",
    "espanja kurssi verkossa ilmainen",
    "ohjelmointi kurssi aloittelijoille",
    "data-analyysi opiskelu ilmaiset kurssit",
    "markkinointi koulutus verkossa",
    "valokuvauskurssi Helsinki 2025",
    "kokkikurssi Helsinki ilmoittautuminen",
    "keramiikka kurssi Tampere",
    "kiipeilykurssi aloittelijoille Helsinki",
    "tanssi kurssit Helsinki 2025",
    "musiikki teorian opiskelu verkossa",
    "kitaran soitto aloittelijat verkossa",
    "pianon soitto aloittaa aikuisena",
    "matemaattinen ajattelu harjoitukset",
    "muistitekniikat opiskeluun",
    "työnhaku vinkit 2025",
    "CV kirjoittaminen malli",
    "työhaastatteluun valmistautuminen",
    "etätyö vinkit tuottavuus",
    "freelancer töiden aloittaminen Suomi",
    "yrityksen perustaminen Suomi 2025",
    "toiminimi perustaminen ohjeet",
    "osakeyhtiö perustaminen vaatimukset",
    "yrittäjän verotus Suomessa",
    "työsopimus tärkeät kohdat",
    "irtisanominen oikeudet Suomi",
    "äitiysloma oikeudet Suomi",
    "isyysvapaa 2025 Suomi",
    "työkyvyttömyyseläke hakeminen",
    "LinkedIn profiili vinkit",
    "somemarkkinointi yrittäjälle",
    "yrityksen kotisivu wordpress ohje",
    "verkkokauppa perustaminen Suomi",
    "dropshipping Suomi kokemuksia",
    "sijoitusasunto tuotto laskeminen",
    "lastenhoito vinkit vauva",
    "imetysongelmat ratkaisut",
    "vauvan nukkuminen vinkit",
    "leikki-ikäisen ruoka vinkit",
    "lasten lelut 3-vuotiaalle",
    "koulu alkaminen vinkit eka luokka",
    "lasten harrastukset Helsinki",
    "lasten jalkapallo Helsinki kurssit",
    "päivähoito haku Helsinki ohje",
    "päiväkodin valinta vinkit",
    "kesäleiri lapset Suomi 2025",
    "syntymäpäiväjuhlat lapsille ideat",
    "lasten kirjasuositukset eri ikäryhmät",
    "lastenlaulut suomeksi karaoke",
    "lasten elokuvat 2025 parhaat",
    "trendikkäät vaatteet 2025 naiset",
    "miesten pukeutumisvinkit 2025",
    "talvivaatteet parhaat merkit",
    "kasvojenhoito rutiini aloittelijat",
    "hiustenhoito vinkit kuivat hiukset",
    "parranajo vinkit aloittelijat",
    "meikki aloituspakkaus mitä tarvitaan",
    "vaatteiden säilytys vinkit",
    "kirpputori Helsinki parhaat",
    "second hand verkkokauppa Suomi",
    "Suomen historia lyhyesti",
    "talvisota tapahtumat",
    "jatkosota faktat",
    "Suomen itsenäistyminen taustat",
    "mannerheim elämäkerta",
    "suomalaiset keksinnöt maailmankuulut",
    "Nokia matkapuhelin historia",
    "Finlandia-talo Alvar Aalto",
    "saunakulttuuri Suomessa historia",
    "suomalainen mytologia tarusto",
    "Kalevala tarina lyhyesti",
    "muinainen Suomi esihistoria",
    "suomalaiset sananlaskut merkitykset",
    "suomen murrealueet esimerkit",
    "ruotsinkielinen Suomi historia",
    "ilmastonmuutos Suomi vaikutukset",
    "hiilijalanjälki pienentäminen arjessa",
    "vegaaninen ruokavalio ympäristöhyödyt",
    "kestävä kehitys arjessa",
    "kierrätys Helsinki ohjeet",
    "kompostointi kerrostalo ohje",
    "sähköauto ympäristöhyödyt",
    "aurinkopaneeli kotiin kannattavuus",
    "veden säästäminen vinkit",
    "energiansäästö kodit vinkit",
    "luomuviljely hyödyt",
    "lähiruoka edut ympäristölle",
    "muovijäte vähentäminen keinot",
    "kestävä matkailu vinkit",
    "Suomen politiikka 2025 uutiset",
    "eduskuntavaalit Suomi tulokset",
    "hallitusohjelman muutokset 2025",
    "Nato Suomi jäsenyys vaikutukset",
    "ukrainan sota tilanne 2025",
    "maailmantalous ennuste 2025",
    "inflaatio Suomi 2025",
    "korot asuntolaina 2025 ennuste",
    "sähkönhinta Suomi 2025",
    "ruoan hinta nousu Suomi",
    "EU politiikka ajankohtainen",
    "Suomi EU-puheenjohtajuus",
    "mindfulness aloittelijat ohje",
    "burnout oireet ja hoito",
    "yksinäisyys voittaminen vinkit",
    "parisuhde ongelmat ratkaisut",
    "avioero prosessi Suomi",
    "lasten mielenterveys vinkit",
    "psykoterapia hakeminen Suomi",
    "Kela mielenterveyspalvelut",
    "päihderiippuvuus hoito Suomi",
    "nukkumishäiriö lääkkeetön hoito",
    "krooninen kipu hallinta",
    "tekoäly työn muuttuminen 2025",
    "chatgpt käyttö opiskeluun",
    "some riippuvuus vähentäminen",
    "lapset ja some turvallisuus",
    "tietosuoja omat tiedot",
    "gdpr oikeudet kuluttaja",
    "digipalvelut ikäihmisille",
    "pankkipalvelut verkossa ohjeet",
    "nettipankki ongelmia ratkaisut",
    "verkkorikollisuus suojautuminen",
    "phishing tunnistaminen ohjeet",
    "luottotiedot tarkistaminen ilmaiseksi",
    "padel harrastukset Helsinki",
    "kiipeily sisäseinä Helsinki",
    "uinti harrastuksena aikuiset",
    "jousiammunta harrastus aloitus",
    "jäähockey harrastus lapsille",
    "luistelu radut Helsinki talvi",
    "suksi huolto itse ohje",
    "pyörän huolto itse keväällä",
    "melonta järvellä aloittelijat",
    "surffaus Suomessa mahdollista",
    "kamppailulajit Helsinki kurssit",
    "nyrkkeily harrastus aloittelijat",
    "sulkapallo kenttä Helsinki varaus",
    "beach volley Helsinki kesä",
    "discgolf radat Helsinki ilmaiset",
    "shakki oppiminen aloittelijoille",
    "lautapelit suositukset perheelle 2025",
    "videopelaaminen harrastuksena hyödyt",
    "piirtäminen opiskelu aikuisena",
    "valokuvaus harrastus aloitus",
    "akvarelli maalaus aloittelijoille",
    "käsityöt virkkailu ohjeet",
    "neulominen aloittelijoille helppo",
    "kirjonta ohje aloittelijoille",
    "puukäsityöt kotona aloittelijat",
    "elektroniikka tee itse aloittelijat",
    "3d tulostus kotikäyttö ohje",
    "passin uusiminen Helsinki ohjeet",
    "ajokortin uusiminen prosessi",
    "muuttoilmoitus rekisteröinti ohje",
    "väestörekisteri Suomi palvelut",
    "suomen kansalaisuus hakeminen",
    "oleskelulupa Suomi hakeminen",
    "kotouttaminen Suomi tukipalvelut",
    "kirjasto Helsinki aukioloajat",
    "kaupungintalo Helsinki palvelut",
    "sosiaalipalvelut Suomi hakeminen",
    "isännöitsijä velvollisuudet",
    "taloyhtiö kokous oikeudet",
    "naapurusto riidat ratkaisu",
    "ravintola arvostelu Helsinki paras",
    "ruokailu lapsiperheelle Helsinki",
    "kasvisravintola Turku suositukset",
    "lounasravintola halvat Helsinki",
    "sushiravintola Helsinki top 5",
    "pikaruoka terveellinen vaihtoehto",
    "takeaway ruoka Helsinki tilaus",
    "ruokakauppa tarjoukset vertailu",
    "elintarvikekauppa verkkokauppa",
    "ruoanlaiton opetus verkossa",
    "ralliauto Suomi harrastus",
    "kartinki harrastus aloittelijat",
    "moottoripyörä ajokortti ohje",
    "skootteri luvat Suomi",
    "mopoauto ikäraja Suomi",
    "veneen ajo-oikeus kurssi",
    "lentokone opiskelu PPL lisenssi",
    "joulukalenteri ideat lapsille",
    "pääsiäinen perinteet Suomessa",
    "midsommar juhannusperinteet",
    "itsenäisyyspäivä ohjelma 2025",
    "vappu Helsinki ohjelma",
    "halloween koristelu ideat",
    "uusivuosi Helsinki ohjelma",
    "suomalainen häätapa perinteet",
    "rippijuhla perinteet Suomi",
    "hautajaisten järjestely ohje",
    "lasten nimipäivä ideat",
    "mummo ja vaari joululahja ideat",
    "isänpäivä lahja ideat",
    "äitienpäivä lahja ideat",
    "ystävänpäivä lahja ideat",
    "joululahja mies ideat",
    "joululahja nainen ideat",
    "syntymäpäiväjuhla ideat aikuiset",
    "teemajuhla ideat aikuiset",
    "häät suunnittelu aloitus",
    "suomen kieli oppiminen perusasiat",
    "suomen murre esimerkit",
    "ruotsin opiskelu suomalaisille",
    "ranskan kurssi verkossa",
    "venäjän perussanat opiskelu",
    "japani kielen opiskelu",
    "mandariinikiina oppiminen",
    "italialainen ruoka autenttiset reseptit",
    "kreikkalainen ruoka perinteinen",
    "japanilainen ruoka sushi kotona",
    "thairuoka kokkailu kotona",
    "intialainen ruoka curry resepti",
    "meksikolainen ruoka tacos resepti",
    "amerikkalainen BBQ liha kotona",
    "välimeren dieetti suomalaisille",
    "pohjoismainen ruokavalio ohjeet",
    "ketogeeninen ruokavalio aloitus",
    "intermittent fasting aloittelijoille",
    "kasvispohjainen ruokavalio siirtyminen",
    "gluteeniton leivonta vinkit",
    "laktoositon ruoka ideat",
    "allergia reseptit helppo",
    "kvanttitietokone ymmärtäminen",
    "geeniteknologia etiikka",
    "avaruustutkimus 2025 uutuudet",
    "Mars matka suunnitelmat",
    "ydinvoima Suomi 2025",
    "Olkiluoto 3 sähköntuotanto",
    "uusiutuva energia Suomi",
    "vetytalous tulevaisuus Suomi",
    "ilmastotutkimus Suomi",
    "biodiversiteetti uhkat Suomi",
    "kela korvaukset lääkkeet",
    "lääkärin vastaanotto ajanvaraus",
    "hammaslääkäri maksuton Suomi",
    "silmälääkäri korvaus Kela",
    "terveysasema Helsinki lähimmät",
    "päivystys Helsinki aukioloajat",
    "apteekki Helsinki yöpäivystys",
    "resepti uusiminen sähköinen",
    "Omaolo oireet arviointi",
    "rokotteet aikuiset Suomi",
    "lukion ainevalinnat vinkit",
    "ylioppilaskirjoitukset valmistautuminen",
    "yliopisto opinnot rahoitus",
    "opiskelijaruokailu Helsinki edullinen",
    "opiskelijaasunto Helsinki haku",
    "stipendi opiskelijoille Suomi",
    "harjoittelu opiskelijoille Suomi",
    "vaihto-opiskelija ohjelmat",
    "Erasmus ohjelma hakeminen",
    "yliopistoranking Suomi 2025",
    "digitaalinen taide aloittelijoille",
    "valokuvaus muotokuva vinkit",
    "landscape valokuvaus Suomi",
    "kirjoittaminen luovuus harjoituksia",
    "runojen kirjoittaminen ohje",
    "blogin kirjoittaminen aloitus",
    "podcastin tekeminen aloittelijoille",
    "YouTube kanavan aloittaminen",
    "instagram sisältö ideat",
    "tiktok videoiden tekeminen ohje",
    "kryptovaluutat sijoittaminen riskit",
    "bitcoin historia ja hinta",
    "osakekurssit tänään Suomi",
    "rahasto sijoittaminen perusteet",
    "kiinteistösijoittaminen Suomi",
    "metsä sijoituksena tuotto",
    "talletustili korko vertailu",
    "laina vertailu halvat korot",
    "maksuhäiriömerkintä poistuminen",
    "konkurssi henkilö prosessi",
    "suomalainen design merkit",
    "iittala tuotteet hinnasto",
    "marimekko historia brändi",
    "arabiahelsinki keräilyastiat",
    "puukko perinteinen suomalainen",
    "taide hankinnat kotiin vinkit",
    "taidemuseo Helsinki ilmaiseen aikaan",
    "Kiasma Helsinki näyttely 2025",
    "Ateneum näyttely 2025",
    "HAM Helsinki taide 2025",
    "arkkitehtuuri Helsinki kierros",
    "Uspenski katedraali historia",
    "Tuomiokirkko Helsinki historia",
    "Suomenlinna kierros ohjeet",
    "Seurasaari ulkomuseo Helsinki",
    "Heureka tiedekeskus Helsinki",
    "Linnanmäki Helsinki 2025 ohjelma",
    "Särkänniemi Tampere 2025",
    "Muumimaailma Naantali 2025",
    "bussikortti lataaminen Helsinki",
    "metro Helsinki linjat kartta",
    "kaupunkipyörä Helsinki hinnat",
    "taksihinta Helsinki arvio",
    "Uber Suomi tilaus ohje",
    "sähköpotkulauta Helsinki 2025",
    "parkkipaikka Helsinki edullinen",
    "autolautta Tallinna hinnat",
    "Fazer suklaa historia",
    "Hartwall jääkarhu historia",
    "Olvi olut Suomi",
    "Atria liha tuotteet",
    "Valio maitotuotteet",
    "HK tuotteet suomalaiset",
    "Fiskars sakset historia",
    "Hackman keittiövälineet",
    "Rapala vieheet kalastus",
    "KONE hissi historia Suomi",
    "Wärtsilä yritys Suomi",
    "Neste öljy yhtiö Suomi",
    "Fortum energia Suomi",
    "Fingrid sähköverkko Suomi",
    "kuinka pestä villa vaate",
    "tahrojen poisto vaatteista",
    "kodin siivous nopeasti vinkit",
    "ikkunoiden pesu vinkit",
    "kakelien puhdistus helposti",
    "pyykin peseminen ohjeet",
    "viemärin aukaiseminen itse",
    "vesivuoto korjaus hätäapu",
    "sulake vaihto ohje",
    "lamppu vaihto LEDiin",
    "wifi nopeuden parantaminen",
    "tietokone hidastuminen korjaus",
    "puhelimen akku parantaminen",
    "näytön särkyminen korjaus",
    "auto akku lataaminen",
    "rengas puhki korjaus",
    "pyörä korjaus ketju",
    "hana tippuu korjaus itse",
    "minttu limonadi ohje kesä",
    "kotitekoinen limonadi ohje",
    "jääkahvi resepti kesä",
    "irish coffee resepti",
    "tee mausteinen chai ohje",
    "yrttitee oma kasvatus",
    "pakastemarjat käyttö talvella",
    "hiilen grillaus ohje aloittelijoille",
    "savustus kotona kalaresepti",
    "rabarberisurvos ohje perinteinen",
];

// Trending words cache duration: 1 hour
const TRENDS_CACHE_DURATION = 60 * 60 * 1000;
// Keep stale trend cache for fallback up to 7 days
const TRENDS_STALE_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
// Prevent selecting the same terms too frequently
const RECENT_TERMS_WINDOW = 12;
// Fallback retry delay (minutes) used when the schedule start time is unexpectedly missing
const SCHEDULE_FALLBACK_RETRY_MINUTES = 60;
// Curated fallback topics when online sources are unavailable
const QUALITY_FALLBACK_TOPICS = words.slice(0, 200);

const ALARM_NAME = "searchAlarm";
const AUTO_START_ALARM = "autoStartAlarm";
let trendingWordsCache = null;
let recentTerms = [];

// Configuration
const config = {
  bing: {
    url: "https://bing.com/search?q={q}&form={form}&cvid={cvid}",
    form: "QBRE",
  },
  devices: {
    phone: {
      title: "Samsung Galaxy S21",
      width: 360,
      height: 800,
      deviceScaleFactor: 3,
      userAgent:
        "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      touch: true,
      mobile: true,
    },
    desktop: {
      title: "Dell Xps 15",
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      touch: false,
      mobile: false,
    },
  },
  general: {
    authorWebsiteLinkThanks: [
      "https://andreacorriga.com/rewards-search-automator/thanks",
      "https://rawe-ceek.strifelab.com/",
    ],
  },
};

// State management - stored in memory, persisted for alarm callbacks
let searchState = {
  isRunning: false,
  currentSearch: 0,
  totalSearches: 0,
  tabId: null,
  searchType: null, // 'desktop', 'mobile', 'desktopMobile'
  phase: null, // 'desktop', 'mobile'
  millisecondsMin: 120000,
  millisecondsMax: 3600000,
  desktopSearches: 3,
  mobileSearches: 3,
  scheduleStartTime: "",
  scheduleEndTime: "",
};

// Save state to chrome.storage.local for persistence
async function saveState() {
  await chrome.storage.local.set({ searchState: searchState });
}

// Load state from chrome.storage.local
async function loadState() {
  const result = await chrome.storage.local.get("searchState");
  if (result.searchState) {
    searchState = result.searchState;
  }
}

// Helper functions
function normalizeTerms(terms) {
  if (!Array.isArray(terms)) return [];

  return [...new Set(
    terms
      .map((term) => (typeof term === "string" ? term.trim() : ""))
      .filter((term) => term.length > 2)
  )];
}

function parseBingTrendingFeed(feed) {
  if (!feed || !Array.isArray(feed.value)) return [];

  return normalizeTerms(
    feed.value.map((item) => {
      if (typeof item?.name === "string" && item.name.trim()) return item.name;
      if (typeof item?.query?.text === "string" && item.query.text.trim()) {
        return item.query.text;
      }
      return "";
    }),
  );
}

function pickLeastRecentTerm(pool) {
  if (!Array.isArray(pool) || pool.length === 0) {
    return QUALITY_FALLBACK_TOPICS[Math.floor(Math.random() * QUALITY_FALLBACK_TOPICS.length)];
  }

  const available = pool.filter((term) => !recentTerms.includes(term));
  const source = available.length > 0 ? available : pool;
  const selected = source[Math.floor(Math.random() * source.length)];

  recentTerms.push(selected);
  if (recentTerms.length > RECENT_TERMS_WINDOW) {
    recentTerms = recentTerms.slice(recentTerms.length - RECENT_TERMS_WINDOW);
  }

  return selected;
}

async function fetchGoogleTrendsTopics() {
  const response = await fetch(
    "https://trends.google.com/trends/trendingsearches/daily?geo=FI",
    { signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) throw new Error(`Google Trends HTTP ${response.status}`);

  const text = await response.text();
  // The endpoint wraps JSON in ")]}',\n" — strip that prefix if present
  const json = JSON.parse(text.replace(/^\)]\}',?\n/, ""));
  const trendingSearches =
    json?.default?.trendingSearchesDays?.[0]?.trendingSearches ?? [];
  const titles = trendingSearches.map(
    (item) => item?.title?.query ?? "",
  );
  const terms = normalizeTerms(titles);
  if (terms.length === 0) throw new Error("Google Trends returned no terms");

  return terms;
}

async function fetchYleNewsTopics() {
  const response = await fetch(
    "https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET",
    { signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) throw new Error(`Yle News RSS HTTP ${response.status}`);

  const xml = await response.text();
  const matches = [
    ...xml.matchAll(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/g),
  ];
  // Skip the first <title> which is the feed title itself
  const terms = normalizeTerms(matches.slice(1).map((m) => m[1]));
  if (terms.length === 0) throw new Error("Yle News returned no terms");

  return terms;
}

async function fetchWikipediaTrendingTopics() {
  const response = await fetch(
    "https://fi.wikipedia.org/w/api.php?action=query&list=mostviewed&pvimmetric=pageviews&format=json",
    { signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) throw new Error(`Wikipedia API HTTP ${response.status}`);

  const payload = await response.json();
  const pages = payload?.query?.mostviewed ?? [];
  const GENERIC_PAGES = new Set(["Etusivu", "Main Page", "Wikipedia:Etusivu"]);
  const titles = pages
    .map((page) => page?.title ?? "")
    .filter((title) => title && !GENERIC_PAGES.has(title));
  const terms = normalizeTerms(titles);
  if (terms.length === 0) throw new Error("Wikipedia returned no terms");

  return terms;
}

async function fetchBingTrendingTopics() {
  const response = await fetch("https://api.bing.com/osjson.aspx?query=", {
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Bing suggestions HTTP ${response.status}`);

  const payload = await response.json();
  const terms = normalizeTerms(Array.isArray(payload?.[1]) ? payload[1] : []);
  if (terms.length === 0) throw new Error("Bing suggestions returned no terms");

  return terms;
}

async function fetchBingNewsTopics() {
  const response = await fetch("https://www.bing.com/news/trendingtopics?form=Z9LH", {
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Bing News HTTP ${response.status}`);

  const payload = await response.json();
  const terms = parseBingTrendingFeed(payload);
  if (terms.length === 0) throw new Error("Bing news feed returned no terms");

  return terms;
}

// Fetch trending searches and cache for 1 hour.
// Source priority: Google Trends FI JSON → Yle News RSS → Bing News → Wikipedia FI → Bing suggestions.
// Fallback priority: fresh cache -> stale cache -> curated local topics.
async function fetchTrendingWords() {
  if (Array.isArray(trendingWordsCache) && trendingWordsCache.length > 0) {
    return trendingWordsCache;
  }

  const cached = await chrome.storage.local.get("trendingWordsCache");
  const entry = cached.trendingWordsCache;
  const hasCache =
    entry &&
    Array.isArray(entry.terms) &&
    typeof entry.timestamp === "number" &&
    entry.terms.length > 0;

  if (hasCache && Date.now() - entry.timestamp < TRENDS_CACHE_DURATION) {
    trendingWordsCache = entry.terms;
    return entry.terms;
  }

  const aggregated = [];

  const providers = [
    { name: "googleTrends", fetcher: fetchGoogleTrendsTopics },
    { name: "yleNews", fetcher: fetchYleNewsTopics },
    { name: "bingNews", fetcher: fetchBingNewsTopics },
    { name: "wikipediaTrending", fetcher: fetchWikipediaTrendingTopics },
    { name: "bingSuggestions", fetcher: fetchBingTrendingTopics },
  ];

  for (const provider of providers) {
    try {
      const terms = await provider.fetcher();
      aggregated.push(...terms);
      console.info(`Loaded ${terms.length} terms from ${provider.name}.`);
    } catch (error) {
      console.warn(`Trending provider ${provider.name} failed:`, error.message);
    }
  }

  const mergedTerms = normalizeTerms(aggregated);

  if (mergedTerms.length > 0) {
    trendingWordsCache = mergedTerms;
    await chrome.storage.local.set({
      trendingWordsCache: { terms: mergedTerms, timestamp: Date.now() },
    });
    return mergedTerms;
  }

  if (hasCache && Date.now() - entry.timestamp < TRENDS_STALE_CACHE_MAX_AGE) {
    console.warn("Using stale trending cache due to provider errors.");
    trendingWordsCache = entry.terms;
    return entry.terms;
  }

  console.warn("Using curated fallback topics due to unavailable trend providers.");
  trendingWordsCache = QUALITY_FALLBACK_TOPICS;
  return QUALITY_FALLBACK_TOPICS;
}

function getRandomSearchWord() {
  const pool =
    Array.isArray(trendingWordsCache) && trendingWordsCache.length > 0
      ? trendingWordsCache
      : QUALITY_FALLBACK_TOPICS;

  return pickLeastRecentTerm(pool);
}

function randomDelay() {
  return Math.floor(
    Math.random() *
      (parseInt(searchState.millisecondsMax) -
        parseInt(searchState.millisecondsMin) +
        1) +
      parseInt(searchState.millisecondsMin),
  );
}

// Return true if current local time is within the [startHHMM, endHHMM) window.
// If either value is empty/missing, the window is treated as unrestricted and
// the function always returns true (no schedule restriction).
// When start equals end (e.g. "12:00"/"12:00") the window is also treated as
// unrestricted (always returns true).
function isWithinSchedule(startHHMM, endHHMM) {
  if (!startHHMM || !endHHMM) return true;
  const now = new Date();
  const [startH, startM] = startHHMM.split(":").map(Number);
  const [endH, endM] = endHHMM.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = startH * 60 + startM;
  const end = endH * 60 + endM;
  if (start === end) {
    return true; // Same start and end — treat as no restriction
  }
  if (start < end) {
    return cur >= start && cur < end;
  }
  // Overnight window (e.g. 22:00–06:00)
  return cur >= start || cur < end;
}

// Minutes until the schedule window opens next.
// This function is only called after isWithinSchedule() returned false,
// which guarantees startHHMM is non-empty; the guard is purely defensive.
function minutesUntilScheduleStart(startHHMM) {
  if (!startHHMM) return SCHEDULE_FALLBACK_RETRY_MINUTES; // Defensive: retry after 1 hour
  const now = new Date();
  const [startH, startM] = startHHMM.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = startH * 60 + startM;
  let diff = start - cur;
  if (diff <= 0) diff += 24 * 60;
  return diff;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Returns today's local date as "YYYY-MM-DD"
function todayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Returns true if searches have already been completed today
async function hasCompletedToday() {
  const result = await chrome.storage.local.get("lastCompletedDate");
  return result.lastCompletedDate === todayDateString();
}

// (Re-)schedule the daily auto-start alarm from stored autoStartSettings.
// Clears the alarm when auto-start is disabled or no time is configured.
async function scheduleAutoStartAlarm() {
  const stored = await chrome.storage.local.get("autoStartSettings");
  const s = stored.autoStartSettings;

  if (!s || !s.enabled || !s.time) {
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }

  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(s.time)) {
    console.warn("Auto-start: invalid time format, expected HH:MM:", s.time);
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }

  const [h, m] = s.time.split(":").map(Number);
  if (h > 23 || m > 59) {
    console.warn("Auto-start: time value out of range:", s.time);
    chrome.alarms.clear(AUTO_START_ALARM);
    return;
  }
  const now = new Date();
  const target = new Date(now);
  target.setHours(h, m, 0, 0);

  // If the target time has already passed today, aim for tomorrow
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  // periodInMinutes keeps the alarm recurring daily without manual rescheduling
  chrome.alarms.create(AUTO_START_ALARM, {
    when: target.getTime(),
    periodInMinutes: 24 * 60,
  });
  console.log(`Auto-start alarm set for ${target.toLocaleTimeString()}.`);
}

async function getTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      var activeTabId = activeTab.id;
      resolve(activeTabId);
    });
  });
}

// Notify popup about state changes
function notifyPopup(message) {
  chrome.runtime.sendMessage(message).catch(() => {
    // Popup might be closed, ignore error
  });
}

// Enable debugger
async function enableDebugger(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.attach({ tabId }, "1.2", function () {
      console.log(`Debugger enabled for tab: ${tabId}`);
      resolve(true);
    });
  });
}

// Disable debugger
async function disableDebugger(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.detach({ tabId }, function () {
      console.log(`Debugger disabled for tab: ${tabId}`);
      resolve(true);
    });
  });
}

// Activate mobile user agent
async function activeMobileAgent(tabId) {
  return new Promise((resolve, reject) => {
    // First set the user agent override with full mobile hints
    chrome.debugger.sendCommand(
      {
        tabId: tabId,
      },
      "Network.setUserAgentOverride",
      {
        userAgent: config.devices.phone.userAgent,
        acceptLanguage: "en-US,en;q=0.9",
        platform: "Linux armv8l",
        userAgentMetadata: {
          brands: [
            { brand: "Google Chrome", version: "131" },
            { brand: "Chromium", version: "131" },
            { brand: "Not_A Brand", version: "24" },
          ],
          fullVersionList: [
            { brand: "Google Chrome", version: "131.0.0.0" },
            { brand: "Chromium", version: "131.0.0.0" },
            { brand: "Not_A Brand", version: "24.0.0.0" },
          ],
          platform: "Android",
          platformVersion: "13.0.0",
          architecture: "",
          model: "SM-S908B",
          mobile: true,
          bitness: "",
          wow64: false,
        },
      },
      function () {
        // Then set device metrics
        chrome.debugger.sendCommand(
          {
            tabId: tabId,
          },
          "Emulation.setDeviceMetricsOverride",
          {
            width: config.devices.phone.width,
            height: config.devices.phone.height,
            deviceScaleFactor: config.devices.phone.deviceScaleFactor,
            mobile: config.devices.phone.mobile,
            screenWidth: config.devices.phone.width,
            screenHeight: config.devices.phone.height,
            positionX: 0,
            positionY: 0,
            screenOrientation: { type: "portraitPrimary", angle: 0 },
          },
          function () {
            // Enable touch emulation
            chrome.debugger.sendCommand(
              {
                tabId: tabId,
              },
              "Emulation.setTouchEmulationEnabled",
              {
                enabled: true,
                maxTouchPoints: 5,
              },
              function () {
                resolve(true);
              },
            );
          },
        );
      },
    );
  });
}

// Activate desktop user agent
async function activeDesktopAgent(tabId) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(
      {
        tabId: tabId,
      },
      "Network.setUserAgentOverride",
      {
        userAgent: config.devices.desktop.userAgent,
        acceptLanguage: "en-US,en;q=0.9",
        platform: "Win32",
        userAgentMetadata: {
          brands: [
            { brand: "Google Chrome", version: "131" },
            { brand: "Chromium", version: "131" },
            { brand: "Not_A Brand", version: "24" },
          ],
          fullVersionList: [
            { brand: "Google Chrome", version: "131.0.0.0" },
            { brand: "Chromium", version: "131.0.0.0" },
            { brand: "Not_A Brand", version: "24.0.0.0" },
          ],
          platform: "Windows",
          platformVersion: "15.0.0",
          architecture: "x86",
          model: "",
          mobile: false,
          bitness: "64",
          wow64: false,
        },
      },
      function () {
        chrome.debugger.sendCommand(
          {
            tabId: tabId,
          },
          "Emulation.setDeviceMetricsOverride",
          {
            width: config.devices.desktop.width,
            height: config.devices.desktop.height,
            deviceScaleFactor: config.devices.desktop.deviceScaleFactor,
            mobile: config.devices.desktop.mobile,
            screenWidth: config.devices.desktop.width,
            screenHeight: config.devices.desktop.height,
          },
          function () {
            // Disable touch emulation
            chrome.debugger.sendCommand(
              {
                tabId: tabId,
              },
              "Emulation.setTouchEmulationEnabled",
              {
                enabled: false,
              },
              function () {
                resolve(true);
              },
            );
          },
        );
      },
    );
  });
}

// Open author website
function openAuthorWebsite() {
  const choice =
    Math.random() < 0.7
      ? config.general.authorWebsiteLinkThanks[0]
      : config.general.authorWebsiteLinkThanks[1];
  chrome.tabs.update(searchState.tabId, { url: choice });
}

// Perform a single search
async function performSingleSearch() {
  if (!searchState.isRunning) return;

  // If outside the allowed time window, defer until the window opens
  const { scheduleStartTime, scheduleEndTime } = searchState;
  if (!isWithinSchedule(scheduleStartTime, scheduleEndTime)) {
    const waitMinutes = minutesUntilScheduleStart(scheduleStartTime);
    console.log(
      `Outside schedule window. Next search in ${waitMinutes} minute(s) at ${scheduleStartTime}.`,
    );
    await saveState();
    chrome.alarms.create(ALARM_NAME, { delayInMinutes: waitMinutes });
    return;
  }

  const searchUrl = config.bing.url
    .replace("{q}", encodeURIComponent(getRandomSearchWord()))
    .replace("{form}", config.bing.form)
    .replace("{cvid}", "");

  console.log("Open new search at:", searchUrl);

  try {
    await chrome.tabs.update(searchState.tabId, { url: searchUrl });
  } catch (error) {
    console.error("Error updating tab:", error);
    stopSearches();
    return;
  }

  searchState.currentSearch++;
  const progress = parseInt(
    (searchState.currentSearch / searchState.totalSearches) * 100,
  );

  notifyPopup({
    type: "progress",
    progress: progress,
    currentSearch: searchState.currentSearch,
    totalSearches: searchState.totalSearches,
    phase: searchState.phase,
  });

  if (searchState.currentSearch < searchState.totalSearches) {
    // Schedule next search using chrome.alarms
    await saveState();
    const delayInMinutes = randomDelay() / 60000; // Convert ms to minutes
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: Math.max(delayInMinutes, 0.1),
    }); // Min 6 seconds
  } else {
    // Phase completed
    await handlePhaseComplete();
  }
}

// Handle phase completion
async function handlePhaseComplete() {
  if (searchState.searchType === "desktop") {
    // Desktop only completed
    await completeSearches();
  } else if (searchState.searchType === "mobile") {
    // Mobile only completed
    await activeDesktopAgent(searchState.tabId);
    await disableDebugger(searchState.tabId);
    await completeSearches();
  } else if (searchState.searchType === "desktopMobile") {
    if (searchState.phase === "desktop") {
      // Switch to mobile phase
      searchState.phase = "mobile";
      searchState.currentSearch = 0;
      searchState.totalSearches = searchState.mobileSearches;

      await enableDebugger(searchState.tabId);
      await activeMobileAgent(searchState.tabId);

      notifyPopup({
        type: "phaseChange",
        phase: "mobile",
        totalSearches: searchState.totalSearches,
      });

      // Start mobile searches using chrome.alarms
      await saveState();
      const delayInMinutes = randomDelay() / 60000;
      chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: Math.max(delayInMinutes, 0.1),
      });
    } else {
      // Mobile phase completed
      await activeDesktopAgent(searchState.tabId);
      await disableDebugger(searchState.tabId);
      await completeSearches();
    }
  }
}

// Complete all searches
async function completeSearches() {
  searchState.isRunning = false;
  openAuthorWebsite();

  // Record that searches were completed today so auto-start won't trigger again
  await chrome.storage.local.set({ lastCompletedDate: todayDateString() });

  notifyPopup({
    type: "complete",
  });

  // Reset state
  searchState = {
    ...searchState,
    isRunning: false,
    currentSearch: 0,
    totalSearches: 0,
    tabId: null,
    searchType: null,
    phase: null,
  };

  // Clear alarm and saved state
  chrome.alarms.clear(ALARM_NAME);
  await chrome.storage.local.remove("searchState");
}

// Stop searches
async function stopSearches() {
  searchState.isRunning = false;

  notifyPopup({
    type: "stopped",
  });

  // Try to disable debugger if active
  if (
    searchState.tabId &&
    (searchState.searchType === "mobile" ||
      (searchState.searchType === "desktopMobile" &&
        searchState.phase === "mobile"))
  ) {
    disableDebugger(searchState.tabId).catch(() => {});
  }

  searchState = {
    ...searchState,
    isRunning: false,
    currentSearch: 0,
    totalSearches: 0,
    tabId: null,
    searchType: null,
    phase: null,
  };

  // Clear alarm and saved state
  chrome.alarms.clear(ALARM_NAME);
  await chrome.storage.local.remove("searchState");
}

// Start searches
async function startSearches(type, settings) {
  if (searchState.isRunning) {
    return { success: false, error: "Searches already running" };
  }

  const tabId = await getTabId();

  searchState = {
    isRunning: true,
    currentSearch: 0,
    totalSearches:
      type === "mobile" ? settings.mobileSearches : settings.desktopSearches,
    tabId: tabId,
    searchType: type,
    phase: type === "mobile" ? "mobile" : "desktop",
    millisecondsMin: settings.millisecondsMin,
    millisecondsMax: settings.millisecondsMax,
    desktopSearches: settings.desktopSearches,
    mobileSearches: settings.mobileSearches,
    scheduleStartTime: settings.scheduleStartTime || "",
    scheduleEndTime: settings.scheduleEndTime || "",
  };

  // Initialize mobile mode if needed
  if (type === "mobile") {
    await enableDebugger(tabId);
    await activeMobileAgent(tabId);
  }

  // Fetch/refresh trending words before starting
  await fetchTrendingWords();

  // Save state and start the first search
  await saveState();
  performSingleSearch();

  return { success: true };
}

// Alarm listener - this fires even when popup is closed
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    await loadState();
    if (searchState.isRunning) {
      performSingleSearch();
    }
  }

  if (alarm.name === AUTO_START_ALARM) {
    // Skip if searches are already running
    if (searchState.isRunning) return;

    // Skip if searches were already completed today
    const done = await hasCompletedToday();
    if (done) return;

    const stored = await chrome.storage.local.get("autoStartSettings");
    const s = stored.autoStartSettings;
    if (!s || !s.enabled) return;

    console.log("Auto-start: starting searches automatically.");
    startSearches(s.searchType || "desktopMobile", {
      desktopSearches: s.desktopSearches ?? 3,
      mobileSearches: s.mobileSearches ?? 3,
      millisecondsMin: s.millisecondsMin ?? 120000,
      millisecondsMax: s.millisecondsMax ?? 3600000,
      scheduleStartTime: s.scheduleStartTime ?? "",
      scheduleEndTime: s.scheduleEndTime ?? "",
    }).catch((err) => {
      console.error("Auto-start: failed to start searches:", err);
    });
  }
});

// Restore state on service worker startup
chrome.runtime.onStartup.addListener(async () => {
  fetchTrendingWords().catch(() => {}); // Pre-warm cache
  await scheduleAutoStartAlarm();
  await loadState();
  if (searchState.isRunning) {
    // Resume searches
    performSingleSearch();
  }
});

// Also check on install/update
chrome.runtime.onInstalled.addListener(async () => {
  await scheduleAutoStartAlarm();
  await loadState();
  if (searchState.isRunning) {
    performSingleSearch();
  }
});

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startSearches") {
    startSearches(message.searchType, message.settings).then((result) => {
      sendResponse(result);
    });
    return true; // Indicates async response
  }

  if (message.type === "stopSearches") {
    stopSearches().then(() => {
      sendResponse({ success: true });
    });
    return true; // Indicates async response
  }

  if (message.type === "updateAutoStartSettings") {
    chrome.storage.local.set({ autoStartSettings: message.settings }).then(() => {
      scheduleAutoStartAlarm();
      sendResponse({ success: true });
    });
    return true; // Indicates async response
  }

  if (message.type === "getState") {
    // Load state from storage first to get persisted state
    loadState().then(() => {
      sendResponse({
        isRunning: searchState.isRunning,
        currentSearch: searchState.currentSearch,
        totalSearches: searchState.totalSearches,
        phase: searchState.phase,
        searchType: searchState.searchType,
      });
    });
    return true; // Indicates async response
  }
});

// Close debugger in case is open when popup closes (fallback)
chrome.runtime.onConnect.addListener(async function (port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(async function () {
      // Only detach debugger if searches are NOT running
      // This allows searches to continue when popup closes
      if (!searchState.isRunning) {
        let tabId = await getTabId();
        chrome.debugger.detach({ tabId }, function () {
          console.log(`Debugger disabled for tab: ${tabId}`);
        });
      }
    });
  }
});
