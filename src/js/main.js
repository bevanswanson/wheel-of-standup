const spinButton = document.getElementById('spin')
const resetButton = document.getElementById('reset')
const input = document.getElementById('add-member');
const resultsList = document.getElementById('results-list');

const dataShedColours = ['#5c59a7', '#ff8c27', '#5cdcc1'];
const segments = [];

const audio = new Audio('../assets/tick.mp3');

let theWheel;

const playSound = () => {
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

const handleSelected = () => {
    const chosenMember = theWheel.getIndicatedSegment();
    const chosenMemberSegmentNumber = theWheel.getIndicatedSegmentNumber();
    alertMember(chosenMember, chosenMemberSegmentNumber);
}

const alertMember = (member, number) => {
    const name = member.text
    alert(`it's ${name}'s turn!`);
    deleteMember(number);
    const memberLi = document.createElement("li");
    const memberText = document.createTextNode(name);
    memberLi.appendChild(memberText);
    resultsList.appendChild(memberLi);

    theWheel.rotationAngle = 0;
}

// Create new wheel object specifying the parameters at creation time.
const createNewWinwheel = () => {
    theWheel = new Winwheel({
        'canvasId'     : 'canvas',
        'numSegments'  : segments.length,
        'pointerAngle' : 0,
        'outerRadius'  : 212,
        'textFontSize' : 28,
        segments,
        'animation':
        {
            'type'     : 'spinToStop',
            'duration' : 5,
            'spins'    : 8,
            'callbackFinished' : handleSelected,
            'callbackSound'    : playSound,
            'soundTrigger'     : 'segment'
        }
    });
}

spinButton.addEventListener('click', () => {
    theWheel.startAnimation();
}, false)

resetButton.addEventListener('click', () => resetWheel(), false)

input.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.keyCode === 13) {
        if (input.value) {
            addMember(input.value);
            input.value = '';
        }
    }
}, false);

const addMember = (name) => {
    theWheel.addSegment({
        'text' : name,
        'fillStyle' : dataShedColours[Math.floor(Math.random() * 3)]
    }, 1);

    theWheel.draw();
};

const deleteMember = (number) => {
    theWheel.deleteSegment(number);
    theWheel.draw();
}

const resetWheel = () => {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    wheelSpinning = false;
    createNewWinwheel();

    resultsList.innerHTML = '';
}

createNewWinwheel();