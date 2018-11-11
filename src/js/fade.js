export const fadeOut = (el) =>{
    let element = el;
    element.style.opacity = 1;

    (function fade() {
        if ((element.style.opacity -= .1) < 0) {
            element.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

export const fadeIn = (el, display) => {
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};