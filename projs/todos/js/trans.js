'use strict'

var gTrans = {
    title: {
        en: 'todo',
        he: 'לעשות'
    },
    'filter-all': {
        en: 'All',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        he: 'הושלם',
    },
    'stat-todo-label': {
        en: 'Total Todos: ',
        he: ' לעשות: ',
    },
    'stat-active-label': {
        en: 'Active: ',
        he: ' פעיל: ',
    },
    add: {
        en: 'Add',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        he: 'בטוח ?',
    },
    'add-todo-placeholder': {
        en: 'What needs to be done?',
        he: 'מה יש לעשות?'
    },
    'sort-by': {
        en: 'sort-by...',
        he: 'מיון לפי...'
    },
    'sort-by-txt': {
        en: 'Text',
        he: 'אלפבית'
    },
    'sort-by-created': {
        en: 'Created',
        he: 'נוצר'
    },
    'sort-by-importance': {
        en: 'Importance',
        he: 'חשיבות'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

