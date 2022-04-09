let prev = 0;

export function draw(progress, pageY) {
    let value_progress = progress * pageY;
    let current_scroll = value_progress - prev;
    prev = value_progress;
    window.scrollBy(0, -current_scroll);
}

export function linear(timeFraction) {
    return timeFraction;
}

export function animate({ timing, draw, duration }) {
    let start = performance.now();
    let pageY = window.pageYOffset;
    requestAnimationFrame(function  animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }
        let progress = timing(timeFraction);
        draw (progress, pageY);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } else {
            prev = 0;
        }
    });
}