const lines = [
    ['will', 'have', 'a', 'barbarous', 'name', 'unfamiliar', 'to', 'many'],
    ['partially', 'perceptible', 'to', 'the', 'over-excited']
];

const boxes = [
    ['drivers look at the same things',
        'headstand, but in reverse',
        'mean square error of prediction',
        'blood redistributed',
        'lost the ability to avoid risky decisions',
        'pins they pass from one side to the other',
        'ask what day it was',
        'all-or-none character'
    ],
    ['overshoots the mark',
        'such questions arise independently',
        'returned here from a hard life',
        'the capacity to ask',
        'wrongly believed to be strangers to one another'
    ]
];

const media = [
    'test', '<video preload="auto" autoplay loop><source src="https://github.com/pchinovsky/Will-Have-A-Barbarous-Name-Unfamiliar-To-Many/raw/main/videos/5.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
];

lines.forEach((words, lineI) => {

    const lineContainer = document.createElement('div');
    lineContainer.classList.add('line-container');

    words.forEach((word, i) => {
        let span = document.createElement('span');
        span.textContent = word + " ";
        span.style.opacity = 1;
        span.setAttribute('data-word', word);
        span.setAttribute('data-line-index', lineI); 

        if (word === 'perceptible' || word === 'barbarous' || word === 'unfamiliar') {
            span.classList.add('special-word');
        } else {
            span.classList.add('clickable-word');
        }

        let box = createSecondLevelBox(`${lineI}-${i}`);

        lineContainer.appendChild(span);
        document.getElementById('scroll-container').appendChild(box);
    })

    document.getElementById('scroll-container').appendChild(lineContainer);

});

boxes.forEach((boxLine, lineI) => {
    console.log('boxes done');
    boxLine.forEach((boxContent, boxI) => {
        const words = boxContent.split(' ');

        words.forEach((word, wordI) => {
            const box = document.getElementById(`${lineI}-${boxI}`);
            const box3 = createThirdLevelBox(`box3-${lineI}-${boxI}`);
            document.getElementById('scroll-container').appendChild(box3);

            let span = document.createElement('span');
            span.setAttribute('id', wordI);
            span.textContent = word;
            span.classList.add('box-text');

            let gap = document.createElement('span');
            gap.style.width = '12px';
            gap.style.display = 'inline-block';

            box.appendChild(span);
            box.appendChild(gap);

        })
    })
})


let currentIndex = 0;
let isDragging = false;
let activeBox = null; 
let startX, startY, startLeft, startTop;

document.getElementById('scroll-container').addEventListener('click', onClick);

let boxTopNow = 0;
const boxTop = [2, 4, 6, 3, 5];

function onClick(e) {

    if (isDragging) {
        e.preventDefault();
        isDragging = false;
        return;
    }

    let container = document.getElementById('scroll-container');

    const containerRect = container.getBoundingClientRect();
    const visibleCenterX = container.scrollLeft + containerRect.width / 2;
    const visibleCenterY = containerRect.height / 2;

    let content = media[currentIndex];
    currentIndex = (currentIndex + 1) % media.length; 

    if (e.target.classList.contains('special-word')) {
        let clickedWord = e.target;
        let scrollContainer = document.querySelector('.scroll-container');

        let box = document.createElement('div');
        box.className = 'box-special';

        let offset = getOffsetRelativeToContainer(clickedWord, scrollContainer);

        box.style.position = 'absolute';
        box.style.left = `${offset.left}px`;
        box.style.top = `${offset.top}px`;
        box.style.width = `${clickedWord.offsetWidth}px`;
        box.style.height = `${clickedWord.offsetHeight}px`;

        let video = '';

        if (clickedWord.textContent === 'barbarous ') {
            video = '<video autoplay loop><source src="https://1drv.ms/v/s!Aji5CC00gzzngbJxROdoyI5TM00qjw?e=dxMCxt" type = "video/mp4">Your browser does not support the video tag.</video>'
        } else if (clickedWord.textContent === 'unfamiliar ') {
            video = '<video autoplay loop><source src="4.mp4" type = "video/mp4">Your browser does not support the video tag.</video>'
        } else if (clickedWord.textContent === 'perceptible ') {
            video = '<video autoplay loop><source src="5.mp4" type = "video/mp4">Your browser does not support the video tag.</video>'
        }
        box.innerHTML = video;

        // let vid = document.createElement('video');
        // vid.src = 'https://1drv.ms/v/s!Aji5CC00gzzngbJxROdoyI5TM00qjw?e=dxMCxt';
        // box.appendChild(vid);

        // let img = document.createElement('img');
        // img.src = 'https://drive.google.com/file/d/1nf-tg3rGwnYeyR7vEp9kP5Kmk-X9xIY_/view?usp=sharing';
        // box.appendChild(img);

        document.querySelectorAll('.clickable-word, .special-word').forEach(word => {
            if (word.textContent !== e.target.textContent) {
                if (word.style.opacity > 0.1) word.style.opacity -= 0.05;
            } else {
                if (word.style.opacity < 1) word.style.opacity = Number(word.style.opacity) + 0.05;
            }
        })

        document.querySelector('.scroll-container').appendChild(box);

        return;
    }

    if (e.target.classList.contains('clickable-word')) {

        document.querySelectorAll('.clickable-word, .special-word').forEach(word => {
            if (word.textContent !== e.target.textContent) {
                if (word.style.opacity > 0.1) word.style.opacity -= 0.05;
            } else {
                if (word.style.opacity < 1) word.style.opacity = Number(word.style.opacity) + 0.05;
            }
        })

        const lineIndex = e.target.getAttribute('data-line-index');
        const word = e.target.getAttribute('data-word');
        const wordIndex = lines[lineIndex].indexOf(word);

        const box = document.getElementById(`${lineIndex}-${wordIndex}`);

        let video = '';

        box.style.display = 'block';

        rotateBoxTop();

        if (video) {
            box.style.left = `${visibleCenterX - box.offsetWidth / 4}px`;
            box.style.top = `${visibleCenterY - box.offsetHeight / 2}px`;
        } else {
            box.style.left = `${visibleCenterX - box.offsetWidth / 2}px`;
            box.style.top = `${visibleCenterY - box.offsetHeight / boxTopNow}px`;
        }

    } else if (e.target.classList.contains('box-text')) {

        const boxId = e.target.parentNode.id;

        const box = createThirdLevelBox(boxId)
        box.addEventListener('touchstart', dragStart, false);
        document.querySelector('.scroll-container').appendChild(box);

        let video = '';

        if (content.startsWith('<')) {
            video = content;
            box.classList.add('box-third-vid');
            box.classList.remove('box-third');
            box.innerHTML = video;
        } else {
            box.textContent = content;
            box.classList.add('box-third');
            box.classList.remove('box-third-vid');
        }

        box.style.display = 'block';

        rotateBoxTop();

        if (video) {
            box.style.left = `${visibleCenterX - box.offsetWidth / 4}px`;
            box.style.top = `${visibleCenterY - box.offsetHeight / boxTopNow}px`;
        } else {
            box.style.left = `${visibleCenterX - box.offsetWidth / 4}px`;
            box.style.top = `${visibleCenterY + box.offsetHeight / boxTopNow}px`;
        }

    } else if (e.target.tagName === 'VIDEO') {

        const video = e.target;
        if (!video.paused) {
            video.pause();
        } else {
            video.play();
        }

    } else {

        clear(false);

    }
}

