const lines = [
    ['will', 'have', 'a', 'barbarous', 'name', 'unfamiliar', 'to', 'many', '*'],
    ['partially', 'perceptible', 'to', 'the', 'over-excited']
];

const boxes = [
    ['-',
        'set into oscillation by small departures',
        'drivers look at the same things',
        '-',
        'one after the other, to make a choice',
        '-',
        'those which had been neglected as a no-man\'s land',
        'counting out loud or \'humming\'',
        `Text is composed of arbitrary out-of-context fragments 
from the following sources - 
        
Cybernetics or Control and Communication in the
Animal and the Machine, Norbert Wiener, 1963;
Tradition and Identity, David Smith, 1959;
The First Voyage Around the World, Antonio
Pigafetta, 1534;
The Technology of Teaching, B.F.Skinner, 1968; 
Mathematical Creation, Henri Poincare, 1908;
A Hat Full of Sky, Terry Pratchett, 2004;
Sum, David Eagleman, 2009;
Endurance, Scott Kelly, 2017;`
    ],
    ['wrongly believed to be strangers to one another',
        '-',
        'lost the ability to avoid risky decisions',
        'because something is true of a pigeon',
        'came ashore to make peace'
    ]
];

const media = [
    '<video autoplay loop><source src="vids/t4.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t5.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t7.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t8.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v4.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v1.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t3.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v3.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t10s.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v14.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v12.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t6.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v11.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v2.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t2.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/t8s.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v16.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v13.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v10.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v5.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v6.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v7.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v8.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v9.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
    '<video autoplay loop><source src="vids/v15.mp4" type="video/mp4">Your browser does not support the video tag.</video>',
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

        if (word === 'will' || word === 'perceptible' || word === 'barbarous' || word === 'unfamiliar') {
            span.classList.add('special-word');
        } else {
            span.classList.add('clickable-word');
        }

        if (word === '*') {
            span.style.fontSize = '90px';
        }

        let box = createSecondLevelBox(`${lineI}-${i}`);

        lineContainer.appendChild(span);
        document.getElementById('scroll-container').appendChild(box);
    })

    document.getElementById('scroll-container').appendChild(lineContainer);

});

boxes.forEach((boxLine, lineI) => {
    boxLine.forEach((boxContent, boxI) => {

        if (boxContent.startsWith('T')) {
            const box = document.getElementById(`${lineI}-${boxI}`);
            // box.textContent = boxContent;
            let pre = document.createElement('pre');
            pre.textContent = boxContent;
            box.appendChild(pre);
            box.style.fontSize = '15px';
            box.style.padding = '40px';
            box.style.width = '600px';

        } else {
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
        }
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

        if (clickedWord.textContent === 'will ') {
            // video = '<video autoplay loop><source src="1.mp4" type = "video/mp4">Your browser does not support the video tag.</video>'
            video = '<video autoplay loop><source src="16.mov" type = "video/mp4">Your browser does not support the video tag.</video>'
        } else if (clickedWord.textContent === 'barbarous ') {
            video = '<video class="invert" preload="auto" autoplay loop><source src="5.mp4" type = "video/mp4">Your browser does not support the video tag.</video>';
            // video.classList.add('invert');
        } else if (clickedWord.textContent === 'unfamiliar ') {
            video = '<video autoplay loop><source src="3.mp4" type = "video/mp4">Your browser does not support the video tag.</video>'
        } else if (clickedWord.textContent === 'perceptible ') {
            video = '<video autoplay loop><source src="4.mp4" type = "video/mp4">Your browser does not support the video tag.</video>'
        }
        box.innerHTML = video;

        document.querySelectorAll('.clickable-word, .special-word').forEach(word => {
            if (word.textContent !== e.target.textContent) {
                if (word.style.opacity > 0.1) word.style.opacity -= 0.025;
            } else {
                if (word.style.opacity < 1) word.style.opacity = Number(word.style.opacity) + 0.025;
            }
        })

        document.querySelector('.scroll-container').appendChild(box);

        return;
    }

    if (e.target.classList.contains('clickable-word')) {

        document.querySelectorAll('.clickable-word, .special-word').forEach(word => {
            if (word.textContent !== e.target.textContent) {
                if (word.style.opacity > 0.1) word.style.opacity -= 0.025;
            } else {
                if (word.style.opacity < 1) word.style.opacity = Number(word.style.opacity) + 0.025;
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


        //


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

        e.stopPropagation();

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
    e.stopPropagation();
    activeBox = this;

    let touch = e.touches[0];
    activeBox.startX = touch.clientX;
    activeBox.startY = touch.clientY;
    activeBox.startLeft = parseInt(document.defaultView.getComputedStyle(activeBox).left, 10);
    activeBox.startTop = parseInt(document.defaultView.getComputedStyle(activeBox).top, 10);

    // Initial movement flags
    activeBox.isDragging = false;
    activeBox.moved = false;

    function updateDragFlag() {
        activeBox.isDragging = true;
        document.querySelector('.scroll-container').classList.add('no-scroll');
    }

    // Modified touchmove handler
    function conditionalDragMove(event) {
        let moveTouch = event.touches[0];
        let dx = Math.abs(moveTouch.clientX - activeBox.startX);
        let dy = Math.abs(moveTouch.clientY - activeBox.startY);

        // Check if the movement is beyond a threshold to consider it a drag
        if (dx > 10 || dy > 10) {
            if (!activeBox.isDragging) {
                updateDragFlag();
                event.preventDefault(); // Prevent default only if it's considered a drag
                activeBox.moved = true;
            }
        }
        if (activeBox.isDragging) {
            // Continue with drag functionality here
            dragMove(event); // You may need to adjust this part to fit your dragMove logic
        }
    }

    document.documentElement.addEventListener('touchmove', conditionalDragMove, { passive: false });
    document.documentElement.addEventListener('touchend', dragEnd, false);
}


function dragMove(e) {
    if (!activeBox) return;

    // e.preventDefault();

    let touch = e.touches[0];
    let dx = touch.clientX - activeBox.startX;
    let dy = touch.clientY - activeBox.startY;

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        if (activeBox.moved) {
            e.preventDefault(); // Prevent scrolling and other defaults if dragging
            activeBox.moved = true; // Consider it a drag if moved more than 10px
        }
        activeBox.isDragging = true;

        let newLeft = activeBox.startLeft + dx;
        let newTop = activeBox.startTop + dy;

        activeBox.style.left = `${newLeft}px`;
        activeBox.style.top = `${newTop}px`;
    }

}


function dragEnd() {
    if (!activeBox.isDragging && !activeBox.moved) {
        // It's a click, simulate the click on the link
        let link = activeBox.querySelector('a');
        if (link) {
            link.click();
        }
    }

    setTimeout(() => {
        activeBox.isDragging = false;
        activeBox.moved = false; // Reset for the next action
    }, 50);

    document.documentElement.removeEventListener('touchmove', dragMove, { passive: false });
    document.documentElement.removeEventListener('touchend', dragEnd, false);
    activeBox = null;

    document.querySelector('.scroll-container').classList.remove('no-scroll');
}


document.querySelectorAll('.box, .box-third, .box-third-vid, .box-special').forEach(box => {
    box.addEventListener('touchstart', dragStart, false);
});

