// get dims

const cont = document.querySelector('.svg-container');
const svg = document.querySelector('.chart');

const w = +window.getComputedStyle(cont).width.slice(0,-2);
const h = +window.getComputedStyle(cont).height.slice(0,-2);

svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

console.log(w,h)

// data

const data = [

    {
        age_left : 18
    },

    {
        age_left : 18
    },

    {
        age_left : 21
    },

    {
        age_left : 22
    },

    {
        age_left : 22
    },

    {
        age_left : 23
    },

    {
        age_left : 24
    },

    {
        age_left : 26
    },

    {
        age_left : 27
    },

    {
        age_left : 27
    },

    {
        age_left : 'never home'
    },

    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never home'
    },
    {
        age_left : 'never abroad'
    }
];

console.log(data.length);

// vis

const lo_age = 16;
const hi_age = 30;

const main_h = h * 2/3;
const second_h = w * 1/3;

const main_w = w;
const second_w = w / 2;

const margin = 30;

// axis

const n_ticks = hi_age - lo_age + 1;

const space_btw_ticks = ( main_w - 2 * margin ) / (n_ticks - 1);

const tick_length = 2;

for (let i = 0; i < n_ticks; i++ ) {

    const new_tick = document.createElementNS("http://www.w3.org/2000/svg", 'line');

    const x = margin + i * space_btw_ticks;
    const y = main_h - margin;

    new_tick.setAttribute('x1', x);
    new_tick.setAttribute('x2', x);
    new_tick.setAttribute('y1', y - tick_length);
    new_tick.setAttribute('y2', y + tick_length);

    new_tick.classList.add('tick');

    svg.appendChild(new_tick);

}

// labels

//let label_lo_age, label_hi_age, label_never_home, label_never_abroad;

const label_lo_age = document.createElement('p');
const label_hi_age = document.createElement('p');
const label_never_home = document.createElement('p');
const label_never_abroad = document.createElement('p');

label_lo_age.innerText = lo_age;
label_hi_age.innerText = hi_age;

label_never_home.innerText = 'Never played home';
label_never_abroad.innerText = 'Never played abroad';

label_lo_age.style.left = margin + 'px';
label_hi_age.style.right = margin + 'px';
label_lo_age.style.top = (main_h - margin + (2 * tick_length) ) + 'px';
label_hi_age.style.top = (main_h - margin + (2 * tick_length) ) + 'px';

label_lo_age.style.transform = 'translateX(-50%)';
label_hi_age.style.transform = 'translateX(+50%)';

label_never_home.style.top = main_h + margin + margin + 'px';
label_never_abroad.style.top = main_h + margin + margin + 'px';
label_never_home.style.left = margin + 'px';
label_never_abroad.style.left = margin + second_w + 'px';

label_never_home.style.transform = 'translateY(-100%)';
label_never_abroad.style.transform = 'translateY(-100%)';

label_never_home.style.paddingBottom = '1em';
label_never_abroad.style.paddingBottom = '1em';

[ label_lo_age, label_hi_age, label_never_home, label_never_abroad ].forEach(label => {
    label.classList.add('label');
    cont.appendChild(label);
})

label_never_home.classList.add('text-label');
label_never_abroad.classList.add('text-label');

// marks

const main_points = data.filter(d => d.age_left > 0);
const never_abroad = data.filter(d => d.age_left == 'never abroad');
const never_home = data.filter(d => d.age_left == 'never home');

const r = space_btw_ticks / 4;
const gap = 1;

function x(age) {

    return (  ( age - lo_age ) * space_btw_ticks + margin )

}

function y(index) {

    return ( (main_h - margin - tick_length - r - gap - index * (2 * r + gap) ))

}

let current_age = 0;
let index = 0;

main_points.forEach(point => {

    if (point.age_left == current_age) {

        index++

    } else {

        current_age = point.age_left;     
        index = 0;

    }

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    circle.setAttribute('cx', x(current_age));
    circle.setAttribute('cy', y(index));
    circle.setAttribute('r', r);
    circle.classList.add('mark-main');

    svg.appendChild(circle);

    point.index = index;

})

// never_home

const x0_never_home = margin + r;
const y0_never_home = main_h + margin + margin;

const max_points = Math.floor((second_w - margin) / (2*r + gap));
console.log(max_points);

never_home.forEach( (point, i) => {

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    circle.setAttribute('cx', (i % max_points) * (2 * r + gap) + x0_never_home );
    circle.setAttribute('cy', Math.floor(i / max_points) * (2 * r + gap) + y0_never_home);
    circle.setAttribute('r', r);
    circle.classList.add('mark-never-home');

    svg.appendChild(circle);

})

// never_abroad

const x0_never_abroad = second_w + margin + r;
const y0_never_abroad = main_h + margin + margin;

never_abroad.forEach( (point, i) => {

    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    circle.setAttribute('cx', (i % max_points) * (2 * r + gap) + x0_never_abroad );
    circle.setAttribute('cy', Math.floor(i / max_points) * (2 * r + gap) + y0_never_abroad);
    circle.setAttribute('r', r);
    circle.classList.add('mark-never-abroad');

    svg.appendChild(circle);

})





