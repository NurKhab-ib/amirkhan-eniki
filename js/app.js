"use strict";

//! scroll-top button
$(function () {
    $('#scroll-top').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > 100) {
			$('#scroll-top').show();
		} else {
			$('#scroll-top').hide();
		}
	});
 
	$('#scroll-top').click(function(){
		$('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});	

//! menu-burger 

const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
if (burgerMenu) {
	burgerMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('lock');
		burgerMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
	});
}

//! scroll

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);	
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.menu').offsetHeight;

			if (burgerMenu.classList.contains('active')) {
				document.body.classList.remove('lock');
				burgerMenu.classList.remove('active');
				menuBody.classList.remove('active');
			} 

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//! popups

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

const timeout = 500;

let unlock = true;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        }); 
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

const langArr = {
    "doctitle" : {
        "ru" : "Амирхан Еники | Главная",
        "tat" : "Әмирхан Еники | Баш",
        "en" : "Amirkhan Eniki | Main",
    },
    "scrollbutton" : {
        "ru": "<i class='fas fa-arrow-circle-up' title='Наверх'></i>",
        "tat": "<i class='fas fa-arrow-circle-up' title='Югарыга'></i>",
        "en": "<i class='fas fa-arrow-circle-up' title='Up'></i>",
    },
    "maintitle" : {
        "ru": "Амирхан Еники",
        "tat": "Әмирхан Еники",
        "en": "Amirkhan Eniki",
    },
    "subtitle" : {
        "ru": "Жизнь и творчество",
        "tat": "Тормыш юлы hәм иҗаты",
        "en": "Life and work",
    },
    "biolink" : {
        "ru" : "Кто это?",
        "tat" : "Кем ул?",
        "en" : "Who is it?"
    },
    "textslink" : {
        "ru" : "Произведения",
        "tat": "Әсәрләр",
        "en": "Writings",
    },
    "journlink" : {
        "ru": "Публицистика",
        "tat": "Публицистика",
        "en": "Publicism",
    },
    "gallerylink" : {
        "ru": "Галерея",
        "tat": "Галерея",
        "en": "Gallery",
    },
    "biotitle" : {
        "ru": "<i class='far fa-question-circle'></i>&nbsp;Кто такой Амирхан Еники?",
        "tat": "<i class='far fa-question-circle'></i>&nbsp;Кем ул Әмирхан Еники?",
        "en": "<i class='far fa-question-circle'></i>&nbsp;Who is Amirkhan Eniki?",
    },
    "biotitle-1" : {
        "ru": "<i class='far fa-address-card'></i>&nbsp;Биография Амирхана Еники",
        "tat": "<i class='far fa-address-card'></i>&nbsp;Әмирхан Еникиның биографиясе",
        "en": "<i class='far fa-address-card'></i>&nbsp;Biography of Amirkhan Eniki",
    },
    "biotext-1" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;Татарский народный писатель, публицист, лауреат Государственной премии РТ им. Г. Тукая <strong>Амирхан Еники</strong> <i>(1909-2000)</i> – выдающийся татарский писатель ХХ века. Он вошёл в историю татарской литературы как неповторимый в своей индивидуальности мастер-психолог, которого отличает глубокое проникновение во внутренний мир героев, подробное описание и анализ различных психологических состояний, внимание к оттенкам переживаний.",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;Татар халык язучысы, публицист, Г. Тукай исемендәге Татарстан Дәүләт премиясы лауреаты <strong>Әмирхан Еники</strong> <i>(1909-2000)</i> – XX гасырның күренекле татар язучысы. Ул уникаль мастер-психолог кебек татар әдәбиятының тарихына кергән. Аның геройларның эчке дөньясына тирән үтеп керүе, төрле психологик халәтләрне җентекләп тасвирлавы һәм анализлавы, кичерешләрнең төрле төсмерләренә игътибар итүе аерылып тора.",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;Tatar national writer, publicist, laureate of the RT State Prize named after G. Tukai <strong>Amirkhan Eniki</strong> <i>(1909-2000)</i> is outstanding Tatar writer of the twentieth century. He entered the history of tatar literature as a master-psychologist unique in his individuality, who is distinguished by a deep penetration into the inner world of the characters, a detailed description and analysis of various psychological states, attention to the shades of experiences.",
    },
    "biotext-2" : {
        "ru" : "&#9658;&nbsp;&nbsp;&nbsp;Вопрос психологизма в творчестве писателя представляется узловой проблемой и приобретает первостепенное значение для углубленного понимания его творческой индивидуальности.",
        "tat" : "&#9658;&nbsp;&nbsp;&nbsp;Язучының иҗатында психологизм сорауы әлеге проблема булып тора һәм аның иҗади индивидуальлеген тирәнтен аңлау өчен беренчел әһәмияткә ия була.",
        "en" : "&#9658;&nbsp;&nbsp;&nbsp;The question of psychologism in the writer's work seems to be a nodal problem and becomes of paramount importance for an in-depth understanding of his creative individuality.",
    },
    "biotext-3" : {
        "ru" : "&#9658;&nbsp;&nbsp;&nbsp;<i>А. Еники</i> – создатель убедительных образов, он сумел соединить в своем творчестве глубокий аналитический взгляд на современность и глубокий метафизический план.",
        "tat" : "&#9658;&nbsp;&nbsp;&nbsp;<i>Ә. Еники</i> – ышанычлы образларны уйлап табучы, ул үзенең иҗатында хәзерге заманга тирән аналитик карашны һәм тирән метафизик планны берләштерә алды.",
        "en" : "&#9658;&nbsp;&nbsp;&nbsp;<i>A. Eniki</i> is the creator of convincing images, he managed to combine in his work a deep analytical view of modernity and a deep metaphysical plan.",
    },
    "biotext-child" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Детство и юность</strong><br>&nbsp;&nbsp;&nbsp;Амирхан Нигметзянович Еники (Еникеев) родился 2 марта 1909 года в деревне Верхние Каргалы.  Он был десятым ребёнком в семье, единственным из выживших. Несмотря на крестьянский образ жизни, родители Амирхана Еники были потомками мурз Еникеевых.<br>&nbsp;&nbsp;&nbsp;В 1911 Еникеевы переселяются на станцию Давлеканово для занятия торговлей. Родители были набожными людьми, строго воспитывали детей, но их интересам не препятствовали. Так, вдохновившись творчеством знаменитого татарского поэта Г. Тукая, Еники с детства увлёкся творчесвом, а в 1924 году написал свои первые стихотворения.<br>&nbsp;&nbsp;&nbsp;<i>На фото запечатлены (слева направо): отец писателя Нигметзян Еникеев, молодой Амирхан Еники и мать писателя Бибихадича Еникеева.</i>",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Балачак һәм яшьлек</strong><br>&nbsp;&nbsp;&nbsp;Әмирхан Нигъмәтҗан улы Еники (Еникеев) 1909 елның 2 мартында Югары Каргалы авылында туа.<br>&nbsp;&nbsp;&nbsp;<i>Фотода (сулдан уңга) язучының әтисе Нигъмәтҗан Еникеев, яшь Әмирхан Еники һәм язучының әнисе Бибихадичә Еникеевның әнисе сурәтләнгән.</i>",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Childhood and youth</strong><br>&nbsp;&nbsp;&nbsp;Amirkhan Nigmetzyanovich Yeniki (Yenikeev) was born on March 2, 1909 in the village of Verkhniye Kargaly.<br>&nbsp;&nbsp;&nbsp;<i>The photo shows (from left to right): the father of the writer Nigmetzyan Yenikeyev, the young Amirkhan Yeniki and the mother of the writer Bibikhadicha Yenikeyeva.</i>",
    },
    "biotext-creat" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Творчество</strong><br>&nbsp;&nbsp;&nbsp;В 1929 году выходит первая повесть Амирхана Еники - 'Друг'. После этого писатель надолго уходит из искусства.<br>&nbsp;&nbsp;&nbsp;После начала Великой Отечественной войны, Амирхана Еники призывают на фронт, где он снова захотел писать. Такие рассказы, как «Дитя» (1941), «Мать и дочь» (1942), «Одинокий гусь» (1944), «На часок» (1944), «Цветок мака» (1944), заинтересовали читателей и положили начало известности Еники. Так сам писатель отозвался о своём творчестве в военное время: «Я каждый день видел смерть, однако в рассказах своих писал о жизни, о том, что она сильнее смерти»<br>&nbsp;&nbsp;&nbsp;В 1950 году опубликован первый сборник рассказов «Солнечное утро», в 1953 году — сборник «Парень прибыл на побывку». В 1955 году в Москве издательством «Советский писатель» на русском языке выпущен сборник рассказов «Спасибо, товарищи!», получивший одобрение литературной критики. Со дня демобилизации и до 1950 года работает в Татрадиокомитете заведующим сектором литературных передач, затем — в редакции журнала «Колхоз бригадасы» («Колхозная бригада»). С 1953 года он занимается литературным творчеством как писатель-профессионал. Тем не менее его послевоенная писательская карьера не была лёгкой. Наиболее известные произведения «Тауларга карап» («Глядя на горы»), «Саз чәчәге» («Болотный цветок»), «Рәшә» («Марево») годами лежали в издательствах.<br>&nbsp;&nbsp;&nbsp;Только во время так называемой «хрущёвской оттепели» отношение к Еники улучшилось, его книги начинали издаваться. А в 80-х годах писатель перестал писать художественные произведения, посвятив себя публицистике.<br>&nbsp;&nbsp;&nbsp;<i>Почитать некоторые из рассказов можно <a href='texts.html'>здесь</a>.</i>",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Иҗат</strong><br>&nbsp;&nbsp;&nbsp;",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Сreativity</strong><br>&nbsp;&nbsp;&nbsp;",
    },
    "biotext-achieve" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Достижения</strong><br>&nbsp;&nbsp;&nbsp;Среди достижений Амирхана Еники можно выделить следующие:<br><ul><li>Орден Трудового Красного знамени - 1957</li><li>Знак Почёта - 1957</li><li>Государственная премия ТАССР имени Г. Тукая - 1984</li><li>Звание народного писателя ТАССР - 1989</li><li>Государственная премия имени Г. Исхаки - 1993</li></ul>",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Казанышлары</strong><br>&nbsp;&nbsp;&nbsp;Әмирхан Еники казанышлары арасында буларны аерып була:<br><ul><li>Хезмәт Кызыл Байрагы ордены - 1957</li><li>Мактау Билгесе - 1957</li><li>Г. Тукай исемендәге ТАССР Дәүләт премиясы - 1984</li><li>ТАССР халык язучысы исеме - 1989</li><li>Г. Исхаки исемендәге Дәүләт премиясы - 1993</li></ul>",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;<strong>Achievements</strong><br>&nbsp;&nbsp;&nbsp;Among the achievements of Amirkhan Yeniki are the following:<ul><li>Order of the Red Banner of Labor - 1957</li><li>Badge of Honor - 1957</li><li>The State Prize of the TASSR named after G. Tukai - 1984</li><li>Title of People's writer of the TASSR - 1989</li><li>State Prize named after G. Iskhaki - 1993</li></ul>",
    },
    "biolink-1" : {
        "ru": "Читать биографию писателя",
        "tat": "Язучының биографиясен укырга",
        "en": "To read the writer's biography",
    },
    "textstitle" : {
        "ru": "<i class='fas fa-book'></i>&nbsp;Художественные произведения",
        "tat": "<i class='fas fa-book'></i>&nbsp;Әсәрләр",
        "en": "<i class='fas fa-book'></i>&nbsp;Writings",
    },
    "textstitle-1" : {
        "ru": "<i class='fas fa-book'></i>&nbsp;Художественные произведения Еники",
        "tat": "<i class='fas fa-book'></i>&nbsp;Еникиның әсәрләре",
        "en": "<i class='fas fa-book'></i>&nbsp;Eniki's writings",
    },
    "textstext-1" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;В рассказах военного времени А. Еники прозвучали нотки первых изменений в литературе, которые впоследствии окажут влияние и будут идентифицированы в татарской литературе второй половины ХХ в. Такие произведения писателя как «Бала» («Девочка», 1941), «Ана һәм кыз» («Мать и дочь», 1942), «Бер генә сәгатькә» («Лишь на час», 1944), «Ялгыз каз» («Одинокий гусак», 1944), «Мәк чәчәге» («Мак», 1944) отдельным течением выделялись в общем потоке военной литературе, детально описывающей ужасающие подробности фронтовой и тыловой реальности, примеры жестокого поведения врагов, подвиги трудового народа и военных. Прозаик обращает свой взор на жанровые вариации, развивавшиеся в татарской литературе, начала ХХ века, внося в свой творческий арсенал «прозу открытий», жанр 'нәсер' (лирическая проза).",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;XX гасырның 2нче яртысындагы татар әдәбиятының үсеше нәкъ менә сугыш елларында үз иҗатын киң катлам укучылар игътибарына тәкъдим иткән интеллектуаль һәм яшь язучыларның барлыкка килүе белән бәйләнгән. “Бала” (1941), “Ана һәм кыз” (1942), “Бер генә сәгатькә” (1944) һәм башка Ә. Еникиның фронт һәм тыл чынбарлыгының куркыныч чынлыгын, дошманнарның каты үз-үзләрен тотышы мисалларын һәм хезмәт кешеләрнең белән сугышчыларның батырлыгын тасвирлаган әсәрләре аерым агым белән бүленә. Прозаик XX гасыр башында татар әдәбиятында үскән жанр вариацияләренә үзенең иҗади арсеналына «ачышлар прозасы», «нәсер» (лирик проза) жанры кертеп мөрәҗәгать итә.",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;In the wartime stories of A. Eniki, the notes of the first changes in literature sounded, which would later have an impact and be identified in the Tatar literature of the second half of the twentieth century. Such works of the writer as 'Bala' ('Girl', 1941), 'Ana ham kyz' ('Mother and Daughter', 1942), 'Ber gena sagatka' ('Only for an hour', 1944), 'Yalgyz kaz' ('Lonely Goose', 1944), 'Mak chachage' ('Mac', 1944) stood out as a separate current in the general flow of military literature, describing in detail the terrifying details of front-line and rear reality, examples of cruel behavior of enemies, exploits of the working people and the military. The prose writer turns his attention to genre variations that developed in Tatar literature at the beginning of the twentieth century, introducing the 'prose of discoveries', the genre of 'naser' (lyrical prose) into his creative arsenal.",
    },
    "textstext-2" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;Основанная на психологизме, «проза открытий» позволяет писателю быть очевидцем человеческих переживаний, их внутреннего развития, трансформации. В рамках непривычной для себя реальности со всей полнотой раскрывается глубина характера личности, определяются границы его великодушия, чувства сострадания; военные события, функционирующие в художественной реальности в качестве временного хронотопа действия, противопоставляются общечеловеческим ценностям, человечеству в целом.",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;",
    },
    "textslink-1" : {
        "ru": "Читать произведения А. Еники",
        "tat": "Ә. Еники әсәрләрен укырга",
        "en": "To read A. Eniki's works",
    },
    "textsfile" : {
        "ru": "Или почитать его рассказы вы сможете, скачав данный файл:",
        "tat": "Яки аның хикәяләрен әлеге файлда укып була:",
        "en": "Or you can read these stories in this file:",
    },
    "journtitle" : {
        "ru": "<i class='far fa-newspaper'></i>&nbsp;Публицистика",
        "tat": "<i class='far fa-newspaper'></i>&nbsp;Публицистика",
        "en": "<i class='far fa-newspaper'></i>&nbsp;Publicism",
    },
    "journtext" : {
        "ru": "Вы можете скачать сборник публицистических рассказов А. Еники:",
        "tat": "Ә. Еникиның публицистик хикәяләре җыентыгын күчереп алырга мөмкин:",
        "en": "You can download the collection of publicistic writings by A. Eniki:",
    },
    "xsubtext" : {
        "ru": "&#128712;&nbsp;Это безопасно.",
        "tat": "&#128712;&nbsp;Бу куркынычсыз.",
        "en": "&#128712;&nbsp;It's safely.",
    },
    "xxsubtext" : {
        "ru": "&#128712;&nbsp;Это безопасно.",
        "tat": "&#128712;&nbsp;Бу куркынычсыз.",
        "en": "&#128712;&nbsp;It's safely.",
    },
    "gallerytitle" : {
        "ru": "<i class='far fa-image'></i>&nbsp;Галерея",
        "tat": "<i class='far fa-image'></i>&nbsp;Галерея",
        "en": "<i class='far fa-image'></i>&nbsp;Gallery",
    },
    "gallerytext" : {
        "ru": "&#9658;&nbsp;&nbsp;&nbsp;Нажмите на одну из цифр (вкладок) для просмотра галереи:",
        "tat": "&#9658;&nbsp;&nbsp;&nbsp;Галереяны карау өчен бу саннардан берсенә басыгыз:",
        "en": "&#9658;&nbsp;&nbsp;&nbsp;Click on one of the numbers (tabs) to view the gallery:",
    },
    "footertext" : {
        "ru": "По всем вопросам и предложениям можно обратиться сюда:",
        "tat": "Барлык сораулар hәм тәкъдимнәр буенча монда мөрәҗәгать итәргә мөмкин:",
        "en": "You can contact here for all questions and suggestions:",
    },
    "footertext-1" : {
        "ru": "<strong>&copy;</strong> Фотографии взяты с открытых источников и из личного архива А. Еники",
        "tat": "<strong>&copy;</strong> Фотолар ачык чыганаклардан hәм Ә. Еникиның шәхси архивыннан алынды",
        "en": "<strong>&copy;</strong> The photos are taken from open sources and from the personal archive of A. Eniki",
    },
    "download" : {
        "ru": "Скачать",
        "tat": "Йөкләргә",
        "en": "Download"
    },
    "download-1" : {
        "ru": "Скачать",
        "tat": "Йөкләргә",
        "en": "Download"
    },
};

