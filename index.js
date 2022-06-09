const PI = 3.14;
let canvas = {
    size : {
        width : 600,
        height : 600
    }
}
let rect = {
    size : {
        width : 30,
        height : 30
    }
}

let rectmargvert = 60;
let rectmarghori = 60;
let canvrotate = 0;
let rectlinew = 5;
let rectalternatev = 0;
let rectalternateh = 0;
let varrectrounded = 0;
let rectfill = 0;
let rectborder = 1;
let numberoflines = 100;
let radius = 25;
let rectfillcolors = ["green", "red"];
let rectbordercolors = ["orange", "blue"];

let rotateWith, rotateNth;
let transform = {
    rect2 : {
        width : 60,
        height : 60,
        radius : 10
    },
    rect3 : {
        width : 50,
        height : 20,
        radius : 15
    },
    rect4 : {
        width : 20,
        height : 20,
        radius : 0
    }
}; 

$(document).ready(() => {
    drawRect();
})
function drawRect() {  
    rotateWith = '';
    $("input[type='radio'][name='rotateRadio']").each((index, el) => {
        if(el.checked) {
            rotateWith = index;
            if(index)
                $("input[type='radio'][name='rotateNth']").each((index, el) => {
                    el.checked = false;
                });
        }
    });
    rotateNth = '';
    $("input[type='radio'][name='rotateNth']").each((index, el) => {
        if(el.checked)
            rotateNth = index;
    });
    
    let canvas = document.getElementById('fill-rectangles');
    let context = canvas.getContext('2d');
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);	
    context.setTransform(1, 0, 0, 1, 0, 0); 
    context.lineWidth = rectlinew;
    context.translate(0, 30); 

    for (let i = 0; i < numberoflines; i++) {  
        context.save();
        for (let j = 0; j < numberoflines; j++) { 
            context.translate(rectmarghori, rectalternatev);
            context.save();
            rotate(context, j);
            transformAndDraw(context, j);
            context.restore();
        }
        context.restore();
        context.translate(rectalternateh, rectmargvert);
    }
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke,b) {
    radius2 =  radius;

    ctx.beginPath();
    ctx.moveTo(x + radius2, y);
    ctx.lineTo(x + width - radius2, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius2);
    ctx.lineTo(x + width, y + height - radius2);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius2, y + height);
    ctx.lineTo(x + radius2, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius2);
    ctx.lineTo(x, y + radius2);
    ctx.quadraticCurveTo(x, y, x + radius2, y);
    ctx.closePath();

    ctx.stroke();
    ctx.fill();  
}

function rotate(context, rectIndex) {
    if(rotateWith === 0)
        context.rotate(PI * 30 / 180); 
    if(rotateWith === 1)
        context.rotate(PI * 30 * rectIndex / 180);
    if(rotateNth === 0 && (rectIndex+1)%2 === 0)
        context.rotate(PI * 30 / 180);
    else if(rotateNth === 1 && (rectIndex+1)%3 === 0)
        context.rotate(PI * 30 / 180);
    else if(rotateNth === 2 && (rectIndex+1)%4 === 0)
        context.rotate(PI * 30 / 180);
}

function transformAndDraw(context, rectIndex) {
    let checked = {
        rect2 : {
            checkedWidth : $("#width2nd")[0].checked,
            checkedHeight : $("#height2nd")[0].checked,
            checkedRadius : $("#radius2nd")[0].checked
        },
        rect3 : {
            checkedWidth : $("#width3rd")[0].checked,
            checkedHeight : $("#height3rd")[0].checked,
            checkedRadius : $("#radius3rd")[0].checked
        },
        rect4 : {
            checkedWidth : $("#width4th")[0].checked,
            checkedHeight : $("#height4th")[0].checked,
            checkedRadius : $("#radius4th")[0].checked
        }
    }
    let rectWidth = rectHeight = rect.size.width;
    let offsetLeft = offsetTop = -15;
    let rectRounded = 0;

    if((rectIndex + 1) % 2 === 0 ) {
        rectWidth = checked.rect2.checkedWidth ? transform.rect2.width : rectWidth;
        rectHeight = checked.rect2.checkedHeight ? transform.rect2.height : rectHeight;
        rectRounded = checked.rect2.checkedRadius ? transform.rect2.radius : rectRounded;
    }
    if((rectIndex + 1) % 3 === 0 ) {
        rectWidth = checked.rect3.checkedWidth ? transform.rect3.width : rectWidth;
        rectHeight = checked.rect3.checkedHeight ? transform.rect3.height : rectHeight;
        rectRounded = checked.rect3.checkedRadius ? transform.rect3.radius : rectRounded;
    }
    if((rectIndex + 1) % 4 === 0 ) {
        rectWidth = checked.rect4.checkedWidth ? transform.rect4.width : rectWidth;
        rectHeight = checked.rect4.checkedHeight ? transform.rect4.height : rectHeight;
        rectRounded = checked.rect4.checkedRadius ? transform.rect4.radius : rectRounded;
    }
    offsetLeft = -(rectWidth/2);
    offsetTop = -(rectHeight/2);
    const rectfillcolor = rectfillcolors[(rectIndex) % rectfillcolors.length];
    context.fillStyle = rectfillcolor;
    const rectbordercolor = rectbordercolors[(rectIndex) % rectbordercolors.length];
    context.strokeStyle = rectbordercolor;  
    roundRect(context, offsetLeft, offsetTop, rectWidth, rectHeight, rectRounded, rectfill, rectborder, rectIndex); 
}