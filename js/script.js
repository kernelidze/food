// Tabs

const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i=0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (target == item) {
                hideTabContent();
                showTabContent(index);
            }
        });
    }
});

// Timer

const deadline = '2022-12-25';

function getTimeRemaining(endtime) {
   const t = Date.parse(endtime) - Date.parse(new Date());
   const days = Math.floor(t / (1000 * 60 * 60 * 24));
   const hours = Math.floor((t / (1000 * 60 * 60) % 24));
   const minutes = Math.floor((t / 1000 / 60) % 60);
   const seconds = Math.floor((t / 1000) % 60);

   return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds 
   };
}

function addZero(num) {
    if (num >=0 && num < 10) {
        return `0${num}`; 
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); //чтобы не мигали часы при обновлении со старого значения, ведь строка выше ср. через секунду

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = addZero(t.days);
        hours.innerHTML = addZero(t.hours);
        minutes.innerHTML = addZero(t.minutes);
        seconds.innerHTML = addZero(t.seconds);
        
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

