const player = document.querySelector('.player');
// const video = player.querySelector('.viewer');
const video = player.querySelector('video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let drag = false;
let dragBar = false;

const togglePlay = () => {
    let method = video.paused ? 'play' : 'pause';
    video[method]();
};

const handleRangeUpdate = (e) => {
    if (e.type === 'mousemove' && !drag) return;
    // console.log(e);
    video[e.target.name] = e.target.value;
};

const handleProgress = (e) => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;
};

const skip = (e) => {
    video.currentTime += parseFloat(e.target.dataset.skip);
};

const scrub = (e) => {
    // console.log(e);
    if (e.type === 'mousemove' && !dragBar) return;
    const jumpTo = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = jumpTo;
};

const updateButton = (e) => {
    if (!e.target.paused) toggle.innerHTML = '❚ ❚';
    else toggle.innerHTML = '►';
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
    range.addEventListener('mousedown', () => (drag = true));
    range.addEventListener('mouseup', () => (drag = false));
});
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => (dragBar = true));
progress.addEventListener('mouseup', () => (dragBar = false));