//! change language
const select = document.querySelector('select');
const langs = ['ru', 'tat', 'en'];

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
	let lang = select.value;
	location.href = window.location.pathname + '#'+lang;
	location.reload();
}

function changeLanguage() {
	let hash = window.location.hash;
	hash = hash.substr(1);
	if (!langs.includes(hash)) {
		location.href = window.location.pathname + '#ru';
		location.reload();
	}
	select.value = hash;
	document.querySelector('title').innerHTML = langArr['doctitle'][hash];

	for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
}

changeLanguage();


//! gallery opening

//! lazy loading

const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;
const loadMoreBlock = document.querySelector('load-more');

let lazyImgsPos = [];
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImgsPos.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
    if (!loadMoreBlock.classList.contains('_loading')) {
        loadMore();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImgsPos.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyImgsPos[imgIndex];
    }
}

function loadMore() {
    const loadMoreBlockPos =  loadMoreBlock.getBoundingClientRect().top + pageYOffset;
    const loadMoreBlockHeight = loadMoreBlock.offsetHeight;

    if (pageYOffset > (loadMoreBlockPos + loadMoreBlockHeight) - windowHeight) {
        getContent();
    }
}

async function getContent() {
    if (!document.querySelector('_loading-icon')) {
       loadMoreBlock.insertAdjacentHTML(
           'beforeend',
            `<div class="_loading-icon"></div>`
       );
       loadMoreBlock.classList.add('_loading');

       let response = await fetch('_more.html', {
           method: 'GET',
       });
       if (response.ok) {
           let result = await response.text();
           loadMoreBlock.insertAdjacentHTML('beforeend', result);
           loadMoreBlock.classList.remove('_loading');
           if (document.querySelector('._loading-icon')) {
               document.querySelector('._loading-icon').remove();
           }
       } else { 
           alert("Ошибка");
       }
    }
}