document.getElementById('clear').addEventListener('click', function () { clear(true) });

function clear(closeAll) {

    let container = document.getElementById('scroll-container');
    let scrollPosition = container.scrollLeft; 

    if ((Array.from(document.querySelectorAll('.box-third, .box-third-vid')).some(box => box.style.display === 'block')) && closeAll === false) {
        document.querySelectorAll('.box-third, .box-third-vid, .box-special').forEach(box => {

            const video = box.querySelector('video');
            if (video) {
                video.pause(); 
                box.removeChild(video);
            }
            box.style.display = 'none';

            container.scrollLeft = scrollPosition; 
        });
        
    } else {

        document.querySelectorAll('.box, .box-third, .box-third-vid, .box-special').forEach(box => {

            const video = box.querySelector('video');
            if (video) {
                video.pause(); 
                box.removeChild(video);
            }
            box.style.display = 'none';

            container.scrollLeft = scrollPosition; 
        });
    }

}

function createSecondLevelBox(id) {
    let box = document.createElement('div');
    box.id = id;
    box.classList.add('box');
    return box;
}

function createThirdLevelBox(id) {
    let box = document.createElement('div');
    box.id = id;
    box.classList.add('box-third');
    box.style.display = 'none'; 
    return box;
}

function rotateBoxTop() {
    boxTopNow = boxTop.shift();
    boxTop.push(boxTopNow);
}

function getOffsetRelativeToContainer(element, container) {
    let offset = { top: 0, left: 0 };
    let currentElement = element;

    while (currentElement && currentElement !== container) {
        offset.top += currentElement.offsetTop;
        offset.left += currentElement.offsetLeft;
        currentElement = currentElement.offsetParent;
    }

    return offset;
}

function dragStart(e) {
    // e.preventDefault();
    e.stopPropagation();

    activeBox = this; 

    let touch = e.touches[0];
    activeBox.startX = touch.clientX;
    activeBox.startY = touch.clientY;
    activeBox.startLeft = parseInt(document.defaultView.getComputedStyle(activeBox).left, 10);
    activeBox.startTop = parseInt(document.defaultView.getComputedStyle(activeBox).top, 10);

    document.documentElement.addEventListener('touchmove', dragMove, { passive: false });
    document.documentElement.addEventListener('touchend', dragEnd, false);

    activeBox.isDragging = false;
}

function dragMove(e) {

    activeBox.isDragging = true;

    if (!activeBox) return;
    e.preventDefault(); 

    let touch = e.touches[0];

    let newLeft = activeBox.startLeft + touch.clientX - activeBox.startX;
    let newTop = activeBox.startTop + touch.clientY - activeBox.startY;

    activeBox.style.left = `${newLeft}px`;
    activeBox.style.top = `${newTop}px`;
}

function dragEnd() {

    if (!activeBox.isDragging) {
        let link = activeBox.querySelector('a');
        if (link) {
            link.click();
        }
    }

    setTimeout(() => {
        isDragging = false;
    }, 50); 
    document.documentElement.removeEventListener('touchmove', dragMove, { passive: false });
    document.documentElement.removeEventListener('touchend', dragEnd, false);
    activeBox = null; 
}

document.querySelectorAll('.box, .box-third, .box-third-vid, .box-special').forEach(box => {
    box.addEventListener('touchstart', dragStart, false);
});

